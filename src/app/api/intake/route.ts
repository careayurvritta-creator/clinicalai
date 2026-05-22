export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { CaseData, ChiefComplaint } from '@/lib/types'
import { sanitizeInput } from '@/lib/utils'
import { searchKnowledge, AYURVEDA_KNOWLEDGE } from '@/lib/ayurknowledge'
import { analyzeProvisionalDiagnosis, formatDiagnosisForDisplay } from '@/lib/diagnosis-engine'
import { createServerClient } from '@/lib/supabase/client'
import { getNvidiaClient } from '@/lib/nvidia-client'
import { buildFollowupPrompt } from '@/lib/treatment-prompts'

const intakeRequestSchema = z.object({
  action: z.enum(['start', 'answer', 'getQuestion', 'showDiagnosis', 'reset', 'generateFollowup', 'answerFollowup']),
  answer: z.string().optional(),
  currentStep: z.number().optional(),
  caseData: z.object({
    name: z.string().optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    occupation: z.string().optional(),
    area: z.string().optional(),
    prakriti: z.string().optional(),
    chiefComplaints: z.array(z.object({
      id: z.string(),
      complaint: z.string(),
      duration: z.string().default(''),
      severity: z.number().default(5),
      location: z.string().optional(),
      onset: z.string().optional(),
      aggravatingFactors: z.array(z.string()).optional(),
      relievingFactors: z.array(z.string()).optional(),
      associatedSymptoms: z.array(z.string()).optional(),
    })).optional(),
    comorbidities: z.array(z.string()).optional(),
    investigations: z.array(z.object({
      parameter: z.string(),
      value: z.string(),
      unit: z.string().optional(),
      normalRange: z.string().optional(),
      status: z.enum(['normal', 'abnormal', 'critical']).optional(),
    })).optional(),
    investigationText: z.string().optional(),
    ongoingMedications: z.string().optional(),
    medicalHistory: z.string().optional(),
    allergies: z.string().optional(),
    familyHistory: z.string().optional(),
    nadi: z.string().optional(),
    mootra: z.string().optional(),
    mala: z.string().optional(),
    jivha: z.string().optional(),
    drik: z.string().optional(),
    sparsh: z.string().optional(),
    shabda: z.string().optional(),
    aakriti: z.string().optional(),
    prakritiDetail: z.string().optional(),
    saara: z.string().optional(),
    samhanana: z.string().optional(),
    satva: z.string().optional(),
    aharaShakti: z.string().optional(),
    vyayamaShakti: z.string().optional(),
    desha: z.string().optional(),
    provisionalDiagnosis: z.string().optional(),
    provisionalReasoning: z.string().optional(),
  }).optional(),
  pendingComplaints: z.array(z.string()).optional(),
  followupAnswers: z.record(z.string(), z.string()).optional(),
})

interface IntakeResponse {
  type: 'question' | 'diagnosis' | 'confirmation' | 'welcome' | 'followup_questions'
  question?: {
    id: string
    field: string
    question: string
    type: string
    options?: Array<{ value: string; label: string }>
    suggestions?: string[]
    severityScale?: { min: number; max: number; default: string }
  }
  questions?: Array<{ question: string; rationale: string; category: string }>
  message?: string
  progress?: {
    current: number
    total: number
    percentage: number
  }
  caseData?: Partial<CaseData>
  diagnosis?: string
}

const TOTAL_STEPS = 30

function calculateProgress(caseData: Partial<CaseData>): { current: number; total: number; percentage: number } {
  let filled = 0
  const total = TOTAL_STEPS

  if (caseData.name) filled++
  if (caseData.age) filled++
  if (caseData.gender) filled++
  if (caseData.occupation) filled++
  if (caseData.area) filled++
  if (caseData.chiefComplaints && caseData.chiefComplaints.length > 0) filled++
  // Complaint details (6-12)
  const lastComplaint = caseData.chiefComplaints?.[caseData.chiefComplaints.length - 1]
  if (lastComplaint?.duration) filled++
  if (lastComplaint?.severity && lastComplaint.severity > 0) filled++
  if (lastComplaint?.location) filled++
  if (lastComplaint?.onset) filled++
  if (lastComplaint?.aggravatingFactors && lastComplaint.aggravatingFactors.length > 0) filled++
  if (lastComplaint?.relievingFactors && lastComplaint.relievingFactors.length > 0) filled++
  if (lastComplaint?.associatedSymptoms && lastComplaint.associatedSymptoms.length > 0) filled++
  // Medical history (13-15)
  if (caseData.comorbidities && caseData.comorbidities.length > 0) filled++
  if (caseData.ongoingMedications) filled++
  if (caseData.allergies) filled++
  // Ashtavidha (16-23)
  if (caseData.nadi) filled++
  if (caseData.mootra) filled++
  if (caseData.mala) filled++
  if (caseData.jivha) filled++
  if (caseData.drik) filled++
  if (caseData.shabda) filled++
  if (caseData.sparsh) filled++
  if (caseData.aakriti) filled++
  // Dashavidha (24-29)
  if (caseData.prakritiDetail) filled++
  if (caseData.saara) filled++
  if (caseData.samhanana) filled++
  if (caseData.satva) filled++
  if (caseData.aharaShakti) filled++
  if (caseData.vyayamaShakti) filled++

  return {
    current: filled,
    total,
    percentage: Math.round((filled / total) * 100),
  }
}

