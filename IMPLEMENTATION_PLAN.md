# Ayurved Clinical AI - Comprehensive Backend & Mobile Improvement Plan
## Date: 2026-05-21 | Author: OpenClaude | Status: APPROVED

---

## Overview
Complete backend overhaul, bug fix completion, RAG pipeline enhancement, knowledge base expansion, mobile-first responsive conversion, new feature implementation, and production hardening.

## Phases & Tasks Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Bug Fixes | 4 tasks | Complete all remaining known bugs |
| 2. Backend API | 4 tasks | API route improvements, error handling, validation |
| 3. RAG Pipeline | 4 tasks | Embedding, search, context, caching |
| 4. Knowledge Base | 3 tasks | Charak expansion, content quality |
| 5. Mobile UI | 5 tasks | Full responsive conversion |
| 6. New Features | 4 tasks | Patient management, analytics, exports |
| 7. Performance | 3 tasks | Caching, optimization, security |
| 8. Verification | 2 tasks | Build test, integration check |

**Total: 29 tasks, 150+ subtasks**

---

## PHASE 1: REMAINING BUG FIXES (Priority: CRITICAL)

### Task 1.1: Fix Investigation Analyzer Regex Bug
- **File:** `src/lib/investigation-analyzer.ts`
- **Issue:** Total Cholesterol regex `/\bcholesterol\b.*?(\d+\.?\d*)/i` matches LDL/HDL lines first
- **Fix:** Make Total Cholesterol regex more specific — require "total" keyword or exclude lines containing LDL/HDL
- **Subtasks:**
  1. Read investigation-analyzer.ts lines 69-73
  2. Update Total Cholesterol patterns to require "total" or "chol." prefix
  3. Add negative lookahead for LDL/HDL/Triglycerides
  4. Test regex against sample lab report strings
  5. Verify TypeScript compilation

### Task 1.2: Fix Attachments Not Sent to AI API
- **File:** `src/components/ChatInput.tsx`
- **Issue:** File content collected but never included in API request body
- **Fix:** Include attachment content (base64 for images, text for PDFs) in the chat API request
- **Subtasks:**
  1. Read ChatInput.tsx handleSend function (line 76-208)
  2. Modify `body` construction to include attachment data
  3. For images: send base64 via vision API or include in chat context
  4. For PDFs: include extracted text as context in the message
  5. Add attachment metadata to the message sent to API
  6. Update API route to handle attachment context
  7. Test with image and PDF uploads

### Task 1.3: Fix Date.now() Message IDs in CaseCollectorChat
- **File:** `src/components/CaseCollectorChat.tsx`
- **Issue:** Uses `Date.now()` for message IDs instead of `generateId()`
- **Fix:** Replace all `Date.now()` ID generation with `generateId()` from utils
- **Subtasks:**
  1. Import `generateId` from `@/lib/utils`
  2. Replace all `msg_${Date.now()}` patterns with `generateId()`
  3. Replace all `msg_progress_${Date.now()}` patterns
  4. Verify no duplicate ID generation

### Task 1.4: Fix ResizableLayout Event Listener Leak
- **File:** `src/components/ResizableLayout.tsx`
- **Issue:** mousemove/mouseup listeners added in handleMouseDown but not cleaned up on component unmount
- **Fix:** Use useEffect cleanup or track listeners for proper removal
- **Subtasks:**
  1. Add useEffect cleanup to remove any lingering event listeners on unmount
  2. Store listener references in refs for cleanup access
  3. Add touch event support for mobile drag

---

## PHASE 2: BACKEND API IMPROVEMENTS (Priority: HIGH)

### Task 2.1: Enhance Chat API with Conversation Persistence
- **File:** `src/app/api/chat/route.ts`
- **Improvements:**
  1. Save conversations to Supabase `conversations` table
  2. Save individual messages to `messages` table
  3. Add conversation session management
  4. Include attachment context in RAG search
  5. Add rate limiting per session
  6. Improve error responses with structured error codes
  7. Add request/response logging for debugging

### Task 2.2: Improve Intake API with Database Persistence
- **File:** `src/app/api/intake/route.ts`
- **Improvements:**
  1. Save intake sessions to `intake_sessions` table
  2. Save case data to `cases` table on completion
  3. Save chief complaints to `chief_complaints` table
  4. Save investigation findings to `investigation_findings` table
  5. Add multi-complaint support (add more complaints after first)
  6. Add family history question (step missing)
  7. Add medical history question (step missing)
  8. Add investigation text upload step
  9. Connect useCaseStore to persist completed cases
  10. Add provisional diagnosis refinement flow

