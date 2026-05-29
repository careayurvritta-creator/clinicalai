# AyurVritta Clinical AI - Complete Project Documentation for MiniMax

**Project:** Ayurvedic Clinical AI Assistant
**Stack:** Next.js 15 (App Router) + Supabase + NVIDIA NIM
**Deployment:** Vercel (Frontend + API) | Supabase (Database + Auth + Storage)
**Date:** May 29, 2026

---

## 1. PROJECT OVERVIEW

This is a full-stack clinical AI application for Ayurvedic doctors. It provides:

- Patient management (CRUD)
- Clinical case tracking with Ayurvedic-specific fields
- AI chat powered by NVIDIA NIM models with RAG (Retrieval Augmented Generation)
- Document upload/management via Supabase Storage
- AI-generated treatment protocols, diet charts, lifestyle advice
- Investigation (lab report) analysis with Ayurvedic correlation
- Knowledge base with WHO Ayurveda terminology, Charak Samhita, diseases, herbs, treatments

---

## 2. DIRECTORY STRUCTURE

```
clinicalai/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API routes (all backend logic)
│   │   │   ├── chat/route.ts     # Main AI chat endpoint (streaming)
│   │   │   ├── patients/route.ts # Patient CRUD
│   │   │   ├── patients/[id]/route.ts
│   │   │   ├── patients/search/route.ts
│   │   │   ├── cases/route.ts    # Case CRUD
│   │   │   ├── cases/[id]/route.ts
│   │   │   ├── cases/[id]/complete/route.ts
│   │   │   ├── cases/[id]/learning/route.ts
│   │   │   ├── conversations/route.ts
│   │   │   ├── treatment-protocol/route.ts
│   │   │   ├── diet-chart/route.ts
│   │   │   ├── lifestyle-advice/route.ts
│   │   │   ├── intake/route.ts
│   │   │   ├── analyze-investigation/route.ts
│   │   │   ├── patient-documents/route.ts
│   │   │   ├── patient-documents/[id]/route.ts
│   │   │   ├── vision/route.ts
│   │   │   ├── pdf/route.ts
│   │   │   └── analytics/route.ts
│   │   ├── auth/callback/route.ts # Supabase auth callback
│   │   ├── login/page.tsx        # Login page
│   │   ├── patients/             # Patient pages
│   │   │   ├── page.tsx          # Patient list
│   │   │   ├── [id]/page.tsx     # Patient detail
│   │   │   └── new/page.tsx      # New patient form
│   │   ├── cases/                # Case pages
│   │   │   ├── page.tsx          # Case list
│   │   │   └── [id]/page.tsx     # Case detail
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page (redirects)
│   │   └── globals.css           # Global styles
│   ├── components/               # React components
│   │   ├── AppLayout.tsx         # Main app shell (sidebar + header)
│   │   ├── ChatPanel.tsx         # AI chat interface
│   │   ├── ChatInput.tsx         # Chat input with attachments
│   │   ├── MessageBubble.tsx     # Chat message display
│   │   ├── CanvasPanel.tsx       # Rich text canvas for notes
│   │   ├── CanvasToolbar.tsx     # Canvas formatting toolbar
│   │   ├── PatientCard.tsx       # Patient list card
│   │   ├── CaseCard.tsx          # Case list card
│   │   ├── CaseCollectorChat.tsx # Case collection chat interface
│   │   ├── PatientDocuments.tsx  # Document upload/management
│   │   ├── PatientFolderView.tsx # Folder-based document view
│   │   ├── FolderContents.tsx    # Folder file listing
│   │   ├── DocumentUpload.tsx    # Drag-and-drop upload
│   │   ├── PatientSelector.tsx   # Patient selection dropdown
│   │   ├── ModelSelector.tsx     # AI model selection
│   │   ├── ProtocolRenderer.tsx  # Treatment protocol display
│   │   ├── ResizableLayout.tsx   # Resizable panel layout
│   │   ├── DesktopSidebar.tsx    # Desktop navigation sidebar
│   │   ├── MobileNav.tsx         # Mobile navigation
│   │   ├── HeaderBar.tsx         # Top header bar
│   │   ├── AuthProvider.tsx      # Auth context provider
│   │   ├── ClientProviders.tsx   # Client-side providers
│   │   ├── ErrorBoundary.tsx     # Error boundary
│   │   └── Toast.tsx             # Toast notifications
│   ├── lib/                      # Core libraries
│   │   ├── store.ts              # Zustand state management
│   │   ├── types.ts              # TypeScript types + model list
│   │   ├── constants.ts          # App constants
│   │   ├── utils.ts              # Utility functions
│   │   ├── nvidia-client.ts      # NVIDIA NIM API client (OpenAI SDK)
│   │   ├── embedding-client.ts   # Embedding API client
│   │   ├── diagnosis-engine.ts   # Clinical diagnosis logic
│   │   ├── treatment-prompts.ts  # AI prompt templates
│   │   ├── investigation-analyzer.ts
│   │   ├── input-learning.ts     # Learning from user input
│   │   ├── research-analyzer.ts  # Research paper analysis
│   │   ├── pdf-export.ts         # PDF generation
│   │   ├── web-search.ts         # Web search integration
│   │   ├── supabase/             # Supabase integration
│   │   │   ├── client.ts         # Browser + server clients
│   │   │   ├── auth.ts           # Auth helpers
│   │   │   ├── services.ts       # Database service functions
│   │   │   └── database.types.ts # Auto-generated types
│   │   ├── ayurrag/              # RAG engine
│   │   │   ├── vector-rag.ts     # Semantic search + hybrid reranking
│   │   │   ├── query-engine.ts   # Query processing
│   │   │   └── index.ts
│   │   └── ayurknowledge/        # Static Ayurvedic knowledge
│   │       ├── index.ts          # Knowledge aggregator
│   │       ├── diseases.ts       # Disease database
│   │       ├── herbs.ts          # Herbal pharmacopeia
│   │       ├── treatments.ts     # Treatment protocols
│   │       ├── allopathy.ts      # Drug-herb interactions
│   │       ├── fundamentals.ts   # Ayurvedic fundamentals
│   │       ├── diagnostics.ts    # Diagnostic methods
│   │       ├── clinical-evidence.ts
│   │       ├── external-qa.ts    # Q&A database
│   │       ├── modern-medicines.ts
│   │       ├── sushruta.ts       # Sushruta Samhita
│   │       ├── charak-samhita.ts # Charak Samhita
│   │       ├── charak/           # Charak chapters by sthana
│   │       │   ├── sutra-sthana.ts
│   │       │   ├── nidana-sthana.ts
│   │       │   ├── vimana-sthana.ts
│   │       │   ├── sharira-sthana.ts
│   │       │   ├── indriya-sthana.ts
│   │       │   ├── chikitsa-sthana.ts
│   │       │   ├── kalpa-sthana.ts
│   │       │   ├── siddhi-sthana.ts
│   │       │   ├── types.ts
│   │       │   └── index.ts
│   │       └── *.json            # JSON data files
│   ├── middleware.ts             # Auth + rate limiting
│   └── server/
│       └── api-key.ts           # NVIDIA API key management
├── supabase/
│   ├── config.toml              # Supabase config
│   ├── migrations/              # Database migrations (14 files)
│   └── README.md
├── scripts/
│   └── embed-knowledge.ts       # Knowledge base embedding script
├── docs/
│   ├── AGENT-NIMO-README.md     # Existing documentation
│   └── superpowers/
├── public/                      # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vercel.json                  # Vercel deployment config
└── eslint.config.mjs
```