function getWelcomeMessage(): IntakeResponse {
  return {
    type: 'welcome',
    message: `# Namaste! 🙏

Welcome to the Clinical AI Intake System.

I'll help you gather comprehensive patient information through a structured Ayurvedic consultation process.

**How this works:**
1. Basic patient information
2. Chief complaints with detailed analysis
3. AI-powered symptom correlation using knowledge base
4. Ashtavidha Pariksha (8-fold examination)
5. Dashavidha Pariksha (10-fold examination)
6. AI-generated provisional diagnosis
7. Comprehensive treatment protocol

**Features:**
- RAG-powered intelligent follow-up questions
- Disease correlation from Charak Samhita & knowledge base
- Automatic dosha analysis
- Drug interaction checks

Shall we begin?

**Please enter the patient's name to start:**`,
    progress: { current: 0, total: TOTAL_STEPS, percentage: 0 },
  }
}

function getRelatedDiseases(complaint: string): string[] {
  const results = searchKnowledge(complaint)
  const diseases: string[] = []
  for (const line of results.split('\n')) {
    if (line.startsWith('Disease:')) {
      const nameMatch = line.match(/Disease:\s*([^(]+)/)
      if (nameMatch) diseases.push(nameMatch[1].trim())
    }
  }
  return [...new Set(diseases)].slice(0, 5)
}

function getRelatedSymptoms(complaint: string): string[] {
  const lowerComplaint = complaint.toLowerCase()
  const symptoms: string[] = []

  for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
    const diseaseText = `${disease.name} ${disease.clinicalFeatures?.join(' ') || ''}`.toLowerCase()
    if (diseaseText.includes(lowerComplaint) || lowerComplaint.includes(disease.name.toLowerCase())) {
      for (const feature of disease.clinicalFeatures || []) {
        if (!lowerComplaint.includes(feature.toLowerCase())) {
          symptoms.push(feature)
        }
      }
    }
  }
  return [...new Set(symptoms)].slice(0, 8)
}

function getAggravatingFactorSuggestions(complaint: string): string[] {
  const lowerComplaint = complaint.toLowerCase()
  const factors: string[] = []

  for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
    const diseaseText = `${disease.name} ${disease.clinicalFeatures?.join(' ') || ''}`.toLowerCase()
    if (diseaseText.includes(lowerComplaint) || lowerComplaint.includes(disease.name.toLowerCase())) {
      for (const apathya of disease.apathya || []) {
        factors.push(apathya)
      }
    }
  }
  return [...new Set(factors)].slice(0, 6)
}

function getRelievingFactorSuggestions(complaint: string): string[] {
  const lowerComplaint = complaint.toLowerCase()
  const factors: string[] = []

  for (const disease of AYURVEDA_KNOWLEDGE.diseases || []) {
    const diseaseText = `${disease.name} ${disease.clinicalFeatures?.join(' ') || ''}`.toLowerCase()
    if (diseaseText.includes(lowerComplaint) || lowerComplaint.includes(disease.name.toLowerCase())) {
      for (const pathya of disease.pathya || []) {
        factors.push(pathya)
      }
    }
  }
  return [...new Set(factors)].slice(0, 6)
}

