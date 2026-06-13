export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { SYSTEM_PROMPT, DEFAULT_MODEL } from '@/lib/types'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext, detectQueryIntent } from '@/lib/ayurrag/vector-rag'
import { createServerClient } from '@/lib/supabase/client'
import { analyzeQuery } from '@/lib/ayurrag/query-engine'
import {
  MAX_CHAT_CONTINUATIONS,
  AYURVEDIC_TERMS, INTENT_FOCUS_INSTRUCTIONS,
  streamWithAutoContinuation, type IntentType,
} from '@/lib/llm-stream-utils'

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().max(100000),
    })
  ),
  model: z.string().default(DEFAULT_MODEL),
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

// ─── Conversation Persistence ────────────────────────────────────────────────

async function persistMessage(opts: {
  sessionId?: string
  role: 'user' | 'assistant'
  content: string
  model: string
  module: string
  ragSources?: string[]
}) {
  const { sessionId, role, content, model, module: mod, ragSources } = opts
  if (!sessionId) return

  try {
    const supabase = createServerClient()

    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .upsert({
        session_id: sessionId,
        module: mod,
        ai_model: model,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'session_id' })
      .select('id')
      .single()

    if (convError || !conversation) {
      console.warn('[Chat API] Failed to upsert conversation:', convError?.message)
      return
    }

    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        role,
        content,
        status: 'complete',
        model_used: role === 'assistant' ? model : null,
        metadata: ragSources && ragSources.length > 0 ? { rag_sources: ragSources } : null,
        created_at: new Date().toISOString(),
      })

    if (msgError) {
      console.warn('[Chat API] Failed to insert message:', msgError.message)
    }

    // Message count is auto-incremented by DB trigger on messages table
  } catch (error) {
    console.warn('[Chat API] Persistence error:', error)
  }
}

// ─── Conversation-Aware Context ──────────────────────────────────────────────

function extractConversationContext(messages: Array<{ role: string; content: string }>): string {
  const userMessages = messages
    .filter(m => m.role === 'user')
    .slice(-3)
    .map(m => m.content)

  if (userMessages.length <= 1) return ''

  const allText = userMessages.join(' ').toLowerCase()
  const keyTerms: string[] = []

  for (const term of AYURVEDIC_TERMS) {
    if (allText.includes(term)) keyTerms.push(term)
  }

  if (keyTerms.length === 0) return ''

  return `\n\n[Conversation Context: The discussion has been about ${keyTerms.slice(0, 5).join(', ')}. Consider this context when interpreting the current query.]`
}

// ─── Build System Prompt ─────────────────────────────────────────────────────

function buildDynamicSystemPrompt(
  basePrompt: string,
  ragContext: string,
  intent: IntentType,
  conversationContext: string
): string {
  const dynamicInstructions = INTENT_FOCUS_INSTRUCTIONS[intent] || ''
  return `${basePrompt}${conversationContext}${dynamicInstructions}\n\n${ragContext}\n\nIMPORTANT: Use the knowledge base information provided above to give accurate, evidence-based responses. Cite specific sources when available. If the knowledge base contains relevant clinical cases, reference them to support your recommendations.`
}

