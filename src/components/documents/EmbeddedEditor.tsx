'use client'

import { useDocumentStore } from '@/lib/stores/document-store'

export function EmbeddedEditor() {
  const editingFile = useDocumentStore((s) => s.editingFile)
  const closeEditor = useDocumentStore((s) => s.closeEditor)

  if (!editingFile) return null

  const getEmbedUrl = () => {
    if (editingFile.mimeType.includes('spreadsheet') || editingFile.name.endsWith('.xlsx')) {
      return `https://docs.google.com/spreadsheets/d/${editingFile.id}/edit?usp=sharing`
    }
    if (editingFile.mimeType.includes('document') || editingFile.name.endsWith('.docx')) {
      return `https://docs.google.com/document/d/${editingFile.id}/edit?usp=sharing`
    }
    return `https://drive.google.com/file/d/${editingFile.id}/preview`
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
          <span className="text-sm font-medium text-foreground truncate">{editingFile.name}</span>
        </div>
        <a
          href={editingFile.webViewLink || `https://drive.google.com/file/d/${editingFile.id}/view`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          Open in Drive
        </a>
      </div>
      <iframe
        src={getEmbedUrl()}
        className="flex-1 w-full border-0"
        title={editingFile.name}
        allow="autoplay"
      />
    </div>
  )
}
