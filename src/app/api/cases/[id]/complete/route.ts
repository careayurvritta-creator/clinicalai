export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { reembedCaseWithOutcome } from '@/lib/input-learning'

const CompleteSchema = z.object({
  outcome_rating: z.number().min(1).max(5).optional(),
  outcome_label: z.enum([
    'complete-recovery',
    'significant-improvement',
    'moderate-improvement',
    'slight-improvement',
    'no-change',
    'worsened',
  ]).optional(),
  doctor_notes: z.string().optional(),
  clinical_observations: z.string().optional(),
  what_worked: z.array(z.string()).optional(),
  what_didnt_work: z.array(z.string()).optional(),
  patient_feedback: z.string().optional(),
  symptom_improvement: z.record(z.string(), z.string()).optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: caseId } = await params
    const body = await request.json()
    const parsed = CompleteSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServerClient()

    // Update case status to completed
    const { error: updateError } = await supabase
      .from('cases')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', caseId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update case', details: updateError.message },
        { status: 500 }
      )
    }

    // Insert outcome record
    const { data: outcome, error: outcomeError } = await supabase
      .from('case_outcomes')
      .insert({
        case_id: caseId,
        outcome_rating: data.outcome_rating || null,
        outcome_label: data.outcome_label || null,
        doctor_notes: data.doctor_notes || null,
        clinical_observations: data.clinical_observations || null,
        what_worked: data.what_worked || null,
        what_didnt_work: data.what_didnt_work || null,
        patient_feedback: data.patient_feedback || null,
        symptom_improvement: data.symptom_improvement || null,
      })
      .select()
      .single()

    if (outcomeError) {
      console.warn('[Case Complete] Outcome insert failed:', outcomeError.message)
    }

    // Re-embed case with outcome data (fire-and-forget)
    reembedCaseWithOutcome(caseId, {
      what_worked: data.what_worked,
      what_didnt_work: data.what_didnt_work,
      outcome_notes: data.doctor_notes,
      outcome_label: data.outcome_label,
      outcome_rating: data.outcome_rating,
    }).catch(err =>
      console.warn('[Case Complete] Re-embedding failed:', err)
    )

    return NextResponse.json({
      success: true,
      message: 'Case completed and outcome recorded',
      outcome: outcome || null,
    })
  } catch (error) {
    console.error('[Case Complete] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
