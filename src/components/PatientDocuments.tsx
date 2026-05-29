'use client'

import { PatientSidebar } from './documents/PatientSidebar'
import { DocumentExplorer } from './documents/DocumentExplorer'
import { AIDocumentChat } from './documents/AIDocumentChat'

export function PatientDocuments() {
  return (
    <div className="flex h-full min-h-0">
      {/* Left: Patient sidebar */}
      <PatientSidebar />

      {/* Center: Document explorer */}
      <DocumentExplorer />

      {/* Right: AI chat sidebar */}
      <AIDocumentChat />
    </div>
  )
}
