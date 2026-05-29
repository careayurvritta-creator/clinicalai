# Three-Mode Architecture Overhaul — Detailed Plan

> Ayurved Clinical AI: Chat Mode | Treatment Protocol Mode | Patient Documents Mode
> Date: 2026-05-29

---

## Executive Summary

Transform the current single-page app with module switching into **three completely independent modes**, each with its own layout, session management, and output rendering. The modes share no state — each is a self-contained experience.

---

## Current State Analysis

### What Exists
- **Single page** (`/page.tsx`) with `ResizableLayout` (chat + canvas)
- **Module switching** via `activeModule` in zustand store (`chat`, `documents`, `treatment-protocol`)
- **Shared state** — messages, sessions, canvas content all in one store
- **Session management** — already has `ChatSession` with per-module filtering
- **Desktop sidebar** — shows modules + session lists
- **Mobile nav** — bottom tab bar switching modules

### What Changes
- Each mode becomes its own page/route with independent state
- Module switching removed — navigation between modes via sidebar links
- Each mode has its own store slice (or separate store)
- Canvas/output rendering differs per mode
- Patient Documents gets Google Drive + Excel editor + AI chat sidebar

---

## Architecture: Three Independent Modes

### Mode 1: Chat Mode (`/chat`)
**Purpose:** General Ayurvedic clinical Q&A with ChatGPT-like sessions

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Sidebar (sessions) │ Chat Panel    │ Output Canvas   │
│                    │               │                 │
│ [New Chat]         │ Messages      │ Formatted       │
│ Session 1          │               │ markdown output │
│ Session 2          │               │ with proper     │
│ Session 3          │               │ headings,       │
│                    │               │ tables, etc.    │
│                    │               │                 │
│                    │ [Chat Input]  │                 │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Session list in sidebar (rename, delete, switch)
- Auto-titled sessions from first message
- Chat input with model selector
- Output canvas shows formatted response (markdown rendered with tables, headings, code blocks)
- Canvas toolbar (copy, export, etc.)
- Mobile: tabbed layout (Chat | Output)

**State:** Independent zustand store slice or separate store
- `sessions`, `activeSessionId`, `messages`, `canvasContent`
- No dependency on other modes

**API:** Uses existing `/api/chat` or new dedicated endpoint

---

### Mode 2: Treatment Protocol Generator (`/treatment-protocol`)
**Purpose:** Collect patient data → Generate diagnosis → Generate research-backed treatment protocol

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Sidebar (patient       │ Wizard/Chat  │ Protocol     │
│ sessions)              │              │ Output       │
│                        │              │              │
│ [New Protocol]         │ Intake       │ Research     │
│ Vijaydutt Sharma       │ wizard       │ article      │
│   └─ AAH229            │ steps        │ format       │
│ Patient Name 2         │              │              │
│   └─ Case ID           │ Follow-up    │ Treatment    │
│                        │ questions    │ protocol     │
│                        │              │              │
│                        │ Diagnosis    │ Literature   │
│                        │ confirm      │ review       │
│                        │              │              │
│                        │ [Input]      │              │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Sessions labeled by **patient name** (not generic "New Chat")
- 30-step intake wizard (existing `CaseCollectorChat` logic)
- Follow-up questions phase
- Diagnosis generation
- Treatment protocol streaming to canvas
- Canvas renders full research article (existing `ProtocolRenderer`)
- Mobile: tabbed layout (Assessment | Protocol)

**State:** Independent store
- `protocolSessions` — keyed by patient name
- `activeProtocolSessionId`
- `caseData` per session
- `protocolContent` (canvas)

**API:** Reuses existing `/api/intake`, `/api/treatment-protocol`

---

