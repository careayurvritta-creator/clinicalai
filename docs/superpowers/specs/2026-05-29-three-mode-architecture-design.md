# Three-Mode Architecture Design

**Date:** 2026-05-29
**Status:** Approved
**Scope:** Architecture restructuring + three independent modes (Chat, Treatment Protocol, Patient Documents)

---

## 1. Overview

Transform the current monolithic single-page app with module switching into three completely independent modes, each with its own layout, store, and component tree. Shared infrastructure (API routes, templates, Google Drive client, auth, RAG) remains common.

### Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Document storage | Google Drive only | No backend space needed, real-time collaboration, familiar UI |
| Excel editor | Embed Google Sheets iframe | No extra JS library, real Google Sheets experience |
| AI docs chat | Full template generation | 20 templates, auto-fill from patient/case data |
| Mode isolation | Fully independent stores/layouts | No mode-switching complexity |
| Chat canvas | Enhanced markdown | Good tables, code blocks, lists |
| Protocol canvas | Current ProtocolRenderer + polish | Section cards, TOC, color coding already work |
| Docs canvas | Explorer + embedded Sheets/Docs | Click file → opens in iframe editor |
| Patient sidebar | Drive-based patient list | Parse folder names from Drive |
| Implementation order | Architecture first, then modes | Clean foundation before features |

---

## 2. Route Structure

```
/src/app/
  layout.tsx                    # Root layout (fonts, metadata, service worker)
  page.tsx                      # Redirect → /chat
  login/page.tsx                # Auth page (shared)
  auth/callback/route.ts        # OAuth callback (shared)

  (chat)/
    layout.tsx                  # Chat mode layout
    page.tsx                    # Chat page

  (treatment-protocol)/
    layout.tsx                  # Protocol mode layout
    page.tsx                    # Protocol page

  (documents)/
    layout.tsx                  # Documents mode layout
    page.tsx                    # Documents page

  patients/                     # Shared record pages
    page.tsx
    new/page.tsx
    [id]/page.tsx

  cases/                        # Shared record pages
    page.tsx
    [id]/page.tsx

  api/                          # All API routes (shared, unchanged)
```

Route groups `(chat)`, `(treatment-protocol)`, `(documents)` each get their own layout.tsx that defines the mode-specific shell (sidebar + main area + mobile nav).

### Cross-Mode Navigation

Each mode's sidebar includes a compact mode switcher at the top (3 icons: Chat, Protocol, Documents). Clicking an icon navigates to that route. The current mode's icon is highlighted. On mobile, the bottom nav bar provides the same 3 mode tabs plus Cases/Patients.

The mode switcher is a shared component (`ModeSwitcher.tsx`) used in each mode's layout. It uses `next/link` for navigation — no shared state needed.

---

## 3. Component Architecture

```
/src/components/
  shared/                       # Used by multiple modes
    ModelSelector.tsx           # AI model picker (extract from current)
    Toast.tsx                   # Toast notifications
    ErrorBoundary.tsx           # Error boundary
    ClientProviders.tsx         # Top-level providers

  chat/                         # Chat mode components
    ChatLayout.tsx              # Sidebar + ChatPanel + Canvas
    ChatSidebar.tsx             # Session list (extract from DesktopSidebar)
    ChatPanel.tsx               # Messages + input + model selector
    ChatInput.tsx               # Input with attachments (extract from ChatInput)
    MessageBubble.tsx           # Message rendering
    ChatCanvas.tsx              # Enhanced markdown output panel

  protocol/                     # Treatment Protocol components
    ProtocolLayout.tsx          # Sidebar + CaseCollector + Canvas
    ProtocolSidebar.tsx         # Patient sessions list
    CaseCollectorChat.tsx       # 30-step wizard (keep as-is)
    ProtocolCanvas.tsx          # ProtocolRenderer output (keep + polish)

  documents/                    # Patient Documents components
    DocumentLayout.tsx          # 3-panel: PatientSidebar + Explorer + AIChat
    PatientSidebar.tsx          # Patient list from Drive (rewrite)
    DocumentExplorer.tsx        # Folder/file browser (rewrite)
    EmbeddedEditor.tsx          # iframe for Google Sheets/Docs (new)
    AIDocumentChat.tsx          # AI sidebar for generation (rewrite)
    BreadcrumbNav.tsx           # Patient > Category > File navigation (new)
```