function getNextQuestionForStep(step: number, caseData: Partial<CaseData>): IntakeResponse['question'] | null {
  const lastComplaint = caseData.chiefComplaints?.[caseData.chiefComplaints.length - 1]
  const complaintText = lastComplaint?.complaint || ''

  const basicQuestions: IntakeResponse['question'][] = [
    { id: 'name', field: 'name', question: "What is the patient's name?", type: 'text', suggestions: ['Enter patient name'] },
    { id: 'age', field: 'age', question: 'How old is the patient?', type: 'number', suggestions: ['Enter age in years'] },
    { id: 'gender', field: 'gender', question: "What is the patient's gender?", type: 'select', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }] },
    { id: 'occupation', field: 'occupation', question: "What is the patient's occupation?", type: 'text', suggestions: ['Business', 'Service', 'Student', 'Homemaker', 'Retired', 'Farmer', 'Laborer'] },
    { id: 'area', field: 'area', question: 'Which area/city does the patient live in?', type: 'text', suggestions: ['Enter city or region'] },
  ]

  if (step < basicQuestions.length) {
    return basicQuestions[step]
  }

  if (step === 5) {
    return {
      id: 'chiefComplaints',
      field: 'chiefComplaints',
      question: 'What brings the patient here today? Please describe the main complaint.',
      type: 'text',
      suggestions: ['Joint pain', 'Acidity', 'Skin rash', 'Diabetes', 'Cough', 'Headache', 'Anxiety', 'Insomnia'],
    }
  }

  // Phase 3: Complaint Details (steps 6-12) with RAG suggestions
  if (step === 6) {
    const relatedDiseases = getRelatedDiseases(complaintText)
    const diseaseHint = relatedDiseases.length > 0
      ? `\n\n*Related conditions in knowledge base: ${relatedDiseases.join(', ')}*`
      : ''
    return {
      id: 'duration',
      field: 'duration',
      question: `How long has the patient been experiencing "${complaintText}"?${diseaseHint}`,
      type: 'select',
      options: [
        { value: 'Days', label: 'Days' },
        { value: '1-2 weeks', label: '1-2 weeks' },
        { value: '1 month', label: '1 month' },
        { value: '3-6 months', label: '3-6 months' },
        { value: '6-12 months', label: '6-12 months' },
        { value: '1+ years', label: '1+ years' },
      ],
    }
  }

  if (step === 7) {
    return {
      id: 'severity',
      field: 'severity',
      question: `On a scale of 1-10, how severe is "${complaintText}"? (1=mild, 10=severe)`,
      type: 'scale',
      severityScale: { min: 1, max: 10, default: '5' },
    }
  }

  if (step === 8) {
    return {
      id: 'location',
      field: 'location',
      question: `Where exactly is "${complaintText}" located? Please describe the specific area.`,
      type: 'text',
      suggestions: ['Left side', 'Right side', 'Both sides', 'Upper body', 'Lower body', 'Abdomen', 'Chest', 'Head'],
    }
  }

  if (step === 9) {
    return {
      id: 'onset',
      field: 'onset',
      question: 'When and how did this start? Was it sudden or gradual?',
      type: 'text',
      suggestions: ['Sudden onset', 'Gradual onset', 'After meal', 'Morning', 'Night', 'After stress', 'Seasonal'],
    }
  }

  if (step === 10) {
    const aggravatingSuggestions = getAggravatingFactorSuggestions(complaintText)
    return {
      id: 'aggravatingFactors',
      field: 'aggravatingFactors',
      question: `What makes "${complaintText}" worse?`,
      type: 'text',
      suggestions: aggravatingSuggestions.length > 0 ? aggravatingSuggestions : ['Cold weather', 'Hot weather', 'Stress', 'Fasting', 'Heavy food', 'Physical exertion'],
    }
  }

  if (step === 11) {
    const relievingSuggestions = getRelievingFactorSuggestions(complaintText)
    return {
      id: 'relievingFactors',
      field: 'relievingFactors',
      question: `What makes "${complaintText}" better?`,
      type: 'text',
      suggestions: relievingSuggestions.length > 0 ? relievingSuggestions : ['Rest', 'Warm compress', 'Cold compress', 'Light food', 'Sleep', 'Massage'],
    }
  }

  if (step === 12) {
    const relatedSymptoms = getRelatedSymptoms(complaintText)
    return {
      id: 'associatedSymptoms',
      field: 'associatedSymptoms',
      question: `Are there any other symptoms associated with "${complaintText}"?`,
      type: 'text',
      suggestions: relatedSymptoms.length > 0 ? relatedSymptoms : ['Fever', 'Fatigue', 'Loss of appetite', 'Sleep disturbance', 'Weight change', 'Mood changes'],
    }
  }

  // Phase 5: Medical History (steps 13-15)
  if (step === 13) {
    return {
      id: 'comorbidities',
      field: 'comorbidities',
      question: 'Does the patient have any other existing medical conditions?',
      type: 'text',
      suggestions: ['Diabetes', 'Hypertension', 'Thyroid disorder', 'Heart disease', 'Asthma', 'None'],
    }
  }

  if (step === 14) {
    return {
      id: 'ongoingMedications',
      field: 'ongoingMedications',
      question: 'Is the patient currently taking any medications (Ayurvedic or modern)?',
      type: 'text',
      suggestions: ['No medications', 'Metformin', 'Amlodipine', 'Thyronorm', 'Ayurvedic medicines', 'Herbal supplements'],
    }
  }

  if (step === 15) {
    return {
      id: 'allergies',
      field: 'allergies',
      question: 'Does the patient have any known allergies?',
      type: 'text',
      suggestions: ['No known allergies', 'Drug allergy', 'Food allergy', 'Dust allergy', 'Pollen allergy'],
    }
  }

  // Phase 6: Ashtavidha Pariksha (steps 16-23)
  if (step === 16) {
    return {
      id: 'nadi',
      field: 'nadi',
      question: '**Nadi (Pulse)** — What characteristics were noted?',
      type: 'select',
      options: [
        { value: 'Vata', label: 'Vata — Thready, fast, irregular (like snake movement)' },
        { value: 'Pitta', label: 'Pitta — Bounding, moderate rate (like frog movement)' },
        { value: 'Kapha', label: 'Kapha — Slow, deep, steady (like swan movement)' },
        { value: 'Vata-Pitta', label: 'Vata-Pitta — Mixed Vata and Pitta pattern' },
        { value: 'Pitta-Kapha', label: 'Pitta-Kapha — Mixed Pitta and Kapha pattern' },
        { value: 'Kapha-Vata', label: 'Kapha-Vata — Mixed Kapha and Vata pattern' },
        { value: 'Tridosha', label: 'Tridosha — All three doshas affected' },
      ],
    }
  }

  if (step === 17) {
    return {
      id: 'mootra',
      field: 'mootra',
      question: '**Mootra (Urine)** — What is the urinary pattern?',
      type: 'select',
      options: [
        { value: 'Normal', label: 'Normal — Clear, moderate frequency' },
        { value: 'Increased frequency', label: 'Increased frequency (Prabhoota)' },
        { value: 'Burning', label: 'Burning sensation (Daha)' },
        { value: 'Dark colored', label: 'Dark colored urine' },
        { value: 'Cloudy', label: 'Cloudy/turbid (Avila)' },
        { value: 'Sweet smell', label: 'Sweet smell (Madhura — Prameha indicator)' },
        { value: 'Scanty', label: 'Scanty urination' },
      ],
    }
  }

  if (step === 18) {
    return {
      id: 'mala',
      field: 'mala',
      question: '**Mala (Stool)** — What is the stool pattern?',
      type: 'select',
      options: [
        { value: 'Regular', label: 'Regular — Well-formed, daily' },
        { value: 'Constipated', label: 'Constipated (Vibandha) — Hard, infrequent' },
        { value: 'Loose', label: 'Loose stools (Atisara)' },
        { value: 'Irregular', label: 'Irregular — Alternating constipation and loose' },
        { value: 'Mucus', label: 'Mucus in stool' },
        { value: 'Undigested food', label: 'Undigested food particles' },
        { value: 'Heavy/foul smell', label: 'Heavy/foul smell' },
      ],
    }
  }

  if (step === 19) {
    return {
      id: 'jivha',
      field: 'jivha',
      question: '**Jivha (Tongue)** — What is the tongue appearance?',
      type: 'select',
      options: [
        { value: 'Clean', label: 'Clean and pink (Healthy)' },
        { value: 'White coated', label: 'White coating (Ama/Kapha)' },
        { value: 'Yellow coated', label: 'Yellow coating (Pitta)' },
        { value: 'Red', label: 'Red/inflamed (Pitta)' },
        { value: 'Pale', label: 'Pale (Vata/Kapha)' },
        { value: 'Cracked', label: 'Cracked/dry (Vata)' },
        { value: 'Indented edges', label: 'Indented edges (Teeth marks — Ama)' },
      ],
    }
  }

  if (step === 20) {
    return {
      id: 'drik',
      field: 'drik',
      question: '**Drik (Eyes)** — What is the eye appearance?',
      type: 'select',
      options: [
        { value: 'Normal', label: 'Normal — Clear, bright' },
        { value: 'Red', label: 'Red/congested (Pitta)' },
        { value: 'Dry', label: 'Dry (Vata)' },
        { value: 'Cloudy', label: 'Cloudy/dull (Kapha)' },
        { value: 'Yellowish', label: 'Yellowish sclera (Pitta/Liver)' },
        { value: 'Watery', label: 'Watery (Kapha)' },
      ],
    }
  }

  if (step === 21) {
    return {
      id: 'shabda',
      field: 'shabda',
      question: '**Shabda (Voice)** — How is the voice quality?',
      type: 'select',
      options: [
        { value: 'Clear', label: 'Clear and strong (Healthy)' },
        { value: 'Hoarse', label: 'Hoarse/rough (Vata)' },
        { value: 'Weak', label: 'Weak/faint (Vata)' },
        { value: 'Loud', label: 'Loud/forceful (Pitta)' },
        { value: 'Heavy', label: 'Heavy/slow (Kapha)' },
        { value: 'Stammering', label: 'Stammering/hesitant (Vata)' },
      ],
    }
  }

  if (step === 22) {
    return {
      id: 'sparsh',
      field: 'sparsh',
      question: '**Sparsh (Skin/Touch)** — What is the skin texture and temperature?',
      type: 'select',
      options: [
        { value: 'Normal', label: 'Normal — Warm, smooth, supple' },
        { value: 'Warm', label: 'Warm to touch (Pitta)' },
        { value: 'Cool', label: 'Cool to touch (Kapha/Vata)' },
        { value: 'Dry', label: 'Dry/rough (Vata)' },
        { value: 'Oily', label: 'Oily/greasy (Kapha)' },
        { value: 'Moist', label: 'Moist/sweaty (Kapha/Pitta)' },
        { value: 'Rough', label: 'Rough/cracked (Vata)' },
      ],
    }
  }

  if (step === 23) {
    return {
      id: 'aakriti',
      field: 'aakriti',
      question: '**Aakriti (Body Build)** — What is the body constitution?',
      type: 'select',
      options: [
        { value: 'Lean', label: 'Lean/thin (Vata dominant)' },
        { value: 'Medium', label: 'Medium/muscular (Pitta dominant)' },
        { value: 'Heavy', label: 'Heavy/sturdy (Kapha dominant)' },
        { value: 'Obese', label: 'Overweight/obese (Kapha/Medodhatu)' },
        { value: 'Emaciated', label: 'Emaciated (Severe Vata)' },
        { value: 'Athletic', label: 'Athletic/well-proportioned (Balanced)' },
      ],
    }
  }

  // Phase 7: Dashavidha (steps 24-29)
  if (step === 24) {
    return {
      id: 'prakritiDetail',
      field: 'prakritiDetail',
      question: '**Prakriti (Natural Constitution)** — Based on lifelong characteristics, what is the natural constitution?',
      type: 'select',
      options: [
        { value: 'Vata', label: 'Vata — Creative, quick-thinking, lean build' },
        { value: 'Pitta', label: 'Pitta — Sharp intellect, medium build, leadership' },
        { value: 'Kapha', label: 'Kapha — Calm, sturdy build, strong immunity' },
        { value: 'Vata-Pitta', label: 'Vata-Pitta — Mixed Vata and Pitta' },
        { value: 'Pitta-Kapha', label: 'Pitta-Kapha — Mixed Pitta and Kapha' },
        { value: 'Kapha-Vata', label: 'Kapha-Vata — Mixed Kapha and Vata' },
        { value: 'Tridosha', label: 'Tridosha — Balanced all three' },
      ],
    }
  }

  if (step === 25) {
    return {
      id: 'saara',
      field: 'saara',
      question: '**Saara (Tissue Quality)** — Which dhatu (tissue) quality is most prominent?',
      type: 'select',
      options: [
        { value: 'Rasa', label: 'Rasa (Plasma) — Soft skin, good complexion, emotional' },
        { value: 'Rakta', label: 'Rakta (Blood) — Bright eyes, warm skin, passionate' },
        { value: 'Mamsa', label: 'Mamsa (Muscle) — Well-developed muscles, courageous' },
        { value: 'Meda', label: 'Meda (Fat) — Soft skin, large body, joyful' },
        { value: 'Asthi', label: 'Asthi (Bone) — Strong bones, prominent joints, stable' },
        { value: 'Majja', label: 'Majja (Marrow/Nerve) — Soft organs, sensitive, intelligent' },
        { value: 'Shukra', label: 'Shukra (Reproductive) — Bright complexion, charming, strong' },
      ],
    }
  }

  if (step === 26) {
    return {
      id: 'samhanana',
      field: 'samhanana',
      question: '**Samhanana (Body Compactness)** — How compact is the body structure?',
      type: 'select',
      options: [
        { value: 'Compact', label: 'Compact/well-knit (Strong constitution)' },
        { value: 'Moderate', label: 'Moderate (Average constitution)' },
        { value: 'Loose', label: 'Loose/flabby (Weak constitution)' },
      ],
    }
  }

  if (step === 27) {
    return {
      id: 'satva',
      field: 'satva',
      question: '**Satva (Mental Strength)** — How is the mental resilience?',
      type: 'select',
      options: [
        { value: 'Strong', label: 'Strong — High tolerance, positive outlook, good memory' },
        { value: 'Medium', label: 'Medium — Moderate tolerance, sometimes overwhelmed' },
        { value: 'Weak', label: 'Weak — Low tolerance, anxious, poor memory' },
      ],
    }
  }

  if (step === 28) {
    return {
      id: 'aharaShakti',
      field: 'aharaShakti',
      question: '**Ahara Shakti (Digestive Capacity)** — How is the appetite and digestion?',
      type: 'select',
      options: [
        { value: 'Strong', label: 'Strong — Good appetite, digests all foods well' },
        { value: 'Medium', label: 'Medium — Moderate appetite, sometimes slow digestion' },
        { value: 'Weak', label: 'Weak — Poor appetite, frequent indigestion' },
        { value: 'Irregular', label: 'Irregular — Sometimes hungry, sometimes no appetite (Vishama Agni)' },
      ],
    }
  }

  if (step === 29) {
    return {
      id: 'vyayamaShakti',
      field: 'vyayamaShakti',
      question: '**Vyayama Shakti (Exercise Tolerance)** — How is the physical endurance?',
      type: 'select',
      options: [
        { value: 'Strong', label: 'Strong — Can exercise vigorously for long' },
        { value: 'Medium', label: 'Medium — Moderate endurance, needs rest' },
        { value: 'Weak', label: 'Weak — Gets tired quickly, low stamina' },
      ],
    }
  }

  return null
}

