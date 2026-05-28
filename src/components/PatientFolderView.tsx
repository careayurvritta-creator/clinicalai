'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, Phone, FileText } from 'lucide-react'
import { DOCUMENT_CATEGORIES } from '@/lib/constants'
import {
  FlaskConical, ClipboardList, BedDouble, BookOpen, BookOpenCheck,
  Leaf, Receipt, Award, Pill, ClipboardCheck,
} from 'lucide-react'
import type { DocumentCategory } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  FlaskConical, ClipboardList, BedDouble, BookOpen, BookOpenCheck,
  Leaf, Receipt, Award, Pill, ClipboardCheck,
}

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientFolderViewProps {
  patient: PatientInfo
  onOpenCategory: (category: DocumentCategory) => void
  onBack: () => void
  onUpload: (category?: DocumentCategory) => void
}

export function PatientFolderView({
  patient,
  onOpenCategory,
  onBack,
  onUpload,
}: PatientFolderViewProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch(`/api/patient-documents?patient_id=${patient.id}`)
        const data = await res.json()
        setCounts(data.counts ?? {})
      } catch {
        setCounts({})
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [patient.id])

  const totalDocs = Object.values(counts).reduce((sum, c) => sum + c, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to patients
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {patient.clinical_id?.slice(-3)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">{patient.name}</h2>
              <span className="text-xs px-2 py-0.5 bg-muted rounded font-mono text-muted-foreground">
                {patient.clinical_id}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
              {patient.age && <span>{patient.age} years</span>}
              {patient.gender && <span>{patient.gender}</span>}
              {patient.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {patient.phone}
                </span>
              )}
              <span className="text-xs">{totalDocs} document{totalDocs !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {DOCUMENT_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? FileText
              const count = counts[cat.slug] ?? 0
              return (
                <button
                  key={cat.slug}
                  onClick={() => onOpenCategory(cat.slug as DocumentCategory)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:bg-accent hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium leading-tight">{cat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {count} file{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Upload */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => onUpload()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>
    </div>
  )
}
