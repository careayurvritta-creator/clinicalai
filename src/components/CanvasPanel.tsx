'use client'

import { useChatStore } from '@/lib/store'
import { CanvasToolbar } from './CanvasToolbar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from 'react'

export function CanvasPanel() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const contentEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contentEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [canvasContent])

  const hasContent = canvasContent.trim().length > 0

  const isDiagnosisContent = hasContent && (
    canvasContent.includes('Current Diagnostic Thinking') ||
    canvasContent.includes('PROVISIONAL DIAGNOSIS') ||
    canvasContent.includes('CASE PRESENTATION')
  )

  return (
    <div className="flex flex-col h-full bg-panel-canvas">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          {/* Mobile back button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('canvas:back-to-chat'))}
            className="md:hidden p-1 -ml-1 rounded-md hover:bg-secondary transition-colors"
            aria-label="Back to chat"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-sm font-semibold text-foreground">Output</h2>
        </div>
        {hasContent && (
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {canvasContent.length > 2000 ? 'Treatment Protocol' : 'Diagnosis'}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {!hasContent ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Output Canvas</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Diagnosis results and treatment protocols will appear here as formatted documents.
            </p>
            {isStreaming && (
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Processing...</span>
              </div>
            )}
          </div>
        ) : (
          <div className={`px-4 py-4 ${isDiagnosisContent ? 'max-w-none' : 'max-w-4xl mx-auto'}`}>
            <div className={`prose prose-invert ${isDiagnosisContent ? 'prose-lg' : 'prose-sm'} max-w-none
              prose-headings:text-foreground prose-headings:font-semibold
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-ul:text-foreground/80 prose-ol:text-foreground/80
              prose-li:text-foreground/80
              prose-hr:border-border
              prose-table:text-foreground/80 prose-th:text-foreground prose-td:text-foreground/80 prose-th:border-border prose-td:border-border prose-tr:border-border
            `}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {canvasContent}
              </ReactMarkdown>
            </div>

            {isDiagnosisContent && (
              <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
                <h4 className="text-sm font-semibold text-foreground mb-2">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => useChatStore.getState().setChatInputDraft('I confirm this diagnosis. Please provide the treatment plan.')}
                    className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Confirm Diagnosis
                  </button>
                  <button
                    onClick={() => useChatStore.getState().setChatInputDraft('I need to add more clinical information about this case.')}
                    className="px-3 py-1.5 text-xs bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    Add More Information
                  </button>
                  <button
                    onClick={() => useChatStore.getState().setChatInputDraft('Please generate a detailed treatment protocol for this diagnosis.')}
                    className="px-3 py-1.5 text-xs bg-muted border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    Generate Treatment Plan
                  </button>
                </div>
              </div>
            )}

            {isStreaming && (
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block w-2 h-4 bg-primary animate-blink" />
                <span className="text-xs text-muted-foreground">Processing response...</span>
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