'use client'

import { useState } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'

export function EmbeddedEditor() {
  const editingFile = useDocumentStore((s) => s.editingFile)
  const closeEditor = useDocumentStore((s) => s.closeEditor)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!editingFile) return null

  const fileId = editingFile.id

  const getEmbedUrl = () => {
    if (editingFile.mimeType.includes('spreadsheet')) {
      return `https://docs.google.com/spreadsheets/d/${fileId}/preview`
    }
    if (editingFile.mimeType.includes('document')) {
      return `https://docs.google.com/document/d/${fileId}/preview`
    }
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={closeEditor}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Close editor"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-foreground truncate">
            {editingFile.name}
          </span>
        </div>
        <a
          href={editingFile.webViewLink || `https://drive.google.com/file/d/${fileId}/view`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          Open in Drive
        </a>
      </div>

      <div className="flex-1 relative">
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background gap-3 px-4">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-muted-foreground text-center">
              Unable to preview this file. It may require Google login or sharing permissions.
            </p>
            <a
              href={editingFile.webViewLink || `https://drive.google.com/file/d/${fileId}/view`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Open in Google Drive
            </a>
          </div>
        )}
        <iframe
          src={getEmbedUrl()}
          className="w-full h-full border-0"
          title={editingFile.name}
          allow="autoplay; same-origin"
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true) }}
          style={{ display: error ? 'none' : 'block' }}
        />
      </div>
    </div>
  )
}
