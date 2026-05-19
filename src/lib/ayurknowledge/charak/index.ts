/**
 * Charak Samhita - Comprehensive Knowledge Base
 * All 8 Sthanas with detailed chapter content, shlokas, and clinical applications
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

export { type CharakChapter } from './types'
export { VIMANA_STHANA } from './vimana-sthana'
export { SHARIRA_STHANA } from './sharira-sthana'
export { INDRIYA_STHANA } from './indriya-sthana'
export { NIDANA_STHANA } from './nidana-sthana'
export { SUTRA_STHANA } from './sutra-sthana'
export { KALPA_STHANA } from './kalpa-sthana'
export { SIDDHI_STHANA } from './siddhi-sthana'
export { CHIKITSA_STHANA } from './chikitsa-sthana'

// Import for internal use
import type { CharakChapter } from './types'
import { VIMANA_STHANA } from './vimana-sthana'
import { SHARIRA_STHANA } from './sharira-sthana'
import { INDRIYA_STHANA } from './indriya-sthana'
import { NIDANA_STHANA } from './nidana-sthana'
import { SUTRA_STHANA } from './sutra-sthana'
import { KALPA_STHANA } from './kalpa-sthana'
import { SIDDHI_STHANA } from './siddhi-sthana'
import { CHIKITSA_STHANA } from './chikitsa-sthana'

// All Sthanas combined
export const CHARAK_SAMHITA_COMPLETE: CharakChapter[] = [
  ...SUTRA_STHANA,
  ...NIDANA_STHANA,
  ...VIMANA_STHANA,
  ...SHARIRA_STHANA,
  ...INDRIYA_STHANA,
  ...CHIKITSA_STHANA,
  ...KALPA_STHANA,
  ...SIDDHI_STHANA,
]

// Search function for the complete Charak Samhita
export function searchCharakSamhita(query: string): CharakChapter[] {
  const lowerQuery = query.toLowerCase()
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2)

  return CHARAK_SAMHITA_COMPLETE.filter(chapter => {
    const searchText = [
      chapter.name,
      chapter.sanskrit,
      chapter.english,
      chapter.summary,
      ...chapter.keyConcepts,
      ...chapter.shlokas.map(s => s.translation),
      ...chapter.topics.map(t => t.title + ' ' + t.content),
      ...chapter.doshaDiscussion,
      ...(chapter.treatmentProtocols || []).map(t => t.condition + ' ' + t.treatment),
      ...(chapter.diseaseDescriptions || []).map(d => d.name + ' ' + d.etiology),
      ...chapter.clinicalApplications,
    ].join(' ').toLowerCase()

    return queryWords.some(word => searchText.includes(word))
  }).sort((a, b) => {
    const aScore = queryWords.filter(w =>
      (a.summary + a.keyConcepts.join(' ')).toLowerCase().includes(w)
    ).length
    const bScore = queryWords.filter(w =>
      (b.summary + b.keyConcepts.join(' ')).toLowerCase().includes(w)
    ).length
    return bScore - aScore
  })
}

// Get chapter by sthana and number
export function getCharakChapter(sthana: string, chapterNumber: number): CharakChapter | undefined {
  return CHARAK_SAMHITA_COMPLETE.find(
    ch => ch.sthana.toLowerCase().includes(sthana.toLowerCase()) && ch.chapterNumber === chapterNumber
  )
}

// Get all chapters of a specific sthana
export function getCharakSthana(sthana: string): CharakChapter[] {
  return CHARAK_SAMHITA_COMPLETE.filter(
    ch => ch.sthana.toLowerCase().includes(sthana.toLowerCase())
  )
}

// Get treatment protocols from all chapters
export function getCharakTreatmentProtocols(condition?: string): Array<{
  sthana: string
  chapter: string
  condition: string
  treatment: string
  herbs: string[]
  dosage: string
  duration: string
  precautions: string[]
}> {
  const protocols: Array<{
    sthana: string
    chapter: string
    condition: string
    treatment: string
    herbs: string[]
    dosage: string
    duration: string
    precautions: string[]
  }> = []

  for (const chapter of CHARAK_SAMHITA_COMPLETE) {
    for (const protocol of (chapter.treatmentProtocols || [])) {
      if (!condition || protocol.condition.toLowerCase().includes(condition.toLowerCase())) {
        protocols.push({
          sthana: chapter.sthana,
          chapter: chapter.name,
          ...protocol,
        })
      }
    }
  }

  return protocols
}

// Get disease descriptions from all chapters
export function getCharakDiseaseDescriptions(disease?: string): Array<{
  sthana: string
  chapter: string
  name: string
  sanskrit: string
  etiology: string
  symptoms: string[]
  prognosis: string
  treatment: string
}> {
  const descriptions: Array<{
    sthana: string
    chapter: string
    name: string
    sanskrit: string
    etiology: string
    symptoms: string[]
    prognosis: string
    treatment: string
  }> = []

  for (const chapter of CHARAK_SAMHITA_COMPLETE) {
    for (const desc of (chapter.diseaseDescriptions || [])) {
      if (!disease || desc.name.toLowerCase().includes(disease.toLowerCase())) {
        descriptions.push({
          sthana: chapter.sthana,
          chapter: chapter.name,
          ...desc,
        })
      }
    }
  }

  return descriptions
}
