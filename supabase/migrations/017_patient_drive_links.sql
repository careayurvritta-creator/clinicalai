-- 017: Patient drive links table (applied via MCP on 2026-05-31)
CREATE TABLE IF NOT EXISTS patient_drive_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  drive_folder_id TEXT NOT NULL,
  clinical_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(patient_id)
);

-- RLS
ALTER TABLE patient_drive_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can manage own patient drive links"
  ON patient_drive_links FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM patients p
      JOIN profiles pr ON p.doctor_id = pr.id
      WHERE p.id = patient_drive_links.patient_id
      AND pr.auth_user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM patients p
      JOIN profiles pr ON p.doctor_id = pr.id
      WHERE p.id = patient_drive_links.patient_id
      AND pr.auth_user_id = auth.uid()
    )
  );
