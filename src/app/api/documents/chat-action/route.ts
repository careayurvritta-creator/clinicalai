// Document Chat Action API — Central orchestrator for AI chatbot actions
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { generateUHID } from '@/lib/uhid'
import { resolveAutoFill } from '@/lib/auto-fill'
import { getTemplate } from '@/lib/templates'
import { getDriveClients } from '@/lib/google-drive/client'
import { getOrCreateRootFolder, getOrCreatePatientFolder } from '@/lib/google-drive/folders'
import { createSpreadsheet } from '@/lib/google-drive/sheets'
import { createDocument } from '@/lib/google-drive/docs'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

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

const requestSchema = z.discriminatedUnion('action', [
  createActionSchema,
  updateActionSchema,
  generateOpdSchema,
  searchActionSchema,
  getPatientActionSchema,
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = requestSchema.parse(body)
    const supabase = createServerClient()

    switch (parsed.action) {
      case 'create_patient':
        return handleCreatePatient(supabase, parsed)
      case 'update_patient':
        return handleUpdatePatient(supabase, parsed)
      case 'generate_opd_entry':
        return handleGenerateOpdEntry(supabase, parsed)
      case 'search_patients':
        return handleSearchPatients(supabase, parsed)
      case 'get_patient':
        return handleGetPatient(supabase, parsed)
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

  // Create Drive folder
  let driveFolder: { folderId: string; categoryFolders: Record<string, string> } | null = null
  try {
    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    driveFolder = await getOrCreatePatientFolder(drive, rootFolderId, data.name, uhid)
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
  const { data: patient, error } = await supabase
    .from('patients')
    .update(data.updates)
    .eq('id', data.patientId)
    .select()
    .single()

  if (error) {
    console.error('[Chat Action] Patient update error:', error.message)
    return NextResponse.json({ error: 'Failed to update patient', details: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, patient })
}

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
