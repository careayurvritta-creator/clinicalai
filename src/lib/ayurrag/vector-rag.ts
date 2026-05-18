import {
  connectToDatabase,
  getCollection,
  VECTOR_COLLECTION,
  WHO_TERMS_COLLECTION,
  WhoTermDocument,
  AyurKnowledgeDocument,
  createIndexes
} from '../mongodb'
import { generateEmbedding, cosineSimilarity, findSimilar } from '../embeddings'
import whoTerminologyData from '../ayurknowledge/who-terminology.json'
import { AYURVEDA_KNOWLEDGE } from '../ayurknowledge'

export interface VectorSearchResult {
  id: string
  type: 'who_term' | 'ayur_knowledge'
  content: string
  source: string
  category: string
  relevance: number
  metadata?: Record<string, any>
}

export interface VectorRAGConfig {
  maxResults: number
  minRelevance: number
  includeWHO: boolean
  includeAyurKnowledge: boolean
}

// Load WHO terminology data
const WHO_DATA = whoTerminologyData as any

let isInitialized = false

export async function initializeVectorRAG(): Promise<void> {
  if (isInitialized) return
  
  try {
    await connectToDatabase()
    await createIndexes()
    
    // Check if we need to populate embeddings
    await populateEmbeddingsIfNeeded()
    
    isInitialized = true
    console.log('[VectorRAG] Initialized successfully')
  } catch (error) {
    console.error('[VectorRAG] Initialization error:', error)
    throw error
  }
}

async function populateEmbeddingsIfNeeded(): Promise<void> {
  try {
    const vectorCollection = await getCollection<any>(VECTOR_COLLECTION)
    const count = await vectorCollection.countDocuments()
    
    if (count === 0) {
      console.log('[VectorRAG] Populating embeddings...')
      await populateWHOEmbeddings()
      await populateAyurKnowledgeEmbeddings()
      console.log('[VectorRAG] Embeddings populated')
    }
  } catch (error) {
    console.log('[VectorRAG] Embedding population skipped:', error)
  }
}

async function populateWHOEmbeddings(): Promise<void> {
  const whoCollection = await getCollection<WhoTermDocument>(WHO_TERMS_COLLECTION)
  const vectorCollection = await getCollection<any>(VECTOR_COLLECTION)
  
  const terms = WHO_DATA.categories?.flatMap((cat: any) => cat.terms || []) || []
  
  for (const term of terms) {
    // Generate embedding from term content
    const content = `${term.english} ${term.definition} ${term.sanskritIAST || ''}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    const doc: WhoTermDocument = {
      termId: term.id,
      english: term.english,
      definition: term.definition,
      sanskritIAST: term.sanskritIAST || '',
      sanskritDevanagari: term.sanskritDevanagari || '',
      category: term.category,
      embedding,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await whoCollection.insertOne(doc)
    
    // Also add to vector collection for search
    await vectorCollection.insertOne({
      type: 'who_term',
      refId: term.id,
      content,
      category: term.category,
      embedding,
      metadata: {
        termId: term.id,
        english: term.english,
        sanskritIAST: term.sanskritIAST,
        definition: term.definition
      }
    })
  }
}

async function populateAyurKnowledgeEmbeddings(): Promise<void> {
  const vectorCollection = await getCollection<any>(VECTOR_COLLECTION)
  
  // Process diseases
  for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
    const content = `${disease.name} ${disease.sanskrit} ${disease.samprapti} ${disease.clinicalFeatures.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    await vectorCollection.insertOne({
      type: 'disease',
      refId: disease.name.toLowerCase().replace(/\s+/g, '-'),
      content,
      category: 'Disease',
      embedding,
      metadata: {
        name: disease.name,
        sanskrit: disease.sanskrit,
        modernCorrelation: disease.modernCorrelation,
        category: disease.category
      }
    })
  }
  
  // Process herbs
  for (const herb of AYURVEDA_KNOWLEDGE.herbs || []) {
    const content = `${herb.name} ${herb.sanskrit} ${herb.indications.join(' ')} ${herb.properties.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    await vectorCollection.insertOne({
      type: 'herb',
      refId: herb.name.toLowerCase().replace(/\s+/g, '-'),
      content,
      category: 'Herb',
      embedding,
      metadata: {
        name: herb.name,
        sanskrit: herb.sanskrit,
        indications: herb.indications
      }
    })
  }
  
  // Process treatments
  for (const treatment of AYURVEDA_KNOWLEDGE.treatments || []) {
    const content = `${treatment.name} ${treatment.sanskrit} ${treatment.description} ${treatment.indications.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    await vectorCollection.insertOne({
      type: 'treatment',
      refId: treatment.name.toLowerCase().replace(/\s+/g, '-'),
      content,
      category: 'Treatment',
      embedding,
      metadata: {
        name: treatment.name,
        sanskrit: treatment.sanskrit,
        category: treatment.category
      }
    })
  }
}

export async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 10,
    minRelevance: 0.3,
    includeWHO: true,
    includeAyurKnowledge: true
  }
): Promise<VectorSearchResult[]> {
  if (!isInitialized) {
    await initializeVectorRAG()
  }
  
  // Generate query embedding
  const { embedding } = await generateEmbedding(query)
  
  try {
    const vectorCollection = await getCollection<any>(VECTOR_COLLECTION)
    
    // Get all documents with embeddings
    const documents = await vectorCollection.find({ embedding: { $exists: true } }).toArray()
    
    // Calculate similarities
    const results = documents
      .map((doc: any) => ({
        id: doc._id.toString(),
        type: doc.type,
        content: doc.content,
        source: doc.metadata?.english || doc.metadata?.name || doc.type,
        category: doc.category,
        relevance: cosineSimilarity(embedding, doc.embedding),
        metadata: doc.metadata
      }))
      .filter(r => r.relevance >= config.minRelevance)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, config.maxResults)
    
    return results
  } catch (error) {
    console.error('[VectorRAG] Search error:', error)
    
    // Fallback to keyword search
    return fallbackKeywordSearch(query, config)
  }
}

