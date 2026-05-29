# Clinical AI - Technical Deep Dive

**For Agent Reference** | Updated: May 29, 2026

---

## 1. Authentication System

### Flow Overview
```
User → Protected Route → Middleware → Check Session Cookie → 
  ├─ Valid → Allow
  └─ Invalid/Missing → Redirect /login
```

### Supabase Auth Setup
- **Browser Client:** Uses PKCE flow, stores verifier in cookies
- **Server Client:** Uses service role key for admin operations
- **Session:** Stored in both Supabase and localStorage

### Key Files
- `src/lib/supabase/client.ts` - Client creation
- `src/lib/supabase/auth.ts` - Auth helpers (requireAuth, getUserProfile)
- `src/middleware.ts` - Route protection

### Auth Helpers
```typescript
// In API routes:
const user = await requireAuth()  // Throws if not authenticated
const profile = await getUserProfile(user.id)  // Get doctor profile
```

---

## 2. Chat System Architecture

### Message Flow
```
User Input → Add to Store → API Request → 
  → RAG Enhancement (vector search)
  → NVIDIA NIM Stream → SSE → Client Update → Store Update
```

### Chat API (src/app/api/chat/route.ts)

**Request Schema:**
```typescript
{
  messages: Array<{ role: 'user'|'assistant'|'system', content: string }>
  model: string  // NVIDIA model ID
  enableRAG: boolean
  attachments?: Array<{ type: 'image'|'pdf', name: string, text?: string }>
  sessionId?: string
  module: string
}
```

**Key Features:**
1. RAG initialization (lazy, on first request)
2. Vector search for context enhancement
3. Streaming response via ReadableStream
4. Fire-and-forget message persistence
5. Conversation tracking per session

### Streaming Implementation
```typescript
// Server sends SSE format:
data: {"content": "partial", "status": "streaming"}
data: {"content": "final", "status": "complete"}
data: [DONE]
```

### Session Management
- Sessions stored in Zustand (persisted)
- Also persisted to Supabase for cross-device
- Auto-title from first user message

---

## 3. RAG (Retrieval Augmented Generation) System

### Vector RAG (src/lib/ayurrag/vector-rag.ts)

**Search Pipeline:**
1. Generate embedding via NVIDIA
2. Query pgvector for similar content
3. Fallback to full-text search if embedding fails
4. Cache results (5 min TTL, 100 entries)

**Source Tables:**
- `who_terminology` - WHO disease terms
- `diseases` - Disease database
- `herbs` - Ayurvedic herbs
- `treatments` - Treatment protocols
- `charak_chapters` - Classical text
- `sushruta_chapters` - Classical text
- `allopathy_integration` - Cross-references
- `combined_protocols` - Integrated protocols

**Search History:**
- Logged to `rag_search_history` table
- Tracks: query, results count, latency, embedding used

### Query Engine (src/lib/ayurrag/query-engine.ts)
- Analyzes user query intent
- Routes to appropriate knowledge sources
- Formats context for AI

---

## 4. Patient Management

### Patient Data Model
```typescript
interface Patient {
  id: string
  patient_code: string  // e.g., "AYUR-001"
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  email?: string
  address?: string
  created_at: string
  // Relations:
  cases?: Case[]
  documents?: PatientDocument[]
}
```

### API Endpoints
- `GET /api/patients` - List with search
- `POST /api/patients` - Create
- `GET /api/patients/[id]` - Get single
- `PUT /api/patients/[id]` - Update
- `DELETE /api/patients/[id]` - Delete

### Patient Code Generation
Auto-generated format: `AYUR-{sequential_number}`

---

## 5. Case Management

### Case Data Model
```typescript
interface Case {
  id: string
  case_number: string  // e.g., "CASE-2026-0001"
  patient_id: string
  status: 'active' | 'completed' | 'follow_up'
  provisional_diagnosis: string | null
  chief_complaints: Array<{
    complaint: string
    duration: string
    severity: number  // 1-10
  }>
  created_at: string
  updated_at: string
}
```

### Status Workflow
```
active → completed
       → follow_up → active (reactivation)
```

### Case API
- `GET /api/cases` - List with filters
- `POST /api/cases` - Create new
- `GET /api/cases/[id]` - Get with patient data
- `PUT /api/cases/[id]` - Update

---

## 6. Document Management

### Storage Architecture
```
Bucket: patient-documents
└── {clinicalId}_{patientName}/
    └── {categoryId}/
        └── {date}_{filename}
```

### Upload Flow
1. Client uploads to `/api/patient-documents`
2. Server validates file type/size
3. Upload to Supabase Storage
4. Create metadata record in `patient_documents` table
5. Return document info

### Download Flow
1. Request `/api/patient-documents?patientId=X&category=Y`
2. Server fetches metadata
3. Generate signed URL (1 hour expiry)
4. Return URL to client

### File Processing
- PDFs: Text extraction for AI analysis
- Images: Base64 encoding for AI vision
- Max size: 50MB

---

## 7. Treatment Protocol Generation

### Input Data
- Patient demographics
- Chief complaints
- Case history
- Investigation results
- AI chat context

### Output Format
Markdown document with:
- Patient summary
- Diagnosis (Ayurvedic + modern)
- Treatment principles
- Medicines (with dosages)
- Panchakarma procedures
- Diet recommendations
- Lifestyle modifications
- Follow-up plan

### API: POST /api/treatment-protocol
```typescript
Request: {
  patientId: string
  caseId: string
  chiefComplaints: string[]
  diagnosis?: string
  chatHistory?: Message[]
  investigations?: string  // OCR'd text
}
Response: Markdown protocol document
```

---

## 8. Diet Chart Generation

