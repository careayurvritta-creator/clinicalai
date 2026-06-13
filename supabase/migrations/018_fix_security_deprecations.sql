-- 018: Fix deprecated auth.role() and SECURITY DEFINER functions
-- Created: 2026-05-31

-- ============================================
-- FIX DEPRECATED auth.role() → TO clause
-- ============================================
-- Supabase deprecated auth.role() in favour of specifying target role directly.
-- auth.role() = 'authenticated' breaks silently when anonymous sign-ins are enabled.

-- Drop old policies
DROP POLICY IF EXISTS "Anyone can read WHO terminology" ON who_terminology;
DROP POLICY IF EXISTS "Anyone can read diseases" ON diseases;
DROP POLICY IF EXISTS "Anyone can read herbs" ON herbs;
DROP POLICY IF EXISTS "Anyone can read treatments" ON treatments;
DROP POLICY IF EXISTS "Anyone can read Charak chapters" ON charak_chapters;
DROP POLICY IF EXISTS "Anyone can read allopathy integration" ON allopathy_integration;
DROP POLICY IF EXISTS "Anyone can read combined protocols" ON combined_protocols;
DROP POLICY IF EXISTS "Anyone can read knowledge embeddings" ON knowledge_embeddings;
DROP POLICY IF EXISTS "Anyone can insert RAG search history" ON rag_search_history;
DROP POLICY IF EXISTS "Anyone can read RAG search history" ON rag_search_history;

-- Recreate with modern TO clause syntax
CREATE POLICY "Anyone can read WHO terminology"
  ON who_terminology FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read diseases"
  ON diseases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read herbs"
  ON herbs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read treatments"
  ON treatments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read Charak chapters"
  ON charak_chapters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read allopathy integration"
  ON allopathy_integration FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read combined protocols"
  ON combined_protocols FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read knowledge embeddings"
  ON knowledge_embeddings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert RAG search history"
  ON rag_search_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read RAG search history"
  ON rag_search_history FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- FIX SECURITY DEFINER → SECURITY INVOKER
-- ============================================
-- SECURITY DEFINER bypasses RLS. These are read-only utility functions
-- that should respect the caller's RLS context.

-- get_patient_case_history: patients already have RLS, so SECURITY INVOKER is safe
CREATE OR REPLACE FUNCTION get_patient_case_history(patient_uuid uuid)
RETURNS TABLE (
  case_id uuid,
  case_number text,
  visit_date date,
  visit_type text,
  visit_number integer,
  provisional_diagnosis text,
  final_diagnosis text,
  status text,
  treatment_plan text,
  outcome_rating integer,
  outcome_label text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.case_number,
    c.visit_date,
    c.visit_type,
    c.visit_number,
    c.provisional_diagnosis,
    c.final_diagnosis,
    c.status,
    c.treatment_plan,
    co.outcome_rating,
    co.outcome_label
  FROM cases c
  LEFT JOIN case_outcomes co ON c.id = co.case_id
  WHERE c.patient_id = patient_uuid
  ORDER BY c.visit_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- get_doctor_stats: profiles have RLS
CREATE OR REPLACE FUNCTION get_doctor_stats(doctor_uuid uuid)
RETURNS jsonb AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_patients', count(DISTINCT pa.id),
    'total_cases', count(DISTINCT c.id),
    'active_cases', count(DISTINCT c.id) FILTER (WHERE c.status = 'active'),
    'completed_cases', count(DISTINCT c.id) FILTER (WHERE c.status = 'completed'),
    'avg_outcome_rating', round(avg(co.outcome_rating)::numeric, 2),
    'total_protocols', count(DISTINCT tp.id),
    'total_investigations', count(DISTINCT if2.id),
    'critical_findings', count(DISTINCT if2.id) FILTER (WHERE if2.status = 'critical'),
    'upcoming_follow_ups', count(DISTINCT c.id) FILTER (WHERE c.follow_up_date > current_date)
  ) INTO result
  FROM profiles pr
  LEFT JOIN patients pa ON pr.id = pa.doctor_id
  LEFT JOIN cases c ON pr.id = c.doctor_id
  LEFT JOIN case_outcomes co ON c.id = co.case_id
  LEFT JOIN treatment_protocols tp ON c.id = tp.case_id
  LEFT JOIN investigation_findings if2 ON c.id = if2.case_id
  WHERE pr.id = doctor_uuid;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- search_knowledge_base: knowledge tables are read-only for all authenticated users
