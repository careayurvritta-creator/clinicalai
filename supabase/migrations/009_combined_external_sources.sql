-- ============================================
-- COMBINED MIGRATION: External RAG Sources
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- PART 1: Fix semantic_search RPC vector dimension
-- Fixes vector(1536) → vector(1024) and adds metadata to return type
-- ============================================

DROP FUNCTION IF EXISTS semantic_search(vector, float, int, text);

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

-- PART 2: Extend knowledge_embeddings CHECK constraint
-- ============================================

ALTER TABLE knowledge_embeddings
  DROP CONSTRAINT IF EXISTS knowledge_embeddings_source_table_check;

ALTER TABLE knowledge_embeddings
  ADD CONSTRAINT knowledge_embeddings_source_table_check
  CHECK (source_table IN (
    'who_terminology', 'diseases', 'herbs', 'treatments',
    'charak_chapters', 'allopathy_integration', 'combined_protocols',
    'diagnostics', 'fundamentals',
    'sushruta_chapters', 'clinical_evidence', 'external_qa', 'modern_medicines'
  ));

-- PART 3: Create trigger function for search_vector
-- ============================================

CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- We'll define per-table trigger functions below

-- PART 4: Create new tables (using triggers instead of generated columns)
-- If tables already exist from all_migrations.sql with GENERATED ALWAYS AS,
-- convert them to regular columns + triggers
-- ============================================

-- Convert generated columns to regular columns if they exist
DO $$ BEGIN
  ALTER TABLE sushruta_chapters ALTER COLUMN search_vector DROP EXPRESSION;
EXCEPTION WHEN undefined_column THEN NULL;
WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE clinical_evidence ALTER COLUMN search_vector DROP EXPRESSION;
EXCEPTION WHEN undefined_column THEN NULL;
WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE external_qa ALTER COLUMN search_vector DROP EXPRESSION;
EXCEPTION WHEN undefined_column THEN NULL;
WHEN others THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE modern_medicines ALTER COLUMN search_vector DROP EXPRESSION;
EXCEPTION WHEN undefined_column THEN NULL;
WHEN others THEN NULL;
END $$;