function buildCaseDataFromAnswers(caseData: Partial<CaseData>): Partial<CaseData> {
  return {
    name: caseData.name || '',
    age: caseData.age || '',
    gender: caseData.gender || '',
    occupation: caseData.occupation || '',
    area: caseData.area || '',
    prakriti: caseData.prakriti || '',
    chiefComplaints: caseData.chiefComplaints || [],
    comorbidities: caseData.comorbidities || [],
    investigations: caseData.investigations || [],
    investigationText: caseData.investigationText || '',
    ongoingMedications: caseData.ongoingMedications || '',
    medicalHistory: caseData.medicalHistory || '',
    allergies: caseData.allergies || '',
    familyHistory: caseData.familyHistory || '',
    nadi: caseData.nadi || '',
    mootra: caseData.mootra || '',
    mala: caseData.mala || '',
    jivha: caseData.jivha || '',
    drik: caseData.drik || '',
    sparsh: caseData.sparsh || '',
    shabda: caseData.shabda || '',
    aakriti: caseData.aakriti || '',
    prakritiDetail: caseData.prakritiDetail || '',
    saara: caseData.saara || '',
    samhanana: caseData.samhanana || '',
    satva: caseData.satva || '',
    aharaShakti: caseData.aharaShakti || '',
    vyayamaShakti: caseData.vyayamaShakti || '',
    desha: caseData.desha || '',
    provisionalDiagnosis: caseData.provisionalDiagnosis || '',
    provisionalReasoning: caseData.provisionalReasoning || '',
  }
}