### Files to Remove (after migration)
- `src/components/DesktopSidebar.tsx` — replaced by ChatSidebar + ProtocolSidebar
- `src/components/HeaderBar.tsx` — each mode gets its own header in its layout
- `src/components/MobileNav.tsx` — each mode gets its own mobile nav
- `src/components/AppLayout.tsx` — replaced by per-mode layouts
- `src/components/ResizableLayout.tsx` — each mode implements its own layout
- `src/components/ChatPanel.tsx` — replaced by chat/ChatPanel.tsx
- `src/components/PatientDocuments.tsx` — replaced by documents/DocumentLayout
- `src/components/SpreadsheetEditor.tsx` — replaced by EmbeddedEditor

---

## 4. Store Architecture

Three completely independent Zustand stores with localStorage persistence.

### 4.1 Chat Store (`src/stores/chat-store.ts`)

```typescript
interface ChatState {
  messages: Message[]
  sessions: Record<string, ChatSession>
  activeSessionId: string | null
  selectedModel: string
  canvasContent: string
  canvasTimestamp: number
  isStreaming: boolean
  chatInputDraft: string  // excluded from persistence
}

interface ChatActions {
  addMessage: (msg: Message) => void
  updateLastMessage: (content: string, status?: string) => void
  setStreaming: (v: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  clearMessages: () => void
  setChatInputDraft: (draft: string) => void
  createSession: () => void
  switchSession: (id: string) => void
  deleteSession: (id: string) => void
  renameSession: (id: string, title: string) => void
}
```

### 4.2 Protocol Store (`src/stores/protocol-store.ts`)

```typescript
interface ProtocolState {
  messages: Message[]
  sessions: Record<string, ChatSession>  // titles = patient names
  activeSessionId: string | null
  selectedModel: string
  canvasContent: string
  canvasTimestamp: number
  isStreaming: boolean
  caseData: CaseData | null
  wizardStep: number
  wizardPhase: 'wizard' | 'review' | 'followup' | 'diagnosis' | 'protocol'
}

interface ProtocolActions {
  // Same session actions as chat
  setCaseData: (data: CaseData) => void
  setWizardStep: (step: number) => void
  setWizardPhase: (phase: string) => void
  resetWizard: () => void
}
```

### 4.3 Document Store (`src/stores/document-store.ts`)

```typescript
interface DocumentState {
  // Patient
  patients: PatientFolder[]        // from Drive
  selectedPatient: PatientFolder | null

  // Navigation
  currentFolderId: string | null
  currentCategory: string | null
  files: DriveFile[]
  breadcrumbs: Breadcrumb[]

  // Editor
  editingFile: DriveFile | null
  editorMode: 'explorer' | 'spreadsheet' | 'document'

  // AI Chat
  chatMessages: Message[]
  selectedModel: string
  isStreaming: boolean

  // Drive
  driveConnected: boolean
  rootFolderId: string | null
}

interface DocumentActions {
  // Patient
  loadPatients: () => Promise<void>
  selectPatient: (patient: PatientFolder) => void

  // Navigation
  navigateToCategory: (category: string) => void
  navigateToFolder: (folderId: string) => void
  navigateUp: () => void

  // Editor
  openFile: (file: DriveFile) => void
  closeEditor: () => void

  // AI Chat
  sendChatMessage: (msg: string) => void
  clearChat: () => void

  // Drive
  connectDrive: () => void
  createPatientFolder: (name: string, clinicalId: string) => Promise<void>
}
```

---

## 5. Chat Mode Design

