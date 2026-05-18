'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/lib/store'
import { QuickReplies, SeverityScale, ProgressBar, SelectButtons, ConfirmButtons } from './QuickReplies'
import type { CaseData, ChiefComplaint } from '@/lib/types'

interface Message {
  id: string
  role: 'assistant' | 'user' | 'system'
  content: string
  timestamp: number
  isQuestion?: boolean
  questionData?: {
    id: string
    field: string
    type: string
    suggestions?: string[]
    severityScale?: { min: number; max: number; default: string }
    options?: Array<{ value: string; label: string }>
  }
}

interface CaseCollectorChatProps {
  onComplete?: (caseData: CaseData) => void
  onShowDiagnosis?: (caseData: CaseData) => void
}

export function CaseCollectorChat({ onComplete, onShowDiagnosis }: CaseCollectorChatProps) {
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)
  const canvasContent = useChatStore((state) => state.canvasContent)
  const setCanvasContent = useChatStore((state) => state.setCanvasContent)
  const appendToCanvas = useChatStore((state) => state.appendToCanvas)
  
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showDiagnosis, setShowDiagnosis] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 10, percentage: 0 })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  const [caseData, setCaseData] = useState<Partial<CaseData>>({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    area: '',
    prakriti: '',
    chiefComplaints: [],
    comorbidities: [],
    investigations: [],
    ongoingMedications: '',
    medicalHistory: '',
    allergies: '',
    familyHistory: '',
    nadi: '',
    mootra: '',
    mala: '',
    jivha: '',
    drik: '',
    sparSh: '',
    shabda: '',
    aakriti: '',
    prakritiDetail: '',
    saara: '',
    samhanana: '',
    satva: '',
    aharaShakti: '',
    vyayamaShakti: '',
    desha: '',
  })
  
  const [currentQuestion, setCurrentQuestion] = useState<{
    id: string
    field: string
    question: string
    type: string
    suggestions?: string[]
    severityScale?: { min: number; max: number; default: string }
    options?: Array<{ value: string; label: string }>
  } | null>(null)
  
  const [pendingComplaints, setPendingComplaints] = useState<string[]>([])
  
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
      })
      
      if (data.progress) {
        setProgress(data.progress)
      }
    } catch (error) {
      addMessage({
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const sendAnswer = async (answer: string, field?: string, type?: string) => {
    if (!answer.trim() && type !== 'scale') return
    
    setIsLoading(true)
    
    addMessage({
      id: `msg_${Date.now()}`,
      role: 'user',
      content: answer,
      timestamp: Date.now(),
    })
    
    const updatedCaseData = { ...caseData }
    
    if (field) {
      if (field === 'name') updatedCaseData.name = answer
      else if (field === 'age') updatedCaseData.age = answer
      else if (field === 'gender') updatedCaseData.gender = answer
      else if (field === 'occupation') updatedCaseData.occupation = answer
      else if (field === 'area') updatedCaseData.area = answer
      else if (field === 'chiefComplaints') {
        const newComplaint: ChiefComplaint = {
          id: `complaint_${Date.now()}`,
          complaint: answer,
          duration: '',
          severity: 5,
        }
        updatedCaseData.chiefComplaints = [...(caseData.chiefComplaints || []), newComplaint]
      }
      else if (field === 'duration' && caseData.chiefComplaints) {
        const complaints = [...caseData.chiefComplaints]
        if (complaints.length > 0) {
          complaints[complaints.length - 1].duration = answer
        }
        updatedCaseData.chiefComplaints = complaints
      }
      else if (field === 'severity' && caseData.chiefComplaints) {
        const complaints = [...caseData.chiefComplaints]
        if (complaints.length > 0) {
          complaints[complaints.length - 1].severity = parseInt(answer) || 5
        }
        updatedCaseData.chiefComplaints = complaints
      }
      else {
        ;(updatedCaseData as Record<string, unknown>)[field] = answer
      }
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
          pendingComplaints,
        }),
      })
      
      const data = await response.json()
      
      if (data.message && currentStep === 0) {
        addMessage({
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: Date.now(),
        })
      }
      
      if (data.question) {
        setCurrentQuestion(data.question)
        addMessage({
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.question.question,
          timestamp: Date.now(),
          isQuestion: true,
          questionData: data.question,
        })
        setCurrentStep(currentStep + 1)
      } else if (data.type === 'confirmation') {
        addMessage({
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: 'Basic information collected! Now let\'s discuss the chief complaints in detail.',
          timestamp: Date.now(),
        })
      }
      
      if (data.progress) {
        setProgress(data.progress)
      }
      
      if (data.caseData) {
        setCaseData(data.caseData)
      }
      
    } catch (error) {
      addMessage({
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Error processing answer. Please try again.',
        timestamp: Date.now(),
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmitDiagnosis = async () => {
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
        })
        setCanvasContent(data.diagnosis)
      }
      
      if (onShowDiagnosis) {
        onShowDiagnosis(caseData as CaseData)
      }
    } catch (error) {
      addMessage({
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: 'Error generating diagnosis. Please try again.',
        timestamp: Date.now(),
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleConfirmDiagnosis = () => {
    if (onComplete) {
      onComplete(caseData as CaseData)
    }
    addMessage({
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: 'Diagnosis confirmed. Proceeding to generate treatment protocol...',
      timestamp: Date.now(),
    })
  }
  
  useEffect(() => {
    if (messages.length === 0) {
      startIntake()
    }
  }, [])
  
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-border bg-muted/30">
        <ProgressBar {...progress} />
      </div>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
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
                {message.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
              
              {message.isQuestion && message.questionData && (
                <div className="mt-3">
                  {message.questionData.suggestions && (
                    <QuickReplies
                      suggestions={message.questionData.suggestions}
                      onSelect={(s) => sendAnswer(s, message.questionData?.field, message.questionData?.type)}
                    />
                  )}
                  
                  {message.questionData.options && message.questionData.type === 'select' && (
                    <SelectButtons
                      options={message.questionData.options}
                      selected=""
                      onSelect={(v) => sendAnswer(v, message.questionData?.field, message.questionData?.type)}
                    />
                  )}
                  
                  {message.questionData.severityScale && (
                    <SeverityScale
                      value={5}
                      onChange={(v) => sendAnswer(v.toString(), message.questionData?.field, message.questionData?.type)}
                      min={message.questionData.severityScale.min}
                      max={message.questionData.severityScale.max}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {showDiagnosis && (
          <div className="mt-4">
            <ConfirmButtons
              onConfirm={handleConfirmDiagnosis}
              onRefine={() => setShowDiagnosis(false)}
              confirmLabel="Confirm & Generate Treatment"
              refineLabel="Add more information"
            />
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
      
      {!showDiagnosis && currentQuestion && (
        <div className="border-t border-border p-3 bg-muted/30">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                sendAnswer(input, currentQuestion.field, currentQuestion.type)
                setInput('')
              }
            }}
            placeholder={currentQuestion.type === 'select' ? 'Select from options above or type your answer...' : 'Type your answer...'}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                if (input.trim()) {
                  sendAnswer(input, currentQuestion.field, currentQuestion.type)
                  setInput('')
                }
              }}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}