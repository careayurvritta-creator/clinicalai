export interface Attachment {
  type: 'image' | 'pdf'
  name: string
  preview?: string
  text?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  status: 'complete' | 'streaming' | 'error'
  attachments?: Attachment[]
}

export interface ChatState {
  messages: Message[]
  isStreaming: boolean
  selectedModel: string
  canvasContent: string
}

export interface ModelOption {
  id: string
  name: string
  description: string
  context: string
}

export const MODELS: ModelOption[] = [
  {
    id: 'meta/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    description: 'Best for clinical reasoning',
    context: '128K',
  },
  {
    id: 'nvidia/nemotron-3-super-120b-a12b',
    name: 'Nemotron 3 Super 120B',
    description: 'Long context (1M tokens)',
    context: '1M',
  },
  {
    id: 'meta/llama-3.2-90b-vision-instruct',
    name: 'Llama 3.2 90B Vision',
    description: 'Image analysis',
    context: '128K',
  },
  {
    id: 'nvidia/nemotron-nano-9b-v2',
    name: 'Nemotron Nano 9B',
    description: 'Fast, low cost',
    context: '128K',
  },
]

export const DEFAULT_MODEL = MODELS[0].id

export const SYSTEM_PROMPT = `You are Clinical AI, an Ayurvedic clinical assistant developed by AyurVritta Ayurveda.

Guidelines:
- Provide evidence-based Ayurvedic guidance rooted in classical texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya)
- Structure responses with clear headings, bullet points, and actionable steps
- Always include appropriate medical disclaimers
- Ask clarifying questions when information is insufficient
- Reference Ayurvedic concepts (doshas, dhatus, agni, ama, srotas) with clear explanations
- Never provide definitive diagnoses — always recommend professional consultation
- When analyzing images or documents, describe findings objectively

Response format:
- Use markdown formatting
- Start with a brief summary
- Provide detailed analysis in sections
- Include Ayurvedic perspective (dosha imbalance, dhatu involvement, agni status)
- End with recommendations and disclaimer`
