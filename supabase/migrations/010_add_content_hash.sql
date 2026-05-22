-- Add content_hash column to knowledge_embeddings for incremental updates
-- Safe to run multiple times

ALTER TABLE knowledge_embeddings
  ADD COLUMN IF NOT EXISTS content_hash text;

-- Create index for faster dedup lookups
CREATE INDEX IF NOT EXISTS idx_knowledge_embeddings_content_hash
  ON knowledge_embeddings(content_hash);

COMMENT ON COLUMN knowledge_embeddings.content_hash IS 'MD5 hash of content for change detection during incremental embedding updates';
