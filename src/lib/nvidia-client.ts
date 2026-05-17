import 'server-only'
import OpenAI from 'openai'
import { getNvidiaApiKey, NVIDIA_BASE_URL } from '@/server/api-key'

let client: OpenAI | null = null

export function getNvidiaClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: NVIDIA_BASE_URL,
      apiKey: getNvidiaApiKey(),
    })
  }
  return client
}

export async function createChatStream(
  messages: Array<{ role: string; content: string | Array<{ type: string; text?: string; image_url?: { url: string } }> }>,
  model: string
) {
  const client = getNvidiaClient()

  return client.chat.completions.create({
    model,
    messages: messages as any,
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 0.7,
    stream: true,
  })
}
