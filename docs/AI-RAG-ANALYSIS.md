# AyurVritta Clinical AI — AI & RAG Integration Analysis

**Generated:** 2026-05-29  
**Total lines analyzed:** 5,976 across 17 source files  
**Scope:** Full AI pipeline from NVIDIA NIM client setup through RAG retrieval, chat streaming, treatment protocol generation, intake wizard AI, diagnosis engine, investigation analysis, research integration, and input-based learning.

---

## Table of Contents

1. [NVIDIA NIM Client Setup](#1-nvidia-nim-client-setup)
2. [Embedding Client](#2-embedding-client)
3. [RAG Pipeline — Vector Search Engine](#3-rag-pipeline--vector-search-engine)
4. [RAG Pipeline — Query Engine](#4-rag-pipeline--query-engine)
5. [AI Chat Endpoint](#5-ai-chat-endpoint)
6. [Treatment Protocol Generation](#6-treatment-protocol-generation)
7. [Treatment Prompts & Protocol Builder](#7-treatment-prompts--protocol-builder)
8. [Intake Wizard AI](#8-intake-wizard-ai)
9. [Diagnosis Engine](#9-diagnosis-engine)
10. [Investigation Analyzer](#10-investigation-analyzer)
11. [Research Analyzer (PubMed Integration)](#11-research-analyzer-pubmed-integration)
12. [Input-Based RAG Learning](#12-input-based-rag-learning)
13. [SYSTEM_PROMPT — Ayurvedic Knowledge Encoding](#13-system-prompt--ayurvedic-knowledge-encoding)
14. [Knowledge Base Architecture](#14-knowledge-base-architecture)
15. [Web Search Integration](#15-web-search-integration)
16. [Cross-Component Data Flow](#16-cross-component-data-flow)
17. [Configuration & Environment Variables](#17-configuration--environment-variables)
18. [Error Handling Patterns](#18-error-handling-patterns)

---

## 1. NVIDIA NIM Client Setup

**File:** `src/lib/nvidia-client.ts` (50 lines)  
**File:** `src/server/api-key.ts` (11 lines)

### Purpose
Provides a singleton OpenAI-compatible client configured to talk to NVIDIA NIM (NVIDIA Inference Microservices) hosted at `https://integrate.api.nvidia.com/v1`.

### Key Functions

| Function | Purpose |
|----------|---------|
| `getNvidiaApiKey()` | Reads `NVIDIA_API_KEY` from env; throws if missing |
| `getNvidiaClient()` | Lazy-initializes a singleton `OpenAI` client pointing at NVIDIA NIM |
| `createChatStream(messages, model, params?)` | Creates a streaming chat completion with retry logic |

### Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| `baseURL` | `https://integrate.api.nvidia.com/v1` | NVIDIA NIM API endpoint |
| `max_tokens` | `8192` | Maximum response tokens |
| `temperature` | `0.7` | Sampling temperature |
| `top_p` | `0.7` | Nucleus sampling |
| `maxRetries` | `2` | OpenAI SDK-level retries |

### Retry Logic
- Uses OpenAI SDK's built-in `maxRetries: 2` parameter on the `chat.completions.create()` call.
- No custom exponential backoff at this layer (embedding client handles its own retries).

### Error Handling
- Throws immediately if `NVIDIA_API_KEY` is not set in environment variables.
- All downstream callers (chat route, treatment protocol, research analyzer) catch errors and return appropriate HTTP status codes.

### Integration Points
- Called by: Chat API route, Treatment Protocol route, Research Analyzer (for LLM paper analysis), Intake API (for follow-up question generation)

---

## 2. Embedding Client

**File:** `src/lib/embedding-client.ts` (71 lines)

### Purpose
Generates vector embeddings using NVIDIA NIM's embedding model for semantic search.

### Model Configuration

| Property | Value |
|----------|-------|
| Model | `nvidia/nv-embedqa-e5-v5` |
| Dimensions | `1024` |
| Encoding | `float` |

### Key Functions

| Function | Purpose | input_type | Retry |
|----------|---------|------------|-------|
| `generateEmbedding(text)` | Single-text embedding | `query` | 3 attempts |
| `generateSearchEmbedding(text)` | Alias for `generateEmbedding` | `query` | 3 attempts |
| `generateBatchEmbeddings(texts[])` | Multi-text embedding | `passage` | 3 attempts |

### Asymmetric Model Behavior
The NVIDIA `nv-embedqa-e5-v5` model is asymmetric — it uses different `input_type` values:
- **`query`** — Used when embedding a user's search query (single item)
- **`passage`** — Used when embedding knowledge base content for storage (batch)

This is critical for retrieval quality. The `@ts-expect-error` comment indicates NVIDIA's API extends beyond the standard OpenAI embeddings spec.

### Retry Logic (Custom)
Both functions implement manual 3-attempt retry:

```
Attempt 1 → fail → wait 500ms (or 1000ms for 429) → retry
Attempt 2 → fail → wait 1000ms (or 2000ms for 429) → retry
Attempt 3 → fail → throw
```

For batch embeddings, delays are doubled: `1000ms` base, `2000ms * (attempt+1)` for rate limits.

### Error Handling
- Rate limit (429) triggers longer delays proportional to attempt number.
- All 3 failures result in a thrown error caught by callers.

---

## 3. RAG Pipeline — Vector Search Engine

**File:** `src/lib/ayurrag/vector-rag.ts` (411 lines)

### Purpose
The core RAG (Retrieval-Augmented Generation) engine that performs semantic search over the Ayurvedic knowledge base using NVIDIA embeddings + Supabase pgvector, with full-text fallback and hybrid re-ranking.

### Architecture

```
User Query
    |
    v
[1] Cache Check (LRU, 100 entries, 5-min TTL)
    |  cache miss
    v
[2] Query Intent Detection (regex-based)
    |
    v
[3] Phase 1: Semantic Vector Search
    |  - Generate query embedding (nvidia/nv-embedqa-e5-v5)
    |  - Supabase semantic_search RPC (pgvector cosine similarity)
    |  - Fetches 2x maxResults for dedup headroom
    |
    v
[4] Phase 2: Full-Text Fallback (if < maxResults)
    |  - Supabase search_knowledge_base RPC (tsvector)
    |  - Searches across 9 source tables
    |  - Deduplicates against semantic results
    |  - Downweights text results by 0.7x
    |
    v
[5] Phase 3: Hybrid Re-ranking
    |  - Category boost: +0.15 for matching intent categories
    |  - Keyword match boost: +0.03 per matching word (max +0.12)
    |  - Intent keyword boost: +0.05 per intent keyword match
    |  - Caps at 1.0
    |
    v
[6] Filter (minRelevance threshold) + Limit (maxResults)
    |
    v
[7] Cache Store + Search History Log (fire-and-forget)
    |
    v
Results
```

### Intent Detection (`detectQueryIntent`)

The function uses regex pattern matching to detect query intent and boost relevant categories:

| Intent Pattern | Boosted Categories | Keywords |
|---------------|-------------------|----------|
| treat, cure, therapy, protocol | Treatment, Classical Text | treatment, therapy |
| disease, diagnosis, symptom | Disease | disease, diagnosis |
| herb, dravya, medicine | Herb | herb, medicine |
| panchakarma, basti, vamana | Treatment, Classical Text | panchakarma |
| diet, food, pathya, ahara | Disease, Classical Text | diet, pathya |
| dosha, vata, pitta, kapha | Fundamental Concept, Classical Text | dosha, prakriti |
| interaction, allopathy, combine | Allopathy Integration | interaction, safety |
| research, study, trial, pubmed | Clinical Evidence | research, evidence |
| tablet, capsule, injection | Modern Medicine, Allopathy Integration | modern medicine |
| sushruta, surgery, shalya | Classical Text | sushruta, surgery |
| what is, explain, describe | Ayurveda Q&A, Classical Text | explanation |

### Source Table to Category Mapping

| Source Table | Mapped Category |
|-------------|----------------|
| `who_terminology` | WHO Terminology |
| `diseases` | Disease |
| `herbs` | Herb |
| `treatments` | Treatment |
| `charak_chapters` | Classical Text |
| `sushruta_chapters` | Classical Text |
| `allopathy_integration` | Allopathy Integration |
| `combined_protocols` | Combined Protocol |
| `diagnostics` | Diagnostic Method |
| `fundamentals` | Fundamental Concept |
| `clinical_evidence` | Clinical Evidence |
| `external_qa` | Ayurveda Q&A |
| `modern_medicines` | Modern Medicine |

### Hybrid Re-ranking Algorithm

```typescript
boostedRelevance = baseRelevance
  + 0.15 (if category matches intent)
  + min(keywordMatches * 0.03, 0.12)  // word overlap in content
  + 0.05 (per intent keyword found in content)
// capped at 1.0
```

### Context Formatting (`formatVectorResultsForContext`)

- **Deduplication:** First 100 characters of content used as dedup key
- **Grouping:** Results grouped by category
- **Priority ordering:** Disease > Treatment > Herb > Classical Text > Clinical Evidence > Allopathy Integration > Modern Medicine > Combined Protocol > Diagnostic Method > Fundamental Concept > Ayurveda Q&A > WHO Terminology
- **Token budget:** ~3000 tokens (rough estimate: chars/4)
- **Safety notice:** Automatically appended if drug interaction content is detected

### Caching

| Property | Value |
|----------|-------|
| Type | In-memory LRU Map |
| Max size | 100 entries |
| TTL | 5 minutes |
| Cache key | `query:maxResults:minRelevance:includeWHO:includeAyurKnowledge` |

### Configuration (VectorRAGConfig)

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxResults` | 10 | Maximum results to return |
| `minRelevance` | 0.25 | Minimum relevance threshold |
| `includeWHO` | true | Include WHO terminology results |
| `includeAyurKnowledge` | true | Include Ayurvedic knowledge results |

---

## 4. RAG Pipeline — Query Engine

**File:** `src/lib/ayurrag/query-engine.ts` (393 lines)

### Purpose
Provides rule-based query analysis, intent classification, entity extraction, and generates direct Ayurvedic responses for common queries without requiring LLM calls.

### Intent Classification

| Intent | Trigger Patterns |
|--------|-----------------|
| `diagnosis` | diagnosis, diagnose, symptom, disease, what is, caused by |
| `treatment` | treatment, therapy, chikitsa, manage, cure, panchakarma, basti |
| `herb` | herb, medicine, drug, formulation, churna, ghrita, taila |
| `drug_interaction` | interaction, side effect, combine, with allopathy |
| `prakriti` | prakriti, constitution, body type, vata, pitta, kapha, dosha |
| `integration` | allopathy, modern medicine, with english medicine, integrate |
| `procedure` | procedure, how to, process, steps, method, protocol |
| `general` | (default fallback) |

### Complexity Classification

| Intent | Complexity |
|--------|-----------|
| general | simple |
| herb, prakriti | moderate |
| diagnosis, treatment, drug_interaction, integration, procedure | complex |

### Safety Warning Triggers
Automatically appended for: `drug_interaction`, `integration`, `treatment`

### Entity Extraction
Scans the query against the full in-memory knowledge base:
- All diseases (name + Sanskrit)
- All herbs (name + Sanskrit)
- All treatments (name + Sanskrit)

### Key Functions

| Function | Purpose |
|----------|---------|
| `analyzeQuery(query)` | Returns `QueryAnalysis` with intent, entities, safety flag, complexity |
| `generateAyurvedaResponse(query, userContext?)` | Generates a direct text response based on intent + knowledge base |
| `extractEntities(query)` | Scans knowledge base for matching disease/herb/treatment names |
| `extractDrugFromQuery(query)` | Identifies specific herbs from a hardcoded list |
| `extractDrugClassFromQuery(query)` | Maps modern drug keywords to drug classes |

### Standalone Response Generation
For `general` intent, the engine provides direct responses about:
- Tridosha (Vata, Pitta, Kapha)
- Agni (digestive fire types)
- Ama (toxicity)
- Diagnostic methods (Ashtavidha Pariksha)
- Panchakarma procedures
- Welcome/help menu

This allows the system to answer common Ayurvedic questions without an LLM call.

---

## 5. AI Chat Endpoint

**File:** `src/app/api/chat/route.ts` (285 lines)

### Purpose
The main chat API endpoint that handles user messages, performs RAG retrieval, streams LLM responses, and persists conversations.

### Request Schema

```typescript
{
  messages: Array<{ role: 'user'|'assistant'|'system', content: string }>,
  model: string,  // default: 'mistralai/mistral-large-3-675b-instruct-2512'
  enableRAG: boolean,  // default: true
  attachments?: Array<{ type: 'image'|'pdf', name: string, text?: string, base64?: string }>,
  sessionId?: string,
  module: string,  // default: 'chat'
}
```

### Data Flow

```
POST /api/chat
    |
    v
[1] Validate request (Zod schema)
    |
    v
[2] Process attachments (append PDF text/image markers to last user message)
    |
    v
[3] Persist user message (fire-and-forget)
    |
    v
[4] RAG Pipeline (if enableRAG=true):
    |  - analyzeQuery() for intent detection
    |  - vectorSearch() for semantic retrieval
    |  - formatVectorResultsForContext() for structured context
    |  - Append safety warning if drug interaction detected
    |
    v
[5] Build system message: SYSTEM_PROMPT + RAG context
    |
    v
[6] createChatStream() via NVIDIA NIM
    |
    v
[7] Stream response to client (SSE format)
    |  - Collects assistant content for persistence
    |  - Handles both regular and reasoning model content
    |
    v
[8] Persist assistant response (fire-and-forget)
```

### System Prompt Injection
```typescript
const systemWithRAG = ragContext
  ? `${SYSTEM_PROMPT}\n\n${ragContext}`
  : SYSTEM_PROMPT
```

The RAG context is appended directly to the system prompt, giving the LLM access to:
- WHO terminology matches
- Disease/herb/treatment knowledge
- Classical text references
- Clinical evidence
- Drug interaction data

### Streaming Implementation
- Uses `ReadableStream` with SSE (Server-Sent Events) format
- Each chunk: `data: ${JSON.stringify(chunk)}\n\n`
- End signal: `data: [DONE]\n\n`
- Handles both `delta.content` and `delta.reasoning_content` for reasoning models

### Conversation Persistence
- Upserts conversation record in `conversations` table (by `session_id`)
- Inserts messages into `messages` table
- Updates message count on conversation
- All persistence is fire-and-forget (non-blocking)

### Error Handling
| Error Type | HTTP Status | Code |
|-----------|-------------|------|
| Zod validation | 400 | VALIDATION_ERROR |
| Missing API key | 500 | API_KEY_MISSING |
| Rate limit | 429 | RATE_LIMITED |
| Other | 500 | INTERNAL_ERROR |

### Model Selection
Default model: `mistralai/mistral-large-3-675b-instruct-2512` (675B parameters, 128K context)

---

## 6. Treatment Protocol Generation

**File:** `src/app/api/treatment-protocol/route.ts` (317 lines)

### Purpose
Generates comprehensive 16-section Ayurvedic treatment protocols by gathering evidence from 4 sources and synthesizing with an LLM.

### 4-Source Evidence Gathering

```
Patient Data
    |
    +---[1] PubMed Research (getComprehensiveResearchContext)
    |       - 5-8 targeted PubMed queries
    |       - Fetches up to 40 unique PMIDs
    |       - LLM analysis for relevance scoring (1-10)
    |       - Trusted Ayurveda journal boosting (+2)
    |       - Web search for non-PubMed Ayurveda journals
    |
    +---[2] RAG Knowledge Base (vectorSearch)
    |       - Semantic search for treatment protocols
    |       - maxResults: 8, minRelevance: 0.25
    |       - Excludes WHO terminology
    |       - Includes Ayurvedic knowledge
    |
    +---[3] Charak Samhita (getCharakTreatmentProtocols)
    |       - Searches all 120 chapters
    |       - Returns treatment protocols for diagnosis
    |
    +---[4] Charak Disease Descriptions (getCharakDiseaseDescriptions)
            - Disease-specific Charak references

    All 4 sources run in parallel via Promise.all()
    |
    v
buildProtocolPrompt() — Assembles the full LLM prompt
    |
    v
createChatStream() — Mistral Large 3 (675B)
    - max_tokens: 8192
    - temperature: 0.4 (lower for precision)
    - top_p: 0.9
    |
    v
Stream + Persist + Embed into RAG
```

### Streaming Response Format
1. **Metadata event first:** `{ type: 'metadata', paperCount, webCount, ragCount, charakCount }`
2. **Content chunks:** `{ content: '...' }`
3. **End signal:** `[DONE]`
4. **Error:** `{ error: 'Stream interrupted' }`

### Post-Streaming Actions
- If protocol > 100 chars, persists to `treatment_protocols` table
- Fire-and-forget embeds protocol into RAG knowledge base via `embedTreatmentProtocol()`

### Patient Data Formatting
Includes: demographics, chief complaints (with severity), Ashtavidha Pariksha (8-fold exam), Dashavidha Pariksha (10-fold exam), treatment parameters (selected Panchakarma, Purvakarma, herbs, duration, budget).

---

## 7. Treatment Prompts & Protocol Builder

**File:** `src/lib/treatment-prompts.ts` (441 lines)

### Purpose
Contains the system prompt for treatment protocol generation and the follow-up questions prompt for the intake wizard.

### TREATMENT_PROTOCOL_SYSTEM_PROMPT (331 lines)

This is the most detailed prompt in the system. It instructs the LLM to produce a **16-section academic treatment protocol**:

| Section | Header | Content |
|---------|--------|---------|
| 0 | Abstract | Structured abstract (150-250 words): Background, Case, Treatment, Conclusion |
| 0B | Keywords | 5-8 MeSH-aligned keywords |
| 1 | Introduction | Clinical significance, rationale, classical understanding |
| 2 | Case Presentation | Demographics, complaints table, medical history, Ashtavidha Pariksha table, Dashavidha Pariksha |
| 3 | Diagnostic Assessment | Modern diagnosis, Ayurvedic diagnosis, Samprapti (6 subsections: Dosha-Dushya, Srotas, Agni, Ama, Prakriti-Vikriti, Shatkriyakala) |
| 4 | Literature Review | Evidence synthesis, thematic analysis, GRADE quality table |
| 5 | Classical Text References | Charaka/Sushruta/Ashtanga Hridaya citations table |
| 6 | Treatment Protocol | Rationale, Purvakarma schedule, Pradhana Karma (step-by-step), Paschat Karma (Samsarjana Krama) |
| 7 | Pharmacotherapy | Summary table + per-formulation details (dose, anupana, timing, rationale, contraindications) |
| 8 | Pathya-Apathya | Recommended/contraindicated diet tables + 3-day meal plan |
| 9 | Dinacharya | Daily schedule table, yoga asanas, pranayama |
| 10 | Monitoring | Follow-up schedule table, red flag symptoms |
| 11 | Precautions | Drug-herb interactions, age/gender precautions |
| 12 | Conclusion | Summary (100-150 words) |
| 13 | References | Vancouver style, minimum 8 references |
| 14 | Conflict of Interest | Standard AI disclosure |
| 15 | Disclaimer | AI supplementary reference disclaimer |

### Key Formatting Rules
- Sequential table numbering (Table 1, Table 2, etc.)
- Sanskrit terms italicized with English translation
- Every recommendation must include Ayurvedic rationale (dosha/dhatu/agni/srotas basis)
- Target length: 4000-6000 words
- Academic tone suitable for peer review

### FOLLOWUP_QUESTIONS_PROMPT
Instructs the LLM to generate 3-5 targeted follow-up questions as JSON:
```json
[{
  "question": "...",
  "rationale": "...",
  "category": "symptom_detail | aggravating_factor | medical_history | lifestyle | diagnostic_clarification | treatment_history"
}]
```

### `buildProtocolPrompt()` Function
Assembles the final prompt by concatenating:
1. System prompt
2. Document header (patient name, diagnosis, date, protocol ID)
3. Patient data
4. Research evidence (PubMed)
5. Knowledge base context (RAG)
6. Classical text references (Charak Samhita)
7. Supplementary web sources (if available)
8. Instruction to generate all 16 sections

### `buildFollowupPrompt()` Function
Takes collected patient data as a flat record and appends it to the follow-up questions prompt.

---

## 8. Intake Wizard AI

**File:** `src/app/api/intake/route.ts` (1,129 lines)

### Purpose
A stateful 30-step patient intake wizard that collects comprehensive Ayurvedic clinical data, provides RAG-powered suggestions, generates provisional diagnoses, and can generate AI follow-up questions.

### Intake Flow

```
[1] start → Welcome message
    |
[2] Steps 0-4: Basic info (name, age, gender, occupation, area)
    |
[3] Step 5: Chief complaint entry
    |  - RAG-powered: getRelatedDiseases() suggests matching conditions
    |
[4] Steps 6-12: Complaint details
    |  - Step 6: Duration (with disease hints from knowledge base)
    |  - Step 7: Severity (1-10 scale)
    |  - Step 8: Location
    |  - Step 9: Onset (sudden/gradual)
    |  - Step 10: Aggravating factors (RAG: getAggravatingFactorSuggestions)
    |  - Step 11: Relieving factors (RAG: getRelievingFactorSuggestions)
    |  - Step 12: Associated symptoms (RAG: getRelatedSymptoms)
    |
[5] Steps 13-15: Medical history (comorbidities, medications, allergies)
    |
[6] Steps 16-23: Ashtavidha Pariksha (8-fold examination)
    |  - Nadi (Pulse): Vata/Pitta/Kapha patterns with descriptions
    |  - Mootra (Urine): 7 options with Ayurvedic correlations
    |  - Mala (Stool): 7 options
    |  - Jivha (Tongue): 7 options with dosha indicators
    |  - Drik (Eyes): 6 options
    |  - Shabda (Voice): 6 options
    |  - Sparsh (Skin): 7 options
    |  - Aakriti (Build): 6 options
    |
[7] Steps 24-29: Dashavidha Pariksha (10-fold examination)
    |  - Prakriti (Natural Constitution): 7 types
    |  - Saara (Tissue Quality): 7 dhatu options
    |  - Samhanana (Body Compactness): 3 options
    |  - Satva (Mental Strength): 3 levels
    |  - Ahara Shakti (Digestive Capacity): 4 types
    |  - Vyayama Shakti (Exercise Tolerance): 3 levels
    |
[8] showDiagnosis → Rule-based diagnosis engine + knowledge base enrichment
    |
[9] generateFollowup → LLM-generated follow-up questions (meta/llama-3.1-8b-instruct)
    |
[10] answerFollowup → Store follow-up answers in medicalHistory
    |
[11] Persist case to Supabase + embed into RAG (fire-and-forget)
```

### RAG Integration Points

| Step | RAG Function | Purpose |
|------|-------------|---------|
| 6 | `getRelatedDiseases()` | Suggests conditions matching the complaint |
| 10 | `getAggravatingFactorSuggestions()` | Suggests aggravating factors from disease data |
| 11 | `getRelievingFactorSuggestions()` | Suggests relieving factors (pathya) from disease data |
| 12 | `getRelatedSymptoms()` | Suggests associated symptoms from clinical features |

### AI Follow-up Question Generation
- Model: `meta/llama-3.1-8b-instruct` (fast, 8B)
- Temperature: 0.4
- Max tokens: 1500
- Uses `buildFollowupPrompt()` from treatment-prompts.ts
- Returns 3-5 JSON-formatted questions with rationale and category

### Progress Tracking
30 total steps tracked via `calculateProgress()`:
- Steps 0-4: Basic info (5 fields)
- Steps 5-12: Complaint details (8 fields including complaint entry)
- Steps 13-15: Medical history (3 fields)
- Steps 16-23: Ashtavidha Pariksha (8 fields)
- Steps 24-29: Dashavidha Pariksha (6 fields)

### Case Persistence
- Inserts full case record into `cases` table
- Fire-and-forget embeds case into RAG via `embedCaseToKnowledge()`
- Case number format: `CASE-{timestamp}-{4-char-random}`

---

## 9. Diagnosis Engine

**File:** `src/lib/diagnosis-engine.ts` (319 lines)

### Purpose
Rule-based symptom-to-disease matching engine that produces provisional Ayurvedic diagnoses with dosha analysis and probability scoring.

### Symptom Weight Database

24 weighted symptom entries mapping to specific diseases:

| Symptom | Weight | Mapped Diseases |
|---------|--------|----------------|
| joint_pain | 3 | Sandhi Vata, Amavata, Vata Vyadhi |
| morning_stiffness | 3 | Amavata, Sandhi Vata |
| swelling_joint | 3 | Amavata, Sandhi Vata |
| polyuria | 3 | Prameha |
| polydipsia | 3 | Prameha |
| skin_rash | 3 | Kushtha |
| breathlessness | 3 | Swasa, Hridroga |
| chest_pain | 3 | Hridroga |
| weakness_one_side | 3 | Pakshaghata |
| facial_deviation | 3 | Ardita, Pakshaghata |
| ... | 2 | Various |

### Symptom Normalization
Natural language symptoms are normalized to canonical keys:
- "knee pain" -> `joint_pain`
- "can't sleep" -> `insomnia`
- "shortness of breath" -> `breathlessness`
- "gas" -> `bloating`
- etc.

### Dosha Extraction (`extractDoshaFromSymptoms`)
Scans symptom text for dosha-indicating keywords:

| Dosha | Indicators |
|-------|-----------|
| Vata | pain, dry, constipation, nervous, anxiety, insomnia, cracking, cold |
| Pitta | burning, heat, inflammation, redness, acidity, irritability |
| Kapha | heavy, congestion, cold, swelling, lethargy, slow |

### Probability Scoring
```
probability = min(totalWeight / 10, 1.0)
```

### Main Function: `analyzeProvisionalDiagnosis(caseData)`

1. Collects all symptoms from chief complaints + aggravating/relieving/associated factors + examination findings
2. Normalizes and scores against symptom weight database
3. Matches against DISEASES knowledge base
4. Extracts dosha involvement
5. Calculates severity and duration scores
6. Determines if more questions are needed (probability < 0.5, severity > 7, duration > 4, or < 1 complaint)
7. Returns: primary diagnosis, up to 3 differentials, reasoning string, suggested questions

### `needsMoreQuestions` Triggers
- No disease matches
- Top match probability < 50%
- Average severity > 7/10
- Duration score > 4 (chronic)
- No chief complaints recorded

### Diagnosis Display
Produces formatted markdown with:
- Primary suspect (disease name, Sanskrit, category, samprapti, dosha, confidence %)
- Differential considerations
- Confirm/Refine/Correct action buttons

---

## 10. Investigation Analyzer

**File:** `src/lib/investigation-analyzer.ts` (295 lines)

### Purpose
Regex-based lab report parser that extracts numerical values from text, compares against normal ranges, and provides Ayurvedic clinical correlations.

### Supported Lab Parameters (21 parameters)

| Parameter | Normal Range | Unit | Ayurvedic Correlation |
|-----------|-------------|------|----------------------|
| Hemoglobin | 12-18 | g/dL | Rakta status - low Hb suggests Raktalpata |
| WBC | 4000-11000 | /cu mm | Immune status indicator |
| RBC | 4.0-6.0 | million/cu mm | Rakta Dhatu indicator |
| Platelets | 150000-400000 | /cu mm | Blood coagulation status |
| ESR | 0-20 | mm/hr | Inflammation - elevated suggests Ama/Pitta |
| Fasting Glucose | 70-100 | mg/dL | Prameha indicator - Medodhatu imbalance |
| PP Glucose | 70-140 | mg/dL | Prameha indicator |
| HbA1c | 4.0-5.7 | % | Long-term glucose - Prameha |
| Total Cholesterol | 0-200 | mg/dL | Meda Dhatu status |
| Triglycerides | 0-150 | mg/dL | Kapha/Meda dominance |
| HDL | 40-100 | mg/dL | Good cholesterol - metabolic indicator |
| LDL | 0-100 | mg/dL | Medovaha Srotas involvement |
| SGOT/AST | 0-40 | U/L | Pitta involvement |
| SGPT/ALT | 0-40 | U/L | Pitta/Rakta involvement |
| Bilirubin | 0.2-1.2 | mg/dL | Pitta/Rakta indicator |
| Alkaline Phosphatase | 40-120 | U/L | Liver/bone marker |
| Creatinine | 0.6-1.2 | mg/dL | Mutravaha Srotas involvement |
| BUN | 7-20 | mg/dL | Kidney function |
| Uric Acid | 3.5-7.2 | mg/dL | Vata/Kapha accumulation |
| TSH | 0.4-4.0 | mIU/L | Meda/Agni disorder |
| T3 | 80-200 | ng/dL | Thyroid function |
| T4 | 5.0-12.0 | ug/dL | Thyroid function |

### Value Status Classification

```
critical: value < normalMin * 0.7  OR  value > normalMax * 1.5
abnormal: value < normalMin  OR  value > normalMax
normal:   within range
```

(Floor of 0.3 * max for parameters with min=0)

### Key Functions

| Function | Purpose |
|----------|---------|
| `parseLabValue(text, parameter)` | Extracts numerical value using regex patterns |
| `getValueStatus(value, range)` | Classifies as normal/abnormal/critical |
| `analyzeLabReport(text)` | Full analysis: parse all parameters, classify, sort by severity |
| `formatFindingsForChat(findings)` | Markdown display with abnormal/normal sections |
| `generateCorrelationSummary(findings)` | Ayurvedic correlation summary for abnormal values |

### Output Sorting
Results sorted by severity: critical first, then abnormal, then normal.

---

## 11. Research Analyzer (PubMed Integration)

**File:** `src/lib/research-analyzer.ts` (463 lines)  
**File:** `src/lib/web-search.ts` (117 lines)

### Purpose
Fetches and analyzes PubMed research papers relevant to a patient's condition, using multiple search strategies and LLM-based relevance scoring.

### PubMed Integration

**APIs Used:**
- `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi` — Search for PMIDs
- `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi` — Fetch abstracts by PMIDs

**Rate Limiting:** Optional `NCBI_API_KEY` env var for 10 req/s (vs 3 without)

### Search Query Generation (`generateSearchQueries`)

Generates up to 8 targeted queries:

1. **Journal-specific:** Condition + trusted Ayurveda journals (12 journals)
2. **General Ayurveda:** Condition + (ayurveda OR ayurvedic OR traditional medicine)
3. **Diagnosis-specific:** Diagnosis + trusted journals
4. **Condition-specific:** Auto-generated based on complaint keywords:
   - Joint/arthritis -> osteoarthritis + boswellia/guggulu
   - Diabetes -> madhumeha + gymnema/fenugreek
   - Skin -> kushtha + neem/manjishtha
   - Digestive -> grahani + triphala/hingvastak
   - Anxiety -> vata vyadhi + ashwagandha/brahmi
   - Hypertension -> raktagata vata + arjuna/sarpagandha
   - Asthma -> shwasa + boswellia/vasa
   - Insomnia -> anidra + ashwagandha/jatamansi
5. **Integrative medicine:** Condition + (clinical trial OR RCT)

### Trusted Ayurveda Journals (12)

| Journal | Abbreviation |
|---------|-------------|
| Journal of Ayurveda and Integrative Medicine | J Ayurveda Integr Med |
| AYU | AYU |
| International Journal of Ayurveda Research | Int J Ayurveda Res |
| Ancient Science of Life | Anc Sci Life |
| Indian Journal of Traditional Knowledge | Indian J Tradit Knowl |
| Journal of Ayurvedic and Herbal Med | J Ayurvedic Herb Med |
| Journal of Ethnopharmacology | J Ethnopharmacol |
| J Alternative and Complementary Med | J Altern Complement Med |
| BMC Complementary and Alternative Med | BMC Complement Altern Med |
| Evidence-Based Complementary and Alt Med | Evid Based Complement Alternat Med |
| Phytomedicine | Phytomedicine |
| J Ethnobiology and Ethnomedicine | J Ethnobiol Ethnomed |

### LLM Paper Analysis (`analyzePapersWithLLM`)

- Model: `meta/llama-3.3-70b-instruct`
- Temperature: 0.3
- Max tokens: 2000
- Batch size: 5 papers per LLM call
- Trusted journal boost: +2 to relevance score
- Minimum relevance threshold: 5/10 (lowered to 4 if < 10 papers)
- Maximum output: 15 papers

### Paper Scoring

Each paper receives:
- `relevanceScore`: 1-10 (boosted +2 for trusted journals)
- `keyFindings`: 2-3 sentence summary
- `ayurvedicRelevance`: How it relates to Ayurvedic treatment

### Comprehensive Research Context

```
getComprehensiveResearchContext(complaints, duration, diagnosis, prakriti)
    |
    +--- PubMed search (all queries in parallel)
    |    - Up to 40 unique PMIDs
    |    - Fetch abstracts (XML parsing)
    |    - LLM analysis for relevance
    |
    +--- Web search (parallel)
    |    - 10 journal-focused queries
    |    - DuckDuckGo HTML scraping
    |    - Rate limited (1.2s between requests)
    |
    v
ComprehensiveResearchContext {
  papers: ResearchPaper[],
  summary: string,
  searchQueries: string[],
  totalFound: number,
  webResults: WebSearchResult[],
  formattedResearch: string,
  formattedWeb: string,
}
```

### Web Search Integration (`web-search.ts`)

- Provider: DuckDuckGo HTML (no API key required)
- Rate limiting: 1.2 seconds between requests
- Timeout: 15 seconds per request
- User-Agent: Chrome-like browser string
- Parallel execution for multiple queries
- URL deduplication across queries

---

## 12. Input-Based RAG Learning

**File:** `src/lib/input-learning.ts` (517 lines)

### Purpose
Chunks confirmed clinical cases, treatment protocols, and outcomes into embeddings and adds them back to the knowledge base, so future RAG queries surface real clinical experience alongside textbook knowledge.

### Chunking Strategy

Each clinical case is split into up to 7 semantic chunks (max 400 chars each):

| Chunk | Content | Source Type |
|-------|---------|-------------|
| 1. Overview | Case number, prakriti, diagnosis, complaints summary, duration, comorbidities | description |
| 2. Symptoms | Detailed complaint list with duration, severity, location, aggravating/relieving factors | description |
| 3. Examination | Ashtavidha Pariksha + Dashavidha findings | description |
| 4. Diagnosis | Provisional diagnosis + reasoning | description |
| 5. Treatment Plan | Full treatment plan text | procedure |
| 6. Protocol | First 400 chars of treatment protocol (if exists) | procedure |
| 7. Outcome | Outcome label, rating, doctor notes, what worked/didn't work | description |

### Deterministic UUIDs
Uses SHA-256 hashing to generate deterministic UUIDs for each chunk, ensuring idempotent upserts:
```typescript
deterministicUuid(`clinical_cases:${caseId}:${section}`)
```

### Embedding + Upsert Pipeline

```
Clinical Case Data
    |
    v
chunkClinicalCase() — Split into 7 chunk types
    |
    v
generateBatchEmbeddings() — NVIDIA nv-embedqa-e5-v5 (passage mode)
    |
    v
Batch upsert to knowledge_embeddings (10 per batch)
    |  - On batch failure: retry each row individually
    v
Done
```

### Public API Functions

| Function | Purpose | Trigger |
|----------|---------|---------|
| `embedCaseToKnowledge(caseId)` | Embed a new case into RAG | After case creation |
| `reembedCaseWithOutcome(caseId, outcome)` | Re-embed with outcome data | After case completion/feedback |
| `embedTreatmentProtocol(protocolNum, content, dx, prakriti)` | Embed a generated protocol | After protocol generation |

### Outcome Enrichment
When re-embedding with outcomes:
- `what_worked` / `what_didnt_work` arrays are included
- Corrected diagnoses override original
- Correction reasons appended to reasoning

### Treatment Protocol Chunking
Splits protocol content by sentence boundaries into 400-char chunks. Adds a separate prakriti context chunk if available.

---

## 13. SYSTEM_PROMPT — Ayurvedic Knowledge Encoding

**File:** `src/lib/types.ts` (277 lines)  
**Location:** Lines 112-215

### Purpose
The main system prompt that defines the AI's identity, knowledge base structure, and response guidelines for the chat interface.

### Knowledge Sections Encoded

| Section | Content |
|---------|---------|
| 1. Fundamentals | Tridosha, Saptadhatu, Agni, Srotas, Ama |
| 2. Diagnostic Methods | Trividha, Ashtavidha, Dashavidha Pariksha, Prakriti/Vikriti assessment |
| 3. Diseases | Prameha, Raktagata Vata, Sandhivata, Grahani, Kushtha, Swasa, Unmada |
| 4. Herbs | 700+ herbs, 15 core herbs, Rasa/Guna/Virya/Vipaka properties |
| 5. Treatments | Panchakarma (5 procedures), Purva Karma, Rasayana |
| 6. Allopathy Integration | Drug-herb interactions, combined protocols, safety warnings |
| 7. Specialties | All 8 branches of Ashtanga Ayurveda |
| 8. Charak Samhita | All 120 chapters across 8 Sthanas with descriptions |
| 9. WHO Terminology | 3545 terms across 9 categories with ITA codes |

### Response Guidelines
1. Always include medical disclaimers
2. Check drug interactions when combining Ayurveda with allopathy
3. Ask clarifying questions for Prakriti assessment
4. Reference classical texts (Charaka, Sushruta, Ashtanga Hridaya, Bhavaprakasha)
5. Never provide definitive diagnoses
6. Specific drug interaction warnings: Guggulu+Anticoagulants, Turmeric+Blood thinners, Ashwagandha+Sedatives, Garlic+HIV/Warfarin
7. USE knowledge base context provided
8. CITE specific sources (ITA codes, chapter names)

### Response Format
- Markdown formatting
- Clear headings
- Sanskrit terms with English explanations
- Dosha analysis for conditions
- Pathya/Apathya dietary advice
- Source citations (ITA codes, Charak chapters)

---

## 14. Knowledge Base Architecture

**File:** `src/lib/ayurknowledge/index.ts` (257 lines)

### Purpose
Central hub for all in-memory Ayurvedic knowledge. Aggregates 12+ knowledge modules into a single `AYURVEDA_KNOWLEDGE` object.

### Knowledge Modules

| Module | Source File | Description |
|--------|-----------|-------------|
| fundamentals | `fundamentals.ts` | Tridosha, Ashtangas |
| diagnostics | `diagnostics.ts` | Diagnostic methods |
| diseases | `diseases.ts` | Disease database |
| herbs | `herbs.ts` | Herbs, drug interactions, Rasa/Guna/Virya/Vipaka |
| treatments | `treatments.ts` | Panchakarma, Purvakarma, Rasayana, Pathya/Apathya, Dinacharya, Ritucharya |
| allopathy | `allopathy.ts` | Integration protocols, drug interaction DB, prescribing guidelines, safety warnings |
| charak-samhita | `charak-samhita.ts` | Charak Samhita summary |
| charak | `charak.ts` | Complete 120-chapter searchable Charak Samhita |
| sushruta | `sushruta.ts` | Sushruta Samhita chapters |
| clinical-evidence | `clinical-evidence.ts` | PubMed-sourced clinical evidence |
| external-qa | `external-qa.ts` | Ayurveda Q&A database |
| modern-medicines | `modern-medicines.ts` | Modern medicine database |

### Metadata
- Charak Samhita: 120 chapters, 8 Sthanas
- WHO Terminology: 3545 terms
- Sushruta Samhita: Variable chapters

### Key Functions

| Function | Purpose |
|----------|---------|
| `searchKnowledge(query)` | Full-text search across diseases, herbs, treatments, modern medicines |
| `getDiseaseInfo(name)` | Detailed disease information with treatment, pathya, apathya |
| `getTreatmentInfo(name)` | Treatment procedure, indications, contraindications |
| `checkDrugInteraction(herb, drugClass)` | Drug-herb interaction lookup |
| `getAllopathyIntegration(condition)` | Integrated treatment approach |
| `getPrakritiGuidance(prakriti)` | Constitution-specific recommendations |
| `getHerbInteractions(herbName)` | All interactions for a given herb |
| `searchCharakSamhita(query)` | Search all 120 Charak chapters |
| `getCharakTreatmentProtocols(diagnosis)` | Charak treatment references for a diagnosis |
| `getCharakDiseaseDescriptions(diagnosis)` | Charak disease descriptions |

---

## 15. Web Search Integration

**File:** `src/lib/web-search.ts` (117 lines)

### Purpose
Provides web search capability using DuckDuckGo HTML scraping for supplementary research sources.

### Implementation
- Provider: DuckDuckGo HTML interface (no API key needed)
- Rate limiting: 1.2 seconds between requests
- Timeout: 15 seconds per request
- Parallel execution for multiple queries
- URL deduplication

### Key Functions

| Function | Purpose |
|----------|---------|
| `searchWeb(query, maxResults)` | Single query web search |
| `searchWebMultiple(queries[], maxResultsPerQuery)` | Parallel multi-query search |
| `formatWebResultsForContext(results)` | Formats results for LLM context |

### Result Format
```typescript
interface WebSearchResult {
  title: string
  snippet: string
  url: string
}
```

---

## 16. Cross-Component Data Flow

### Full Treatment Protocol Generation Flow

```
Patient Intake (30-step wizard)
    |
    v
Case Data + Provisional Diagnosis (diagnosis-engine.ts)
    |
    v
Treatment Protocol Request
    |
    +--- PubMed Research (research-analyzer.ts)
    |    |--- esearch.fcgi (search PMIDs)
    |    |--- efetch.fcgi (fetch abstracts)
    |    |--- LLM analysis (llama-3.3-70b)
    |    |--- Web search (DuckDuckGo)
    |
    +--- RAG Search (vector-rag.ts)
    |    |--- Embedding (nv-embedqa-e5-v5)
    |    |--- pgvector semantic search
    |    |--- Full-text fallback
    |    |--- Hybrid re-ranking
    |
    +--- Charak Samhita (charak.ts)
    |    |--- 120-chapter search
    |
    +--- Disease Descriptions (charak.ts)
    |
    v
buildProtocolPrompt() (treatment-prompts.ts)
    |
    v
LLM: Mistral Large 3 (675B) — temperature 0.4
    |
    v
16-Section Protocol (4000-6000 words)
    |
    +--- Persist to Supabase
    +--- Embed into RAG (input-learning.ts)
```

### Chat with RAG Flow

```
User Message
    |
    v
analyzeQuery() — Intent detection
    |
    v
vectorSearch() — Semantic + full-text retrieval
    |
    v
formatVectorResultsForContext() — Structured context
    |
    v
SYSTEM_PROMPT + RAG Context
    |
    v
LLM: Selected model (default Mistral Large 3)
    |
    v
Streamed Response
    |
    +--- Persist conversation + messages
```

### Learning Loop

```
Clinical Case Created
    |
    v
embedCaseToKnowledge() — Chunk + embed into RAG
    |
    v
Case Completed / Feedback
    |
    v
reembedCaseWithOutcome() — Re-embed with outcomes
    |
    v
Future RAG queries surface clinical experience
```

---

## 17. Configuration & Environment Variables

| Variable | Required | Description | Used By |
|----------|----------|-------------|---------|
| `NVIDIA_API_KEY` | Yes | NVIDIA NIM API key | nvidia-client, embedding-client |
| `NCBI_API_KEY` | No | NCBI API key for higher PubMed rate limits | research-analyzer |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL | supabase/client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key | supabase/client |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key | supabase/client (server-side) |

### Model Configuration

| Model | Used For | Parameters | Context |
|-------|----------|-----------|---------|
| `mistralai/mistral-large-3-675b-instruct-2512` | Chat (default), Treatment protocols | 675B | 128K |
| `meta/llama-3.3-70b-instruct` | Research paper analysis | 70B | 128K |
| `meta/llama-3.1-8b-instruct` | Follow-up question generation | 8B | 128K |
| `nvidia/nv-embedqa-e5-v5` | Embeddings | - | 1024 dim |

### Available Chat Models (10 options)

| Model ID | Name | Description |
|----------|------|-------------|
| `mistralai/mistral-large-3-675b-instruct-2512` | Mistral Large 3 (675B) | Best reasoning |
| `qwen/qwen3-coder-480b-a35b-instruct` | Qwen 3 Coder (480B) | Massive MoE |
| `nvidia/llama-3.3-nemotron-super-49b-v1.5` | Nemotron Super 49B | Fast + clinical |
| `qwen/qwen3.5-397b-a17b` | Qwen 3.5 (397B) | Powerful reasoning |
| `meta/llama-3.3-70b-instruct` | Llama 3.3 70B | Reliable general-purpose |
| `mistralai/mistral-nemotron` | Mistral Nemotron | NVIDIA-tuned |
| `qwen/qwen3-next-80b-a3b-instruct` | Qwen 3 Next 80B | Fast MoE |
| `deepseek-ai/deepseek-v4-flash` | DeepSeek V4 Flash | Fast reasoning |
| `meta/llama-3.2-90b-vision-instruct` | Llama 3.2 90B Vision | Image + text |
| `meta/llama-3.1-8b-instruct` | Llama 3.1 8B | Ultra-fast, low cost |

---

## 18. Error Handling Patterns

### Pattern 1: Fire-and-Forget with Silent Failure
Used for non-critical operations (persistence, logging, embedding):
```typescript
someAsyncOperation().catch(err => console.warn('[Tag] Error:', err))
```

Examples:
- Conversation/message persistence (chat route)
- Case persistence (intake route)
- Protocol persistence (treatment-protocol route)
- Case embedding (input-learning)
- Search history logging (vector-rag)

### Pattern 2: Graceful Degradation
Used for RAG and research where partial results are better than none:
```typescript
const [research, rag, charak] = await Promise.all([
  getResearch().catch(() => null),
  getRAG().catch(() => []),
  getCharak(),  // synchronous, no catch needed
])
```

### Pattern 3: Retry with Backoff
Used for external API calls:
- Embedding client: 3 attempts, 500ms-2000ms delays
- OpenAI SDK retries: 2 attempts (chat completions)
- PubMed: No retry (8-10s timeouts)

### Pattern 4: Fallback Chains
Used in diagnosis and knowledge retrieval:
```
LLM diagnosis → Rule-based diagnosis → Knowledge base search → Generic response
```

### Pattern 5: Input Validation
All API routes use Zod schemas for request validation:
```typescript
const body = RequestSchema.parse(await req.json())
```

### Pattern 6: Timeout Management
- PubMed search: 8 seconds
- PubMed fetch: 10 seconds
- Web search: 15 seconds
- No explicit timeout on NVIDIA API calls (relies on SDK defaults)

---

## File Index

| File | Lines | Purpose |
|------|-------|---------|
| `src/server/api-key.ts` | 11 | NVIDIA API key management |
| `src/lib/nvidia-client.ts` | 50 | NVIDIA NIM client + chat streaming |
| `src/lib/embedding-client.ts` | 71 | Embedding generation with retry |
| `src/lib/web-search.ts` | 117 | DuckDuckGo web search |
| `src/lib/ayurknowledge/index.ts` | 257 | Knowledge base hub |
| `src/lib/types.ts` | 277 | Types + SYSTEM_PROMPT |
| `src/lib/investigation-analyzer.ts` | 295 | Lab report parsing |
| `src/lib/diagnosis-engine.ts` | 319 | Rule-based diagnosis |
| `src/app/api/treatment-protocol/route.ts` | 317 | Treatment protocol API |
| `src/lib/ayurrag/query-engine.ts` | 393 | Query analysis + direct responses |
| `src/lib/ayurrag/vector-rag.ts` | 411 | Vector RAG engine |
| `src/lib/treatment-prompts.ts` | 441 | Protocol + follow-up prompts |
| `src/lib/research-analyzer.ts` | 463 | PubMed integration |
| `src/lib/input-learning.ts` | 517 | Clinical case embedding |
| `src/lib/supabase/services.ts` | 623 | Supabase data access layer |
| `src/app/api/intake/route.ts` | 1,129 | Intake wizard API |
| **Total** | **5,976** | |
