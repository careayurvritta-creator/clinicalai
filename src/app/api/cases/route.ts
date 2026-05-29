export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'
import { requireAuth } from '@/lib/supabase/auth-server'

export async function GET(req: NextRequest) {
  // TODO: Re-enable auth once PKCE cookie flow is fixed
  // const auth = await requireAuth()
  // if (auth.error) return auth.error

  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(req.url)
    const patientId = searchParams.get('patient_id')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('cases')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (patientId) {
      query = query.eq('patient_id', patientId)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('[Cases API] Fetch error:', error.message)
      return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 })
    }

    return NextResponse.json({ cases: data, total: count })
  } catch (error) {
    console.error('[Cases API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
