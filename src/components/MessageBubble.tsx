'use client'

import { Message } from '@/lib/types'
import { formatTime } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface MessageBubbleProps {
  message: Message
}

function SafeTime({ timestamp }: { timestamp: number }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(formatTime(timestamp))
  }, [timestamp])

  if (!time) return null
  return (
    <span className="text-[10px] text-muted-foreground/80">
      {time}
    </span>
  )
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-chat-user text-foreground rounded-br-md'
            : 'bg-chat-ai border border-border text-foreground rounded-bl-md'
        }`}
      >
        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {message.attachments.map((att, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-muted rounded-lg px-2 py-1 text-xs"
              >
                {att.type === 'image' ? (
                  <svg className="w-3 h-3 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                <span className="text-muted-foreground truncate max-w-[120px]">
                  {att.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Message content */}
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words min-w-0">
          {message.content || (message.status === 'streaming' && (
            <span className="inline-block w-2 h-4 bg-primary animate-blink ml-0.5" />
          ))}
        </div>

        {/* Footer: time + status */}
        <div className={`flex items-center gap-2 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <SafeTime timestamp={message.timestamp} />
          {message.status === 'error' && (
            <span className="text-[10px] text-red-400">Failed</span>
          )}
          {message.status === 'streaming' && (
            <span className="text-[10px] text-primary/60">typing...</span>
          )}
        </div>
      </div>
    </div>
  )
}
