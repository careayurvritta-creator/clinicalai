-- Migration 012: Input-based learning support
-- Created: 2026-05-26
-- Description: Add 'clinical_cases' to knowledge_embeddings CHECK constraint
--              so that confirmed clinical cases (diagnosis, treatment, outcomes)
--              can be embedded back into the RAG knowledge base for continuous learning.

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
    'sushruta_chapters', 'clinical_evidence', 'external_qa', 'modern_medicines',
    'case_studies',
    'clinical_cases'
  ));
