import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/client'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()

    // Get counts in parallel
    const [
      patientsResult,
      casesResult,
      conversationsResult,
      protocolsResult,
    ] = await Promise.all([
      supabase.from('patients').select('*', { count: 'exact', head: true }),
      supabase.from('cases').select('*', { count: 'exact', head: true }),
      supabase.from('conversations').select('*', { count: 'exact', head: true }),
      supabase.from('treatment_protocols').select('*', { count: 'exact', head: true }),
    ])

    // Get recent cases
    const { data: recentCases } = await supabase
      .from('cases')
      .select('id, case_number, status, created_at, provisional_diagnosis')
      .order('created_at', { ascending: false })
      .limit(5)

    // Get recent patients
    const { data: recentPatients } = await supabase
      .from('patients')
      .select('id, patient_code, full_name, created_at')
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      stats: {
        totalPatients: patientsResult.count || 0,
        totalCases: casesResult.count || 0,
        totalConversations: conversationsResult.count || 0,
        totalProtocols: protocolsResult.count || 0,
      },
      recentCases: recentCases || [],
      recentPatients: recentPatients || [],
    })
  } catch (error) {
    console.error('[Analytics API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
