# Patient Documents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Case Collector module with a Patient Documents system — folder-based document management by patient ID (AAH001, AAH002) with Supabase Storage.

**Architecture:** New `patient_documents` DB table + Supabase Storage bucket. Patient `clinical_id` (AAH001) added alongside existing `patient_code` (PT000001). UI replaces `/?module=intake` with `/?module=documents`. Intake wizard moves to Treatment Protocol module.

**Tech Stack:** Next.js 15, React 19, TypeScript, Zustand, Supabase (PostgreSQL + Storage), Tailwind CSS, Lucide React icons

---

## File Structure

### New Files
| File | Responsibility |
|---|---|
| `supabase/migrations/014_patient_documents.sql` | clinical_id column, patient_documents table, indexes, RLS |
| `src/lib/constants.ts` | Document categories, file type mappings, bucket name |
| `src/lib/supabase/documents.ts` | All patient document CRUD + storage operations |
| `src/app/api/patient-documents/route.ts` | GET (list) + POST (upload) API |
| `src/app/api/patient-documents/[id]/route.ts` | GET (single + signed URL) + DELETE API |
| `src/app/api/patients/search/route.ts` | Patient search by name/phone/clinical_id |
| `src/components/PatientDocuments.tsx` | Main module component (replaces CaseCollectorChat in documents mode) |
| `src/components/PatientSelector.tsx` | Search + recent patients grid |
| `src/components/PatientFolderView.tsx` | Category folder grid for a patient |
| `src/components/FolderContents.tsx` | File list within a category |
| `src/components/DocumentUpload.tsx` | Single + bulk upload with drag-drop |
| `src/components/DocumentPreview.tsx` | PDF/image preview modal |

### Modified Files
| File | Change |
|---|---|
| `src/components/ChatPanel.tsx:115-116` | Change `intake` → `documents`, import PatientDocuments |
| `src/components/DesktopSidebar.tsx:28-38` | Rename to Patient Documents, change href to `/?module=documents` |
| `src/components/MobileNav.tsx:24-33` | Rename to Documents, change href to `/?module=documents` |
| `src/components/HeaderBar.tsx:8-12,21-26` | Update MODULE_TITLES and MODULE_FILTER_OPTIONS |
| `src/lib/supabase/services.ts` | Add `getSignedUrl` helper (private bucket needs signed URLs) |

---

## Task 1: Database Migration

**Files:**
- Create: `supabase/migrations/014_patient_documents.sql`

- [ ] **Step 1: Write the migration SQL**

```sql
-- Migration 014: Patient Documents system
-- Created: 2026-05-28
-- Description: Add clinical_id to patients, create patient_documents table + storage bucket
-- NOTE: Apply via Supabase Dashboard SQL Editor (CLI segfaults on Windows)

-- ============================================
-- CLINICAL ID (AAH001, AAH002, ...)
-- ============================================
CREATE SEQUENCE IF NOT EXISTS clinical_id_seq START 1;

ALTER TABLE patients ADD COLUMN IF NOT EXISTS clinical_id TEXT UNIQUE;

CREATE OR REPLACE FUNCTION generate_clinical_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.clinical_id IS NULL OR NEW.clinical_id = '' THEN
    NEW.clinical_id := 'AAH' || LPAD(nextval('clinical_id_seq')::TEXT, 3, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS generate_clinical_id_trigger ON patients;
CREATE TRIGGER generate_clinical_id_trigger
  BEFORE INSERT ON patients
  FOR EACH ROW
  EXECUTE FUNCTION generate_clinical_id();

-- Backfill existing patients
DO $$
DECLARE
  rec RECORD;
  counter INTEGER := 1;
BEGIN
  FOR rec IN SELECT id FROM patients WHERE clinical_id IS NULL ORDER BY created_at
  LOOP
    UPDATE patients SET clinical_id = 'AAH' || LPAD(counter::TEXT, 3, '0') WHERE id = rec.id;
    counter := counter + 1;
  END LOOP;
  -- Set sequence to continue after backfill
  PERFORM setval('clinical_id_seq', counter - 1);
END $$;

-- ============================================
-- PATIENT DOCUMENTS TABLE
-- ============================================
CREATE TABLE patient_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  upload_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_patient_documents_patient ON patient_documents(patient_id);
CREATE INDEX idx_patient_documents_category ON patient_documents(category);
CREATE INDEX idx_patient_documents_date ON patient_documents(upload_date DESC);
CREATE INDEX idx_patient_documents_patient_category ON patient_documents(patient_id, category);

-- Full-text search on filenames and notes
ALTER TABLE patient_documents ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(filename, '') || ' ' || coalesce(notes, ''))
  ) STORED;

CREATE INDEX idx_patient_documents_search ON patient_documents USING gin(search_vector);

-- RLS
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;

-- Since auth is currently disabled, allow all operations
-- Re-enable proper RLS when auth is re-enabled
CREATE POLICY "Allow all patient document operations"
  ON patient_documents FOR ALL
  USING (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_patient_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_patient_documents_updated_at
  BEFORE UPDATE ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_patient_documents_updated_at();

-- Index on clinical_id for fast lookup
CREATE INDEX IF NOT EXISTS idx_patients_clinical_id ON patients(clinical_id);
```

- [ ] **Step 2: Apply migration**

