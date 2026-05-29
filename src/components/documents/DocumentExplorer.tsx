'use client'

import { useDocumentStore } from '@/lib/stores/document-store'

const CATEGORIES = [
  { id: '01-OPD-Registers', label: 'OPD Registers' },
  { id: '02-Therapy-Registers', label: 'Therapy Registers' },
  { id: '03-IPD-Registers', label: 'IPD Registers' },
  { id: '04-Procedure-Registers', label: 'Procedure Registers' },
  { id: '05-Consultation-Notes', label: 'Consultation Notes' },
  { id: '06-Invoices', label: 'Invoices' },
  { id: '07-Insurance', label: 'Insurance' },
  { id: '08-Admission-Notes', label: 'Admission Notes' },
  { id: '09-Treatment-Plans', label: 'Treatment Plans' },
  { id: '10-Rounds-Notes', label: 'Rounds Notes' },
  { id: '11-Nursing-Medicine', label: 'Nursing Medicine' },
  { id: '12-Nursing-Panchakarma', label: 'Nursing PK' },
  { id: '13-Discharge-Plans', label: 'Discharge Plans' },
  { id: '14-Discharge-Summaries', label: 'Discharge Summaries' },
  { id: '15-Certificates', label: 'Certificates' },
  { id: '16-Receipts', label: 'Receipts' },
  { id: '17-Authorization', label: 'Authorization' },
  { id: '18-Garbha-Sanskar', label: 'Garbha Sanskar' },
  { id: '19-Lab-Reports', label: 'Lab Reports' },
  { id: '20-Prescriptions', label: 'Prescriptions' },
]

const DEFAULT_ICON = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const files = useDocumentStore((s) => s.files)
  const filesLoading = useDocumentStore((s) => s.filesLoading)
  const navigateToCategory = useDocumentStore((s) => s.navigateToCategory)
  const openFile = useDocumentStore((s) => s.openFile)
  const navigateUp = useDocumentStore((s) => s.navigateUp)

  if (!selectedPatient) return null

  // Category grid view
  if (!currentCategory) {
    return (
      <div className="flex flex-col min-h-0 h-full">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">{selectedPatient.name}</h3>
          <p className="text-xs text-muted-foreground">Select a document category</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.id, cat.label)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted border border-border hover:border-primary/30 transition-all"
              >
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={DEFAULT_ICON} />
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
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="px-4 py-2 border-b border-border flex items-center gap-2">
        <button
          onClick={navigateUp}
          className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-foreground">{currentCategory}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <svg className="w-10 h-10 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-muted-foreground">No files in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => openFile(file)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
              >
                <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{file.name}</div>
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {file.size ? `${Math.round(file.size / 1024)} KB` : ''}
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {new Date(file.modifiedTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
