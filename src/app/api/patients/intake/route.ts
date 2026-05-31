import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'
import { generateUHID } from '@/lib/uhid'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const clinicalId = request.nextUrl.searchParams.get('clinical_id')
  const folderId = request.nextUrl.searchParams.get('folderId')

  if (!clinicalId && !folderId) {
    return NextResponse.json({ error: 'clinical_id or folderId required' }, { status: 400 })
  }

  try {
    const supabase = createServerClient()

    if (folderId) {
      // Look up via drive link
      const { data: link } = await supabase
        .from('patient_drive_links')
        .select('patient_id')
        .eq('drive_folder_id', folderId)
        .single()

      if (link) {
        const { data: patient } = await supabase
          .from('patients')
          .select('*')
          .eq('id', link.patient_id)
          .single()
        if (patient) return NextResponse.json({ patient })
      }
      return NextResponse.json({ patient: null })
    }

    // Search by clinical_id
    const { data: patient } = await supabase
      .from('patients')
      .select('*')
      .eq('clinical_id', clinicalId)
      .single()

    return NextResponse.json({ patient: patient ?? null })
  } catch (err) {
    return NextResponse.json({ error: 'Lookup failed', details: String(err) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    const supabase = createServerClient()

    if (action === 'save_demographics') {
      const { demographics, driveFolderId } = body
      if (!demographics?.name) {
        return NextResponse.json({ error: 'name required' }, { status: 400 })
      }

      // Generate UHID
      const uhid = demographics.uhid || await generateUHID()

      // Generate clinical_id if not present
      const clinicalId = demographics.clinical_id || `AAH-${Date.now().toString(36).toUpperCase()}`

      // Insert patient
      const { data: patient, error: insertError } = await supabase
        .from('patients')
        .insert({
          name: demographics.name,
          age: demographics.age ? Number(demographics.age) : null,
          gender: demographics.gender || null,
          phone: demographics.phone || null,
          email: demographics.email || null,
          address: demographics.address || null,
          occupation: demographics.occupation || null,
          date_of_birth: demographics.date_of_birth || null,
          blood_group: demographics.blood_group || null,
          height_cm: demographics.height_cm ? Number(demographics.height_cm) : null,
          weight_kg: demographics.weight_kg ? Number(demographics.weight_kg) : null,
          emergency_contact: demographics.emergency_contact || null,
          emergency_phone: demographics.emergency_phone || null,
          uhid,
          clinical_id: clinicalId,
        })
        .select()
        .single()

      if (insertError) {
        console.error('Patient insert error:', insertError)
        return NextResponse.json({ error: 'Failed to create patient', details: insertError.message }, { status: 500 })
      }

      // Link to Drive folder if provided
      if (driveFolderId) {
        await supabase.from('patient_drive_links').insert({
          patient_id: patient.id,
          drive_folder_id: driveFolderId,
          clinical_id: clinicalId,
        })
      }

      return NextResponse.json({ patient })
    }

    if (action === 'update') {
      const { patientId, updates } = body
      if (!patientId) {
        return NextResponse.json({ error: 'patientId required' }, { status: 400 })
      }

      // Whitelist fields to prevent overwriting system columns
      const allowedFields = new Set([
        'name', 'age', 'gender', 'phone', 'email', 'address', 'occupation',
        'area', 'blood_group', 'height_cm', 'weight_kg', 'date_of_birth',
        'emergency_contact', 'emergency_phone', 'notes', 'prakriti', 'vikriti',
      ])
      const safeUpdates: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.has(key)) {
          safeUpdates[key] = value
        }
      }

      if (Object.keys(safeUpdates).length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
      }

      // Convert numeric fields
      if (safeUpdates.age) safeUpdates.age = Number(safeUpdates.age)
      if (safeUpdates.height_cm) safeUpdates.height_cm = Number(safeUpdates.height_cm)
      if (safeUpdates.weight_kg) safeUpdates.weight_kg = Number(safeUpdates.weight_kg)

      const { data: patient, error: updateError } = await supabase
        .from('patients')
        .update(safeUpdates)
        .eq('id', patientId)
        .select()
        .single()

      if (updateError) {
        return NextResponse.json({ error: 'Failed to update', details: updateError.message }, { status: 500 })
      }

      return NextResponse.json({ patient })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err) {
    return NextResponse.json({ error: 'Intake failed', details: String(err) }, { status: 500 })
  }
}
