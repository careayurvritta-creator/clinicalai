'use client'

import { useDocumentStore } from '@/lib/stores/document-store'
import type { DocumentCategory } from '@/lib/types'

const CATEGORIES: { id: DocumentCategory; label: string }[] = [
  { id: 'opd-registers', label: 'OPD Registers' },
  { id: 'therapy-registers', label: 'Therapy Registers' },
  { id: 'ipd-registers', label: 'IPD Registers' },
  { id: 'procedure-registers', label: 'Procedure Registers' },
  { id: 'consultation-notes', label: 'Consultation Notes' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'admission-notes', label: 'Admission Notes' },
  { id: 'treatment-plans', label: 'Treatment Plans' },
  { id: 'rounds-notes', label: 'Rounds Notes' },
  { id: 'nursing-medicine', label: 'Nursing Medicine' },
  { id: 'nursing-panchakarma', label: 'Nursing Panchakarma' },
  { id: 'discharge-plans', label: 'Discharge Plans' },
  { id: 'discharge-summaries', label: 'Discharge Summaries' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'authorization', label: 'Authorization' },
  { id: 'garbha-sanskar', label: 'Garbha Sanskar' },
  { id: 'lab-reports', label: 'Lab Reports' },
  { id: 'prescriptions', label: 'Prescriptions' },
]

const CATEGORY_ICONS: Record<string, string> = {
  'opd-registers': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'consultation-notes': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'invoices': 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  'prescriptions': 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
}

const DEFAULT_ICON = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const setCurrentCategory = useDocumentStore((s) => s.setCurrentCategory)
  const documents = useDocumentStore((s) => s.documents)
  const openDocument = useDocumentStore((s) => s.openDocument)

  if (!selectedPatient) return null

  // Category grid view
  if (!currentCategory) {
    return (
      <div className="flex flex-col min-h-0 h-full">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">
            {selectedPatient.name}
          </h3>
          <p className="text-xs text-muted-foreground">Select a document category</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted border border-border hover:border-primary/30 transition-all"
              >
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={CATEGORY_ICONS[cat.id] || DEFAULT_ICON} />
                </svg>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // File list view
  const categoryLabel = CATEGORIES.find((c) => c.id === currentCategory)?.label ?? currentCategory

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="px-4 py-2 border-b border-border flex items-center gap-2">
        <button
          onClick={() => setCurrentCategory(null)}
          className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-foreground">{categoryLabel}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <svg className="w-10 h-10 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-muted-foreground">No files in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => openDocument(doc)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
              >
                <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{doc.name}</div>
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {doc.size ? `${Math.round(doc.size / 1024)} KB` : ''}
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {new Date(doc.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