---

## 3. DATABASE SCHEMA (Supabase PostgreSQL)

### 3.1 Core Tables

**profiles** - Doctor/user accounts
- id, auth_user_id, email, full_name, specialization, qualification
- registration_number, clinic_name, clinic_address, phone, avatar_url
- prakriti_preference, default_model, settings (jsonb)
- role (doctor/admin), display_name, last_sign_in_at
- is_active, created_at, updated_at

**patients** - Patient records
- id, doctor_id (FK -> profiles), patient_code (auto: PT000001)
- clinical_id (auto: AAH001, AAH002, ...)
- name, age, date_of_birth, gender, occupation, area, phone, email, address
- emergency_contact, emergency_phone, blood_group
- height_cm, weight_kg, bmi (auto-calculated)
- profile_image_url, notes, is_archived

**cases** - Clinical case records
- id, patient_id (FK), doctor_id (FK), case_number (auto: YY00001)
- visit_date, visit_type (initial/follow-up/emergency/referral), visit_number
- chief_complaints (jsonb), duration, severity_score (1-10)
- Ashtavidha Pariksha: nadi, mootra, mala, jivha, drik, sparsh, shabda, aakriti
- Prakriti: prakriti, prakriti_detail, vikriti, saara, samhanana, satva, ahara_shakti, vyayama_shakti, desha
- comorbidities (jsonb), medical_history, allergies, family_history, ongoing_medications
- investigation_text, investigation_findings (jsonb)
- provisional_diagnosis, provisional_reasoning, final_diagnosis, diagnosis_confidence
- treatment_plan, treatment_protocol (jsonb), prescribed_herbs (jsonb), prescribed_panchakarma (jsonb)
- diet_recommendations, lifestyle_recommendations
- status (active/completed/referred/archived)
- follow_up_date, follow_up_notes
- ai_model_used, ai_session_id, ai_tokens_used

