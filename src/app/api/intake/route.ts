import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { CaseData, ChiefComplaint } from '@/lib/types'

const intakeRequestSchema = z.object({
  action: z.enum(['start', 'answer', 'getQuestion', 'showDiagnosis', 'reset']),
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
    investigations: z.array(z.any()).optional(),
    ongoingMedications: z.string().optional(),
  }).optional(),
  pendingComplaints: z.array(z.string()).optional(),
})

interface IntakeResponse {
  type: 'question' | 'diagnosis' | 'confirmation' | 'welcome'
  question?: {
    id: string
    field: string
    question: string
    type: string
    options?: Array<{ value: string; label: string }>
    suggestions?: string[]
    severityScale?: { min: number; max: number; default: string }
  }
  message?: string
  progress?: {
    current: number
    total: number
    percentage: number
  }
  caseData?: Partial<CaseData>
  diagnosis?: string
}

function calculateProgress(caseData: Partial<CaseData>): { current: number; total: number; percentage: number } {
  let filled = 0
  const total = 10

  if (caseData.name) filled++
  if (caseData.age) filled++
  if (caseData.gender) filled++
  if (caseData.occupation) filled++
  if (caseData.area) filled++
  if (caseData.chiefComplaints && caseData.chiefComplaints.length > 0) filled++
  if (caseData.nadi || caseData.mala || caseData.jivha) filled++
  if (caseData.prakritiDetail) filled++
  if (caseData.comorbidities && caseData.comorbidities.length > 0) filled++
  if (caseData.ongoingMedications) filled++

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

I'll help you gather comprehensive patient information through a structured consultation process. This will help create a detailed treatment protocol.

**How this works:**
1. I'll ask a series of questions about the patient
2. We can address chief complaints in detail
3. I'll perform Ashtavidha Pariksha (8-fold examination)
4. We'll arrive at a provisional diagnosis
5. Finally, generate a treatment plan

**You can:**
- Upload investigation PDFs for AI analysis
- Type natural responses or use quick-select options
- Correct the AI's provisional diagnosis at any point
- Ask to skip or revisit questions

Shall we begin?

**Please enter the patient's name to start:**`,
    progress: { current: 0, total: 10, percentage: 0 },
  }
}

function getNextQuestionForStep(step: number, caseData: Partial<CaseData>): IntakeResponse['question'] | null {
  const basicQuestions = [
    { id: 'name', field: 'name', question: "What is the patient's name?", type: 'text' },
    { id: 'age', field: 'age', question: 'How old is the patient?', type: 'number' },
    { id: 'gender', field: 'gender', question: 'What is the patient\'s gender?', type: 'select', options: [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }] },
    { id: 'occupation', field: 'occupation', question: 'What is the patient\'s occupation?', type: 'text' },
    { id: 'area', field: 'area', question: 'Which area/city does the patient live in?', type: 'text' },
  ]

  if (step < basicQuestions.length) {
    return basicQuestions[step]
  }

  if (step === 5) {
    return {
      id: 'chiefComplaints',
      field: 'chiefComplaints',
      question: 'What brings the patient here today? Please describe all the main concerns.',
      type: 'text',
    }
  }

  if (step === 6) {
    return {
      id: 'duration',
      field: 'duration',
      question: 'How long has the patient been experiencing this?',
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
      question: 'On a scale of 1-10, how would you rate the severity? (1=mild, 10=severe)',
      type: 'scale',
      severityScale: { min: 1, max: 10, default: '5' },
    }
  }

  if (step === 8) {
    return {
      id: 'nadi',
      field: 'nadi',
      question: 'Nadi (Pulse): What characteristics were noted?',
      type: 'select',
      options: [
        { value: 'Vata', label: 'Vata - Thready, fast, irregular' },
        { value: 'Pitta', label: 'Pitta - Bounding, moderate rate' },
        { value: 'Kapha', label: 'Kapha - Slow, deep, steady' },
        { value: 'Mixed', label: 'Mixed/Difficult to determine' },
      ],
    }
  }

  if (step === 9) {
    return {
      id: 'prakriti',
      field: 'prakriti',
      question: 'Based on lifelong characteristics, what is the natural constitution?',
      type: 'select',
      options: [
        { value: 'Vata', label: 'Vata' },
        { value: 'Pitta', label: 'Pitta' },
        { value: 'Kapha', label: 'Kapha' },
        { value: 'Vata-Pitta', label: 'Vata-Pitta' },
        { value: 'Pitta-Kapha', label: 'Pitta-Kapha' },
        { value: 'Kapha-Vata', label: 'Kapha-Vata' },
        { value: 'Tridosha', label: 'Tridosha' },
      ],
    }
  }

  return undefined
}