### Task 2.3: Enhance Treatment Protocol API
- **File:** `src/app/api/treatment-protocol/route.ts`
- **Improvements:**
  1. Save generated protocol to `treatment_protocols` table
  2. Add RAG context from knowledge base to protocol generation
  3. Include Charak Samhita references in protocol
  4. Add diet chart generation based on prakriti
  5. Add lifestyle recommendations (Dinacharya/Ritucharya)
  6. Include drug interaction warnings in protocol
  7. Add protocol versioning support
  8. Improve protocol formatting with markdown

### Task 2.4: Add Missing API Routes
- **New files needed:**
  1. `src/app/api/patients/route.ts` — CRUD for patient records
  2. `src/app/api/cases/route.ts` — Case management
  3. `src/app/api/attachments/route.ts` — File upload to Supabase Storage
  4. `src/app/api/analytics/route.ts` — Doctor statistics
  5. `src/app/api/export/route.ts` — Case/protocol export (PDF/JSON)

---

## PHASE 3: RAG PIPELINE ENHANCEMENT (Priority: HIGH)

### Task 3.1: Improve Embedding Quality
- **Files:** `src/lib/embedding-client.ts`, `scripts/embed-knowledge.ts`
- **Improvements:**
  1. Add chunk overlap (50-token overlap between chunks) to prevent context loss at boundaries
  2. Split monolithic chunks that exceed 512-token limit
  3. Add metadata enrichment to each chunk (source, category, chapter)
  4. Implement incremental embedding (only re-embed changed content)
  5. Add embedding quality metrics (dimension validation, NaN checks)
  6. Regenerate all embeddings with improved chunking

### Task 3.2: Enhance Vector Search
- **File:** `src/lib/ayurrag/vector-rag.ts`
- **Improvements:**
  1. Add hybrid scoring: combine vector similarity + keyword match + recency
  2. Implement result re-ranking based on query intent
  3. Add category-aware search (boost Charak results for treatment queries)
  4. Add search result caching (in-memory LRU cache for repeated queries)
  5. Implement multi-query expansion (generate 2-3 query variations)
  6. Add search analytics dashboard data
  7. Lower minRelevance threshold to 0.25 for broader recall

### Task 3.3: Improve Context Formatting
- **File:** `src/lib/ayurrag/vector-rag.ts` (formatVectorResultsForContext)
- **Improvements:**
  1. Format context with structured sections (Diseases, Herbs, Treatments, Charak)
  2. Add source citations with ITA codes for WHO terms
  3. Limit context to stay within token budget (~3000 tokens)
  4. Prioritize clinical relevance over breadth
  5. Add safety warnings for drug interaction results
  6. Deduplicate similar results

### Task 3.4: Add Query Intelligence Layer
- **File:** `src/lib/ayurrag/query-engine.ts`
- **Improvements:**
  1. Integrate query engine with chat API (currently unused)
  2. Use query intent analysis to boost relevant search categories
  3. Add entity extraction to improve search precision
  4. Connect safety warning system to chat responses
  5. Add Dosha-aware search personalization

---

## PHASE 4: KNOWLEDGE BASE EXPANSION (Priority: MEDIUM-HIGH)

### Task 4.1: Expand Sutra Sthana to 5000+ Lines
- **File:** `src/lib/ayurknowledge/charak/sutra-sthana.ts`
- **Current:** 2956 lines | **Target:** 5000+ lines
- **Approach:** Direct editing, one chapter at a time (per user preference)
- **Subtasks:**
  1. Read current file structure and identify thin chapters
  2. For each of 30 chapters, add: 10-15 shlokas, 5-10 treatment protocols, 5-8 disease descriptions, dietary guidelines
  3. Ensure each chapter reaches ~170 lines minimum
  4. Fix any unescaped apostrophes
  5. Verify TypeScript compilation after each batch of 5 chapters