### API: POST /api/diet-chart
Generates personalized diet based on:
- Prakriti (body constitution)
- Disease condition
- Season (Ritucharya)
- Patient preferences

### Output Sections
- Morning routine (Dinacharya)
- Meal schedule
- Food recommendations
- Foods to avoid
- Home remedies

---

## 9. Investigation Analysis

### API: POST /api/analyze-investigation
Accepts:
- PDF reports
- Image uploads
- Raw text input

Returns:
- Key findings summary
- Abnormal values highlighted
- Possible diagnoses
- Recommendations for further tests

---

## 10. Diagnosis Engine

### Rule-Based Matching (src/lib/diagnosis-engine.ts)

**Symptom Weights:**
```typescript
const SYMPTOM_WEIGHTS = {
  joint_pain: { weight: 3, diseases: ['Sandhi Vata', 'Amavata'] },
  polyuria: { weight: 3, diseases: ['Prameha'] },
  // ...
}
```

**Dosha Detection:**
- Vata signs: pain, dry, constipation, anxiety
- Pitta signs: burning, heat, inflammation, acidity
- Kapha signs: heavy, congestion, swelling, lethargy

**Output:**
```typescript
interface DiagnosisResult {
  primary: DiagnosisMatch  // Highest probability
  differentials: DiagnosisMatch[]  // Other possibilities
  reasoning: string
  needsMoreQuestions: boolean
  suggestedQuestions: string[]
}
```

---

## 11. AI Models Configuration

### Available Models (NVIDIA NIM)
| Model ID | Name | Context | Best For |
|----------|------|---------|----------|
| mistralai/mistral-large-3-675b-instruct-2512 | Mistral Large 3 | 128K | Clinical decisions |
| qwen/qwen3-coder-480b-a35b-instruct | Qwen 3 Coder | 128K | Complex reasoning |
| nvidia/llama-3.3-nemotron-super-49b-v1.5 | Nemotron Super | 128K | Fast queries |
| qwen/qwen3.5-397b-a17b | Qwen 3.5 | 128K | Deep analysis |
| meta/llama-3.3-70b-instruct | Llama 3.3 | 128K | General purpose |
| deepseek-ai/deepseek-v4-flash | DeepSeek V4 | 128K | Fast reasoning |

### Default Parameters
```typescript
{
  max_tokens: 8192,
  temperature: 0.7,
  top_p: 0.7
}
```

---

## 12. Rate Limiting

### Limits (per IP per minute)
| Endpoint | Limit |
|----------|-------|
| /api/chat | 20 |
| /api/intake | 30 |
| /api/treatment-protocol | 10 |
| /api/vision | 10 |
| /api/pdf | 15 |
| /api/analyze-investigation | 15 |
| Default API | 60 |

### Implementation
- In-memory Map for rate tracking
- Cleanup every 60 seconds
- Returns 429 with Retry-After header

---

## 13. Zustand Store Structure

```typescript
interface ChatState {
  // Messages
  messages: Message[]
  messagesByModule: Record<string, Message[]>
  
  // UI State
  isStreaming: boolean
  streamingModule: string | null
  activeModule: string
  selectedModel: string
  
  // Sessions
  activeSessionId: string | null
  sessions: Record<string, ChatSession>
  
  // Canvas
  canvasContent: string
  canvasTimestamp: number
  
  // Draft
  chatInputDraft: string
}
```

### Persistence
- Zustand persist middleware
- localStorage storage adapter
- JSON serialization

---

## 14. Component Architecture

### AppLayout
- Desktop sidebar (collapsible)
- Mobile bottom nav
- Header bar with search
- Toast notifications

### ChatPanel
- Message list with auto-scroll
- Streaming animation
- Attachment preview
- Model selector dropdown

### CanvasPanel
- Rich text editing (contenteditable)
- Toolbar for formatting
- Auto-save to store

### ResizableLayout
- React Resizable Panels
- Drag to resize
- Collapse panels

---

## 15. Supabase Database Schema

### Key Tables
```sql
-- Patients
patients (id, patient_code, name, age, gender, phone, email, address, created_at)

-- Cases
cases (id, case_number, patient_id, status, provisional_diagnosis, 
       chief_complaints, created_at, updated_at)

-- Conversations
conversations (id, session_id, module, ai_model, doctor_id, created_at, updated_at)

-- Messages
messages (id, conversation_id, role, content, status, model_used, created_at)

-- Documents
patient_documents (id, patient_id, case_id, category, filename, storage_path, 
                   file_type, file_size, uploaded_by, created_at)

-- RAG
knowledge_base (id, source_table, content, embedding, metadata)
rag_search_history (id, query, query_type, results_count, latency_ms, embedding_used)
```

### Row Level Security
- Patients: Doctors see only their patients
- Cases: Linked to patients
- Documents: Access via patient relationship

---

## 16. Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# NVIDIA
NVIDIA_API_KEY=nvapi-...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 17. Deployment Notes

### Vercel Configuration
- Framework: Next.js
- Build command: `npm run build`
- Environment variables in Vercel dashboard
- Edge runtime for middleware

### Supabase Setup
1. Create project
2. Run migrations (supabase/migrations/)
3. Enable Row Level Security
4. Create storage bucket
5. Configure auth (PKCE)

---

## 18. Common Patterns

### API Route Pattern
```typescript
export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await req.json()
    const validated = schema.parse(body)
    // Process...
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
```

### Client Component Pattern
```typescript
'use client'
import { useState, useEffect, useCallback } from 'react'

export default function Page() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return <div>...</div>
}
```

### Server Component Pattern
```typescript
import { createServerClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const supabase = createServerClient()
  const { data } = await supabase.from('patients').select()
  return <div>...</div>
}
```

---

*End of Technical Documentation*