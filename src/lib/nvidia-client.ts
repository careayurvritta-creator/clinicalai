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

/** Set of known valid model IDs for validation */
const VALID_MODELS = new Set([
  'mistralai/mistral-large-3-675b-instruct-2512',
])

function validateModel(model: string): void {
  if (!model || typeof model !== 'string') {
    throw new Error('[NVIDIA] Model must be a non-empty string')
  }
  // Warn if model is not in our known set (don't block — new models may be added)
  if (VALID_MODELS.size > 0 && !VALID_MODELS.has(model)) {
    console.warn(`[NVIDIA] Model "${model}" is not in known models list. Proceeding anyway.`)
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Creates a chat completion stream with exponential backoff retry.
 */
export async function createChatStream(
  messages: ChatMessage[],
  model: string,
  params?: ChatParams,
  retries = 3
) {
  validateModel(model)

  const merged = { ...DEFAULT_PARAMS, ...params }
  let lastError: Error | null = null

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const client = getNvidiaClient()
      return client.chat.completions.create(
        {
          model,
          messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
          max_tokens: merged.max_tokens,
          temperature: merged.temperature,
          top_p: merged.top_p,
          stream: true,
        },
        { maxRetries: 1 }
      )
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      const isRateLimit = lastError.message.toLowerCase().includes('rate')
      const isLastAttempt = attempt === retries - 1

      if (isLastAttempt) {
        console.error(`[NVIDIA] All ${retries} attempts failed:`, lastError.message)
        throw lastError
      }

      const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500
      console.warn(
        `[NVIDIA] Attempt ${attempt + 1}/${retries} failed${isRateLimit ? ' (rate limit)' : ''}: ` +
        `${lastError.message}. Retrying in ${Math.round(backoffMs)}ms...`
      )
      await sleep(backoffMs)
    }
  }

  // This should never be reached due to the throw above, but TypeScript needs it
  throw lastError ?? new Error('[NVIDIA] createChatStream failed unexpectedly')
}
