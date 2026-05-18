export * from './fundamentals'
export * from './diagnostics'
export * from './diseases'
export * from './herbs'
export * from './treatments'
export * from './allopathy'
export * from './charak-samhita'

import charakAllChapters from './charak-all-chapters.json'

import { FUNDAMENTALS, ASHTANGAS } from './fundamentals'
import { DIAGNOSTIC_METHODS } from './diagnostics'
import { DISEASES } from './diseases'
import { HERBS, DRUG_INTERACTIONS, RASAS, GUNAS, VIRYAS, VIPAKAS } from './herbs'
import { TREATMENTS, PURVAKARMA, RASAYANA_THERAPIES, PATHYA_APATHYA, DINACHARYA, RITUCHARYA } from './treatments'
import { ALLOPATHY_INTEGRATION, DRUG_INTERACTION_DATABASE, PRESCRIBING_GUIDELINES, SAFETY_WARNINGS } from './allopathy'
import { CHARAK_SAMHITA, KEY_CONCEPTS, CHAPTER_SUMMARY } from './charak-samhita'

const { metadata, sthanas } = charakAllChapters as { metadata: any, sthanas: any[] }

export const AYURVEDA_KNOWLEDGE = {
  fundamentals: FUNDAMENTALS,
  ashtangas: ASHTANGAS,
  diagnostics: DIAGNOSTIC_METHODS,
  diseases: DISEASES,
  herbs: HERBS,
  drugInteractions: DRUG_INTERACTIONS,
  treatments: TREATMENTS,
  purvaKarma: PURVAKARMA,
  rasayana: RASAYANA_THERAPIES,
  pathyaApathya: PATHYA_APATHYA,
  dinacharya: DINACHARYA,
  ritucharya: RITUCHARYA,
  allopathyIntegration: ALLOPATHY_INTEGRATION,
  drugInteractionDB: DRUG_INTERACTION_DATABASE,
  prescribingGuidelines: PRESCRIBING_GUIDELINES,
  safetyWarnings: SAFETY_WARNINGS,
  rasas: RASAS,
  gunas: GUNAS,
  viryas: VIRYAS,
  vipakas: VIPAKAS,
  charakSamhita: CHARAK_SAMHITA,
  keyConcepts: KEY_CONCEPTS,
  chapterSummary: CHAPTER_SUMMARY,
  charakAllChapters: sthanas,
  charakMetadata: metadata
}

export function searchKnowledge(query: string): string {
  const lowerQuery = query.toLowerCase()
  let results: string[] = []
  
  // Search diseases
  for (const disease of DISEASES) {
    if (
      disease.name.toLowerCase().includes(lowerQuery) ||
      disease.sanskrit.toLowerCase().includes(lowerQuery) ||
      disease.category.toLowerCase().includes(lowerQuery) ||
      disease.modernCorrelation.toLowerCase().includes(lowerQuery)
    ) {
      results.push(`Disease: ${disease.name} (${disease.sanskrit}) - ${disease.modernCorrelation}`)
    }
  }
  
  // Search herbs
  for (const herb of HERBS) {
    if (
      herb.name.toLowerCase().includes(lowerQuery) ||
      herb.sanskrit.toLowerCase().includes(lowerQuery)
    ) {
      results.push(`Herb: ${herb.name} (${herb.sanskrit}) - ${herb.indications.slice(0, 2).join(', ')}`)
    }
  }
  
  // Search treatments
  for (const treatment of TREATMENTS) {
    if (
      treatment.name.toLowerCase().includes(lowerQuery) ||
      treatment.sanskrit.toLowerCase().includes(lowerQuery)
    ) {
      results.push(`Treatment: ${treatment.name} (${treatment.sanskrit}) - ${treatment.category}`)
    }
  }
  
  return results.length > 0 ? results.join('\n') : 'No direct matches found. Please try different search terms.'
}

export function getHerbInteractions(herbName: string): string[] {
  return DRUG_INTERACTIONS
    .filter(i => i.herb.toLowerCase().includes(herbName.toLowerCase()))
    .map(i => `${i.herb} + ${i.drugClass}: ${i.recommendation}`)
}

export function getDiseaseInfo(diseaseName: string): string | null {
  const disease = DISEASES.find(d => 
    d.name.toLowerCase().includes(diseaseName.toLowerCase()) ||
    d.sanskrit.toLowerCase().includes(diseaseName.toLowerCase()) ||
    d.modernCorrelation.toLowerCase().includes(diseaseName.toLowerCase())
  )
  
  if (!disease) return null
  
  return `
=== ${disease.name} (${disease.sanskrit}) ===
Category: ${disease.category}
Modern Correlation: ${disease.modernCorrelation}
Samprapti (Pathogenesis): ${disease.samprapti}

Clinical Features:
- ${disease.clinicalFeatures.join('\n- ')}

Treatment Approach:
- ${disease.treatment.join('\n- ')}

Pathya (Recommended): ${disease.pathya.join(', ')}
Apathya (Avoid): ${disease.apathya.join(', ')}
Prognosis: ${disease.prognosis}
  `.trim()
}