function generateDiagnosisFromEngine(caseData: Partial<CaseData>): string {
  try {
    const result = analyzeProvisionalDiagnosis(caseData as CaseData)
    let output = formatDiagnosisForDisplay(result)

    // Enrich with knowledge base data
    const diseaseEntry = AYURVEDA_KNOWLEDGE.diseases?.find(
      d => d.name.toLowerCase() === result.primary.disease.toLowerCase()
    )
    if (diseaseEntry) {
      output += `\n\n### Knowledge Base: ${diseaseEntry.name}\n`
      output += `**Modern Correlation:** ${diseaseEntry.modernCorrelation}\n`
      output += `**Treatment Approach:** ${diseaseEntry.treatment.slice(0, 3).join(', ')}\n`
      output += `**Pathya (Recommended):** ${diseaseEntry.pathya.slice(0, 5).join(', ')}\n`
      output += `**Apathya (Avoid):** ${diseaseEntry.apathya.slice(0, 5).join(', ')}\n`
      output += `**Prognosis:** ${diseaseEntry.prognosis}\n`
    }

    // Check for drug interactions
    if (caseData.ongoingMedications && caseData.ongoingMedications !== 'No medications') {
      output += `\n### ⚠️ Drug Interaction Alert\n`
      output += `Patient is on: ${caseData.ongoingMedications}\n`
      output += `Please verify herb-drug interactions before prescribing.\n`
    }

    return output
  } catch (error) {
    console.error('[Intake API] Diagnosis engine error:', error)
    return generateFallbackDiagnosis(caseData)
  }
}

