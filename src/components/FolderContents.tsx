'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft, Download, Trash2, Eye, FileText, Image as ImageIcon,
  FileSpreadsheet, Upload, SortAsc, SortDesc, X,
} from 'lucide-react'
import { DOCUMENT_CATEGORIES, getFileTypeLabel, formatFileSize } from '@/lib/constants'
import type { DocumentCategory } from '@/lib/constants'

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

interface FolderContentsProps {
  patientId: string
  patientName: string
  clinicalId: string
  categoryId: DocumentCategory
  onBack: () => void
  onUpload: () => void
  onPreview: (doc: PatientDocument) => void
}

function getFileIcon(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext ?? '')) return ImageIcon
  if (['xls', 'xlsx', 'csv'].includes(ext ?? '')) return FileSpreadsheet
  return FileText
}

export function FolderContents({
  patientId,
  patientName,
  clinicalId,
  categoryId,
  onBack,
  onUpload,
  onPreview,
}: FolderContentsProps) {
  const [documents, setDocuments] = useState<PatientDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const category = DOCUMENT_CATEGORIES.find((c) => c.slug === categoryId)

  const fetchDocs = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/patient-documents?patient_id=${patientId}&category=${categoryId}`
      )
      const data = await res.json()
      setDocuments(data.documents ?? [])
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [patientId, categoryId])

  const sortedDocs = [...documents].sort((a, b) => {
    const dateA = new Date(a.upload_date).getTime()
    const dateB = new Date(b.upload_date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  const handleDelete = async (docId: string) => {
    setDeleting(docId)
    try {
      await fetch(`/api/patient-documents/${docId}`, { method: 'DELETE' })
      setDocuments((prev) => prev.filter((d) => d.id !== docId))
      setDeleteConfirm(null)
    } catch {
      // silently fail
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = async (doc: PatientDocument) => {
    try {
      const res = await fetch(`/api/patient-documents/${doc.id}`)
      const data = await res.json()
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank')
      }
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {clinicalId} folders
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{category?.label ?? categoryId}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clinicalId} — {patientName} · {documents.length} file{documents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              title={`Sort ${sortOrder === 'newest' ? 'oldest first' : 'newest first'}`}
            >
              {sortOrder === 'newest' ? (
                <SortDesc className="w-4 h-4 text-muted-foreground" />
              ) : (
                <SortAsc className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={onUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : sortedDocs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No documents in this folder</p>
            <button
              onClick={onUpload}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedDocs.map((doc) => {
              const Icon = getFileIcon(doc.filename)
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.filename}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{getFileTypeLabel(doc.filename)}</span>
                      <span>·</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>·</span>
                      <span>
                        {new Date(doc.upload_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {doc.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onPreview(doc)}
                      className="p-1.5 rounded hover:bg-accent transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-1.5 rounded hover:bg-accent transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {deleteConfirm === doc.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={deleting === doc.id}
                          className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                        >
                          {deleting === doc.id ? '...' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="p-1 rounded hover:bg-accent"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(doc.id)}
                        className="p-1.5 rounded hover:bg-accent transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-destructive/70 hover:text-destructive" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
