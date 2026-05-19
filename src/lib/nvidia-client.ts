import 'server-only'
import OpenAI from 'openai'
import { getNvidiaApiKey, NVIDIA_BASE_URL } from '@/server/api-key'

let client: OpenAI | null = null

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
}

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
  messages: ChatMessage[],
  model: string
) {
  const client = getNvidiaClient()

  return client.chat.completions.create({
    model,
    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 0.7,
    stream: true,
  })
}
