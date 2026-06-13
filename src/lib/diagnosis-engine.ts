import type { CaseData, ChiefComplaint } from './types'
import { DISEASES } from './ayurknowledge/diseases'

// ─── Pre-compiled lookup maps for O(1) disease matching ───────────────────────
let _diseaseMap: Map<string, typeof DISEASES[0]> | null = null

function getDiseaseMap(): Map<string, typeof DISEASES[0]> {
  if (_diseaseMap) return _diseaseMap
  _diseaseMap = new Map()
  for (const disease of DISEASES) {
    _diseaseMap.set(disease.name.toLowerCase(), disease)
  }
  return _diseaseMap
}

// ─── Pre-compiled symptom normalization patterns ──────────────────────────────
const SYMPTOM_PATTERNS: [RegExp, string][] = [
  [/\b(joint\s*pain|knee|pain in joint|pain in knee|pain in shoulder)\b/i, 'joint_pain'],
  [/\b(morning\s*stiffness|stiffness)\b/i, 'morning_stiffness'],
  [/\b(joint\s*swelling|knee\s*swelling|swollen\s*joint)\b/i, 'swelling_joint'],
  [/\b(urination|frequent\s*urine)\b/i, 'polyuria'],
  [/\b(thirst|excessive\s*thirst)\b/i, 'thirst_excessive'],
  [/\b(weight\s*loss)\b/i, 'weight_loss'],
  [/\b(weakness\s*one\s*side)\b/i, 'weakness_one_side'],
  [/\b(fatigue|tired|weakness)\b/i, 'fatigue'],
  [/\b(acidity|heartburn)\b/i, 'acidity'],
  [/\b(bloating|gas)\b/i, 'bloating'],
  [/\b(constipation|hard\s*stool)\b/i, 'constipation'],
  [/\b(skin\s*rash|skin\s*lesion|rash|eruption)\b/i, 'skin_rash'],
  [/\b(itching|itch)\b/i, 'itching'],
  [/\b(cough)\b/i, 'cough'],
  [/\b(breathless|shortness of breath|difficulty breathing|dyspnea)\b/i, 'breathlessness'],
  [/\b(chest\s*pain)\b/i, 'chest_pain'],
  [/\b(palpitation)\b/i, 'palpitations'],
  [/\b(headache|head\s*pain)\b/i, 'headache'],
  [/\b(dizziness|dizzy)\b/i, 'dizziness'],
  [/\b(insomnia|sleep\s*problem|poor\s*sleep|can't\s*sleep|difficulty\s*sleeping)\b/i, 'insomnia'],
  [/\b(anxiety|worry)\b/i, 'anxiety'],
  [/\b(numbness|tingling)\b/i, 'numbness'],
  [/\b(facial)\b/i, 'facial_deviation'],
]

export interface DiagnosisMatch {
  disease: string
  sanskrit: string
  probability: number
  matchingSymptoms: string[]
  dosha: string[]
  samprapti: string
  category: string
}

export interface DiagnosisResult {
  primary: DiagnosisMatch
  differentials: DiagnosisMatch[]
  reasoning: string
  needsMoreQuestions: boolean
  suggestedQuestions: string[]
}

interface SymptomWeight {
  symptom: string
  weight: number
  diseases: string[]
}

const SYMPTOM_WEIGHTS: Record<string, { weight: number; diseases: string[] }> = {
  joint_pain: { weight: 3, diseases: ['Sandhi Vata', 'Amavata', 'Vata Vyadhi'] },
  morning_stiffness: { weight: 3, diseases: ['Amavata', 'Sandhi Vata'] },
  swelling_joint: { weight: 3, diseases: ['Amavata', 'Sandhi Vata'] },
  polyuria: { weight: 3, diseases: ['Prameha'] },
  polydipsia: { weight: 3, diseases: ['Prameha'] },
  weight_loss: { weight: 2, diseases: ['Prameha'] },
  fatigue: { weight: 2, diseases: ['Prameha'] },
  acidity: { weight: 2, diseases: ['Grahani'] },
  bloating: { weight: 2, diseases: ['Grahani', 'Amavata'] },
  constipation: { weight: 2, diseases: ['Vata Vyadhi', 'Grahani'] },
  skin_rash: { weight: 3, diseases: ['Kushtha'] },
  itching: { weight: 2, diseases: ['Kushtha'] },
  cough: { weight: 2, diseases: ['Kasa', 'Swasa'] },
  breathlessness: { weight: 3, diseases: ['Swasa', 'Hridroga'] },
  chest_pain: { weight: 3, diseases: ['Hridroga'] },
  palpitations: { weight: 2, diseases: ['Hridroga', 'Vata Vyadhi'] },
  headache: { weight: 2, diseases: ['Shiroroga'] },
  dizziness: { weight: 2, diseases: ['Vata Vyadhi', 'Amavata'] },
  insomnia: { weight: 2, diseases: ['Vata Vyadhi', 'Anidra'] },
  anxiety: { weight: 2, diseases: ['Vata Vyadhi', 'Unmada'] },
  thirst_excessive: { weight: 3, diseases: ['Prameha'] },
  numbness: { weight: 2, diseases: ['Vata Vyadhi'] },
  weakness_one_side: { weight: 3, diseases: ['Pakshaghata'] },
  facial_deviation: { weight: 3, diseases: ['Ardita', 'Pakshaghata'] },
}

/**
 * Normalize a symptom string to a canonical key.
 * Uses pre-compiled regex patterns for better performance.
 */
function normalizeSymptom(symptom: string): string {
  for (const [pattern, normalized] of SYMPTOM_PATTERNS) {
    if (pattern.test(symptom)) return normalized
  }
  return symptom.toLowerCase().replace(/\s+/g, '_').substring(0, 30)
}

const DOSHA_SIGNS: [string, RegExp][] = [
  ['vata', /\b(pain|dry|constipation|nervous|anxiety|insomnia|cracking|cold)\b/],
  ['pitta', /\b(burning|heat|inflammation|redness|acidity|irritability)\b/],
  ['kapha', /\b(heavy|congestion|cold|swelling|lethargy|slow)\b/],
]

function extractDoshaFromSymptoms(symptoms: string[]): string[] {
  const joined = symptoms.join(' ').toLowerCase()
  const foundDosha: string[] = []

  for (const [dosha, pattern] of DOSHA_SIGNS) {
    if (pattern.test(joined)) {
      foundDosha.push(dosha)
    }
  }

  if (foundDosha.length === 0) {
    foundDosha.push('Vata', 'Pitta', 'Kapha')
  }

  return foundDosha
}

export function analyzeSymptoms(symptoms: string[]): Map<string, number> {
  const scores = new Map<string, number>()
  
  for (const symptom of symptoms) {
    const normalized = normalizeSymptom(symptom)
    const weightData = SYMPTOM_WEIGHTS[normalized]
    
    if (weightData) {
      for (const disease of weightData.diseases) {
        const currentScore = scores.get(disease) || 0
        scores.set(disease, currentScore + weightData.weight)
      }
    }
  }
  
  return scores
}

export function calculateSeverityScore(complaints: ChiefComplaint[]): number {
  if (complaints.length === 0) return 0
  
  const total = complaints.reduce((sum, c) => sum + (c.severity || 5), 0)
  return total / complaints.length
}

export function getDurationScore(duration: string): number {
  const lower = duration.toLowerCase()
  if (lower.includes('days')) return 1
  if (lower.includes('week')) return 2
  if (lower.includes('1 month') || lower.includes('month')) return 3
  if ((/\b3\b/.test(lower) && lower.includes('month')) || lower.includes('6 month')) return 4
  if (lower.includes('1+') || lower.includes('year')) return 5
  return 3
}

export function analyzeProvisionalDiagnosis(caseData: CaseData): DiagnosisResult {
  const allSymptoms: string[] = []
  
  for (const complaint of caseData.chiefComplaints) {
    allSymptoms.push(complaint.complaint)
    if (complaint.aggravatingFactors) {
      allSymptoms.push(...complaint.aggravatingFactors)
    }
    if (complaint.relievingFactors) {
      allSymptoms.push(...complaint.relievingFactors)
    }
    if (complaint.associatedSymptoms) {
      allSymptoms.push(...complaint.associatedSymptoms)
    }
  }
  
  if (caseData.nadi) allSymptoms.push(caseData.nadi)
  if (caseData.mala) allSymptoms.push(caseData.mala)
  if (caseData.mootra) allSymptoms.push(caseData.mootra)
  if (caseData.jivha) allSymptoms.push(caseData.jivha)
  
  const symptomScores = analyzeSymptoms(allSymptoms)
  
  const diseaseMatches: DiagnosisMatch[] = []
  
  const diseaseMap = getDiseaseMap()

  for (const [diseaseName, score] of symptomScores) {
    // O(1) map lookup instead of O(n) linear scan
    const disease = diseaseMap.get(diseaseName.toLowerCase())
    
    if (disease) {
      const dosha = extractDoshaFromSymptoms(allSymptoms)
      
      diseaseMatches.push({
        disease: disease.name,
        sanskrit: disease.sanskrit || disease.name,
        probability: Math.min(score / 10, 1),
        matchingSymptoms: allSymptoms.filter(s => {
          const normalized = normalizeSymptom(s)
          const weightData = SYMPTOM_WEIGHTS[normalized]
          return weightData && weightData.diseases.includes(diseaseName)
        }).slice(0, 5),
        dosha: dosha,
        samprapti: disease.samprapti || 'Pathogenesis to be analyzed',
        category: disease.category || 'Ayurvedic disorder',
      })
    }
  }
  
  if (diseaseMatches.length === 0) {
    const generalSymptoms = allSymptoms.slice(0, 3)
    const dosha = extractDoshaFromSymptoms(generalSymptoms)
    
    diseaseMatches.push({
      disease: 'Vata Vyadhi (General)',
      sanskrit: 'वात व्याधि',
      probability: 0.3,
      matchingSymptoms: generalSymptoms,
      dosha: dosha,
      samprapti: 'Vata aggravation with Ama accumulation',
      category: 'Neurological/Movement',
    })
  }
  
  diseaseMatches.sort((a, b) => b.probability - a.probability)
  
  const avgSeverity = calculateSeverityScore(caseData.chiefComplaints)
  const avgDuration = caseData.chiefComplaints.length > 0 
    ? getDurationScore(caseData.chiefComplaints[0].duration)
    : 3
  
  const needsMoreQuestions = 
    diseaseMatches.length === 0 ||
    diseaseMatches[0].probability < 0.5 ||
    avgSeverity > 7 ||
    avgDuration > 4 ||
    caseData.chiefComplaints.length < 1
  
  const suggestedQuestions: string[] = []
  
  if (needsMoreQuestions) {
    if (caseData.chiefComplaints.length === 0) {
      suggestedQuestions.push('What are the main complaints?')
    }
    if (avgDuration === 0) {
      suggestedQuestions.push('How long has the patient been experiencing this?')
    }
    if (avgSeverity === 0) {
      suggestedQuestions.push('How severe are the symptoms on a scale of 1-10?')
    }
  }
  
  const primary = diseaseMatches[0] || {
    disease: 'To be determined',
    sanskrit: '',
    probability: 0,
    matchingSymptoms: [],
    dosha: extractDoshaFromSymptoms(allSymptoms),
    samprapti: 'Insufficient data for analysis',
    category: 'Pending assessment',
  }
  
  const reasoning = buildDiagnosisReasoning(primary, caseData, allSymptoms)
  
  return {
    primary,
    differentials: diseaseMatches.slice(1, 4),
    reasoning,
    needsMoreQuestions,
    suggestedQuestions,
  }
}

function buildDiagnosisReasoning(primary: DiagnosisMatch, caseData: CaseData, symptoms: string[]): string {
  const lines: string[] = []
  
  lines.push(`**Current Assessment:** ${primary.disease}`)
  lines.push(`**Samprapti:** ${primary.samprapti}`)
  lines.push(`**Probable Dosha Involvement:** ${primary.dosha.join(', ')}`)
  lines.push(`**Matching Symptoms:** ${primary.matchingSymptoms.slice(0, 3).join(', ')}`)
  
  if (caseData.prakriti) {
    lines.push(`**Patient Prakriti:** ${caseData.prakriti}`)
  }
  
  if (caseData.investigations.length > 0) {
    const abnormalCount = caseData.investigations.filter(i => i.status !== 'normal').length
    if (abnormalCount > 0) {
      lines.push(`**Lab Abnormalities:** ${abnormalCount} abnormal findings detected`)
    }
  }
  
  lines.push(`**Diagnostic Confidence:** ${Math.round(primary.probability * 100)}%`)
  
  return lines.join('\n')
}

export function formatDiagnosisForDisplay(result: DiagnosisResult): string {
  const lines: string[] = []
  
  lines.push('## 🧠 Current Diagnostic Thinking')
  lines.push('')
  lines.push('Based on the information gathered so far:')
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push(`### **Primary Suspect: ${result.primary.disease}**`)
  lines.push('')
  lines.push(`- **Sanskrit:** ${result.primary.sanskrit}`)
  lines.push(`- **Category:** ${result.primary.category}`)
  lines.push(`- **Samprapti:** ${result.primary.samprapti}`)
  lines.push(`- **Involved Doshas:** ${result.primary.dosha.join(', ')}`)
  lines.push(`- **Matching Symptoms:** ${result.primary.matchingSymptoms.join(', ')}`)
  lines.push(`- **Confidence:** ${Math.round(result.primary.probability * 100)}%`)
  lines.push('')
  
  if (result.differentials.length > 0) {
    lines.push('### **Differential Considerations:**')
    lines.push('')
    for (const diff of result.differentials) {
      lines.push(`- **${diff.disease}** (${Math.round(diff.probability * 100)}% match)`)
    }
    lines.push('')
  }
  
  lines.push('---')
  lines.push('')
  lines.push('### Does this align with your clinical judgment?')
  lines.push('')
  lines.push('- **[Confirm]** - Proceed to treatment plan')
  lines.push('- **[Refine]** - Let me add more information')
  lines.push('- **[Correct]** - I believe it\'s different')
  
  return lines.join('\n')
}