### 3.2 Clinical Data Tables

**chief_complaints** - Normalized complaints per case
- case_id, complaint, duration, severity, location, onset, character, radiation
- aggravating_factors[], relieving_factors[], associated_symptoms[]

**investigation_findings** - Lab results with Ayurvedic correlation
- case_id, report_type (blood/urine/imaging/ecg/general), parameter, value, unit, normal_range
- status (normal/abnormal/critical/pending)
- clinical_correlation, ayurvedic_correlation, dosha_implication, dhatu_involvement, srotas_involvement

**treatment_protocols** - AI-generated treatment plans
- case_id, protocol_version (auto-increment), protocol_name, protocol_text
- purvakarma (jsonb), panchakarma (jsonb), herbs (jsonb), rasayana (jsonb)
- diet_plan (jsonb), pathya[], apathya[]
- dinacharya[], ritucharya[], lifestyle_recommendations[]
- total_duration_days, start_date, end_date
- status (draft/approved/in-progress/completed/modified)

### 3.3 Communication Tables

**conversations** - Chat sessions
- case_id, doctor_id, session_id (unique), title
- module (chat/intake/treatment-protocol/patient-portal/diet-chart/lifestyle-advice)
- ai_model, system_prompt, temperature, max_tokens
- status (active/completed/archived), message_count, total_tokens_used

**messages** - Chat messages
- conversation_id, role (user/assistant/system), content, status
- tokens_used, latency_ms, model_used
- is_question, question_data (jsonb), suggestions (jsonb)
- attachment_ids[]

**attachments** - File uploads
- case_id, conversation_id, message_id, doctor_id
- file_name, file_type (image/pdf/document/lab-report/prescription/other)
- mime_type, file_size, storage_path, public_url
- extracted_text, text_extraction_status
- analysis_results (jsonb), analysis_status

### 3.4 Document Tables

**patient_documents** - Patient file storage
- patient_id, category, filename, storage_path, file_size, file_type
- upload_date, tags[], notes, uploaded_by
- search_vector (auto-generated tsvector)

### 3.5 RAG / Knowledge Base Tables

**who_terminology** - WHO International Standard Terminologies on Ayurveda (3545 terms)
- ita_code (unique), term, sanskrit_term, category, definition, synonyms[], related_terms[]

**diseases** - Ayurvedic disease database
- disease_code (unique), name, sanskrit_name, category, modern_correlation
- samprapti, dosha_involvement[], dhatu_involvement[], srotas_involvement[]
- agni_status, ama_involvement, clinical_features[], diagnostic_criteria[]
- stages[], complications[], treatment_principles[]
- recommended_herbs[], recommended_panchakarma[], pathya[], apathya[]
- prognosis, prognosis_category (sukhasadhya/krichrasadhya/yapya/asadhya)

**herbs** - Herbal pharmacopeia
- herb_code (unique), name, botanical_name, family, sanskrit_name, hindi_name
- rasa[], guna[], virya (Sheeta/Ushna/Anushnasheeta), vipaka (Madhura/Amla/Katu), prabhava
- dosha_karma (jsonb), indications[], primary_uses[], contraindications[]
- part_used[], preparation_methods[], dosage, anupana[]
- classical_formulations (jsonb), active_compounds[], pharmacological_actions[]

**treatments** - Panchakarma and therapies
- treatment_code (unique), name, sanskrit_name
- category (panchakarma/purvakarma/paschatkarma/bahya-chikitsa/rasayana/vajikarana/shodhana/shamana)
- indications[], contraindications[], procedure[], preparation[], post_treatment[]
- typical_duration, frequency, best_season

