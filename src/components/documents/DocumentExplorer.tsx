'use client'

import { useState, useEffect } from 'react'
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
  { id: 'nursing-panchakarma', label: 'Nursing PK' },
  { id: 'discharge-plans', label: 'Discharge Plans' },
  { id: 'discharge-summaries', label: 'Discharge Summaries' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'authorization', label: 'Authorization' },
  { id: 'garbha-sanskar', label: 'Garbha Sanskar' },
  { id: 'lab-reports', label: 'Lab Reports' },
  { id: 'prescriptions', label: 'Prescriptions' },
]

const DEFAULT_ICON = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const files = useDocumentStore((s) => s.files)
  const navigateToCategory = useDocumentStore((s) => s.navigateToCategory)
  const setFiles = useDocumentStore((s) => s.setFiles)
  const openFile = useDocumentStore((s) => s.openFile)
  const navigateUp = useDocumentStore((s) => s.navigateUp)
  const [loading, setLoading] = useState(false)

  // Fetch files when category changes
  useEffect(() => {
    if (!currentCategory || !selectedPatient) return

    const fetchFiles = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          patientFolderId: selectedPatient.id,
          category: currentCategory,
        })
        const res = await fetch(`/api/drive/files?${params}`)
        if (!res.ok) throw new Error('Failed to fetch files')
        const data = await res.json()
        setFiles(data.files ?? [])
      } catch (err) {
        console.error('Failed to fetch files:', err)
        setFiles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [currentCategory, selectedPatient, setFiles])

  if (!selectedPatient) return null

  // Category grid view
  if (!currentCategory) {
    return (
      <div className="flex flex-col min-h-0 h-full">
        {/* Breadcrumb */}
        <div className="px-4 py-2 border-b border-border text-sm">
          <span className="text-foreground font-medium">
            {selectedPatient.name}
          </span>
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
  const categoryLabel = CATEGORIES.find(c => c.id === currentCategory)?.label ?? currentCategory

  return (
    <div className="flex flex-col min-h-0 h-full">
      {/* Breadcrumb */}
      <div className="px-4 py-2 border-b border-border text-sm flex items-center gap-1">
        <button
          onClick={() => navigateToCategory(null)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {selectedPatient.name}
        </button>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">{categoryLabel}</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <svg className="w-10 h-10 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-muted-foreground">No documents in this category</p>
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
