'use client'

import { useState, useEffect, useRef } from 'react'
import { exportProtocolToPDF } from '@/lib/pdf-export'

const PROTOCOL_MARKERS = [
  '## Abstract', '## Keywords', '## Case Summary', '## Case Presentation',
  '## Diagnostic Assessment', '## Treatment Protocol', '## Ayurvedic Pathogenesis',
  '## Samprapti', '## Detailed Treatment', '## Pharmacotherapy',
  '## Literature Review', '## Conclusion',
]

function checkIsProtocol(content: string): boolean {
  return content.length > 500 && PROTOCOL_MARKERS.some(m => content.includes(m))
}

interface CanvasToolbarProps {
  canvasContent: string
  onClear?: () => void
}

export function CanvasToolbar({ canvasContent, onClear }: CanvasToolbarProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(canvasContent)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = canvasContent
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  const handleDownloadPDF = async () => {
    setIsExporting(true)
    try {
      const nameMatch = canvasContent.match(/\*\*Name:\*\*\s*(.+)/i)
      const diagMatch = canvasContent.match(/\*\*Diagnosis:\*\*\s*(.+)/i)
      const patientName = nameMatch?.[1]?.trim() || 'Patient'
      const diagnosis = diagMatch?.[1]?.trim() || ''
      await exportProtocolToPDF(patientName, diagnosis)
    } catch (error) {
      console.error('PDF export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleClear = () => {
    if (showClearConfirm) {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      onClear?.()
      setShowClearConfirm(false)
    } else {
      setShowClearConfirm(true)
      clearTimerRef.current = setTimeout(() => setShowClearConfirm(false), 4000)
    }
  }

  const isProtocol = checkIsProtocol(canvasContent)

  return (
    <div className="flex items-center gap-2 px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))] border-t border-border bg-panel-canvas">
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy
      </button>

      {isProtocol && (
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          aria-label="Download as PDF"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary hover:bg-primary/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isExporting ? 'Generating PDF...' : 'Download PDF'}
        </button>
      )}

      <div className="flex-1" />

      <button
        onClick={handleClear}
        aria-label={showClearConfirm ? 'Confirm clear all messages' : 'Clear all messages'}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          showClearConfirm
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'text-red-400 hover:text-red-300 hover:bg-red-400/10'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {showClearConfirm ? 'Confirm Clear' : 'Clear'}
      </button>
    </div>
  )
}