### Layout
```
┌──────────┬────────────────────────────────────────────┐
│          │                                            │
│  Chat    │         Chat Messages                      │
│  Sidebar │         (scrollable)                       │
│          │                                            │
│ Sessions │  ┌──────────────────────────────────────┐  │
│          │  │  Canvas Output                        │  │
│  - New   │  │  (enhanced markdown)                  │  │
│  - S1    │  │                                       │  │
│  - S2    │  └──────────────────────────────────────┘  │
│          │  ┌──────────────────────────────────────┐  │
│          │  │  Chat Input + Model Selector          │  │
│          │  └──────────────────────────────────────┘  │
└──────────┴────────────────────────────────────────────┘
```

Desktop: Resizable split (30/70 default). Mobile: Tabbed (Chat/Output).

### Canvas Enhancement
- Better markdown rendering: tables with borders, code blocks with syntax highlighting, nested lists
- Stale content banner (>5 min old)
- Copy/Download PDF actions (already exist in CanvasToolbar)

---

## 6. Treatment Protocol Mode Design

### Layout
```
┌──────────┬────────────────────────────────────────────┐
│          │                                            │
│ Protocol │    Case Collector Wizard / Chat             │
│ Sidebar  │    (30-step guided intake)                  │
│          │                                            │
│ Sessions │  ┌──────────────────────────────────────┐  │
│ (patient │  │  Protocol Output Canvas               │  │
│  names)  │  │  (ProtocolRenderer: section cards,    │  │
│          │  │   TOC, color coding)                  │  │
│  - New   │  └──────────────────────────────────────┘  │
│  - Vijay │                                            │
│  - Priya │                                            │
└──────────┴────────────────────────────────────────────┘
```

### Session Naming
Sessions auto-title from patient name after the first wizard step (patient info). Protocol output persists with the session so you can revisit any patient's protocol.

### Polish
- Better section color palette in ProtocolRenderer
- Smooth TOC navigation (click section → scroll)
- Mobile: tabbed (Wizard/Output)

---

## 7. Patient Documents Mode Design

### Layout
```
┌──────────┬────────────────────────────┬──────────────┐
│          │                            │              │
│ Patient  │   Document Explorer        │  AI Chat     │
│ Sidebar  │   (center panel)           │  Sidebar     │
│          │                            │              │
│ Patients │  ┌────────────────────┐    │  "Create     │
│          │  │ Breadcrumb Nav     │    │  discharge   │
│  - Vijay │  ├────────────────────┤    │  summary     │
│  - Priya │  │                    │    │  for Vijay"  │
│  - Ravi  │  │  Category Grid /   │    │              │
│          │  │  File List /       │    │  [Generated  │
│  Search  │  │  Embedded Editor   │    │   document   │
│          │  │                    │    │   appears    │
│  [+New]  │  └────────────────────┘    │   in list]   │
│          │                            │              │
└──────────┴────────────────────────────┴──────────────┘
```

Desktop: 3-panel (200px | flex | 320px). Mobile: Full-screen explorer with bottom sheet for AI chat.

### Patient Sidebar
- Fetches patient folders from Google Drive root ("Clinical AI/" folder)
- Parses folder names: "Patient Name (clinical_id)" → PatientFolder object
- Search by name or clinical ID
- "Create Patient" → creates folder + 20 subfolders via API
- Click patient → loads their 20 category subfolders in center panel

### Document Explorer — Three States

