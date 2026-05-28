import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createServerClient()
}

// GET /api/patients/search?q=query
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const supabase = getSupabase()

  if (!query || query.length < 1) {
    // Return recent patients if no query
    const { data, error } = await supabase
      .from('patients')
      .select('id, clinical_id, name, age, gender, phone')
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
      .limit(10)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ patients: data ?? [] })
  }

  const { data, error } = await supabase
    .from('patients')
    .select('id, clinical_id, name, age, gender, phone')
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%,clinical_id.ilike.%${query}%`)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ patients: data ?? [] })
}
