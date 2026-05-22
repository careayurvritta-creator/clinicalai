import type { CaseData, ChiefComplaint } from './types'
import { DISEASES } from './ayurknowledge/diseases'

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

function normalizeSymptom(symptom: string): string {
  const lower = symptom.toLowerCase()
  if (lower.includes('joint pain') || lower.includes('knee') || lower.includes('pain in joint') || lower.includes('pain in knee') || lower.includes('pain in shoulder')) return 'joint_pain'
  if (lower.includes('morning stiffness') || lower.includes('stiffness')) return 'morning_stiffness'
  if (lower.includes('joint swelling') || lower.includes('knee swelling') || lower.includes('swollen joint')) return 'swelling_joint'
  if (lower.includes('urination') || lower.includes('frequent urine')) return 'polyuria'
  if (lower.includes('thirst') || lower.includes('excessive thirst')) return 'thirst_excessive'
  if (lower.includes('weight loss')) return 'weight_loss'
  if (lower.includes('weakness one side') || (lower.includes('weakness') && lower.includes('one side'))) return 'weakness_one_side'
  if (lower.includes('fatigue') || lower.includes('tired') || lower.includes('weakness')) return 'fatigue'
  if (lower.includes('acidity') || lower.includes('heartburn')) return 'acidity'
  if (lower.includes('bloating') || lower.includes('gas')) return 'bloating'
  if (lower.includes('constipation') || lower.includes('hard stool')) return 'constipation'
  if (lower.includes('skin rash') || lower.includes('skin lesion') || lower.includes('rash') || lower.includes('eruption')) return 'skin_rash'
  if (lower.includes('itching') || lower.includes('itch')) return 'itching'
  if (lower.includes('cough')) return 'cough'
  if (lower.includes('breathless') || lower.includes('shortness of breath') || lower.includes('difficulty breathing') || lower.includes('dyspnea')) return 'breathlessness'
  if (lower.includes('chest pain')) return 'chest_pain'
  if (lower.includes('palpitation')) return 'palpitations'
  if (lower.includes('headache') || lower.includes('head pain')) return 'headache'
  if (lower.includes('dizziness') || lower.includes('dizzy')) return 'dizziness'
  if (lower.includes('insomnia') || lower.includes('sleep problem') || lower.includes('poor sleep') || lower.includes("can't sleep") || lower.includes('difficulty sleeping')) return 'insomnia'
  if (lower.includes('anxiety') || lower.includes('worry')) return 'anxiety'
  if (lower.includes('numbness') || lower.includes('tingling')) return 'numbness'
  if (lower.includes('facial')) return 'facial_deviation'
  return lower.replace(/\s+/g, '_').substring(0, 30)
}

function extractDoshaFromSymptoms(symptoms: string[]): string[] {
  const doshaSigns: Record<string, string[]> = {
    vata: ['pain', 'dry', 'constipation', 'nervous', 'anxiety', 'insomnia', 'cracking', 'cold'],
    pitta: ['burning', 'heat', 'inflammation', 'redness', 'acidity', 'irritability'],
    kapha: ['heavy', 'congestion', 'cold', 'swelling', 'lethargy', 'slow'],
  }
  
  const foundDosha: string[] = []
  const joined = symptoms.join(' ').toLowerCase()
  
  for (const [dosha, signs] of Object.entries(doshaSigns)) {
    for (const sign of signs) {
      if (joined.includes(sign)) {
        if (!foundDosha.includes(dosha)) {
          foundDosha.push(dosha)
        }
      }
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
  
  for (const [diseaseName, score] of symptomScores) {
    const disease = DISEASES.find(d => 
      d.name.toLowerCase().includes(diseaseName.toLowerCase()) ||
      diseaseName.toLowerCase().includes(d.name.toLowerCase())
    )
    
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