CREATE OR REPLACE FUNCTION search_knowledge_base(
  search_query text,
  source_tables text[] DEFAULT array['who_terminology', 'diseases', 'herbs', 'treatments', 'charak_chapters'],
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
  SELECT 'who_terminology' as source_table, id as source_id, term as title, coalesce(definition, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  FROM who_terminology
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
  AND 'who_terminology' = any(source_tables)

  UNION ALL

  SELECT 'diseases' as source_table, id as source_id, name as title, coalesce(samprapti, modern_correlation, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  FROM diseases
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
  AND 'diseases' = any(source_tables)
  AND is_active = true

  UNION ALL

  SELECT 'herbs' as source_table, id as source_id, name as title, coalesce(prabhava, array_to_string(indications, ', '), '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  FROM herbs
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
  AND 'herbs' = any(source_tables)
  AND is_active = true

  UNION ALL

  SELECT 'treatments' as source_table, id as source_id, name as title, coalesce(description, array_to_string(indications, ', '), '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  FROM treatments
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
  AND 'treatments' = any(source_tables)
  AND is_active = true

  UNION ALL

  SELECT 'charak_chapters' as source_table, id as source_id, chapter_name as title, coalesce(summary, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  FROM charak_chapters
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
  AND 'charak_chapters' = any(source_tables)

  ORDER BY rank DESC
  LIMIT limit_results;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- semantic_search: knowledge_embeddings table has RLS
CREATE OR REPLACE FUNCTION semantic_search(
  query_embedding vector(1024),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10,
  source_table_filter text DEFAULT null
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
    1 - (ke.embedding <=> query_embedding) as similarity
  FROM knowledge_embeddings ke
  WHERE 1 - (ke.embedding <=> query_embedding) > match_threshold
  AND (source_table_filter IS NULL OR ke.source_table = source_table_filter)
  ORDER BY ke.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- get_critical_findings: uses cases/patients RLS
CREATE OR REPLACE FUNCTION get_critical_findings(doctor_uuid uuid, days_back integer DEFAULT 30)
RETURNS TABLE (
  finding_id uuid,
  case_number text,
  patient_name text,
  parameter text,
  value text,
  unit text,
  normal_range text,
  clinical_correlation text,
  visit_date date
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    if2.id,
    c.case_number,
    p.name,
    if2.parameter,
    if2.value,
    if2.unit,
    if2.normal_range,
    if2.clinical_correlation,
    c.visit_date
  FROM investigation_findings if2
  JOIN cases c ON if2.case_id = c.id
  JOIN patients p ON c.patient_id = p.id
  WHERE if2.status = 'critical'
  AND c.doctor_id = doctor_uuid
  AND c.visit_date >= current_date - (days_back || ' days')::interval
  ORDER BY c.visit_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- archive_old_cases: admin operation, but keep SECURITY INVOKER for safety
CREATE OR REPLACE FUNCTION archive_old_cases(days_threshold integer DEFAULT 365)
RETURNS integer AS $$
DECLARE
  archived_count integer;
BEGIN
  UPDATE cases
  SET status = 'archived',
      updated_at = now()
  WHERE status = 'completed'
  AND completed_at < current_date - (days_threshold || ' days')::interval;

  GET DIAGNOSTICS archived_count = ROW_COUNT;
  RETURN archived_count;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;
