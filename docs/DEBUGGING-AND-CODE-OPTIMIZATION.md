# Debugging & Code Optimization Guide
## Ayurveda Clinical AI Application

> **Last Updated:** June 1, 2026  
> **Tech Stack:** Next.js 15, React 19, TypeScript, Zustand, Supabase, NVIDIA NIM API

---

## Table of Contents

1. [Development Environment Setup](#1-development-environment-setup)
2. [Common Debugging Techniques](#2-common-debugging-techniques)
3. [API Route Debugging](#3-api-route-debugging)
4. [Client-Side Debugging](#4-client-side-debugging)
5. [Database & Supabase Debugging](#5-database--supabase-debugging)
6. [Google Drive Debugging](#6-google-drive-debugging)
7. [RAG System Debugging](#7-rag-system-debugging)
8. [LLM Streaming Debugging](#8-llm-streaming-debugging)
9. [Performance Optimization](#9-performance-optimization)
10. [Memory & State Management](#10-memory--state-management)
11. [Error Handling Patterns](#11-error-handling-patterns)
12. [Production Debugging](#12-production-debugging)

---

## 1. Development Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NVIDIA NIM API (for LLM streaming)
NVIDIA_API_KEY=your_nvidia_api_key

# NCBI API Key (for PubMed research - optional, 10 req/s vs 3 without)
NCBI_API_KEY=your_ncbi_api_key

# Google Drive Integration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_SERVICE_ACCOUNT_KEY=your_service_account_json_key
GOOGLE_DRIVE_SHARE_EMAIL=care.ayurvritta@gmail.com
```

### Running the Development Server

```bash
# Standard development
npm run dev

# With debugging enabled
DEBUG=* npm run dev

# Build for production
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### VS Code Debug Configuration

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js Debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["next", "dev", "--inspect"],
      "port": 9229,
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 2. Common Debugging Techniques

### Console Logging Strategy

The codebase uses structured logging prefixes. Use these consistently:

```typescript
// API routes - use [ModuleName] prefix
console.log('[Chat API] Processing request:', { sessionId, model })
console.error('[Chat API] RAG initialization failed:', error)

// Client components - use descriptive context
console.log('[CaseCollector] Wizard phase changed:', { from: phase, to: newPhase })

// Store actions - log state transitions
console.log('[ChatStore] Messages trimmed:', { before: oldLength, after: newLength })
```

### Using Zustand DevTools

The store is configured with devtools for state inspection:

```typescript
// In chat-store.ts, the store already supports devtools
export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      // ... store implementation
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Access store in browser console:
// 1. Install Zustand DevTools extension
// 2. Open Redux DevTools to inspect state
```

### React DevTools Debugging

```tsx
// Add displayName to components for easier debugging in DevTools
CaseCollectorChat.displayName = 'CaseCollectorChat'
WizardHeader.displayName = 'WizardHeader'

// Use name property in key props for better component tree
{questions.map((q) => (
  <QuestionField key={q.id} question={q} />
))}
```

---

## 3. API Route Debugging

### Chat API (`/api/chat/route.ts`)

**Common Issues & Solutions:**

#### Issue: RAG Not Initializing

```typescript
// The code uses lazy initialization
let ragInitialized = false

async function ensureRAGInitialized() {
  if (!ragInitialized) {
    try {
      await initializeVectorRAG()
      ragInitialized = true
    } catch (error) {
      console.error('[Chat API] RAG initialization failed:', error)
      // RAG will be skipped, chat still works
    }
  }
}

// Debug: Check if vector-rag.ts is properly exporting
// src/lib/ayurrag/vector-rag.ts should export:
// - initializeVectorRAG
// - vectorSearch
// - formatVectorResultsForContext
// - detectQueryIntent
```

#### Issue: Streaming Not Working

```typescript
// Check if streamWithAutoContinuation is properly imported
import { streamWithAutoContinuation } from '@/lib/llm-stream-utils'

// Verify the function exists and is exported from llm-stream-utils.ts
// The function should handle:
// - Stream reading
// - Auto-continuation for long responses
// - Error handling
```

#### Issue: Message Persistence Failing

```typescript
// Check Supabase connection
async function persistMessage(opts) {
  const supabase = createServerClient()
  
  // Debug: Check if client is created
  if (!supabase) {
    console.error('[Chat API] Failed to create Supabase client')
    return
  }
  
  // Check table permissions in Supabase
  // Ensure RLS policies allow the operation
}
```

### Debugging API Routes

```typescript
// Add request/response logging
export async function POST(req: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body = await req.json()
    console.log('[Chat API] Request:', {
      messageCount: body.messages?.length,
      model: body.model,
      enableRAG: body.enableRAG,
    })
    
    // ... process request
    
    console.log('[Chat API] Response time:', Date.now() - startTime, 'ms')
  } catch (error) {
    console.error('[Chat API] Error:', error)
    throw error
  }
}
```

---

## 4. Client-Side Debugging

### Zustand Store Debugging

```typescript
// In browser console, access store directly
import { useChatStore } from '@/stores/chat-store'

// Get current state
const state = useChatStore.getState()
console.log('Current messages:', state.messages)
console.log('Active session:', state.activeSessionId)
console.log('Streaming:', state.isStreaming)

// Subscribe to changes
const unsubscribe = useChatStore.subscribe(
  (state) => state.messages,
  (messages, prevMessages) => {
    console.log('Messages changed:', {
      added: messages.length - prevMessages.length,
      total: messages.length
    })
  }
)

// Cleanup
unsubscribe()
```

### Chat Component Debugging

**CaseCollectorChat.tsx** - Common issues:

```typescript
// Issue: Wizard phase not transitioning
// Check the phase state machine
type Phase = 'wizard' | 'review' | 'followup' | 'diagnosis' | 'protocol'

// Valid transitions:
// wizard -> review (onSubmit)
// review -> wizard (onEdit) or diagnosis (onConfirm)
// diagnosis -> protocol (onGenerateProtocol)

// Debug: Add phase transition logging
function handlePhaseChange(newPhase: Phase) {
  console.log('[CaseCollector] Phase transition:', { from: phase, to: newPhase })
  setPhase(newPhase)
}
```

### Message Streaming Debugging

```typescript
// In MessageBubble.tsx, check streaming state
{message.status === 'streaming' && (
  <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
)}

// Debug: Check if status updates are happening
useEffect(() => {
  console.log('[MessageBubble] Status:', message.status, 'Content length:', message.content.length)
}, [message.status, message.content])
```

---

## 5. Database & Supabase Debugging

### Supabase Client Debugging

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Browser client — uses cookies for PKCE verifier storage (SSR auth flow)
// Uses a Proxy to lazy-initialize on first access
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      _supabase = createBrowserClient(supabaseUrl, supabaseKey)
    }
    return (_supabase as unknown as Record<string, unknown>)[prop as string]
  },
})

// Service role client for server-side operations (API routes, admin)
// Uses SUPABASE_SERVICE_ROLE_KEY — NOT the anon/publishable key
// No cookie handling needed — service role bypasses RLS
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
```

### Common Supabase Issues

#### Issue: RLS Policy Denying Access

```sql
-- Check existing policies in Supabase dashboard
-- Or run in SQL editor:

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'messages';

-- Common fix: Create permissive policy
CREATE POLICY "Allow all access to messages"
ON messages
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

#### Issue: Vector Search Not Working

```sql
-- Check if pgvector extension is enabled
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';

-- Check vector dimension matches your embeddings
SELECT attname, atttypid::regtype
FROM pg_attribute
WHERE attrelid = 'knowledge_base'::regclass AND attnum > 0;

-- Common fix: Recreate table with correct dimension
-- The code uses 1024-dimensional embeddings
```

### Database Migration Debugging

```bash
# Check migration status
npx supabase migration list

# Apply pending migrations
npx supabase db push

# Reset database (⚠️ destructive)
npx supabase db reset
```

---

## 6. Google Drive Debugging

### Drive Client (`/lib/google-drive/client.ts`)

```typescript
// Two auth modes: Service Account (primary) and OAuth (per-user)
// Service account uses GOOGLE_SERVICE_ACCOUNT_KEY env var (JSON string)
// OAuth uses GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET

// Debug: Check service account client
import { getDriveClients } from '@/lib/google-drive/client'
const { drive, sheets, docs } = getDriveClients('service-account')

// Verify connection
const about = await drive.about.get({ fields: 'user' })
console.log('[Drive] Authenticated as:', about.data.user?.emailAddress)
```

### Patient Folder Issues

```typescript
// Issue: Folder not visible on care.ayurvritta@gmail.com
// Check: GOOGLE_DRIVE_SHARE_EMAIL is set in .env.local
// Check: ensureShared() is called in getOrCreateRootFolder()
// Fix: Root folder must be shared — child folders inherit sharing

// Issue: Folder naming wrong
// Expected format: "UHID_FirstName LastName" (e.g., "UHID-2605001_John Doe")
// Check: getOrCreatePatientFolder() receives uhid parameter
// Check: listPatientsFromDrive() parses both new and legacy formats

// Issue: Patient list empty
// Check: Root folder "Clinical AI" exists
// Check: Folders are not trashed (trashed=false in query)
// Check: Service account has access to the root folder
```

### Folder CRUD API (`/api/drive/patients`)

```typescript
// GET — List patients (with search/pagination)
// POST — Create patient (Supabase + Drive folder + link)
// PATCH — Rename folder (body: { folderId, newName })
// DELETE — Delete folder (query: ?folderId=xxx)

// Debug: Check folder creation flow
const response = await fetch('/api/drive/patients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ patientName: 'John Doe' }),
})
// Should return: { folderId, categoryFolders, clinicalId, uhid, patient }
```

---

## 7. RAG System Debugging

### Vector RAG (`/lib/ayurrag/vector-rag.ts`)

**Debugging Steps:**

```typescript
// 1. Check if initialization completes
async function initializeVectorRAG() {
  console.log('[VectorRAG] Initializing...')
  // Should connect to Supabase
  // Should load existing embeddings
}

// 2. Check search results — uses multi-query semantic search, NOT a single RPC call
async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 15,
    minRelevance: 0.20,
    includeWHO: true,
    includeAyurKnowledge: true,
    includeClinicalCases: true,
  }
): Promise<VectorSearchResult[]> {
  console.log('[VectorRAG] Searching:', query)

  // Phase 1: Expand query into multiple search queries based on intent
  const intent = detectQueryIntent(query)
  const expandedQueries = expandQuery(query, intent)

  // Phase 2: Generate embeddings for top 3 queries (original + 2 expansions)
  const queriesToEmbed = expandedQueries.slice(0, 3)
  const embeddings = await Promise.all(
    queriesToEmbed.map(q => generateSearchEmbedding(q).catch(() => null))
  )

  // Phase 3: Run semantic searches in parallel, then full-text fallback
  // Results are deduplicated and ranked by relevance
  console.log('[VectorRAG] Results:', results.length)
  return results
}
```

### Query Engine (`/lib/ayurrag/query-engine.ts`)

```typescript
// Check intent detection
import { detectQueryIntent } from '@/lib/ayurrag/vector-rag'

const intent = detectQueryIntent(userQuery)
console.log('[QueryEngine] Detected intent:', intent)

// Common intents:
// - diagnosis, treatment, herb, drug_interaction
// - prakriti, integration, general, procedure
// - diet, research, surgery, explanation
// - terminology, modern_medicine
```

### Embedding Issues

```typescript
// src/lib/embedding-client.ts
// Check if embeddings are generated correctly

async function generateEmbedding(text: string): Promise<number[]> {
  // Should use OpenAI or NVIDIA for embedding generation
  // Check API key is set
  console.log('[Embedding] Generating for:', text.substring(0, 50))
  
  // Verify dimension (should be 1024 for Supabase vector search)
  const embedding = await getEmbeddingFromAPI(text)
  console.log('[Embedding] Dimension:', embedding.length)
  return embedding
}
```

---

## 7. LLM Streaming Debugging

### NVIDIA Client (`/lib/nvidia-client.ts`)

```typescript
// Check client initialization
// Imports getNvidiaApiKey and NVIDIA_BASE_URL from '@/server/api-key'
export function getNvidiaClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      baseURL: NVIDIA_BASE_URL, // 'https://integrate.api.nvidia.com/v1'
      apiKey: getNvidiaApiKey(),
    })
  }
  return client
}

// Debug: Test connection
// Default model: 'mistralai/mistral-large-3-675b-instruct-2512' (from llm-stream-utils.ts)
// Available models defined in src/lib/types.ts MODELS array
async function testConnection() {
  const client = getNvidiaClient()
  const response = await client.chat.completions.create({
    model: 'mistralai/mistral-large-3-675b-instruct-2512',
    messages: [{ role: 'user', content: 'Hello' }],
    max_tokens: 10,
  })
  console.log('[NVIDIA] Connection test:', response.choices[0].message.content)
}
```

### Stream Processing

```typescript
// src/lib/llm-stream-utils.ts
// Check auto-continuation logic

export async function streamWithAutoContinuation(
  initialMessages: Array<{ role: string; content: string }>,
  model: string,
  controller: ReadableStreamDefaultController<Uint8Array>,
  encoder: TextEncoder,
  maxContinuations: number,
  continuationPrompt?: string,
  options?: { max_tokens?: number; temperature?: number; top_p?: number }
): Promise<{ content: string; continuationCount: number }> {
  let result = await streamLLMResponse(initialMessages, model, controller, encoder, '', options)
  let assistantContent = result.content
  let continuationCount = 0

  // Auto-continue when finishReason is 'length' (hit token limit)
  while (result.finishReason === 'length' && continuationCount < maxContinuations) {
    continuationCount++
    console.log(`[LLM] Auto-continuing (${continuationCount}/${maxContinuations})`)

    // Send continuation marker to client
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'continuation', attempt: continuationCount })}\n\n`))

    // Send only last 4000 chars to avoid token overflow
    const tailContent = assistantContent.length > 4000 ? assistantContent.slice(-4000) : assistantContent
    const continueMessages = [
      ...initialMessages,
      { role: 'assistant', content: tailContent },
      { role: 'user', content: continuationPrompt || 'Continue from where you left off.' },
    ]

    result = await streamLLMResponse(continueMessages, model, controller, encoder, assistantContent, options)
    assistantContent = result.content
  }

  return { content: assistantContent, continuationCount }
}
```

### Common Streaming Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Stream hangs | API timeout | Check `maxRetries: 2` in `createChatStream` |
| Chunks missing | Network interruption | Add reconnection logic |
| Incomplete response | Token limit | Auto-continuation handles this (max 3 attempts) |
| Wrong model | Model ID mismatch | Check model IDs in `src/lib/types.ts` MODELS array |

---

## 8. Performance Optimization

### React Component Optimization

```typescript
// Memoize expensive computations
import { useMemo, useCallback } from 'react'

// Bad: Recalculates on every render
const filteredMessages = messages.filter(m => m.role === 'user')

// Good: Memoize filtered results
const filteredMessages = useMemo(
  () => messages.filter(m => m.role === 'user'),
  [messages]
)

// Good: Memoize callbacks
const handleSendMessage = useCallback((content: string) => {
  addMessage({ id: generateId(), role: 'user', content, timestamp: Date.now() })
}, [addMessage])
```

### Zustand Store Optimization

```typescript
// Subscribe to specific slices, not entire store
// Bad: Re-renders on any store change
const messages = useChatStore(state => state.messages)

// Good: Subscribe to specific properties
const messages = useChatStore(state => state.messages)
const isStreaming = useChatStore(state => state.isStreaming)

// Better: Destructure specific slices to minimize re-renders
const messages = useChatStore(state => state.messages)
const isStreaming = useChatStore(state => state.isStreaming)
```

### API Route Optimization

```typescript
// RAG has its own in-memory cache in vector-rag.ts — do NOT wrap with unstable_cache
// The cache key is built from query + config params and invalidated on new searches

// Use streaming responses for LLM
export async function GET(req: NextRequest) {
  const stream = await createChatStream(messages, model)
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
```

### Database Query Optimization

```typescript
// Use select to limit columns
const { data } = await supabase
  .from('messages')
  .select('id, content, role, created_at') // Only needed columns
  .eq('conversation_id', sessionId)
  .order('created_at', { ascending: true })
  .limit(100)

// Use indexes (add to migrations if missing)
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

### Bundle Size Optimization

```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('@/components/documents/EmbeddedEditor'),
  { 
    loading: () => <Skeleton />,
    ssr: false // Disable SSR for client-only components
  }
)

// Tree-shake unused imports
// Bad: import { cloneDeep } from 'lodash'
// Good: import cloneDeep from 'lodash/cloneDeep'
// Best: Use native methods when possible
```

---

## 9. Memory & State Management

### Message Store Memory Issues

```typescript
// src/stores/chat-store.ts - Current implementation limits messages
const MAX_MESSAGES = 200

function trimMessages(messages: Message[]): Message[] {
  if (messages.length <= MAX_MESSAGES) return messages
  return messages.slice(-MAX_MESSAGES) // Keep only last 200
}

// If you need more messages, adjust this limit
const MAX_MESSAGES = 500 // Increase if needed
```

**Store locations:**
- `src/stores/chat-store.ts` — Chat messages, sessions, streaming state
- `src/lib/stores/document-store.ts` — Documents mode state (patient, folders, files)
- `src/lib/stores/protocol-store.ts` — Treatment protocol state

### Canvas Content Memory

```typescript
// Canvas content is stored in memory
canvasContent: string
canvasTimestamp: number

// Large canvas content can cause issues
// Consider implementing lazy loading or compression
const MAX_CANVAS_SIZE = 1000000 // 1MB limit
if (content.length > MAX_CANVAS_SIZE) {
  console.warn('[ChatStore] Canvas content exceeds limit')
}
```

### Session Management

```typescript
// Sessions are persisted to localStorage
// Large session history can slow down the app

interface ChatSession {
  id: string
  title: string
  module: string
  messages: Message[] // This can grow large
  createdAt: number
  updatedAt: number
}

// Consider implementing session archival
async function archiveOldSessions(daysOld: number = 90) {
  const cutoff = Date.now() - daysOld * 24 * 60 * 60 * 1000
  const sessions = useChatStore.getState().sessions
  
  for (const [id, session] of Object.entries(sessions)) {
    if (session.updatedAt < cutoff) {
      // Archive to database, remove from localStorage
      await persistSessionToArchive(session)
      useChatStore.getState().deleteSession(id)
    }
  }
}
```

---

## 10. Error Handling Patterns

### API Route Error Handling

```typescript
// Standard error response pattern
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate with Zod
    const parsed = chatRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.issues },
        { status: 400 }
      )
    }
    
    // Process request
    const response = await processChatRequest(parsed.data)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('[Chat API] Unhandled error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Client-Side Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx
// Already implemented - wraps critical components

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
    // Report to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}
```

### LLM Error Handling

```typescript
// Handle API errors gracefully
async function callLLM(messages: ChatMessage[]) {
  try {
    const stream = await createChatStream(messages, model)
    return stream
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('[LLM] API Error:', error.status, error.message)
      if (error.status === 429) {
        // Rate limited - wait and retry
        await sleep(5000)
        return callLLM(messages)
      }
    }
    throw error
  }
}
```

---

## 11. Production Debugging

### Logging Strategy

```typescript
// Use environment-aware logging
const isProduction = process.env.NODE_ENV === 'production'

function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  if (isProduction) {
    // Send to logging service (e.g., Sentry, Datadog)
    // Example: Sentry.captureMessage(message, { level, extra: data })
  } else {
    console[level](`[${level.toUpperCase()}]`, message, data ?? '')
  }
}
```

### Health Checks

> **Note:** This endpoint does not exist yet. Below is a suggested implementation.

```typescript
// Suggested: src/app/api/health/route.ts
export async function GET() {
  const checks = {
    supabase: false,
    nvidia: false,
    rag: false,
  }

  try {
    const supabase = createServerClient()
    const { error } = await supabase.from('conversations').select('id').limit(1)
    checks.supabase = !error
  } catch (e) {
    checks.supabase = false
  }

  try {
    const client = getNvidiaClient()
    await client.models.list()
    checks.nvidia = true
  } catch (e) {
    checks.nvidia = false
  }

  const allHealthy = Object.values(checks).every(Boolean)

  return NextResponse.json(
    { status: allHealthy ? 'healthy' : 'degraded', checks },
    { status: allHealthy ? 200 : 503 }
  )
}
```

### Performance Monitoring

```typescript
// Add to API routes
export async function POST(req: NextRequest) {
  const startTime = Date.now()
  const requestId = crypto.randomUUID()
  
  try {
    // ... process request
    
    const duration = Date.now() - startTime
    console.log(`[${requestId}] Request completed in ${duration}ms`)
    
    // Alert if slow
    if (duration > 5000) {
      console.warn(`[${requestId}] Slow request detected: ${duration}ms`)
    }
  } finally {
    // Always log completion
    console.log(`[${requestId}] Request finished`)
  }
}
```

### Common Production Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| RAG timeout | Slow first response | Pre-initialize RAG on startup |
| Memory leak | Increasing memory | Check store subscriptions |
| Token limit | Incomplete responses | Implement auto-continuation |
| Rate limiting | 429 errors | Add retry with backoff |
| Connection pool | Database errors | Check Supabase connection limits |

---

## Quick Reference

### Debug Commands

```bash
# Check TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint

# Check build
npm run build

# View Supabase logs
npx supabase logs

# Test API endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Key Files to Debug

| File | Purpose | Common Issues |
|------|---------|---------------|
| `src/stores/chat-store.ts` | Message & session state | Memory leaks, stale state |
| `src/lib/stores/document-store.ts` | Documents mode state | Patient selection, breadcrumbs |
| `src/lib/stores/protocol-store.ts` | Treatment protocol state | Protocol generation |
| `src/lib/nvidia-client.ts` | LLM API client | API key, connection |
| `src/lib/llm-stream-utils.ts` | Stream processing, auto-continuation | Incomplete responses, token limits |
| `src/lib/ayurrag/vector-rag.ts` | RAG search (multi-query semantic) | Embedding dimension, cache |
| `src/lib/google-drive/folders.ts` | Patient folder CRUD | UHID naming, Drive sharing |
| `src/app/api/chat/route.ts` | Chat endpoint | Request validation |
| `src/app/api/drive/patients/route.ts` | Patient folder API | Drive auth, folder creation |
| `src/components/documents/PatientSidebar.tsx` | Patient list UI | Drive patient loading |

### Emergency Fixes

```typescript
// If RAG is causing issues, disable it temporarily
const response = await streamWithAutoContinuation(
  messages,
  model,
  { enableRAG: false } // Disable RAG
)

// If streaming fails, fall back to non-streaming
// Use getNvidiaClient() directly for non-streaming completions
const client = getNvidiaClient()
const response = await client.chat.completions.create({ model, messages, stream: false })

// If Supabase fails, use local storage only
// (Already handled by Zustand persist middleware)
```

---

*End of Debugging & Code Optimization Guide*