function fallbackKeywordSearch(
  query: string,
  config: VectorRAGConfig
): VectorSearchResult[] {
  const results: VectorSearchResult[] = []
  const lowerQuery = query.toLowerCase()
  
  // Search WHO terms
  if (config.includeWHO) {
    const terms = WHO_DATA.categories?.flatMap((cat: any) => cat.terms || []) || []
    for (const term of terms) {
      const searchText = `${term.english} ${term.definition} ${term.sanskritIAST}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        results.push({
          id: term.id,
          type: 'who_term',
          content: `${term.english}: ${term.definition}`,
          source: term.english,
          category: term.category,
          relevance: searchText.split(lowerQuery).length - 1,
          metadata: {
            termId: term.id,
            sanskritIAST: term.sanskritIAST,
            definition: term.definition
          }
        })
      }
    }
  }
  
  // Search diseases
  if (config.includeAyurKnowledge) {
    for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
      const searchText = `${disease.name} ${disease.sanskrit} ${disease.samprapti}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        results.push({
          id: disease.name,
          type: 'ayur_knowledge',
          content: `${disease.name} (${disease.sanskrit}): ${disease.modernCorrelation}`,
          source: disease.name,
          category: 'Disease',
          relevance: searchText.split(lowerQuery).length - 1,
          metadata: {
            name: disease.name,
            sanskrit: disease.sanskrit,
            category: disease.category
          }
        })
      }
    }
    
    // Search herbs
    for (const herb of AYURVEDA_KNOWLEDGE.herbs || []) {
      const searchText = `${herb.name} ${herb.sanskrit} ${herb.indications.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        results.push({
          id: herb.name,
          type: 'ayur_knowledge',
          content: `${herb.name} (${herb.sanskrit}): ${herb.indications.slice(0, 3).join(', ')}`,
          source: herb.name,
          category: 'Herb',
          relevance: searchText.split(lowerQuery).length - 1,
          metadata: {
            name: herb.name,
            sanskrit: herb.sanskrit,
            indications: herb.indications
          }
        })
      }
    }
  }
  
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, config.maxResults)
}

export function formatVectorResultsForContext(results: VectorSearchResult[]): string {
  if (results.length === 0) return ''
  
  let context = '\n## Relevant Context from Knowledge Base:\n\n'
  
  for (const result of results) {
    const sourceLabel = result.type === 'who_term' ? '[WHO-ITA]' : '[Ayurveda]'
    context += `**${sourceLabel} ${result.source}** (${result.category}, relevance: ${(result.relevance * 100).toFixed(0)}%)\n`
    context += `${result.content}\n\n`
  }
  
  return context
}