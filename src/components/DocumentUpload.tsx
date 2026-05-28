'use client'

import { useState, useCallback } from 'react'
import { Upload, X, FileText, Image, Table, Check, AlertCircle } from 'lucide-react'
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_FILE_TYPES, MAX_FILE_SIZE, formatFileSize, DOCUMENT_CATEGORIES } from '@/lib/constants'
import type { DocumentCategory } from '@/lib/constants'

interface DocumentUploadProps {
  patientId: string
  defaultCategory?: DocumentCategory
  onComplete: () => void
  onCancel: () => void
}

interface UploadFile {
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

function getIcon(file: File) {
  if (file.type.startsWith('image/')) return Image
  if (file.type.includes('spreadsheet') || file.type.includes('excel') || file.type === 'text/csv') return Table
  return FileText
}

export function DocumentUpload({ patientId, defaultCategory, onComplete, onCancel }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [category, setCategory] = useState<DocumentCategory | ''>(defaultCategory || '')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files).filter(f => {
      const ext = '.' + f.name.split('.').pop()?.toLowerCase()
      return ALLOWED_FILE_TYPES.includes(f.type as typeof ALLOWED_FILE_TYPES[number]) || ALLOWED_FILE_EXTENSIONS.includes(ext as typeof ALLOWED_FILE_EXTENSIONS[number])
    })
    setFiles(prev => [...prev, ...dropped.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending' as const,
    }))])
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending' as const,
    }))])
  }, [])

  const removeFile = (index: number) => {
    setFiles(prev => {
      const removed = prev[index]
      if (removed.preview) URL.revokeObjectURL(removed.preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleUpload = async () => {
    if (!category || files.length === 0) return
    setUploading(true)

    const updated = [...files]
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status !== 'pending') continue
      updated[i] = { ...updated[i], status: 'uploading' }
      setFiles([...updated])

      try {
        const formData = new FormData()
        formData.append('file', updated[i].file)
        formData.append('patient_id', patientId)
        formData.append('category', category)
        if (tags) formData.append('tags', tags)
        if (notes) formData.append('notes', notes)

        const res = await fetch('/api/patient-documents', { method: 'POST', body: formData })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Upload failed')
        }
        updated[i] = { ...updated[i], status: 'done' }
      } catch (err) {
        updated[i] = { ...updated[i], status: 'error', error: err instanceof Error ? err.message : 'Upload failed' }
      }
      setFiles([...updated])
    }

    setUploading(false)
    const allDone = updated.every(f => f.status === 'done')
    if (allDone) {
      setTimeout(onComplete, 500)
    }
  }

  const hasFiles = files.length > 0
  const allValid = category && files.some(f => f.status === 'pending' || f.status === 'done')

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upload Documents</h2>
          <button onClick={onCancel} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category...</option>
            {DOCUMENT_CATEGORIES.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Drop files here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, Images, Excel, CSV · Max 50MB each</p>
          <input id="file-input" type="file" multiple accept={ALLOWED_FILE_EXTENSIONS.join(',')} onChange={handleFileInput} className="hidden" />
        </div>

        {/* File List */}
        {hasFiles && (
          <div className="space-y-2">
            {files.map((uf, i) => {
              const Icon = getIcon(uf.file)
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {uf.preview ? (
                    <img src={uf.preview} alt="" className="w-9 h-9 rounded object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                      <Icon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{uf.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(uf.file.size)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {uf.status === 'uploading' && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />}
                    {uf.status === 'done' && <Check className="w-4 h-4 text-green-500" />}
                    {uf.status === 'error' && <span className="text-xs text-red-500" title={uf.error}><AlertCircle className="w-4 h-4" /></span>}
                    {uf.status === 'pending' && (
                      <button onClick={() => removeFile(i)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. urgent, follow-up, cghs" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Optional notes about these documents..." className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button onClick={handleUpload} disabled={!allValid || uploading} className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors">
          {uploading ? 'Uploading...' : `Upload ${files.filter(f => f.status === 'pending').length} file${files.filter(f => f.status === 'pending').length !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  )
}