**charak_chapters** - All 120 chapters of Charak Samhita
- chapter_number, sthana (sutra/nidana/vimana/sharira/indriya/chikitsa/kalpa/siddhi)
- chapter_name, sanskrit_name, english_title, summary
- key_concepts[], verses_count, content, key_formulas[], key_herbs[], key_diseases[]

**allopathy_integration** - Drug-herb interactions
- condition_name, allopathic_drug, ayurvedic_herb
- interaction_type (contraindicated/caution/safe/synergistic), severity (high/medium/low)
- mechanism, recommendation, monitoring_parameters[]
- evidence_level (strong/moderate/weak/anecdotal)

**combined_protocols** - Integrated Ayurveda-Allopathy protocols
- condition_name, protocol_name, ayurvedic_treatment (jsonb), allopathic_treatment (jsonb)
- integration_notes, timing_recommendations, warnings[]

**knowledge_embeddings** - Vector embeddings for RAG
- source_table, source_id, source_title, content_type, content
- embedding vector(1024) -- NVIDIA nv-embedqa-e5-v5
- HNSW index for cosine similarity search

**rag_search_history** - Search analytics
- doctor_id, case_id, query, query_type, results_count, results_used, latency_ms

### 3.6 Auth Tables

**clinical_intake** - Patient intake forms (referenced in vercel.json)

### 3.7 Database Functions

- `generate_patient_code()` - Auto-generates PT000001, PT000002, ...
- `generate_case_number()` - Auto-generates YY00001 (year-based)
- `set_visit_number()` - Auto-increments visit number per patient
- `set_protocol_version()` - Auto-increments protocol version per case
- `generate_clinical_id()` - Auto-generates AAH001, AAH002, ...
- `handle_new_user()` - Auto-creates profile on auth signup
- `handle_first_user_admin()` - First user gets admin role
- `prevent_role_self_change()` - Non-admins can't change their own role
- `increment_message_count()` - Auto-increments conversation message count
- `update_updated_at_column()` - Generic updated_at trigger

---

## 4. STATE MANAGEMENT (Zustand)

Store: `src/lib/store.ts`

Persisted to localStorage under key `clinical-ai-chat` (version 7).

### State Shape:
```typescript
{
  messages: Message[]              // Current module's messages
  messagesByModule: Record<string, Message[]>  // Messages per module
  selectedModel: string            // Current AI model ID
  canvasContent: string            // Rich text canvas content
  canvasTimestamp: number          // When canvas was last updated
  activeModule: string             // Current module
  streamingModule: string | null   // Which module is currently streaming
  activeSessionId: string | null   // Current chat session ID
  sessions: Record<string, ChatSession>  // All chat sessions
  chatInputDraft: string           // Draft input (not persisted)
  isStreaming: boolean             // AI streaming state
}
```

### Actions:
- addMessage, updateLastMessage, setStreaming, setModel
- setCanvasContent, clearMessages, setActiveModule
- createSession, switchSession, deleteSession, renameSession
- getSessionsForModule

### Module Types:
- `chat` - General AI chat
- `intake` - Patient intake form
- `treatment` - Treatment protocol generation
- `diet` - Diet chart generation
- `lifestyle` - Lifestyle advice
- `documents` - Document management
- `vision` - Image analysis

---

## 5. AI INTEGRATION

### 5.1 NVIDIA NIM Client (`src/lib/nvidia-client.ts`)

Uses OpenAI SDK with NVIDIA NIM base URL:
```typescript
const client = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY
})
```

Function: `createChatStream(messages, model, params)` - Returns streaming chat completion.

### 5.2 Available Models (`src/lib/types.ts`)

```
mistralai/mistral-large-3-675b-instruct-2512
qwen/qwen3-coder-480b-a35b-instruct
nvidia/llama-3.3-nemotron-super-49b-v1.5
qwen/qwen3.5-397b-a17b
meta/llama-3.3-70b-instruct
nvidia/nemotron-3-super-120b-a12b
deepseek-ai/deepseek-r1
google/gemma-3-27b-it
```

### 5.3 RAG Pipeline (`src/lib/ayurrag/vector-rag.ts`)

Three-phase search:

1. **Semantic Search** - Generate embedding via NVIDIA nv-embedqa-e5-v5, search pgvector with cosine similarity
2. **Full-text Search** - PostgreSQL tsvector fallback if semantic returns few results
3. **Hybrid Re-ranking** - Boost results by category match + keyword match + intent detection

