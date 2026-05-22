import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'

const updatePatientSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  age: z.number().min(0).max(150).optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  address: z.string().max(500).optional(),
  date_of_birth: z.string().optional(),
  blood_group: z.string().optional(),
  height_cm: z.number().min(0).max(300).optional(),
  weight_kg: z.number().min(0).max(500).optional(),
  occupation: z.string().optional(),
  emergency_contact: z.string().optional(),
  emergency_phone: z.string().optional(),
  notes: z.string().optional(),
  is_archived: z.boolean().optional(),
})

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    return NextResponse.json({ patient: data })
  } catch (error) {
    console.error('[Patient API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const validated = updatePatientSchema.parse(body)
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('patients')
      .update({
        ...validated,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('[Patient API] Update error:', error.message)
      return NextResponse.json({ error: 'Failed to update patient' }, { status: 500 })
    }

    return NextResponse.json({ patient: data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Patient API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    // Soft delete - mark as archived
    const { error } = await supabase
      .from('patients')
      .update({ is_archived: true, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) {
      console.error('[Patient API] Delete error:', error.message)
      return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Patient API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
