'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'
import { BreadcrumbNav } from './BreadcrumbNav'

const CATEGORIES = [
  { id: '01-OPD-Registers', label: 'OPD Registers', icon: 'clipboard' },
  { id: '02-Therapy-Registers', label: 'Therapy Registers', icon: 'activity' },
  { id: '03-IPD-Registers', label: 'IPD Registers', icon: 'bed' },
  { id: '04-Procedure-Registers', label: 'Procedure Registers', icon: 'stethoscope' },
  { id: '05-Consultation-Notes', label: 'Consultation Notes', icon: 'file-text' },
  { id: '06-Invoices', label: 'Invoices', icon: 'currency' },
  { id: '07-Insurance', label: 'Insurance', icon: 'shield' },
  { id: '08-Admission-Notes', label: 'Admission Notes', icon: 'clipboard-check' },
  { id: '09-Treatment-Plans', label: 'Treatment Plans', icon: 'calendar' },
  { id: '10-Rounds-Notes', label: 'Rounds Notes', icon: 'refresh' },
  { id: '11-Nursing-Medicine', label: 'Nursing Medicine', icon: 'pill' },
  { id: '12-Nursing-Panchakarma', label: 'Nursing PK', icon: 'leaf' },
  { id: '13-Discharge-Plans', label: 'Discharge Plans', icon: 'clipboard-list' },
  { id: '14-Discharge-Summaries', label: 'Discharge Summaries', icon: 'clipboard-check' },
  { id: '15-Certificates', label: 'Certificates', icon: 'award' },
  { id: '16-Receipts', label: 'Receipts', icon: 'receipt' },
  { id: '17-Authorization', label: 'Authorization', icon: 'key' },
  { id: '18-Garbha-Sanskar', label: 'Garbha Sanskar', icon: 'heart' },
  { id: '19-Lab-Reports', label: 'Lab Reports', icon: 'flask' },
  { id: '20-Prescriptions', label: 'Prescriptions', icon: 'prescription' },
]

const CATEGORY_ICONS: Record<string, string> = {
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  bed: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-4M3 7h18M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2',
  stethoscope: 'M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4',
  'file-text': 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  currency: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'clipboard-check': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  refresh: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  pill: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  leaf: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  'clipboard-list': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h6',
  award: 'M5 3h14M5 3v12l5-3 5 3V3M12 12l5-3v12H7V9l5 3z',
  receipt: 'M9 14l2-2 4 4m-6-4l2-2 4 4M5 5h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  key: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  flask: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  prescription: 'M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z',
}

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const currentFolderId = useDocumentStore((s) => s.currentFolderId)
  const files = useDocumentStore((s) => s.files)
  const filesLoading = useDocumentStore((s) => s.filesLoading)
  const setFiles = useDocumentStore((s) => s.setFiles)
  const setLoadingFiles = useDocumentStore((s) => s.setLoadingFiles)
  const navigateToCategory = useDocumentStore((s) => s.navigateToCategory)
  const navigateToFolder = useDocumentStore((s) => s.navigateToFolder)
  const openFile = useDocumentStore((s) => s.openFile)
  const fetchedRef = useRef<string | null>(null)

  // Resolve category label → actual Drive folder ID, then fetch files
  const handleCategoryClick = useCallback(async (catId: string, catLabel: string) => {
    if (!selectedPatient) return
    setLoadingFiles(true)

    try {
      // selectedPatient.id is the patient's root Drive folder ID
      const rootFolderId = selectedPatient.id
      if (!rootFolderId) {
        setFiles([])
        setLoadingFiles(false)
        return
      }

      // List subfolders in the patient root to find the category folder
      const listRes = await fetch('/api/documents/chat-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list_folders', parentFolderId: rootFolderId }),
      })
      if (!listRes.ok) throw new Error('Failed to list folders')
      const listData = await listRes.json()

      // Find the matching category folder by comparing the numeric prefix
      const categoryFolders = listData.folders as Array<{ id: string; name: string }>
      const catPrefix = catId.split('-')[0] // e.g. '01'
      const targetFolder = categoryFolders.find(f => f.name.startsWith(catPrefix + '-'))

      if (!targetFolder) {
        // Category folder doesn't exist yet — navigate with root folder ID
        // and show empty state. The AI can create it via CREATE_FOLDER.
        navigateToCategory(catId, catLabel, rootFolderId)
        setFiles([])
        setLoadingFiles(false)
        return
      }

      // Navigate with the REAL Drive folder ID
      navigateToCategory(catId, catLabel, targetFolder.id)
      fetchedRef.current = targetFolder.id

      // Fetch files inside the category folder
      const filesRes = await fetch('/api/documents/chat-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list_files', folderId: targetFolder.id }),
      })
      if (!filesRes.ok) throw new Error('Failed to list files')
      const filesData = await filesRes.json()

      const mappedFiles = (filesData.files as Array<{ id: string; name: string; mimeType: string; size?: string; modifiedTime?: string; webViewLink?: string }>)
        .filter(f => f.mimeType !== 'application/vnd.google-apps.folder')
        .map(f => ({
          id: f.id,
          name: f.name,
          mimeType: f.mimeType || '',
          size: f.size ? Number(f.size) : undefined,
          modifiedTime: f.modifiedTime || '',
          webViewLink: f.webViewLink,
        }))
      setFiles(mappedFiles)
      setLoadingFiles(false)
    } catch (err) {
      setFiles([])
      setLoadingFiles(false)
    }
  }, [selectedPatient, setFiles, setLoadingFiles, navigateToCategory])

  // Auto-fetch files when navigating to a subfolder within a category
  useEffect(() => {
    if (!currentFolderId || !currentCategory) return
    if (fetchedRef.current === currentFolderId) return
    fetchedRef.current = currentFolderId

    let cancelled = false
    const fetchFiles = async () => {
      setLoadingFiles(true)
      try {
        const filesRes = await fetch('/api/documents/chat-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'list_files', folderId: currentFolderId }),
        })
        if (!filesRes.ok) throw new Error('Failed to list files')
        const filesData = await filesRes.json()

        if (!cancelled) {
          const mappedFiles = (filesData.files as Array<{ id: string; name: string; mimeType: string; size?: string; modifiedTime?: string; webViewLink?: string }>)
            .filter(f => f.mimeType !== 'application/vnd.google-apps.folder')
            .map(f => ({
              id: f.id,
              name: f.name,
              mimeType: f.mimeType || '',
              size: f.size ? Number(f.size) : undefined,
              modifiedTime: f.modifiedTime || '',
              webViewLink: f.webViewLink,
            }))
          setFiles(mappedFiles)
          setLoadingFiles(false)
        }
      } catch {
        if (!cancelled) {
          setFiles([])
          setLoadingFiles(false)
        }
      }
    }
    fetchFiles()
    return () => { cancelled = true }
  }, [currentFolderId, currentCategory, setFiles, setLoadingFiles])

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
                onClick={() => handleCategoryClick(cat.id, cat.label)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted border border-border hover:border-primary/30 transition-all"
              >
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.clipboard} />
                </svg>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // File list view — use BreadcrumbNav for navigation
  return (
    <div className="flex flex-col min-h-0 h-full">
      <BreadcrumbNav />
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
                  {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : ''}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
