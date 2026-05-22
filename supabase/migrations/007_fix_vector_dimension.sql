-- Migration 007: Fix semantic_search RPC vector dimension mismatch
-- Created: 2026-05-22
-- Description: Fixes semantic_search function which incorrectly declared vector(1536)
--              when actual embeddings are 1024-dim (NVIDIA nv-embedqa-e5-v5)

-- Drop the broken function and recreate with correct dimension
DROP FUNCTION IF EXISTS semantic_search(vector, float, int, text);

-- Recreate with correct vector(1024) dimension
CREATE OR REPLACE FUNCTION semantic_search(
  query_embedding vector(1024),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10,
  source_table_filter text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  source_table text,
  source_id uuid,
  source_title text,
  content text,
  metadata jsonb,
  similarity float
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ke.id,
    ke.source_table,
    ke.source_id,
    ke.source_title,
    ke.content,
    ke.metadata,
    1 - (ke.embedding <=> query_embedding) AS similarity
  FROM knowledge_embeddings ke
  WHERE 1 - (ke.embedding <=> query_embedding) > match_threshold
    AND (source_table_filter IS NULL OR ke.source_table = source_table_filter)
  ORDER BY ke.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION semantic_search IS 'Semantic vector search using pgvector cosine similarity. Embeddings are 1024-dim (NVIDIA nv-embedqa-e5-v5).';
