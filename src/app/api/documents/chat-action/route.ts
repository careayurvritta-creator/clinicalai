// Document Chat Action API — Central orchestrator for all AI chatbot actions
// Handles patient CRUD, document generation, Drive file/folder operations
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { generateUHID } from '@/lib/uhid'
import { resolveAutoFill } from '@/lib/auto-fill'
import { getTemplate, TEMPLATE_MAP } from '@/lib/templates'
import { getDriveClients } from '@/lib/google-drive/client'
import { getOrCreateRootFolder, getOrCreatePatientFolder } from '@/lib/google-drive/folders'
import { listFilesInFolder } from '@/lib/google-drive/folders'
import { listFiles, deleteFile, renameFile, moveFile, searchFiles } from '@/lib/google-drive/files'
import { createSpreadsheet, readSheet } from '@/lib/google-drive/sheets'
import { createDocument, readDocument } from '@/lib/google-drive/docs'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

// ─── Allowed fields for patient updates (security whitelist) ────────
const ALLOWED_UPDATE_FIELDS = new Set([
  'name', 'age', 'gender', 'phone', 'email', 'address', 'occupation',
  'area', 'blood_group', 'height_cm', 'weight_kg', 'date_of_birth',
  'emergency_contact', 'emergency_phone', 'allergies', 'medical_history',
  'current_medications', 'notes', 'bmi', 'abha_id', 'prakriti', 'vikriti',
])

// ─── Action Schemas ──────────────────────────────────────────

const createActionSchema = z.object({
  action: z.literal('create_patient'),
  name: z.string().min(1),
  age: z.number().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  occupation: z.string().optional(),
  email: z.string().optional(),
  area: z.string().optional(),
  blood_group: z.string().optional(),
  height_cm: z.number().optional(),
  weight_kg: z.number().optional(),
  date_of_birth: z.string().optional(),
  uhid: z.string().optional(),
})

const updateActionSchema = z.object({
  action: z.literal('update_patient'),
  patientId: z.string().uuid(),
  updates: z.record(z.string(), z.unknown()),
})

const generateOpdSchema = z.object({
  action: z.literal('generate_opd_entry'),
  patientId: z.string().uuid(),
  data: z.record(z.string(), z.unknown()),
})

const searchActionSchema = z.object({
  action: z.literal('search_patients'),
  query: z.string().min(1),
})

const getPatientActionSchema = z.object({
  action: z.literal('get_patient'),
  patientId: z.string().uuid(),
})

const generateDocumentSchema = z.object({
  action: z.literal('generate_document'),
  patientId: z.string().uuid(),
  templateId: z.string().min(1),
  data: z.record(z.string(), z.unknown()).optional(),
})

const generateBulkSchema = z.object({
  action: z.literal('generate_bulk'),
  patientId: z.string().uuid(),
  documents: z.array(z.object({
    templateId: z.string().min(1),
    data: z.record(z.string(), z.unknown()).optional(),
  })).min(1),
})

const listFilesSchema = z.object({
  action: z.literal('list_files'),
  folderId: z.string().min(1),
})

const searchFilesSchema = z.object({
  action: z.literal('search_files'),
  query: z.string().min(1),
  rootFolderId: z.string().optional(),
})

const readDocumentSchema = z.object({
  action: z.literal('read_document'),
  fileId: z.string().min(1),
  mimeType: z.string().min(1),
})

const navigateToSchema = z.object({
  action: z.literal('navigate_to'),
  folderId: z.string().min(1),
})

const deleteFileSchema = z.object({
  action: z.literal('delete_file'),
  fileId: z.string().min(1),
  confirmation: z.literal(true),
})

const renameFileSchema = z.object({
  action: z.literal('rename_file'),
  fileId: z.string().min(1),
  newName: z.string().min(1),
})

const moveFileSchema = z.object({
  action: z.literal('move_file'),
  fileId: z.string().min(1),
  newParentFolderId: z.string().min(1),
})

