'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useChatStore } from '@/stores/chat-store'
import { generateId } from '@/lib/utils'
import type { Attachment, Message } from '@/lib/types'
import { ModelSelector } from './ModelSelector'

const MAX_CHARS = 4000
const MAX_TEXTAREA_HEIGHT_PX = 120

function extractTaggedParts(text: string) {
  const lower = text.toLowerCase()

  const chatOpenIdx = lower.indexOf('[chat]')
  const chatCloseIdx = lower.indexOf('[/chat]')
  const outOpenIdx = lower.indexOf('[output]')
  const outCloseIdx = lower.indexOf('[/output]')

  const chatHasOpen = chatOpenIdx !== -1
  const outputHasOpen = outOpenIdx !== -1

  const chatStart = chatHasOpen ? chatOpenIdx + '[chat]'.length : -1
  const chatEnd = chatCloseIdx !== -1 ? chatCloseIdx : text.length
  const chat = chatHasOpen ? text.slice(chatStart, chatEnd) : ''

  const outStart = outputHasOpen ? outOpenIdx + '[output]'.length : -1
  const outEnd = outCloseIdx !== -1 ? outCloseIdx : text.length
  const output = outputHasOpen ? text.slice(outStart, outEnd) : ''

  return {
    chatHasOpen,
    outputHasOpen,
    chat: chat.trim(),
    output: output.trim(),
  }
}

