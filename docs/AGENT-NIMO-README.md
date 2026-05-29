# Clinical AI - AyurVritta Project Documentation

**Created:** May 29, 2026  
**Project:** Ayurvedic Clinical AI Assistant with NVIDIA NIM integration  
**Deployment:** Vercel (Frontend/API) + Supabase (Backend/Database)

---

## 📋 Project Overview

This is a full-stack Next.js application for Ayurvedic clinical practice management with AI-powered features:

1. **Patient Management** - CRUD operations for patient records
2. **Case Management** - Clinical case tracking with status workflow
3. **AI Chat Interface** - NVIDIA NIM-powered clinical assistant with RAG
4. **Document Management** - Patient document upload/retrieval via Supabase Storage
5. **Treatment Protocols** - AI-generated Ayurvedic treatment plans
6. **Diet Charts & Lifestyle Advice** - Personalized recommendations
7. **Investigation Analysis** - AI analysis of lab reports

---

## 🏗️ Architecture

### Frontend Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind CSS
- **State Management:** Zustand (persisted to localStorage)
- **Auth:** Supabase Auth with PKCE flow
- **PWA:** Service Worker + manifest.json

### Backend Stack
- **API:** Next.js Route Handlers (App Router API routes)
- **Database:** Supabase (PostgreSQL + pgvector)
- **AI:** NVIDIA NIM API (OpenAI-compatible)
- **Storage:** Supabase Storage (patient documents)
- **Auth:** Supabase Auth with middleware protection

### Key Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NVIDIA_API_KEY=
```

---

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── chat/          # AI chat endpoint
│   │   ├── patients/      # Patient CRUD
│   │   ├── cases/         # Case management
│   │   ├── patient-documents/  # Document upload/download
│   │   ├── treatment-protocol/ # Protocol generation
│   │   ├── diet-chart/   # Diet chart generation
│   │   ├── intake/        # Patient intake form
│   │   ├── analyze-investigation/ # Lab report analysis
│   │   └── vision/        # Image analysis
│   ├── patients/          # Patient pages
│   ├── cases/             # Case pages
│   └── login/             # Auth page
├── components/            # React components
│   ├── AppLayout.tsx      # Main layout shell
│   ├── ChatPanel.tsx      # AI chat interface
│   ├── CanvasPanel.tsx    # Rich text canvas
│   ├── PatientCard.tsx    # Patient list item
│   ├── CaseCard.tsx       # Case list item
│   └── ...
├── lib/                   # Core utilities
│   ├── store.ts           # Zustand state management
│   ├── types.ts           # TypeScript interfaces
│   ├── nvidia-client.ts   # NVIDIA NIM API client
│   ├── supabase/          # Supabase integration
│   │   ├── client.ts      # Browser + server clients
│   │   └── auth.ts        # Auth helpers
│   ├── ayurrag/           # RAG engine
│   │   ├── vector-rag.ts # Semantic search
│   │   └── query-engine.ts
│   ├── ayurknowledge/     # Static Ayurvedic knowledge
│   │   ├── diseases.ts   # Disease database
│   │   ├── allopathy.ts  # Allopathy integration
│   │   └── case-studies.json
│   ├── diagnosis-engine.ts # Clinical diagnosis logic
│   └── treatment-prompts.ts # AI prompt templates
├── middleware.ts          # Auth + rate limiting
└── server/
    └── api-key.ts         # NVIDIA API key management
```

---

## 🔑 Core Types (src/lib/types.ts)

```typescript
// Message structure for chat
interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  status: 'complete' | 'streaming' | 'error'
  attachments?: Attachment[]
}

// Chat session for persistence
interface ChatSession {
  id: string
  title: string
  module: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

// Available AI models (NVIDIA NIM)
const MODELS = [
  'mistralai/mistral-large-3-675b-instruct-2512',
  'qwen/qwen3-coder-480b-a35b-instruct',
  'nvidia/llama-3.3-nemotron-super-49b-v1.5',
  'qwen/qwen3.5-397b-a17b',
  'meta/llama-3.3-70b-instruct',
  // ... more models
]
```

---

## 🗄️ Database Schema (Supabase)

### Core Tables
- `patients` - Patient demographics
- `cases` - Clinical cases with status workflow
- `conversations` - Chat sessions
- `messages` - Individual chat messages
- `patient_documents` - Document metadata
- `clinical_intake` - Patient intake forms

### RAG Tables
- `knowledge_base` - Vector-embedded knowledge (pgvector)
- `who_terminology` - WHO disease terminology
- `diseases` - Disease database
- `herbs` - Ayurvedic herbs
- `treatments` - Treatment protocols
- `charak_chapters` / `sushruta_chapters` - Classical texts
- `rag_search_history` - Search analytics