const getTemplateSchema = z.object({
  action: z.literal('get_template_schema'),
  templateId: z.string().min(1),
})

const createFolderSchema = z.object({
  action: z.literal('create_folder'),
  parentFolderId: z.string().min(1),
  name: z.string().min(1),
})

const renameFolderSchema = z.object({
  action: z.literal('rename_folder'),
  folderId: z.string().min(1),
  newName: z.string().min(1),
})

const deleteFolderSchema = z.object({
  action: z.literal('delete_folder'),
  folderId: z.string().min(1),
  confirmation: z.literal(true),
})

const listFoldersSchema = z.object({
  action: z.literal('list_folders'),
  parentFolderId: z.string().min(1),
})

const getRootFolderSchema = z.object({
  action: z.literal('get_root_folder'),
})

// ─── Discriminated Union ──────────────────────────────────────

const requestSchema = z.discriminatedUnion('action', [
  createActionSchema,
  updateActionSchema,
  generateOpdSchema,
  searchActionSchema,
  getPatientActionSchema,
  generateDocumentSchema,
  generateBulkSchema,
  listFilesSchema,
  searchFilesSchema,
  readDocumentSchema,
  navigateToSchema,
  deleteFileSchema,
  renameFileSchema,
  moveFileSchema,
  getTemplateSchema,
  createFolderSchema,
  renameFolderSchema,
  deleteFolderSchema,
  listFoldersSchema,
  getRootFolderSchema,
])

// ─── Route Handler ──────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = requestSchema.parse(body)
    const supabase = createServerClient()

    switch (parsed.action) {
      // Patient actions
      case 'create_patient':
        return handleCreatePatient(supabase, parsed)
      case 'update_patient':
        return handleUpdatePatient(supabase, parsed)
      case 'search_patients':
        return handleSearchPatients(supabase, parsed)
      case 'get_patient':
        return handleGetPatient(supabase, parsed)

      // Document generation actions
      case 'generate_opd_entry':
        return handleGenerateOpdEntry(supabase, parsed)
      case 'generate_document':
        return handleGenerateDocument(supabase, parsed)
      case 'generate_bulk':
        return handleGenerateBulk(supabase, parsed)
      case 'get_template_schema':
        return handleGetTemplateSchema(parsed)

      // Drive file actions
      case 'list_files':
        return handleListFiles(parsed)
      case 'search_files':
        return handleSearchFiles(parsed)
      case 'read_document':
        return handleReadDocument(parsed)
      case 'navigate_to':
        return handleNavigateTo(parsed)
      case 'delete_file':
        return handleDeleteFile(parsed)
      case 'rename_file':
        return handleRenameFile(parsed)
      case 'move_file':
        return handleMoveFile(parsed)

      // Drive folder actions
      case 'create_folder':
        return handleCreateFolder(parsed)
      case 'rename_folder':
        return handleRenameFolder(parsed)
      case 'delete_folder':
        return handleDeleteFolder(parsed)
      case 'list_folders':
        return handleListFolders(parsed)

      case 'get_root_folder':
        return handleGetRootFolder()

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Chat Action] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ══════════════════════════════════════════════════════════════
// Patient Handlers (existing)
// ══════════════════════════════════════════════════════════════

