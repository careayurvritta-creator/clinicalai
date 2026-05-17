'use client'

import { useChatStore } from '@/lib/store'
import { CanvasToolbar } from './CanvasToolbar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from 'react'

export function CanvasPanel() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const contentEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [canvasContent])

  const hasContent = canvasContent.trim().length > 0

  return (
    <div className="flex flex-col h-full bg-panel-canvas">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Canvas</h2>
        <span className="text-xs text-muted-foreground">
          {messages.filter((m) => m.role === 'assistant' && m.status === 'complete').length} response{messages.filter((m) => m.role === 'assistant' && m.status === 'complete').length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!hasContent ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Canvas</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              AI responses will appear here as formatted content.
              Start a conversation to see responses accumulate.
            </p>
          </div>
        ) : (
          <div className="px-6 py-6 max-w-4xl mx-auto">
            <div className="prose prose-invert prose-sm max-w-none
              prose-headings:text-foreground prose-headings:font-semibold
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-ul:text-foreground/80 prose-ol:text-foreground/80
              prose-li:text-foreground/80
              prose-hr:border-border
              prose-table:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80 prose-th:border-border prose-td:border-border prose-tr:border-border
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {canvasContent}
              </ReactMarkdown>
            </div>

            {isStreaming && (
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-4 bg-primary animate-blink" />
              </div>
            )}

            <div ref={contentEndRef} />
          </div>
        )}
      </div>

      {hasContent && <CanvasToolbar />}
    </div>
  )
}
