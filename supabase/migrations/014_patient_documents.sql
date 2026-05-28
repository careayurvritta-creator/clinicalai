-- Migration 014: Patient Documents — clinical_id + document storage
-- Created: 2026-05-28
-- Description: Add clinical_id to patients, create patient_documents table
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
WITH numbered AS (
  SELECT id, 'AAH' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::TEXT, 3, '0') AS new_id
  FROM patients WHERE clinical_id IS NULL
)
UPDATE patients SET clinical_id = numbered.new_id
FROM numbered WHERE patients.id = numbered.id;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_patients_clinical_id ON patients(clinical_id);

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

-- RLS (auth currently disabled — allow all operations; re-enable when auth is restored)
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;

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

-- ============================================
-- STORAGE BUCKET SETUP (manual step)
-- ============================================
-- Go to Supabase Dashboard > Storage > New Bucket:
--   Name: patient-documents
--   Public: false
--   File size limit: 52428800 (50MB)
--   Allowed MIME types:
--     application/pdf
--     image/jpeg
--     image/png
--     image/webp
--     application/vnd.ms-excel
--     application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
--     text/csv