async function handleCreatePatient(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof createActionSchema>
) {
  // Generate IDs
  const patientCode = `PAT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`
  const uhid = data.uhid || await generateUHID()

  // Calculate BMI
  let bmi: number | undefined
  if (data.height_cm && data.weight_kg) {
    const heightM = data.height_cm / 100
    bmi = Math.round((data.weight_kg / (heightM * heightM)) * 10) / 10
  }

  // Insert into Supabase
  const { data: patient, error } = await supabase
    .from('patients')
    .insert({
      name: data.name,
      age: data.age ?? null,
      gender: data.gender ?? null,
      phone: data.phone ?? null,
      email: data.email ?? null,
      address: data.address ?? null,
      occupation: data.occupation ?? null,
      area: data.area ?? null,
      blood_group: data.blood_group ?? null,
      height_cm: data.height_cm ?? null,
      weight_kg: data.weight_kg ?? null,
      date_of_birth: data.date_of_birth ?? null,
      patient_code: patientCode,
      uhid,
      ...(bmi !== undefined && { bmi }),
    })
    .select()
    .single()

  if (error) {
    console.error('[Chat Action] Patient insert error:', error.message)
    return NextResponse.json({ error: 'Failed to create patient', details: error.message }, { status: 500 })
  }

  // Create Drive folder and link to patient
  let driveFolder: { folderId: string; categoryFolders: Record<string, string> } | null = null
  try {
    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    driveFolder = await getOrCreatePatientFolder(drive, rootFolderId, data.name, uhid)

    // Save the Drive link so the patient can be found from the sidebar
    await supabase.from('patient_drive_links').upsert({
      patient_id: patient.id,
      drive_folder_id: driveFolder.folderId,
      clinical_id: uhid,
    }, { onConflict: 'patient_id' })
  } catch (driveError) {
    console.error('[Chat Action] Drive folder creation error:', driveError)
    // Continue — patient is created in Supabase even if Drive fails
  }

  return NextResponse.json({
    success: true,
    patient,
    driveFolder: driveFolder ? { folderId: driveFolder.folderId } : null,
  })
}