function analyzeProvisionalDiagnosis(caseData: Partial<CaseData>): string {
  const symptoms = caseData.chiefComplaints?.map(c => c.complaint).join(', ') || 'No symptoms recorded'
  const doshaIndicators: string[] = []

  if (symptoms.toLowerCase().includes('pain') || symptoms.toLowerCase().includes('stiffness')) {
    doshaIndicators.push('Vata')
  }
  if (symptoms.toLowerCase().includes('burning') || symptoms.toLowerCase().includes('heat')) {
    doshaIndicators.push('Pitta')
  }
  if (symptoms.toLowerCase().includes('heaviness') || symptoms.toLowerCase().includes('congestion')) {
    doshaIndicators.push('Kapha')
  }

  const dosha = doshaIndicators.length > 0 ? doshaIndicators.join(', ') : 'Vata, Pitta, Kapha'

  return `## Current Diagnostic Thinking

Based on the information gathered so far:

### Primary Suspect
**Condition to be determined**

### Samprapti (Pathogenesis)
A assessment based on symptom patterns.

### Involved Doshas
${dosha}

### Key Symptoms
${symptoms}

### Diagnostic Confidence
Insufficient data - more information needed

---

Does this align with your clinical judgment?

- **[Confirm]** - Proceed to treatment plan
- **[Refine]** - Let me add more information
- **[Correct]** - I believe it's different`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = intakeRequestSchema.parse(body)

    const { action, answer, currentStep = 0, caseData = {} } = validated

    switch (action) {
      case 'start':
        return NextResponse.json(getWelcomeMessage())

      case 'answer': {
        const updatedCaseData = { ...caseData }

        if (currentStep === 0) {
          updatedCaseData.name = answer
        } else if (currentStep === 1) {
          updatedCaseData.age = answer
        } else if (currentStep === 2) {
          updatedCaseData.gender = answer
        } else if (currentStep === 3) {
          updatedCaseData.occupation = answer
        } else if (currentStep === 4) {
          updatedCaseData.area = answer
        } else if (currentStep === 5) {
          const newComplaint: ChiefComplaint = {
            id: `complaint_${Date.now()}`,
            complaint: answer ?? '',
            duration: '',
            severity: 5,
          }
          updatedCaseData.chiefComplaints = [...(caseData.chiefComplaints || []), newComplaint]
        }

        const nextStep = currentStep + 1
        const nextQuestion = getNextQuestionForStep(nextStep, updatedCaseData)

        return NextResponse.json({
          type: nextQuestion ? 'question' : 'confirmation',
          question: nextQuestion,
          progress: calculateProgress(updatedCaseData),
          caseData: updatedCaseData,
          message: nextQuestion ? undefined : 'I have gathered the initial information. Ready for diagnosis?',
        })
      }

      case 'getQuestion': {
        const question = getNextQuestionForStep(currentStep, caseData)
        return NextResponse.json({
          type: question ? 'question' : 'confirmation',
          question,
          progress: calculateProgress(caseData),
        })
      }

      case 'showDiagnosis':
        return NextResponse.json({
          type: 'diagnosis',
          diagnosis: analyzeProvisionalDiagnosis(caseData),
          progress: calculateProgress(caseData),
        })

      case 'reset':
        return NextResponse.json(getWelcomeMessage())

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to process intake request' }, { status: 500 })
  }
}