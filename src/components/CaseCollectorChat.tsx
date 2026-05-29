'use client'

import { useState, useRef, useEffect } from 'react'
import { useProtocolStore } from '@/lib/stores/protocol-store'
import { generateId } from '@/lib/utils'
import type { CaseData } from '@/lib/types'

interface Question {
  id: string
  field: string
  question: string
  type: string
  options?: { value: string; label: string }[]
  suggestions?: string[]
  severityScale?: { min: number; max: number; default: string }
}

interface FollowupQuestion {
  question: string
  rationale: string
  category: string
}

type Phase = 'wizard' | 'review' | 'followup' | 'diagnosis' | 'protocol'

const WIZARD_GROUPS = [
  { id: 'patient-info', label: 'Patient Information', startStep: 0, endStep: 4 },
  { id: 'chief-complaint', label: 'Chief Complaints', startStep: 5, endStep: 12 },
  { id: 'medical-history', label: 'Medical History', startStep: 13, endStep: 15 },
  { id: 'ashtavidha', label: 'Ashtavidha Pariksha', startStep: 16, endStep: 23 },
  { id: 'dashavidha', label: 'Dashavidha Pariksha', startStep: 24, endStep: 29 },
]

// ─── Wizard Header ──────────────────────────────────────────────

function WizardHeader({ groups, currentIndex, completedIndices, onGroupClick }: {
  groups: typeof WIZARD_GROUPS
  currentIndex: number
  completedIndices: Set<number>
  onGroupClick: (index: number) => void
}) {
  return (
    <div className="px-3 py-2 border-b border-border bg-muted/30 flex-shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {groups.map((group, index) => {
          const isCompleted = completedIndices.has(index)
          const isCurrent = index === currentIndex
          const isClickable = isCompleted || index < currentIndex

          return (
            <button
              key={group.id}
              onClick={() => isClickable && onGroupClick(index)}
              disabled={!isClickable}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                isCurrent
                  ? 'bg-primary text-primary-foreground font-medium'
                  : isCompleted
                  ? 'bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer'
                  : 'text-muted-foreground/50 cursor-default'
              }`}
            >
              {isCompleted && !isCurrent ? (
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : isCurrent ? (
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full flex-shrink-0" />
              ) : null}
              <span className="hidden sm:inline">{group.label}</span>
              <span className="sm:hidden">{index + 1}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Review Screen ──────────────────────────────────────────────

function ReviewScreen({ caseData, onEdit }: {
  caseData: Partial<CaseData>
  onEdit: (groupIndex: number) => void
}) {
  const sections = [
    {
      groupIndex: 0,
      title: 'Patient Information',
      items: [
        { label: 'Name', value: caseData.name },
        { label: 'Age', value: caseData.age },
        { label: 'Gender', value: caseData.gender },
        { label: 'Occupation', value: caseData.occupation },
        { label: 'Area', value: caseData.area },
      ].filter(item => item.value),
    },
    {
      groupIndex: 1,
      title: 'Chief Complaints',
      items: caseData.chiefComplaints?.length
        ? caseData.chiefComplaints.map((c, i) => ({
            label: `${i + 1}. ${c.complaint}`,
            value: [
              c.duration && `Duration: ${c.duration}`,
              c.severity && `Severity: ${c.severity}/10`,
              c.location && `Location: ${c.location}`,
            ].filter(Boolean).join(' · ') || undefined,
          }))
        : [{ label: 'No complaints recorded', value: undefined }],
    },
    {
      groupIndex: 2,
      title: 'Medical History',
      items: [
        { label: 'Comorbidities', value: caseData.comorbidities?.join(', ') || 'None' },
        { label: 'Medications', value: caseData.ongoingMedications || 'None' },
        { label: 'Allergies', value: caseData.allergies || 'None' },
      ],
    },
    {
      groupIndex: 3,
      title: 'Ashtavidha Pariksha',
      items: [
        { label: 'Nadi', value: caseData.nadi },
        { label: 'Mootra', value: caseData.mootra },
        { label: 'Mala', value: caseData.mala },
        { label: 'Jivha', value: caseData.jivha },
        { label: 'Drik', value: caseData.drik },
        { label: 'Shabda', value: caseData.shabda },
        { label: 'Sparsh', value: caseData.sparsh },
        { label: 'Aakriti', value: caseData.aakriti },
      ].filter(item => item.value),
    },
    {
      groupIndex: 4,
      title: 'Dashavidha Pariksha',
      items: [
        { label: 'Prakriti', value: caseData.prakritiDetail },
        { label: 'Saara', value: caseData.saara },
        { label: 'Samhanana', value: caseData.samhanana },
        { label: 'Satva', value: caseData.satva },
        { label: 'Ahara Shakti', value: caseData.aharaShakti },
        { label: 'Vyayama Shakti', value: caseData.vyayamaShakti },
      ].filter(item => item.value),
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-foreground">Review Case Information</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Review the collected data before generating the diagnosis. Click &quot;Edit&quot; to make changes.
        </p>
      </div>

      {sections.map(section => (
        <div key={section.groupIndex} className="bg-muted/30 rounded-lg p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">{section.title}</h4>
            <button
              onClick={() => onEdit(section.groupIndex)}
              className="text-xs text-primary hover:text-primary/80 transition-colors px-2 py-0.5 rounded hover:bg-primary/10"
            >
              Edit
            </button>
          </div>
          <div className="space-y-1">
            {section.items.map((item, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-muted-foreground min-w-[80px] flex-shrink-0">{item.label}:</span>
                <span className="text-foreground">{item.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────

export function CaseCollectorChat() {
  const addMessage = useProtocolStore((state) => state.addMessage)
  const setCanvasContent = useProtocolStore((state) => state.setCanvasContent)
  const messages = useProtocolStore((state) => state.messages)

  // Phase and navigation
  const [phase, setPhase] = useState<Phase>('wizard')
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [returnToReview, setReturnToReview] = useState(false)
  const [completedGroups, setCompletedGroups] = useState<Set<number>>(new Set())

  // Wizard state
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [progress, setProgress] = useState({ current: 0, total: 30, percentage: 0 })
  const [scaleValue, setScaleValue] = useState(5)
  const [complaintCount, setComplaintCount] = useState(0)

  // Follow-up state
  const [followupQuestions, setFollowupQuestions] = useState<FollowupQuestion[]>([])
  const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({})
  const [followupStep, setFollowupStep] = useState(0)
  const [isFollowupPhase, setIsFollowupPhase] = useState(false)
  const [protocolPhase, setProtocolPhase] = useState('')
  const [diagnosisText, setDiagnosisText] = useState('')
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [diagnosisShown, setDiagnosisShown] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const intakeInitialized = useRef(false)
  const caseDataRef = useRef<Partial<CaseData>>({})

  const [caseData, setCaseData] = useState<Partial<CaseData>>({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    area: '',
    chiefComplaints: [],
    comorbidities: [],
    ongoingMedications: '',
  })

  // Keep ref in sync
  caseDataRef.current = caseData

  // Derived state
  const currentGroup = WIZARD_GROUPS[currentGroupIndex]
  const isFirstGroup = currentGroupIndex === 0
  const isFirstStepInGroup = currentStep === currentGroup.startStep
  const isLastStepInGroup = currentStep === currentGroup.endStep

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, phase])

  // ─── API Functions ────────────────────────────────────────────

  const startIntake = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start' }),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const data = await response.json()

      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Welcome! I\'ll collect patient information for the clinical assessment. Let\'s start with basic patient details.',
        timestamp: Date.now(),
        status: 'complete',
      })

      if (data.progress) setProgress(data.progress)
      await fetchQuestion(0)
    } catch {
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchQuestion = async (step: number) => {
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getQuestion',
          currentStep: step,
          caseData: caseDataRef.current,
        }),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const data = await response.json()

      if (data.question) {
        setCurrentQuestion(data.question)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.question.question,
          timestamp: Date.now(),
          status: 'complete',
        })
      }
      if (data.progress) setProgress(data.progress)
    } catch (error) {
      console.error('Error fetching question:', error)
    }
  }

  const sendAnswer = async (answer: string) => {
    if (!answer.trim()) return
    setIsLoading(true)

    addMessage({
      id: generateId(),
      role: 'user',
      content: answer,
      timestamp: Date.now(),
      status: 'complete',
    })

    if (currentStep === 5) {
      setComplaintCount(prev => prev + 1)
    }

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          answer,
          currentStep,
          caseData: caseDataRef.current,
        }),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const data = await response.json()

      if (data.type === 'question' && data.question) {
        setCurrentQuestion(data.question)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.question.question,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCurrentStep(prev => prev + 1)
      } else if (data.type === 'confirmation') {
        setCurrentQuestion(null)
        setCompletedGroups(new Set([0, 1, 2, 3, 4]))
        if (returnToReview) {
          setReturnToReview(false)
          setPhase('review')
        } else {
          generateFollowup()
        }
      }

      if (data.progress) setProgress(data.progress)
      if (data.caseData) setCaseData(data.caseData)
    } catch {
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Error processing answer. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // ─── Navigation ───────────────────────────────────────────────

  const goBack = () => {
    if (isFirstStepInGroup && isFirstGroup) return

    if (isFirstStepInGroup) {
      const prevGroupIndex = currentGroupIndex - 1
      const prevGroup = WIZARD_GROUPS[prevGroupIndex]
      setCurrentGroupIndex(prevGroupIndex)
      setCurrentStep(prevGroup.endStep)
      setCompletedGroups(prev => {
        const next = new Set(prev)
        next.delete(currentGroupIndex)
        return next
      })
      fetchQuestion(prevGroup.endStep)
    } else {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      fetchQuestion(prevStep)
    }
    setScaleValue(5)
    setInput('')
  }

  const goToGroup = (groupIndex: number) => {
    const group = WIZARD_GROUPS[groupIndex]
    setCurrentGroupIndex(groupIndex)
    setCurrentStep(group.startStep)
    setScaleValue(5)
    setInput('')
    fetchQuestion(group.startStep)
  }

  const addAnotherComplaint = () => {
    setCurrentStep(5)
    setScaleValue(5)
    setInput('')
    fetchQuestion(5)
  }

  // ─── Follow-up ────────────────────────────────────────────────

  const generateFollowup = async () => {
    setIsLoading(true)
    setPhase('followup')
    addMessage({
      id: generateId(),
      role: 'assistant',
      content: 'Analyzing case data to identify critical follow-up questions...',
      timestamp: Date.now(),
      status: 'complete',
    })

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generateFollowup', caseData: caseDataRef.current }),
      })
      if (!response.ok) throw new Error(`Server error: ${response.status}`)
      const data = await response.json()

      if (data.type === 'followup_questions' && data.questions?.length > 0) {
        setFollowupQuestions(data.questions)
        setIsFollowupPhase(true)
        setFollowupStep(0)

        addMessage({
          id: generateId(),
          role: 'assistant',
          content: `I have ${data.questions.length} targeted follow-up questions to improve diagnostic accuracy.`,
          timestamp: Date.now(),
          status: 'complete',
        })

        addMessage({
          id: generateId(),
          role: 'assistant',
          content: `**${data.questions[0].question}**\n\n_${data.questions[0].rationale}_`,
          timestamp: Date.now(),
          status: 'complete',
        })
      } else {
        setShowDiagnosis(true)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: 'All information collected. Ready to generate diagnosis.',
          timestamp: Date.now(),
          status: 'complete',
        })
      }

      if (data.caseData) setCaseData(data.caseData)
    } catch {
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Error generating follow-up questions. Proceeding to diagnosis.',
        timestamp: Date.now(),
        status: 'error',
      })
      setShowDiagnosis(true)
    } finally {
      setIsLoading(false)
    }
  }

  const sendFollowupAnswer = async (answer: string) => {
    if (!answer.trim() || followupQuestions.length === 0) return

    const currentQ = followupQuestions[followupStep]
    const newAnswers = { ...followupAnswers, [currentQ.question]: answer }
    setFollowupAnswers(newAnswers)

    addMessage({
      id: generateId(),
      role: 'user',
      content: answer,
      timestamp: Date.now(),
      status: 'complete',
    })

    const nextStep = followupStep + 1
    if (nextStep < followupQuestions.length) {
      setFollowupStep(nextStep)
      const nextQ = followupQuestions[nextStep]
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: `**${nextQ.question}**\n\n_${nextQ.rationale}_`,
        timestamp: Date.now(),
        status: 'complete',
      })
    } else {
      setIsLoading(true)
      try {
        const response = await fetch('/api/intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'answerFollowup',
            caseData: caseDataRef.current,
            followupAnswers: newAnswers,
          }),
        })
        const data = await response.json()
        if (data.caseData) setCaseData(data.caseData)

        setIsFollowupPhase(false)
        setShowDiagnosis(true)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: 'Follow-up information recorded. Ready to generate diagnosis.',
          timestamp: Date.now(),
          status: 'complete',
        })
      } catch {
        setIsFollowupPhase(false)
        setShowDiagnosis(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const skipFollowup = () => {
    setIsFollowupPhase(false)
    setShowDiagnosis(true)
    addMessage({
      id: generateId(),
      role: 'assistant',
      content: 'Skipping follow-up questions. Ready to generate diagnosis.',
      timestamp: Date.now(),
      status: 'complete',
    })
  }

  // ─── Diagnosis ────────────────────────────────────────────────

  const handleShowDiagnosis = async () => {
    setIsLoading(true)
    setShowDiagnosis(true)
    setDiagnosisShown(true)
    setPhase('diagnosis')

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'showDiagnosis', caseData: caseDataRef.current }),
      })
      const data = await response.json()

      if (data.diagnosis) {
        setDiagnosisText(data.diagnosis)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.diagnosis,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCanvasContent(data.diagnosis)
      }

    } catch {
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Error generating diagnosis. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDiagnosis = async () => {
    await generateTreatmentProtocol()
  }

  const handleAddMoreInformation = () => {
    setDiagnosisShown(false)
    setShowDiagnosis(false)
    setReturnToReview(true)
    setPhase('review')
  }

  // ─── Treatment Protocol ───────────────────────────────────────

  const generateTreatmentProtocol = async () => {
    setIsLoading(true)
    setPhase('protocol')
    setProtocolPhase('Searching PubMed for research papers...')
    addMessage({
      id: generateId(),
      role: 'assistant',
      content: 'Searching PubMed for relevant research papers...',
      timestamp: Date.now(),
      status: 'complete',
    })

    try {
      const complaints = caseDataRef.current.chiefComplaints || []
      const complaintsText = complaints.map(c => {
        const dur = c.duration ? ` (${c.duration})` : ''
        return c.complaint + dur
      }).join(', ')
      const duration = complaints
        .filter(c => c.duration)
        .map(c => `${c.complaint}: ${c.duration}`)
        .join('; ') || 'Not specified'
      const associatedSymptoms = complaints.flatMap(c => c.associatedSymptoms || []).join(', ')
      const plainDiagnosis = diagnosisText
        .replace(/\*\*/g, '')
        .replace(/\[.*?\]/g, '')
        .replace(/#{1,6}\s*/g, '')
        .replace(/\n+/g, ' ')
        .trim()

      const response = await fetch('/api/treatment-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo: {
            name: caseDataRef.current.name || 'Patient',
            age: caseDataRef.current.age || '',
            gender: caseDataRef.current.gender || '',
            prakriti: caseDataRef.current.prakritiDetail || caseDataRef.current.prakriti || '',
            chiefComplaints: complaintsText,
            diagnosis: plainDiagnosis || 'Based on clinical assessment',
            duration,
            associatedSymptoms,
            investigation: caseDataRef.current.investigationText || '',
            nadi: caseDataRef.current.nadi || '',
            mootra: caseDataRef.current.mootra || '',
            mala: caseDataRef.current.mala || '',
            jivha: caseDataRef.current.jivha || '',
            drik: caseDataRef.current.drik || '',
            shabda: caseDataRef.current.shabda || '',
            sparsh: caseDataRef.current.sparsh || '',
            aakriti: caseDataRef.current.aakriti || '',
            satva: caseDataRef.current.satva || '',
            aharaShakti: caseDataRef.current.aharaShakti || '',
            vyayamaShakti: caseDataRef.current.vyayamaShakti || '',
            occupation: caseDataRef.current.occupation || '',
            comorbidities: caseDataRef.current.comorbidities?.join(', ') || '',
            medications: caseDataRef.current.ongoingMedications || '',
            allergies: caseDataRef.current.allergies || '',
            complaintsArray: complaints.map(c => ({
              complaint: c.complaint,
              duration: c.duration || '',
              severity: c.severity || 5,
            })),
          },
          treatmentSelection: {
            selectedPanchakarma: [],
            selectedPurvakarma: [],
            selectedHerbs: [],
            treatmentDuration: '14',
            budget: 'medium',
          },
        }),
      })

      if (!response.ok) throw new Error(`Server error: ${response.status}`)

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullProtocol = ''
      let metadata: { paperCount?: number; webCount?: number; ragCount?: number } = {}
      let buffer = ''

      setCanvasContent('')

      let streamDone = false
      while (!streamDone) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()

          if (data === '[DONE]') { streamDone = true; break }

          try {
            const parsed = JSON.parse(data)

            if (parsed.type === 'metadata') {
              metadata = parsed
              const infoParts: string[] = []
              if (parsed.paperCount > 0) infoParts.push(`${parsed.paperCount} PubMed papers`)
              if (parsed.webCount > 0) infoParts.push(`${parsed.webCount} web sources`)
              if (parsed.ragCount > 0) infoParts.push(`${parsed.ragCount} knowledge base entries`)

              if (infoParts.length > 0) {
                addMessage({
                  id: generateId(),
                  role: 'assistant',
                  content: `Research gathered: ${infoParts.join(', ')}. Now generating comprehensive treatment protocol...`,
                  timestamp: Date.now(),
                  status: 'complete',
                })
              }
            } else if (parsed.content) {
              fullProtocol += parsed.content
              setCanvasContent(fullProtocol)

              const lastHeader = parsed.content.match(/## (.+)/)?.[1]
              if (lastHeader) {
                const ph = getPhaseLabel(lastHeader.trim())
                if (ph !== protocolPhase) {
                  setProtocolPhase(ph)
                }
              }
            } else if (parsed.error) {
              throw new Error(parsed.error)
            }
          } catch (parseErr) {
            if (parseErr instanceof Error && parseErr.message !== 'Stream interrupted') {
              console.warn('SSE parse error:', parseErr)
            }
          }
        }
      }

      if (fullProtocol.length > 0) {
        setCanvasContent(fullProtocol)

        const paperCount = metadata.paperCount || 0
        const summaryParts: string[] = []
        if (paperCount > 0) summaryParts.push(`${paperCount} research papers from PubMed`)
        if (metadata.webCount && metadata.webCount > 0) summaryParts.push(`${metadata.webCount} web sources`)
        if (metadata.ragCount && metadata.ragCount > 0) summaryParts.push(`${metadata.ragCount} knowledge base references`)

        const researchMsg = summaryParts.length > 0
          ? `Treatment protocol generated. Evidence base: ${summaryParts.join(', ')}.`
          : 'Treatment protocol generated.'

        addMessage({
          id: generateId(),
          role: 'assistant',
          content: researchMsg,
          timestamp: Date.now(),
          status: 'complete',
        })
      }
    } catch (error) {
      console.error('Treatment protocol error:', error)
      addMessage({
        id: generateId(),
        role: 'assistant',
        content: 'Error generating treatment protocol. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
      setProtocolPhase('')
    }
  }

  // ─── Effects ──────────────────────────────────────────────────

  useEffect(() => {
    if (!intakeInitialized.current) {
      intakeInitialized.current = true
      startIntake()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── Event Handlers ───────────────────────────────────────────

  const handleSuggestionClick = (suggestion: string) => {
    if (isFollowupPhase) {
      sendFollowupAnswer(suggestion)
    } else {
      sendAnswer(suggestion)
    }
  }

  const handleInputSubmit = () => {
    if (!input.trim()) return
    if (isFollowupPhase) {
      sendFollowupAnswer(input)
    } else {
      sendAnswer(input)
    }
    setInput('')
  }

  const currentFollowupQ = isFollowupPhase && followupQuestions.length > 0
    ? followupQuestions[followupStep]
    : null

  // ─── Render ───────────────────────────────────────────────────

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      {/* Wizard Header */}
      {phase === 'wizard' && (
        <WizardHeader
          groups={WIZARD_GROUPS}
          currentIndex={currentGroupIndex}
          completedIndices={completedGroups}
          onGroupClick={(index) => {
            setReturnToReview(false)
            goToGroup(index)
          }}
        />
      )}

      {/* Progress Bar */}
      {phase === 'wizard' && (
        <div className="px-4 py-1.5 border-b border-border bg-muted/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              {progress.percentage}%
            </span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              Step {currentStep + 1}/30
            </span>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {phase === 'review' ? (
          <ReviewScreen
            caseData={caseData}
            onEdit={(groupIndex) => {
              setReturnToReview(true)
              setPhase('wizard')
              goToGroup(groupIndex)
            }}
          />
        ) : (
          <div className="px-3 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : message.role === 'assistant'
                      ? 'bg-muted border border-border'
                      : 'bg-muted/50 text-muted-foreground text-xs italic'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {showDiagnosis && !diagnosisShown && !isFollowupPhase && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleShowDiagnosis}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Generate Diagnosis
                </button>
              </div>
            )}

            {diagnosisShown && !isFollowupPhase && phase === 'diagnosis' && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleConfirmDiagnosis}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  Confirm & Generate Research-Backed Protocol
                </button>
                <button
                  onClick={handleAddMoreInformation}
                  className="px-4 py-2 text-sm bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  Add More Information
                </button>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    {protocolPhase && (
                      <span className="text-xs text-muted-foreground">{protocolPhase}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Wizard Input */}
      {phase === 'wizard' && !isLoading && currentQuestion && (
        <div className="border-t border-border p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-muted/30 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={goBack}
              disabled={isFirstStepInGroup && isFirstGroup}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span className="text-xs text-muted-foreground">{currentGroup.label}</span>
          </div>

          {currentQuestion.options && currentQuestion.options.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => sendAnswer(opt.value)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors text-foreground disabled:opacity-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'scale' && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{currentQuestion.severityScale?.min || 1} - Mild</span>
                <span className="font-medium text-foreground">{scaleValue}/10</span>
                <span>{currentQuestion.severityScale?.max || 10} - Severe</span>
              </div>
              <input
                type="range"
                min={currentQuestion.severityScale?.min || 1}
                max={currentQuestion.severityScale?.max || 10}
                value={scaleValue}
                onChange={(e) => setScaleValue(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <button
                onClick={() => sendAnswer(String(scaleValue))}
                disabled={isLoading}
                className="mt-2 w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Confirm Severity: {scaleValue}/10
              </button>
            </div>
          )}

          {currentQuestion.suggestions && currentQuestion.suggestions.length > 0 && currentQuestion.type !== 'scale' && (
            <div className="flex flex-wrap gap-2 mb-2">
              {currentQuestion.suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors text-foreground disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {(!currentQuestion.options || currentQuestion.options.length === 0) && currentQuestion.type !== 'scale' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    handleInputSubmit()
                  }
                }}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleInputSubmit}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}

          {isLastStepInGroup && currentGroup.id === 'chief-complaint' && complaintCount > 0 && (
            <div className="mt-2">
              <button
                onClick={addAnotherComplaint}
                disabled={isLoading}
                className="w-full px-3 py-1.5 text-xs bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                + Add Another Complaint ({complaintCount} added)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Review Actions */}
      {phase === 'review' && (
        <div className="border-t border-border p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-muted/30 flex-shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setPhase('wizard')
                goToGroup(0)
              }}
              className="px-4 py-2 text-sm bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              Back to Start
            </button>
            <button
              onClick={() => {
                if (diagnosisText) {
                  handleShowDiagnosis()
                } else {
                  generateFollowup()
                }
              }}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : diagnosisText ? 'Re-generate Diagnosis' : 'Confirm & Generate Diagnosis'}
            </button>
          </div>
        </div>
      )}

      {/* Follow-up Input */}
      {phase === 'followup' && isFollowupPhase && followupQuestions.length > 0 && !isLoading && (
        <div className="border-t border-border p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-muted/30 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Follow-up question {followupStep + 1} of {followupQuestions.length}
            </span>
            <button
              onClick={skipFollowup}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip follow-up
            </button>
          </div>

          {currentFollowupQ && (
            <div className="flex flex-wrap gap-2 mb-2">
              {getCategorySuggestions(currentFollowupQ.category).map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors text-foreground disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleInputSubmit()
                }
              }}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={handleInputSubmit}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Helper Functions ───────────────────────────────────────────

function getPhaseLabel(section: string): string {
  const s = section.toLowerCase()
  if (s.includes('abstract')) return 'Writing structured abstract...'
  if (s.includes('keyword')) return 'Identifying clinical keywords...'
  if (s.includes('introduction')) return 'Setting clinical context...'
  if (s.includes('case presentation') || s.includes('patient')) return 'Compiling case presentation...'
  if (s.includes('diagnostic') || s.includes('diagnosis')) return 'Assessing diagnostic criteria...'
  if (s.includes('samprapti') || s.includes('pathogenesis')) return 'Analyzing Ayurvedic pathogenesis...'
  if (s.includes('literature') || s.includes('research') || s.includes('evidence')) return 'Reviewing literature evidence...'
  if (s.includes('classical') || s.includes('charak') || s.includes('text reference')) return 'Referencing classical texts...'
  if (s.includes('treatment protocol') || s.includes('treatment rationale')) return 'Formulating treatment protocol...'
  if (s.includes('purvakarma')) return 'Designing preparatory procedures...'
  if (s.includes('pradhana') || s.includes('panchakarma')) return 'Planning Panchakarma procedures...'
  if (s.includes('paschat')) return 'Planning post-treatment recovery...'
  if (s.includes('pharmacotherapy') || s.includes('formulation')) return 'Selecting herbal formulations...'
  if (s.includes('pathya') || s.includes('diet') || s.includes('apathya')) return 'Preparing diet protocol...'
  if (s.includes('dinacharya') || s.includes('lifestyle')) return 'Designing lifestyle plan...'
  if (s.includes('monitoring') || s.includes('follow')) return 'Creating monitoring schedule...'
  if (s.includes('precaution') || s.includes('safety')) return 'Assessing precautions & safety...'
  if (s.includes('conclusion')) return 'Writing conclusion...'
  if (s.includes('reference')) return 'Compiling references...'
  if (s.includes('conflict')) return 'Finalizing disclosures...'
  if (s.includes('disclaimer')) return 'Adding disclaimer...'
  return 'Generating protocol...'
}

function getCategorySuggestions(category: string): string[] {
  switch (category) {
    case 'symptom_detail':
      return ['Worse in morning', 'Worse at night', 'Constant', 'Intermittent', 'Getting worse', 'Stable']
    case 'aggravating_factor':
      return ['Stress', 'Cold weather', 'Hot weather', 'Certain foods', 'Physical activity', 'Sitting long']
    case 'medical_history':
      return ['Previous surgery', 'Chronic illness', 'Hospitalization', 'Family history', 'None', 'Not sure']
    case 'lifestyle':
      return ['Sedentary', 'Active', 'Night shift worker', 'Travel frequently', 'High stress job', 'Regular exercise']
    case 'diagnostic_clarification':
      return ['Yes', 'No', 'Sometimes', 'Not sure', 'Need more tests', 'Under treatment']
    case 'treatment_history':
      return ['No previous treatment', 'Ayurvedic treatment', 'Allopathic treatment', 'Home remedies', 'Both Ayurvedic and Allopathic', 'Physiotherapy']
    default:
      return ['Yes', 'No', 'Not sure', 'Need more information']
  }
}