-- Sushruta Samhita chapters
CREATE TABLE IF NOT EXISTS sushruta_chapters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_number integer NOT NULL,
  sthana text NOT NULL,
  chapter_name text NOT NULL,
  sanskrit_name text,
  english_title text,
  summary text,
  key_concepts text[],
  verses_count integer,
  content text,
  key_formulas text[],
  key_herbs text[],
  key_diseases text[],
  surgical_procedures jsonb,
  anatomy_descriptions jsonb,
  relevance_tags text[],
  clinical_applications text[],
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION sushruta_chapters_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.chapter_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.english_title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.summary, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(NEW.key_concepts, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sushruta_chapters_search_vector ON sushruta_chapters;
CREATE TRIGGER trg_sushruta_chapters_search_vector
  BEFORE INSERT OR UPDATE ON sushruta_chapters
  FOR EACH ROW EXECUTE FUNCTION sushruta_chapters_search_vector_update();

-- Clinical evidence (PubMed)
CREATE TABLE IF NOT EXISTS clinical_evidence (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pmid text UNIQUE NOT NULL,
  title text NOT NULL,
  authors text[],
  journal text,
  publication_date date,
  abstract text,
  doi text,
  mesh_terms text[],
  study_type text,
  evidence_level text CHECK (evidence_level IN ('systematic_review', 'rct', 'cohort', 'case_control', 'case_series', 'expert_opinion')),
  ayurveda_relevance text,
  herbs_mentioned text[],
  conditions_mentioned text[],
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION clinical_evidence_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.abstract, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(NEW.mesh_terms, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_clinical_evidence_search_vector ON clinical_evidence;
CREATE TRIGGER trg_clinical_evidence_search_vector
  BEFORE INSERT OR UPDATE ON clinical_evidence
  FOR EACH ROW EXECUTE FUNCTION clinical_evidence_search_vector_update();

-- External Q&A (HuggingFace datasets)
CREATE TABLE IF NOT EXISTS external_qa (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_dataset text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  context text,
  category text,
  classical_reference text,
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION external_qa_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.question, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.answer, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.context, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_external_qa_search_vector ON external_qa;
CREATE TRIGGER trg_external_qa_search_vector
  BEFORE INSERT OR UPDATE ON external_qa
  FOR EACH ROW EXECUTE FUNCTION external_qa_search_vector_update();

-- Modern medicines (1mg.com)
CREATE TABLE IF NOT EXISTS modern_medicines (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_name text NOT NULL,
  composition text NOT NULL,
  manufacturer text,
  uses text NOT NULL,
  side_effects text,
  precautions text,
  drug_interactions text,
  therapeutic_class text,
  ayurvedic_alternatives text[],
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION modern_medicines_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.medicine_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.composition, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.uses, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.side_effects, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_modern_medicines_search_vector ON modern_medicines;
CREATE TRIGGER trg_modern_medicines_search_vector
  BEFORE INSERT OR UPDATE ON modern_medicines
  FOR EACH ROW EXECUTE FUNCTION modern_medicines_search_vector_update();

-- PART 5: Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_sushruta_chapters_number ON sushruta_chapters(sthana, chapter_number);
CREATE INDEX IF NOT EXISTS idx_sushruta_chapters_search ON sushruta_chapters USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_clinical_evidence_pmid ON clinical_evidence(pmid);
CREATE INDEX IF NOT EXISTS idx_clinical_evidence_mesh ON clinical_evidence USING gin(mesh_terms);
CREATE INDEX IF NOT EXISTS idx_clinical_evidence_search ON clinical_evidence USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_external_qa_source ON external_qa(source_dataset);
CREATE INDEX IF NOT EXISTS idx_external_qa_search ON external_qa USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_modern_medicines_name ON modern_medicines USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_modern_medicines_class ON modern_medicines(therapeutic_class);

-- PART 6: Row Level Security
-- ============================================

ALTER TABLE sushruta_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE modern_medicines ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone can read Sushruta chapters" ON sushruta_chapters FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read clinical evidence" ON clinical_evidence FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read external Q&A" ON external_qa FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read modern medicines" ON modern_medicines FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- PART 7: Updated_at triggers
-- ============================================

DO $$ BEGIN
  CREATE TRIGGER update_sushruta_chapters_updated_at BEFORE UPDATE ON sushruta_chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_clinical_evidence_updated_at BEFORE UPDATE ON clinical_evidence FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_external_qa_updated_at BEFORE UPDATE ON external_qa FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER update_modern_medicines_updated_at BEFORE UPDATE ON modern_medicines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- PART 8: Extended search_knowledge_base RPC
-- ============================================

DROP FUNCTION IF EXISTS search_knowledge_base(text, text[], integer);

CREATE OR REPLACE FUNCTION search_knowledge_base(
  search_query text,
  source_tables text[] DEFAULT ARRAY['who_terminology', 'diseases', 'herbs', 'treatments', 'charak_chapters', 'sushruta_chapters', 'clinical_evidence', 'external_qa', 'modern_medicines'],
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

  SELECT 'who_terminology' AS source_table, id AS source_id, term AS title,
    COALESCE(definition, '') AS content,
    ts_rank(search_vector, plainto_tsquery('simple', search_query)) AS rank
  FROM who_terminology
  WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'who_terminology' = ANY(source_tables)

  UNION ALL

  SELECT 'diseases', id, name, COALESCE(samprapti, modern_correlation, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM diseases WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'diseases' = ANY(source_tables) AND is_active = true

  UNION ALL

  SELECT 'herbs', id, name, COALESCE(prabhava, array_to_string(indications, ', '), ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM herbs WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'herbs' = ANY(source_tables) AND is_active = true

  UNION ALL

  SELECT 'treatments', id, name, COALESCE(description, array_to_string(indications, ', '), ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM treatments WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'treatments' = ANY(source_tables) AND is_active = true

  UNION ALL

  SELECT 'charak_chapters', id, chapter_name, COALESCE(summary, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM charak_chapters WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'charak_chapters' = ANY(source_tables)

  UNION ALL

  SELECT 'sushruta_chapters', id, chapter_name, COALESCE(summary, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM sushruta_chapters WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'sushruta_chapters' = ANY(source_tables)

  UNION ALL

  SELECT 'clinical_evidence', id, title, COALESCE(abstract, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM clinical_evidence WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'clinical_evidence' = ANY(source_tables)

  UNION ALL

  SELECT 'external_qa', id, question, COALESCE(answer, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM external_qa WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'external_qa' = ANY(source_tables)

  UNION ALL

  SELECT 'modern_medicines', id, medicine_name, COALESCE(uses, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM modern_medicines WHERE search_vector @@ plainto_tsquery('simple', search_query) AND 'modern_medicines' = ANY(source_tables)

  ORDER BY rank DESC
  LIMIT limit_results;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- DONE! Now run the ingestion scripts locally:
-- npx tsx scripts/ingest-huggingface.ts
-- npx tsx scripts/ingest-pubmed.ts
-- npx tsx scripts/embed-knowledge.ts
