/**
 * Shared types for Charak Samhita knowledge base
 * All Sthana files should import CharakChapter from here
 */

export interface Shloka {
  number: string
  sanskrit?: string
  translation: string
  commentary?: string
}

export interface Topic {
  title: string
  content: string
  clinicalRelevance?: string
}

export interface TreatmentProtocol {
  condition: string
  treatment: string
  herbs: string[]
  dosage: string
  duration: string
  precautions: string[]
  prerequisites?: string[]
}

export interface DiseaseDescription {
  name: string
  sanskrit: string
  etiology: string
  symptoms: string[]
  prognosis: string
  treatment: string
}

export interface CharakChapter {
  id: string
  sthana: string
  chapterNumber: number
  name: string
  sanskrit?: string
  english: string
  summary: string
  keyConcepts: string[]
  shlokas: Shloka[]
  topics: Topic[]
  doshaDiscussion: string[]
  treatmentProtocols?: TreatmentProtocol[]
  treatmentPrinciples?: string[]
  dietaryGuidelines?: string[]
  diseaseDescriptions?: DiseaseDescription[]
  importantVerses?: string[]
  clinicalApplications: string[]
  // Additional content arrays (used by expanded chapters)
  additionalShlokas?: Shloka[]
  additionalTopics?: Topic[]
  additionalDiseaseDescriptions?: DiseaseDescription[]
  additionalTreatmentProtocols?: TreatmentProtocol[]
  additionalDoshaDiscussion?: string[]
  additionalClinicalApplications?: string[]
  additionalDietaryGuidelines?: string[]
  additionalImportantVerses?: string[]
}
