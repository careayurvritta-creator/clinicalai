import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase/client'
import { STORAGE_BUCKET } from '@/lib/constants'

export const dynamic = 'force-dynamic'

// GET /api/patient-documents/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('patient_documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // Generate signed URL for download/preview
  const { data: urlData } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(data.storage_path, 3600)

  return NextResponse.json({
    document: data,
    signedUrl: urlData?.signedUrl ?? null,
  })
}

// DELETE /api/patient-documents/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = getSupabase()

  // Get document first for storage path
  const { data: doc, error: fetchError } = await supabase
    .from('patient_documents')
    .select('storage_path')
    .eq('id', id)
    .single()

  if (fetchError || !doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // Delete from storage
  await supabase.storage.from(STORAGE_BUCKET).remove([doc.storage_path])

  // Delete metadata
  const { error: dbError } = await supabase
    .from('patient_documents')
    .delete()
    .eq('id', id)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
