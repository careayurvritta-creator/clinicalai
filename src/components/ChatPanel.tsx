'use client'

import { useChatStore } from '@/lib/store'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { ModuleSidebar } from './ModuleSidebar'
import { useEffect, useRef } from 'react'

export function ChatPanel() {
  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-full w-full">
      <ModuleSidebar />
      <div className="flex flex-col flex-1 h-full bg-panel-chat">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="text-sm font-semibold text-foreground">Chat</h2>
          <span className="text-xs text-muted-foreground">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </span>
        </div>

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
      </div>
    </div>
  )
}
