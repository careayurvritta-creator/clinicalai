import { AYURVEDA_KNOWLEDGE } from '../ayurknowledge'

export interface VectorSearchResult {
  id: string
  type: 'who_term' | 'ayur_knowledge'
  content: string
  source: string
  category: string
  relevance: number
  metadata?: Record<string, unknown>
}

export interface VectorRAGConfig {
  maxResults: number
  minRelevance: number
  includeWHO: boolean
  includeAyurKnowledge: boolean
}

export async function initializeVectorRAG(): Promise<void> {
  console.log('[VectorRAG] Initialized')
}

function computeRelevance(searchText: string, query: string): number {
  if (!searchText.includes(query)) return 0
  const queryWords = query.split(/\s+/).filter(w => w.length > 2)
  if (queryWords.length <= 1) {
    return searchText.split(query).length - 1
  }
  let matchedWords = 0
  let totalOccurrences = 0
  for (const word of queryWords) {
    const count = searchText.split(word).length - 1
    if (count > 0) {
      matchedWords++
      totalOccurrences += count
    }
  }
  return matchedWords === queryWords.length ? totalOccurrences : 0
}

let charakSearchCache: string | null = null

function getCharakSearchText(): string {
  if (charakSearchCache) return charakSearchCache
  const d = AYURVEDA_KNOWLEDGE.charakSamhita as Record<string, unknown>
  if (!d) return ''
  const fields: string[] = []
  const structure = d.structure as Record<string, unknown> | undefined
  if (structure?.sections) {
    for (const s of structure.sections as Array<Record<string, unknown>>) {
      fields.push((s.name as string) || '', (s.english as string) || '')
    }
  }
  const prameha = d.prameha as Record<string, unknown> | undefined
  if (prameha) {
    fields.push((prameha.definition as string) || '')
    const etiology = prameha.etiology as string[] | undefined
    if (etiology) fields.push(...etiology)
  }
  const vataVyadhi = d.vataVyadhi as Record<string, unknown> | undefined
  if (vataVyadhi) {
    fields.push((vataVyadhi.name as string) || '', (vataVyadhi.english as string) || '', (vataVyadhi.definition as string) || '')
  }
  charakSearchCache = fields.join(' ').toLowerCase()
  return charakSearchCache
}

