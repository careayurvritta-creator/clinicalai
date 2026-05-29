export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createChatStream } from '@/lib/nvidia-client'
import { SYSTEM_PROMPT } from '@/lib/types'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext, detectQueryIntent } from '@/lib/ayurrag/vector-rag'
import { createServerClient } from '@/lib/supabase/client'
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

// Max auto-continuations when LLM hits token limit
const MAX_AUTO_CONTINUATIONS = 3
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

async function persistMessage(
  sessionId: string | undefined,
  role: 'user' | 'assistant',
  content: string,
  model: string,
  module: string,
  doctorId: string | undefined,
  ragSources?: string[],
  attachments?: Array<{ type: string; name: string }>
) {
  if (!sessionId) return

  try {
    const supabase = createServerClient()

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

// ─── Conversation-Aware Context ──────────────────────────────────────────────

function extractConversationContext(messages: Array<{ role: string; content: string }>): string {
  const userMessages = messages
    .filter(m => m.role === 'user')
    .slice(-3)
    .map(m => m.content)

  if (userMessages.length <= 1) return ''

  const allText = userMessages.join(' ').toLowerCase()
  const keyTerms: string[] = []

  const ayurvedicTerms = [
    'vata', 'pitta', 'kapha', 'dosha', 'prakriti', 'vikriti',
    'agni', 'ama', 'panchakarma', 'basti', 'vamana', 'virechana',
    'nasya', 'chikitsa', 'shodhana', 'shamana', 'rasayana',
    'sandhivata', 'amavata', 'prameha', 'kushtha', 'swasa',
  ]

  for (const term of ayurvedicTerms) {
    if (allText.includes(term)) keyTerms.push(term)
  }

  if (keyTerms.length === 0) return ''

  return `\n\n[Conversation Context: The discussion has been about ${keyTerms.slice(0, 5).join(', ')}. Consider this context when interpreting the current query.]`
}

// ─── Dynamic System Prompt ───────────────────────────────────────────────────

function buildDynamicSystemPrompt(
  basePrompt: string,
  ragContext: string,
  intent: string,
  conversationContext: string
): string {
  let dynamicInstructions = ''

  switch (intent) {
    case 'diagnosis':
      dynamicInstructions = `
FOCUS: This is a diagnostic query. Provide:
- Differential diagnosis with dosha involvement
- Samprapti (pathogenesis) if available
- Key clinical features to look for
- Recommended investigations (both Ayurvedic and modern)
- Prognosis based on classical texts
`
      break
    case 'treatment':
      dynamicInstructions = `
FOCUS: This is a treatment query. Provide:
- Treatment principles (Chikitsa Sutra)
- Specific Panchakarma procedures if applicable
- Internal medications with dosage and anupana
- External therapies
- Duration and frequency
- Expected outcomes
- Precautions and contraindications
`
      break
    case 'herb':
      dynamicInstructions = `
FOCUS: This is a herb query. Provide:
- Rasa, Guna, Virya, Vipaka properties
- Dosha Karma (effect on each dosha)
- Classical formulations containing this herb
- Dosage and anupana (vehicle)
- Contraindications and drug interactions
- Modern research evidence if available
`
      break
    case 'drug_interaction':
      dynamicInstructions = `
FOCUS: This involves drug interactions. CRITICAL:
- Check all herb-drug interactions
- Specify severity (high/medium/low)
- Provide mechanism of interaction
- Suggest safe alternatives if contraindicated
- Recommend monitoring parameters
- ALWAYS include safety warnings
`
      break
    case 'prakriti':
      dynamicInstructions = `
FOCUS: This is a constitution/prakriti query. Provide:
- Detailed prakriti characteristics
- Physical, mental, and behavioral traits
- Dietary recommendations (pathya/apathya)
- Lifestyle guidelines (dinacharya/ritucharya)
- Exercise and yoga recommendations
- Seasonal adjustments
`
      break
    case 'diet':
      dynamicInstructions = `
FOCUS: This is a dietary query. Provide:
- Pathya (recommended foods) with rationale
- Apathya (foods to avoid) with reasoning
- Seasonal dietary adjustments (Ritucharya)
- Meal timing and preparation methods
- Specific recipes if helpful
- Foods that balance the relevant dosha
`
      break
    case 'procedure':
      dynamicInstructions = `
FOCUS: This is a procedure/therapy query. Provide:
- Detailed step-by-step procedure
- Pre-procedure preparation (Poorvakarma)
- Main procedure (Pradhana Karma)
- Post-procedure care (Paschat Karma)
- Duration and frequency
- Indications and contraindications
- Expected outcomes
`
      break
    case 'research':
      dynamicInstructions = `
FOCUS: This is a research/evidence query. Provide:
- Summary of relevant studies
- Evidence quality assessment
- Clinical trial results if available
- Limitations of current evidence
- Areas needing more research
- Practical clinical implications
`
      break
    default:
      dynamicInstructions = ''
  }

  return `${basePrompt}${conversationContext}${dynamicInstructions}\n\n${ragContext}\n\nIMPORTANT: Use the knowledge base information provided above to give accurate, evidence-based responses. Cite specific sources when available. If the knowledge base contains relevant clinical cases, reference them to support your recommendations.`
}

// ─── Stream a Single LLM Call ────────────────────────────────────────────────

interface StreamResult {
  content: string
  finishReason: string | null
}

async function streamLLMResponse(
  messages: Array<{ role: string; content: string }>,
  model: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  existingContent: string = ''
): Promise<StreamResult> {
  const stream = await createChatStream(messages as any, model)
  let content = existingContent
  let finishReason: string | null = null

  for await (const chunk of stream) {
    const data = JSON.stringify(chunk)
    try {
      const delta = chunk.choices?.[0]?.delta as Record<string, string> | undefined
      const chunkContent = delta?.content || delta?.reasoning_content || ''
      if (chunkContent) content += chunkContent

      // Capture finish reason
      const choice = chunk.choices?.[0] as unknown as Record<string, unknown> | undefined
      if (choice?.finish_reason) {
        finishReason = choice.finish_reason as string
      }
    } catch {}
    controller.enqueue(encoder.encode(`data: ${data}\n\n`))
  }

  return { content, finishReason }
}

// ─── POST Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const startTime = Date.now()

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
      persistMessage(sessionId, 'user', lastUserMessage.content, model, module, undefined)
    }

    // ─── RAG Enhancement ───────────────────────────────────────────────────

    let ragContext = ''
    let ragSources: string[] = []
    let ragResultCount = 0
    let queryIntent = 'general'

    if (enableRAG) {
      await ensureRAGInitialized()

      const searchMessage = [...messages].reverse().find(m => m.role === 'user')
      if (searchMessage) {
        try {
          const queryAnalysis = analyzeQuery(searchMessage.content)
          const intent = detectQueryIntent(searchMessage.content)
          queryIntent = intent.primaryIntent

          console.log('[Chat API] Query analysis:', {
            intent: intent.primaryIntent,
            complexity: intent.complexity,
            entities: queryAnalysis.entities.length,
            safety: queryAnalysis.requiresSafetyWarning,
          })

          const searchResults = await vectorSearch(searchMessage.content, {
            maxResults: 15,
            minRelevance: 0.20,
            includeWHO: true,
            includeAyurKnowledge: true,
            includeClinicalCases: true,
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

    let assistantContent = ''
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

          // Initial LLM call
          let result = await streamLLMResponse(systemMessages as any, model, controller, encoder, '')

          assistantContent = result.content
          let continuationCount = 0

          // Auto-continue if LLM hit token limit
          while (
            result.finishReason === 'length' &&
            continuationCount < MAX_AUTO_CONTINUATIONS
          ) {
            continuationCount++
            console.log(`[Chat API] Auto-continuing (${continuationCount}/${MAX_AUTO_CONTINUATIONS}), current length: ${assistantContent.length}`)

            // Send a marker event so the client knows continuation is happening
            const continueEvent = JSON.stringify({
              type: 'continuation',
              attempt: continuationCount,
              totalLength: assistantContent.length,
            })
            controller.enqueue(encoder.encode(`data: ${continueEvent}\n\n`))

            // Build continuation messages: original system + conversation + "continue from where you left off"
            const continueMessages = [
              ...systemMessages,
              { role: 'assistant' as const, content: assistantContent },
              { role: 'user' as const, content: 'Continue from where you left off. Do not repeat what you already wrote. Continue seamlessly.' },
            ]

            result = await streamLLMResponse(continueMessages as any, model, controller, encoder, assistantContent)
            assistantContent = result.content
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()

          // Persist complete assistant response
          if (assistantContent) {
            persistMessage(sessionId, 'assistant', assistantContent, model, module, undefined, ragSources)
          }

          console.log('[Chat API] Stream complete in', Date.now() - startTime, 'ms, length:', assistantContent.length, 'continuations:', continuationCount)
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
