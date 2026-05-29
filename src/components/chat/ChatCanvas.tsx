'use client'

import { useChatStore } from '@/stores/chat-store'
import { CanvasToolbar } from '@/components/CanvasToolbar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function ChatCanvas() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  const canvasTimestamp = useChatStore((state) => state.canvasTimestamp)

  if (!canvasContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Output will appear here</p>
      </div>
    )
  }

  const isStale = Date.now() - canvasTimestamp > 5 * 60 * 1000

  return (
    <div className="flex flex-col min-h-0 h-full">
      {isStale && (
        <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-xs text-yellow-600 dark:text-yellow-400">
          This content may be outdated. Send a new message for fresh results.
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-6 py-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{canvasContent}</ReactMarkdown>
        </div>
      </div>
      <CanvasToolbar canvasContent={canvasContent} onClear={() => useChatStore.getState().clearMessages()} />
    </div>
  )
}
