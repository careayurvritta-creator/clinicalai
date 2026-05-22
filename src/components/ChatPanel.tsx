'use client'

import { useChatStore } from '@/lib/store'
import { useShallow } from 'zustand/shallow'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { CaseCollectorChat } from './CaseCollectorChat'
import { useEffect, useRef } from 'react'
import type { CaseData } from '@/lib/types'

function ChatView() {
  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4">
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
              <button
                onClick={() => useChatStore.getState().setChatInputDraft('What are the main principles of Ayurveda?')}
                className="p-3 rounded-lg bg-muted/50 border border-border text-left hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">Learn Ayurveda basics</p>
                <p className="text-xs text-muted-foreground mt-1">Understand Tridosha theory</p>
              </button>
              <button
                onClick={() => useChatStore.getState().setChatInputDraft('Explain Charak Samhita Chapter 1')}
                className="p-3 rounded-lg bg-muted/50 border border-border text-left hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">Explore Charak Samhita</p>
                <p className="text-xs text-muted-foreground mt-1">Ancient wisdom for modern practice</p>
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isStreaming && messages.length > 0 && messages[messages.length - 1].status === 'streaming' && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground px-4">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>Clinical AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  )
}

export function ChatPanel() {
  const { activeModule, setCanvasContent } = useChatStore(
    useShallow((state) => ({
      activeModule: state.activeModule,
      setCanvasContent: state.setCanvasContent,
    }))
  )

  const handleIntakeComplete = (caseData: CaseData) => {
    console.log('Intake complete:', caseData)
  }

  const handleShowDiagnosis = (caseData: CaseData) => {
    setCanvasContent(caseData.provisionalDiagnosis || 'Diagnosis pending...')
  }

  const isIntakeModule = activeModule === 'treatment-protocol' || activeModule === 'intake'

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-panel-chat mobile-header-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-sm font-semibold text-foreground truncate">
            {activeModule === 'chat'
              ? 'Chat'
              : isIntakeModule
              ? 'Treatment Protocol Maker'
              : activeModule.charAt(0).toUpperCase() + activeModule.slice(1).replace(/-/g, ' ')}
          </h2>
          {activeModule === 'treatment-protocol' && (
            <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full flex-shrink-0">
              AI-Assisted
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0">
          {activeModule === 'chat'
            ? 'Clinical AI'
            : isIntakeModule
            ? 'Research-Backed Protocols'
            : 'Module'}
        </span>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {activeModule === 'chat' && <ChatView />}
        {isIntakeModule && (
          <CaseCollectorChat
            onComplete={handleIntakeComplete}
            onShowDiagnosis={handleShowDiagnosis}
          />
        )}
        {!activeModule.startsWith('chat') && !isIntakeModule && (
          <div className="flex-1 flex items-center justify-center text-center px-4">
            <div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3 mx-auto">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                {activeModule.charAt(0).toUpperCase() + activeModule.slice(1).replace(/-/g, ' ')}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                Module coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
