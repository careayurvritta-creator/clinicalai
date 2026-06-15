'use client'

import { useMemo, useState } from 'react'

export type ExplorerFile = {
  id: string
  title: string
  content: string
}

function normalizeHeadingToFileName(heading: string) {
  return heading
    .trim()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase()
}

function parseFilesFromCanvasContent(canvasContent: string): ExplorerFile[] {
  const trimmed = canvasContent.trim()
  if (!trimmed) return []

  // Split protocol-style markdown into section files using "## " headings.
  const sectionRegex = /^##\s+(.+)$/gm
  const matches = [...trimmed.matchAll(sectionRegex)]

  if (matches.length > 0) {
    const files: ExplorerFile[] = []
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i]
      const heading = (match[1] || '').trim()
      const start = match.index! + match[0].length
      const end = i + 1 < matches.length ? matches[i + 1].index! : trimmed.length
      const content = trimmed.slice(start, end).trim()
      if (!content) continue

      files.push({
        id: normalizeHeadingToFileName(heading) || `section-${i + 1}`,
        title: heading,
        content,
      })
    }
    return files.length ? files : [{ id: 'output', title: 'Output', content: trimmed }]
  }

  return [{ id: 'output', title: 'Output', content: trimmed }]
}

async function downloadTextAsFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function downloadTextAsPDF(fileNameBase: string, content: string) {
  const html2pdf = (await import('html2pdf.js')).default

  // Minimal printable HTML document for just this “file”
  const wrapper = document.createElement('div')
  wrapper.style.cssText = `
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: #1a1a1a;
    background: #ffffff;
    padding: 18px 22px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
  `
  wrapper.innerText = content

  const filename = `${fileNameBase}.pdf`
  const opt: Record<string, unknown> = {
    margin: [10, 10, 15, 10],
    filename,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  }

  await html2pdf().set(opt).from(wrapper).save()
}

export function OutputFileExplorer({
  canvasContent,
  openedFileId,
  onOpenFile,
}: {
  canvasContent: string
  openedFileId: string | null
  onOpenFile: (file: ExplorerFile) => void
}) {
  const [busyFileId, setBusyFileId] = useState<string | null>(null)

  const files = useMemo(() => parseFilesFromCanvasContent(canvasContent), [canvasContent])

  if (!files.length) return null

  return (
    <div className="mt-4 rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-2 bg-panel-chat flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">Files</span>
          <span className="text-[10px] text-muted-foreground">{files.length}</span>
        </div>
        <span className="text-[10px] text-muted-foreground/80">Download as .txt or .pdf</span>
      </div>

      <div className="max-h-[260px] overflow-y-auto">
        {files.map((f) => {
          const base = normalizeHeadingToFileName(f.title) || f.id
          const isOpened = openedFileId === f.id

          return (
            <div
              key={f.id}
              className="px-3 py-2 flex items-start justify-between gap-3 border-b border-border/40 last:border-b-0"
            >
              <button
                type="button"
                className="min-w-0 text-left flex-1"
                onClick={() => onOpenFile(f)}
                aria-label={`Open ${f.title}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isOpened ? 'bg-primary' : 'bg-muted-foreground/40'
                    }`}
                  />
                  <div className="text-xs font-medium truncate">{f.title}</div>
                </div>
                <div className="text-[10px] text-muted-foreground/70 break-words mt-0.5">
                  {Math.max(0, f.content.length)} chars
                </div>
              </button>

              <div className="flex gap-2 flex-shrink-0 pl-2">
                <button
                  className="px-2 py-1 text-[11px] rounded bg-muted hover:bg-muted/70 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={busyFileId === f.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadTextAsFile(`${base}.txt`, f.content)
                  }}
                >
                  {busyFileId === f.id ? '...' : 'TXT'}
                </button>
                <button
                  className="px-2 py-1 text-[11px] rounded bg-primary/10 hover:bg-primary/20 text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={busyFileId === f.id}
                  onClick={async (e) => {
                    e.stopPropagation()
                    setBusyFileId(f.id)
                    try {
                      await downloadTextAsPDF(base, f.content)
                    } finally {
                      setBusyFileId(null)
                    }
                  }}
                >
                  {busyFileId === f.id ? '...' : 'PDF'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
