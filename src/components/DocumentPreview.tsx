'use client'

import { useState, useEffect } from 'react'
import { X, Download, ExternalLink, Loader2 } from 'lucide-react'
import { getFileTypeLabel, formatFileSize } from '@/lib/constants'

interface PatientDocument {
  id: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

interface DocumentPreviewProps {
  document: PatientDocument
  onClose: () => void
}

export function DocumentPreview({ document: doc, onClose }: DocumentPreviewProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch(`/api/patient-documents/${doc.id}`)
        const data = await res.json()
        if (data.signedUrl) {
          setSignedUrl(data.signedUrl)
        } else {
          setError('Could not generate preview URL')
        }
      } catch {
        setError('Failed to load document')
      } finally {
        setLoading(false)
      }
    }
    fetchUrl()
  }, [doc.id])

  const ext = doc.filename.split('.').pop()?.toLowerCase() ?? ''
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
  const isPdf = ext === 'pdf'

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate">{doc.filename}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getFileTypeLabel(doc.filename)} · {formatFileSize(doc.file_size)} ·{' '}
              {new Date(doc.upload_date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {signedUrl && (
              <>
                <a
                  href={signedUrl}
                  download={doc.filename}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">{error}</p>
              {signedUrl && (
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:underline inline-block"
                >
                  Try opening in new tab
                </a>
              )}
            </div>
          ) : isImage && signedUrl ? (
            <div className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={signedUrl}
                alt={doc.filename}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          ) : isPdf && signedUrl ? (
            <iframe
              src={signedUrl}
              className="w-full h-[70vh] rounded-lg border border-border"
              title={doc.filename}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Preview not available for this file type</p>
              {signedUrl && (
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:underline inline-block"
                >
                  Download to view
                </a>
              )}
            </div>
          )}
        </div>

        {/* Notes */}
        {doc.notes && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Notes:</span> {doc.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
