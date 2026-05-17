import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createChatStream } from '@/lib/nvidia-client'

const visionRequestSchema = z.object({
  imageBase64: z.string(),
  prompt: z.string().default('Describe this image in detail.'),
  model: z.string().default('meta/llama-3.2-90b-vision-instruct'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageBase64, prompt, model } = visionRequestSchema.parse(body)

    const messages = [
      {
        role: 'user' as const,
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
          },
        ],
      },
    ]

    const stream = await createChatStream(messages as any, model)

    return new Response(stream.toReadableStream() as any, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('Vision API error:', error)

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