**1. Category Grid (default after selecting patient)**
```
┌─────────────────────────────────────────┐
│  ← Vijaydutt Sharma (AAH229)            │
├──────┬──────┬──────┬──────┬──────┬──────┤
│ OPD  │ OPD  │ IPD  │ Proc │ Cons │ Inv  │
│ Reg  │ Ther │ Reg  │ Reg  │ Note │ oice │
│ (3)  │ (2)  │ (1)  │ (4)  │ (6)  │ (5)  │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ IRDAI│ IPD  │ IPD  │ IPD  │ IPD  │ Nurs │
│ Auth │ Adm  │ Tx   │ Rnds │ Disch│ Med  │
│ (1)  │ (1)  │ (1)  │ (2)  │ (1)  │ (1)  │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ Nurs │ Disch│ Med  │ Garbh│ Lab  │ Rx   │
│ PK   │ Summ │ Cert │ Sans │ Rpt  │      │
│ (1)  │ (1)  │ (1)  │ (0)  │ (2)  │ (1)  │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**2. File List (after clicking a category)**
```
┌─────────────────────────────────────────┐
│  ← Vijaydutt > Consultation Notes       │
├─────────────────────────────────────────┤
│  📄 OPD-2026-02-13-Consultation.xlsx    │  12 KB  Feb 13
│  📄 OPD-2026-02-15-Consultation.xlsx    │  15 KB  Feb 15
│  📄 OPD-2026-02-18-Consultation.xlsx    │  11 KB  Feb 18
│  📄 OPD-2026-02-20-Consultation.xlsx    │  14 KB  Feb 20
│  📄 OPD-2026-02-22-Consultation.xlsx    │  13 KB  Feb 22
│  📄 OPD-2026-02-25-Consultation.xlsx    │  16 KB  Feb 25
└─────────────────────────────────────────┘
```

**3. Embedded Editor (after clicking a file)**
```
┌─────────────────────────────────────────┐
│  ← Back  |  Vijaydutt > Consultation    │
│          > OPD-2026-02-13               │
├─────────────────────────────────────────┤
│                                         │
│   ┌─────────────────────────────────┐   │
│   │                                 │   │
│   │   Google Sheets / Docs          │   │
│   │   (embedded iframe)             │   │
│   │   Full editing capability       │   │
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### AI Document Chat Sidebar

**Capabilities:**
1. **Generate from template**: "Create discharge summary for Vijaydutt" → uses `discharge-summary` template, auto-fills from patient data, creates Google Sheet in patient's 14-Discharge-Summaries folder
2. **Batch generate**: "Generate all discharge documents for Vijaydutt" → creates discharge plan + discharge summary + final invoice + medical certificate
3. **Fill existing**: "Update the prescription with these medications" → opens existing prescription sheet, appends rows
4. **Search**: "Find all invoices from February" → searches Drive files, shows results
5. **Navigate**: "Show me Vijaydutt's lab reports" → navigates to that category

**Template System Integration:**
- AI receives the template definition (fields, sections, validation) + patient data + case data
- Generates structured data matching the template schema
- Calls `/api/documents/generate` to create Google Sheet/Doc
- File appears in the explorer automatically

### Google Drive Folder Structure
```
Clinical AI/                          (root folder)
  Vijaydutt Sharma (AAH229)/          (patient folder)
    01-OPD-Registers/
      OPD-Register-2026-02.xlsx
    02-Therapy-Registers/
    03-IPD-Registers/
    04-Procedure-Registers/
    05-Consultation-Notes/
      OPD-2026-02-13-Consultation.xlsx
    06-Invoices/
      AYR-AH-2602-001.xlsx
    07-Insurance/
    08-Admission-Notes/
    09-Treatment-Plans/
    10-Rounds-Notes/
    11-Nursing-Medicine/
    12-Nursing-Panchakarma/
    13-Discharge-Plans/
    14-Discharge-Summaries/
    15-Certificates/
    16-Receipts/
    17-Authorization/
    18-Garbha-Sanskar/
    19-Lab-Reports/
    20-Prescriptions/
  Priya Patel (AAH230)/
    ...
```

---

## 8. Google Drive Integration

### Auth Flow
1. User clicks "Connect Google Drive" in Documents mode
2. Redirects to Google OAuth consent screen
3. Callback stores tokens in Supabase `drive_connections` table
4. All subsequent Drive API calls use stored tokens
5. Token refresh handled automatically by google-auth-library

### API Endpoints (existing, need wiring)