export async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 15,
    minRelevance: 1,
    includeWHO: true,
    includeAyurKnowledge: true
  }
): Promise<VectorSearchResult[]> {
  const lowerQuery = query.toLowerCase()
  const results: VectorSearchResult[] = []
  const seen = new Set<string>()
  const maxCollect = config.maxResults * 2

  // Search diseases
  if (config.includeAyurKnowledge) {
    for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
      const searchText = `${disease.name} ${disease.sanskrit} ${disease.category} ${disease.modernCorrelation} ${disease.samprapti} ${disease.clinicalFeatures.join(' ')} ${disease.treatment.join(' ')} ${disease.pathya.join(' ')} ${disease.apathya.join(' ')}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `disease-${disease.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Disease: ${disease.name} (${disease.sanskrit})\nCategory: ${disease.category}\nModern: ${disease.modernCorrelation}\nSamprapti: ${disease.samprapti}\nClinical: ${disease.clinicalFeatures.join(', ')}\nTreatment: ${disease.treatment.slice(0, 3).join(', ')}\nPathya: ${disease.pathya.join(', ')}\nApathya: ${disease.apathya.join(', ')}\nPrognosis: ${disease.prognosis}`,
            source: disease.name,
            category: 'Disease',
            relevance,
            metadata: { ...disease }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search herbs
    for (const herb of AYURVEDA_KNOWLEDGE.herbs || []) {
      const searchText = `${herb.name} ${herb.sanskrit} ${herb.botanicalName} ${herb.indications.join(' ')} ${herb.guna.join(' ')} ${herb.rasa.join(' ')} ${herb.virya} ${herb.vipaka} ${herb.doshaKarma.vata} ${herb.doshaKarma.pitta} ${herb.doshaKarma.kapha} ${herb.partUsed.join(' ')} ${herb.preparation.join(' ')} ${herb.dosage} ${herb.contraindications.join(' ')}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `herb-${herb.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Herb: ${herb.name} (${herb.sanskrit})\nBotanical: ${herb.botanicalName}\nRasa: ${herb.rasa.join(', ')}\nGuna: ${herb.guna.join(', ')}\nVirya: ${herb.virya}\nVipaka: ${herb.vipaka}\nIndications: ${herb.indications.slice(0, 5).join(', ')}\nDosha: Vata-${herb.doshaKarma.vata}, Pitta-${herb.doshaKarma.pitta}, Kapha-${herb.doshaKarma.kapha}\nDosage: ${herb.dosage}\nParts: ${herb.partUsed.join(', ')}`,
            source: herb.name,
            category: 'Herb',
            relevance,
            metadata: { ...herb }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search treatments
    for (const treatment of AYURVEDA_KNOWLEDGE.treatments || []) {
      const searchText = `${treatment.name} ${treatment.sanskrit} ${treatment.category} ${treatment.description} ${treatment.procedure.join(' ')} ${treatment.indications.join(' ')} ${treatment.contraindications.join(' ')} ${treatment.preparation.join(' ')} ${treatment.postTreatment.join(' ')}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `treatment-${treatment.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Treatment: ${treatment.name} (${treatment.sanskrit})\nCategory: ${treatment.category}\nDescription: ${treatment.description}\nProcedure: ${treatment.procedure.slice(0, 3).join(', ')}\nIndications: ${treatment.indications.join(', ')}\nContraindications: ${treatment.contraindications.join(', ')}\nDuration: ${treatment.duration}`,
            source: treatment.name,
            category: 'Treatment',
            relevance,
            metadata: { ...treatment }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search diagnostics
    for (const diagnostic of AYURVEDA_KNOWLEDGE.diagnostics || []) {
      const searchText = `${diagnostic.name} ${diagnostic.sanskrit} ${diagnostic.description} ${diagnostic.components.join(' ')} ${diagnostic.clinicalApplication.join(' ')}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `diagnostic-${diagnostic.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Diagnostic: ${diagnostic.name} (${diagnostic.sanskrit})\nDescription: ${diagnostic.description}\nComponents: ${diagnostic.components.join(', ')}\nApplications: ${diagnostic.clinicalApplication.join(', ')}`,
            source: diagnostic.name,
            category: 'Diagnostic',
            relevance,
            metadata: { ...diagnostic }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search allopathy integration
    for (const integration of AYURVEDA_KNOWLEDGE.allopathyIntegration || []) {
      const searchText = `${integration.condition} ${integration.ayurvedicCorrelation} ${integration.allopathyTreatment} ${integration.integratedApproach} ${integration.safetyNotes.join(' ')} ${integration.monitoringParameters.join(' ')}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `integration-${integration.condition.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Integration: ${integration.condition}\nAyurvedic: ${integration.ayurvedicCorrelation}\nAllopathic: ${integration.allopathyTreatment}\nApproach: ${integration.integratedApproach}\nSafety: ${integration.safetyNotes.join(', ')}\nMonitoring: ${integration.monitoringParameters.join(', ')}`,
            source: integration.condition,
            category: 'Allopathy Integration',
            relevance,
            metadata: { ...integration }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search drug interactions
    const drugDB = AYURVEDA_KNOWLEDGE.drugInteractionDB
    const allInteractions = drugDB ? [...(drugDB.highRisk || []), ...(drugDB.moderateRisk || []), ...(drugDB.safeToCombine || [])] : []
    for (const interaction of allInteractions) {
      const searchText = `${interaction.herb} ${interaction.drugs?.join(' ')} ${interaction.reason}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `interaction-${interaction.herb.toLowerCase()}-${interaction.drugs?.join('-').toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Drug Interaction: ${interaction.herb} + ${interaction.drugs?.join(', ')}\nReason: ${interaction.reason}`,
            source: `${interaction.herb} + ${interaction.drugs?.join(', ')}`,
            category: 'Drug Interaction',
            relevance,
            metadata: { ...interaction }
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search concepts from fundamentals
    const fundamentals = AYURVEDA_KNOWLEDGE.fundamentals || {} as Record<string, unknown>
    const concepts = [
      ...((fundamentals.tridosha as unknown[]) || []),
      ...((fundamentals.saptadhatu as unknown[]) || []),
      ...((fundamentals.agni as unknown[]) || []),
      ...((fundamentals.srotas as unknown[]) || []),
      ...((fundamentals.ama as unknown[]) || []),
      ...((fundamentals.ojas as unknown[]) || []),
    ]
    for (const concept of concepts) {
      const conceptName = (concept as Record<string, unknown>).name as string ||
                          (concept as Record<string, unknown>).term as string || ''
      const searchText = `${conceptName} ${JSON.stringify(concept)}`.toLowerCase()
      const relevance = computeRelevance(searchText, lowerQuery)
      if (relevance > 0) {
        const id = `concept-${conceptName.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Concept: ${conceptName}\nDetails: ${JSON.stringify(concept)}`,
            source: conceptName,
            category: 'Concept',
            relevance,
            metadata: concept as Record<string, unknown>
          })
          if (results.length >= maxCollect) break
        }
      }
    }

    // Search Charak Samhita chapters (cached)
    const charakSearchText = getCharakSearchText()
    if (charakSearchText) {
      const relevance = computeRelevance(charakSearchText, lowerQuery)
      if (relevance > 0) {
        results.push({
          id: 'charak-samhita',
          type: 'ayur_knowledge',
          content: `Charak Samhita: Complete text with 8 Sthanas, 120 chapters\nKey sections: Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi Sthanas`,
          source: 'Charak Samhita',
          category: 'Classical Text',
          relevance,
          metadata: AYURVEDA_KNOWLEDGE.charakSamhita as Record<string, unknown>
        })
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
    context += `### 🔖 ${result.source} (${result.category})\n`
    context += `${result.content}\n\n`
    context += `---\n\n`
  }

  return context
}

export function getCacheSize(): number {
  return 0
}
