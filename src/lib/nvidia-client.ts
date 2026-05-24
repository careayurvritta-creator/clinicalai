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

export interface ChatParams {
  max_tokens?: number
  temperature?: number
  top_p?: number
}

const DEFAULT_PARAMS: Required<ChatParams> = {
  max_tokens: 4096,
  temperature: 0.7,
  top_p: 0.7,
}

export async function createChatStream(
  messages: ChatMessage[],
  model: string,
  params?: ChatParams
) {
  const client = getNvidiaClient()
  const merged = { ...DEFAULT_PARAMS, ...params }

  return client.chat.completions.create({
    model,
    messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    max_tokens: merged.max_tokens,
    temperature: merged.temperature,
    top_p: merged.top_p,
    stream: true,
  }, { maxRetries: 2 })
}
