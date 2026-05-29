export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { requireAuth } from '@/lib/supabase/auth-server'

const patientSchema = z.object({
  name: z.string().min(1).max(200),
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
  doctor_id: z.string().uuid().optional(),
})

export async function GET(req: NextRequest) {
  // TODO: Re-enable auth once PKCE cookie flow is fixed
  // const auth = await requireAuth()
  // if (auth.error) return auth.error

  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('patients')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,patient_code.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('[Patients API] Fetch error:', error.message)
      return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
    }

    return NextResponse.json({ patients: data, total: count })
  } catch (error) {
    console.error('[Patients API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  // TODO: Re-enable auth once PKCE cookie flow is fixed
  // const auth = await requireAuth()
  // if (auth.error) return auth.error

  try {
    const body = await req.json()
    const validated = patientSchema.parse(body)
    const supabase = createServerClient()

    // Generate patient code
    const patientCode = `PAT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`

    // Calculate BMI if height and weight provided
    let bmi: number | undefined
    if (validated.height_cm && validated.weight_kg) {
      const heightM = validated.height_cm / 100
      bmi = Math.round((validated.weight_kg / (heightM * heightM)) * 10) / 10
    }

    const { data, error } = await supabase
      .from('patients')
      .insert({
        ...validated,
        patient_code: patientCode,
      })
      .select()
      .single()

    if (error) {
      console.error('[Patients API] Insert error:', error.message)
      return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 })
    }

    return NextResponse.json({ patient: data }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Patients API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