function generateFallbackDiagnosis(caseData: Partial<CaseData>): string {
  const symptoms = caseData.chiefComplaints?.map(c => c.complaint).join(', ') || 'No symptoms recorded'
  const relatedDiseases = getRelatedDiseases(symptoms)

  const doshaIndicators: string[] = []
  const lowerSymptoms = symptoms.toLowerCase()
  if (lowerSymptoms.includes('pain') || lowerSymptoms.includes('stiffness') || lowerSymptoms.includes('dry')) {
    doshaIndicators.push('Vata')
  }
  if (lowerSymptoms.includes('burning') || lowerSymptoms.includes('heat') || lowerSymptoms.includes('inflammation')) {
    doshaIndicators.push('Pitta')
  }
  if (lowerSymptoms.includes('heaviness') || lowerSymptoms.includes('congestion') || lowerSymptoms.includes('swelling')) {
    doshaIndicators.push('Kapha')
  }

  const dosha = doshaIndicators.length > 0 ? doshaIndicators.join(', ') : 'To be determined'

  let output = `## Provisional Diagnosis\n\n`
  output += `### Symptoms Analyzed\n${symptoms}\n\n`
  output += `### Involved Doshas\n${dosha}\n\n`

  if (relatedDiseases.length > 0) {
    output += `### Possible Conditions (from Knowledge Base)\n`
    for (const disease of relatedDiseases) {
      const entry = AYURVEDA_KNOWLEDGE.diseases?.find(d => d.name === disease)
      if (entry) {
        output += `- **${entry.name}** (${entry.sanskrit}) — ${entry.modernCorrelation}\n`
        output += `  Dosha: ${entry.doshaInvolvement.join(', ')} | Treatment: ${entry.treatment.slice(0, 2).join(', ')}\n`
      }
    }
    output += '\n'
  }

  output += `### Ashtavidha Summary\n`
  output += `- Nadi: ${caseData.nadi || 'Not assessed'}\n`
  output += `- Mootra: ${caseData.mootra || 'Not assessed'}\n`
  output += `- Mala: ${caseData.mala || 'Not assessed'}\n`
  output += `- Jivha: ${caseData.jivha || 'Not assessed'}\n`
  output += `- Prakriti: ${caseData.prakritiDetail || 'Not assessed'}\n\n`

  output += `---\n*This is a knowledge-base-derived diagnosis. Please confirm with your clinical judgment.*\n`
  output += `- **[Confirm]** — Proceed to treatment protocol\n`
  output += `- **[Refine]** — Add more clinical details\n`
  output += `- **[Correct]** — Override with your diagnosis`

  return output
}

function updateLastComplaint(
  complaints: ChiefComplaint[],
  updates: Partial<ChiefComplaint>
): ChiefComplaint[] {
  if (complaints.length === 0) return complaints
  const updated = [...complaints]
  const lastIndex = updated.length - 1
  updated[lastIndex] = { ...updated[lastIndex], ...updates }
  return updated
}

