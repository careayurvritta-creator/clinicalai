# Clinical AI - Quick Reference Guide

**For Agent (NIMO) Use** | May 29, 2026

---

## 🚨 Critical Rules

1. **Always check auth** - Use `requireAuth()` in API routes
2. **Validate input** - Use Zod schemas
3. **Handle errors** - Return proper error responses
4. **Update docs** - Keep documentation in sync with changes

---

## 📁 Key File Locations

| Need | File |
|------|------|
| Types | `src/lib/types.ts` |
| Store | `src/lib/store.ts` |
| API Client | `src/lib/nvidia-client.ts` |
| Supabase | `src/lib/supabase/client.ts` |
| Auth | `src/lib/supabase/auth.ts` |
| RAG | `src/lib/ayurrag/vector-rag.ts` |
| Constants | `src/lib/constants.ts` |
| Middleware | `src/middleware.ts` |

---

## 🔧 Common Operations

### Add New API Route
```typescript
// src/app/api/feature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAuth } from '@/lib/supabase/auth'

const schema = z.object({ ... })

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await req.json()
    const data = schema.parse(body)
    // ... process
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

### Add New Component
```typescript
// src/components/NewComponent.tsx
'use client'

import { useState } from 'react'

interface Props {
  initialData?: string
}

export function NewComponent({ initialData }: Props) {
  const [state, setState] = useState(initialData)
  
  return <div>{state}</div>
}
```

### Update Store
```typescript
// In store.ts
interface NewActions {
  newAction: (param: string) => void
}

// Add implementation
newAction: (param) => set((state) => ({ ...state, newField: param }))
```

### Add New Model
```typescript
// In src/lib/types.ts MODELS array
{
  id: 'provider/model-name',
  name: 'Display Name',
  description: 'Use case',
  context: '128K',
}
```

### Add Document Category
```typescript
// In src/lib/constants.ts DOCUMENT_CATEGORIES
{ 
  slug: 'new-category', 
  label: 'Display Label', 
  icon: 'IconName',
  description: 'Description'
}
```

---

## 🗄️ Database Operations

### Query Patients
```typescript
const supabase = createServerClient()
const { data, error } = await supabase
  .from('patients')
  .select('*, cases(count)')
  .eq('id', patientId)
  .single()
```

### Insert with Return
```typescript
const { data, error } = await supabase
  .from('table')
  .insert({ ... })
  .select()
  .single()
```

### Upsert Pattern
```typescript
const { data, error } = await supabase
  .from('conversations')
  .upsert(upsertData, { onConflict: 'session_id' })
  .select('id')
  .single()
```

---

## 🤖 AI Operations

### Send Chat Request
```typescript
const stream = await createChatStream(messages, model, {
  max_tokens: 8192,
  temperature: 0.7
})

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content
  // Process...
}
```

### Vector Search
```typescript
import { vectorSearch, formatVectorResultsForContext } from '@/lib/ayurrag/vector-rag'

const results = await vectorSearch(query, { maxResults: 10 })
const context = formatVectorResultsForContext(results)
```

---

## 📝 State Management

### Use Store in Component
```typescript
import { useChatStore } from '@/lib/store'

export function MyComponent() {
  const { messages, addMessage, setStreaming } = useChatStore()
  // ...
}
```

### Persist Messages
```typescript
addMessage({
  id: crypto.randomUUID(),
  role: 'user',
  content: 'Hello',
  timestamp: Date.now(),
  status: 'complete'
})
```

---

## 🔐 Auth Pattern

### Server-Side Auth Check
```typescript
export async function GET(req: NextRequest) {
  const user = await requireAuth()
  const profile = await getUserProfile(user.id)
  // user and profile available
}
```

### Client-Side Session
```typescript
import { supabase } from '@/lib/supabase/client'

const { data: { session } } = await supabase.auth.getSession()
```

---

## 📄 Document Upload

### Storage Path Builder
```typescript
import { buildStoragePath, STORAGE_BUCKET } from '@/lib/constants'

const path = buildStoragePath(
  clinicalId,
  patientName,
  categoryId,
  filename
)
```

### Upload to Storage
```typescript
const { data, error } = await supabase.storage
  .from(STORAGE_BUCKET)
  .upload(path, file, { upsert: true })
```

---

## 🧪 Testing Checklist

Before completing any feature:
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] Auth works
- [ ] Error handling in place
- [ ] Loading states handled
- [ ] Mobile responsive
- [ ] Documentation updated

---

## 📚 Documentation Updates Required

When changing code, update:
- `docs/AGENT-NIMO-README.md` - Overview changes
- `docs/TECHNICAL-DEEP-DIVE.md` - Architecture changes
- Inline comments - Complex logic
- README.md - If user-facing features change

---

## 🔗 Useful Commands

```bash
# Development
npm run dev

# Build check
npm run build

# Lint
npm run lint

# Embed knowledge
npm run embed

# Force re-embed
npm run embed:force
```

---

## 📞 External Services

| Service | Purpose | Config |
|---------|---------|--------|
| Supabase | Database, Auth, Storage | env vars |
| NVIDIA NIM | AI Models | NVIDIA_API_KEY |
| Vercel | Hosting | vercel.json |

---

## ⚠️ Common Pitfalls

1. **Forgetting auth** - Always use `requireAuth()`
2. **Missing validation** - Use Zod schemas
3. **Memory leaks** - Clean up subscriptions
4. **Large payloads** - Stream responses
5. **Missing error handling** - Try-catch all API routes

---

*Keep this file updated as patterns evolve*