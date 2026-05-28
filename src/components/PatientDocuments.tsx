'use client'

import { useState } from 'react'
import { PatientSelector } from './PatientSelector'
import { PatientFolderView } from './PatientFolderView'
import { FolderContents } from './FolderContents'
import { DocumentUpload } from './DocumentUpload'
import type { DocumentCategory } from '@/lib/constants'

type View = 'selector' | 'folders' | 'contents' | 'upload'

export function PatientDocuments() {
  const [view, setView] = useState<View>('selector')
  const [patientId, setPatientId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | null>(null)
  const [uploadCategory, setUploadCategory] = useState<DocumentCategory | undefined>(undefined)

  const handleSelectPatient = (id: string) => {
    setPatientId(id)
    setView('folders')
  }

  const handleOpenCategory = (category: DocumentCategory) => {
    setActiveCategory(category)
    setView('contents')
  }

  const handleBackToSelector = () => {
    setPatientId(null)
    setActiveCategory(null)
    setView('selector')
  }

  const handleBackToFolders = () => {
    setActiveCategory(null)
    setView('folders')
  }

  const handleUpload = (category?: DocumentCategory) => {
    setUploadCategory(category || activeCategory || undefined)
    setView('upload')
  }

  const handleUploadComplete = () => {
    setView(activeCategory ? 'contents' : 'folders')
  }

  if (!patientId) {
    return <PatientSelector onSelect={handleSelectPatient} />
  }

  if (view === 'upload') {
    return (
      <DocumentUpload
        patientId={patientId}
        defaultCategory={uploadCategory}
        onComplete={handleUploadComplete}
        onCancel={() => setView(activeCategory ? 'contents' : 'folders')}
      />
    )
  }

  if (view === 'contents' && activeCategory) {
    return (
      <FolderContents
        patientId={patientId}
        category={activeCategory}
        categoryLabel={activeCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        onBack={handleBackToFolders}
        onUpload={() => handleUpload(activeCategory)}
      />
    )
  }

  return (
    <PatientFolderView
      patientId={patientId}
      onOpenCategory={handleOpenCategory}
      onBack={handleBackToSelector}
      onUpload={() => handleUpload()}
    />
  )
}
