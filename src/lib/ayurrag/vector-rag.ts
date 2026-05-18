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

export async function initializeVectorRAG(): Promise<void> {
  console.log('[VectorRAG] Initialized')
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

  // Search diseases
  if (config.includeAyurKnowledge) {
    for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
      const searchText = `${disease.name} ${disease.sanskrit} ${disease.category} ${disease.modernCorrelation} ${disease.samprapti} ${disease.clinicalFeatures.join(' ')} ${disease.treatment.join(' ')} ${disease.pathya.join(' ')} ${disease.apathya.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `disease-${disease.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Disease: ${disease.name} (${disease.sanskrit})\nCategory: ${disease.category}\nModern: ${disease.modernCorrelation}\nSamprapti: ${disease.samprapti}\nClinical: ${disease.clinicalFeatures.join(', ')}\nTreatment: ${disease.treatment.slice(0, 3).join(', ')}\nPathya: ${disease.pathya.join(', ')}\nApathya: ${disease.apathya.join(', ')}\nPrognosis: ${disease.prognosis}`,
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
      const searchText = `${herb.name} ${herb.sanskrit} ${herb.botanicalName} ${herb.indications.join(' ')} ${herb.guna.join(' ')} ${herb.rasa.join(' ')} ${herb.virya} ${herb.vipaka} ${herb.doshaKarma.vata} ${herb.doshaKarma.pitta} ${herb.doshaKarma.kapha} ${herb.partUsed.join(' ')} ${herb.preparation.join(' ')} ${herb.dosage} ${herb.contraindications.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `herb-${herb.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Herb: ${herb.name} (${herb.sanskrit})\nBotanical: ${herb.botanicalName}\nRasa: ${herb.rasa.join(', ')}\nGuna: ${herb.guna.join(', ')}\nVirya: ${herb.virya}\nVipaka: ${herb.vipaka}\nIndications: ${herb.indications.slice(0, 5).join(', ')}\nDosha: Vata-${herb.doshaKarma.vata}, Pitta-${herb.doshaKarma.pitta}, Kapha-${herb.doshaKarma.kapha}\nDosage: ${herb.dosage}\nParts: ${herb.partUsed.join(', ')}`,
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
      const searchText = `${treatment.name} ${treatment.sanskrit} ${treatment.category} ${treatment.description} ${treatment.procedure.join(' ')} ${treatment.indications.join(' ')} ${treatment.contraindications.join(' ')} ${treatment.preparation.join(' ')} ${treatment.postTreatment.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `treatment-${treatment.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Treatment: ${treatment.name} (${treatment.sanskrit})\nCategory: ${treatment.category}\nDescription: ${treatment.description}\nProcedure: ${treatment.procedure.slice(0, 3).join(', ')}\nIndications: ${treatment.indications.join(', ')}\nContraindications: ${treatment.contraindications.join(', ')}\nDuration: ${treatment.duration}`,
            source: treatment.name,
            category: 'Treatment',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...treatment }
          })
        }
      }
    }

    // Search diagnostics
    for (const diagnostic of AYURVEDA_KNOWLEDGE.diagnostics || []) {
      const searchText = `${diagnostic.name} ${diagnostic.sanskrit} ${diagnostic.description} ${diagnostic.components.join(' ')} ${diagnostic.clinicalApplication.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `diagnostic-${diagnostic.name.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Diagnostic: ${diagnostic.name} (${diagnostic.sanskrit})\nDescription: ${diagnostic.description}\nComponents: ${diagnostic.components.join(', ')}\nApplications: ${diagnostic.clinicalApplication.join(', ')}`,
            source: diagnostic.name,
            category: 'Diagnostic',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...diagnostic }
          })
        }
      }
    }

    // Search allopathy integration
    for (const integration of AYURVEDA_KNOWLEDGE.allopathyIntegration || []) {
      const searchText = `${integration.condition} ${integration.ayurvedicCorrelation} ${integration.allopathyTreatment} ${integration.integratedApproach} ${integration.safetyNotes.join(' ')} ${integration.monitoringParameters.join(' ')}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `integration-${integration.condition.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Integration: ${integration.condition}\nAyurvedic: ${integration.ayurvedicCorrelation}\nAllopathic: ${integration.allopathyTreatment}\nApproach: ${integration.integratedApproach}\nSafety: ${integration.safetyNotes.join(', ')}\nMonitoring: ${integration.monitoringParameters.join(', ')}`,
            source: integration.condition,
            category: 'Allopathy Integration',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...integration }
          })
        }
      }
    }

    // Search drug interactions
    for (const interaction of AYURVEDA_KNOWLEDGE.drugInteractionDB || []) {
      const searchText = `${interaction.herb} ${interaction.drugClass} ${interaction.mechanism} ${interaction.effect} ${interaction.recommendation} ${interaction.severity}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `interaction-${interaction.herb.toLowerCase()}-${interaction.drugClass.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Drug Interaction: ${interaction.herb} + ${interaction.drugClass}\nSeverity: ${interaction.severity}\nMechanism: ${interaction.mechanism}\nEffect: ${interaction.effect}\nRecommendation: ${interaction.recommendation}`,
            source: `${interaction.herb} + ${interaction.drugClass}`,
            category: 'Drug Interaction',
            relevance: searchText.split(lowerQuery).length,
            metadata: { ...interaction }
          })
        }
      }
    }

    // Search concepts from fundamentals
    const fundamentals = AYURVEDA_KNOWLEDGE.fundamentals || {}
    const concepts = [
      ...(fundamentals.tridosha || []),
      ...(fundamentals.saptadhatu || []),
      ...(fundamentals.agni || []),
      ...(fundamentals.srotas || []),
      ...(fundamentals.ama || []),
      ...(fundamentals.ojas || []),
    ]
    for (const concept of concepts) {
      const conceptName = (concept as any).name || ''
      const searchText = `${conceptName} ${JSON.stringify(concept)}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        const id = `concept-${conceptName.toLowerCase()}`
        if (!seen.has(id)) {
          seen.add(id)
          results.push({
            id,
            type: 'ayur_knowledge',
            content: `Concept: ${conceptName}\nDetails: ${JSON.stringify(concept)}`,
            source: conceptName,
            category: 'Concept',
            relevance: searchText.split(lowerQuery).length,
            metadata: concept
          })
        }
      }
    }

    // Search Charak Samhita chapters
    const charakData = AYURVEDA_KNOWLEDGE.charakSamhita as any
    if (charakData) {
      const charakSearchText = JSON.stringify(charakData).toLowerCase()
      if (charakSearchText.includes(lowerQuery)) {
        results.push({
          id: 'charak-samhita',
          type: 'ayur_knowledge',
          content: `Charak Samhita: ${charakData.structure ? 'Complete text with 8 Sthanas, 120 chapters' : 'Classical Ayurvedic text'}\nKey sections: Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi Sthanas`,
          source: 'Charak Samhita',
          category: 'Classical Text',
          relevance: charakSearchText.split(lowerQuery).length,
          metadata: charakData
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
