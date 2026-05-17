import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createChatStream } from '@/lib/nvidia-client'
import { SYSTEM_PROMPT } from '@/lib/types'

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    })
  ),
  model: z.string().default('meta/llama-3.3-70b-instruct'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, model } = chatRequestSchema.parse(body)

    const systemMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
    ]

    const stream = await createChatStream(systemMessages as any, model)

    return new Response(stream.toReadableStream() as any, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 }
      )
    }

    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
