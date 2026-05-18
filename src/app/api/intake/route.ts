import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { CaseData, ChiefComplaint } from '@/lib/types'
import {
  BASIC_INFO_QUESTIONS,
  COMPLAINT_INTRO_QUESTION,
  COMPLAINT_FOLLOWUP_QUESTIONS,
  getQuestionsForComplaint,
  ASHTAVIDHA_QUESTIONS,
  DASHVIDHA_QUESTIONS,
  MEDICAL_HISTORY_QUESTIONS,
  getNextQuestion,
} from '@/lib/intake-questions'
import { analyzeProvisionalDiagnosis, formatDiagnosisForDisplay } from '@/lib/diagnosis-engine'

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
      duration: z.string().optional(),
      severity: z.number().optional(),
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
  let total = 10
  
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

function processAnswer(
  answer: string,
  currentStep: number,
  caseData: Partial<CaseData>,
  pendingComplaints: string[]
): IntakeResponse {
  const updatedCaseData = { ...caseData }
  const nextPending = [...pendingComplaints]
  
  switch (currentStep) {
    case 0:
      updatedCaseData.name = answer
      break
    case 1:
      updatedCaseData.age = answer
      break
    case 2:
      updatedCaseData.gender = answer
      break
    case 3:
      updatedCaseData.occupation = answer
      break
    case 4:
      updatedCaseData.area = answer
      break
    case 5:
      const newComplaint: ChiefComplaint = {
        id: `complaint_${Date.now()}`,
        complaint: answer,
        duration: '',
        severity: 5,
      }
      updatedCaseData.chiefComplaints = [...(caseData.chiefComplaints || []), newComplaint]
      nextPending.push(answer)
      break
  }
  
  const progress = calculateProgress(updatedCaseData)
  
  if (currentStep === 5) {
    return {
      type: 'question',
      question: COMPLAINT_FOLLOWUP_QUESTIONS[0],
      progress,
      caseData: updatedCaseData,
      message: `Thank you. I've noted "${answer}" as a chief complaint.`,
    }
  }
  
  const nextQ = getNextQuestion(updatedCaseData as CaseData, currentStep + 1, nextPending)
  
  if (nextQ) {
    return {
      type: 'question',
      question: {
        id: nextQ.id,
        field: nextQ.field,
        question: nextQ.question,
        type: nextQ.type,
        options: nextQ.options,
        suggestions: nextQ.suggestions,
        severityScale: nextQ.severityScale,
      },
      progress,
      caseData: updatedCaseData,
    }
  }
  
  return {
    type: 'confirmation',
    message: 'I have gathered the initial information. Shall we proceed to detailed complaint assessment?',
    progress,
    caseData: updatedCaseData,
  }
}

function generateDiagnosis(caseData: CaseData): IntakeResponse {
  try {
    const result = analyzeProvisionalDiagnosis(caseData)
    const diagnosisText = formatDiagnosisForDisplay(result)
    
    return {
      type: 'diagnosis',
      diagnosis: diagnosisText,
      progress: calculateProgress(caseData),
    }
  } catch (error) {
    return {
      type: 'question',
      message: 'Unable to generate diagnosis at this point. Please ensure we have collected the chief complaints.',
      progress: calculateProgress(caseData),
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = intakeRequestSchema.parse(body)
    
    const { action, answer, currentStep = 0, caseData = {}, pendingComplaints = [] } = validated
    
    switch (action) {
      case 'start':
        return NextResponse.json(getWelcomeMessage())
      
      case 'answer':
        return NextResponse.json(processAnswer(answer || '', currentStep, caseData, pendingComplaints))
      
      case 'getQuestion':
        const question = getNextQuestion(caseData as CaseData, currentStep, pendingComplaints)
        if (question) {
          return NextResponse.json({
            type: 'question',
            question: {
              id: question.id,
              field: question.field,
              question: question.question,
              type: question.type,
              options: question.options,
              suggestions: question.suggestions,
              severityScale: question.severityScale,
            },
            progress: calculateProgress(caseData),
          })
        }
        return NextResponse.json({
          type: 'confirmation',
          message: 'All questions have been addressed. Ready for diagnosis?',
          progress: calculateProgress(caseData),
        })
      
      case 'showDiagnosis':
        return NextResponse.json(generateDiagnosis(caseData as CaseData))
      
      case 'reset':
        return NextResponse.json(getWelcomeMessage())
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to process intake request' }, { status: 500 })
  }
}