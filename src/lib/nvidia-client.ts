import 'server-only'
import OpenAI from 'openai'
import { getNvidiaApiKey, NVIDIA_BASE_URL } from '@/server/api-key'

let client: OpenAI | null = null
let cachedApiKey: string | null = null

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
}

/**
 * Returns a singleton OpenAI client. If the API key changes at runtime,
 * the client is invalidated and re-created on the next call.
 */
export function getNvidiaClient(): OpenAI {
  const apiKey = getNvidiaApiKey()

  // Invalidate stale client if the key changed
  if (client && cachedApiKey !== apiKey) {
    console.warn('[NVIDIA] API key changed, invalidating client singleton')
    client = null
  }

  if (!client) {
    client = new OpenAI({
      baseURL: NVIDIA_BASE_URL,
      apiKey,
    })
    cachedApiKey = apiKey
  }
  return client
}

export interface ChatParams {
  max_tokens?: number
  temperature?: number
  top_p?: number
}

const DEFAULT_PARAMS: Required<ChatParams> = {
  max_tokens: 8192,
  temperature: 0.7,
  top_p: 0.7,
}

/** Set of known valid model IDs for validation (mirrors MODELS in types.ts) */
const VALID_MODELS = new Set([
  'mistralai/mistral-large-3-675b-instruct-2512',
  'qwen/qwen3-coder-480b-a35b-instruct',
  'nvidia/llama-3.3-nemotron-super-49b-v1.5',
  'qwen/qwen3.5-397b-a17b',
  'meta/llama-3.3-70b-instruct',
  'mistralai/mistral-nemotron',
])

function validateModel(model: string): void {
  if (!model || typeof model !== 'string') {
    throw new Error('[NVIDIA] Model must be a non-empty string')
  }
}

/**
 * Creates a chat completion stream.
 * Uses the OpenAI SDK's built-in retry (maxRetries: 3) which correctly
 * applies exponential backoff for transient errors (5xx, network) but
 * does NOT retry on client errors (401, 429, etc.) — avoiding rate limit
 * amplification that our own retry loop would cause.
 */
export async function createChatStream(
  messages: ChatMessage[],
  model: string,
  params?: ChatParams
) {
  validateModel(model)

  const client = getNvidiaClient()
  const merged = { ...DEFAULT_PARAMS, ...params }

  return client.chat.completions.create(
    {
      model,
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      max_tokens: merged.max_tokens,
      temperature: merged.temperature,
      top_p: merged.top_p,
      stream: true,
    },
    { maxRetries: 3 }
  )
}
