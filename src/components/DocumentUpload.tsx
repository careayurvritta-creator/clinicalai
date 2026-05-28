'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Check, Loader2 } from 'lucide-react'
import { DOCUMENT_CATEGORIES, formatFileSize, getFileTypeLabel, type DocumentCategory } from '@/lib/constants'

interface DocumentUploadProps {
  patientId: string
  patientName: string
  clinicalId: string
  preselectedCategory?: DocumentCategory
  onComplete: () => void
  onCancel: () => void
}

interface QueuedFile {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

export function DocumentUpload({
  patientId,
  patientName,
  clinicalId,
  preselectedCategory,
  onComplete,
  onCancel,
}: DocumentUploadProps) {
  const [category, setCategory] = useState<DocumentCategory | ''>(preselectedCategory ?? '')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [files, setFiles] = useState<QueuedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({ file, status: 'pending' as const })),
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!category || files.length === 0) return

    setUploading(true)
    let completedCount = 0

    for (let i = 0; i < files.length; i++) {
      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f))
      )

      try {
        const formData = new FormData()
        formData.append('file', files[i].file)
        formData.append('patient_id', patientId)
        formData.append('category', category)
        if (tags) formData.append('tags', tags)
        if (notes) formData.append('notes', notes)

        const res = await fetch('/api/patient-documents', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error ?? 'Upload failed')
        }

        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done' } : f))
        )
        completedCount++
      } catch (err) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? { ...f, status: 'error', error: err instanceof Error ? err.message : 'Failed' }
              : f
          )
        )
      }
    }

    setUploading(false)
    if (completedCount > 0) {
      setTimeout(onComplete, 800)
    }
  }

  const allDone = files.length > 0 && files.every((f) => f.status === 'done')
  const canUpload = category && files.length > 0 && !uploading && !allDone

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Upload Documents</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clinicalId} — {patientName}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Category Selector */}
        <div>
          <label className="text-sm font-medium mb-1.5 block text-foreground">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            disabled={!!preselectedCategory}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            <option value="">Select category...</option>
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse — PDF, images, Excel, CSV, Word
          </p>
        </div>

        {/* File Queue */}
        {files.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </label>
            {files.map((qf, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-background"
              >
                <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate text-foreground">{qf.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getFileTypeLabel(qf.file.name)} · {formatFileSize(qf.file.size)}
                    {qf.error && (
                      <span className="text-destructive ml-2">{qf.error}</span>
                    )}
                  </p>
                </div>
                {qf.status === 'uploading' && (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                )}
                {qf.status === 'done' && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
                {qf.status === 'error' && (
                  <span className="text-xs text-destructive">Failed</span>
                )}
                {qf.status === 'pending' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 rounded hover:bg-accent"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-1.5 block text-foreground">
            Tags <span className="text-muted-foreground font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. blood test, follow-up, urgent"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-1.5 block text-foreground">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes about these documents..."
            rows={2}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 px-4 border border-border rounded-lg text-sm hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={!canUpload}
          className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : allDone ? (
            <>
              <Check className="w-4 h-4" />
              Done
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''}` : ''}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
