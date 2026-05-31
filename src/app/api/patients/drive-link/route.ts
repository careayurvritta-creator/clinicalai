import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const folderId = request.nextUrl.searchParams.get('folderId')
  if (!folderId) {
    return NextResponse.json({ error: 'folderId required' }, { status: 400 })
  }

  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('patient_drive_links')
      .select('patient_id, clinical_id')
      .eq('drive_folder_id', folderId)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'No link found' }, { status: 404 })
    }

    return NextResponse.json({
      patientId: data.patient_id,
      clinicalId: data.clinical_id,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to look up drive link', details: String(err) },
      { status: 500 }
    )
  }
}
