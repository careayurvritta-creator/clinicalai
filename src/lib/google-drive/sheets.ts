// Google Sheets Operations — Create and manage spreadsheet documents

import type { sheets_v4 } from 'googleapis'
import type { DocumentTemplate } from '../types'

// ─── Create Spreadsheet from Template ──────────────────────

export async function createSpreadsheet(
  sheets: sheets_v4.Sheets,
  title: string,
  folderId: string,
  template: DocumentTemplate,
  data?: Record<string, unknown>
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  // Create the spreadsheet
  const createRes = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title },
      sheets: template.sections.map((section) => ({
        properties: {
          title: section.title.substring(0, 31), // Max 31 chars for sheet name
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      })),
    },
  })

  const spreadsheetId = createRes.data.spreadsheetId!
  const spreadsheetUrl = createRes.data.spreadsheetUrl!

  // Write headers and data for each section
  for (let i = 0; i < template.sections.length; i++) {
    const section = template.sections[i]
    const sheetId = createRes.data.sheets?.[i]?.properties?.sheetId

    if (sheetId === undefined) continue

    // Prepare header row
    const headers = section.fields.map((f) => f.label)

    // Prepare data row(s) if data provided
    const rows: unknown[][] = [headers]
    if (data) {
      const dataRow = section.fields.map((f) => {
        const value = data[f.name]
        if (value === undefined || value === null) return f.defaultValue ?? ''
        return value
      })
      rows.push(dataRow)
    }

    // Write data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${section.title.substring(0, 31)}'!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rows },
    })

    // Format header row (bold, background color)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.9, green: 0.9, blue: 0.9 },
                  textFormat: { bold: true },
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat)',
            },
          },
          // Auto-resize columns
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: headers.length,
              },
            },
          },
        ],
      },
    })
  }

  return { spreadsheetId, spreadsheetUrl }
}

// ─── Append Rows to Spreadsheet ──────────────────────────

export async function appendRows(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  rows: unknown[][]
): Promise<void> {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetName}'!A:A`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: rows },
  })
}

// ─── Read Spreadsheet Data ──────────────────────────────

export async function readSheet(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string
): Promise<unknown[][]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetName}'`,
  })

  return res.data.values ?? []
}

// ─── Update Cell ──────────────────────────────────────────

export async function updateCell(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
  row: number,
  col: number,
  value: unknown
): Promise<void> {
  const colLetter = String.fromCharCode(65 + col) // A, B, C, etc.
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${sheetName}'!${colLetter}${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[value]] },
  })
}

// ─── Helper: Column letter from index ──────────────────────

export function colLetter(index: number): string {
  let result = ''
  let n = index
  while (n >= 0) {
    result = String.fromCharCode(65 + (n % 26)) + result
    n = Math.floor(n / 26) - 1
  }
  return result
}
