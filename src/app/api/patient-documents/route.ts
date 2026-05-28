import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'
import { STORAGE_BUCKET, buildStoragePath } from '@/lib/constants'

export const dynamic = 'force-dynamic'

// GET /api/patient-documents?patient_id=xxx&category=yyy
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')
  const category = searchParams.get('category')

  if (!patientId) {
    return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
  }

  const supabase = createServerClient()
  let query = supabase
    .from('patient_documents')
    .select('*')
    .eq('patient_id', patientId)
    .order('upload_date', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get counts per category
  const { data: countData } = await supabase
    .from('patient_documents')
    .select('category')
    .eq('patient_id', patientId)

  const counts: Record<string, number> = {}
  for (const row of countData ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }

  return NextResponse.json({ documents: data ?? [], counts })
}

// POST /api/patient-documents
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const patientId = formData.get('patient_id') as string | null
  const category = formData.get('category') as string | null
  const tags = formData.get('tags') as string | null
  const notes = formData.get('notes') as string | null

  if (!file || !patientId || !category) {
    return NextResponse.json(
      { error: 'file, patient_id, and category required' },
      { status: 400 }
    )
  }

  // Get patient info for storage path
  const supabase = createServerClient()
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('clinical_id, name')
    .eq('id', patientId)
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  // Upload to storage
  const storagePath = buildStoragePath(
    patient.clinical_id,
    patient.name,
    category,
    file.name
  )

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Insert metadata
  const tagsArray = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : []

  const { data: doc, error: dbError } = await supabase
    .from('patient_documents')
    .insert({
      patient_id: patientId,
      category,
      filename: file.name,
      storage_path: storagePath,
      file_size: file.size,
      file_type: file.type,
      tags: tagsArray,
      notes: notes || null,
    })
    .select()
    .single()

  if (dbError) {
    await supabase.storage.from(STORAGE_BUCKET).remove([storagePath])
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ document: doc })
}
