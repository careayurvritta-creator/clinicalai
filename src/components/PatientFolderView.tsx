'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, User, Upload } from 'lucide-react'
import { DOCUMENT_CATEGORIES, type DocumentCategory } from '@/lib/constants'

interface Patient {
  id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  clinical_id: string | null
}

interface PatientFolderViewProps {
  patientId: string
  onOpenCategory: (category: DocumentCategory) => void
  onBack: () => void
  onUpload: (category?: DocumentCategory) => void
}

export function PatientFolderView({ patientId, onOpenCategory, onBack, onUpload }: PatientFolderViewProps) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [patientRes, docsRes] = await Promise.all([
          fetch(`/api/patients/search?q=${patientId}`),
          fetch(`/api/patient-documents?patient_id=${patientId}`),
        ])
        const patientData = await patientRes.json()
        const docsData = await docsRes.json()
        setPatient(patientData.patients?.find((p: Patient) => p.id === patientId) || null)
        setCounts(docsData.counts || {})
      } catch {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [patientId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p>Patient not found</p>
        <button onClick={onBack} className="mt-2 text-blue-500 hover:underline text-sm">Go back</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> All Patients
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
            {patient.clinical_id?.slice(-3) || '?'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">{patient.name}</h2>
              {patient.clinical_id && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono">
                  {patient.clinical_id}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {[patient.age && `${patient.age} years`, patient.gender, patient.phone].filter(Boolean).join(' · ')}
            </p>
          </div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {DOCUMENT_CATEGORIES.map((cat) => {
            const count = counts[cat.slug] || 0
            return (
              <button
                key={cat.slug}
                onClick={() => onOpenCategory(cat.slug as DocumentCategory)}
                className="text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-gray-400 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400 transition-colors text-2xl">
                    {cat.icon}
                  </div>
                  {count > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {count}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                  {cat.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Upload FAB */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onUpload()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
        >
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>
    </div>
  )
}
