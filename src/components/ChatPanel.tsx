'use client'

import { useChatStore } from '@/lib/store'
import { useShallow } from 'zustand/shallow'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { ModuleSidebar } from './ModuleSidebar'
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
    <>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Start a conversation with Clinical AI
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Ask about Ayurvedic health guidance
            </p>
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
    </>
  )
}

export function ChatPanel() {
  const { activeModule, setCanvasContent, clearMessages } = useChatStore(
    useShallow((state) => ({
      activeModule: state.activeModule,
      setCanvasContent: state.setCanvasContent,
      clearMessages: state.clearMessages,
    }))
  )

  const handleIntakeComplete = (caseData: CaseData) => {
    console.log('Intake complete:', caseData)
  }

  const handleShowDiagnosis = (caseData: CaseData) => {
    setCanvasContent(caseData.provisionalDiagnosis || 'Diagnosis pending...')
  }

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'chat':
        return 'Chat'
      case 'treatment-protocol':
        return 'Treatment Protocol Maker'
      default:
        return activeModule.charAt(0).toUpperCase() + activeModule.slice(1).replace(/-/g, ' ')
    }
  }

  const getModuleSubtitle = () => {
    switch (activeModule) {
      case 'chat':
        return 'Clinical AI'
      case 'treatment-protocol':
        return 'AI-Guided Case Collection'
      default:
        return 'Module'
    }
  }

  return (
    <div className="flex h-full w-full">
      <ModuleSidebar />
      <div className="flex flex-col flex-1 h-full bg-panel-chat">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-foreground">
              {getModuleTitle()}
            </h2>
            {activeModule === 'treatment-protocol' && (
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                AI-Assisted
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {getModuleSubtitle()}
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {activeModule === 'chat' && <ChatView />}
          {activeModule === 'treatment-protocol' && (
            <CaseCollectorChat
              onComplete={handleIntakeComplete}
              onShowDiagnosis={handleShowDiagnosis}
            />
          )}
          {activeModule !== 'chat' && activeModule !== 'treatment-protocol' && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                {getModuleTitle()}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Module coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}