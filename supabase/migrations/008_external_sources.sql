-- Migration 008: External Knowledge Sources
-- Created: 2026-05-22
-- Description: New tables for Sushruta Samhita, clinical evidence, external Q&A, modern medicines.
--              Extends knowledge_embeddings CHECK constraint and search_knowledge_base RPC.

-- ============================================
-- EXTEND knowledge_embeddings CHECK CONSTRAINT
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

-- ============================================
-- SUSHRUTA SAMHITA CHAPTERS
-- Classical surgical/anatomical text (mirrors charak_chapters structure)
-- ============================================
CREATE TABLE IF NOT EXISTS sushruta_chapters (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_number integer NOT NULL,
  sthana text NOT NULL,
  chapter_name text NOT NULL,
  sanskrit_name text,
  english_title text,

  -- Content
  summary text,
  key_concepts text[],
  verses_count integer,
  content text,
  key_formulas text[],
  key_herbs text[],
  key_diseases text[],

  -- Sushruta-specific: surgical and anatomical content
  surgical_procedures jsonb,     -- [{name, sanskrit, indication, procedure[], instruments[], complications[], postOperative[]}]
  anatomy_descriptions jsonb,    -- [{structure, sanskrit, description, clinicalSignificance}]

  -- Metadata
  relevance_tags text[],
  clinical_applications text[],

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', chapter_name), 'A') ||
    setweight(to_tsvector('simple', COALESCE(sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(english_title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(summary, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(content, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(key_concepts, ' '), '')), 'C')
  ) STORED,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE sushruta_chapters IS 'Sushruta Samhita chapters — classical surgical and anatomical text';
COMMENT ON COLUMN sushruta_chapters.surgical_procedures IS 'JSONB array of surgical techniques with instruments and procedures';
COMMENT ON COLUMN sushruta_chapters.anatomy_descriptions IS 'JSONB array of anatomical structures with clinical significance';

CREATE INDEX idx_sushruta_chapters_number ON sushruta_chapters(sthana, chapter_number);
CREATE INDEX idx_sushruta_chapters_sthana ON sushruta_chapters(sthana);
CREATE INDEX idx_sushruta_chapters_search ON sushruta_chapters USING gin(search_vector);
CREATE INDEX idx_sushruta_chapters_relevance ON sushruta_chapters USING gin(relevance_tags);

-- ============================================
-- CLINICAL EVIDENCE
-- PubMed research papers and Ayurveda clinical trials
-- ============================================
CREATE TABLE IF NOT EXISTS clinical_evidence (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  pmid text UNIQUE NOT NULL,
  title text NOT NULL,
  authors text[],
  journal text,
  publication_date date,
  abstract text,
  doi text,

  -- Classification
  mesh_terms text[],
  study_type text,               -- 'clinical_trial', 'review', 'case_report', 'meta_analysis', 'systematic_review'
  evidence_level text CHECK (evidence_level IN (
    'systematic_review', 'rct', 'cohort', 'case_control', 'case_series', 'expert_opinion'
  )),

  -- Ayurveda-specific
  ayurveda_relevance text,
  herbs_mentioned text[],
  conditions_mentioned text[],

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', title), 'A') ||
    setweight(to_tsvector('simple', COALESCE(abstract, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(array_to_string(mesh_terms, ' '), '')), 'C')
  ) STORED,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE clinical_evidence IS 'PubMed clinical trials and research papers on Ayurveda';
COMMENT ON COLUMN clinical_evidence.pmid IS 'PubMed unique identifier';
COMMENT ON COLUMN clinical_evidence.evidence_level IS 'Evidence hierarchy: systematic_review > rct > cohort > case_control > case_series > expert_opinion';

CREATE INDEX idx_clinical_evidence_pmid ON clinical_evidence(pmid);
CREATE INDEX idx_clinical_evidence_mesh ON clinical_evidence USING gin(mesh_terms);
CREATE INDEX idx_clinical_evidence_herbs ON clinical_evidence USING gin(herbs_mentioned);
CREATE INDEX idx_clinical_evidence_conditions ON clinical_evidence USING gin(conditions_mentioned);
CREATE INDEX idx_clinical_evidence_search ON clinical_evidence USING gin(search_vector);
CREATE INDEX idx_clinical_evidence_study_type ON clinical_evidence(study_type);
CREATE INDEX idx_clinical_evidence_evidence ON clinical_evidence(evidence_level);

-- ============================================
-- EXTERNAL Q&A
-- HuggingFace Ayurveda Q&A datasets
-- ============================================
CREATE TABLE IF NOT EXISTS external_qa (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_dataset text NOT NULL,          -- 'sushruta_qa', 'ayurveda_qa'
  question text NOT NULL,
  answer text NOT NULL,
  context text,
  category text,
  classical_reference text,

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', question), 'A') ||
    setweight(to_tsvector('simple', COALESCE(answer, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(context, '')), 'C')
  ) STORED,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE external_qa IS 'Ayurveda Q&A pairs from external datasets (HuggingFace)';

CREATE INDEX idx_external_qa_source ON external_qa(source_dataset);
CREATE INDEX idx_external_qa_category ON external_qa(category);
CREATE INDEX idx_external_qa_search ON external_qa USING gin(search_vector);

-- ============================================
-- MODERN MEDICINES
-- Indian pharmaceutical data (1mg.com sourced)
-- ============================================
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

  -- Ayurveda cross-reference
  ayurvedic_alternatives text[],

  -- Search
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', medicine_name), 'A') ||
    setweight(to_tsvector('simple', COALESCE(composition, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(uses, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(side_effects, '')), 'C')
  ) STORED,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE modern_medicines IS 'Modern pharmaceutical medicines with Ayurvedic alternative cross-references';

CREATE INDEX idx_modern_medicines_name ON modern_medicines USING gin(search_vector);
CREATE INDEX idx_modern_medicines_class ON modern_medicines(therapeutic_class);
CREATE INDEX idx_modern_medicines_composition ON modern_medicines USING gin(to_tsvector('simple', composition));

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE sushruta_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE modern_medicines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read Sushruta chapters"
  ON sushruta_chapters FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read clinical evidence"
  ON clinical_evidence FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read external Q&A"
  ON external_qa FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read modern medicines"
  ON modern_medicines FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_sushruta_chapters_updated_at
  BEFORE UPDATE ON sushruta_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clinical_evidence_updated_at
  BEFORE UPDATE ON clinical_evidence
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_external_qa_updated_at
  BEFORE UPDATE ON external_qa
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modern_medicines_updated_at
  BEFORE UPDATE ON modern_medicines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EXTEND search_knowledge_base RPC
-- Add UNION ALL blocks for the 4 new tables
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

  -- WHO Terminology
  SELECT 'who_terminology' AS source_table, id AS source_id, term AS title,
    COALESCE(definition, '') AS content,
    ts_rank(search_vector, plainto_tsquery('simple', search_query)) AS rank
  FROM who_terminology
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'who_terminology' = ANY(source_tables)

  UNION ALL

  -- Diseases
  SELECT 'diseases', id, name, COALESCE(samprapti, modern_correlation, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM diseases
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'diseases' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Herbs
  SELECT 'herbs', id, name, COALESCE(prabhava, array_to_string(indications, ', '), ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM herbs
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'herbs' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Treatments
  SELECT 'treatments', id, name, COALESCE(description, array_to_string(indications, ', '), ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM treatments
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'treatments' = ANY(source_tables) AND is_active = true

  UNION ALL

  -- Charak Chapters
  SELECT 'charak_chapters', id, chapter_name, COALESCE(summary, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM charak_chapters
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'charak_chapters' = ANY(source_tables)

  UNION ALL

  -- Sushruta Chapters
  SELECT 'sushruta_chapters', id, chapter_name, COALESCE(summary, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM sushruta_chapters
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'sushruta_chapters' = ANY(source_tables)

  UNION ALL

  -- Clinical Evidence
  SELECT 'clinical_evidence', id, title, COALESCE(abstract, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM clinical_evidence
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'clinical_evidence' = ANY(source_tables)

  UNION ALL

  -- External Q&A
  SELECT 'external_qa', id, question, COALESCE(answer, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM external_qa
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'external_qa' = ANY(source_tables)

  UNION ALL

  -- Modern Medicines
  SELECT 'modern_medicines', id, medicine_name, COALESCE(uses, ''),
    ts_rank(search_vector, plainto_tsquery('simple', search_query))
  FROM modern_medicines
  WHERE search_vector @@ plainto_tsquery('simple', search_query)
    AND 'modern_medicines' = ANY(source_tables)

  ORDER BY rank DESC
  LIMIT limit_results;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION search_knowledge_base IS 'Full-text search across all knowledge base tables including external sources';