### Mode 3: Patient Documents (`/documents`)
**Purpose:** File explorer + document editor + AI-powered document generation from templates

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ Patient     │ Document Explorer    │ AI Chat Sidebar     │
│ Sidebar     │ (folders/files)      │ (Google Sheets      │
│             │                      │  style)             │
│ [Search]    │ ┌──────────────────┐ │                     │
│             │ │ 📁 OPD Register  │ │ [Model Selector]    │
│ Patient A   │ │ 📁 Therapy Log   │ │                     │
│ Patient B   │ │ 📁 Consultations │ │ "Create invoice     │
│ Patient C   │ │ 📁 Invoices      │ │  for today's visit" │
│             │ │ 📁 Discharge     │ │                     │
│             │ │ 📁 Lab Reports   │ │ AI generates        │
│             │ │ 📁 Certificates  │ │ documents based     │
│             │ └──────────────────┘ │ on templates +      │
│             │                      │ patient data        │
│             │ ┌──────────────────┐ │                     │
│             │ │ Excel Editor     │ │ [Chat Input]        │
│             │ │ (spreadsheet     │ │                     │
│             │ │  view of data)   │ │                     │
│             │ └──────────────────┘ │                     │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- **Patient sidebar** (left): list of patients with search, click to open their folder structure
- **Document explorer** (center): folder tree showing 20 document categories, files within each
- **Excel-like editor** (center, replaces explorer when editing): spreadsheet view for tabular data (invoices, registers, charts)
- **AI chat sidebar** (right): always visible, user types natural language commands to generate/edit documents
- **Google Drive integration**: files stored in patient's Drive folder, not backend storage
- **Template-based generation**: AI uses 20 document templates to create documents from patient data

**State:** Independent store
- `selectedPatientId`
- `currentFolder` (document category)
- `documents[]` (files in current folder)
- `editingDocument` (currently open in editor)
- `chatMessages` (AI sidebar conversation)
- `driveFolderId` (linked Google Drive folder)

**API:** New endpoints
- `/api/documents` — CRUD for document metadata
- `/api/documents/generate` — AI document generation
- `/api/drive/*` — Google Drive operations

---

## Google Drive Integration

### Authentication Options

**Option A: User OAuth (per-user)**
- Each user authenticates with their Google account
- App requests `drive.file` scope (only files created/opened by app)
- User selects/creates a root folder for patient documents
- Stored tokens in Supabase `user_drive_tokens` table

**Option B: Service Account (shared)**
- Single service account with domain-wide delegation
- All patient files in one shared Drive folder
- Folder structure: `Clinical AI/{Patient Name}/{Document Category}/`
- Service account credentials stored as env vars

**Implementation:**
```
Google Drive Folder Structure:
Clinical AI/
├── Vijaydutt Sharma (AAH229)/
│   ├── 01-OPD-Registers/
│   ├── 02-Therapy-Registers/
│   ├── 03-IPD-Registers/
│   ├── 04-Procedure-Registers/
│   ├── 05-Consultation-Notes/
│   ├── 06-Invoices/
│   ├── 07-Insurance-Forms/
│   ├── 08-Admission-Notes/
│   ├── 09-Treatment-Plans/
│   ├── 10-Rounds-Notes/
│   ├── 11-Nursing-Medicine-Charts/
│   ├── 12-Nursing-Panchakarma-Charts/
│   ├── 13-Discharge-Plans/
│   ├── 14-Discharge-Summaries/
│   ├── 15-Medical-Certificates/
│   ├── 16-Receipts/
│   ├── 17-Authorization-Status/
│   ├── 18-Garbha-Sanskar-Certificates/
│   ├── 19-Lab-Reports/
│   └── 20-Prescriptions/
├── Patient B (ID)/
│   └── ...
```

### Google Drive API Usage
- **Files API**: Create, read, update, delete files
- **Folders API**: Create folder structure per patient
- **Sheets API**: For spreadsheet documents (invoices, registers, charts)
- **Docs API**: For narrative documents (consultation notes, discharge summaries)
- **Picker API**: Let users select existing Drive folders to link

### Data Flow
```
User types in AI sidebar → AI generates document content
    → Create Google Sheet/Doc via API
    → Store metadata in Supabase (patient_id, category, drive_file_id, etc.)
    → Display in document explorer
    → Open in Excel-like editor (Sheets) or document viewer (Docs)
```

---

## Document Template System (20 Types)

Based on AAH229 analysis, create comprehensive templates:

### Template Categories

#### 1. Registers (Tabular — Google Sheets)
- **OPD Visit Register**: Date, Time, Token, Patient, Age, Gender, Mobile, Doctor, Purpose, Status
- **OPD Therapy Register**: Date, Session No, Therapy, Duration, Doctor, Therapist, Status, Remarks
- **IPD Visit Register**: Date, Time, Patient, Age, Gender, Mobile, Doctor, Type
- **Panchakarma Procedure Register**: Date, Session, Procedure, Duration, Doctor, Therapist, Vitals Before/After, Remarks

#### 2. Clinical Notes (Narrative — Google Docs)
- **OPD Consultation Note**: Chief Complaints, HPI, Past/Family/Personal History, Ashtavidha Pariksha, Prakriti, Investigations, Diagnosis, Treatment, Medications, Pathya/Apathya, Follow-up

#### 3. Financial (Tabular — Google Sheets)
- **Invoice**: Invoice No, Date, Patient, Code, Line Items, Qty, Rate, Amount, Subtotal, Discount, Tax, Total, Payment Mode
- **Receipts**: Receipt No, Date, Amount, Payment Mode, Reference

#### 4. Insurance (Mixed — Google Docs + Sheets)
- **IRDAI Pre-Authorisation Form**: Insurance, Policy, TPA, Claim Type, Diagnosis (ICD), Treatment, Stay, Cost, Status
- **Authorization Status**: Claim No, Status, Approved Amount, Validity

#### 5. IPD Documents (Mixed)
- **IPD Admission Note**: Date, Time, Doctor, Room, Bed, Complaints, Vitals, Diagnosis, Plan, Allergies, Consent
- **IPD Treatment Plan**: Poorvakarma, Pradhana Karma, Paschat Karma, Pathya, Apathya, Duration
- **IPD Consultant Rounds**: Date, Time, Doctor, Vitals, Notes, Medication Changes, Orders
- **IPD Nursing Medicine Chart**: Time, Medicine, Dose, Route, Given By, Remarks
- **IPD Nursing Panchakarma Chart**: Time, Procedure, Duration, Therapist, Vitals, Remarks
- **IPD Discharge Plan**: Date, Condition, Medications, Pathya, Apathya, Follow-up, Exercises

#### 6. Summaries & Certificates (Narrative — Google Docs)
- **Discharge Summary**: Discharge No, Admission/Discharge Dates, Stay, Diagnosis, Treatment, Investigations, Medications, Advice, Follow-up
- **Medical Certificate**: Certificate No, Date, Purpose, Period, Diagnosis, Fitness, Restrictions
- **Garbha Sanskar Certificate**: Certificate details

#### 7. Reports (Mixed)
- **Lab Reports**: Test panels (CBC, Lipid, Sugar, Renal, Liver, Thyroid, RA/CRP) with values, ranges, status
- **Prescription**: Medications with dose, frequency, duration

### Template Implementation
Each template is a TypeScript object defining:
```typescript
interface DocumentTemplate {
  id: string
  name: string
  category: DocumentCategory
  type: 'spreadsheet' | 'document' | 'mixed'
  fields: TemplateField[]
  sections?: TemplateSection[]  // For narrative docs
  defaultValues?: Record<string, string>  // Auto-fill from patient data
  validation?: Record<string, ValidationRule>
}

interface TemplateField {
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'select' | 'currency' | 'multiline'
  required: boolean
  autoFillFrom?: string  // Path in patient data to auto-fill
  options?: string[]  // For select fields
}
```

---

## Excel-Like Editor

### Technology Choice
- **Luckysheet** or **x-spreadsheet** — open-source spreadsheet libraries
- Or: **Handsontable** (commercial but excellent)
- Alternative: Build a custom table editor with virtual scrolling

### Features
- Cell editing with keyboard navigation
- Formula support (basic: SUM, AVERAGE)
- Column sorting and filtering
- Cell formatting (bold, alignment, borders)
- Copy/paste from/to Excel
- Export to Excel (.xlsx) and PDF
- Real-time sync with Google Sheets (via Sheets API)

