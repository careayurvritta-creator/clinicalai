'use client'

import { useState, useCallback } from 'react'
import { PatientSelector } from './PatientSelector'
import { PatientFolderView } from './PatientFolderView'
import { FolderContents } from './FolderContents'
import { DocumentUpload } from './DocumentUpload'
import { DocumentPreview } from './DocumentPreview'
import type { DocumentCategory } from '@/lib/constants'

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientDocument {
  id: string
  patient_id: string
  category: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

type View =
  | { type: 'selector' }
  | { type: 'folders'; patient: PatientInfo }
  | { type: 'contents'; patient: PatientInfo; category: DocumentCategory }
  | { type: 'upload'; patient: PatientInfo; category?: DocumentCategory }
  | { type: 'preview'; patient: PatientInfo; category: DocumentCategory; doc: PatientDocument }

export function PatientDocuments() {
  const [view, setView] = useState<View>({ type: 'selector' })
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSelectPatient = useCallback((patient: PatientInfo) => {
    setView({ type: 'folders', patient })
  }, [])

  const handleOpenCategory = useCallback((category: DocumentCategory) => {
    if (view.type === 'folders' || view.type === 'contents' || view.type === 'upload' || view.type === 'preview') {
      setView({ type: 'contents', patient: view.patient, category })
    }
  }, [view])

  const handleBackToSelector = useCallback(() => {
    setView({ type: 'selector' })
  }, [])

  const handleBackToFolders = useCallback(() => {
    if (view.type === 'contents' || view.type === 'upload' || view.type === 'preview') {
      setView({ type: 'folders', patient: view.patient })
    }
  }, [view])

  const handleUpload = useCallback((category?: DocumentCategory) => {
    if (view.type === 'folders') {
      setView({ type: 'upload', patient: view.patient, category })
    } else if (view.type === 'contents') {
      setView({ type: 'upload', patient: view.patient, category: category ?? view.category })
    }
  }, [view])

  const handleUploadComplete = useCallback(() => {
    setRefreshKey((k) => k + 1)
    if (view.type === 'upload') {
      if (view.category) {
        setView({ type: 'contents', patient: view.patient, category: view.category })
      } else {
        setView({ type: 'folders', patient: view.patient })
      }
    }
  }, [view])

  const handleCancelUpload = useCallback(() => {
    if (view.type === 'upload') {
      if (view.category) {
        setView({ type: 'contents', patient: view.patient, category: view.category })
      } else {
        setView({ type: 'folders', patient: view.patient })
      }
    }
  }, [view])

  const handlePreview = useCallback((doc: PatientDocument) => {
    if (view.type === 'contents') {
      setView({ type: 'preview', patient: view.patient, category: view.category, doc })
    }
  }, [view])

  const handleClosePreview = useCallback(() => {
    if (view.type === 'preview') {
      setView({ type: 'contents', patient: view.patient, category: view.category })
    }
  }, [view])

  if (view.type === 'selector') {
    return <PatientSelector onSelect={handleSelectPatient} />
  }

  if (view.type === 'upload') {
    return (
      <DocumentUpload
        patientId={view.patient.id}
        patientName={view.patient.name}
        clinicalId={view.patient.clinical_id}
        preselectedCategory={view.category}
        onComplete={handleUploadComplete}
        onCancel={handleCancelUpload}
      />
    )
  }

  if (view.type === 'preview') {
    return (
      <>
        <FolderContents
          key={refreshKey}
          patientId={view.patient.id}
          patientName={view.patient.name}
          clinicalId={view.patient.clinical_id}
          categoryId={view.category}
          onBack={handleBackToFolders}
          onUpload={() => handleUpload(view.category)}
          onPreview={handlePreview}
        />
        <DocumentPreview
          document={view.doc}
          onClose={handleClosePreview}
        />
      </>
    )
  }

  if (view.type === 'contents') {
    return (
      <FolderContents
        key={refreshKey}
        patientId={view.patient.id}
        patientName={view.patient.name}
        clinicalId={view.patient.clinical_id}
        categoryId={view.category}
        onBack={handleBackToFolders}
        onUpload={() => handleUpload(view.category)}
        onPreview={handlePreview}
      />
    )
  }

  return (
    <PatientFolderView
      key={refreshKey}
      patient={view.patient}
      onOpenCategory={handleOpenCategory}
      onBack={handleBackToSelector}
      onUpload={() => handleUpload()}
    />
  )
}
