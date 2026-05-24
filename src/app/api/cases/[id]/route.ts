export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const [caseRes, complaintsRes, findingsRes, protocolsRes] = await Promise.all([
      supabase.from('cases').select('*, patients (*)').eq('id', id).single(),
      supabase.from('chief_complaints').select('*').eq('case_id', id),
      supabase.from('investigation_findings').select('*').eq('case_id', id),
      supabase.from('treatment_protocols').select('*').eq('case_id', id),
    ])

    if (caseRes.error || !caseRes.data) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    return NextResponse.json({
      case: {
        ...caseRes.data,
        chief_complaints: complaintsRes.data || [],
        investigation_findings: findingsRes.data || [],
        treatment_protocols: protocolsRes.data || [],
      },
    })
  } catch (error) {
    console.error('[Case API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
