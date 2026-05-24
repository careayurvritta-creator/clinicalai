'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/lib/store'
import { generateId } from '@/lib/utils'
import type { CaseData, ChiefComplaint } from '@/lib/types'

interface CaseCollectorChatProps {
  onComplete?: (caseData: CaseData) => void
  onShowDiagnosis?: (caseData: CaseData) => void
}

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

export function CaseCollectorChat({ onComplete, onShowDiagnosis }: CaseCollectorChatProps) {
  const addMessage = useChatStore((state) => state.addMessage)
  const setCanvasContent = useChatStore((state) => state.setCanvasContent)

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [diagnosisShown, setDiagnosisShown] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [progress, setProgress] = useState({ current: 0, total: 30, percentage: 0 })
  const [scaleValue, setScaleValue] = useState(5)

  // Follow-up questions state
  const [followupQuestions, setFollowupQuestions] = useState<FollowupQuestion[]>([])
  const [followupAnswers, setFollowupAnswers] = useState<Record<string, string>>({})
  const [followupStep, setFollowupStep] = useState(0)
  const [isFollowupPhase, setIsFollowupPhase] = useState(false)
  const [protocolPhase, setProtocolPhase] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const messages = useChatStore((state) => state.messages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
        content: data.message,
        timestamp: Date.now(),
        status: 'complete',
      })

      if (data.progress) {
        setProgress(data.progress)
      }
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

  const generateFollowup = async () => {
    setIsLoading(true)
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
        body: JSON.stringify({
          action: 'generateFollowup',
          caseData,
        }),
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
          content: `I have ${data.questions.length} targeted follow-up questions to improve diagnostic accuracy. These are based on the specific details of this case.`,
          timestamp: Date.now(),
          status: 'complete',
        })

        // Show first question
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: `**${data.questions[0].question}**\n\n_${data.questions[0].rationale}_`,
          timestamp: Date.now(),
          status: 'complete',
        })
      } else {
        // No follow-up questions, proceed to confirmation
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
      // All follow-up questions answered, send to API
      setIsLoading(true)
      try {
        const response = await fetch('/api/intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'answerFollowup',
            caseData,
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

  const generateTreatmentProtocol = async () => {
    setIsLoading(true)
    setProtocolPhase('Searching PubMed for research papers...')
    addMessage({
      id: generateId(),
      role: 'assistant',
      content: 'Searching PubMed for relevant research papers based on complaints and diagnosis...',
      timestamp: Date.now(),
      status: 'complete',
    })

    try {
      const complaints = caseData.chiefComplaints || []
      const complaintsText = complaints.map(c => c.complaint).join(', ')
      const duration = complaints[0]?.duration || ''
      const associatedSymptoms = complaints.flatMap(c => c.associatedSymptoms || []).join(', ')

      const response = await fetch('/api/treatment-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo: {
            name: caseData.name || 'Patient',
            age: caseData.age || '',
            gender: caseData.gender || '',
            prakriti: caseData.prakritiDetail || caseData.prakriti || '',
            chiefComplaints: complaintsText,
            diagnosis: 'Based on clinical assessment',
            duration,
            associatedSymptoms,
            investigation: caseData.investigationText || '',
            nadi: caseData.nadi || '',
            mootra: caseData.mootra || '',
            mala: caseData.mala || '',
            jivha: caseData.jivha || '',
            drik: caseData.drik || '',
            shabda: caseData.shabda || '',
            sparsh: caseData.sparsh || '',
            aakriti: caseData.aakriti || '',
            satva: caseData.satva || '',
            aharaShakti: caseData.aharaShakti || '',
            vyayamaShakti: caseData.vyayamaShakti || '',
            occupation: caseData.occupation || '',
            comorbidities: caseData.comorbidities?.join(', ') || '',
            medications: caseData.ongoingMedications || '',
            allergies: caseData.allergies || '',
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

      // Handle SSE streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullProtocol = ''
      let metadata: { paperCount?: number; webCount?: number; ragCount?: number } = {}
      let buffer = ''

      // Clear canvas for new protocol
      setCanvasContent('')

      let streamDone = false
      while (!streamDone) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

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
              // Update canvas progressively with accumulated content
              setCanvasContent(fullProtocol)

              // Detect current section being generated
              const lastHeader = parsed.content.match(/## (.+)/)?.[1]
              if (lastHeader) {
                const phase = getPhaseLabel(lastHeader.trim())
                if (phase !== protocolPhase) {
                  setProtocolPhase(phase)
                }
              }
            } else if (parsed.error) {
              throw new Error(parsed.error)
            }
          } catch (parseErr) {
            // Skip non-JSON lines
            if (parseErr instanceof Error && parseErr.message !== 'Stream interrupted') {
              console.warn('SSE parse error:', parseErr)
            }
          }
        }
      }

      if (fullProtocol.length > 0) {
        // Set final complete protocol
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

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          answer,
          currentStep,
          caseData,
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
      } else if (data.type === 'diagnosis' && data.diagnosis) {
        setShowDiagnosis(true)
        setDiagnosisShown(true)
        setCurrentQuestion(null)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.diagnosis,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCanvasContent(data.diagnosis)
      } else if (data.type === 'confirmation') {
        setCurrentQuestion(null)
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.message || 'Ready for diagnosis.',
          timestamp: Date.now(),
          status: 'complete',
        })
        // Trigger AI follow-up questions before showing diagnosis
        generateFollowup()
      }

      if (data.progress) {
        setProgress(data.progress)
      }
      if (data.caseData) {
        setCaseData(data.caseData)
      }
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

  const handleShowDiagnosis = async () => {
    setIsLoading(true)
    setShowDiagnosis(true)
    setDiagnosisShown(true)

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'showDiagnosis',
          caseData,
        }),
      })

      const data = await response.json()

      if (data.diagnosis) {
        addMessage({
          id: generateId(),
          role: 'assistant',
          content: data.diagnosis,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCanvasContent(data.diagnosis)
      }

      if (onShowDiagnosis && caseData.chiefComplaints && caseData.chiefComplaints.length > 0) {
        onShowDiagnosis(caseData as CaseData)
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
    if (onComplete && caseData.chiefComplaints && caseData.chiefComplaints.length > 0) {
      onComplete(caseData as CaseData)
    }
    await generateTreatmentProtocol()
  }

  const intakeInitialized = useRef(false)

  useEffect(() => {
    if (!intakeInitialized.current) {
      intakeInitialized.current = true
      startIntake()
    }
  }, [])

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

  const currentFollowupQ = isFollowupPhase && followupQuestions.length > 0
    ? followupQuestions[followupStep]
    : null

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {progress.percentage}%
          </span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {progress.current}/{progress.total}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
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

        {diagnosisShown && !isFollowupPhase && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleConfirmDiagnosis}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Confirm & Generate Research-Backed Protocol
            </button>
            <button
              onClick={() => {
                setShowDiagnosis(false)
                setDiagnosisShown(false)
              }}
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

      {/* Input area — shown during intake questions and follow-up phase */}
      {!diagnosisShown && messages.length > 0 && (
        <div className="border-t border-border p-3 bg-muted/30">
          {/* Follow-up progress indicator */}
          {isFollowupPhase && followupQuestions.length > 0 && (
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
          )}

          {/* Options buttons */}
          {currentQuestion?.options && currentQuestion.options.length > 0 && !isFollowupPhase && (
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

          {/* Scale input */}
          {currentQuestion?.type === 'scale' && !isFollowupPhase && (
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

          {/* Suggestions */}
          {((currentQuestion?.suggestions && currentQuestion.suggestions.length > 0 && !isFollowupPhase) ||
            (currentFollowupQ && !currentQuestion?.options?.length)) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {(isFollowupPhase && currentFollowupQ
                ? getCategorySuggestions(currentFollowupQ.category)
                : currentQuestion?.suggestions || []
              ).map((suggestion, i) => (
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

          {/* Text input */}
          {((!currentQuestion?.options || currentQuestion.options.length === 0) && currentQuestion?.type !== 'scale') || isFollowupPhase ? (
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
                placeholder={isFollowupPhase ? 'Type your answer...' : 'Type your answer...'}
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
          ) : null}

          {currentStep >= 5 && !showDiagnosis && !isFollowupPhase && (
            <button
              onClick={handleShowDiagnosis}
              className="mt-2 w-full px-4 py-2 text-sm bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              Skip to Diagnosis
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function getPhaseLabel(section: string): string {
  const s = section.toLowerCase()
  if (s.includes('case summary') || s.includes('patient')) return 'Analyzing patient data...'
  if (s.includes('samprapti') || s.includes('pathogenesis')) return 'Analyzing Ayurvedic pathogenesis...'
  if (s.includes('literature') || s.includes('research') || s.includes('evidence')) return 'Reviewing research evidence...'
  if (s.includes('classical') || s.includes('charak')) return 'Referencing classical texts...'
  if (s.includes('treatment protocol') || s.includes('detailed treatment')) return 'Formulating treatment protocol...'
  if (s.includes('purvakarma')) return 'Designing preparatory procedures...'
  if (s.includes('pradhana') || s.includes('panchakarma')) return 'Planning Panchakarma procedures...'
  if (s.includes('paschat')) return 'Planning post-treatment recovery...'
  if (s.includes('herbal') || s.includes('formulation')) return 'Selecting herbal formulations...'
  if (s.includes('diet') || s.includes('pathya')) return 'Preparing diet protocol...'
  if (s.includes('dinacharya') || s.includes('lifestyle')) return 'Designing lifestyle plan...'
  if (s.includes('monitoring') || s.includes('follow')) return 'Creating monitoring schedule...'
  if (s.includes('precaution') || s.includes('safety')) return 'Assessing precautions...'
  if (s.includes('reference')) return 'Compiling references...'
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
