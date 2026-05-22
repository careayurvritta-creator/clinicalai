'use client'

import { useChatStore } from '@/lib/store'
import { CanvasToolbar } from './CanvasToolbar'
import { ProtocolRenderer } from './ProtocolRenderer'
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

  const isProtocol = hasContent && (
    canvasContent.includes('## Case Summary') ||
    canvasContent.includes('## Treatment Protocol') ||
    canvasContent.includes('## Ayurvedic Pathogenesis') ||
    canvasContent.includes('## Samprapti') ||
    canvasContent.includes('## Detailed Treatment')
  )

  const isDiagnosis = hasContent && !isProtocol && (
    canvasContent.includes('Current Diagnostic Thinking') ||
    canvasContent.includes('PROVISIONAL DIAGNOSIS') ||
    canvasContent.includes('CASE PRESENTATION')
  )

  const getContentType = () => {
    if (isProtocol) return 'Treatment Protocol'
    if (isDiagnosis) return 'Diagnosis'
    if (hasContent) return 'Output'
    return ''
  }

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
            {getContentType()}
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
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                Processing...
              </div>
            )}
          </div>
        ) : (
          <div className={`p-4 md:p-6 ${isProtocol ? '' : 'max-w-4xl mx-auto'}`}>
            {isProtocol ? (
              <ProtocolRenderer content={canvasContent} />
            ) : (
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {canvasContent}
                </ReactMarkdown>
              </div>
            )}

            {/* Streaming cursor */}
            {isStreaming && (
              <span className="inline-block w-2 h-5 bg-primary animate-blink ml-0.5 align-middle" />
            )}

            {/* Diagnosis action buttons */}
            {isDiagnosis && (
              <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => useChatStore.getState().setChatInputDraft('I confirm this diagnosis. Please provide the treatment plan.')}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Confirm Diagnosis
                </button>
                <button
                  onClick={() => useChatStore.getState().setChatInputDraft('I need to add more clinical information about this case.')}
                  className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Add More Information
                </button>
                <button
                  onClick={() => useChatStore.getState().setChatInputDraft('Please generate a detailed treatment protocol for this diagnosis.')}
                  className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Generate Treatment Plan
                </button>
              </div>
            )}
          </div>
        )}
        <div ref={contentEndRef} />
      </div>

      {hasContent && <CanvasToolbar />}
    </div>
  )
}