// ─── POST Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body', code: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }
    const { messages, model, enableRAG, attachments, sessionId, module } = chatRequestSchema.parse(body)

    console.log('[Chat API] Request:', {
      model,
      messageCount: messages.length,
      enableRAG,
      attachments: attachments?.length || 0,
      sessionId: sessionId ? 'provided' : 'none',
      module,
    })

    // Include attachment content in the last user message
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
      persistMessage({ sessionId, role: 'user', content: lastUserMessage.content, model, module }).catch(err => console.error('[Chat API] Failed to persist user message:', err))
    }

    // ─── RAG Enhancement ───────────────────────────────────────────────────

    let ragContext = ''
    let ragSources: string[] = []
    let ragResultCount = 0
    let queryIntent: IntentType = 'general'

    if (enableRAG) {
      await ensureRAGInitialized()

      const searchMessage = [...messages].reverse().find(m => m.role === 'user')
      if (searchMessage) {
        try {
          // Parallelize intent detection + query analysis with vector search
          const [intentResult, searchResults] = await Promise.all([
            Promise.resolve().then(() => {
              const intent = detectQueryIntent(searchMessage.content)
              const queryAnalysis = analyzeQuery(searchMessage.content)
              return { intent, queryAnalysis }
            }),
            vectorSearch(searchMessage.content, {
              maxResults: 15,
              minRelevance: 0.20,
              includeWHO: true,
              includeAyurKnowledge: true,
              includeClinicalCases: true,
            }),
          ])

          queryIntent = intentResult.intent.primaryIntent as IntentType
          const { queryAnalysis } = intentResult

          console.log('[Chat API] Query analysis:', {
            intent: queryIntent,
            complexity: intentResult.intent.complexity,
            entities: queryAnalysis.entities.length,
            safety: queryAnalysis.requiresSafetyWarning,
          })

          if (searchResults.length > 0) {
            const formatted = formatVectorResultsForContext(searchResults)
            ragContext = formatted.context
            ragSources = formatted.sources
            ragResultCount = formatted.resultCount

            console.log('[Chat API] RAG results:', {
              count: ragResultCount,
              categories: formatted.categories,
              sources: ragSources.length,
            })
          }

          if (queryAnalysis.requiresSafetyWarning) {
            ragContext += '\n\n**Safety Notice:** This query involves potential drug interactions or treatment protocols. Always verify with current pharmacological references and consult specialists when combining Ayurvedic and modern treatments.\n'
          }
        } catch (error) {
          console.error('[Chat API] RAG error:', error)
          // Gracefully degrade — proceed without RAG context
        }
      }
    }

    // ─── Build System Message ───────────────────────────────────────────────

    const conversationContext = extractConversationContext(messages)
    const systemWithRAG = buildDynamicSystemPrompt(
      SYSTEM_PROMPT,
      ragContext,
      queryIntent,
      conversationContext
    )

    const systemMessages = [
      { role: 'system' as const, content: systemWithRAG },
      ...messages,
    ]

    // ─── Stream Response with Auto-Continuation ─────────────────────────────

    console.log('[Chat API] Stream starting in', Date.now() - startTime, 'ms')

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Send RAG metadata as first event
          if (ragResultCount > 0) {
            const metaEvent = JSON.stringify({
              type: 'rag_metadata',
              resultCount: ragResultCount,
              sources: ragSources.slice(0, 5),
              intent: queryIntent,
            })
            controller.enqueue(encoder.encode(`data: ${metaEvent}\n\n`))
          }

          // Stream with auto-continuation
          const { content: assistantContent, continuationCount } = await streamWithAutoContinuation(
            systemMessages as any,
            model,
            controller,
            encoder,
            MAX_CHAT_CONTINUATIONS,
            'Continue from where you left off. Do not repeat what you already wrote. Continue seamlessly.',
          )

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()

          // Persist complete assistant response
          if (assistantContent) {
            persistMessage({ sessionId, role: 'assistant', content: assistantContent, model, module, ragSources }).catch(err => console.error('[Chat API] Failed to persist assistant message:', err))
          }

          console.log('[Chat API] Stream complete in', Date.now() - startTime, 'ms, length:', assistantContent.length, 'continuations:', continuationCount)
        } catch (err) {
          console.error('[Chat API] Stream error:', err)
          // Send error event to client before closing
          try {
            const errorEvent = JSON.stringify({
              type: 'error',
              message: err instanceof Error ? err.message : 'Stream processing failed',
            })
            controller.enqueue(encoder.encode(`data: ${errorEvent}\n\n`))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          } catch { /* controller may already be closed */ }
          try { controller.close() } catch { /* ignore */ }
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
