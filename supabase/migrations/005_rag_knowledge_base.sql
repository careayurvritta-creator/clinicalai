-- Migration 005: RAG and Knowledge Base
-- Created: 2026-05-18
-- Description: Vector search, WHO terminology, diseases, herbs, treatments, Charak Samhita chapters

-- Enable vector extension for embeddings
create extension if not exists vector;

-- ============================================
-- KNOWLEDGE BASE: WHO TERMINOLOGY
-- International Standard Terminologies on Ayurveda (3545 terms)
-- ============================================
create table who_terminology (
  id uuid primary key default uuid_generate_v4(),
  ita_code text unique not null,
  term text not null,
  sanskrit_term text,
  category text not null check (category in (
    'background-concepts',
    'core-concepts',
    'anatomical-structures',
    'physiological-processes',
    'morbidity-diagnostic',
    'materials',
    'therapeutic-interventions',
    'research-education',
    'clinical-specialties'
  )),
  definition text,
  synonyms text[],
  related_terms text[],
  parent_term text,
  notes text,
  
  -- Search optimization
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', term), 'A') ||
    setweight(to_tsvector('simple', coalesce(sanskrit_term, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(definition, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(synonyms, ' '), '')), 'C')
  ) stored,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table who_terminology is 'WHO International Standard Terminologies on Ayurveda (3545 terms)';
comment on column who_terminology.ita_code is 'ITA code (e.g., ITA-2.1.1 for Vata dosha)';
comment on column who_terminology.search_vector is 'Auto-generated tsvector for full-text search';

create index idx_who_terminology_code on who_terminology(ita_code);
create index idx_who_terminology_category on who_terminology(category);
create index idx_who_terminology_term on who_terminology using gin(search_vector);
create index idx_who_terminology_parent on who_terminology(parent_term);

-- ============================================
-- KNOWLEDGE BASE: DISEASES
-- Ayurvedic disease database with modern correlations
-- ============================================
create table diseases (
  id uuid primary key default uuid_generate_v4(),
  disease_code text unique not null,
  name text not null,
  sanskrit_name text,
  category text,
  modern_correlation text,
  
  -- Ayurvedic understanding
  samprapti text,
  dosha_involvement text[],
  dhatu_involvement text[],
  srotas_involvement text[],
  agni_status text,
  ama_involvement boolean default false,
  
  -- Clinical features
  clinical_features text[],
  diagnostic_criteria text[],
  stages text[],
  complications text[],
  
  -- Treatment
  treatment_principles text[],
  recommended_herbs text[],
  recommended_panchakarma text[],
  pathya text[],
  apathya text[],
  
  -- Prognosis
  prognosis text,
  prognosis_category text check (prognosis_category in ('sukhasadhya', 'krichrasadhya', 'yapya', 'asadhya')),
  
  -- Classical references
  charaka_reference text,
  sushruta_reference text,
  ashtanga_reference text,
  classical_chapters text[],
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', name), 'A') ||
    setweight(to_tsvector('simple', coalesce(sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(modern_correlation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(samprapti, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(clinical_features, ' '), '')), 'C')
  ) stored,
  
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table diseases is 'Ayurvedic disease database with modern correlations';
comment on column diseases.prognosis_category is 'Sukhasadhya=easy, Krichrasadhya=difficult, Yapya=palliable, Asadhya=incurable';

create index idx_diseases_code on diseases(disease_code);
create index idx_diseases_category on diseases(category);
create index idx_diseases_dosha on diseases using gin(dosha_involvement);
create index idx_diseases_search on diseases using gin(search_vector);
create index idx_diseases_active on diseases(is_active) where is_active = true;

-- ============================================
-- KNOWLEDGE BASE: HERBS
-- Herbal pharmacopeia with properties and interactions
-- ============================================
create table herbs (
  id uuid primary key default uuid_generate_v4(),
  herb_code text unique not null,
  name text not null,
  botanical_name text,
  family text,
  sanskrit_name text,
  hindi_name text,
  common_names text[],
  
  -- Properties (Dravyaguna)
  rasa text[],
  guna text[],
  virya text check (virya in ('Sheeta', 'Ushna', 'Anushnasheeta')),
  vipaka text check (vipaka in ('Madhura', 'Amla', 'Katu')),
  prabhava text,
  
  -- Dosha karma
  dosha_karma jsonb,
  
  -- Clinical use
  indications text[],
  primary_uses text[],
  contraindications text[],
  side_effects text[],
  interactions text[],
  
  -- Usage
  part_used text[],
  preparation_methods text[],
  dosage text,
  anupana text[],
  
  -- Classical formulations
  classical_formulations jsonb,
  
  -- Pharmacology
  active_compounds text[],
  pharmacological_actions text[],
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', name), 'A') ||
    setweight(to_tsvector('simple', coalesce(botanical_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(indications, ' '), '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(primary_uses, ' '), '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(prabhava, '')), 'C')
  ) stored,
  
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table herbs is 'Herbal pharmacopeia with properties, indications, and interactions';
comment on column herbs.dosha_karma is 'JSON: {vata: "pacifies", pitta: "increases", kapha: "increases"}';
comment on column herbs.classical_formulations is 'Array of classical formulations containing this herb';

create index idx_herbs_code on herbs(herb_code);
create index idx_herbs_name on herbs using gin(search_vector);
create index idx_herbs_family on herbs(family);
create index idx_herbs_virya on herbs(virya);
create index idx_herbs_indications on herbs using gin(to_tsvector('simple', array_to_string(indications, ' ')));
create index idx_herbs_active on herbs(is_active) where is_active = true;

-- ============================================
-- KNOWLEDGE BASE: TREATMENTS
-- Panchakarma, Purvakarma, and other therapies
-- ============================================
create table treatments (
  id uuid primary key default uuid_generate_v4(),
  treatment_code text unique not null,
  name text not null,
  sanskrit_name text,
  category text check (category in (
    'panchakarma',
    'purvakarma',
    'paschatkarma',
    'bahya-chikitsa',
    'rasayana',
    'vajikarana',
    'shodhana',
    'shamana'
  )),
  
  -- Details
  description text,
  indications text[],
  contraindications text[],
  procedure text[],
  preparation text[],
  post_treatment text[],
  
  -- Duration and scheduling
  typical_duration text,
  frequency text,
  best_season text,
  
  -- Materials required
  materials_required text[],
  herbs_used text[],
  
  -- Classical references
  charaka_reference text,
  classical_chapters text[],
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', name), 'A') ||
    setweight(to_tsvector('simple', coalesce(sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(indications, ' '), '')), 'C')
  ) stored,
  
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table treatments is 'Panchakarma, Purvakarma, and other Ayurvedic therapies';

create index idx_treatments_code on treatments(treatment_code);
create index idx_treatments_category on treatments(category);
create index idx_treatments_search on treatments using gin(search_vector);
create index idx_treatments_active on treatments(is_active) where is_active = true;

-- ============================================
-- KNOWLEDGE BASE: CHARAK SAMHITA CHAPTERS
-- All 120 chapters with structured content
-- ============================================
create table charak_chapters (
  id uuid primary key default uuid_generate_v4(),
  chapter_number integer not null,
  sthana text not null check (sthana in (
    'sutra', 'nidana', 'vimana', 'sharira',
    'indriya', 'chikitsa', 'kalpa', 'siddhi'
  )),
  chapter_name text not null,
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
  
  -- Metadata
  relevance_tags text[],
  clinical_applications text[],
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', chapter_name), 'A') ||
    setweight(to_tsvector('simple', coalesce(sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(english_title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(content, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(key_concepts, ' '), '')), 'C')
  ) stored,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table charak_chapters is 'Charak Samhita - all 120 chapters across 8 Sthanas';
comment on column charak_chapters.sthana is 'One of 8 sections: Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi';

create index idx_charak_chapters_number on charak_chapters(sthana, chapter_number);
create index idx_charak_chapters_sthana on charak_chapters(sthana);
create index idx_charak_chapters_search on charak_chapters using gin(search_vector);
create index idx_charak_chapters_relevance on charak_chapters using gin(relevance_tags);

-- ============================================
-- KNOWLEDGE BASE: ALLOPATHY INTEGRATION
-- Drug-herb interactions and combined protocols
-- ============================================
create table allopathy_integration (
  id uuid primary key default uuid_generate_v4(),
  condition_name text not null,
  allopathic_drug text not null,
  ayurvedic_herb text not null,
  
  -- Interaction details
  interaction_type text check (interaction_type in ('contraindicated', 'caution', 'safe', 'synergistic')),
  severity text check (severity in ('high', 'medium', 'low')),
  description text,
  mechanism text,
  recommendation text,
  monitoring_parameters text[],
  
  -- Evidence
  evidence_level text check (evidence_level in ('strong', 'moderate', 'weak', 'anecdotal')),
  source_references text[],
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', condition_name), 'A') ||
    setweight(to_tsvector('simple', allopathic_drug), 'A') ||
    setweight(to_tsvector('simple', ayurvedic_herb), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(mechanism, '')), 'B')
  ) stored,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table allopathy_integration is 'Drug-herb interactions and combined treatment protocols';

create index idx_allopathy_condition on allopathy_integration(condition_name);
create index idx_allopathy_drug on allopathy_integration(allopathic_drug);
create index idx_allopathy_herb on allopathy_integration(ayurvedic_herb);
create index idx_allopathy_interaction_type on allopathy_integration(interaction_type);
create index idx_allopathy_severity on allopathy_integration(severity);
create index idx_allopathy_search on allopathy_integration using gin(search_vector);

-- ============================================
-- KNOWLEDGE BASE: COMBINED TREATMENT PROTOCOLS
-- Integrated Ayurveda-Allopathy protocols
-- ============================================
create table combined_protocols (
  id uuid primary key default uuid_generate_v4(),
  condition_name text not null,
  protocol_name text not null,
  description text,
  
  -- Protocol components
  ayurvedic_treatment jsonb,
  allopathic_treatment jsonb,
  integration_notes text,
  timing_recommendations text,
  
  -- Safety
  warnings text[],
  monitoring_parameters text[],
  contraindications text[],
  
  -- Evidence
  evidence_level text,
  source_references text[],
  created_by uuid references profiles(id) on delete set null,
  
  -- Search
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple', condition_name), 'A') ||
    setweight(to_tsvector('simple', protocol_name), 'A') ||
    setweight(to_tsvector('simple', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(integration_notes, '')), 'B')
  ) stored,
  
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table combined_protocols is 'Integrated Ayurveda-Allopathy treatment protocols';

create index idx_combined_protocols_condition on combined_protocols(condition_name);
create index idx_combined_protocols_search on combined_protocols using gin(search_vector);
create index idx_combined_protocols_active on combined_protocols(is_active) where is_active = true;

-- ============================================
-- RAG: VECTOR EMBEDDINGS
-- Semantic search across all knowledge base content
-- ============================================
create table knowledge_embeddings (
  id uuid primary key default uuid_generate_v4(),
  source_table text not null check (source_table in (
    'who_terminology', 'diseases', 'herbs', 'treatments',
    'charak_chapters', 'allopathy_integration', 'combined_protocols',
    'diagnostics', 'fundamentals'
  )),
  source_id uuid not null,
  source_title text not null,
  content_type text check (content_type in ('definition', 'description', 'indication', 'procedure', 'concept', 'formula')),
  content text not null,
  metadata jsonb default '{}',
  
  -- Vector embedding (1024 dimensions for NVIDIA nv-embedqa-e5-v5)
  embedding vector(1024),
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table knowledge_embeddings is 'Vector embeddings for semantic RAG search across knowledge base';
comment on column knowledge_embeddings.source_table is 'Which knowledge table this embedding comes from';
comment on column knowledge_embeddings.source_id is 'UUID of the source record';
comment on column knowledge_embeddings.embedding is '1024-dimension vector embedding for semantic search (NVIDIA nv-embedqa-e5-v5)';

create index idx_knowledge_embeddings_source on knowledge_embeddings(source_table, source_id);
create index idx_knowledge_embeddings_content_type on knowledge_embeddings(content_type);
create index idx_knowledge_embeddings_embedding on knowledge_embeddings using hnsw (embedding vector_cosine_ops);

-- ============================================
-- RAG: SEARCH HISTORY
-- Track RAG queries for analytics and improvement
-- ============================================
create table rag_search_history (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references profiles(id) on delete set null,
  case_id uuid references cases(id) on delete set null,
  query text not null,
  query_type text check (query_type in ('disease', 'herb', 'treatment', 'symptom', 'interaction', 'general')),
  results_count integer default 0,
  results_used integer default 0,
  latency_ms integer,
  embedding_used boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

comment on table rag_search_history is 'Track RAG queries for analytics and continuous improvement';

create index idx_rag_search_doctor on rag_search_history(doctor_id);
create index idx_rag_search_case on rag_search_history(case_id);
create index idx_rag_search_type on rag_search_history(query_type);
create index idx_rag_search_created on rag_search_history(created_at desc);

-- ============================================
-- TRIGGERS
-- ============================================
create trigger update_who_terminology_updated_at
  before update on who_terminology
  for each row
  execute function update_updated_at_column();

create trigger update_diseases_updated_at
  before update on diseases
  for each row
  execute function update_updated_at_column();

create trigger update_herbs_updated_at
  before update on herbs
  for each row
  execute function update_updated_at_column();

create trigger update_treatments_updated_at
  before update on treatments
  for each row
  execute function update_updated_at_column();

create trigger update_charak_chapters_updated_at
  before update on charak_chapters
  for each row
  execute function update_updated_at_column();

create trigger update_allopathy_integration_updated_at
  before update on allopathy_integration
  for each row
  execute function update_updated_at_column();

create trigger update_combined_protocols_updated_at
  before update on combined_protocols
  for each row
  execute function update_updated_at_column();

create trigger update_knowledge_embeddings_updated_at
  before update on knowledge_embeddings
  for each row
  execute function update_updated_at_column();