Run in Supabase Dashboard > SQL Editor. Paste the entire SQL and execute.

- [ ] **Step 3: Create Storage bucket**

In Supabase Dashboard > Storage > New Bucket:
- Name: `patient-documents`
- Public: **false** (use signed URLs)
- File size limit: 52428800 (50MB)
- Allowed MIME types: `application/pdf,image/jpeg,image/png,image/webp,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document`

- [ ] **Step 4: Verify**

Run: `SELECT clinical_id, name FROM patients LIMIT 5;` — should show AAH001, AAH002, etc.
Run: `SELECT count(*) FROM patient_documents;` — should return 0.

---

## Task 2: Constants and Types

**Files:**
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create constants file**

```typescript
// Document category definitions
export const DOCUMENT_CATEGORIES = [
  {
    id: 'investigation-reports',
    label: 'Investigation Reports',
    description: 'Blood tests, imaging, biopsy, lab reports',
    icon: 'FlaskConical',
    accept: '.pdf,.jpg,.jpeg,.png,.webp',
  },
  {
    id: 'opd-consultation-sheets',
    label: 'OPD Consultation Sheets',
    description: 'Date-wise OPD visit records',
    icon: 'ClipboardList',
    accept: '.pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png',
  },
  {
    id: 'ipd-sheets',
    label: 'IPD Sheets',
    description: 'Admission/discharge records, date-wise',
    icon: 'BedDouble',
    accept: '.pdf,.xlsx,.xls,.csv',
  },
  {
    id: 'opd-registers',
    label: 'OPD Registers',
    description: 'OPD register entries',
    icon: 'BookOpen',
    accept: '.pdf,.xlsx,.xls,.csv',
  },
  {
    id: 'ipd-registers',
    label: 'IPD Registers',
    description: 'IPD register entries',
    icon: 'BookMarked',
    accept: '.pdf,.xlsx,.xls,.csv',
  },
  {
    id: 'panchakarma-notes',
    label: 'Panchakarma Therapy Notes',
    description: 'Panchakarma therapy session records',
    icon: 'Leaf',
    accept: '.pdf,.jpg,.jpeg,.png,.docx',
  },
  {
    id: 'reimbursement-forms',
    label: 'Reimbursement Forms',
    description: 'CGHS/insurance claim forms',
    icon: 'Receipt',
    accept: '.pdf,.jpg,.jpeg,.png,.xlsx,.xls',
  },
  {
    id: 'medical-certificates',
    label: 'Medical Certificates',
    description: 'Fitness certificates, referral letters',
    icon: 'Award',
    accept: '.pdf,.jpg,.jpeg,.png,.docx',
  },
  {
    id: 'prescriptions',
    label: 'Prescriptions',
    description: 'Prescribed medications',
    icon: 'Pill',
    accept: '.pdf,.jpg,.jpeg,.png',
  },
  {
    id: 'discharge-summaries',
    label: 'Discharge Summaries',
    description: 'Hospital discharge documents',
    icon: 'FileText',
    accept: '.pdf,.jpg,.jpeg,.png,.docx',
  },
] as const

export type DocumentCategoryId = (typeof DOCUMENT_CATEGORIES)[number]['id']

export const STORAGE_BUCKET = 'patient-documents'

// Map file extensions to human-readable types
export const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: 'PDF',
  jpg: 'Image',
  jpeg: 'Image',
  png: 'Image',
  webp: 'Image',
  xls: 'Excel',
  xlsx: 'Excel',
  csv: 'CSV',
  docx: 'Word',
  doc: 'Word',
}

export function getFileTypeLabel(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return FILE_TYPE_LABELS[ext] ?? 'File'
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// Build storage path for a document
export function buildStoragePath(
  clinicalId: string,
  patientName: string,
  categoryId: string,
  filename: string
): string {
  const sanitizedName = patientName.replace(/[^a-zA-Z0-9]/g, '_')
  const datePrefix = new Date().toISOString().split('T')[0]
  return `${clinicalId}_${sanitizedName}/${categoryId}/${datePrefix}_${filename}`
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/constants.ts supabase/migrations/014_patient_documents.sql
git commit -m "feat: add patient documents migration and constants"
```

---

## Task 3: Document Service Layer

**Files:**
- Create: `src/lib/supabase/documents.ts`

- [ ] **Step 1: Create the documents service**