### Task 4.2: Expand Kalpa Sthana to 5000+ Lines
- **File:** `src/lib/ayurknowledge/charak/kalpa-sthana.ts`
- **Current:** 1891 lines | **Target:** 5000+ lines
- **Subtasks:**
  1. Read current 12 chapters
  2. Add detailed formulations for each Kalpa (emetic/purgative drugs)
  3. Add 500+ classical formulations with ingredients, dosage, indications
  4. Add shlokas with Sanskrit and translations
  5. Add pharmaceutical preparation methods
  6. Verify TypeScript compilation

### Task 4.3: Expand Siddhi Sthana to 5000+ Lines
- **File:** `src/lib/ayurknowledge/charak/siddhi-sthana.ts`
- **Current:** 986 lines | **Target:** 5000+ lines
- **Subtasks:**
  1. Read current 12 chapters
  2. Add detailed Basti procedures and complications management
  3. Add shlokas with translations
  4. Add treatment protocols for Panchakarma completion
  5. Add dietary guidelines and post-procedure care
  6. Verify TypeScript compilation

---

## PHASE 5: MOBILE-FIRST RESPONSIVE CONVERSION (Priority: HIGH)

### Task 5.1: Make Layout Fully Responsive
- **Files:** `src/app/page.tsx`, `src/components/ResizableLayout.tsx`
- **Subtasks:**
  1. Add mobile breakpoint detection (useMediaQuery hook)
  2. On mobile (<768px): stack chat and canvas vertically instead of side-by-side
  3. Add mobile tab bar to switch between Chat and Canvas views
  4. Remove resizable divider on mobile (full-width panels)
  5. Add swipe gestures for panel switching
  6. Make header responsive with hamburger menu for modules
  7. Add bottom navigation bar for mobile
  8. Test on 375px, 390px, 414px, 768px viewports

### Task 5.2: Make Chat Input Mobile-Friendly
- **File:** `src/components/ChatInput.tsx`
- **Subtasks:**
  1. Make textarea auto-resize properly on mobile
  2. Add virtual keyboard handling (viewport resize)
  3. Make file upload button larger touch target (min 44px)
  4. Make attachment previews scrollable horizontally on mobile
  5. Add camera capture option for mobile image upload
  6. Ensure send button is easily tappable (min 44px)
  7. Add voice input button for mobile
  8. Fix bottom padding for mobile keyboard overlap

### Task 5.3: Make Module Sidebar Mobile-Responsive
- **File:** `src/components/ModuleSidebar.tsx`
- **Subtasks:**
  1. On mobile: convert to bottom sheet or drawer overlay
  2. Add hamburger menu button in header for mobile
  3. Add slide-in animation for mobile sidebar
  4. Add backdrop overlay when sidebar is open on mobile
  5. Auto-close sidebar on module selection (mobile)
  6. Make module cards touch-friendly (min 48px height)
  7. Add swipe-to-close gesture

### Task 5.4: Make CaseCollectorChat Mobile-Optimized
- **File:** `src/components/CaseCollectorChat.tsx`
- **Subtasks:**
  1. Make option buttons full-width on mobile with larger touch targets
  2. Make scale slider larger for touch interaction
  3. Stack suggestion chips vertically on narrow screens
  4. Make progress bar more prominent on mobile
  5. Add step indicator (Step X of 30) for mobile clarity
  6. Ensure diagnosis buttons are full-width on mobile
  7. Add keyboard-aware scrolling

### Task 5.5: Make Canvas Panel Mobile-Responsive
- **File:** `src/components/CanvasPanel.tsx`
- **Subtasks:**
  1. On mobile: make canvas a full-screen overlay or tab
  2. Add pinch-to-zoom for canvas content
  3. Make action buttons full-width on mobile
  4. Add floating action button for quick actions on mobile
  5. Make markdown tables horizontally scrollable
  6. Add share button for mobile (native share API)

---

## PHASE 6: NEW FEATURES (Priority: MEDIUM)

### Task 6.1: Patient Management System
- **Files:** New `src/app/api/patients/` routes, new `src/components/PatientManager.tsx`
- **Subtasks:**
  1. Create patient CRUD API routes
  2. Create patient list component with search/filter
  3. Create patient detail view with case history
  4. Add patient form with validation
  5. Connect to Supabase patients table
  6. Add patient code generation
  7. Add BMI auto-calculation