---

## 🔄 State Management (Zustand Store)

The app uses Zustand with persistence for client-side state:

```typescript
// Key store slices:
- messages[]           // Current chat messages
- messagesByModule      // Messages per module (chat, intake, etc.)
- selectedModel         // Current AI model
- activeModule          // Current module (chat, documents, etc.)
- sessions             // All chat sessions
- activeSessionId      // Current session
- canvasContent        // Rich text canvas content
- isStreaming          // AI streaming state
```

### Module Types
- `chat` - General AI chat
- `intake` - Patient intake form
- `treatment` - Treatment protocol
- `diet` - Diet chart
- `lifestyle` - Lifestyle advice
- `documents` - Document upload
- `vision` - Image analysis

---

## 🤖 AI Integration

### NVIDIA NIM Client (src/lib/nvidia-client.ts)
```typescript
// Uses OpenAI SDK with NVIDIA NIM base URL
const client = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY
})

// Stream chat completions
createChatStream(messages, model, params)
```

### RAG Pipeline (src/lib/ayurrag/)
1. Query analysis via query-engine
2. Vector search via pgvector (semantic search)
3. Full-text search fallback
4. Context formatting for AI
5. Response generation via NVIDIA NIM

---

## 🔐 Authentication Flow

1. User visits protected route → Middleware checks session
2. No session → Redirect to /login
3. Login → Supabase Auth (PKCE flow)
4. Callback → /auth/callback → Set session cookie
5. Session stored in Supabase + localStorage

### Middleware Features (src/middleware.ts)
- Rate limiting per IP (e.g., /api/chat: 20 req/min)
- Auth protection for /, /cases, /patients
- CORS headers for API routes

---

## 📄 Document Management

### Storage Bucket: `patient-documents`

Path structure:
```
{clinicalId}_{patientName}/{categoryId}/{date}_{filename}
```

### Categories (src/lib/constants.ts)
- investigation-reports
- opd-consultation-sheets
- ipd-sheets
- panchakarma-notes
- prescriptions
- discharge-summaries
- etc.

### File Constraints
- Max size: 50MB
- Allowed types: PDF, JPG, PNG, WEBP, XLS, XLSX, CSV

---

## 🔧 Key API Routes

### POST /api/chat
Main AI chat endpoint with RAG enhancement.

### POST /api/treatment-protocol
Generate Ayurvedic treatment protocol from case data.

### POST /api/diet-chart
Generate personalized diet chart.

### POST /api/intake
Submit patient intake form.

### POST /api/analyze-investigation
AI analysis of uploaded lab reports.

### GET/POST /api/patient-documents
Upload/retrieve patient documents.

### GET /api/patients
List patients with search.

### GET /api/cases
List cases with filters.

---

## 🎨 UI Components

### AppLayout
Main layout with sidebar, header, mobile nav.

### ChatPanel
AI chat interface with streaming, attachments, model selector.

### CanvasPanel
Rich text editor for clinical notes.

### PatientDocuments
Document upload/download with category organization.

### ProtocolRenderer
Markdown rendering for treatment protocols.

---

## 📝 Key Files for Reference

| File | Purpose |
|------|---------|
| `src/lib/store.ts` | Zustand state management |
| `src/lib/types.ts` | TypeScript types + models |
| `src/lib/nvidia-client.ts` | AI API client |
| `src/lib/supabase/client.ts` | Database clients |
| `src/middleware.ts` | Auth + rate limiting |
| `src/app/api/chat/route.ts` | Main chat API |
| `src/lib/ayurrag/vector-rag.ts` | RAG search |
| `src/lib/diagnosis-engine.ts` | Clinical diagnosis |

---

## 🚀 Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint          # ESLint check
npm run embed         # Embed knowledge base
npm run embed:force   # Force re-embed
```

---

## 📌 Important Notes for Agent

1. **Auth Required** - Most API routes require Supabase session
2. **Rate Limiting** - Check middleware for limits per endpoint
3. **RAG Initialization** - Chat API initializes RAG on first request
4. **Streaming** - Chat uses Server-Sent Events for streaming
5. **Persistence** - Chat sessions saved to Supabase
6. **Model Selection** - User can switch between NVIDIA NIM models
7. **PWA** - Service worker for offline capability

---

## 🔗 External Integrations

- **NVIDIA NIM API** - AI model inference
- **Supabase** - Database, Auth, Storage
- **Google Fonts** - Inter font family

---

*This document is for agent reference. Update as the codebase evolves.*