'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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

export function CaseCollectorChat({ onComplete, onShowDiagnosis }: CaseCollectorChatProps) {
  const addMessage = useChatStore((state) => state.addMessage)
  const setCanvasContent = useChatStore((state) => state.setCanvasContent)
  const appendToCanvas = useChatStore((state) => state.appendToCanvas)

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [diagnosisShown, setDiagnosisShown] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [progress, setProgress] = useState({ current: 0, total: 30, percentage: 0 })
  const [scaleValue, setScaleValue] = useState(5)

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

  const generateTreatmentProtocol = async () => {
    setIsLoading(true)
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

      const progressMsgId = generateId()
      setTimeout(() => {
        addMessage({
          id: progressMsgId,
          role: 'assistant',
          content: 'Analyzing research papers with AI... This may take a moment.',
          timestamp: Date.now(),
          status: 'complete',
        })
      }, 3000)

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

      const data = await response.json()

      if (data.protocol) {
        appendToCanvas(data.protocol)

        const paperCount = data.paperCount || 0
        const researchMsg = paperCount > 0
          ? `Treatment protocol generated with ${paperCount} research papers analyzed from PubMed.`
          : 'Treatment protocol generated. Limited research papers found for this condition.'

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

    // Server handles all step-to-field mapping and returns updated caseData

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
        setCurrentStep(currentStep + 1)
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
        setShowDiagnosis(true)
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
    sendAnswer(suggestion)
  }

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

        {showDiagnosis && !diagnosisShown && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleShowDiagnosis}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Generate Diagnosis
            </button>
          </div>
        )}

        {diagnosisShown && (
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
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {!diagnosisShown && messages.length > 0 && (
        <div className="border-t border-border p-3 bg-muted/30">
          {currentQuestion?.options && currentQuestion.options.length > 0 && (
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

          {currentQuestion?.type === 'scale' && (
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

          {currentQuestion?.suggestions && currentQuestion.suggestions.length > 0 && (
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

          {(!currentQuestion?.options || currentQuestion.options.length === 0) && currentQuestion?.type !== 'scale' && (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    sendAnswer(input)
                    setInput('')
                  }
                }}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={() => {
                  if (input.trim()) {
                    sendAnswer(input)
                    setInput('')
                  }
                }}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}

          {currentStep >= 5 && !showDiagnosis && (
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
