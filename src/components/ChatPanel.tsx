'use client'

import { useChatStore } from '@/lib/store'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { CaseCollectorChat } from './CaseCollectorChat'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

function QuickAction({ label, description, prompt, module }: { label: string; description: string; prompt: string; module?: string }) {
  const router = useRouter()
  const handleClick = () => {
    if (module) {
      router.push(`/?module=${module}`)
    } else if (prompt) {
      useChatStore.getState().setChatInputDraft(prompt)
    }
  }
  return (
    <button
      onClick={handleClick}
      className="p-3 text-left bg-muted/50 border border-border rounded-xl hover:border-primary/50 hover:bg-muted transition-colors"
    >
      <div className="text-sm font-medium text-foreground mb-1">{label}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </button>
  )
}

function ChatView() {
  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Smart auto-scroll: only scroll if user is near bottom
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const { scrollHeight, scrollTop, clientHeight } = container
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 200
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Clinical AI</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Your AI-powered Ayurvedic clinical assistant. Ask about symptoms, treatments, herbs, or clinical protocols.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <QuickAction
                label="Digestive Health"
                description="Explore Ayurvedic approaches to chronic gut issues"
                prompt="What are the Ayurvedic treatments for chronic digestive issues?"
              />
              <QuickAction
                label="Prakriti Analysis"
                description="Understand constitutional types in Ayurveda"
                prompt="Explain the concept of Prakriti in Ayurveda and how it affects treatment."
              />
              <QuickAction
                label="Start Case Collection"
                description="Begin structured patient intake process"
                prompt=""
                module="intake"
              />
              <QuickAction
                label="Treatment Protocol"
                description="Generate research-backed treatment plans"
                prompt=""
                module="intake"
              />
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            Processing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  )
}

export function ChatPanel() {
  const activeModule = useChatStore((state) => state.activeModule)

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      {activeModule === 'intake' ? (
        <CaseCollectorChat />
      ) : (
        <ChatView />
      )}
    </div>
  )
}