Query intent detection boosts categories based on keywords:
- "treat/cure/therapy" -> Treatment, Classical Text
- "disease/diagnosis/symptom" -> Disease
- "herb/dravya/medicine" -> Herb
- "panchakarma/basti/vamana" -> Treatment, Classical Text
- "dosha/vata/pitta/kapha" -> Fundamental Concept, Classical Text
- "interaction/allopathy" -> Allopathy Integration
- "research/study/evidence" -> Clinical Evidence

Results are cached in-memory (100 entries, 5-minute TTL).

### 5.4 Embedding Client (`src/lib/embedding-client.ts`)

Calls NVIDIA embedding API for query vectorization.

### 5.5 Treatment Prompts (`src/lib/treatment-prompts.ts`)

AI prompt templates for generating treatment protocols, diet charts, lifestyle advice.

### 5.6 Diagnosis Engine (`src/lib/diagnosis-engine.ts`)

Clinical diagnosis logic combining Ayurvedic and modern approaches.

---

## 6. AUTHENTICATION

### Flow:
1. User visits protected route -> Middleware checks Supabase session
2. No session -> Redirect to `/login`
3. Login via Supabase Auth (supports Google OAuth)
4. Callback at `/auth/callback` -> Sets session cookie
5. Profile auto-created via `handle_new_user()` trigger

### Middleware (`src/middleware.ts`):
- Rate limiting per IP (e.g., /api/chat: 20 req/min)
- Auth protection for `/`, `/cases`, `/patients`
- CORS headers for API routes

### RLS Policies:
- Doctors see only their own patients/cases
- Admins see all data
- First user auto-promoted to admin

---

## 7. DOCUMENT MANAGEMENT

### Storage Bucket: `patient-documents`

Path structure: `{clinicalId}_{patientName}/{categoryId}/{date}_{filename}`

### Categories:
- investigation-reports, opd-consultation-sheets, ipd-sheets
- panchakarma-notes, prescriptions, discharge-summaries, etc.

### Constraints:
- Max size: 50MB
- Types: PDF, JPG, PNG, WEBP, XLS, XLSX, CSV

---

## 8. API ROUTES SUMMARY

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/chat` | POST | AI chat with RAG (streaming SSE) |
| `/api/patients` | GET/POST | List/create patients |
| `/api/patients/[id]` | GET/PUT/DELETE | Patient CRUD |
| `/api/patients/search` | GET | Search patients |
| `/api/cases` | GET/POST | List/create cases |
| `/api/cases/[id]` | GET/PUT/DELETE | Case CRUD |
| `/api/cases/[id]/complete` | POST | Complete a case |
| `/api/cases/[id]/learning` | POST | Save case learnings |
| `/api/conversations` | GET/POST | Chat session management |
| `/api/treatment-protocol` | POST | Generate treatment protocol |
| `/api/diet-chart` | POST | Generate diet chart |
| `/api/lifestyle-advice` | POST | Generate lifestyle advice |
| `/api/intake` | POST | Patient intake form |
| `/api/analyze-investigation` | POST | Analyze lab reports |
| `/api/patient-documents` | GET/POST | Document upload/list |
| `/api/patient-documents/[id]` | GET/DELETE | Document download/delete |
| `/api/vision` | POST | Image analysis |
| `/api/pdf` | POST | PDF generation |
| `/api/analytics` | GET | Usage analytics |

---

## 9. VERCEL CONFIGURATION

```json
{
  "framework": "nextjs",
  "functions": {
    "src/app/api/chat/route.ts": { "maxDuration": 120 },
    "src/app/api/vision/route.ts": { "maxDuration": 60 },
    "src/app/api/pdf/route.ts": { "maxDuration": 30 },
    "src/app/api/treatment-protocol/route.ts": { "maxDuration": 120 },
    "src/app/api/intake/route.ts": { "maxDuration": 60 }
  }
}
```

---

## 10. KEY COMPONENTS

**AppLayout** - Main shell with sidebar, header, mobile nav. Contains module switching.

**ChatPanel** - AI chat interface with:
- Message list with streaming support
- Model selector dropdown
- Attachment support (images, PDFs)
- Session management (create, switch, delete, rename)
- Module-specific system prompts

**CanvasPanel** - Rich text editor for clinical notes with toolbar.

**PatientDocuments** - Document upload/management with:
- Category-based folder structure
- Drag-and-drop upload
- File preview and download
- Tag and notes support

**CaseCollectorChat** - Specialized chat for collecting case information.

**ProtocolRenderer** - Markdown rendering for treatment protocols.

---

## 11. DEVELOPMENT COMMANDS

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run embed        # Embed knowledge base into vector DB
npm run embed:force  # Force re-embed all
npm run embed:dry    # Dry run embedding
```

