-- Migration 019: Restore search_knowledge_base with all 9 knowledge tables
-- Created: 2026-06-14
-- Description: Migration 018 accidentally dropped 4 tables from search_knowledge_base
--              (sushruta_chapters, clinical_evidence, external_qa, modern_medicines).
--              This restores full coverage while keeping SECURITY INVOKER from 018.

-- ============================================
-- RESTORE RLS POLICIES for tables added in 008 but missing from 018
-- ============================================
DROP POLICY IF EXISTS "Anyone can read Sushruta chapters" ON sushruta_chapters;
DROP POLICY IF EXISTS "Anyone can read clinical evidence" ON clinical_evidence;
DROP POLICY IF EXISTS "Anyone can read external Q&A" ON external_qa;
DROP POLICY IF EXISTS "Anyone can read modern medicines" ON modern_medicines;

CREATE POLICY "Anyone can read Sushruta chapters"
  ON sushruta_chapters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read clinical evidence"
  ON clinical_evidence FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read external Q&A"
  ON external_qa FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read modern medicines"
  ON modern_medicines FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- RESTORE search_knowledge_base with all 9 tables
-- ============================================
DROP FUNCTION IF EXISTS search_knowledge_base(text, text[], integer);

CREATE OR REPLACE FUNCTION search_knowledge_base(
  search_query text,
  source_tables text[] DEFAULT ARRAY[
    'who_terminology', 'diseases', 'herbs', 'treatments',
    'charak_chapters', 'sushruta_chapters',
    'clinical_evidence', 'external_qa', 'modern_medicines'
  ],
  limit_results integer DEFAULT 10
)
RETURNS TABLE (
  source_table text,
  source_id uuid,
  title text,
  content text,
  rank real
) AS $$
BEGIN
  RETURN QUERY

  -- WHO Terminology
  SELECT 'who_terminology'::text, id, term,
    COALESCE(definition, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM who_terminology
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'who_terminology' = ANY(source_tables)

  UNION ALL

  -- Diseases
  SELECT 'diseases'::text, id, name,
    COALESCE(samprapti, modern_correlation, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM diseases
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'diseases' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Herbs
  SELECT 'herbs'::text, id, name,
    COALESCE(prabhava, array_to_string(indications, ', '), '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM herbs
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'herbs' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Treatments
  SELECT 'treatments'::text, id, name,
    COALESCE(description, array_to_string(indications, ', '), '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM treatments
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'treatments' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Charak Chapters
  SELECT 'charak_chapters'::text, id, chapter_name,
    COALESCE(summary, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM charak_chapters
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'charak_chapters' = ANY(source_tables)

  UNION ALL

  -- Sushruta Chapters (restored from migration 008)
  SELECT 'sushruta_chapters'::text, id, chapter_name,
    COALESCE(summary, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM sushruta_chapters
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'sushruta_chapters' = ANY(source_tables)

  UNION ALL

  -- Clinical Evidence (restored from migration 008)
  SELECT 'clinical_evidence'::text, id, title,
    COALESCE(abstract, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM clinical_evidence
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'clinical_evidence' = ANY(source_tables)

  UNION ALL

  -- External Q&A (restored from migration 008)
  SELECT 'external_qa'::text, id, question,
    COALESCE(answer, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM external_qa
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'external_qa' = ANY(source_tables)

  UNION ALL

  -- Modern Medicines (restored from migration 008)
  SELECT 'modern_medicines'::text, id, medicine_name,
    COALESCE(uses, '')::text,
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM modern_medicines
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'modern_medicines' = ANY(source_tables)

  ORDER BY rank DESC
  LIMIT limit_results;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

COMMENT ON FUNCTION search_knowledge_base IS 'Full-text search across all 9 knowledge base tables (restored full coverage)';