'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/lib/store'
import type { CaseData, ChiefComplaint } from '@/lib/types'

interface CaseCollectorChatProps {
  onComplete?: (caseData: CaseData) => void
  onShowDiagnosis?: (caseData: CaseData) => void
}

export function CaseCollectorChat({ onComplete, onShowDiagnosis }: CaseCollectorChatProps) {
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)
  const setCanvasContent = useChatStore((state) => state.setCanvasContent)

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 10, percentage: 0 })

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

      const data = await response.json()

      addMessage({
        id: `msg_${Date.now()}`,
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
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
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
      id: `msg_${Date.now()}`,
      role: 'user',
      content: answer,
      timestamp: Date.now(),
      status: 'complete',
    })

    const updatedCaseData = { ...caseData }

    if (currentStep === 0) updatedCaseData.name = answer
    else if (currentStep === 1) updatedCaseData.age = answer
    else if (currentStep === 2) updatedCaseData.gender = answer
    else if (currentStep === 3) updatedCaseData.occupation = answer
    else if (currentStep === 4) updatedCaseData.area = answer
    else if (currentStep === 5) {
      const newComplaint: ChiefComplaint = {
        id: `complaint_${Date.now()}`,
        complaint: answer,
        duration: '',
        severity: 5,
      }
      updatedCaseData.chiefComplaints = [...(caseData.chiefComplaints || []), newComplaint]
    }

    setCaseData(updatedCaseData)

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          answer,
          currentStep: currentStep + 1,
          caseData: updatedCaseData,
        }),
      })

      const data = await response.json()

      if (data.question) {
        addMessage({
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.question.question,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCurrentStep(currentStep + 1)
      }

      if (data.progress) {
        setProgress(data.progress)
      }
    } catch {
      addMessage({
        id: `msg_${Date.now()}`,
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
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.diagnosis,
          timestamp: Date.now(),
          status: 'complete',
        })
        setCanvasContent(data.diagnosis)
      }

      if (onShowDiagnosis) {
        onShowDiagnosis(caseData as CaseData)
      }
    } catch {
      addMessage({
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Error generating diagnosis. Please try again.',
        timestamp: Date.now(),
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDiagnosis = () => {
    if (onComplete) {
      onComplete(caseData as CaseData)
    }
  }

  useEffect(() => {
    if (messages.length === 0) {
      startIntake()
    }
  }, [])

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
                  ? 'bg-primary text-white'
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

        {showDiagnosis && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleConfirmDiagnosis}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Confirm Diagnosis
            </button>
            <button
              onClick={() => setShowDiagnosis(false)}
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

      {!showDiagnosis && messages.length > 0 && (
        <div className="border-t border-border p-3 bg-muted/30">
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
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
          {currentStep === 5 && (
            <button
              onClick={handleShowDiagnosis}
              className="mt-2 w-full px-4 py-2 text-sm bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              Generate Diagnosis
            </button>
          )}
        </div>
      )}
    </div>
  )
}