### Integration
- When opening a spreadsheet document from Drive:
  1. Fetch data via Sheets API
  2. Load into editor
  3. Auto-save changes back to Sheets
- When AI generates a spreadsheet document:
  1. AI outputs structured data (JSON)
  2. Create Google Sheet via API
  3. Open in editor

---

## AI Chat Sidebar (Document Generator)

### Design (Google Sheets Style)
```
┌─────────────────────────┐
│ AI Assistant        [×] │
├─────────────────────────┤
│ Model: [Mistral Large▾] │
│                         │
│ ┌─────────────────────┐ │
│ │ Create an invoice   │ │
│ │ for today's OPD     │ │
│ │ visit.              │ │
│ └─────────────────────┘ │
│                         │
│ I'll create an invoice  │
│ for the OPD visit on    │
│ 29-05-2026. Using       │
│ template: Invoice.      │
│                         │
│ Generating...           │
│                         │
│ ✓ Invoice created:      │
│   AYR/AH/2629/001       │
│   [Open in editor]      │
│                         │
├─────────────────────────┤
│ [Type a command...]  [→]│
└─────────────────────────┘
```

### Capabilities
The AI chat sidebar can:
1. **Generate documents** from templates: "Create an invoice for patient X"
2. **Fill in data**: "Add today's consultation notes"
3. **Batch operations**: "Generate all discharge documents for patient Y"
4. **Search**: "Find all invoices from last month"
5. **Edit**: "Update the medication in today's prescription"
6. **Export**: "Export the discharge summary as PDF"
7. **Template-aware**: Knows all 20 document types and their fields
8. **Patient-context**: Knows current patient's data, history, previous documents

### Context Provided to AI
- Current patient's full data (from Supabase)
- Current folder/category
- List of existing documents
- Template definitions for the category
- Recent chat history in sidebar

---

## Implementation Phases

### Phase 1: Architecture Restructuring (Foundation)
**Goal:** Split the app into 3 independent modes with separate routes and state

1. Create new route structure:
   - `/chat` — Chat mode
   - `/treatment-protocol` — Treatment Protocol mode
   - `/documents` — Patient Documents mode
   - Keep `/` as redirect to `/chat`

2. Create separate zustand stores (or store slices):
   - `chatStore` — sessions, messages, canvas content for Chat mode
   - `protocolStore` — protocol sessions, case data, protocol content
   - `documentStore` — patient selection, folder navigation, documents, AI chat

3. Create mode-specific layouts:
   - `ChatLayout` — sidebar + chat + canvas
   - `ProtocolLayout` — sidebar + wizard + protocol canvas
   - `DocumentLayout` — patient sidebar + explorer + AI sidebar

4. Update sidebar navigation:
   - Each mode link navigates to its route
   - Session lists shown contextually per mode
   - Patient list shown in Documents mode

5. Migrate existing components:
   - Move `ChatPanel`, `CanvasPanel` to Chat mode
   - Move `CaseCollectorChat`, `ProtocolRenderer` to Treatment Protocol mode
   - Move `PatientDocuments` components to Documents mode

### Phase 2: Document Templates
**Goal:** Create all 20 document templates from AAH229 analysis

1. Create template definitions:
   - `src/lib/templates/` directory
   - One file per template category
   - TypeScript interfaces for all fields

2. Create template registry:
   - `templateRegistry` — maps template IDs to definitions
   - Validation logic
   - Auto-fill logic (patient data → template fields)

3. Create template renderer:
   - Spreadsheet templates → table structure
   - Document templates → markdown/HTML structure
   - Mixed templates → combined layout

### Phase 3: Google Drive Integration
**Goal:** Connect to Google Drive for document storage

1. Set up Google Cloud project:
   - Enable Drive API, Sheets API, Docs API
   - Create OAuth 2.0 credentials
   - Create service account

2. Implement Drive client:
   - `src/lib/google-drive/client.ts` — auth, file operations
   - `src/lib/google-drive/folders.ts` — folder structure management
   - `src/lib/google-drive/sheets.ts` — spreadsheet operations
   - `src/lib/google-drive/docs.ts` — document operations

