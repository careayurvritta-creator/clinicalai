'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useChatStore } from '@/lib/store'
import { generateId } from '@/lib/utils'
import { MODELS } from '@/lib/types'
import type { Attachment, Message } from '@/lib/types'
import { ModelSelector } from './ModelSelector'

export function ChatInput() {
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const selectedModel = useChatStore((state) => state.selectedModel)
  const addMessage = useChatStore((state) => state.addMessage)
  const updateLastMessage = useChatStore((state) => state.updateLastMessage)
  const setStreaming = useChatStore((state) => state.setStreaming)
  const appendToCanvas = useChatStore((state) => state.appendToCanvas)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newAttachments: Attachment[] = []

    for (const file of acceptedFiles) {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file)
        const base64 = await fileToBase64(file)
        newAttachments.push({
          type: 'image',
          name: file.name,
          preview,
          text: base64,
        })
      } else if (file.type === 'application/pdf') {
        setIsProcessing(true)
        try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await fetch('/api/pdf', { method: 'POST', body: formData })
          const data = await res.json()
          if (data.text) {
            newAttachments.push({
              type: 'pdf',
              name: file.name,
              text: data.text,
            })
          }
        } catch (err) {
          console.error('PDF extraction failed:', err)
        }
        setIsProcessing(false)
      }
    }

    setAttachments((prev) => [...prev, ...newAttachments])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
      'application/pdf': [],
    },
    maxSize: 10 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  })

  const handleSend = async () => {
    const text = input.trim()
    if ((!text && attachments.length === 0) || useChatStore.getState().isStreaming || isProcessing) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user' as const,
      content: text,
      timestamp: Date.now(),
      status: 'complete' as const,
      ...(attachments.length > 0 ? {
        attachments: attachments.map((a) => ({
          type: a.type as 'image' | 'pdf',
          name: a.name,
        })),
      } : {}),
    }

    addMessage(userMessage)
    setInput('')
    // Revoke object URLs before clearing attachments to prevent memory leak
    attachments.forEach(a => { if (a.preview) URL.revokeObjectURL(a.preview) })
    setAttachments([])
    setStreaming(true)

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
        .map((m) => ({ role: m.role, content: m.content }))

      // Include attachment content in the last user message
      const attachmentContext = attachments
        .filter(a => a.text)
        .map(a => {
          if (a.type === 'pdf') return `\n\n[Attached PDF: ${a.name}]\n${a.text}`
          if (a.type === 'image') return `\n\n[Attached Image: ${a.name}]`
          return ''
        })
        .join('')

      // For images, make a vision API call to get description
      let imageDescription = ''
      const imageAttachments = attachments.filter(a => a.type === 'image' && a.text)
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

      // Combine attachment context with message content
      let messageWithContext = text
      if (imageDescription) {
        messageWithContext += `\n\n[Image Analysis]\n${imageDescription}`
      }
      if (attachmentContext) {
        messageWithContext += attachmentContext
      }

      // Update the last user message with attachment context
      if (messageWithContext !== text && apiMessages.length > 0) {
        const lastMsg = apiMessages[apiMessages.length - 1]
        if (lastMsg.role === 'user') {
          lastMsg.content = messageWithContext
        }
      }

      const body: any = {
        messages: apiMessages,
        model: selectedModel,
        attachments: attachments.map(a => ({
          type: a.type,
          name: a.name,
          ...(a.type === 'pdf' && a.text ? { text: a.text } : {}),
          ...(a.type === 'image' && a.text ? { base64: a.text } : {}),
        })),
      }

      console.log('[Chat] Sending request:', { model: selectedModel, messageCount: apiMessages.length })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log('[Chat] Response status:', response.status)

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        const errorMsg = errorBody?.error || `API error: ${response.status}`
        throw new Error(errorMsg)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullContent = ''
      let buffer = ''
      let chunkCount = 0
      let sampleData = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        chunkCount++
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const data = trimmed.slice(5).trim()
          
          if (data === '[DONE]') {
            console.log('[Chat] Received [DONE]')
            continue
          }
          if (!data) continue

          // Save first non-empty data for debugging
          if (!sampleData && data.length < 500) {
            sampleData = data
          }

          try {
            const json = JSON.parse(data)
            // Try multiple possible paths for content
            const content = 
              json.choices?.[0]?.delta?.content ?? 
              json.choices?.[0]?.delta?.text ??
              json.choices?.[0]?.message?.content ??
              json.content ??
              json.text ??
              ''
            if (content) {
              fullContent += content
              updateLastMessage(fullContent, 'streaming')
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }

      console.log('[Chat] Stream complete:', { 
        chunks: chunkCount, 
        contentLength: fullContent.length,
        sampleData: sampleData.substring(0, 300)
      })

      if (!fullContent.trim()) {
        throw new Error('AI returned empty response. Check NVIDIA_API_KEY in Vercel settings.')
      }

      updateLastMessage(fullContent, 'complete')
      appendToCanvas(fullContent)
    } catch (error) {
      console.error('Chat error:', error)
      updateLastMessage(
        `Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        'error'
      )
    } finally {
      setStreaming(false)
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  return (
    <div {...getRootProps()} className="border-t border-border flex-shrink-0">
      <input {...getInputProps()} />

      {attachments.length > 0 && (
        <div className="flex gap-2 px-3 pt-3 overflow-x-auto scrollbar-thin pb-1">
          {attachments.map((att, i) => (
            <div key={i} className="relative group flex-shrink-0">
              {att.type === 'image' && att.preview ? (
                <div className="relative">
                  <img
                    src={att.preview}
                    alt={att.name}
                    className="w-16 h-16 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAttachment(i) }}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity touch-target"
                  >
                    x
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-xs">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground max-w-[100px] truncate">{att.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeAttachment(i) }}
                    className="text-red-400 hover:text-red-300 touch-target"
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="p-2 md:p-3">
        <div className="flex items-end gap-1.5 md:gap-2">
          {/* Attach button - larger touch target on mobile */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="touch-target flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            title="Attach file"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) onDrop(Array.from(e.target.files))
              e.target.value = ''
            }}
          />

          {/* Camera button - mobile only */}
          <button
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.accept = 'image/*'
              input.capture = 'environment'
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files
                if (files?.length) onDrop(Array.from(files))
              }
              input.click()
            }}
            className="touch-target flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex-shrink-0 md:hidden"
            title="Take photo"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isDragActive ? 'Drop files here...' : 'Ask about Ayurvedic health...'}
              className="w-full bg-muted border border-border rounded-xl px-3 md:px-4 py-2 md:py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 scrollbar-thin"
              rows={1}
              disabled={isStreaming || isProcessing}
            />
          </div>

          {/* Send button - larger touch target */}
          <button
            onClick={handleSend}
            disabled={!input.trim() && attachments.length === 0 || isStreaming || isProcessing}
            className="touch-target flex items-center justify-center bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
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

        <div className="flex items-center justify-between mt-1.5 md:mt-2 px-1">
          <span className="text-[10px] text-muted-foreground/40 hidden md:inline">
            Enter to send, Shift+Enter for new line
          </span>
          <ModelSelector />
        </div>
      </div>
    </div>
  )
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
