'use client'

import { useState } from 'react'
import { PatientSidebar } from './PatientSidebar'
import { DocumentExplorer } from './DocumentExplorer'
import { SpreadsheetEditor } from './SpreadsheetEditor'
import { AIDocumentChat } from './AIDocumentChat'
import { useDocumentStore } from '@/lib/stores/document-store'

export function DocumentLayout() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const editingDocument = useDocumentStore((s) => s.editingDocument)
  const [showAIChat, setShowAIChat] = useState(true)

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Patient Sidebar — left panel */}
      <PatientSidebar />

      {/* Main content area */}
      <div className="flex-1 flex min-w-0">
        {/* Document Explorer or Editor — center panel */}
        <div className="flex-1 min-w-0 flex flex-col">
          {editingDocument ? (
            <SpreadsheetEditor />
          ) : selectedPatient ? (
            <DocumentExplorer />
          ) : (
            <EmptyState />
          )}
        </div>

        {/* AI Chat Sidebar — right panel */}
        {showAIChat && (
          <div className="w-[320px] border-l border-border flex-shrink-0">
            <AIDocumentChat />
          </div>
        )}
      </div>

      {/* Toggle AI Chat button */}
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
    <div className="flex items-center justify-center h-full text-muted-foreground p-8">
      <div className="text-center max-w-md">
        <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
        <h2 className="text-lg font-semibold mb-2">Patient Documents</h2>
        <p className="text-sm">
          Select a patient from the sidebar to view and manage their clinical documents.
          Use the AI assistant to generate documents from templates.
        </p>
      </div>
    </div>
  )
}