async function handleUpdatePatient(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof updateActionSchema>
) {
  // Whitelist fields to prevent overwriting system columns
  const safeUpdates: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data.updates)) {
    if (ALLOWED_UPDATE_FIELDS.has(key)) {
      safeUpdates[key] = value
    }
  }

  if (Object.keys(safeUpdates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data: patient, error } = await supabase
    .from('patients')
    .update(safeUpdates)
    .eq('id', data.patientId)
    .select()
    .single()

  if (error) {
    console.error('[Chat Action] Patient update error:', error.message)
    return NextResponse.json({ error: 'Failed to update patient', details: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, patient })
}

async function handleSearchPatients(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof searchActionSchema>
) {
  const { data: patients, error } = await supabase
    .from('patients')
    .select('id, name, uhid, age, gender, phone, patient_code')
    .or(`name.ilike.%${data.query}%,uhid.ilike.%${data.query}%,phone.ilike.%${data.query}%`)
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  return NextResponse.json({ patients: patients || [] })
}

async function handleGetPatient(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof getPatientActionSchema>
) {
  const { data: patient, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', data.patientId)
    .single()

  if (error || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  return NextResponse.json({ patient })
}

// ══════════════════════════════════════════════════════════════
// Document Generation Handlers
// ══════════════════════════════════════════════════════════════

async function handleGenerateOpdEntry(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof generateOpdSchema>
) {
  // Fetch patient record for auto-fill
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('*')
    .eq('id', data.patientId)
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  // Resolve auto-fill from template
  const template = getTemplate('opd-visit-register')
  if (!template) {
    return NextResponse.json({ error: 'OPD register template not found' }, { status: 500 })
  }

  const resolvedData = resolveAutoFill(template, patient, data.data as Record<string, unknown>)

  // Create the Drive folder for this patient
  const { drive, sheets } = getDriveClients('service-account')
  const rootFolderId = await getOrCreateRootFolder(drive)
  const { categoryFolders } = await getOrCreatePatientFolder(
    drive, rootFolderId, patient.name, patient.uhid || patient.patient_code
  )

  // Find the OPD Registers category folder
  const categoryFolderId = Object.entries(categoryFolders).find(
    ([folderName]) => {
      const normalized = folderName.toLowerCase().replace(/^\d+-/, '').replace(/\s+/g, '-')
      return normalized === template.category
    }
  )?.[1]

  if (!categoryFolderId) {
    return NextResponse.json({ error: 'OPD Registers folder not found' }, { status: 500 })
  }

  const title = `${patient.name} — ${template.name} — ${new Date().toISOString().split('T')[0]}`

  const result = await createSpreadsheet(sheets, title, categoryFolderId, template, resolvedData)

  return NextResponse.json({
    success: true,
    document: {
      id: result.spreadsheetId,
      url: result.spreadsheetUrl,
      title,
    },
  })
}

async function handleGenerateDocument(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof generateDocumentSchema>
) {
  // Fetch patient record for auto-fill
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('*')
    .eq('id', data.patientId)
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  // Resolve template
  const template = getTemplate(data.templateId)
  if (!template) {
    return NextResponse.json({ error: `Template not found: ${data.templateId}` }, { status: 404 })
  }

  // Resolve auto-fill — manual data takes precedence over auto-filled values
  const resolvedData = resolveAutoFill(template, patient, data.data ?? {})

  // Get Drive clients and ensure patient folder structure exists
  const { drive, sheets, docs } = getDriveClients('service-account')
  const rootFolderId = await getOrCreateRootFolder(drive)
  const { categoryFolders } = await getOrCreatePatientFolder(
    drive, rootFolderId, patient.name, patient.uhid || patient.patient_code
  )

  // Find the category subfolder matching this template
  const categoryFolderId = Object.entries(categoryFolders).find(
    ([folderName]) => {
      const normalized = folderName.toLowerCase().replace(/^\d+-/, '').replace(/\s+/g, '-')
      return normalized === template.category
    }
  )?.[1]

  if (!categoryFolderId) {
    return NextResponse.json({ error: `Category folder not found for: ${template.category}` }, { status: 500 })
  }

  const title = `${patient.name} — ${template.name} — ${new Date().toISOString().split('T')[0]}`

  // Create document or spreadsheet based on template format
  if (template.format === 'document') {
    const result = await createDocument(docs, title, template, resolvedData)
    return NextResponse.json({
      success: true,
      document: {
        id: result.documentId,
        url: result.documentUrl,
        title,
        format: 'document',
      },
    })
  } else {
    // Default to spreadsheet for 'spreadsheet' and 'mixed' formats
    const result = await createSpreadsheet(sheets, title, categoryFolderId, template, resolvedData)
    return NextResponse.json({
      success: true,
      document: {
        id: result.spreadsheetId,
        url: result.spreadsheetUrl,
        title,
        format: 'spreadsheet',
      },
    })
  }
}

async function handleGenerateBulk(
  supabase: ReturnType<typeof createServerClient>,
  data: z.infer<typeof generateBulkSchema>
) {
  // Fetch patient once for all documents
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('*')
    .eq('id', data.patientId)
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  // Get Drive clients and ensure patient folder structure exists once
  const { drive, sheets, docs } = getDriveClients('service-account')
  const rootFolderId = await getOrCreateRootFolder(drive)
  const { categoryFolders } = await getOrCreatePatientFolder(
    drive, rootFolderId, patient.name, patient.uhid || patient.patient_code
  )

  const results: Array<{
    templateId: string
    success: boolean
    document?: { id: string; url: string; title: string; format: string }
    error?: string
  }> = []

  for (const doc of data.documents) {
    try {
      const template = getTemplate(doc.templateId)
      if (!template) {
        results.push({ templateId: doc.templateId, success: false, error: `Template not found: ${doc.templateId}` })
        continue
      }

      const resolvedData = resolveAutoFill(template, patient, doc.data ?? {})

      // Find the category subfolder
      const categoryFolderId = Object.entries(categoryFolders).find(
        ([folderName]) => {
          const normalized = folderName.toLowerCase().replace(/^\d+-/, '').replace(/\s+/g, '-')
          return normalized === template.category
        }
      )?.[1]

      if (!categoryFolderId) {
        results.push({ templateId: doc.templateId, success: false, error: `Category folder not found for: ${template.category}` })
        continue
      }

      const title = `${patient.name} — ${template.name} — ${new Date().toISOString().split('T')[0]}`

      if (template.format === 'document') {
        const result = await createDocument(docs, title, template, resolvedData)
        results.push({
          templateId: doc.templateId,
          success: true,
          document: { id: result.documentId, url: result.documentUrl, title, format: 'document' },
        })
      } else {
        const result = await createSpreadsheet(sheets, title, categoryFolderId, template, resolvedData)
        results.push({
          templateId: doc.templateId,
          success: true,
          document: { id: result.spreadsheetId, url: result.spreadsheetUrl, title, format: 'spreadsheet' },
        })
      }
    } catch (err) {
      console.error(`[Chat Action] Bulk generate error for ${doc.templateId}:`, err)
      results.push({
        templateId: doc.templateId,
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  const successCount = results.filter(r => r.success).length

  return NextResponse.json({
    success: successCount > 0,
    total: data.documents.length,
    generated: successCount,
    failed: data.documents.length - successCount,
    results,
  })
}

function handleGetTemplateSchema(data: z.infer<typeof getTemplateSchema>) {
  const template = getTemplate(data.templateId)
  if (!template) {
    return NextResponse.json({ error: `Template not found: ${data.templateId}` }, { status: 404 })
  }

  return NextResponse.json({ success: true, template })
}

// ══════════════════════════════════════════════════════════════
// Drive File Handlers
// ══════════════════════════════════════════════════════════════

async function handleListFiles(data: z.infer<typeof listFilesSchema>) {
  const { drive } = getDriveClients('service-account')
  const files = await listFiles(drive, data.folderId)

  return NextResponse.json({ success: true, files })
}

async function handleSearchFiles(data: z.infer<typeof searchFilesSchema>) {
  const { drive } = getDriveClients('service-account')

  // If no root folder specified, get the default root
  let rootFolderId = data.rootFolderId
  if (!rootFolderId) {
    rootFolderId = await getOrCreateRootFolder(drive)
  }

  const result = await searchFiles(drive, data.query, rootFolderId)

  return NextResponse.json({ success: true, files: result.files, nextPageToken: result.nextPageToken })
}

async function handleReadDocument(data: z.infer<typeof readDocumentSchema>) {
  const { drive, sheets, docs } = getDriveClients('service-account')

  // Determine file type from mimeType
  const isSpreadsheet = data.mimeType === 'application/vnd.google-apps.spreadsheet'
  const isDocument = data.mimeType === 'application/vnd.google-apps.document'

  if (isSpreadsheet) {
    // Get spreadsheet metadata to find the first sheet name
    const fileMeta = await drive.files.get({
      fileId: data.fileId,
      fields: 'name',
    })

    // Read all sheet names from the spreadsheet
    const spreadsheetRes = await sheets.spreadsheets.get({
      spreadsheetId: data.fileId,
      fields: 'sheets.properties.title',
    })

    const sheetNames = spreadsheetRes.data.sheets?.map(
      (s) => s.properties?.title || 'Sheet1'
    ) ?? ['Sheet1']

    // Read the first sheet
    const values = await readSheet(sheets, data.fileId, sheetNames[0])

    return NextResponse.json({
      success: true,
      file: {
        id: data.fileId,
        name: fileMeta.data.name,
        format: 'spreadsheet',
        sheets: sheetNames,
        activeSheet: sheetNames[0],
        data: values,
      },
    })
  } else if (isDocument) {
    const fileMeta = await drive.files.get({
      fileId: data.fileId,
      fields: 'name',
    })

    const content = await readDocument(docs, data.fileId)

    return NextResponse.json({
      success: true,
      file: {
        id: data.fileId,
        name: fileMeta.data.name,
        format: 'document',
        content,
      },
    })
  } else {
    return NextResponse.json({
      error: `Unsupported mimeType for reading: ${data.mimeType}. Only Google Docs and Sheets are supported.`,
    }, { status: 400 })
  }
}

async function handleNavigateTo(data: z.infer<typeof navigateToSchema>) {
  const { drive } = getDriveClients('service-account')

  // Get current folder metadata
  const folderMeta = await drive.files.get({
    fileId: data.folderId,
    fields: 'id, name, parents',
  })

  // Build breadcrumb by walking up the parent chain
  const breadcrumb: Array<{ id: string; name: string }> = [
    { id: folderMeta.data.id!, name: folderMeta.data.name! },
  ]

  let currentParentId = folderMeta.data.parents?.[0]
  while (currentParentId) {
    try {
      const parentMeta = await drive.files.get({
        fileId: currentParentId,
        fields: 'id, name, parents',
      })
      breadcrumb.unshift({ id: parentMeta.data.id!, name: parentMeta.data.name! })
      currentParentId = parentMeta.data.parents?.[0]
    } catch {
      // Reached root or no permission — stop walking
      break
    }
  }

  // List files in this folder
  const files = await listFilesInFolder(drive, data.folderId)

  return NextResponse.json({
    success: true,
    folder: {
      id: data.folderId,
      name: folderMeta.data.name,
    },
    breadcrumb,
    files,
  })
}

async function handleDeleteFile(data: z.infer<typeof deleteFileSchema>) {
  const { drive } = getDriveClients('service-account')
  await deleteFile(drive, data.fileId)

  return NextResponse.json({ success: true, message: 'File moved to trash' })
}

async function handleRenameFile(data: z.infer<typeof renameFileSchema>) {
  const { drive } = getDriveClients('service-account')
  await renameFile(drive, data.fileId, data.newName)

  return NextResponse.json({ success: true, message: `File renamed to "${data.newName}"` })
}

async function handleMoveFile(data: z.infer<typeof moveFileSchema>) {
  const { drive } = getDriveClients('service-account')
  await moveFile(drive, data.fileId, data.newParentFolderId)

  return NextResponse.json({ success: true, message: 'File moved successfully' })
}

// ══════════════════════════════════════════════════════════════
// Drive Folder Handlers
// ══════════════════════════════════════════════════════════════

async function handleCreateFolder(data: z.infer<typeof createFolderSchema>) {
  const { drive } = getDriveClients('service-account')

  const res = await drive.files.create({
    requestBody: {
      name: data.name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [data.parentFolderId],
    },
    fields: 'id, name, webViewLink',
  })

  return NextResponse.json({
    success: true,
    folder: {
      id: res.data.id!,
      name: res.data.name!,
      webViewLink: res.data.webViewLink ?? null,
    },
  })
}

async function handleRenameFolder(data: z.infer<typeof renameFolderSchema>) {
  const { drive } = getDriveClients('service-account')

  // Drive treats folders as files — same rename operation
  await renameFile(drive, data.folderId, data.newName)

  return NextResponse.json({ success: true, message: `Folder renamed to "${data.newName}"` })
}

async function handleDeleteFolder(data: z.infer<typeof deleteFolderSchema>) {
  const { drive } = getDriveClients('service-account')

  // Soft-delete (trash) the folder
  await deleteFile(drive, data.folderId)

  return NextResponse.json({ success: true, message: 'Folder moved to trash' })
}

async function handleListFolders(data: z.infer<typeof listFoldersSchema>) {
  const { drive } = getDriveClients('service-account')

  // List only folders (Google Apps folder mimeType)
  const folders = await listFiles(drive, data.parentFolderId, 'application/vnd.google-apps.folder')

  return NextResponse.json({ success: true, folders })
}

async function handleGetRootFolder() {
  const { drive } = getDriveClients('service-account')
  const rootFolderId = await getOrCreateRootFolder(drive)
  return NextResponse.json({ success: true, rootFolderId })
}
