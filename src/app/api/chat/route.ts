import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createChatStream } from '@/lib/nvidia-client'
import { SYSTEM_PROMPT } from '@/lib/types'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext } from '@/lib/ayurrag/vector-rag'

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  model: z.string().default('meta/llama-3.3-70b-instruct'),
  enableRAG: z.boolean().default(true),
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, model, enableRAG } = chatRequestSchema.parse(body)

    console.log('[Chat API] Request received:', { model, messageCount: messages.length, enableRAG })

    let ragContext = ''
    
    if (enableRAG) {
      await ensureRAGInitialized()
      
      // Get the last user message for vector search
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
      if (lastUserMessage) {
        try {
          const searchResults = await vectorSearch(lastUserMessage.content, {
            maxResults: 10,
            minRelevance: 0.2,
            includeWHO: true,
            includeAyurKnowledge: true
          })
          
          if (searchResults.length > 0) {
            ragContext = formatVectorResultsForContext(searchResults)
            console.log('[Chat API] Vector RAG found', searchResults.length, 'results')
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

    console.log('[Chat API] Stream created successfully')

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
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
        { error: 'Invalid request', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('NVIDIA_API_KEY')) {
      return NextResponse.json(
        { error: 'API key not configured. Set NVIDIA_API_KEY in Vercel environment variables.' },
        { status: 500 }
      )
    }

    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}