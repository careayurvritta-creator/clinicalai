'use client'

import { useState } from 'react'
import { useChatStore } from '@/lib/store'
import { exportProtocolToPDF } from '@/lib/pdf-export'

export function CanvasToolbar() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  const clearMessages = useChatStore((state) => state.clearMessages)
  const [isExporting, setIsExporting] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(canvasContent)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = canvasContent
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  const handleDownloadPDF = async () => {
    setIsExporting(true)
    try {
      // Extract patient name from content if available
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

  const isProtocol = (
    canvasContent.includes('## Abstract') ||
    canvasContent.includes('## Keywords') ||
    canvasContent.includes('## Case Summary') ||
    canvasContent.includes('## Case Presentation') ||
    canvasContent.includes('## Diagnostic Assessment') ||
    canvasContent.includes('## Treatment Protocol') ||
    canvasContent.includes('## Samprapti') ||
    canvasContent.includes('## Detailed Treatment') ||
    canvasContent.includes('## Pharmacotherapy') ||
    canvasContent.includes('## Literature Review') ||
    canvasContent.includes('## Conclusion')
  ) && canvasContent.length > 500

  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-panel-canvas">
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        title="Copy to clipboard"
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
          title="Download as PDF"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isExporting ? 'Generating PDF...' : 'Download PDF'}
        </button>
      )}

      <div className="flex-1" />

      <button
        onClick={clearMessages}
        aria-label="Clear all messages"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        title="Clear all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Clear
      </button>
    </div>
  )
}