### Task 6.2: Case History & Outcomes Tracking
- **Files:** New components, database integration
- **Subtasks:**
  1. Create case list view with status filters
  2. Create case detail view showing all data
  3. Add outcome tracking (follow-up, ratings, notes)
  4. Add case learning system (doctor corrections)
  5. Connect useCaseStore to Supabase persistence
  6. Add case export (JSON/PDF)
  7. Add case comparison view

### Task 6.3: Diet Chart Generator Module
- **Files:** New `src/components/DietChartGenerator.tsx`, new API route
- **Subtasks:**
  1. Create diet chart API with prakriti-based recommendations
  2. Create diet chart UI component
  3. Include Pathya/Apathya from knowledge base
  4. Add meal planning with timing (Dinacharya)
  5. Add seasonal adjustments (Ritucharya)
  6. Generate downloadable diet chart

### Task 6.4: Lifestyle Advice Generator
- **Files:** New `src/components/LifestyleAdvice.tsx`, new API route
- **Subtasks:**
  1. Create lifestyle advice API using knowledge base
  2. Generate Dinacharya (daily routine) recommendations
  3. Generate Ritucharya (seasonal routine) recommendations
  4. Add exercise recommendations based on prakriti
  5. Add yoga/asana recommendations
  6. Create printable lifestyle guide

---

## PHASE 7: PERFORMANCE & SECURITY (Priority: MEDIUM)

### Task 7.1: Add Response Caching
- **Subtasks:**
  1. Add in-memory LRU cache for RAG search results (TTL: 5 min)
  2. Cache knowledge base lookups
  3. Cache embedding results for identical queries
  4. Add Cache-Control headers to API responses
  5. Implement stale-while-revalidate for PubMed searches

### Task 7.2: Security Hardening
- **Subtasks:**
  1. Add rate limiting middleware (10 req/min per IP for chat, 30 for intake)
  2. Add request size limits to all API routes
  3. Improve input sanitization (XSS prevention)
  4. Add CORS configuration
  5. Add API key rotation support
  6. Remove mongodb dependency from package.json
  7. Add CSP nonce for inline scripts
  8. Add audit logging for sensitive operations

### Task 7.3: Add ESLint Configuration
- **Subtasks:**
  1. Install eslint and next/eslint-config-next
  2. Create .eslintrc.json with Next.js recommended rules
  3. Add custom rules for the project
  4. Fix any lint errors
  5. Add lint script to package.json

---

## PHASE 8: BUILD VERIFICATION (Priority: CRITICAL)

### Task 8.1: TypeScript Build Verification
- **Subtasks:**
  1. Run `npx tsc --noEmit` after each phase
  2. Fix any type errors immediately
  3. Ensure all imports are valid
  4. Verify no unused variables

### Task 8.2: Full Build & Integration Test
- **Subtasks:**
  1. Run `npm run build` (Next.js production build)
  2. Verify no build errors
  3. Run `npm run lint` (after ESLint setup)
  4. Test all API routes with curl/Postman
  5. Test all UI flows manually
  6. Verify mobile responsiveness on all breakpoints
  7. Test RAG pipeline end-to-end
  8. Verify Supabase connections work

---

## Execution Order

```
Phase 1 (Bug Fixes) → Phase 2 (API) → Phase 3 (RAG) → Phase 8.1 (Build Check)
→ Phase 5 (Mobile) → Phase 4 (Knowledge) → Phase 6 (Features) 
→ Phase 7 (Performance) → Phase 8.2 (Full Verification)
```

## Key Files Modified

| File | Changes |
|------|---------|
| `investigation-analyzer.ts` | Regex fix |
| `ChatInput.tsx` | Attachments, mobile |
| `CaseCollectorChat.tsx` | IDs, mobile |
| `ResizableLayout.tsx` | Event leak, responsive |
| `ModuleSidebar.tsx` | Mobile drawer |
| `chat/route.ts` | Persistence, caching |
| `intake/route.ts` | DB persistence |
| `treatment-protocol/route.ts` | RAG context |
| `vector-rag.ts` | Search quality |
| `embedding-client.ts` | Chunk overlap |
| `sutra-sthana.ts` | 5000+ lines |
| `kalpa-sthana.ts` | 5000+ lines |
| `siddhi-sthana.ts` | 5000+ lines |
| `page.tsx` | Mobile layout |
| `globals.css` | Mobile styles |
| `package.json` | Dependencies |
