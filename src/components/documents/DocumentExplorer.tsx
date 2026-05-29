'use client'

import { useState, useEffect } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'
import { DOCUMENT_CATEGORIES } from '@/lib/templates'
import type { DocumentCategory } from '@/lib/types'

interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: number
  createdTime?: string
  modifiedTime?: string
  webViewLink?: string
}

// Map category IDs to folder name prefixes
const CATEGORY_FOLDER_MAP: Record<string, string> = {
  'opd-registers': '01-OPD-Registers',
  'therapy-registers': '02-Therapy-Registers',
  'ipd-registers': '03-IPD-Registers',
  'procedure-registers': '04-Procedure-Registers',
  'consultation-notes': '05-Consultation-Notes',
  'invoices': '06-Invoices',
  'insurance': '07-Insurance-Forms',
  'admission-notes': '08-Admission-Notes',
  'treatment-plans': '09-Treatment-Plans',
  'rounds-notes': '10-Rounds-Notes',
  'nursing-medicine': '11-Nursing-Medicine',
  'nursing-panchakarma': '12-Nursing-Panchakarma',
  'discharge-plans': '13-Discharge-Plans',
  'discharge-summaries': '14-Discharge-Summaries',
  'certificates': '15-Certificates',
  'receipts': '16-Receipts',
  'authorization': '17-Authorization',
  'garbha-sanskar': '18-Garbha-Sanskar',
  'lab-reports': '19-Lab-Reports',
  'prescriptions': '20-Prescriptions',
}

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const setCurrentCategory = useDocumentStore((s) => s.setCurrentCategory)
  const documents = useDocumentStore((s) => s.documents)
  const setDocuments = useDocumentStore((s) => s.setDocuments)
  const openDocument = useDocumentStore((s) => s.openDocument)
  const [loading, setLoading] = useState(false)
  const [categoryFolders, setCategoryFolders] = useState<Record<string, string>>({})

  // Fetch patient folder structure when patient changes
  useEffect(() => {
    if (!selectedPatient) {
      setCategoryFolders({})
      setDocuments([])
      return
    }

    const fetchFolders = async () => {
      try {
        const res = await fetch('/api/drive/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientName: selectedPatient.name,
            clinicalId: selectedPatient.driveFolderId, // This is actually the folder ID
          }),
        })
        if (!res.ok) throw new Error('Failed to get folder structure')
        const data = await res.json()
        setCategoryFolders(data.categoryFolders ?? {})
      } catch {
        // Folder structure fetch failed
      }
    }

    fetchFolders()
  }, [selectedPatient, setDocuments])

  // Fetch files when category changes
  useEffect(() => {
    if (!currentCategory || !categoryFolders[currentCategory]) {
      setDocuments([])
      return
    }

    const fetchFiles = async () => {
      setLoading(true)
      try {
        const folderId = categoryFolders[CATEGORY_FOLDER_MAP[currentCategory] ?? currentCategory]
        if (!folderId) return

        const res = await fetch(`/api/drive/files?folderId=${folderId}`)
        if (!res.ok) throw new Error('Failed to fetch files')
        const data = await res.json()
        setDocuments((data.files ?? []).map((f: DriveFile) => ({
          id: f.id,
          name: f.name,
          category: currentCategory,
          driveFileId: f.id,
          driveFileUrl: f.webViewLink,
          mimeType: f.mimeType,
          size: f.size,
          createdAt: f.createdTime ?? '',
          updatedAt: f.modifiedTime ?? '',
        })))
      } catch {
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [currentCategory, categoryFolders, setDocuments])

  if (!selectedPatient) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p className="text-sm font-medium">Select a patient</p>
          <p className="text-xs mt-1">Choose a patient from the sidebar to view their documents</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Breadcrumb */}
      <div className="px-4 py-2 border-b border-border flex items-center gap-2 text-xs">
        <button
          onClick={() => setCurrentCategory(null)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {selectedPatient.name}
        </button>
        {currentCategory && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {DOCUMENT_CATEGORIES.find(c => c.id === currentCategory)?.label ?? currentCategory}
            </span>
          </>
        )}
      </div>

      {!currentCategory ? (
        /* Category grid */
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DOCUMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* File list */
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <svg className="w-10 h-10 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium">No documents</p>
              <p className="text-xs mt-1">Use the AI chat to generate documents</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => openDocument(doc)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    {doc.mimeType.includes('spreadsheet') ? (
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ) : doc.mimeType.includes('document') ? (
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{doc.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : ''}
                      {doc.updatedAt ? ` · ${new Date(doc.updatedAt).toLocaleDateString()}` : ''}
                    </div>
                  </div>
                  {doc.driveFileUrl && (
                    <a
                      href={doc.driveFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                      title="Open in Drive"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
