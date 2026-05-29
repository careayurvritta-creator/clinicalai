-- 015: Google Drive connections table
CREATE TABLE IF NOT EXISTS drive_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  scope TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expiry_date BIGINT,
  root_folder_id TEXT,
  connected_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS
ALTER TABLE drive_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drive connection"
  ON drive_connections FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