---

## 12. AUTHENTICATION STATUS

**IMPORTANT:** Auth is currently DISABLED. The middleware auth check is commented out. All API routes skip authentication. This means all data is currently accessible without login. RLS policies are defined in migration 006 but ineffective while auth is disabled.

The login page has Google OAuth UI but it redirects straight to `/` without requiring auth.

---

## 13. INTAKE WIZARD (30 Steps)

The intake wizard (`CaseCollectorChat.tsx` + `/api/intake`) collects patient data in 5 groups:

1. **Patient Info** (5 steps) - Name, age, gender, contact, occupation
2. **Chief Complaints** (8 steps) - Complaint, duration, severity, location, onset, character, radiation, aggravating/relieving factors
3. **Medical History** (3 steps) - Comorbidities, allergies, family history
4. **Ashtavidha Pariksha** (8 steps) - Nadi, mootra, mala, jivha, drik, sparsh, shabda, aakriti
5. **Dashavidha Pariksha** (6 steps) - Prakriti, vikriti, saara, samhanana, satva, ahara_shakti

After collection: review -> follow-up questions -> diagnosis -> treatment protocol generation.

---

## 14. RESEARCH INTEGRATION

**PubMed Integration** (`src/lib/research-analyzer.ts`):
- Searches NCBI E-utilities API for relevant papers
- Fetches abstracts via XML parsing
- Scores paper relevance (1-10) using LLM
- Trusted Ayurveda journals get +2 boost: J-AIM, AYU, Int J Ayurveda Res, Ancient Sci Life, Indian J Tradit Knowl, J Ethnopharmacol

**Web Search** (`src/lib/web-search.ts`):
- Scrapes DuckDuckGo HTML search results
- Rate limited (1.2s between requests)

---

## 15. SECURITY NOTES

1. Auth is currently disabled (middleware commented out)
2. Service role key used server-side bypasses RLS
3. Rate limiting IS active and working
4. Input sanitization via `sanitizeInput()` in utils.ts
5. Zod validation on all API route request bodies
6. CSP headers restrict connect-src to Supabase and NVIDIA domains

---

## 16. ENVIRONMENT VARIABLES

```
NEXT_PUBLIC_SUPABASE_URL=<supabase project url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<supabase anon key>
SUPABASE_SERVICE_ROLE_KEY=<supabase service role key>
NVIDIA_API_KEY=<nvidia nim api key>
```

---

## 17. MIGRATION FILES (in order)

1. `001_core_tables.sql` - profiles, patients, cases + functions
2. `002_clinical_data.sql` - chief_complaints, investigation_findings, treatment_protocols
3. `003_conversations.sql` - conversations, messages, attachments
4. `004_outcomes_learnings.sql` - case outcomes and learnings
5. `005_rag_knowledge_base.sql` - WHO terminology, diseases, herbs, treatments, Charak chapters, allopathy, embeddings
6. `006_policies_views.sql` - RLS policies and views
7. `007_fix_vector_dimension.sql` - Fix vector embedding dimension
8. `008_external_sources.sql` - External knowledge sources
9. `009_combined_external_sources.sql` - Combined external data
10. `010_add_content_hash.sql` - Content deduplication
11. `011_case_studies_embedding.sql` - Case study embeddings
12. `012_input_based_learning.sql` - Learning from user input
13. `013_auth_profiles.sql` - Role-based auth, auto-profile creation
14. `014_patient_documents.sql` - clinical_id, patient_documents table

---

## 18. IMPORTANT PATTERNS

### Server-only code
Libraries using `import 'server-only'` cannot be imported in client components. NVIDIA client, embedding client, and Supabase server client use this.

### Supabase clients
- Browser client: `createBrowserClient()` - for client components
- Server client: `createServerClient()` - for API routes and server components

### Streaming
Chat API uses Server-Sent Events (SSE) for streaming responses. Client reads via `fetch` with `ReadableStream`.

### Rate limiting
Implemented in middleware with per-IP tracking.

### Auto-generated codes
- Patient code: PT000001, PT000002, ...
- Clinical ID: AAH001, AAH002, ...
- Case number: YY00001 (year-based)

---

*This document is the complete reference for understanding and working with the AyurVritta Clinical AI codebase.*
