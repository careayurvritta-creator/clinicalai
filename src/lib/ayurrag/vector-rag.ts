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

// Simple keyword-based search - fast and reliable
export async function initializeVectorRAG(): Promise<void> {
  console.log('[VectorRAG] Using keyword-based search (fast)')
}

export async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 10,
    minRelevance: 1,
    includeWHO: true,
    includeAyurKnowledge: true
  }
): Promise<VectorSearchResult[]> {
  const lowerQuery = query.toLowerCase()
  const results: VectorSearchResult[] = []
  const seen = new Set<string>()

  // Search diseases
  if (config.includeAyurKnowledge) {
    for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
      const searchText = `${disease.name} ${disease.sanskrit} ${disease.samprapti} ${disease.clinicalFeatures.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = disease.name.toLowerCase()
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `${disease.name} (${disease.sanskrit}) - ${disease.modernCorrelation}\nSamprapti: ${disease.samprapti}\nTreatment: ${disease.treatment.slice(0, 3).join(', ')}`,
            source: disease.name,
            category: 'Disease',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...disease }
          })
        }
      }
    }

    // Search herbs
    for (const herb of AYURVEDA_KNOWLEDGE.herbs || []) {
      const searchText = `${herb.name} ${herb.sanskrit} ${herb.indications.join(' ')} ${herb.properties.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = herb.name.toLowerCase()
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `${herb.name} (${herb.sanskrit})\nIndications: ${herb.indications.slice(0, 5).join(', ')}\nProperties: ${herb.properties.join(', ')}`,
            source: herb.name,
            category: 'Herb',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...herb }
          })
        }
      }
    }

    // Search treatments
    for (const treatment of AYURVEDA_KNOWLEDGE.treatments || []) {
      const searchText = `${treatment.name} ${treatment.sanskrit} ${treatment.description} ${treatment.indications.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = treatment.name.toLowerCase()
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `${treatment.name} (${treatment.sanskrit})\n${treatment.description}\nIndications: ${treatment.indications.slice(0, 3).join(', ')}`,
            source: treatment.name,
            category: 'Treatment',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...treatment }
          })
        }
      }
    }

    // Search concepts from fundamentals
    const concepts = [
      ...(AYURVEDA_KNOWLEDGE.fundamentals?.tridosha ? Object.entries(AYURVEDA_KNOWLEDGE.fundamentals.tridosha).map(([k, v]) => ({ name: k, ...v })) : []),
      ...(AYURVEDA_KNOWLEDGE.fundamentals?.saptadhatu || []),
    ]
    for (const concept of concepts) {
      const searchText = `${concept.name} ${JSON.stringify(concept)}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = concept.name.toLowerCase()
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `${concept.name}: ${JSON.stringify(concept)}`,
            source: concept.name,
            category: 'Concept',
            relevance: searchText.split(lowerQuery).length,
            metadata: concept
          })
        }
      }
    }
  }

  // Sort by relevance and limit
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, config.maxResults)
}

export function formatVectorResultsForContext(results: VectorSearchResult[]): string {
  if (results.length === 0) return ''
  
  let context = '\n## 📚 Relevant Knowledge Base Information:\n\n'
  
  for (const result of results) {
    const sourceLabel = result.category
    context += `### 🔖 ${result.source} (${sourceLabel})\n`
    context += `${result.content}\n\n`
    context += `---\n\n`
  }
  
  return context
}

export function getCacheSize(): number {
  return 0
}