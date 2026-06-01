-- Migration 016: Add UHID column + patient_drive_links bridge table
-- UHID format: UHID-YYMMNNN (e.g., UHID-2605001)

-- ============================================
-- UHID COLUMN ON PATIENTS
-- ============================================
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS uhid text UNIQUE;
CREATE INDEX IF NOT EXISTS idx_patients_uhid ON public.patients(uhid);

-- ============================================
-- PATIENT DRIVE LINKS TABLE
-- Maps Google Drive folder IDs to Supabase patient records
-- ============================================
CREATE TABLE IF NOT EXISTS public.patient_drive_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  drive_folder_id TEXT NOT NULL,
  clinical_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(patient_id),
  UNIQUE(drive_folder_id)
);

CREATE INDEX IF NOT EXISTS idx_patient_drive_links_patient ON public.patient_drive_links(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_drive_links_folder ON public.patient_drive_links(drive_folder_id);
CREATE INDEX IF NOT EXISTS idx_patient_drive_links_clinical ON public.patient_drive_links(clinical_id);

ALTER TABLE public.patient_drive_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all patient drive link operations"
  ON public.patient_drive_links FOR ALL
  USING (true);
