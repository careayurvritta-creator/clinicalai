'use client'

import { useProtocolStore } from '@/lib/stores/protocol-store'
import { CanvasToolbar } from './CanvasToolbar'
import { ProtocolRenderer } from './ProtocolRenderer'
import { OutputFileExplorer, type ExplorerFile } from './OutputFileExplorer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function CanvasPanel() {
  const pathname = usePathname()
  const canvasContent = useProtocolStore((state) => state.canvasContent)
  const canvasTimestamp = useProtocolStore((state) => state.canvasTimestamp)
  const isStreaming = useProtocolStore((state) => state.isStreaming)
  const contentEndRef = useRef<HTMLDivElement>(null)
  const [dismissedStale, setDismissedStale] = useState(false)
  const [openedExplorerFile, setOpenedExplorerFile] = useState<ExplorerFile | null>(null)

  // Reset stale dismissal + explorer open state when content changes
  useEffect(() => {
    setDismissedStale(false)
    setOpenedExplorerFile(null)
  }, [canvasContent])

  // Auto-scroll only if user is near bottom
  useEffect(() => {
    const el = contentEndRef.current?.parentElement
    if (!el) return
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200
    if (isNearBottom) {
      contentEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [canvasContent])

  const hasContent = canvasContent.trim().length > 0

  // Memoize content type detection to avoid re-computing on every render
  const contentInfo = useMemo(() => {
    if (!hasContent) {
      return { isProtocol: false, isDiagnosis: false, contentTypeLabel: '' }
    }
    const isProtocol =
      canvasContent.includes('## Abstract') ||
      canvasContent.includes('## Keywords') ||
      canvasContent.includes('## Case Summary') ||
      canvasContent.includes('## Case Presentation') ||
      canvasContent.includes('## Diagnostic Assessment') ||
      canvasContent.includes('## Treatment Protocol') ||
      canvasContent.includes('## Ayurvedic Pathogenesis') ||
      canvasContent.includes('## Samprapti') ||
      canvasContent.includes('## Detailed Treatment') ||
      canvasContent.includes('## Pharmacotherapy') ||
      canvasContent.includes('## Literature Review') ||
      canvasContent.includes('## Conclusion')
    const isDiagnosis =
      !isProtocol &&
      (canvasContent.includes('Current Diagnostic Thinking') ||
        canvasContent.includes('PROVISIONAL DIAGNOSIS') ||
        canvasContent.includes('CASE PRESENTATION'))
    const contentTypeLabel = isProtocol
      ? 'Treatment Protocol'
      : isDiagnosis
        ? 'Diagnosis'
        : 'Output'
    return { isProtocol, isDiagnosis, contentTypeLabel }
  }, [hasContent, canvasContent])

  const isProtocol = contentInfo.isProtocol
  const isDiagnosis = contentInfo.isDiagnosis

  // Content is stale if it exists but timestamp is >5 min old
  const isStale = hasContent && canvasTimestamp > 0 && (
    Date.now() - canvasTimestamp > 5 * 60 * 1000
  )

  const getContentType = () => contentInfo.contentTypeLabel

  // Streaming is active when the store says so
  const isCanvasStreaming = isStreaming

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full bg-panel-canvas">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Back button for explorer-open mode */}
            {openedExplorerFile && (
              <button
                onClick={() => setOpenedExplorerFile(null)}
                className="p-1 -ml-1 rounded-md hover:bg-secondary transition-colors"
                aria-label="Back to full output"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Mobile back button */}
            {!openedExplorerFile && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('canvas:back-to-chat'))}
                className="md:hidden p-1 -ml-1 rounded-md hover:bg-secondary transition-colors"
                aria-label="Back to chat"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <h2 className="text-sm font-semibold text-foreground">
              {openedExplorerFile ? `Output: ${openedExplorerFile.title}` : 'Output'}
            </h2>

            {isCanvasStreaming && (
              <span className="flex items-center gap-1.5 text-xs text-primary">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Generating...
              </span>
            )}
          </div>
        {hasContent && (
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {getContentType()}
          </span>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        {!hasContent ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Output Canvas</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {pathname === '/treatment-protocol'
                ? 'Diagnosis results and treatment protocols will appear here as formatted documents.'
                : 'Results and outputs will appear here.'}
            </p>
            {isCanvasStreaming && (
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
            {/* Stale content banner */}
            {isStale && !dismissedStale && (
              <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>This output was generated previously. Send a new message for fresh results.</span>
                <button
                  onClick={() => setDismissedStale(true)}
                  className="ml-auto text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Dismiss
                </button>
              </div>
            )}

            <OutputFileExplorer
              canvasContent={canvasContent}
              openedFileId={openedExplorerFile?.id ?? null}
              onOpenFile={setOpenedExplorerFile}
            />

            {openedExplorerFile ? (
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {openedExplorerFile.content}
                </ReactMarkdown>
              </div>
            ) : isProtocol ? (
              <ProtocolRenderer content={canvasContent} />
            ) : (
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {canvasContent}
                </ReactMarkdown>
              </div>
            )}

            {/* Streaming cursor */}
            {isCanvasStreaming && (
              <span className="inline-block w-2 h-5 bg-primary animate-blink ml-0.5 align-middle" />
            )}

            {/* Diagnosis action buttons */}
            {isDiagnosis && !isCanvasStreaming && pathname === '/treatment-protocol' && (
              <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => useProtocolStore.getState().setChatInputDraft('I confirm this diagnosis. Please provide the treatment plan.')}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Confirm Diagnosis
                </button>
                <button
                  onClick={() => useProtocolStore.getState().setChatInputDraft('I need to add more clinical information about this case.')}
                  className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Add More Information
                </button>
                <button
                  onClick={() => useProtocolStore.getState().setChatInputDraft('Please generate a detailed treatment protocol for this diagnosis.')}
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

      {hasContent && <CanvasToolbar canvasContent={canvasContent} onClear={() => useProtocolStore.getState().clearMessages()} />}
    </div>
  )
}