```typescript
import { getSupabase } from './client'
import { STORAGE_BUCKET, buildStoragePath, type DocumentCategoryId } from '../constants'

export interface PatientDocument {
  id: string
  patient_id: string
  category: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
  uploaded_by: string | null
  created_at: string
  updated_at: string
}

export interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

export interface DocumentCounts {
  [categoryId: string]: number
}

// ============================================
// UPLOAD
// ============================================
export async function uploadPatientDocument(
  patientId: string,
  clinicalId: string,
  patientName: string,
  category: DocumentCategoryId,
  file: File,
  tags: string[] = [],
  notes?: string
): Promise<{ data: PatientDocument | null; error: string | null }> {
  const supabase = getSupabase()

  // Upload file to storage
  const storagePath = buildStoragePath(clinicalId, patientName, category, file.name)
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    return { data: null, error: uploadError.message }
  }

  // Insert metadata record
  const { data, error: dbError } = await supabase
    .from('patient_documents')
    .insert({
      patient_id: patientId,
      category,
      filename: file.name,
      storage_path: storagePath,
      file_size: file.size,
      file_type: file.type,
      tags,
      notes: notes || null,
    })
    .select()
    .single()

  if (dbError) {
    // Cleanup storage if DB insert fails
    await supabase.storage.from(STORAGE_BUCKET).remove([storagePath])
    return { data: null, error: dbError.message }
  }

  return { data, error: null }
}

// ============================================
// LIST DOCUMENTS
// ============================================
export async function listPatientDocuments(
  patientId: string,
  category?: string
): Promise<{ data: PatientDocument[]; error: string | null }> {
  const supabase = getSupabase()
  let query = supabase
    .from('patient_documents')
    .select('*')
    .eq('patient_id', patientId)
    .order('upload_date', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) return { data: [], error: error.message }
  return { data: data ?? [], error: null }
}

// ============================================
// GET DOCUMENT COUNTS PER CATEGORY
// ============================================
export async function getDocumentCounts(
  patientId: string
): Promise<{ data: DocumentCounts; error: string | null }> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('patient_documents')
    .select('category')
    .eq('patient_id', patientId)

  if (error) return { data: {}, error: error.message }

  const counts: DocumentCounts = {}
  for (const row of data ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }
  return { data: counts, error: null }
}

// ============================================
// GET SIGNED URL FOR DOWNLOAD/PREVIEW
// ============================================
export async function getDocumentSignedUrl(
  storagePath: string,
  expiresIn = 3600
): Promise<{ url: string | null; error: string | null }> {
  const supabase = getSupabase()
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(storagePath, expiresIn)

  if (error) return { url: null, error: error.message }
  return { url: data.signedUrl, error: null }
}

// ============================================
// DELETE DOCUMENT
// ============================================
export async function deletePatientDocument(
  docId: string,
  storagePath: string
): Promise<{ error: string | null }> {
  const supabase = getSupabase()

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([storagePath])

  if (storageError) return { error: storageError.message }

  // Delete metadata
  const { error: dbError } = await supabase
    .from('patient_documents')
    .delete()
    .eq('id', docId)

  if (dbError) return { error: dbError.message }
  return { error: null }
}

// ============================================
// SEARCH PATIENTS (for PatientSelector)
// ============================================
export async function searchPatients(
  query: string
): Promise<{ data: PatientInfo[]; error: string | null }> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('patients')
    .select('id, clinical_id, name, age, gender, phone')
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%,clinical_id.ilike.%${query}%`)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false })
    .limit(20)

  if (error) return { data: [], error: error.message }
  return { data: data ?? [], error: null }
}

// ============================================
// GET RECENT PATIENTS
// ============================================
export async function getRecentPatients(): Promise<{
  data: PatientInfo[]
  error: string | null
}> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('patients')
    .select('id, clinical_id, name, age, gender, phone')
    .eq('is_archived', false)
    .order('updated_at', { ascending: false })
    .limit(10)

  if (error) return { data: [], error: error.message }
  return { data: data ?? [], error: null }
}
```

- [ ] **Step 2: Add getSignedUrl helper to services.ts**

In `src/lib/supabase/services.ts`, add after the existing `deleteFile` function (line 526):

```typescript
export async function getSignedUrl(bucket: string, path: string, expiresIn = 3600) {
  const { data } = await getSupabase().storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)
  return data?.signedUrl
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/documents.ts src/lib/supabase/services.ts
git commit -m "feat: patient document service layer with CRUD and storage operations"
```

---

## Task 4: API Routes

**Files:**
- Create: `src/app/api/patient-documents/route.ts`
- Create: `src/app/api/patient-documents/[id]/route.ts`
- Create: `src/app/api/patients/search/route.ts`

- [ ] **Step 1: Create list/upload route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase/client'
import { STORAGE_BUCKET, buildStoragePath } from '@/lib/constants'

export const dynamic = 'force-dynamic'

// GET /api/patient-documents?patient_id=xxx&category=yyy
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const patientId = searchParams.get('patient_id')
  const category = searchParams.get('category')

  if (!patientId) {
    return NextResponse.json({ error: 'patient_id required' }, { status: 400 })
  }

  const supabase = getSupabase()
  let query = supabase
    .from('patient_documents')
    .select('*')
    .eq('patient_id', patientId)
    .order('upload_date', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Also get counts per category
  const { data: countData } = await supabase
    .from('patient_documents')
    .select('category')
    .eq('patient_id', patientId)

  const counts: Record<string, number> = {}
  for (const row of countData ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }

  return NextResponse.json({ documents: data ?? [], counts })
}

// POST /api/patient-documents
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const patientId = formData.get('patient_id') as string | null
  const category = formData.get('category') as string | null
  const tags = formData.get('tags') as string | null
  const notes = formData.get('notes') as string | null

  if (!file || !patientId || !category) {
    return NextResponse.json(
      { error: 'file, patient_id, and category required' },
      { status: 400 }
    )
  }

  // Get patient info for storage path
  const supabase = getSupabase()
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('clinical_id, name')
    .eq('id', patientId)
    .single()

  if (patientError || !patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  }

  // Upload to storage
  const storagePath = buildStoragePath(
    patient.clinical_id,
    patient.name,
    category,
    file.name
  )

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, file, { cacheControl: '3600', upsert: false })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Insert metadata
  const tagsArray = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : []

  const { data: doc, error: dbError } = await supabase
    .from('patient_documents')
    .insert({
      patient_id: patientId,
      category,
      filename: file.name,
      storage_path: storagePath,
      file_size: file.size,
      file_type: file.type,
      tags: tagsArray,
      notes: notes || null,
    })
    .select()
    .single()

  if (dbError) {
    await supabase.storage.from(STORAGE_BUCKET).remove([storagePath])
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ document: doc })
}
```

