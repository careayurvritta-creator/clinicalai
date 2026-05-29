# AyurVritta Clinical AI — Complete Codebase Reference

> Auto-generated on 2026-05-29. Single-source reference for the entire project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Directory Structure](#3-directory-structure)
4. [Configuration Files](#4-configuration-files)
5. [Environment Variables](#5-environment-variables)
6. [Database Schema & Migrations](#6-database-schema--migrations)
7. [API Routes (19 endpoints)](#7-api-routes)
8. [Components (25 files)](#8-components)
9. [Library Modules](#9-library-modules)
10. [Ayurveda Knowledge Base](#10-ayurveda-knowledge-base)
11. [RAG & AI Pipeline](#11-rag--ai-pipeline)
12. [Authentication & Middleware](#12-authentication--middleware)
13. [State Management](#13-state-management)
14. [Styling & Design System](#14-styling--design-system)
15. [Ayurvedic Domain Logic](#15-ayurvedic-domain-logic)
16. [Scripts & Tooling](#16-scripts--tooling)
17. [PWA Configuration](#17-pwa-configuration)
18. [Key Architectural Patterns](#18-key-architectural-patterns)
19. [Critical Notes & Known Issues](#19-critical-notes--known-issues)

---

## 1. Project Overview

**Name:** AyurVritta Clinical AI (`clinical-ai`)
**Purpose:** Full-stack Ayurvedic clinical decision support system with AI-powered features for Ayurvedic physicians.
**Production URL:** `https://clinicalai.ayurvrittaayurveda.in`
**Branch:** Single `main` branch, 50+ commits, no feature branches.

### Core Features
1. **Patient Management** — CRUD with auto-generated codes (PT000001), clinical IDs (AAH001), BMI calculation
2. **Case Management** — Full Ayurvedic case records with Ashtavidha/Dashavidha Pariksha
3. **AI Chat** — RAG-enhanced streaming chat with 10 NVIDIA NIM models
4. **Patient Documents** — 10-category folder-based document management with Supabase Storage
5. **Treatment Protocols** — Academic-grade 16-section protocol generation with PubMed + RAG + Charak Samhita
6. **Diet Charts** — Prakriti-based personalized diet plans with Ritucharya
7. **Investigation Analysis** — Lab report parsing with Ayurvedic clinical correlations

---

## 2. Tech Stack & Dependencies

### Runtime Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15.3.0 | Framework (App Router) |
| `react` / `react-dom` | ^19.1.0 | UI library |
| `@supabase/ssr` | ^0.10.3 | Supabase SSR auth |
| `@supabase/supabase-js` | ^2.106.0 | Supabase client |
| `openai` | ^6.38.0 | NVIDIA NIM client (OpenAI-compatible) |
| `zod` | ^4.4.3 | Request validation |
| `zustand` | ^5.0.13 | Client state management |
| `react-markdown` | ^10.1.0 | Markdown rendering |
| `remark-gfm` | ^4.0.1 | GitHub-flavored markdown |
| `react-dropzone` | ^15.0.0 | File drag-and-drop |
| `pdfjs-dist` | ^4.10.38 | PDF text extraction |
| `html2pdf.js` | ^0.14.0 | PDF export |
| `lucide-react` | ^1.16.0 | Icons |
| `clsx` | ^2.1.1 | Class name utility |
| `pg` | ^8.21.0 | PostgreSQL client |
| `server-only` | ^0.0.1 | Server-only module guard |
| `tailwindcss` | ^3.4.19 | CSS framework |

### Dev Dependencies
| Package | Version |
|---------|---------|
| `typescript` | ^5.8.0 |
| `eslint` | ^9.39.4 |
| `eslint-config-next` | ^15.3.0 |

### Scripts
```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "next lint",
"embed": "npx tsx scripts/embed-knowledge.ts",
"embed:force": "npx tsx scripts/embed-knowledge.ts --force",
"embed:dry": "npx tsx scripts/embed-knowledge.ts --dry-run"
```

---

## 3. Directory Structure

```
clinicalai/
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
├── AAH229_VIJAYDUTT SHARMA.pdf          # Sample patient document
├── docs/
│   ├── AGENT-NIMO-README.md
│   ├── MINIMAX-CODEBASE-GUIDE.md
│   ├── QUICK-REFERENCE.md
│   ├── TECHNICAL-DEEP-DIVE.md
│   └── superpowers/
│       ├── plans/2026-05-28-patient-documents.md
│       └── specs/2026-05-28-patient-documents-design.md
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icon-192.svg
├── scripts/
│   └── embed-knowledge.ts               # Knowledge base embedding script (1450+ lines)
├── supabase/
│   ├── config.toml
│   ├── README.md
│   └── migrations/                      # 14 migration files (001–014)
└── src/
    ├── app/
    │   ├── layout.tsx                   # Root layout (Server Component)
    │   ├── page.tsx                     # Home page (Client Component)
    │   ├── globals.css
    │   ├── loading.tsx / error.tsx
    │   ├── auth/callback/route.ts
    │   ├── login/page.tsx
    │   ├── patients/
    │   │   ├── page.tsx                 # Patient list
    │   │   ├── new/page.tsx             # New patient form
    │   │   ├── [id]/page.tsx            # Patient detail
    │   │   └── loading.tsx
    │   ├── cases/
    │   │   ├── page.tsx                 # Case list
    │   │   ├── [id]/page.tsx            # Case detail
    │   │   └── loading.tsx
    │   └── api/                         # 19 API route directories
    ├── components/                      # 25 React components
    └── lib/
        ├── types.ts                     # Core types + model list + SYSTEM_PROMPT
        ├── store.ts                     # Zustand store
        ├── constants.ts                 # Document categories, file config
        ├── utils.ts                     # Utilities
        ├── nvidia-client.ts             # NVIDIA NIM LLM client
        ├── embedding-client.ts          # NVIDIA embedding client
        ├── diagnosis-engine.ts          # Rule-based diagnosis
        ├── treatment-prompts.ts         # LLM prompt templates
        ├── investigation-analyzer.ts    # Lab report parser
        ├── input-learning.ts            # Case embedding into RAG
        ├── research-analyzer.ts         # PubMed integration
        ├── web-search.ts                # DuckDuckGo search
        ├── pdf-export.ts                # PDF generation
        ├── supabase/
        │   ├── client.ts               # Browser + server clients
        │   ├── auth.ts                  # Auth helpers
        │   ├── services.ts             # Database service layer (60+ functions)
        │   └── database.types.ts       # Generated Supabase types
        ├── ayurrag/
        │   ├── vector-rag.ts            # Hybrid vector + full-text search
        │   ├── query-engine.ts          # Query intent analysis
        │   └── index.ts
        └── ayurknowledge/               # Static Ayurveda knowledge base
            ├── index.ts
            ├── diseases.ts
            ├── herbs.ts
            ├── treatments.ts
            ├── diagnostics.ts
            ├── fundamentals.ts
            ├── allopathy.ts
            ├── modern-medicines.ts
            ├── sushruta.ts
            ├── clinical-evidence.ts
            ├── external-qa.ts
            ├── charak-samhita.ts
            ├── charak/                  # 8 sthana files + types + index
            ├── charak-*.json            # JSON data files
            ├── who-terminology.json
            └── case-studies.json
```

---

## 4. Configuration Files

### next.config.ts
- Security headers: X-Frame-Options (SAMEORIGIN), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin)
- CSP: connect-src limited to self, `integrate.api.nvidia.com`, `*.supabase.co`

### tsconfig.json
- Target: ES2017, strict mode, bundler module resolution
- Path alias: `@/*` → `./src/*`

### tailwind.config.js
- Dark mode: `class` strategy (app is dark-only)
- Custom HSL CSS variable-based color system
- Custom tokens: `chat-user`, `chat-ai`, `panel-chat`, `panel-canvas`, `panel-header`
- Fonts: Inter (sans), JetBrains Mono (mono)

### vercel.json
- Function timeouts: chat 120s, treatment-protocol 120s, vision 60s, intake 60s, pdf 30s

### supabase/config.toml
- API port 54321, DB port 54322, Studio port 54323, PostgreSQL 15

---

## 5. Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase anon/publishable key (client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side, bypasses RLS) |
| `NVIDIA_API_KEY` | Yes | NVIDIA NIM API key for LLM and embeddings |
| `MONGODB_URI` | No | MongoDB connection string (optional, not used) |
| `MONGODB_DB` | No | MongoDB database name (optional, not used) |

---

## 6. Database Schema & Migrations

### Migration Files (14 total)
| # | File | Purpose |
|---|------|---------|
| 001 | `001_core_tables.sql` | profiles, patients, cases + auto-generation functions |
| 002 | `002_clinical_data.sql` | chief_complaints, investigation_findings, treatment_protocols |
| 003 | `003_conversations.sql` | conversations, messages, attachments |
| 004 | `004_outcomes_learnings.sql` | case_outcomes, case_learnings, intake_sessions, treatment_adherence |
| 005 | `005_rag_knowledge_base.sql` | who_terminology, diseases, herbs, treatments, charak_chapters, allopathy, embeddings |
| 006 | `006_policies_views.sql` | RLS policies, views, functions |
| 007 | `007_fix_vector_dimension.sql` | Fix vector dimension from 1536 to 1024 |
| 008 | `008_external_sources.sql` | sushruta_chapters, clinical_evidence, external_qa, modern_medicines |
| 009 | `009_combined_external_sources.sql` | Combined version of 007+008 |
| 010 | `010_add_content_hash.sql` | Content deduplication for embeddings |
| 011 | `011_case_studies_embedding.sql` | Allow case_studies as source_table |
| 012 | `012_input_based_learning.sql` | Allow clinical_cases as source_table |
| 013 | `013_auth_profiles.sql` | Role-based auth, auto-profile creation |
| 014 | `014_patient_documents.sql` | clinical_id, patient_documents table |

### Core Tables

**profiles** — Doctor/user accounts
- auth_user_id, email, full_name, role (doctor/admin)
- specialization, qualification, registration_number
- prakriti_preference, default_model, settings (JSONB)

**patients** — Patient records
- Auto-generated: patient_code (PT000001), clinical_id (AAH001)
- Demographics: name, age, gender, phone, email, address, occupation, area
- Physical: height, weight, bmi (generated column), blood_group
- Emergency contact fields, notes, is_archived

**cases** — Clinical cases
- Auto-generated: case_number (YY00001), visit_number
- Ashtavidha Pariksha: nadi, mootra, mala, jivha, drik, sparsh, shabda, aakriti
- Dashavidha Pariksha: prakriti, prakriti_detail, vikriti, saara, samhanana, satva, ahara_shakti, vyayama_shakti, desha
- Treatment: treatment_plan, treatment_protocol, prescribed_herbs, prescribed_panchakarma
- AI tracking: ai_model_used, ai_session_id, ai_tokens_used
- Status: active → completed, active → follow_up → active

**chief_complaints** — Per-case complaints
- complaint, duration, severity (1-10), location, onset
- aggravating_factors[], relieving_factors[], associated_symptoms[]

**investigation_findings** — Lab results
- parameter, value, unit, reference_range, status
- Ayurvedic correlation: dosha_implication, dhatu_involvement, srotas_involvement

**treatment_protocols** — AI-generated protocols
- purvakarma, panchakarma, herbs, rasayana (JSONB)
- diet_plan, pathya, apathya, dinacharya, ritucharya
- protocol_version (auto-increment per case)

### Conversation Tables

**conversations** — Chat sessions
- module: chat/intake/treatment-protocol/patient-portal/diet-chart/lifestyle-advice

**messages** — Individual messages
- role, content, tokens_used, latency_ms
- is_question, question_data (JSONB), suggestions[]

**attachments** — File metadata
- type: image/pdf/document/lab-report/prescription

### Outcome & Learning Tables

**case_outcomes** — Follow-up tracking
- outcome_rating (1-5), outcome_label, what_worked, what_didnt_work
- symptom_improvement (JSONB)

**case_learnings** — AI learning feedback
- pattern_category: diagnosis/treatment/herb-selection/dosha-assessment/prognosis

**intake_sessions** — Active intake workflow state
- progress tracking, collected_data (JSONB), question/answer history

**treatment_adherence** — Patient compliance tracking

### Knowledge Base Tables

**who_terminology** — 3545 WHO International Standard Terms on Ayurveda
- ITA codes, 9 categories, full-text search_vector

**diseases** — Ayurvedic disease database
- samprapti (pathogenesis), dosha_involvement, modern_correlation
- prognosis_category: sukhasadhya/krichrasadhya/yapya/asadhya

**herbs** — Herbal pharmacopeia
- rasa[], guna[], virya, vipaka, prabhava, dosha_karma (JSONB)
- classical_formulations, active_compounds

**treatments** — 8 categories
- panchakarma/purvakarma/paschatkarma/bahya-chikitsa/rasayana/vajikarana/shodhana/shamana

**charak_chapters** — All 120 Charak Samhita chapters
- sthana, key_concepts, verses_count, key_formulas, key_herbs, key_diseases

**allopathy_integration** — Drug-herb interactions
- interaction_type: contraindicated/caution/safe/synergistic

**combined_protocols** — Integrated Ayurveda-Allopathy protocols

**knowledge_embeddings** — Vector embeddings
- vector(1024) with HNSW index, cosine similarity
- 16 allowed source_tables: who_terminology, diseases, herbs, treatments, charak_chapters, allopathy_integration, combined_protocols, diagnostics, fundamentals, sushruta_chapters, clinical_evidence, external_qa, modern_medicines, case_studies, clinical_cases

**rag_search_history** — Query analytics

### Patient Documents Table

**patient_documents**
- category, filename, storage_path, file_size, file_type
- tags[], notes, tsvector full-text search

### Views
- `v_patient_summary` — Patient overview with visit counts
- `v_case_analytics` — Case analytics with metrics
- `v_doctor_dashboard` — Doctor practice statistics
- `v_treatment_effectiveness` — Treatment effectiveness correlated with outcomes
- `v_rag_analytics` — RAG search analytics by query type

### Database Functions
- `generate_patient_code()` — PT000001, PT000002, ...
- `generate_case_number()` — YY00001 (year-based)
- `generate_clinical_id()` — AAH001, AAH002, ...
- `set_visit_number()` — Auto-increments per patient
- `set_protocol_version()` — Auto-increments per case
- `handle_new_user()` — Auto-creates profile on auth signup
- `handle_first_user_admin()` — First user gets admin role
- `prevent_role_self_change()` — Non-admins cannot change own role
- `increment_message_count()` — Auto-increments conversation count
- `get_patient_case_history(uuid)` — All cases for a patient
- `get_doctor_stats(uuid)` — Doctor practice statistics
- `search_knowledge_base(query, tables, limit)` — Full-text search across 9 tables
- `semantic_search(embedding, threshold, count, table)` — Vector cosine similarity
- `get_critical_findings(uuid, days)` — Critical lab findings
- `archive_old_cases(threshold)` — Archive completed cases

---

## 7. API Routes

All routes are `export const dynamic = 'force-dynamic'`.

### Chat & AI

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/chat` | POST | Streaming chat with NVIDIA NIM + RAG. Input: messages, model, enableRAG, attachments, sessionId, module. SSE response. Timeout: 120s. |
| `/api/vision` | POST | Multimodal image analysis via Llama 3.2 90B Vision. SSE streaming. Timeout: 60s. |
| `/api/pdf` | POST | PDF text extraction via pdfjs-dist. Up to 10MB. Timeout: 30s. |
| `/api/treatment-protocol` | POST | 16-section treatment protocol generation. Parallel: PubMed + RAG + Charak Samhita + web search. SSE streaming. Timeout: 120s. |
| `/api/intake` | POST | 30-step intake wizard. Actions: start, answer, getQuestion, showDiagnosis, reset, generateFollowup, answerFollowup. Timeout: 60s. |
| `/api/diet-chart` | POST | Rule-based diet chart generation (no LLM). |
| `/api/lifestyle-advice` | POST | Rule-based lifestyle recommendations (no LLM). |
| `/api/analyze-investigation` | POST | Rule-based lab report analysis with Ayurvedic correlation. |

### Patients

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/patients` | GET, POST | List with pagination/search, create with auto-code generation |
| `/api/patients/[id] | GET, PUT, DELETE | Individual CRUD. DELETE is soft-delete (is_archived) |
| `/api/patients/search` | GET | Lightweight search for selector components |

### Cases

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/cases` | GET | List with filtering by patient_id and status |
| `/api/cases/[id] | GET | Single case with all related data (patient, complaints, findings, protocols) |
| `/api/cases/[id]/complete` | POST | Mark completed with outcome. Re-embeds case into RAG. |
| `/api/cases/[id]/learning` | POST | Record learning feedback. Re-embeds if diagnosis corrected. |

### Documents

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/patient-documents` | GET, POST | List with per-category counts, upload to Supabase Storage |
| `/api/patient-documents/[id] | GET, DELETE | Get with signed URL, delete from storage + table |

### Conversations & Analytics

| Route | Methods | Description |
|-------|---------|-------------|
| `/api/conversations` | GET, POST | List/create conversations, get messages by session_id |
| `/api/analytics` | GET | Dashboard stats: patient/case/conversation/protocol counts |

---

## 8. Components

### Layout Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| AppLayout | `src/components/AppLayout.tsx` | Client | Main shell: DesktopSidebar + HeaderBar + MobileNav + ToastContainer. Skips shell for /login. |
| ClientProviders | `src/components/ClientProviders.tsx` | Client | Root wrapper: ErrorBoundary > AuthProvider > Suspense > AppLayout |
| AuthProvider | `src/components/AuthProvider.tsx` | Client | Supabase auth context (user, session, loading, signOut) |
| ErrorBoundary | `src/components/ErrorBoundary.tsx` | Client | Class-based error boundary with retry/reload buttons |
| ResizableLayout | `src/components/ResizableLayout.tsx` | Client | Split-pane: desktop resizable panels, mobile stacked with tabs |

### Navigation Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| DesktopSidebar | `src/components/DesktopSidebar.tsx` | Client | Logo, module links (Chat, Patient Documents, Treatment Protocol), session lists, secondary links (Cases, Patients). Collapsible with localStorage. |
| HeaderBar | `src/components/HeaderBar.tsx` | Client | Page title, hamburger menu (mobile), SessionDrawer with search/filter |
| MobileNav | `src/components/MobileNav.tsx` | Client | 5-tab bottom bar: Chat, Documents, Protocol, Cases, Patients |

### Chat Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| ChatPanel | `src/components/ChatPanel.tsx` | Client | Orchestrator: renders PatientDocuments (documents), CaseCollectorChat (treatment-protocol), or ChatView (default). |
| ChatInput | `src/components/ChatInput.tsx` | Client | Auto-resizing textarea, file attach, camera (mobile), drag-drop, SSE streaming parser |
| MessageBubble | `src/components/MessageBubble.tsx` | Client | User/assistant message display with markdown, attachments, timestamps, streaming cursor |
| ModelSelector | `src/components/ModelSelector.tsx` | Client | AI model picker: desktop dropdown, mobile bottom sheet |

### Canvas Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| CanvasPanel | `src/components/CanvasPanel.tsx` | Client | Output display: treatment protocols, diagnosis results, markdown |
| CanvasToolbar | `src/components/CanvasToolbar.tsx` | Client | Copy, Download PDF, Clear actions |
| ProtocolRenderer | `src/components/ProtocolRenderer.tsx` | Client | Parses markdown into color-coded sections with TOC |

### Patient Documents Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| PatientDocuments | `src/components/PatientDocuments.tsx` | Client | State machine orchestrator: selector → folders → contents → upload → preview |
| PatientSelector | `src/components/PatientSelector.tsx` | Client | Search by name/phone/ID with debounce |
| PatientFolderView | `src/components/PatientFolderView.tsx` | Client | 10-category grid with icons and counts |
| FolderContents | `src/components/FolderContents.tsx` | Client | File list with sort, preview, download, delete |
| DocumentUpload | `src/components/DocumentUpload.tsx` | Client | Drag-drop, file queue with status, category/tags/notes |
| DocumentPreview | `src/components/DocumentPreview.tsx` | Client | Full-screen overlay: PDF iframe, image preview, download |

### Clinical Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| CaseCollectorChat | `src/components/CaseCollectorChat.tsx` | Client | 30-step intake wizard with phases: wizard → review → followup → diagnosis → protocol |
| CaseCard | `src/components/CaseCard.tsx` | Client | Case list card with status badge |
| PatientCard | `src/components/PatientCard.tsx` | Client | Patient list card with avatar initials |

### Utility Components

| Component | File | Type | Purpose |
|-----------|------|------|---------|
| Toast | `src/components/Toast.tsx` | Client | Pub/sub toast notification system |

---

## 9. Library Modules

### Core

| File | Purpose |
|------|---------|
| `src/lib/types.ts` | TypeScript interfaces (Message, ChatSession, ChatState, CaseData, ChiefComplaint, InvestigationFinding, ModelOption), MODELS array (10 models), SYSTEM_PROMPT |
| `src/lib/store.ts` | Zustand store with localStorage persistence (version 7). Messages per module, sessions, model selection, canvas content, streaming state. |
| `src/lib/constants.ts` | DOCUMENT_CATEGORIES (10 types), allowed file types, STORAGE_BUCKET, utility functions |
| `src/lib/utils.ts` | cn() (clsx wrapper), formatTime(), generateId(), truncateText(), sanitizeInput() |

### AI Clients

| File | Purpose |
|------|---------|
| `src/lib/nvidia-client.ts` | OpenAI SDK → NVIDIA NIM. createChatStream() with streaming, 8192 max_tokens, temp 0.7 |
| `src/lib/embedding-client.ts` | NVIDIA nv-embedqa-e5-v5 (1024-dim). generateEmbedding(), generateBatchEmbeddings(). 3-attempt retry. |

### Clinical Logic

| File | Purpose |
|------|---------|
| `src/lib/diagnosis-engine.ts` | Rule-based symptom-to-disease matching with weighted scores, dosha extraction, provisional diagnosis |
| `src/lib/treatment-prompts.ts` | TREATMENT_PROTOCOL_SYSTEM_PROMPT (4000+ words, 16-section format), follow-up question prompts |
| `src/lib/investigation-analyzer.ts` | Regex-based lab report parser for 21 parameters with Ayurvedic correlations |
| `src/lib/input-learning.ts` | embedCaseToKnowledge(), reembedCaseWithOutcome(), embedTreatmentProtocol(). Chunks into 7 sections, deterministic UUIDs. |
| `src/lib/research-analyzer.ts` | PubMed via NCBI E-utilities. XML parsing, LLM relevance scoring, trusted journal boosting |
| `src/lib/web-search.ts` | DuckDuckGo HTML scraping, 1.2s rate limit |
| `src/lib/pdf-export.ts` | html2pdf.js wrapper for protocol PDF generation |

### Supabase Layer

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser: createBrowserClient (lazy Proxy). Server: createClient with service role key. |
| `src/lib/supabase/auth.ts` | Client: signInWithGoogle, signOut, getSession. Server: getServerSession, getUserProfile, requireAuth. |
| `src/lib/supabase/services.ts` | 60+ service functions for all tables. RPCs: search_knowledge_base, semantic_search, get_doctor_stats, etc. |
| `src/lib/supabase/database.types.ts` | Generated Supabase TypeScript types for all tables/views/functions |

### RAG Engine

| File | Purpose |
|------|---------|
| `src/lib/ayurrag/vector-rag.ts` | 3-phase search: semantic (pgvector) → full-text fallback → hybrid re-ranking. LRU cache (100 entries, 5min TTL). Intent detection boosts categories. |
| `src/lib/ayurrag/query-engine.ts` | Query intent analysis (diagnosis/treatment/herb/drug_interaction/prakriti/integration/procedure), entity extraction |
| `src/lib/ayurrag/index.ts` | Exports + config (maxContextLength: 2000, enableHybridSearch: true) |

---

## 10. Ayurveda Knowledge Base

Located at `src/lib/ayurknowledge/`. Comprehensive static knowledge covering:

### Fundamentals (`fundamentals.ts`)
- **Tridosha**: Vata (movement, dry/light/cold/rough/subtle/mobile), Pitta (transformation, hot/sharp/light/liquid/oily), Kapha (structure, heavy/slow/cold/oily/smooth/dense)
- **Saptadhatu** (7 tissues): Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra
- **Agni** (4 digestive fire types): Samagni, Mandagni, Tikshnagni, Vishamagni
- **Srotas** (8 body channels): Prana, Anna, Rasa, Mutra, Purisha, Shukra, Artava, Sveda
- **Ama** (toxins): 4 types with clinical indicators
- **Ojas** (vitality/immunity)
- **Ashtanga Ayurveda** (8 branches): Kayachikitsa, Shalya, Shalakya, Kaumara-Bhritya, Graha Chikitsa, Agada Tantra, Rasayana, Vajikarana

### Diseases (`diseases.ts`)
Each entry: name, Sanskrit name, category, dosha involvement, samprapti, modern medical correlation, clinical features, diagnostic criteria, treatment approaches, pathya/apathya, prognosis.

### Herbs (`herbs.ts`)
15 core herbs with full Ayurvedic pharmacology: Rasa (6 tastes), Guna (20 qualities), Virya (potency), Vipaka (post-digestive effect), Prabhava (special action), Dosha Karma, indications, dosage, contraindications, drug interactions.

### Treatments (`treatments.ts`)
All 5 Panchakarma procedures with day-by-day protocols. Purvakarma, Rasayana, Pathya-Apathya, Dinacharya, Ritucharya.

### Charak Samhita (`charak/`)
All 120 chapters across 8 Sthanas (Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi). Each chapter: name, Sanskrit/English titles, summary, key concepts, shlokas with translations, topics, dosha discussions, treatment protocols, disease descriptions, dietary guidelines, clinical applications.

### Diagnostics (`diagnostics.ts`)
- Trividha (3-fold), Ashtavidha (8-fold), Dashavidha (10-fold), Naadi Pariksha
- Pulse diagnosis: Vata=sarpa gati (snake), Pitta=manduka gati (frog), Kapha=hams gati (swan)

### Allopathy Integration (`allopathy.ts`)
Drug-herb interaction database: Type 2 Diabetes, Hypertension, Arthritis, Hyperlipidemia, Depression/Anxiety. Each entry maps Ayurvedic correlation to modern treatment with safety notes.

### Additional Sources
- `sushruta.ts` — Sushruta Samhita (surgical procedures, anatomy)
- `clinical-evidence.ts` — PubMed papers
- `external-qa.ts` — HuggingFace Q&A datasets
- `modern-medicines.ts` — Indian pharmaceutical data with Ayurvedic alternatives

---

## 11. RAG & AI Pipeline

### AI Models (NVIDIA NIM)

| Model ID | Name | Use Case |
|----------|------|----------|
| `mistralai/mistral-large-3-675b-instruct-2512` | Mistral Large 3 (675B) | **Default.** Chat, treatment protocols |
| `qwen/qwen3-coder-480b-a35b-instruct` | Qwen 3 Coder (480B) | Clinical reasoning |
| `nvidia/llama-3.3-nemotron-super-49b-v1.5` | Nemotron Super 49B | Fast clinical reasoning |
| `qwen/qwen3.5-397b-a17b` | Qwen 3.5 (397B) | Deep clinical analysis |
| `meta/llama-3.3-70b-instruct` | Llama 3.3 70B | Research paper analysis |
| `mistralai/mistral-nemotron` | Mistral Nemotron | Balanced reasoning |
| `qwen/qwen3-next-80b-a3b-instruct` | Qwen 3 Next 80B | Quick queries |
| `deepseek-ai/deepseek-v4-flash` | DeepSeek V4 Flash | Fast reasoning |
| `meta/llama-3.2-90b-vision-instruct` | Llama 3.2 90B Vision | Image analysis |
| `meta/llama-3.1-8b-instruct` | Llama 3.1 8B | Follow-up questions, low cost |

**Embedding Model:** `nvidia/nv-embedqa-e5-v5` (1024 dimensions)
**Default params:** max_tokens=8192, temperature=0.7, top_p=0.7

### RAG Pipeline Flow

1. **Query Analysis** — `analyzeQuery()` detects intent (diagnosis, treatment, herb, drug_interaction, etc.)
2. **Vector Search** — Generate embedding → Supabase `semantic_search` RPC (pgvector cosine similarity)
3. **Full-text Fallback** — `search_knowledge_base` RPC if vector results sparse
4. **Hybrid Re-ranking** — Semantic score + category boost (+0.15) + keyword match (+0.03/word, max +0.12) + intent keyword (+0.05)
5. **Context Injection** — RAG results appended to system prompt
6. **LLM Generation** — NVIDIA NIM streaming via OpenAI SDK
7. **Persistence** — Messages saved to Supabase (fire-and-forget)

### RAG Cache
- In-memory LRU cache: 100 entries, 5-minute TTL
- Search history logged to `rag_search_history`

### Treatment Protocol Generation (most complex endpoint)
Gathers context from 4 parallel sources:
1. **PubMed** — NCBI E-utilities API, trusted Ayurveda journals (12 listed), LLM relevance scoring
2. **Vector RAG** — Semantic search across knowledge base
3. **Charak Samhita** — Local knowledge base search across all 120 chapters
4. **Web Search** — DuckDuckGo for supplementary Ayurveda journals

Generates 16-section academic document: Abstract, Keywords, Introduction, Case Presentation, Diagnostic Assessment, Literature Review, Classical Text References, Treatment Protocol, Pharmacotherapy, Pathya-Apathya, Dinacharya, Monitoring, Precautions, Conclusion, References, Disclaimer.

### Input-Based Learning Loop
- Completed cases are chunked into 7 segments (overview, symptoms, examination, diagnosis, treatment, protocol, outcome)
- Embedded via NVIDIA nv-embedqa-e5-v5
- Upserted to `knowledge_embeddings` with deterministic UUIDs
- Outcomes with "what worked/didn't work" enrich future RAG results

---

## 12. Authentication & Middleware

### Auth Status: DISABLED
The middleware auth check is commented out with `TODO: Re-enable auth once PKCE cookie flow is fixed`. All requests pass through without authentication.

### Auth Implementation (when enabled)
- Google OAuth via Supabase Auth with PKCE flow
- Auto-profile creation on signup via `handle_new_user()` trigger
- First user auto-promoted to admin
- Role-based access: doctor/admin

### Middleware Features (active)

**Rate Limiting** — In-memory per-IP:
| Endpoint | Limit |
|----------|-------|
| `/api/chat` | 20 req/min |
| `/api/intake` | 30 req/min |
| `/api/treatment-protocol` | 10 req/min |
| `/api/vision` | 10 req/min |
| `/api/pdf` | 15 req/min |
| `/api/analyze-investigation` | 15 req/min |
| Default | 60 req/min |

**CORS** — Origin: `https://clinicalai.ayurvrittaayurveda.in`
**Security Headers** — X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy

---

## 13. State Management

### Zustand Store (`src/lib/store.ts`)
- Single store: `useChatStore` with `persist` middleware
- Persisted to localStorage under key `clinical-ai-chat` (version 7 with migrations)
- State shape:
  - `messages`, `messagesByModule` — per-module message arrays
  - `isStreaming`, `streamingModule` — streaming status
  - `selectedModel` — current AI model
  - `canvasContent`, `canvasTimestamp` — canvas output
  - `activeModule` — current module (chat/documents/treatment-protocol)
  - `activeSessionId`, `sessions` — multi-session management
  - `chatInputDraft` — ephemeral draft (excluded from persistence)

### React Context (Auth)
- `AuthContext` provides `user`, `session`, `loading`, `signOut`
- Supabase `onAuthStateChange` listener

---

## 14. Styling & Design System

### Approach
- **All Tailwind utility classes** — no CSS Modules, no styled-components
- **No component library** — all components hand-built from scratch
- **Dark-only** — no light mode toggle

### Design Tokens (CSS Custom Properties)
All colors defined as HSL in `:root`:
- Semantic: `background`, `foreground`, `card`, `primary`, `muted`, `border`, `accent`, `secondary`
- Application: `chat-user`, `chat-ai`, `panel-chat`, `panel-canvas`, `panel-header`
- Status: `--status-active` (green), `--status-completed` (blue), `--status-followup` (yellow), `--status-alert` (red)

### Layout Tokens
- `--nav-height-mobile`, `--header-height`, `--sidebar-width`
- `--space-1` through `--space-16`

### Responsive
- Primary breakpoint: `md:` (768px) for desktop/mobile split
- Mobile: bottom navigation, stacked panels, bottom sheet modals
- Safe area insets for devices with notches
- Touch targets: 44px minimum

### Animations
- `animate-blink`, `animate-fade-in`, `animate-slide-up`, `animate-slide-in`
- `prefers-reduced-motion` support disables all animations

---

## 15. Ayurvedic Domain Logic

### What Makes This Application Unique

1. **30-Step Intake Wizard** — Captures Ashtavidha Pariksha (8-fold examination including pulse diagnosis with animal movement descriptions) and Dashavidha Pariksha (10-fold examination including tissue quality across 7 dhatus)

2. **Self-Improving Knowledge Base** — Clinical cases and treatment protocols are automatically chunked, embedded, and added to the RAG knowledge base. The system learns from real clinical experience including outcome feedback.

3. **Academic-Grade Treatment Protocols** — 16-section peer-review format with Samprapti pathogenesis chains, Shatkriyakala disease staging, classical text citations with verse numbers, Vancouver-style references.

4. **Ayurveda-Modern Medicine Bridge** — Maps Ayurvedic conditions to modern diagnoses (Prameha = Diabetes), tracks drug-herb interactions with specific mechanisms, generates combined treatment protocols.

5. **Four-Source Evidence Gathering** — Treatment protocols combine real-time PubMed research, vector RAG search, Charak Samhita references, and web searches.

### Key Ayurvedic Concepts in the Codebase

**Tridosha System**: Vata (movement), Pitta (transformation), Kapha (structure). Every clinical decision considers dosha balance.

**Prakriti Assessment**: Natural constitution determined at birth. Guides all treatment, diet, and lifestyle recommendations.

**Samprapti**: Disease pathogenesis chain — Dosha-Dushya-Sammurchana → Srotas involvement → Agni status → Ama assessment → Prakriti-Vikriti analysis → Shatkriyakala stage.

**Panchakarma**: 5 purification procedures (Vamana, Virechana, Basti, Nasya, Raktamokshana) with detailed day-by-day protocols.

**Rasa-Guna-Virya-Vipaka**: Herbal pharmacology framework — 6 tastes, 20 qualities, potency, post-digestive effect.

---

## 16. Scripts & Tooling

### `scripts/embed-knowledge.ts` (1450+ lines)
- Loads all knowledge from `src/lib/ayurknowledge/` and external sources from Supabase
- Chunks content into 400-char max with 50-char overlap
- Generates 1024-dim embeddings via NVIDIA nv-embedqa-e5-v5
- Upserts to `knowledge_embeddings` with content hash for incremental updates
- Modes: `--force` (regenerate all), `--dry-run` (count only), default (incremental)

---

## 17. PWA Configuration

- **manifest.json** — "Ayurved Clinical AI", standalone display, portrait orientation, medical/health categories
- **sw.js** — Cache-first for static assets, network-first for GET requests, offline fallback
- **Icon** — SVG at 192x192 and 512x512

---

## 18. Key Architectural Patterns

1. **Overwhelmingly Client-Side** — Only 7 Server Components (loading skeletons + root layout). All pages are `'use client'`. Data fetched via `fetch()` in `useEffect`.

2. **Module-Based Routing** — Home page uses `?module=` query param to switch between chat, documents, treatment-protocol.

3. **Fire-and-Forget Persistence** — Messages, case embeddings, protocol embeddings saved asynchronously without blocking streaming responses.

4. **State Machine Pattern** — CaseCollectorChat and PatientDocuments use explicit phase/view state machines for complex multi-step flows.

5. **SSE Streaming** — Chat, treatment protocol, and vision endpoints stream via Server-Sent Events with buffer accumulation.

6. **No Server Actions** — All server-side logic in API routes and library modules.

7. **No Form Library** — All forms built with native React state.

8. **No Data Fetching Library** — Direct fetch() with manual loading/error state management.

---

## 19. Critical Notes & Known Issues

### Auth is DISABLED
The middleware auth check is commented out. All API routes skip authentication. RLS policies are ineffective because API routes use the service role key. All data is currently accessible without login.

### No Automated Tests
Zero test files in the source tree. No test runner configured. Testing is purely manual (smoke test checklists in docs).

### MongoDB Not Used
`.env.example` references `MONGODB_URI` and `MONGODB_DB` but no MongoDB code exists in the source. These are remnants from an earlier design.

### Single-Branch Workflow
All development happens on `main` with no feature branches.

### Service Role Key Usage
All API routes use `createServerClient()` which operates with the Supabase service role key, bypassing all Row Level Security policies.

### Sample Patient Document
`AAH229_VIJAYDUTT SHARMA.pdf` (448KB) exists in the project root — likely a test file for the document management feature.

### Fire-and-Forget Reliability
Case embeddings, protocol embeddings, and conversation persistence happen asynchronously after responses are sent. If the serverless function terminates early, these operations may be lost.
