-- Migration 011: Case Studies embedding support
-- Created: 2026-05-25
-- Description: Extend knowledge_embeddings CHECK constraint to allow 'case_studies' source table.
--              This enables WhatsApp-parsed clinical case studies to be embedded and searchable
--              via the semantic_search() and search_knowledge_base() RPCs.

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
    'case_studies'
  ));