- [ ] **Step 2: Create single doc / delete route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase/client'
import { STORAGE_BUCKET } from '@/lib/constants'

export const dynamic = 'force-dynamic'

// GET /api/patient-documents/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('patient_documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // Generate signed URL for download/preview
  const { data: urlData } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(data.storage_path, 3600)

  return NextResponse.json({
    document: data,
    signedUrl: urlData?.signedUrl ?? null,
  })
}

// DELETE /api/patient-documents/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = getSupabase()

  // Get document first for storage path
  const { data: doc, error: fetchError } = await supabase
    .from('patient_documents')
    .select('storage_path')
    .eq('id', id)
    .single()

  if (fetchError || !doc) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // Delete from storage
  await supabase.storage.from(STORAGE_BUCKET).remove([doc.storage_path])

  // Delete metadata
  const { error: dbError } = await supabase
    .from('patient_documents')
    .delete()
    .eq('id', id)

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 3: Create patient search route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase/client'

export const dynamic = 'force-dynamic'

// GET /api/patients/search?q=query
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.length < 1) {
    // Return recent patients if no query
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('patients')
      .select('id, clinical_id, name, age, gender, phone')
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
      .limit(10)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ patients: data ?? [] })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('patients')
    .select('id, clinical_id, name, age, gender, phone')
    .or(`name.ilike.%${query}%,phone.ilike.%${query}%,clinical_id.ilike.%${query}%`)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false })
    .limit(20)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ patients: data ?? [] })
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/patient-documents/ src/app/api/patients/search/
git commit -m "feat: patient documents and patient search API routes"
```

---

## Task 5: PatientSelector Component

**Files:**
- Create: `src/components/PatientSelector.tsx`

- [ ] **Step 1: Create PatientSelector**

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, User, Phone, Hash } from 'lucide-react'

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientSelectorProps {
  onSelect: (patient: PatientInfo) => void
}

export function PatientSelector({ onSelect }: PatientSelectorProps) {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<PatientInfo[]>([])
  const [loading, setLoading] = useState(false)

  const searchPatients = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/patients/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setPatients(data.patients ?? [])
    } catch {
      setPatients([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load recent patients on mount
  useEffect(() => {
    searchPatients('')
  }, [searchPatients])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => searchPatients(query), 300)
    return () => clearTimeout(timer)
  }, [query, searchPatients])

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, or AAH ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {query ? `Results for "${query}"` : 'Recent patients'}
        </p>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No patients found</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelect(patient)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/30 transition-colors text-left w-full"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {patient.clinical_id?.slice(-3) ?? '???'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {patient.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground font-mono">
                      {patient.clinical_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    {patient.age && <span>{patient.age}y</span>}
                    {patient.gender && <span>{patient.gender}</span>}
                    {patient.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PatientSelector.tsx
git commit -m "feat: PatientSelector component with search and recent patients"
```

---

## Task 6: PatientFolderView Component

**Files:**
- Create: `src/components/PatientFolderView.tsx`

- [ ] **Step 1: Create PatientFolderView**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, User, Phone, Calendar } from 'lucide-react'
import { DOCUMENT_CATEGORIES, formatFileSize } from '@/lib/constants'
import {
  FlaskConical, ClipboardList, BedDouble, BookOpen, BookMarked,
  Leaf, Receipt, Award, Pill, FileText,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  FlaskConical, ClipboardList, BedDouble, BookOpen, BookMarked,
  Leaf, Receipt, Award, Pill, FileText,
}

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientFolderViewProps {
  patient: PatientInfo
  onOpenCategory: (categoryId: string) => void
  onBack: () => void
  onUpload: (categoryId?: string) => void
}