export function getTreatmentInfo(treatmentName: string): string | null {
  const treatment = TREATMENTS.find(t => 
    t.name.toLowerCase().includes(treatmentName.toLowerCase()) ||
    t.sanskrit.toLowerCase().includes(treatmentName.toLowerCase())
  )
  
  if (!treatment) return null
  
  return `
=== ${treatment.name} (${treatment.sanskrit}) ===
Category: ${treatment.category}
Description: ${treatment.description}

Procedure:
- ${treatment.procedure.join('\n- ')}

Indications:
- ${treatment.indications.join('\n- ')}

Contraindications:
- ${treatment.contraindications.join('\n- ')}

Duration: ${treatment.duration}
  `.trim()
}

export function checkDrugInteraction(herb: string, drugClass: string): string {
  const interaction = DRUG_INTERACTIONS.find(
    i => i.herb.toLowerCase().includes(herb.toLowerCase()) && 
    i.drugClass.toLowerCase().includes(drugClass.toLowerCase())
  )
  
  if (!interaction) return 'No known interaction found'
  
  return `
⚠️ Interaction Found: ${interaction.severity.toUpperCase()} severity
Mechanism: ${interaction.mechanism}
Effect: ${interaction.effect}
Recommendation: ${interaction.recommendation}
  `.trim()
}

export function getAllopathyIntegration(condition: string): string | null {
  const integration = ALLOPATHY_INTEGRATION.find(i => 
    i.condition.toLowerCase().includes(condition.toLowerCase()) ||
    i.ayurvedicCorrelation.toLowerCase().includes(condition.toLowerCase())
  )
  
  if (!integration) return null
  
  return `
=== ${integration.condition} Integration ===
Ayurvedic Correlation: ${integration.ayurvedicCorrelation}
Allopathic Treatment: ${integration.allopathyTreatment}

Integrated Approach:
${integration.integratedApproach}

Safety Notes:
- ${integration.safetyNotes.join('\n- ')}

Monitoring Parameters:
- ${integration.monitoringParameters.join('\n- ')}
  `.trim()
}

export function getPrakritiGuidance(prakriti: string): string {
  const p = prakriti.toLowerCase()
  
  if (p.includes('vata')) {
    return `
Vata Prakriti Guidance:
- Body: Lean, dry, cold
- Mind: Creative, anxious
- Needs: Warm, moist, nourishing
- Diet: Warm cooked foods, ghee, oils
- Exercise: Gentle (yoga, walking)
- Avoid: Cold, dry, raw foods
- Routine: Regular sleep, meals
- Herbs: Ashwagandha, Bala, Dashamoola
    `.trim()
  } else if (p.includes('pitta')) {
    return `
Pitta Prakriti Guidance:
- Body: Medium, warm
- Mind: Intelligent, ambitious
- Needs: Cooling, moderate
- Diet: Sweet, bitter, astringent
- Exercise: Moderate
- Avoid: Spicy, sour, hot foods
- Routine: Moderate pace
- Herbs: Shatavari, Brahmi, Guduchi
    `.trim()
  } else if (p.includes('kapha')) {
    return `
Kapha Prakriti Guidance:
- Body: Sturdy, heavy, cold
- Mind: Calm, steady
- Needs: Light, dry, warm
- Diet: Light, dry, spicy
- Exercise: Regular, vigorous
- Avoid: Heavy, oily, sweet
- Routine: Early to bed, early to rise
- Herbs: Triphala, Ginger, Pippali
    `.trim()
  }
  
  return 'Please specify Vata, Pitta, or Kapha prakriti'
}

export function getCharakChapter(sthanaId: string, chapterNumber?: number): string | null {
  const sthana = sthanas.find(s => s.id === sthanaId)
  if (!sthana) return null
  
  if (chapterNumber) {
    const chapter = sthana.chapters.find((c: any) => c.number === chapterNumber)
    if (!chapter) return null
    return `
=== ${sthana.name} (${sthana.english}) ===
Chapter ${chapter.number}: ${chapter.sanskritName}
English: ${chapter.englishName}

Key Concepts:
- ${chapter.keyConcepts.join('\n- ')}

Summary: ${chapter.summary}
    `.trim()
  }
  
  return `
=== ${sthana.name} (${sthana.english}) ===
Total Chapters: ${sthana.chapters}

${sthana.chapters.map((c: any) => `Ch ${c.number}: ${c.sanskritName} - ${c.englishName}`).join('\n')}
  `.trim()
}

export function searchCharakChapters(query: string): string {
  const lowerQuery = query.toLowerCase()
  let results: string[] = []
  
  for (const sthana of sthanas) {
    for (const chapter of sthana.chapters) {
      const searchText = `${chapter.sanskritName} ${chapter.englishName} ${chapter.keyConcepts.join(' ')} ${chapter.summary}`.toLowerCase()
      if (searchText.includes(lowerQuery)) {
        results.push(`[${sthana.name}] Ch${chapter.number}: ${chapter.sanskritName} - ${chapter.englishName}`)
      }
    }
  }
  
  return results.length > 0 
    ? results.slice(0, 20).join('\n') 
    : 'No chapters found matching your query.'
}