// Fire-and-forget case persistence
async function persistCaseData(caseData: Partial<CaseData>, diagnosis: string) {
  try {
    const supabase = createServerClient()
    const caseNumber = `CASE-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Insert case record
    const { data: caseRecord, error: caseError } = await supabase
      .from('cases')
      .insert({
        case_number: caseNumber,
        chief_complaints: caseData.chiefComplaints || [],
        duration: caseData.chiefComplaints?.[0]?.duration || null,
        severity_score: caseData.chiefComplaints?.[0]?.severity || null,
        nadi: caseData.nadi || null,
        mootra: caseData.mootra || null,
        mala: caseData.mala || null,
        jivha: caseData.jivha || null,
        drik: caseData.drik || null,
        sparsh: caseData.sparsh || null,
        shabda: caseData.shabda || null,
        aakriti: caseData.aakriti || null,
        prakriti: caseData.prakritiDetail || caseData.prakriti || null,
        prakriti_detail: caseData.prakritiDetail || null,
        saara: caseData.saara || null,
        samhanana: caseData.samhanana || null,
        satva: caseData.satva || null,
        ahara_shakti: caseData.aharaShakti || null,
        vyayama_shakti: caseData.vyayamaShakti || null,
        desha: caseData.desha || null,
        comorbidities: caseData.comorbidities || [],
        medical_history: caseData.medicalHistory || null,
        allergies: caseData.allergies || null,
        family_history: caseData.familyHistory || null,
        ongoing_medications: caseData.ongoingMedications || null,
        investigation_text: caseData.investigationText || null,
        investigation_findings: caseData.investigations || [],
        provisional_diagnosis: caseData.provisionalDiagnosis || null,
        provisional_reasoning: caseData.provisionalReasoning || null,
        treatment_plan: diagnosis,
        status: 'active',
      })
      .select('id')
      .single()

    if (caseError) {
      console.warn('[Intake API] Case insert error:', caseError.message)
    } else {
      console.log('[Intake API] Case saved:', caseNumber, caseRecord?.id)
    }
  } catch (error) {
    console.warn('[Intake API] Persistence error:', error)
  }
}

interface FollowupQuestion {
  question: string
  rationale: string
  category: string
}

async function generateFollowupQuestions(caseData: Partial<CaseData>): Promise<FollowupQuestion[]> {
  try {
    const client = getNvidiaClient()

    // Build a flat record from caseData for the prompt builder
    const flatData: Record<string, unknown> = {
      name: caseData.name,
      age: caseData.age,
      gender: caseData.gender,
      occupation: caseData.occupation,
      prakriti: caseData.prakritiDetail || caseData.prakriti,
      comorbidities: caseData.comorbidities?.join(', '),
      medications: caseData.ongoingMedications,
      allergies: caseData.allergies,
      nadi: caseData.nadi,
      mootra: caseData.mootra,
      mala: caseData.mala,
      jivha: caseData.jivha,
      drik: caseData.drik,
      shabda: caseData.shabda,
      sparsh: caseData.sparsh,
      aakriti: caseData.aakriti,
      satva: caseData.satva,
      aharaShakti: caseData.aharaShakti,
      vyayamaShakti: caseData.vyayamaShakti,
    }

    // Add chief complaint details
    if (caseData.chiefComplaints && caseData.chiefComplaints.length > 0) {
      const primary = caseData.chiefComplaints[0]
      flatData.chiefComplaint = primary.complaint
      flatData.duration = primary.duration
      flatData.severity = String(primary.severity)
      flatData.location = primary.location
      flatData.onset = primary.onset
      flatData.aggravatingFactors = primary.aggravatingFactors?.join(', ')
      flatData.relievingFactors = primary.relievingFactors?.join(', ')
      flatData.associatedSymptoms = primary.associatedSymptoms?.join(', ')
    }

    const prompt = buildFollowupPrompt(flatData)

    const response = await client.chat.completions.create({
      model: 'meta/llama-3.3-8b-instruct',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.4,
    })

    const content = response.choices[0]?.message?.content || '[]'
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0])
      return questions.slice(0, 5) as FollowupQuestion[]
    }
    return []
  } catch (error) {
    console.error('[Intake API] Follow-up generation error:', error)
    return []
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = intakeRequestSchema.parse(body)

    const { action, answer, currentStep = 0, caseData = {} } = validated
    const sanitizedAnswer = answer ? sanitizeInput(answer) : answer

    switch (action) {
      case 'start':
        return NextResponse.json(getWelcomeMessage())

      case 'answer': {
        const updated = buildCaseDataFromAnswers(caseData as Partial<CaseData>)

        // Step-to-field mapping — every step saves its answer
        switch (currentStep) {
          case 0:
            updated.name = sanitizedAnswer ?? ''
            break
          case 1:
            updated.age = sanitizedAnswer ?? ''
            break
          case 2:
            updated.gender = sanitizedAnswer ?? ''
            break
          case 3:
            updated.occupation = sanitizedAnswer ?? ''
            break
          case 4:
            updated.area = sanitizedAnswer ?? ''
            break
          case 5: {
            // Chief complaint — create new entry
            const newComplaint: ChiefComplaint = {
              id: `complaint_${Date.now()}`,
              complaint: sanitizedAnswer ?? '',
              duration: '',
              severity: 5,
            }
            updated.chiefComplaints = [...(updated.chiefComplaints || []), newComplaint]
            break
          }
          case 6: {
            // Duration — update last complaint
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { duration: sanitizedAnswer ?? '' }
            )
            break
          }
          case 7: {
            // Severity — update last complaint
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { severity: parseInt(sanitizedAnswer ?? '5') || 5 }
            )
            break
          }
          case 8: {
            // Location — update last complaint
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { location: sanitizedAnswer ?? '' }
            )
            break
          }
          case 9: {
            // Onset — update last complaint
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { onset: sanitizedAnswer ?? '' }
            )
            break
          }
          case 10: {
            // Aggravating factors
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { aggravatingFactors: sanitizedAnswer?.split(',').map(s => s.trim()).filter(Boolean) ?? [] }
            )
            break
          }
          case 11: {
            // Relieving factors
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { relievingFactors: sanitizedAnswer?.split(',').map(s => s.trim()).filter(Boolean) ?? [] }
            )
            break
          }
          case 12: {
            // Associated symptoms
            updated.chiefComplaints = updateLastComplaint(
              updated.chiefComplaints || [],
              { associatedSymptoms: sanitizedAnswer?.split(',').map(s => s.trim()).filter(Boolean) ?? [] }
            )
            break
          }
          case 13: {
            // Comorbidities
            updated.comorbidities = sanitizedAnswer ? [sanitizedAnswer] : []
            break
          }
          case 14: {
            // Ongoing medications
            updated.ongoingMedications = sanitizedAnswer ?? ''
            break
          }
          case 15: {
            // Allergies
            updated.allergies = sanitizedAnswer ?? ''
            break
          }
          case 16:
            updated.nadi = sanitizedAnswer ?? ''
            break
          case 17:
            updated.mootra = sanitizedAnswer ?? ''
            break
          case 18:
            updated.mala = sanitizedAnswer ?? ''
            break
          case 19:
            updated.jivha = sanitizedAnswer ?? ''
            break
          case 20:
            updated.drik = sanitizedAnswer ?? ''
            break
          case 21:
            updated.shabda = sanitizedAnswer ?? ''
            break
          case 22:
            updated.sparsh = sanitizedAnswer ?? ''
            break
          case 23:
            updated.aakriti = sanitizedAnswer ?? ''
            break
          case 24:
            updated.prakritiDetail = sanitizedAnswer ?? ''
            updated.prakriti = sanitizedAnswer ?? ''
            break
          case 25:
            updated.saara = sanitizedAnswer ?? ''
            break
          case 26:
            updated.samhanana = sanitizedAnswer ?? ''
            break
          case 27:
            updated.satva = sanitizedAnswer ?? ''
            break
          case 28:
            updated.aharaShakti = sanitizedAnswer ?? ''
            break
          case 29:
            updated.vyayamaShakti = sanitizedAnswer ?? ''
            break
        }

        const nextStep = currentStep + 1
        const nextQuestion = getNextQuestionForStep(nextStep, updated as Partial<CaseData>)

        return NextResponse.json({
          type: nextQuestion ? 'question' : 'confirmation',
          question: nextQuestion,
          progress: calculateProgress(updated as Partial<CaseData>),
          caseData: updated,
          message: nextQuestion
            ? undefined
            : 'All information collected. Ready to generate provisional diagnosis.',
        })
      }

      case 'getQuestion': {
        const question = getNextQuestionForStep(currentStep, caseData as Partial<CaseData>)
        return NextResponse.json({
          type: question ? 'question' : 'confirmation',
          question,
          progress: calculateProgress(caseData as Partial<CaseData>),
        })
      }

      case 'showDiagnosis': {
        const fullCaseData = buildCaseDataFromAnswers(caseData as Partial<CaseData>)
        const diagnosis = generateDiagnosisFromEngine(fullCaseData as Partial<CaseData>)

        // Persist case data to Supabase (fire-and-forget)
        persistCaseData(fullCaseData, diagnosis).catch(err =>
          console.warn('[Intake API] Case persistence failed:', err)
        )

        return NextResponse.json({
          type: 'diagnosis',
          diagnosis,
          progress: calculateProgress(fullCaseData as Partial<CaseData>),
          caseData: fullCaseData,
        })
      }

      case 'generateFollowup': {
        const fullCaseData = buildCaseDataFromAnswers(caseData as Partial<CaseData>)
        const questions = await generateFollowupQuestions(fullCaseData)

        if (questions.length === 0) {
          // No follow-up questions generated, go straight to confirmation
          return NextResponse.json({
            type: 'confirmation',
            progress: calculateProgress(fullCaseData as Partial<CaseData>),
            caseData: fullCaseData,
            message: 'All information collected. Ready to generate provisional diagnosis.',
          })
        }

        return NextResponse.json({
          type: 'followup_questions',
          questions,
          progress: calculateProgress(fullCaseData as Partial<CaseData>),
          caseData: fullCaseData,
        })
      }

      case 'answerFollowup': {
        const fullCaseData = buildCaseDataFromAnswers(caseData as Partial<CaseData>)
        const answers = validated.followupAnswers || {}

        // Store follow-up answers in medicalHistory field (append)
        const followupSummary = Object.entries(answers)
          .map(([q, a]) => `Q: ${q}\nA: ${a}`)
          .join('\n\n')

        const existingHistory = fullCaseData.medicalHistory || ''
        fullCaseData.medicalHistory = existingHistory
          ? `${existingHistory}\n\n--- AI Follow-up ---\n${followupSummary}`
          : `--- AI Follow-up ---\n${followupSummary}`

        return NextResponse.json({
          type: 'confirmation',
          progress: calculateProgress(fullCaseData as Partial<CaseData>),
          caseData: fullCaseData,
          message: 'Follow-up information recorded. Ready to generate provisional diagnosis.',
        })
      }

      case 'reset':
        return NextResponse.json(getWelcomeMessage())

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body', details: error.issues }, { status: 400 })
    }
    console.error('[Intake API] Error:', error)
    return NextResponse.json({ error: 'Failed to process intake request' }, { status: 500 })
  }
}