export function PatientFolderView({
  patient,
  onOpenCategory,
  onBack,
  onUpload,
}: PatientFolderViewProps) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch(`/api/patient-documents?patient_id=${patient.id}`)
        const data = await res.json()
        setCounts(data.counts ?? {})
      } catch {
        setCounts({})
      } finally {
        setLoading(false)
      }
    }
    fetchCounts()
  }, [patient.id])

  const totalDocs = Object.values(counts).reduce((sum, c) => sum + c, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to patients
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {patient.clinical_id?.slice(-3)}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">{patient.name}</h2>
              <span className="text-xs px-2 py-0.5 bg-muted rounded font-mono text-muted-foreground">
                {patient.clinical_id}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
              {patient.age && <span>{patient.age} years</span>}
              {patient.gender && <span>{patient.gender}</span>}
              {patient.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {patient.phone}
                </span>
              )}
              <span className="text-xs">{totalDocs} document{totalDocs !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {DOCUMENT_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? FileText
              const count = counts[cat.id] ?? 0
              return (
                <button
                  key={cat.id}
                  onClick={() => onOpenCategory(cat.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:bg-accent hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium leading-tight">{cat.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {count} file{count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Upload */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => onUpload()}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PatientFolderView.tsx
git commit -m "feat: PatientFolderView with category folder grid"
```

---

## Task 7: FolderContents Component

**Files:**
- Create: `src/components/FolderContents.tsx`

- [ ] **Step 1: Create FolderContents**

```typescript
'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft, Download, Trash2, Eye, FileText, Image as ImageIcon,
  FileSpreadsheet, Upload, SortAsc, SortDesc, X,
} from 'lucide-react'
import { DOCUMENT_CATEGORIES, getFileTypeLabel, formatFileSize } from '@/lib/constants'

interface PatientDocument {
  id: string
  patient_id: string
  category: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

interface FolderContentsProps {
  patientId: string
  patientName: string
  clinicalId: string
  categoryId: string
  onBack: () => void
  onUpload: () => void
  onPreview: (doc: PatientDocument) => void
}

function getFileIcon(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'webp'].includes(ext ?? '')) return ImageIcon
  if (['xls', 'xlsx', 'csv'].includes(ext ?? '')) return FileSpreadsheet
  return FileText
}

export function FolderContents({
  patientId,
  patientName,
  clinicalId,
  categoryId,
  onBack,
  onUpload,
  onPreview,
}: FolderContentsProps) {
  const [documents, setDocuments] = useState<PatientDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [deleting, setDeleting] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const category = DOCUMENT_CATEGORIES.find((c) => c.id === categoryId)

  const fetchDocs = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/patient-documents?patient_id=${patientId}&category=${categoryId}`
      )
      const data = await res.json()
      setDocuments(data.documents ?? [])
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [patientId, categoryId])

  const sortedDocs = [...documents].sort((a, b) => {
    const dateA = new Date(a.upload_date).getTime()
    const dateB = new Date(b.upload_date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  const handleDelete = async (docId: string) => {
    setDeleting(docId)
    try {
      await fetch(`/api/patient-documents/${docId}`, { method: 'DELETE' })
      setDocuments((prev) => prev.filter((d) => d.id !== docId))
      setDeleteConfirm(null)
    } catch {
      // silently fail
    } finally {
      setDeleting(null)
    }
  }

  const handleDownload = async (doc: PatientDocument) => {
    try {
      const res = await fetch(`/api/patient-documents/${doc.id}`)
      const data = await res.json()
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank')
      }
    } catch {
      // silently fail
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {clinicalId} folders
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">{category?.label ?? categoryId}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clinicalId} — {patientName} · {documents.length} file{documents.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              title={`Sort ${sortOrder === 'newest' ? 'oldest first' : 'newest first'}`}
            >
              {sortOrder === 'newest' ? (
                <SortDesc className="w-4 h-4 text-muted-foreground" />
              ) : (
                <SortAsc className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={onUpload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : sortedDocs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No documents in this folder</p>
            <button
              onClick={onUpload}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Upload your first document
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {sortedDocs.map((doc) => {
              const Icon = getFileIcon(doc.filename)
              const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(
                doc.filename.split('.').pop()?.toLowerCase() ?? ''
              )
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.filename}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{getFileTypeLabel(doc.filename)}</span>
                      <span>·</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>·</span>
                      <span>
                        {new Date(doc.upload_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    {doc.tags.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onPreview(doc)}
                      className="p-1.5 rounded hover:bg-accent transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-1.5 rounded hover:bg-accent transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {deleteConfirm === doc.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={deleting === doc.id}
                          className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
                        >
                          {deleting === doc.id ? '...' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="p-1 rounded hover:bg-accent"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(doc.id)}
                        className="p-1.5 rounded hover:bg-accent transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-destructive/70 hover:text-destructive" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FolderContents.tsx
git commit -m "feat: FolderContents with file list, sort, preview, download, delete"
```

---

## Task 8: DocumentUpload Component

**Files:**
- Create: `src/components/DocumentUpload.tsx`

- [ ] **Step 1: Create DocumentUpload**

```typescript
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Check, Loader2 } from 'lucide-react'
import { DOCUMENT_CATEGORIES, formatFileSize, getFileTypeLabel } from '@/lib/constants'

interface DocumentUploadProps {
  patientId: string
  patientName: string
  clinicalId: string
  preselectedCategory?: string
  onComplete: () => void
  onCancel: () => void
}

interface QueuedFile {
  file: File
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
}

export function DocumentUpload({
  patientId,
  patientName,
  clinicalId,
  preselectedCategory,
  onComplete,
  onCancel,
}: DocumentUploadProps) {
  const [category, setCategory] = useState(preselectedCategory ?? '')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [files, setFiles] = useState<QueuedFile[]>([])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({ file, status: 'pending' as const })),
    ])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!category || files.length === 0) return

    setUploading(true)
    let completedCount = 0

    for (let i = 0; i < files.length; i++) {
      setFiles((prev) =>
        prev.map((f, idx) => (idx === i ? { ...f, status: 'uploading' } : f))
      )

      try {
        const formData = new FormData()
        formData.append('file', files[i].file)
        formData.append('patient_id', patientId)
        formData.append('category', category)
        if (tags) formData.append('tags', tags)
        if (notes) formData.append('notes', notes)

        const res = await fetch('/api/patient-documents', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error ?? 'Upload failed')
        }

        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done' } : f))
        )
        completedCount++
      } catch (err) {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? { ...f, status: 'error', error: err instanceof Error ? err.message : 'Failed' }
              : f
          )
        )
      }
    }

    setUploading(false)
    if (completedCount > 0) {
      // Small delay so user sees the "done" state
      setTimeout(onComplete, 800)
    }
  }

  const allDone = files.length > 0 && files.every((f) => f.status === 'done')
  const hasErrors = files.some((f) => f.status === 'error')
  const canUpload = category && files.length > 0 && !uploading && !allDone

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Upload Documents</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clinicalId} — {patientName}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Category Selector */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!!preselectedCategory}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            <option value="">Select category...</option>
            {DOCUMENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or click to browse — PDF, images, Excel, CSV, Word
          </p>
        </div>

        {/* File Queue */}
        {files.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </label>
            {files.map((qf, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-background"
              >
                <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{qf.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getFileTypeLabel(qf.file.name)} · {formatFileSize(qf.file.size)}
                    {qf.error && (
                      <span className="text-destructive ml-2">{qf.error}</span>
                    )}
                  </p>
                </div>
                {qf.status === 'uploading' && (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                )}
                {qf.status === 'done' && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
                {qf.status === 'error' && (
                  <span className="text-xs text-destructive">Failed</span>
                )}
                {qf.status === 'pending' && (
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 rounded hover:bg-accent"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Tags <span className="text-muted-foreground font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. blood test, follow-up, urgent"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes about these documents..."
            rows={2}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 px-4 border border-border rounded-lg text-sm hover:bg-accent transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={!canUpload}
          className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : allDone ? (
            <>
              <Check className="w-4 h-4" />
              Done
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''}` : ''}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DocumentUpload.tsx
git commit -m "feat: DocumentUpload with drag-drop, queue, tags, bulk upload"
```

---

## Task 9: DocumentPreview Component

**Files:**
- Create: `src/components/DocumentPreview.tsx`

- [ ] **Step 1: Create DocumentPreview**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { X, Download, ExternalLink, Loader2 } from 'lucide-react'
import { getFileTypeLabel, formatFileSize } from '@/lib/constants'

interface PatientDocument {
  id: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

interface DocumentPreviewProps {
  document: PatientDocument
  onClose: () => void
}

export function DocumentPreview({ document: doc, onClose }: DocumentPreviewProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch(`/api/patient-documents/${doc.id}`)
        const data = await res.json()
        if (data.signedUrl) {
          setSignedUrl(data.signedUrl)
        } else {
          setError('Could not generate preview URL')
        }
      } catch {
        setError('Failed to load document')
      } finally {
        setLoading(false)
      }
    }
    fetchUrl()
  }, [doc.id])

  const ext = doc.filename.split('.').pop()?.toLowerCase() ?? ''
  const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
  const isPdf = ext === 'pdf'

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate">{doc.filename}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {getFileTypeLabel(doc.filename)} · {formatFileSize(doc.file_size)} ·{' '}
              {new Date(doc.upload_date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {signedUrl && (
              <>
                <a
                  href={signedUrl}
                  download={doc.filename}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">{error}</p>
              {signedUrl && (
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:underline inline-block"
                >
                  Try opening in new tab
                </a>
              )}
            </div>
          ) : isImage && signedUrl ? (
            <div className="flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={signedUrl}
                alt={doc.filename}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          ) : isPdf && signedUrl ? (
            <iframe
              src={signedUrl}
              className="w-full h-[70vh] rounded-lg border border-border"
              title={doc.filename}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Preview not available for this file type</p>
              {signedUrl && (
                <a
                  href={signedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-primary hover:underline inline-block"
                >
                  Download to view
                </a>
              )}
            </div>
          )}
        </div>

        {/* Notes */}
        {doc.notes && (
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Notes:</span> {doc.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DocumentPreview.tsx
git commit -m "feat: DocumentPreview modal with inline PDF/image preview"
```

---

## Task 10: PatientDocuments Main Component

**Files:**
- Create: `src/components/PatientDocuments.tsx`

- [ ] **Step 1: Create the main orchestrating component**

```typescript
'use client'

import { useState } from 'react'
import { PatientSelector } from './PatientSelector'
import { PatientFolderView } from './PatientFolderView'
import { FolderContents } from './FolderContents'
import { DocumentUpload } from './DocumentUpload'
import { DocumentPreview } from './DocumentPreview'

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientDocument {
  id: string
  patient_id: string
  category: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

type ViewMode =
  | { type: 'selector' }
  | { type: 'folders'; patient: PatientInfo }
  | { type: 'contents'; patient: PatientInfo; categoryId: string }
  | { type: 'upload'; patient: PatientInfo; categoryId?: string }
  | { type: 'preview'; doc: PatientDocument }

export function PatientDocuments() {
  const [view, setView] = useState<ViewMode>({ type: 'selector' })
  const [refreshKey, setRefreshKey] = useState(0)

  const handlePatientSelect = (patient: PatientInfo) => {
    setView({ type: 'folders', patient })
  }

  const handleOpenCategory = (categoryId: string) => {
    if (view.type === 'folders') {
      setView({ type: 'contents', patient: view.patient, categoryId })
    }
  }

  const handleBackToFolders = () => {
    if (view.type === 'contents') {
      setView({ type: 'folders', patient: view.patient })
    }
  }

  const handleUpload = (categoryId?: string) => {
    if (view.type === 'folders' || view.type === 'contents') {
      setView({
        type: 'upload',
        patient: view.patient,
        categoryId: categoryId ?? (view.type === 'contents' ? view.categoryId : undefined),
      })
    }
  }

  const handleUploadComplete = () => {
    if (view.type === 'upload') {
      // Go back to the folder view and trigger refresh
      setView({ type: 'folders', patient: view.patient })
      setRefreshKey((k) => k + 1)
    }
  }

  const handlePreview = (doc: PatientDocument) => {
    setView({ type: 'preview', doc })
  }

  return (
    <div className="flex flex-col h-full" key={refreshKey}>
      {view.type === 'selector' && (
        <PatientSelector onSelect={handlePatientSelect} />
      )}

      {view.type === 'folders' && (
        <PatientFolderView
          patient={view.patient}
          onOpenCategory={handleOpenCategory}
          onBack={() => setView({ type: 'selector' })}
          onUpload={handleUpload}
        />
      )}

      {view.type === 'contents' && (
        <FolderContents
          patientId={view.patient.id}
          patientName={view.patient.name}
          clinicalId={view.patient.clinical_id}
          categoryId={view.categoryId}
          onBack={handleBackToFolders}
          onUpload={() => handleUpload(view.categoryId)}
          onPreview={handlePreview}
        />
      )}

      {view.type === 'upload' && (
        <DocumentUpload
          patientId={view.patient.id}
          patientName={view.patient.name}
          clinicalId={view.patient.clinical_id}
          preselectedCategory={view.categoryId}
          onComplete={handleUploadComplete}
          onCancel={handleBackToFolders}
        />
      )}

      {view.type === 'preview' && (
        <DocumentPreview
          document={view.doc}
          onClose={() => {
            // Return to the folder contents if we came from there
            if (view.type === 'preview') {
              // We lose context here, so go to selector
              // This is handled by the parent keeping state
              setView({ type: 'selector' })
            }
          }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Fix preview close — need to track previous view**

The preview close loses navigation context. Update the component to track the previous view:

Replace the state declarations and the preview close handler:

```typescript
// Replace the state + view logic in PatientDocuments.tsx:

const [previousView, setPreviousView] = useState<ViewMode | null>(null)

// Update handlePreview:
const handlePreview = (doc: PatientDocument) => {
  setPreviousView(view)
  setView({ type: 'preview', doc })
}

// Update preview close:
// In the render, replace the preview onClose:
// onClose={() => setView(previousView ?? { type: 'selector' })}
```

Apply this change to the full component. The updated component:

```typescript
'use client'

import { useState } from 'react'
import { PatientSelector } from './PatientSelector'
import { PatientFolderView } from './PatientFolderView'
import { FolderContents } from './FolderContents'
import { DocumentUpload } from './DocumentUpload'
import { DocumentPreview } from './DocumentPreview'

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientDocument {
  id: string
  patient_id: string
  category: string
  filename: string
  storage_path: string
  file_size: number
  file_type: string
  upload_date: string
  tags: string[]
  notes: string | null
}

type ViewMode =
  | { type: 'selector' }
  | { type: 'folders'; patient: PatientInfo }
  | { type: 'contents'; patient: PatientInfo; categoryId: string }
  | { type: 'upload'; patient: PatientInfo; categoryId?: string }
  | { type: 'preview'; doc: PatientDocument }

export function PatientDocuments() {
  const [view, setView] = useState<ViewMode>({ type: 'selector' })
  const [previousView, setPreviousView] = useState<ViewMode | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handlePatientSelect = (patient: PatientInfo) => {
    setView({ type: 'folders', patient })
  }

  const handleOpenCategory = (categoryId: string) => {
    if (view.type === 'folders') {
      setView({ type: 'contents', patient: view.patient, categoryId })
    }
  }

  const handleBackToFolders = () => {
    if (view.type === 'contents') {
      setView({ type: 'folders', patient: view.patient })
    } else if (view.type === 'upload') {
      // Go back to folders (or contents if we had a category)
      setView({ type: 'folders', patient: view.patient })
    }
  }

  const handleUpload = (categoryId?: string) => {
    if (view.type === 'folders' || view.type === 'contents') {
      setView({
        type: 'upload',
        patient: view.patient,
        categoryId: categoryId ?? (view.type === 'contents' ? view.categoryId : undefined),
      })
    }
  }

  const handleUploadComplete = () => {
    if (view.type === 'upload') {
      setView({ type: 'folders', patient: view.patient })
      setRefreshKey((k) => k + 1)
    }
  }

  const handlePreview = (doc: PatientDocument) => {
    setPreviousView(view)
    setView({ type: 'preview', doc })
  }

  return (
    <div className="flex flex-col h-full" key={refreshKey}>
      {view.type === 'selector' && (
        <PatientSelector onSelect={handlePatientSelect} />
      )}

      {view.type === 'folders' && (
        <PatientFolderView
          patient={view.patient}
          onOpenCategory={handleOpenCategory}
          onBack={() => setView({ type: 'selector' })}
          onUpload={handleUpload}
        />
      )}

      {view.type === 'contents' && (
        <FolderContents
          patientId={view.patient.id}
          patientName={view.patient.name}
          clinicalId={view.patient.clinical_id}
          categoryId={view.categoryId}
          onBack={handleBackToFolders}
          onUpload={() => handleUpload(view.categoryId)}
          onPreview={handlePreview}
        />
      )}

      {view.type === 'upload' && (
        <DocumentUpload
          patientId={view.patient.id}
          patientName={view.patient.name}
          clinicalId={view.patient.clinical_id}
          preselectedCategory={view.categoryId}
          onComplete={handleUploadComplete}
          onCancel={handleBackToFolders}
        />
      )}

      {view.type === 'preview' && (
        <DocumentPreview
          document={view.doc}
          onClose={() => setView(previousView ?? { type: 'selector' })}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PatientDocuments.tsx
git commit -m "feat: PatientDocuments main component with view state machine"
```

---

## Task 11: Rename Module — Sidebar, MobileNav, HeaderBar

**Files:**
- Modify: `src/components/DesktopSidebar.tsx:28-38`
- Modify: `src/components/MobileNav.tsx:24-33`
- Modify: `src/components/HeaderBar.tsx:8-12,21-26`

- [ ] **Step 1: Update DesktopSidebar.tsx**

Replace lines 28-38:

```typescript
  {
    href: '/?module=documents',
    label: 'Patient Documents',
    description: 'Manage patient clinical documents',
    matchModules: ['documents'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
```

- [ ] **Step 2: Update MobileNav.tsx**

Replace lines 24-33:

```typescript
  {
    href: '/?module=documents',
    label: 'Documents',
    matchModules: ['documents'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
```

- [ ] **Step 3: Update HeaderBar.tsx MODULE_TITLES**

Replace lines 8-12:

```typescript
const MODULE_TITLES: Record<string, string> = {
  chat: 'Clinical AI Chat',
  documents: 'Patient Documents',
  'treatment-protocol': 'Treatment Protocol',
}
```

Replace lines 21-26:

```typescript
const MODULE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Chats' },
  { value: 'chat', label: 'Chat' },
  { value: 'documents', label: 'Documents' },
  { value: 'treatment-protocol', label: 'Protocol' },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/components/DesktopSidebar.tsx src/components/MobileNav.tsx src/components/HeaderBar.tsx
git commit -m "feat: rename Case Collector to Patient Documents in navigation"
```

---

## Task 12: Update ChatPanel — Wire PatientDocuments + Move Intake Wizard

**Files:**
- Modify: `src/components/ChatPanel.tsx:1-6,110-122`

- [ ] **Step 1: Update imports and conditional rendering**

Replace the import section (lines 1-6):

```typescript
'use client'

import { useChatStore } from '@/lib/store'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { CaseCollectorChat } from './CaseCollectorChat'
import { PatientDocuments } from './PatientDocuments'
import { ModelSelector } from './ModelSelector'
```

Replace lines 110-122:

```typescript
export function ChatPanel() {
  const activeModule = useChatStore((state) => state.activeModule)

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      {activeModule === 'documents' ? (
        <PatientDocuments />
      ) : activeModule === 'treatment-protocol' ? (
        <CaseCollectorChat />
      ) : (
        <ChatView />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Update QuickAction buttons (lines 75-86)**

Replace lines 75-86:

```typescript
              <QuickAction
                label="Patient Documents"
                description="Manage patient clinical documents and files"
                prompt=""
                module="documents"
              />
              <QuickAction
                label="Treatment Protocol"
                description="Generate research-backed treatment plans"
                prompt=""
                module="treatment-protocol"
              />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ChatPanel.tsx
git commit -m "feat: wire PatientDocuments module, move intake wizard to treatment-protocol"
```

---

## Task 13: End-to-End Smoke Test

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test Patient Documents module**

1. Navigate to `http://localhost:3000/?module=documents`
2. Verify the PatientSelector shows with search bar and recent patients
3. If no patients exist, create one at `/patients/new`
4. Click a patient → should show folder grid with 10 categories
5. Click a category → should show empty file list with "Upload your first document" link
6. Click "Upload" → should show upload form with category pre-selected
7. Upload a test PDF → should appear in the file list
8. Click the eye icon → should open preview modal
9. Click the download icon → should open signed URL
10. Click delete (trash icon) → should show confirm, then remove the file

- [ ] **Step 3: Test navigation rename**

1. Desktop sidebar should show "Patient Documents" with folder icon
2. Mobile nav should show "Documents" tab
3. Header bar should show "Patient Documents" when on `/?module=documents`

- [ ] **Step 4: Test Treatment Protocol still works**

1. Navigate to `/?module=treatment-protocol`
2. The intake wizard (CaseCollectorChat) should render

- [ ] **Step 5: Test Chat still works**

1. Navigate to `/?module=chat` or `/`
2. Normal chat should work

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: smoke test fixes for patient documents module"
```

---

## Task 14: Push to Deploy

- [ ] **Step 1: Push to remote**

```bash
git push origin main
```

Vercel will auto-deploy from the remote main branch. Monitor the build at Vercel dashboard.

- [ ] **Step 2: Verify on production**

1. Visit `https://clinicalai.ayurvrittaayurveda.in/?module=documents`
2. Test patient selection, folder view, upload, preview, delete
3. Verify `/?module=treatment-protocol` still shows intake wizard
