export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { reembedCaseWithOutcome } from '@/lib/input-learning'

const LearningSchema = z.object({
  pattern_category: z.enum([
    'diagnosis',
    'treatment',
    'herb-selection',
    'dosha-assessment',
    'prognosis',
  ]),
  original_prediction: z.string().optional(),
  corrected_prediction: z.string(),
  pattern_corrected: z.string().optional(),
  confidence_before: z.number().min(0).max(1).optional(),
  confidence_after: z.number().min(0).max(1).optional(),
  frequency: z.number().min(1).optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: caseId } = await params
    const body = await request.json()
    const parsed = LearningSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const supabase = createServerClient()

    // Verify case exists
    const { data: caseRow, error: caseErr } = await supabase
      .from('cases')
      .select('id, case_number')
      .eq('id', caseId)
      .single()

    if (caseErr || !caseRow) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      )
    }

    // Insert learning record
    const { data: learning, error: learningError } = await supabase
      .from('case_learnings')
      .insert({
        case_id: caseId,
        pattern_category: data.pattern_category,
        original_prediction: data.original_prediction || null,
        corrected_prediction: data.corrected_prediction,
        pattern_corrected: data.pattern_corrected || null,
        confidence_before: data.confidence_before || null,
        confidence_after: data.confidence_after || null,
        frequency: data.frequency || 1,
      })
      .select()
      .single()

    if (learningError) {
      return NextResponse.json(
        { error: 'Failed to record learning', details: learningError.message },
        { status: 500 }
      )
    }

    // If diagnosis was corrected, re-embed the case with corrected info
    if (data.pattern_category === 'diagnosis' && data.corrected_prediction) {
      reembedCaseWithOutcome(caseId, {
        corrected_diagnosis: data.corrected_prediction,
        correction_reason: data.pattern_corrected,
      }).catch(err =>
        console.warn('[Case Learning] Re-embedding failed:', err)
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Learning recorded',
      learning,
    })
  } catch (error) {
    console.error('[Case Learning] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
