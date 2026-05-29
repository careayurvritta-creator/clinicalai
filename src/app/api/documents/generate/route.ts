// Document Generation API — Generate documents from templates
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getTemplate } from '@/lib/templates'
import { getDriveClients } from '@/lib/google-drive/client'
import { getOrCreateRootFolder, getOrCreatePatientFolder } from '@/lib/google-drive/folders'
import { createSpreadsheet } from '@/lib/google-drive/sheets'
import { createDocument } from '@/lib/google-drive/docs'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

const requestSchema = z.object({
  templateId: z.string(),
  patientName: z.string(),
  clinicalId: z.string(),
  data: z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = requestSchema.parse(body)

    const template = getTemplate(parsed.templateId)
    if (!template) {
      return NextResponse.json(
        { error: `Template not found: ${parsed.templateId}` },
        { status: 404 }
      )
    }

    const { drive, sheets, docs } = getDriveClients('service-account')

    // Get or create patient folder structure
    const rootFolderId = await getOrCreateRootFolder(drive)
    const { categoryFolders } = await getOrCreatePatientFolder(
      drive,
      rootFolderId,
      parsed.patientName,
      parsed.clinicalId
    )

    // Find the category folder — map template category ID to folder name
    const categoryFolderId = Object.entries(categoryFolders).find(
      ([folderName]) => {
        // Folder names are like '01-OPD-Registers', categories are like 'opd-registers'
        const normalized = folderName.toLowerCase().replace(/^\d+-/, '').replace(/\s+/g, '-')
        return normalized === template.category
      }
    )?.[1]

    if (!categoryFolderId) {
      return NextResponse.json(
        { error: `Category folder not found: ${template.category}` },
        { status: 500 }
      )
    }

    const title = `${parsed.patientName} — ${template.name} — ${new Date().toISOString().split('T')[0]}`

    let result: { id: string; url: string }

    if (template.format === 'spreadsheet') {
      const res = await createSpreadsheet(sheets, title, categoryFolderId, template, parsed.data as Record<string, unknown> | undefined)
      result = { id: res.spreadsheetId, url: res.spreadsheetUrl }
    } else {
      const res = await createDocument(docs, title, template, parsed.data as Record<string, unknown> | undefined)
      result = { id: res.documentId, url: res.documentUrl }
    }

    return NextResponse.json({
      success: true,
      document: {
        id: result.id,
        url: result.url,
        templateId: template.id,
        format: template.format,
        category: template.category,
        title,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Document generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    )
  }
}
