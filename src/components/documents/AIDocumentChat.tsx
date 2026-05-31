'use client'

import { useState, useRef, useEffect } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'
import { ALL_TEMPLATES } from '@/lib/templates'
import type { Message } from '@/lib/types'
import { DEFAULT_MODEL, MODELS } from '@/lib/types'
import { buildIntakeSystemPrompt } from '@/lib/intake-prompt'
import { parseIntakeMarkers } from '@/lib/intake-markers'

export function AIDocumentChat() {
  const chatMessages = useDocumentStore((s) => s.chatMessages)
  const addChatMessage = useDocumentStore((s) => s.addChatMessage)
  const updateLastChatMessage = useDocumentStore((s) => s.updateLastChatMessage)
  const clearChatMessages = useDocumentStore((s) => s.clearChatMessages)
  const isStreaming = useDocumentStore((s) => s.isStreaming)
  const setStreaming = useDocumentStore((s) => s.setChatStreaming)
  const selectedModel = useDocumentStore((s) => s.selectedModel)
  const setModel = useDocumentStore((s) => s.setChatModel)
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const collectedDemographics = useDocumentStore((s) => s.collectedDemographics)
  const updateCollectedDemographics = useDocumentStore((s) => s.updateCollectedDemographics)
  const resetCollectedDemographics = useDocumentStore((s) => s.resetCollectedDemographics)
  const setPatientSupabaseId = useDocumentStore((s) => s.setPatientSupabaseId)
  const updatePatientDemographics = useDocumentStore((s) => s.updatePatientDemographics)
  const clearPatient = useDocumentStore((s) => s.clearPatient)
  const setIntakeMode = useDocumentStore((s) => s.setIntakeMode)

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const makeId = () => crypto.randomUUID()
  const now = () => Date.now()

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    setInput('')

    const userMsg: Message = { id: makeId(), role: 'user', content: text, timestamp: now(), status: 'complete' }
    addChatMessage(userMsg)

    const aiMsg: Message = { id: makeId(), role: 'assistant', content: '', timestamp: now(), status: 'streaming' }
    addChatMessage(aiMsg)
    setStreaming(true)

    try {
      const systemPrompt = buildIntakeSystemPrompt({
        selectedPatient: selectedPatient ? {
          name: selectedPatient.name,
          clinicalId: selectedPatient.clinicalId,
          demographics: selectedPatient.demographics,
        } : null,
        collectedDemographics,
      })

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          model: selectedModel,
        }),
      })

      if (!res.ok) throw new Error('Chat request failed')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response stream')

      let accumulated = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                accumulated += content
                updateLastChatMessage(accumulated, 'streaming')
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      // Parse markers from response
      const { markers, cleanText } = parseIntakeMarkers(accumulated)

      // Display clean text (without markers)
      if (markers.length > 0) {
        updateLastChatMessage(cleanText || 'Done.', 'complete')
      } else {
        updateLastChatMessage(accumulated, 'complete')
      }

      // Execute actions
      for (const marker of markers) {
        switch (marker.type) {
          case 'save_demographics':
            await handleSaveDemographics(marker.data)
            break
          case 'generate_document':
            await handleGenerateWithData(marker.templateId, marker.data)
            break
          case 'update_demographics':
            await handleUpdateDemographic(marker.field, marker.value)
            break
        }
      }
    } catch (err) {
      updateLastChatMessage(
        `Error: ${err instanceof Error ? err.message : 'Failed to get response'}`,
        'error'
      )
    } finally {
      setStreaming(false)
    }
  }

  const handleSaveDemographics = async (demographics: Record<string, unknown>) => {
    try {
      const res = await fetch('/api/patients/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_demographics',
          demographics,
          driveFolderId: selectedPatient?.id,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.details || err.error || 'Failed to save')
      }

      const data = await res.json()

      // Update store
      updateCollectedDemographics(demographics)
      if (data.patient) {
        setPatientSupabaseId(data.patient.id, data.patient.uhid)
        updatePatientDemographics(data.patient)
      }

      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Patient demographics saved.\n\n**UHID:** ${data.patient?.uhid}\n**Clinical ID:** ${data.patient?.clinical_id}\n\nAll future documents will auto-fill from this data. What document would you like to generate?`,
        timestamp: now(),
        status: 'complete',
      })

      resetCollectedDemographics()
    } catch (err) {
      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Failed to save demographics: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: now(),
        status: 'error',
      })
    }
  }

  const handleGenerateWithData = async (templateId: string, documentData: Record<string, unknown>) => {
    if (!selectedPatient) {
      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: 'Please select a patient first before generating documents.',
        timestamp: now(),
        status: 'complete',
      })
      return
    }

    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          patientName: selectedPatient.name,
          clinicalId: selectedPatient.clinicalId,
          data: documentData,
        }),
      })

      if (!res.ok) throw new Error('Document generation failed')
      const data = await res.json()

      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Document created!\n\n**${data.document.title}**\n\n[Open in Google Drive](${data.document.url})`,
        timestamp: now(),
        status: 'complete',
      })
    } catch (err) {
      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Failed to generate document: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: now(),
        status: 'error',
      })
    }
  }

  const handleUpdateDemographic = async (field: string, value: unknown) => {
    if (!selectedPatient?.supabasePatientId) {
      updateCollectedDemographics({ [field]: value })
      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Updated ${field} locally. Save demographics to persist.`,
        timestamp: now(),
        status: 'complete',
      })
      return
    }

    try {
      const res = await fetch('/api/patients/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          patientId: selectedPatient.supabasePatientId,
          updates: { [field]: value },
        }),
      })

      if (!res.ok) throw new Error('Update failed')

      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Updated ${field} to "${value}".`,
        timestamp: now(),
        status: 'complete',
      })
    } catch (err) {
      addChatMessage({
        id: makeId(),
        role: 'assistant',
        content: `Failed to update ${field}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: now(),
        status: 'error',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewPatient = () => {
    clearPatient()
    resetCollectedDemographics()
    clearChatMessages()
    setIntakeMode('creating_patient')
    addChatMessage({
      id: makeId(),
      role: 'assistant',
      content: "Let's register a new patient. What is the patient's full name?",
      timestamp: now(),
      status: 'complete',
    })
  }

  return (
    <div className="flex flex-col w-[320px] border-l border-border bg-panel-chat flex-shrink-0">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-foreground">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <select
            value={selectedModel}
            onChange={(e) => setModel(e.target.value)}
            className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-foreground outline-none"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <button
            onClick={clearChatMessages}
            className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
            title="Clear chat"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin min-h-0">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <svg className="w-10 h-10 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xs font-medium">Patient Intake Assistant</p>
            <p className="text-[10px] mt-1 max-w-[200px]">
              Register patients, collect demographics, and generate clinical documents.
            </p>
            <div className="mt-4 space-y-1.5 w-full">
              {[
                'Register a new patient',
                'Create OPD visit entry',
                'Update my phone number',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="w-full text-left text-[10px] px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}>
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                {msg.status === 'streaming' && (
                  <span className="inline-block w-1.5 h-3 bg-primary animate-blink ml-0.5" />
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-border">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to create a document..."
            rows={1}
            className="flex-1 text-xs bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 resize-none min-h-[32px] max-h-[80px]"
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 80) + 'px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