3. Create API routes:
   - `/api/drive/auth` — OAuth flow
   - `/api/drive/folders` — list/create folders
   - `/api/drive/files` — CRUD files
   - `/api/drive/link` — link existing Drive folder

4. Create database tables:
   - `patient_drive_links` — patient → Drive folder mapping
   - `document_metadata` — file metadata (drive_file_id, category, etc.)

### Phase 4: Patient Documents Mode
**Goal:** Build the full document explorer + editor + AI sidebar

1. Patient sidebar component:
   - Search patients
   - List patients with document counts
   - Click to load their folder structure

2. Document explorer component:
   - Folder tree (20 categories)
   - File list within folder
   - Breadcrumb navigation
   - Create/rename/delete operations

3. Excel-like editor:
   - Integrate spreadsheet library
   - Load/save from Google Sheets
   - Cell editing, formulas, formatting
   - Export to Excel/PDF

4. AI chat sidebar:
   - Chat interface with message history
   - Command parsing
   - Document generation flow
   - Template-aware responses

5. Document generation:
   - AI generates structured data
   - Create Google Sheet/Doc
   - Store metadata
   - Open in editor

### Phase 5: Chat Mode Refinement
**Goal:** Enhance Chat mode output rendering

1. Improve canvas output:
   - Better markdown rendering
   - Table support
   - Code blocks with syntax highlighting
   - Copy/export functionality

2. Session management:
   - Rename, delete sessions
   - Session search
   - Export session as PDF

### Phase 6: Treatment Protocol Mode Refinement
**Goal:** Enhance Protocol mode with patient-name sessions

1. Patient-name sessions:
   - Auto-name from patient name entered in wizard
   - Show patient name + case ID in sidebar

2. Protocol canvas:
   - Research article format (existing ProtocolRenderer)
   - Export to PDF
   - Share protocol

---

## File Structure

```
src/
├── app/
│   ├── chat/
│   │   └── page.tsx                    # Chat mode page
│   ├── treatment-protocol/
│   │   └── page.tsx                    # Treatment Protocol mode page
│   ├── documents/
│   │   └── page.tsx                    # Patient Documents mode page
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts                # Chat API
│   │   ├── documents/
│   │   │   ├── route.ts                # Document CRUD
│   │   │   └── generate/
│   │   │       └── route.ts            # AI document generation
│   │   ├── drive/
│   │   │   ├── auth/
│   │   │   │   └── route.ts            # OAuth flow
│   │   │   ├── folders/
│   │   │   │   └── route.ts            # Folder operations
│   │   │   └── files/
│   │   │       └── route.ts            # File operations
│   │   ├── intake/
│   │   │   └── route.ts                # (existing)
│   │   └── treatment-protocol/
│   │       └── route.ts                # (existing)
│   ├── page.tsx                        # Redirect to /chat
│   └── layout.tsx                      # (existing)
├── components/
│   ├── chat/
│   │   ├── ChatLayout.tsx              # Chat mode layout
│   │   ├── ChatSidebar.tsx             # Session list
│   │   ├── ChatView.tsx                # Messages + input
│   │   └── ChatCanvas.tsx              # Output rendering
│   ├── protocol/
│   │   ├── ProtocolLayout.tsx          # Protocol mode layout
│   │   ├── ProtocolSidebar.tsx         # Patient sessions
│   │   ├── ProtocolWizard.tsx          # Intake wizard
│   │   └── ProtocolCanvas.tsx          # Protocol rendering
│   ├── documents/
│   │   ├── DocumentLayout.tsx          # Documents mode layout
│   │   ├── PatientSidebar.tsx          # Patient list
│   │   ├── DocumentExplorer.tsx        # Folder/file tree
│   │   ├── SpreadsheetEditor.tsx       # Excel-like editor
│   │   ├── DocumentViewer.tsx          # Document viewer
│   │   ├── AIDocumentChat.tsx          # AI chat sidebar
│   │   └── TemplateRenderer.tsx        # Template → document
│   ├── shared/
│   │   ├── AppLayout.tsx               # (existing, updated)
│   │   ├── DesktopSidebar.tsx          # (existing, updated)
│   │   ├── MobileNav.tsx               # (existing, updated)
│   │   └── HeaderBar.tsx               # (existing, updated)
│   └── ... (existing components)
├── lib/
│   ├── stores/
│   │   ├── chat-store.ts               # Chat mode state
│   │   ├── protocol-store.ts           # Protocol mode state
│   │   └── document-store.ts           # Documents mode state
│   ├── templates/
│   │   ├── index.ts                    # Template registry
│   │   ├── registers.ts                # OPD/IPD register templates
│   │   ├── clinical-notes.ts           # Consultation, admission templates
│   │   ├── financial.ts                # Invoice, receipt templates
│   │   ├── insurance.ts                # IRDAI, authorization templates
│   │   ├── ipd-documents.ts            # IPD-specific templates
│   │   ├── summaries.ts                # Discharge, certificates
│   │   └── reports.ts                  # Lab reports, prescriptions
│   ├── google-drive/
│   │   ├── client.ts                   # Google Drive client
│   │   ├── auth.ts                     # OAuth + service account
│   │   ├── folders.ts                  # Folder operations
│   │   ├── sheets.ts                   # Sheets API wrapper
│   │   └── docs.ts                     # Docs API wrapper
│   └── ... (existing files)
```

