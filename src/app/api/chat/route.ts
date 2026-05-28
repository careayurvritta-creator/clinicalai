export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createChatStream } from '@/lib/nvidia-client'
import { SYSTEM_PROMPT } from '@/lib/types'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext } from '@/lib/ayurrag/vector-rag'
import { createServerClient } from '@/lib/supabase/client'
import { requireAuth, getUserProfile } from '@/lib/supabase/auth'
import { analyzeQuery } from '@/lib/ayurrag/query-engine'

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().max(100000),
    })
  ),
  model: z.string().default('mistralai/mistral-large-3-675b-instruct-2512'),
  enableRAG: z.boolean().default(true),
  attachments: z.array(z.object({
    type: z.enum(['image', 'pdf']),
    name: z.string(),
    text: z.string().optional(),
    base64: z.string().optional(),
  })).optional(),
  sessionId: z.string().optional(),
  module: z.string().default('chat'),
})

let ragInitialized = false

async function ensureRAGInitialized() {
  if (!ragInitialized) {
    try {
      await initializeVectorRAG()
      ragInitialized = true
    } catch (error) {
      console.error('[Chat API] RAG initialization failed:', error)
    }
  }
}

// Fire-and-forget conversation persistence
async function persistMessage(
  sessionId: string | undefined,
  role: 'user' | 'assistant',
  content: string,
  model: string,
  module: string,
  doctorId: string | undefined,
  attachments?: Array<{ type: string; name: string }>
) {
  if (!sessionId) return

  try {
    const supabase = createServerClient()

    // Upsert conversation with doctor_id
    const upsertData: Record<string, unknown> = {
      session_id: sessionId,
      module: module,
      ai_model: model,
      updated_at: new Date().toISOString(),
    }
    if (doctorId) upsertData.doctor_id = doctorId

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .upsert(upsertData, { onConflict: 'session_id' })
      .select('id')
      .single()

    if (convError || !conversation) {
      console.warn('[Chat API] Failed to upsert conversation:', convError?.message)
      return
    }

    // Insert message
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        role,
        content,
        status: 'complete',
        model_used: role === 'assistant' ? model : null,
        created_at: new Date().toISOString(),
      })

    if (msgError) {
      console.warn('[Chat API] Failed to insert message:', msgError.message)
    }

    // Update message count (best-effort)
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversation.id)

    if (count !== null) {
      await supabase
        .from('conversations')
        .update({ message_count: count })
        .eq('id', conversation.id)
    }
  } catch (error) {
    console.warn('[Chat API] Persistence error:', error)
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  // Validate auth
  const auth = await requireAuth()
  if (auth.error) return auth.error

  // Get doctor_id from profile (fire-and-forget safe)
  let doctorId: string | undefined
  try {
    const profile = await getUserProfile(auth.user.id)
    if (profile) doctorId = profile.id
  } catch {}

  try {
    const body = await req.json()
    const { messages, model, enableRAG, attachments, sessionId, module } = chatRequestSchema.parse(body)

    console.log('[Chat API] Request:', {
      model,
      messageCount: messages.length,
      enableRAG,
      attachments: attachments?.length || 0,
      sessionId: sessionId ? 'provided' : 'none',
      module,
    })

    // Include attachment content in the last user message for context
    if (attachments && attachments.length > 0) {
      const lastUserMsg = messages[messages.length - 1]
      if (lastUserMsg?.role === 'user') {
        const attachmentContext = attachments
          .filter(a => a.text || a.base64)
          .map(a => {
            if (a.type === 'pdf' && a.text) return `\n\n[Attached PDF: ${a.name}]\n${a.text}`
            if (a.type === 'image' && a.base64) return `\n\n[Attached Image: ${a.name}]`
            return ''
          })
          .filter(Boolean)
          .join('')
        if (attachmentContext) {
          lastUserMsg.content += attachmentContext
        }
      }
    }

    // Persist user message (fire-and-forget)
    const lastUserMessage = messages[messages.length - 1]
    if (lastUserMessage?.role === 'user') {
      persistMessage(sessionId, 'user', lastUserMessage.content, model, module, doctorId, attachments)
    }

    let ragContext = ''

    if (enableRAG) {
      await ensureRAGInitialized()

      // Get the last user message for vector search
      const searchMessage = [...messages].reverse().find(m => m.role === 'user')
      if (searchMessage) {
        try {
          // Analyze query for intent and entities
          const queryAnalysis = analyzeQuery(searchMessage.content)
          console.log('[Chat API] Query analysis:', {
            intent: queryAnalysis.intent,
            entities: queryAnalysis.entities.length,
            safety: queryAnalysis.requiresSafetyWarning,
          })

          // Vector search with lower threshold for broader recall
          const searchResults = await vectorSearch(searchMessage.content, {
            maxResults: 10,
            minRelevance: 0.25,
            includeWHO: true,
            includeAyurKnowledge: true
          })

          if (searchResults.length > 0) {
            ragContext = formatVectorResultsForContext(searchResults)
            console.log('[Chat API] Vector RAG found', searchResults.length, 'results')
          }

          // Add safety warnings if query involves drug interactions
          if (queryAnalysis.requiresSafetyWarning) {
            ragContext += '\n\n**Safety Notice:** This query involves potential drug interactions or treatment protocols. Always verify with current pharmacological references and consult specialists when combining Ayurvedic and modern treatments.\n'
          }
        } catch (error) {
          console.error('[Chat API] Vector search error:', error)
        }
      }
    }

    // Build system message with RAG context
    const systemWithRAG = ragContext
      ? `${SYSTEM_PROMPT}\n\n${ragContext}`
      : SYSTEM_PROMPT

    const systemMessages = [
      { role: 'system' as const, content: systemWithRAG },
      ...messages,
    ]

    const stream = await createChatStream(systemMessages as any, model)

    console.log('[Chat API] Stream created in', Date.now() - startTime, 'ms')

    // Collect assistant response for persistence
    let assistantContent = ''

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            // Extract content for persistence — handle both regular and reasoning models
            try {
              const delta = chunk.choices?.[0]?.delta as Record<string, string> | undefined
              const content = delta?.content || delta?.reasoning_content || ''
              if (content) assistantContent += content
            } catch {}
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()

          // Persist assistant response (fire-and-forget)
          if (assistantContent) {
            persistMessage(sessionId, 'assistant', assistantContent, model, module, doctorId)
          }

          console.log('[Chat API] Stream complete in', Date.now() - startTime, 'ms, length:', assistantContent.length)
        } catch (err) {
          console.error('[Chat API] Stream error:', err)
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('[Chat API] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', code: 'VALIDATION_ERROR', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('NVIDIA_API_KEY')) {
      return NextResponse.json(
        { error: 'API key not configured. Set NVIDIA_API_KEY in Vercel environment variables.', code: 'API_KEY_MISSING' },
        { status: 500 }
      )
    }

    if (error instanceof Error && error.message.includes('rate')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', code: 'RATE_LIMITED' },
        { status: 429 }
      )
    }

    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message, code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}