| Endpoint | Purpose |
|---|---|
| `GET /api/drive/auth` | Start OAuth flow |
| `GET /api/drive/auth/callback` | Handle OAuth callback |
| `GET /api/drive/patients` | List patient folders from Drive |
| `POST /api/drive/patients` | Create patient folder + 20 subfolders |
| `GET /api/drive/files?folderId=X` | List files in a folder |
| `GET /api/drive/folders?id=X` | Get folder details |
| `POST /api/documents/generate` | Generate document from template |

### New Endpoint Needed

`GET /api/drive/embed?fileId=X` — Returns embeddable URL for Google Sheets/Docs iframe. Requires the file to be shared (at least reader) or the user to have access via their Google account.

---

## 9. Database Changes

### New Table: `drive_connections`
```sql
CREATE TABLE drive_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  access_token TEXT,
  refresh_token TEXT,
  scope TEXT,
  token_type TEXT,
  expiry_date BIGINT,
  root_folder_id TEXT,
  connected_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Keep Existing Tables
- `patients` — still needed for case data, clinical records
- `cases` — still needed for case management
- `patient_documents` — can be repurposed as metadata cache for Drive files (optional)

---

## 10. Dependencies

### Add
- `googleapis` — Google Drive/Sheets/Docs API client
- `google-auth-library` — OAuth2 + Service Account auth

### Remove (after migration)
- None immediately, but Supabase Storage usage for documents can be deprecated

---

## 11. Implementation Phases

### Phase 1: Architecture Restructuring
1. Create route groups `(chat)`, `(treatment-protocol)`, `(documents)`
2. Create per-mode layout components
3. Extract stores (chat, protocol, document) as independent Zustand stores
4. Move components into mode-specific directories
5. Remove shared AppLayout, DesktopSidebar, HeaderBar, MobileNav mode-switching logic
6. Update navigation (each mode has its own sidebar/header)
7. Verify all existing functionality still works

### Phase 2: Documents Mode — Drive Integration
1. Wire Google Drive OAuth flow end-to-end
2. Implement patient sidebar fetching from Drive
3. Implement document explorer (category grid + file list)
4. Build embedded Google Sheets/Docs iframe editor
5. Create breadcrumb navigation
6. Test with real Drive account

### Phase 3: Documents Mode — AI Generation
1. Wire AI chat sidebar to template system
2. Implement "generate from template" flow
3. Implement batch generation
4. Implement file search and navigation commands
5. Test with all 20 template types

### Phase 4: Chat Mode Polish
1. Enhance markdown rendering in canvas
2. Polish session sidebar
3. Mobile tabbed view optimization

### Phase 5: Protocol Mode Polish
1. Polish ProtocolRenderer (colors, TOC, typography)
2. Ensure case data persists with sessions
3. Mobile tabbed view optimization

### Phase 6: Cleanup
1. Remove unused components and stores
2. Remove Supabase Storage document code
3. Update all documentation
4. Final testing across all modes

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Google Drive API rate limits | High | Implement caching, batch requests, exponential backoff |
| OAuth token expiry | Medium | Auto-refresh via google-auth-library, re-auth flow |
| iframe CSP issues | Medium | Use Google's official embed URLs, test cross-origin |
| Breaking existing functionality during refactor | High | Phase 1 is pure restructuring, no feature changes. Test after each step. |
| Large Drive folders slow to load | Low | Pagination, lazy loading, folder caching |

---

## 13. Success Criteria

- [ ] Three independent routes with no shared state
- [ ] Chat mode: sessions, enhanced markdown canvas, model selector, file attachments
- [ ] Protocol mode: wizard, patient sessions, protocol renderer
- [ ] Documents mode: Drive-based patient sidebar, 20-category explorer, embedded Sheets/Docs editor, AI generation sidebar
- [ ] Google Drive OAuth working end-to-end
- [ ] AI can generate any of 20 document types from templates
- [ ] Mobile responsive for all three modes
- [ ] No regressions in existing functionality
