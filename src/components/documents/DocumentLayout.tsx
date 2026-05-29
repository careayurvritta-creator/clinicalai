'use client'

import { PatientSidebar } from './PatientSidebar'
import { DocumentExplorer } from './DocumentExplorer'
import { EmbeddedEditor } from './EmbeddedEditor'
import { AIDocumentChat } from './AIDocumentChat'
import { useDocumentStore } from '@/lib/stores/document-store'
import { useState } from 'react'

export function DocumentLayout() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const editingFile = useDocumentStore((s) => s.editingFile)
  const [showAIChat, setShowAIChat] = useState(true)

  return (
    <div className="flex h-full w-full overflow-hidden">
      <PatientSidebar />

      <div className="flex-1 flex min-w-0">
        <div className="flex-1 min-w-0 flex flex-col">
          {editingFile ? (
            <EmbeddedEditor />
          ) : selectedPatient ? (
            <DocumentExplorer />
          ) : (
            <EmptyState />
          )}
        </div>

        {showAIChat && <AIDocumentChat />}
      </div>

      <button
        onClick={() => setShowAIChat(!showAIChat)}
        className="absolute bottom-4 right-4 z-10 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        title={showAIChat ? 'Hide AI Assistant' : 'Show AI Assistant'}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Patient Documents</h3>
      <p className="text-sm text-muted-foreground max-w-md">
        Select a patient from the sidebar to view and manage their clinical documents.
      </p>
    </div>
  )
}
