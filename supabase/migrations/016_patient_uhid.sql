-- Add UHID (Unique Health ID) column to patients table
-- Format: UHID-YYMMNNN (e.g., UHID-2605001)

ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS uhid text UNIQUE;
CREATE INDEX IF NOT EXISTS idx_patients_uhid ON public.patients(uhid);