---

## Database Schema (New Tables)

```sql
-- Google Drive folder links per patient
CREATE TABLE patient_drive_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  drive_folder_id TEXT NOT NULL,
  drive_folder_url TEXT,
  linked_at TIMESTAMPTZ DEFAULT now(),
  linked_by UUID REFERENCES auth.users(id),
  UNIQUE(patient_id)
);

-- Document metadata (files in Drive)
CREATE TABLE document_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  category TEXT NOT NULL,  -- matches DocumentCategory
  template_id TEXT,        -- which template was used
  drive_file_id TEXT NOT NULL,
  drive_file_url TEXT,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'spreadsheet' | 'document' | 'pdf'
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  metadata JSONB           -- template-specific data
);

-- Index for fast patient lookups
CREATE INDEX idx_document_metadata_patient ON document_metadata(patient_id);
CREATE INDEX idx_document_metadata_category ON document_metadata(patient_id, category);
```

---

## Dependencies to Add

```json
{
  "googleapis": "^130.0.0",          // Google Drive/Sheets/Docs API
  "google-auth-library": "^9.0.0",   // Google OAuth
  "@google-cloud/local-auth": "^3.0.0", // Local auth helper
  "luckysheet": "^2.1.0",            // Spreadsheet editor (or alternative)
  "xlsx": "^0.18.5",                 // Excel export
  "html2pdf.js": "^0.10.1"           // Already exists, for PDF export
}
```

---

## Migration Path

1. **Don't break existing functionality** — current `/` page continues working during development
2. **Build new routes alongside** — `/chat`, `/treatment-protocol`, `/documents` built as new pages
3. **Update sidebar** — links point to new routes
4. **Remove old module switching** — once all modes are working, remove `activeModule` logic
5. **Update redirects** — `/` redirects to `/chat`

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Google Drive API rate limits | Implement exponential backoff, cache file listings |
| Spreadsheet editor complexity | Start with basic table editor, iterate |
| Large file handling | Stream uploads/downloads, show progress |
| OAuth token expiry | Implement refresh token flow, handle gracefully |
| Template accuracy | Test with real AAH229 data, iterate on templates |
| State migration | Keep localStorage fallback during transition |

---

## Questions for User

1. **Google Cloud project**: Do you have one, or should I set up instructions?
2. **Spreadsheet library preference**: Luckysheet (free), Handsontable (commercial), or custom?
3. **Priority order**: Which mode should be built first? (I recommend: Templates → Documents → Chat → Protocol)
4. **Existing patient data**: Should documents mode work with existing patients in Supabase, or only new ones?
5. **Offline support**: Should documents mode work offline (localStorage fallback), or Drive-only?
