'use client'

import { useDocumentStore } from '@/lib/stores/document-store'

export default function DocumentsPage() {
  const driveConnected = useDocumentStore((s) => s.driveConnected)

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Patient Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {driveConnected
            ? 'Select a patient from the sidebar to view their documents.'
            : 'Connect Google Drive to start managing patient documents.'}
        </p>
        {!driveConnected && (
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Connect Google Drive
          </button>
        )}
      </div>
    </div>
  )
}
