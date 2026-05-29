'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'

interface CellData {
  value: string
  formula?: string
  format?: 'text' | 'number' | 'currency' | 'date'
}

interface SheetData {
  headers: string[]
  rows: CellData[][]
}

export function SpreadsheetEditor() {
  const editingDocument = useDocumentStore((s) => s.editingDocument)
  const closeDocument = useDocumentStore((s) => s.closeDocument)

  const [sheetData, setSheetData] = useState<SheetData>({ headers: [], rows: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null)
  const [editValue, setEditValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const tableRef = useRef<HTMLTableElement>(null)

  // Load spreadsheet data from Google Sheets
  const loadSheetData = useCallback(async () => {
    if (!editingDocument) return

    setIsLoading(true)
    const tokens = localStorage.getItem('drive_tokens')
    if (!tokens) {
      setIsLoading(false)
      return
    }

    const { access_token, refresh_token } = JSON.parse(tokens)

    try {
      // Read the spreadsheet data
      const response = await fetch(
        `/api/drive/files?access_token=${access_token}&refresh_token=${refresh_token}&folder_id=${editingDocument.driveFileId}`
      )
      const data = await response.json()

      // For now, show a placeholder with the document info
      // In production, this would read actual spreadsheet data via Sheets API
      setSheetData({
        headers: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'],
        rows: Array(10).fill(null).map(() =>
          Array(5).fill(null).map(() => ({ value: '' }))
        ),
      })
    } catch (error) {
      console.error('Load sheet error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [editingDocument])

  useEffect(() => {
    loadSheetData()
  }, [loadSheetData])

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (isEditing && activeCell) {
      // Save current cell
      const newData = { ...sheetData }
      newData.rows[activeCell.row][activeCell.col] = { value: editValue }
      setSheetData(newData)
    }

    setActiveCell({ row, col })
    setEditValue(sheetData.rows[row]?.[col]?.value || '')
    setIsEditing(false)
  }

  // Handle cell double-click to start editing
  const handleCellDoubleClick = (row: number, col: number) => {
    setActiveCell({ row, col })
    setEditValue(sheetData.rows[row]?.[col]?.value || '')
    setIsEditing(true)
  }

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeCell) return

    if (isEditing) {
      if (e.key === 'Enter') {
        // Save and move down
        const newData = { ...sheetData }
        newData.rows[activeCell.row][activeCell.col] = { value: editValue }
        setSheetData(newData)
        setIsEditing(false)
        if (activeCell.row < sheetData.rows.length - 1) {
          setActiveCell({ row: activeCell.row + 1, col: activeCell.col })
          setEditValue(sheetData.rows[activeCell.row + 1]?.[activeCell.col]?.value || '')
        }
      } else if (e.key === 'Escape') {
        setIsEditing(false)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        // Save and move right
        const newData = { ...sheetData }
        newData.rows[activeCell.row][activeCell.col] = { value: editValue }
        setSheetData(newData)
        setIsEditing(false)
        if (activeCell.col < sheetData.headers.length - 1) {
          setActiveCell({ row: activeCell.row, col: activeCell.col + 1 })
          setEditValue(sheetData.rows[activeCell.row]?.[activeCell.col + 1]?.value || '')
        }
      }
    } else {
      // Navigation
      switch (e.key) {
        case 'ArrowUp':
          if (activeCell.row > 0) {
            setActiveCell({ row: activeCell.row - 1, col: activeCell.col })
            setEditValue(sheetData.rows[activeCell.row - 1]?.[activeCell.col]?.value || '')
          }
          break
        case 'ArrowDown':
          if (activeCell.row < sheetData.rows.length - 1) {
            setActiveCell({ row: activeCell.row + 1, col: activeCell.col })
            setEditValue(sheetData.rows[activeCell.row + 1]?.[activeCell.col]?.value || '')
          }
          break
        case 'ArrowLeft':
          if (activeCell.col > 0) {
            setActiveCell({ row: activeCell.row, col: activeCell.col - 1 })
            setEditValue(sheetData.rows[activeCell.row]?.[activeCell.col - 1]?.value || '')
          }
          break
        case 'ArrowRight':
          if (activeCell.col < sheetData.headers.length - 1) {
            setActiveCell({ row: activeCell.row, col: activeCell.col + 1 })
            setEditValue(sheetData.rows[activeCell.row]?.[activeCell.col + 1]?.value || '')
          }
          break
        case 'Enter':
        case 'F2':
          setIsEditing(true)
          break
        case 'Delete':
        case 'Backspace': {
          const newData = { ...sheetData }
          newData.rows[activeCell.row][activeCell.col] = { value: '' }
          setSheetData(newData)
          break
        }
        default:
          // Start typing
          if (e.key.length === 1) {
            setEditValue(e.key)
            setIsEditing(true)
          }
      }
    }
  }

  // Add new row
  const addRow = () => {
    setSheetData(prev => ({
      ...prev,
      rows: [...prev.rows, prev.headers.map(() => ({ value: '' }))],
    }))
  }

  // Add new column
  const addColumn = () => {
    setSheetData(prev => ({
      headers: [...prev.headers, `Column ${prev.headers.length + 1}`],
      rows: prev.rows.map(row => [...row, { value: '' }]),
    }))
  }

  if (!editingDocument) return null

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={closeDocument}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              title="Close editor"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{editingDocument.name}</h2>
              <p className="text-[10px] text-muted-foreground">Spreadsheet Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={addRow}
              className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              + Row
            </button>
            <button
              onClick={addColumn}
              className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              + Column
            </button>
            <a
              href={editingDocument.driveFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open in Drive
            </a>
          </div>
        </div>
      </div>

      {/* Spreadsheet */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div
          className="flex-1 overflow-auto"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <table ref={tableRef} className="w-full border-collapse">
            {/* Column headers */}
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="w-12 px-2 py-1.5 text-[10px] font-semibold text-muted-foreground bg-muted border border-border">
                  #
                </th>
                {sheetData.headers.map((header, colIdx) => (
                  <th
                    key={colIdx}
                    className="min-w-[120px] px-2 py-1.5 text-left text-xs font-semibold text-foreground bg-muted border border-border"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheetData.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="px-2 py-1 text-[10px] text-muted-foreground bg-muted/50 border border-border text-center">
                    {rowIdx + 1}
                  </td>
                  {row.map((cell, colIdx) => {
                    const isActive = activeCell?.row === rowIdx && activeCell?.col === colIdx
                    return (
                      <td
                        key={colIdx}
                        className={`border border-border px-2 py-1 text-sm cursor-cell ${
                          isActive ? 'ring-2 ring-primary ring-inset bg-primary/5' : 'hover:bg-muted/30'
                        }`}
                        onClick={() => handleCellClick(rowIdx, colIdx)}
                        onDoubleClick={() => handleCellDoubleClick(rowIdx, colIdx)}
                      >
                        {isActive && isEditing ? (
                          <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full h-full bg-transparent outline-none text-sm"
                            autoFocus
                          />
                        ) : (
                          <span className={cell.value ? 'text-foreground' : 'text-muted-foreground/30'}>
                            {cell.value || ''}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>
            {activeCell
              ? `Cell: ${String.fromCharCode(65 + activeCell.col)}${activeCell.row + 1}`
              : 'No cell selected'}
          </span>
          <span>{sheetData.rows.length} rows × {sheetData.headers.length} columns</span>
        </div>
      </div>
    </div>
  )
}
