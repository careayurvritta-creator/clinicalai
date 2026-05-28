'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, FileText, Image, Table, Download, Trash2, Search, SortAsc, SortDesc, Upload, X } from 'lucide-react'
import { formatFileSize } from '@/lib/constants'
import type { DocumentCategory } from '@/lib/constants'

interface Document {
  id: string
  filename: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

interface FolderContentsProps {
  patientId: string
  category: DocumentCategory
  categoryLabel: string
  onBack: () => void
  onUpload: () => void
}

const FILE_ICONS: Record<string, typeof FileText> = {
  'application/pdf': FileText,
  'image/jpeg': Image,
  'image/png': Image,
  'image/webp': Image,
  'application/vnd.ms-excel': Table,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': Table,
  'text/csv': Table,
}

export function FolderContents({ patientId, category, categoryLabel, onBack, onUpload }: FolderContentsProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchDocs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/patient-documents?patient_id=${patientId}&category=${category}`)
      const data = await res.json()
      setDocuments(data.documents || [])
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [patientId, category])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this document?')) return
    setDeleting(id)
    try {
      await fetch(`/api/patient-documents/${id}`, { method: 'DELETE' })
      setDocuments(prev => prev.filter(d => d.id !== id))
    } catch {
      // ignore
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = async (doc: Document) => {
    try {
      const res = await fetch(`/api/patient-documents/${doc.id}`)
      const data = await res.json()
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank')
      }
    } catch {
      // ignore
    }
  }

  const filtered = documents
    .filter(d => !searchQuery || d.filename.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      return new Date(a.upload_date).getTime() - new Date(b.upload_date).getTime()
    })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Folders
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{categoryLabel}</h2>

        {/* Search + Sort */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setSortOrder(s => s === 'newest' ? 'oldest' : 'newest')}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title={`Sort: ${sortOrder}`}
          >
            {sortOrder === 'newest' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">{searchQuery ? 'No files match your search' : 'No documents yet'}</p>
            <button onClick={onUpload} className="mt-3 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400">
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((doc) => {
              const Icon = FILE_ICONS[doc.file_type] || FileText
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{doc.filename}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(doc.file_size)} · {new Date(doc.upload_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {doc.tags.length > 0 && ` · ${doc.tags.join(', ')}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleDownload(doc)} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} disabled={deleting === doc.id} className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button onClick={onUpload} className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors">
          Upload to {categoryLabel}
        </button>
      </div>
    </div>
  )
}