export function ChatInput() {
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isStreaming = useChatStore((state) => state.isStreaming)
  const selectedModel = useChatStore((state) => state.selectedModel)
  const addMessage = useChatStore((state) => state.addMessage)
  const updateLastMessage = useChatStore((state) => state.updateLastMessage)
  const setStreaming = useChatStore((state) => state.setStreaming)
  const setCanvasContent = useChatStore((state) => state.setCanvasContent)
  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const createSession = useChatStore((state) => state.createSession)
  const chatInputDraft = useChatStore((state) => state.chatInputDraft)
  const setChatInputDraft = useChatStore((state) => state.setChatInputDraft)

  // Sync draft from store (set by CanvasPanel action buttons or QuickActions)
  useEffect(() => {
    if (chatInputDraft) {
      setInput(chatInputDraft)
      setChatInputDraft('')
      requestAnimationFrame(() => {
        const el = textareaRef.current
        if (el) {
          el.focus()
          el.selectionStart = el.selectionEnd = el.value.length
        }
      })
    }
  }, [chatInputDraft, setChatInputDraft])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT_PX) + 'px'
  }, [input])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    if (val.length <= MAX_CHARS) setInput(val)
  }

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      setAttachments((prev) => {
        prev.forEach(a => { if (a.preview) URL.revokeObjectURL(a.preview) })
        return []
      })
      // streaming complete
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newAttachments: Attachment[] = []
    for (const file of acceptedFiles) {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file)
        const base64 = await fileToBase64(file)
        newAttachments.push({ type: 'image', name: file.name, preview, text: base64 })
      } else if (file.type === 'application/pdf') {
        setIsProcessing(true)
        try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await fetch('/api/pdf', { method: 'POST', body: formData })
          const data = await res.json()
          if (data.text) newAttachments.push({ type: 'pdf', name: file.name, text: data.text })
        } catch (err) {
          console.error('PDF extraction failed:', err)
        } finally {
          setIsProcessing(false)
        }
      }
    }
    setAttachments((prev) => [...prev, ...newAttachments])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [], 'application/pdf': [] },
    maxSize: 10 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  })

  const handleSend = async () => {
    const text = input.trim()
    if ((!text && attachments.length === 0) || isStreaming || isProcessing) return

    const currentAttachments = [...attachments]
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      status: 'complete',
      ...(currentAttachments.length > 0 ? {
        attachments: currentAttachments.map((a) => ({ type: a.type as 'image' | 'pdf', name: a.name })),
      } : {}),
    }

    addMessage(userMessage)
    setInput('')
    currentAttachments.forEach(a => { if (a.preview) URL.revokeObjectURL(a.preview) })
    setAttachments([])
    setStreaming(true)

    // Ensure we have a session
    const sessionId = activeSessionId || createSession()

    const assistantMessage = {
      id: generateId(),
      role: 'assistant' as const,
      content: '',
      timestamp: Date.now(),
      status: 'streaming' as const,
    }
    addMessage(assistantMessage)

    try {
      const currentMessages = useChatStore.getState().messages
      const apiMessages = currentMessages
        .filter((m) => m.content.trim() !== '' || m.status !== 'streaming')
        .map((m) => ({ role: m.role, content: m.content }))

      let imageDescription = ''
      const imageAttachments = currentAttachments.filter(a => a.type === 'image' && a.text)
      if (imageAttachments.length > 0) {
        try {
          const visionPrompts = imageAttachments.map(async (img) => {
            const visionRes = await fetch('/api/vision', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                imageBase64: img.text,
                prompt: 'Describe this medical image in detail. Focus on any visible symptoms, conditions, or medical findings.',
                mimeType: img.name.endsWith('.png') ? 'image/png' : 'image/jpeg',
              }),
            })
            if (visionRes.ok) {
              const visionData = await visionRes.json()
              return `[Image Analysis: ${img.name}]\n${visionData.content || ''}`
            }
            return ''
          })
          const descriptions = await Promise.all(visionPrompts)
          imageDescription = descriptions.filter(Boolean).join('\n\n')
        } catch (e) {
          console.warn('[Chat] Vision analysis failed:', e)
        }
      }

      let messageWithContext = text
      if (imageDescription) messageWithContext += `\n\n[Image Analysis]\n${imageDescription}`

      if (messageWithContext !== text && apiMessages.length > 0) {
        const lastMsg = apiMessages[apiMessages.length - 1]
        if (lastMsg.role === 'user') lastMsg.content = messageWithContext
      }

      const body = {
        messages: apiMessages,
        model: selectedModel,
        attachments: currentAttachments.map(a => ({
          type: a.type,
          name: a.name,
          ...(a.type === 'pdf' && a.text ? { text: a.text } : {}),
          ...(a.type === 'image' && a.text ? { base64: a.text } : {}),
        })),
        sessionId,
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(errorBody?.error || `API error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullContent = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const data = trimmed.slice(5).trim()
          if (data === '[DONE]' || !data) continue
          try {
            const json = JSON.parse(data)

            // Handle server-sent error events
            if (json.type === 'error') {
              console.error('[Chat] Server error event:', json.message)
              throw new Error(json.message || 'Server stream error')
            }
            // Skip metadata/control events
            if (json.type === 'rag_metadata' || json.type === 'continuation') continue

            const content =
              json.choices?.[0]?.delta?.content ??
              json.choices?.[0]?.delta?.reasoning_content ??
              json.choices?.[0]?.delta?.text ??
              json.choices?.[0]?.message?.content ??
              json.choices?.[0]?.message?.reasoning_content ??
              json.content ??
              json.text ??
              ''
            if (content) {
              fullContent += content
              const lower = fullContent.toLowerCase()

              const chatOpenIdx = lower.indexOf('[chat]')
              const outOpenIdx = lower.indexOf('[output]')
              const hasChatOpen = chatOpenIdx !== -1
              const hasOutputOpen = outOpenIdx !== -1

              const { chat, output } = extractTaggedParts(fullContent)

              // Critical: never let OUTPUT leak into the chat panel.
              // During streaming:
              // - chat panel shows only [CHAT] content when [CHAT] has appeared
              // - otherwise chat panel stays empty (prevents detailed answer showing in chat)
              if (hasChatOpen) {
                updateLastMessage(chat, 'streaming')
              } else {
                updateLastMessage('', 'streaming')
              }

              // Output panel:
              // - once [OUTPUT] starts, render it immediately (even if [/OUTPUT] not received yet)
              //   so users don't see "missing output" mid-stream.
              if (hasOutputOpen) {
                setCanvasContent(output)
              } else {
                setCanvasContent('')
              }
            }
          } catch (parseErr) {
            // If it's an error we threw from a server error event, re-throw
            if (parseErr instanceof Error && parseErr.message !== 'Unexpected token' && !parseErr.message.startsWith('JSON')) {
              throw parseErr
            }
            /* skip malformed chunks */
          }
        }
      }

      if (!fullContent.trim()) {
        throw new Error('AI returned empty response. Check NVIDIA_API_KEY in Vercel settings.')
      }

      const lower = fullContent.toLowerCase()
      const hasChatOpen = lower.indexOf('[chat]') !== -1
      const hasOutputOpen = lower.indexOf('[output]') !== -1

      const { chat, output } = extractTaggedParts(fullContent)

      // Completion fallback:
      // - If [CHAT] exists: use it
      // - else: keep legacy behavior (whole response in chat)
      updateLastMessage(hasChatOpen ? chat : fullContent, 'complete')

      // Output completion:
      // - If [OUTPUT] exists: show it
      // - else: clear
      setCanvasContent(hasOutputOpen ? output : '')
    } catch (error) {
      console.error('Chat error:', error)
      updateLastMessage(`Error: ${error instanceof Error ? error.message : 'Failed to get response'}`, 'error')
    } finally {
      setStreaming(false)
      // streaming complete
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const next = [...prev]
      if (next[index].preview) URL.revokeObjectURL(next[index].preview!)
      next.splice(index, 1)
      return next
    })
  }

  const isDisabled = (!input.trim() && attachments.length === 0) || isStreaming || isProcessing
  const charCount = input.length

  const placeholder = isDragActive
    ? 'Drop files here...'
    : 'Ask about Ayurvedic health...'

  return (
    <div {...getRootProps()} className="border-t border-border flex-shrink-0 bg-panel-chat safe-bottom">
      <input {...getInputProps()} />

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 px-3 pt-3 overflow-x-auto scrollbar-thin pb-1">
          {attachments.map((att, i) => (
            <div key={i} className="relative group flex-shrink-0">
              {att.type === 'image' && att.preview ? (
                <div className="relative">
                  <img src={att.preview} alt={att.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAttachment(i) }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${att.name}`}
                  >
                    x
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-xs">
                  <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground max-w-[100px] truncate">{att.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); removeAttachment(i) }} className="text-red-400 hover:text-red-300 ml-1" aria-label={`Remove ${att.name}`}>x</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="p-2 md:p-3">
        <div className="flex items-end gap-1.5 md:gap-2">
          {/* Attach button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isStreaming || isProcessing}
            aria-label="Attach file"
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { if (e.target.files?.length) onDrop(Array.from(e.target.files)); e.target.value = '' }} />

          {/* Camera button - mobile only */}
          <button
            onClick={() => {
              const el = document.createElement('input')
              el.type = 'file'
              el.accept = 'image/*'
              el.capture = 'environment'
              el.onchange = (e) => { const files = (e.target as HTMLInputElement).files; if (files?.length) onDrop(Array.from(files)) }
              el.click()
            }}
            disabled={isStreaming || isProcessing}
            aria-label="Take photo"
            className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex-shrink-0 md:hidden focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Textarea */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-muted border border-border rounded-xl px-3 md:px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 scrollbar-thin leading-relaxed"
              rows={1}
              disabled={isStreaming || isProcessing}
              maxLength={MAX_CHARS}
              style={{ maxHeight: MAX_TEXTAREA_HEIGHT_PX + 'px' }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={isDisabled}
            aria-label="Send message"
            className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {isProcessing ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-1.5 px-1">
          <span className="text-[10px] text-muted-foreground/70 hidden md:inline">
            Enter to send, Shift+Enter for new line
          </span>
          {charCount > MAX_CHARS * 0.8 && (
            <span className={`text-[10px] ${charCount >= MAX_CHARS ? 'text-red-400' : 'text-muted-foreground/70'}`}>
              {charCount}/{MAX_CHARS}
            </span>
          )}
          <div className="flex-shrink-0">
            <ModelSelector selectedModel={selectedModel} onModelChange={(id) => useChatStore.getState().setModel(id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => { const result = reader.result as string; resolve(result.split(',')[1]) }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
