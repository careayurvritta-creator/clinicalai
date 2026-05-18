import { generateEmbedding, cosineSimilarity } from '../embeddings'
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

interface LocalEmbedding {
  id: string
  type: 'who_term' | 'disease' | 'herb' | 'treatment' | 'concept'
  content: string
  category: string
  embedding: number[]
  metadata: Record<string, any>
}

let embeddingsCache: LocalEmbedding[] = []
let isInitialized = false

export async function initializeVectorRAG(): Promise<void> {
  if (isInitialized) return
  
  console.log('[VectorRAG] Initializing local embeddings...')
  
  // Generate embeddings for WHO terms
  const whoTerms = WHO_DATA.categories?.flatMap((cat: any) => cat.terms || []) || []
  
  for (const term of whoTerms) {
    const content = `${term.english} ${term.definition} ${term.sanskritIAST || ''}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    embeddingsCache.push({
      id: term.id,
      type: 'who_term',
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
  
  // Generate embeddings for diseases
  for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
    const content = `${disease.name} ${disease.sanskrit} ${disease.samprapti} ${disease.clinicalFeatures.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    embeddingsCache.push({
      id: disease.name.toLowerCase().replace(/\s+/g, '-'),
      type: 'disease',
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
  
  // Generate embeddings for herbs
  for (const herb of AYURVEDA_KNOWLEDGE.herbs || []) {
    const content = `${herb.name} ${herb.sanskrit} ${herb.indications.join(' ')} ${herb.properties.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    embeddingsCache.push({
      id: herb.name.toLowerCase().replace(/\s+/g, '-'),
      type: 'herb',
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
  
  // Generate embeddings for treatments
  for (const treatment of AYURVEDA_KNOWLEDGE.treatments || []) {
    const content = `${treatment.name} ${treatment.sanskrit} ${treatment.description} ${treatment.indications.join(' ')}`.trim()
    const { embedding } = await generateEmbedding(content)
    
    embeddingsCache.push({
      id: treatment.name.toLowerCase().replace(/\s+/g, '-'),
      type: 'treatment',
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
  
  isInitialized = true
  console.log(`[VectorRAG] Initialized with ${embeddingsCache.length} local embeddings`)
}

export async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 10,
    minRelevance: 0.1,
    includeWHO: true,
    includeAyurKnowledge: true
  }
): Promise<VectorSearchResult[]> {
  if (!isInitialized) {
    await initializeVectorRAG()
  }
  
  // Generate query embedding
  const { embedding: queryEmbedding } = await generateEmbedding(query)
  
  // Calculate similarities
  const results = embeddingsCache
    .filter(doc => {
      if (!config.includeWHO && doc.type === 'who_term') return false
      if (!config.includeAyurKnowledge && doc.type !== 'who_term') return false
      return true
    })
    .map(doc => ({
      id: doc.id,
      type: doc.type,
      content: doc.content,
      source: doc.metadata?.english || doc.metadata?.name || doc.type,
      category: doc.category,
      relevance: cosineSimilarity(queryEmbedding, doc.embedding),
      metadata: doc.metadata
    }))
    .filter(r => r.relevance >= config.minRelevance)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, config.maxResults)
  
  return results
}

export function formatVectorResultsForContext(results: VectorSearchResult[]): string {
  if (results.length === 0) return ''
  
  let context = '\n## Relevant Context from Knowledge Base:\n\n'
  
  for (const result of results) {
    const sourceLabel = result.type === 'who_term' ? '[WHO-ITA]' : 
                       result.type === 'disease' ? '[Disease]' :
                       result.type === 'herb' ? '[Herb]' : '[Treatment]'
    context += `**${sourceLabel} ${result.source}** (${result.category}, relevance: ${(result.relevance * 100).toFixed(0)}%)\n`
    context += `${result.content}\n\n`
  }
  
  return context
}

export function getCacheSize(): number {
  return embeddingsCache.length
}