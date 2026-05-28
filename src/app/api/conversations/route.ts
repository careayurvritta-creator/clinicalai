export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/client'
import { requireAuth, getUserProfile } from '@/lib/supabase/auth'

export async function GET(req: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    const module_ = searchParams.get('module')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get doctor_id from profile
    const profile = await getUserProfile(auth.user.id)
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Single conversation + messages
    if (sessionId) {
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('session_id', sessionId)
        .eq('doctor_id', profile.id)
        .single()

      if (convError || !conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
      }

      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true })

      if (msgError) {
        console.error('[Conversations API] Messages fetch error:', msgError.message)
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
      }

      return NextResponse.json({ conversation, messages: messages || [] })
    }

    // List conversations
    let query = supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .eq('doctor_id', profile.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (module_) {
      query = query.eq('module', module_)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('[Conversations API] Fetch error:', error.message)
      return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
    }

    return NextResponse.json({ conversations: data || [], total: count })
  } catch (error) {
    console.error('[Conversations API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const createSchema = z.object({
  session_id: z.string().uuid(),
  module: z.string().default('chat'),
  title: z.string().max(200).optional(),
  ai_model: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const body = await req.json()
    const validated = createSchema.parse(body)
    const supabase = createServerClient()

    // Get doctor_id from profile
    const profile = await getUserProfile(auth.user.id)
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        session_id: validated.session_id,
        module: validated.module,
        title: validated.title || null,
        ai_model: validated.ai_model || null,
        doctor_id: profile.id,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      console.error('[Conversations API] Insert error:', error.message)
      return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
    }

    return NextResponse.json({ conversation: data }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Conversations API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
