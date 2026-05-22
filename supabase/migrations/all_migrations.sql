-- Migration 001: Core tables (profiles, patients, cases)
-- Created: 2026-05-18
-- Updated: 2026-05-18
-- Description: Foundation tables for the Ayurvedic Clinical AI system

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================
-- CLEANUP: Drop all existing functions to avoid return type conflicts
-- Must happen before any CREATE statements
-- ============================================
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT p.proname, pg_get_function_identity_arguments(p.oid) as args
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.prokind = 'f'
  ) LOOP
    BEGIN
      EXECUTE 'DROP FUNCTION IF EXISTS ' || r.proname || '(' || r.args || ') CASCADE';
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END LOOP;
END $$;

-- ============================================
-- PROFILES TABLE
-- Doctor/user accounts with Ayurvedic credentials
-- ============================================
create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  specialization text,
  qualification text,
  registration_number text,
  clinic_name text,
  clinic_address text,
  phone text,
  avatar_url text,
  prakriti_preference text,
  default_model text default 'meta/llama-3.1-405b-instruct',
  settings jsonb default '{}',
  is_active boolean default true,
  last_login_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table profiles is 'Doctor/user profiles with Ayurvedic credentials';
comment on column profiles.prakriti_preference is 'Default Prakriti assessment preference';
comment on column profiles.default_model is 'Default AI model for this doctor';
comment on column profiles.settings is 'User preferences and app settings';

-- ============================================
-- PATIENTS TABLE
-- Master patient records
-- ============================================
create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid references profiles(id) on delete cascade not null,
  patient_code text unique,
  name text not null,
  age integer check (age >= 0 and age <= 150),
  date_of_birth date,
  gender text check (gender in ('Male', 'Female', 'Other')),
  occupation text,
  area text,
  phone text,
  email text,
  address text,
  emergency_contact text,
  emergency_phone text,
  blood_group text check (blood_group in ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  height_cm numeric check (height_cm > 0 and height_cm <= 300),
  weight_kg numeric check (weight_kg > 0 and weight_kg <= 500),
  bmi numeric,
  profile_image_url text,
  notes text,
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table patients is 'Master patient records';
comment on column patients.patient_code is 'Auto-generated patient identifier';
comment on column patients.bmi is 'Auto-calculated from height and weight';

-- ============================================
-- CASES TABLE
-- Clinical case records with complete CaseData
-- ============================================
create table if not exists cases (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id) on delete cascade not null,
  doctor_id uuid references profiles(id) on delete set null,
  case_number text unique not null,
  visit_date date default current_date,
  visit_type text default 'initial' check (visit_type in ('initial', 'follow-up', 'emergency', 'referral')),
  visit_number integer default 1,
  
  -- Chief Complaints (stored as JSONB for flexibility)
  chief_complaints jsonb default '[]',
  
  -- Duration and severity
  duration text,
  severity_score integer check (severity_score between 1 and 10),
  
  -- Ashtavidha Pariksha (8-fold examination)
  nadi text,
  mootra text,
  mala text,
  jivha text,
  drik text,
  sparsh text,
  shabda text,
  aakriti text,
  
  -- Prakriti Assessment
  prakriti text,
  prakriti_detail text,
  vikriti text,
  saara text,
  samhanana text,
  satva text,
  ahara_shakti text,
  vyayama_shakti text,
  desha text,
  
  -- Medical History
  comorbidities jsonb default '[]',
  medical_history text,
  allergies text,
  family_history text,
  ongoing_medications text,
  
  -- Investigations
  investigation_text text,
  investigation_findings jsonb default '[]',
  
  -- Diagnosis
  provisional_diagnosis text,
  provisional_reasoning text,
  final_diagnosis text,
  diagnosis_confidence text check (diagnosis_confidence in ('low', 'medium', 'high')),
  
  -- Treatment
  treatment_plan text,
  treatment_protocol jsonb,
  prescribed_herbs jsonb default '[]',
  prescribed_panchakarma jsonb default '[]',
  diet_recommendations text,
  lifestyle_recommendations text,
  
  -- Status
  status text default 'active' check (status in ('active', 'completed', 'referred', 'archived')),
  
  -- Follow-up
  follow_up_date date,
  follow_up_notes text,
  
  -- AI Metadata
  ai_model_used text,
  ai_session_id text,
  ai_tokens_used integer default 0,
  
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  completed_at timestamptz
);

comment on table cases is 'Clinical case records with complete patient data';
comment on column cases.chief_complaints is 'Array of chief complaints with duration, severity, location, etc.';
comment on column cases.comorbidities is 'Array of comorbidity strings';
comment on column cases.investigation_findings is 'Array of investigation findings with parameters, values, status';
comment on column cases.prescribed_herbs is 'Array of prescribed herbs with dosage';
comment on column cases.prescribed_panchakarma is 'Array of prescribed Panchakarma procedures';

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_profiles_auth_user on profiles(auth_user_id);
create index if not exists idx_profiles_active on profiles(is_active) where is_active = true;

create index if not exists idx_patients_doctor on patients(doctor_id);
create index if not exists idx_patients_name on patients(name);
create index if not exists idx_patients_phone on patients(phone);
create index if not exists idx_patients_code on patients(patient_code);
create index if not exists idx_patients_archived on patients(is_archived) where is_archived = false;

create index if not exists idx_cases_patient on cases(patient_id);
create index if not exists idx_cases_doctor on cases(doctor_id);
create index if not exists idx_cases_status on cases(status);
create index if not exists idx_cases_visit_date on cases(visit_date);
create index if not exists idx_cases_case_number on cases(case_number);
create index if not exists idx_cases_provisional_diagnosis on cases(provisional_diagnosis);
create index if not exists idx_cases_created_at on cases(created_at desc);
create index if not exists idx_cases_visit_type on cases(visit_type);
create index if not exists idx_cases_follow_up on cases(follow_up_date) where follow_up_date is not null;

-- ============================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================
-- AUTO-CALCULATE BMI
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS calculate_bmi() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function calculate_bmi()
returns trigger as $$
begin
  if new.height_cm > 0 and new.weight_kg > 0 then
    new.bmi := round(new.weight_kg / ((new.height_cm / 100.0) ^ 2), 2);
  else
    new.bmi := null;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_profiles_updated_at on profiles;
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_patients_updated_at on patients;
create trigger update_patients_updated_at
  before update on patients
  for each row
  execute function update_updated_at_column();

drop trigger if exists calculate_patient_bmi on patients;
create trigger calculate_patient_bmi
  before insert or update of height_cm, weight_kg on patients
  for each row
  execute function calculate_bmi();

-- ============================================
-- SEARCH VECTOR TRIGGER FUNCTIONS
-- ============================================

-- WHO Terminology search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_who_terminology_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_who_terminology_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.term, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.sanskrit_term, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.definition, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.synonyms, ' '), '')), 'C');
  return new;
end;
$$ language plpgsql;

-- Diseases search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_diseases_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_diseases_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.modern_correlation, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.samprapti, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.clinical_features, ' '), '')), 'C');
  return new;
end;
$$ language plpgsql;

-- Herbs search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_herbs_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_herbs_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.botanical_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.indications, ' '), '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.primary_uses, ' '), '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.prabhava, '')), 'C');
  return new;
end;
$$ language plpgsql;

-- Treatments search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_treatments_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_treatments_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.indications, ' '), '')), 'C');
  return new;
end;
$$ language plpgsql;

-- Charak Chapters search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_charak_chapters_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_charak_chapters_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.chapter_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.sanskrit_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.english_title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.summary, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.content, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(new.key_concepts, ' '), '')), 'C');
  return new;
end;
$$ language plpgsql;

-- Allopathy Integration search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_allopathy_integration_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_allopathy_integration_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.condition_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.allopathic_drug, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.ayurvedic_herb, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.mechanism, '')), 'B');
  return new;
end;
$$ language plpgsql;

-- Combined Protocols search vector
DO $$ BEGIN
  DROP FUNCTION IF EXISTS update_combined_protocols_search_vector() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function update_combined_protocols_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('simple', coalesce(new.condition_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.protocol_name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(new.integration_notes, '')), 'B');
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_cases_updated_at on cases;
create trigger update_cases_updated_at
  before update on cases
  for each row
  execute function update_updated_at_column();

-- ============================================
-- PATIENT CODE GENERATOR
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS generate_patient_code() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function generate_patient_code()
returns trigger as $$
declare
  prefix text;
  sequence_num integer;
begin
  prefix := 'PT';
  select coalesce(max(
    cast(substring(patient_code from 3) as integer)
  ), 0) + 1 into sequence_num
  from patients
  where patient_code like prefix || '%';
  
  new.patient_code := prefix || lpad(sequence_num::text, 6, '0');
  return new;
end;
$$ language plpgsql;

drop trigger if exists generate_patient_code_trigger on patients;
create trigger generate_patient_code_trigger
  before insert on patients
  for each row
  when (new.patient_code is null or new.patient_code = '')
  execute function generate_patient_code();

-- ============================================
-- CASE NUMBER GENERATOR
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS generate_case_number() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function generate_case_number()
returns trigger as $$
declare
  year_prefix text;
  sequence_num integer;
begin
  year_prefix := to_char(new.visit_date, 'YY');
  select coalesce(max(
    cast(substring(case_number from 3) as integer)
  ), 0) + 1 into sequence_num
  from cases
  where case_number like year_prefix || '%';
  
  new.case_number := year_prefix || lpad(sequence_num::text, 5, '0');
  return new;
end;
$$ language plpgsql;

drop trigger if exists generate_case_number_trigger on cases;
create trigger generate_case_number_trigger
  before insert on cases
  for each row
  when (new.case_number is null or new.case_number = '')
  execute function generate_case_number();

-- ============================================
-- AUTO-INCREMENT VISIT NUMBER
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS set_visit_number() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function set_visit_number()
returns trigger as $$
begin
  if new.visit_number is null or new.visit_number = 1 then
    select coalesce(max(visit_number), 0) + 1 into new.visit_number
    from cases
    where patient_id = new.patient_id;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_visit_number_trigger on cases;
create trigger set_visit_number_trigger
  before insert on cases
  for each row
  execute function set_visit_number();
-- Migration 002: Clinical data tables (chief_complaints, investigation_findings, treatment_protocols)
-- Created: 2026-05-18
-- Description: Normalized clinical data tables for detailed tracking

-- ============================================
-- CHIEF COMPLAINTS TABLE
-- Normalized complaint tracking per case
-- ============================================
create table if not exists chief_complaints (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  complaint text not null,
  duration text,
  severity integer check (severity between 1 and 10),
  location text,
  onset text,
  character text,
  radiation text,
  aggravating_factors text[],
  relieving_factors text[],
  associated_symptoms text[],
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table chief_complaints is 'Normalized chief complaints per clinical case';
comment on column chief_complaints.aggravating_factors is 'Array of factors that worsen the complaint';
comment on column chief_complaints.relieving_factors is 'Array of factors that improve the complaint';
comment on column chief_complaints.associated_symptoms is 'Array of related symptoms';

create index if not exists idx_chief_complaints_case on chief_complaints(case_id);
create index if not exists idx_chief_complaints_severity on chief_complaints(severity);
create index if not exists idx_chief_complaints_complaint on chief_complaints(complaint);

-- ============================================
-- INVESTIGATION FINDINGS TABLE
-- Lab report analysis results per case
-- ============================================
create table if not exists investigation_findings (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  report_type text check (report_type in ('blood', 'urine', 'imaging', 'ecg', 'general')),
  report_date date default current_date,
  lab_name text,
  parameter text not null,
  value text not null,
  unit text,
  normal_range text,
  status text check (status in ('normal', 'abnormal', 'critical', 'pending')),
  clinical_correlation text,
  ayurvedic_correlation text,
  dosha_implication text,
  dhatu_involvement text,
  srotas_involvement text,
  recommended_action text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table investigation_findings is 'Lab report analysis results with Ayurvedic correlation';
comment on column investigation_findings.ayurvedic_correlation is 'Ayurvedic interpretation of lab values';
comment on column investigation_findings.dosha_implication is 'Which doshas are implicated by this finding';
comment on column investigation_findings.dhatu_involvement is 'Which dhatus are affected';
comment on column investigation_findings.srotas_involvement is 'Which srotas (channels) are involved';

create index if not exists idx_investigation_findings_case on investigation_findings(case_id);
create index if not exists idx_investigation_findings_status on investigation_findings(status);
create index if not exists idx_investigation_findings_parameter on investigation_findings(parameter);
create index if not exists idx_investigation_findings_report_type on investigation_findings(report_type);
create index if not exists idx_investigation_findings_critical on investigation_findings(status) where status = 'critical';

-- ============================================
-- TREATMENT PROTOCOLS TABLE
-- Generated treatment plans per case
-- ============================================
create table if not exists treatment_protocols (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  protocol_version integer default 1,
  protocol_name text not null,
  protocol_text text,
  
  -- Phase 1: Purvakarma (Pre-treatment)
  purvakarma jsonb default '[]',
  purvakarma_duration integer,
  
  -- Phase 2: Panchakarma (Main therapy)
  panchakarma jsonb default '[]',
  panchakarma_duration integer,
  
  -- Phase 3: Herbs & Formulations
  herbs jsonb default '[]',
  herb_duration integer,
  
  -- Phase 4: Rasayana (Rejuvenation)
  rasayana jsonb default '[]',
  
  -- Diet
  diet_plan jsonb default '{}',
  pathya text[],
  apathya text[],
  
  -- Lifestyle
  dinacharya text[],
  ritucharya text[],
  lifestyle_recommendations text[],
  
  -- Duration and scheduling
  total_duration_days integer,
  start_date date,
  end_date date,
  
  -- Status
  status text default 'draft' check (status in ('draft', 'approved', 'in-progress', 'completed', 'modified')),
  
  -- Doctor notes
  doctor_notes text,
  modifications text,
  
  -- AI metadata
  generated_by text default 'ai',
  ai_model text,
  ai_prompt text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  approved_at timestamptz,
  completed_at timestamptz
);

comment on table treatment_protocols is 'Generated treatment plans with phases and scheduling';
comment on column treatment_protocols.purvakarma is 'Array of pre-treatment procedures (Deepana, Pachana, Snehana, Swedana)';
comment on column treatment_protocols.panchakarma is 'Array of main Panchakarma procedures (Vamana, Virechana, Basti, Nasya, Raktamokshana)';
comment on column treatment_protocols.herbs is 'Array of prescribed herbs with dosage, timing, anupana';
comment on column treatment_protocols.rasayana is 'Array of rejuvenation therapies';
comment on column treatment_protocols.diet_plan is 'JSON object with meal-wise diet recommendations';
comment on column treatment_protocols.pathya is 'Recommended foods and habits';
comment on column treatment_protocols.apathya is 'Foods and habits to avoid';

create index if not exists idx_treatment_protocols_case on treatment_protocols(case_id);
create index if not exists idx_treatment_protocols_status on treatment_protocols(status);
create index if not exists idx_treatment_protocols_version on treatment_protocols(case_id, protocol_version);

-- ============================================
-- TRIGGERS
-- ============================================
drop trigger if exists update_chief_complaints_updated_at on chief_complaints;
create trigger update_chief_complaints_updated_at
  before update on chief_complaints
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_investigation_findings_updated_at on investigation_findings;
create trigger update_investigation_findings_updated_at
  before update on investigation_findings
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_treatment_protocols_updated_at on treatment_protocols;
create trigger update_treatment_protocols_updated_at
  before update on treatment_protocols
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-INCREMENT PROTOCOL VERSION
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS set_protocol_version() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function set_protocol_version()
returns trigger as $$
begin
  if new.protocol_version is null or new.protocol_version = 1 then
    select coalesce(max(protocol_version), 0) + 1 into new.protocol_version
    from treatment_protocols
    where case_id = new.case_id;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_protocol_version_trigger on treatment_protocols;
create trigger set_protocol_version_trigger
  before insert on treatment_protocols
  for each row
  execute function set_protocol_version();
-- Migration 003: Conversations, messages, and attachments
-- Created: 2026-05-18
-- Description: Chat session tracking and file management

-- ============================================
-- CONVERSATIONS TABLE
-- Chat sessions per case or standalone
-- ============================================
create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  doctor_id uuid references profiles(id) on delete set null,
  session_id text unique not null,
  title text,
  module text default 'chat' check (module in ('chat', 'intake', 'treatment-protocol', 'patient-portal', 'diet-chart', 'lifestyle-advice')),
  ai_model text not null default 'meta/llama-3.1-405b-instruct',
  system_prompt text,
  temperature numeric default 0.7 check (temperature between 0 and 2),
  max_tokens integer default 4096,
  status text default 'active' check (status in ('active', 'completed', 'archived')),
  message_count integer default 0,
  total_tokens_used integer default 0,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  completed_at timestamptz
);

comment on table conversations is 'Chat sessions per case or standalone';
comment on column conversations.module is 'Which app module this conversation belongs to';
comment on column conversations.metadata is 'Additional session metadata';

create index if not exists idx_conversations_case on conversations(case_id);
create index if not exists idx_conversations_doctor on conversations(doctor_id);
create index if not exists idx_conversations_session on conversations(session_id);
create index if not exists idx_conversations_module on conversations(module);
create index if not exists idx_conversations_status on conversations(status);
create index if not exists idx_conversations_created_at on conversations(created_at desc);

-- ============================================
-- MESSAGES TABLE
-- Individual chat messages within conversations
-- ============================================
create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  status text default 'complete' check (status in ('complete', 'streaming', 'error', 'cancelled')),
  
  -- Message metadata
  tokens_used integer default 0,
  latency_ms integer,
  model_used text,
  
  -- Structured data for intake questions
  is_question boolean default false,
  question_data jsonb,
  suggestions jsonb,
  
  -- Attachments reference
  attachment_ids uuid[],
  
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table messages is 'Individual chat messages within conversations';
comment on column messages.question_data is 'Structured question metadata for intake flow';
comment on column messages.suggestions is 'Quick reply suggestions for the user';
comment on column messages.attachment_ids is 'Array of attachment IDs associated with this message';

create index if not exists idx_messages_conversation on messages(conversation_id);
create index if not exists idx_messages_role on messages(role);
create index if not exists idx_messages_status on messages(status);
create index if not exists idx_messages_created_at on messages(created_at);
create index if not exists idx_messages_is_question on messages(is_question) where is_question = true;

-- Full text search on message content
create index if not exists idx_messages_content_search on messages(content);

-- ============================================
-- ATTACHMENTS TABLE
-- File metadata for images, PDFs, and other uploads
-- ============================================
create table if not exists attachments (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete set null,
  conversation_id uuid references conversations(id) on delete set null,
  message_id uuid references messages(id) on delete set null,
  doctor_id uuid references profiles(id) on delete set null,
  
  -- File info
  file_name text not null,
  file_type text not null check (file_type in ('image', 'pdf', 'document', 'lab-report', 'prescription', 'other')),
  mime_type text,
  file_size integer,
  storage_path text not null,
  public_url text,
  
  -- Extracted content
  extracted_text text,
  text_extraction_status text check (text_extraction_status in ('pending', 'completed', 'failed')),
  
  -- Analysis results
  analysis_results jsonb,
  analysis_status text check (analysis_status in ('pending', 'completed', 'failed')),
  
  -- Metadata
  description text,
  tags text[],
  metadata jsonb default '{}',
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table attachments is 'File metadata for images, PDFs, and other uploads';
comment on column attachments.extracted_text is 'OCR/text extraction from PDF or image';
comment on column attachments.analysis_results is 'AI analysis results (lab values, image findings, etc.)';
comment on column attachments.storage_path is 'Path in Supabase Storage bucket';

create index if not exists idx_attachments_case on attachments(case_id);
create index if not exists idx_attachments_conversation on attachments(conversation_id);
create index if not exists idx_attachments_message on attachments(message_id);
create index if not exists idx_attachments_doctor on attachments(doctor_id);
create index if not exists idx_attachments_file_type on attachments(file_type);
create index if not exists idx_attachments_analysis_status on attachments(analysis_status);
create index if not exists idx_attachments_created_at on attachments(created_at desc);

-- Full text search on extracted text
create index if not exists idx_attachments_text_search on attachments(extracted_text);

-- ============================================
-- TRIGGERS
-- ============================================
drop trigger if exists update_conversations_updated_at on conversations;
create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_messages_updated_at on messages;
create trigger update_messages_updated_at
  before update on messages
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_attachments_updated_at on attachments;
create trigger update_attachments_updated_at
  before update on attachments
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-INCREMENT MESSAGE COUNT
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS increment_message_count() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function increment_message_count()
returns trigger as $$
begin
  update conversations 
  set message_count = message_count + 1,
      updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql;

drop trigger if exists increment_message_count_trigger on messages;
create trigger increment_message_count_trigger
  after insert on messages
  for each row
  execute function increment_message_count();
-- Migration 004: Outcomes, learnings, and intake sessions
-- Created: 2026-05-18
-- Description: Follow-up tracking, AI learning feedback, and intake workflow state

-- ============================================
-- CASE OUTCOMES TABLE
-- Follow-up outcomes and treatment effectiveness
-- ============================================
create table if not exists case_outcomes (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  follow_up_visit_number integer,
  follow_up_date date default current_date,
  
  -- Outcome assessment
  outcome_rating integer check (outcome_rating between 1 and 5),
  outcome_label text check (outcome_label in ('complete-recovery', 'significant-improvement', 'moderate-improvement', 'slight-improvement', 'no-change', 'worsened')),
  
  -- Doctor assessment
  doctor_notes text,
  clinical_observations text,
  
  -- What worked
  what_worked text[],
  what_didnt_work text[],
  
  -- Patient-reported outcomes
  patient_feedback text,
  symptom_improvement jsonb,
  quality_of_life_score integer check (quality_of_life_score between 1 and 10),
  
  -- Updated treatment
  treatment_modified boolean default false,
  modified_treatment_plan text,
  new_medications text[],
  discontinued_medications text[],
  
  -- Next steps
  next_follow_up_date date,
  next_steps text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table case_outcomes is 'Follow-up outcomes and treatment effectiveness tracking';
comment on column case_outcomes.outcome_rating is '1=worst, 5=best outcome';
comment on column case_outcomes.symptom_improvement is 'JSON object mapping symptoms to improvement status';

create index if not exists idx_case_outcomes_case on case_outcomes(case_id);
create index if not exists idx_case_outcomes_rating on case_outcomes(outcome_rating);
create index if not exists idx_case_outcomes_follow_up_date on case_outcomes(follow_up_date);
create index if not exists idx_case_outcomes_label on case_outcomes(outcome_label);

-- ============================================
-- CASE LEARNINGS TABLE
-- AI learning feedback loop for continuous improvement
-- ============================================
create table if not exists case_learnings (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  outcome_id uuid references case_outcomes(id) on delete cascade,
  
  -- Learning data
  pattern_corrected text not null,
  correction_reason text,
  original_prediction text,
  corrected_prediction text,
  
  -- Pattern metadata
  pattern_category text check (pattern_category in ('diagnosis', 'treatment', 'herb-selection', 'dosha-assessment', 'prakriti-assessment', 'prognosis')),
  frequency integer default 1,
  confidence_before numeric,
  confidence_after numeric,
  
  -- Doctor feedback
  doctor_feedback text,
  is_validated boolean default false,
  validated_by uuid references profiles(id) on delete set null,
  validated_at timestamptz,
  
  -- AI metadata
  ai_model text,
  learning_weight numeric default 1.0,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table case_learnings is 'AI learning feedback loop for continuous improvement';
comment on column case_learnings.pattern_category is 'Type of pattern being learned';
comment on column case_learnings.learning_weight is 'Weight for this learning in the AI model';

create index if not exists idx_case_learnings_case on case_learnings(case_id);
create index if not exists idx_case_learnings_outcome on case_learnings(outcome_id);
create index if not exists idx_case_learnings_category on case_learnings(pattern_category);
create index if not exists idx_case_learnings_validated on case_learnings(is_validated) where is_validated = true;
create index if not exists idx_case_learnings_frequency on case_learnings(frequency desc);

-- ============================================
-- INTAKE SESSIONS TABLE
-- Active patient intake workflow state
-- ============================================
create table if not exists intake_sessions (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  doctor_id uuid references profiles(id) on delete set null,
  patient_id uuid references patients(id) on delete set null,
  
  -- Session state
  session_id text unique not null,
  status text default 'active' check (status in ('active', 'paused', 'completed', 'abandoned')),
  
  -- Progress tracking
  current_step integer default 0,
  total_steps integer default 12,
  progress_percentage integer default 0,
  
  -- Collected data (JSONB for flexibility)
  collected_data jsonb default '{}',
  question_history jsonb default '[]',
  answer_history jsonb default '[]',
  
  -- Pending items
  pending_complaints text[],
  current_complaint_index integer default 0,
  
  -- Provisional diagnosis
  show_provisional_diagnosis boolean default false,
  provisional_diagnosis text,
  provisional_reasoning text,
  
  -- Timing
  started_at timestamptz default now(),
  paused_at timestamptz,
  completed_at timestamptz,
  abandoned_at timestamptz,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table intake_sessions is 'Active patient intake workflow state';
comment on column intake_sessions.collected_data is 'JSON object of all collected patient data during intake';
comment on column intake_sessions.question_history is 'Array of questions asked during the session';
comment on column intake_sessions.answer_history is 'Array of answers given during the session';

create index if not exists idx_intake_sessions_case on intake_sessions(case_id);
create index if not exists idx_intake_sessions_doctor on intake_sessions(doctor_id);
create index if not exists idx_intake_sessions_patient on intake_sessions(patient_id);
create index if not exists idx_intake_sessions_session on intake_sessions(session_id);
create index if not exists idx_intake_sessions_status on intake_sessions(status);
create index if not exists idx_intake_sessions_active on intake_sessions(status) where status = 'active';

-- ============================================
-- TREATMENT ADHERENCE TABLE
-- Track patient compliance with treatment plan
-- ============================================
create table if not exists treatment_adherence (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade not null,
  protocol_id uuid references treatment_protocols(id) on delete cascade,
  
  -- Adherence tracking
  adherence_date date default current_date,
  herb_adherence text check (herb_adherence in ('full', 'partial', 'none', 'unknown')),
  diet_adherence text check (diet_adherence in ('full', 'partial', 'none', 'unknown')),
  lifestyle_adherence text check (lifestyle_adherence in ('full', 'partial', 'none', 'unknown')),
  panchakarma_adherence text check (panchakarma_adherence in ('completed', 'in-progress', 'not-started', 'skipped')),
  
  -- Side effects
  side_effects text[],
  adverse_events text,
  
  -- Notes
  patient_notes text,
  doctor_notes text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table treatment_adherence is 'Track patient compliance with treatment plan';

create index if not exists idx_treatment_adherence_case on treatment_adherence(case_id);
create index if not exists idx_treatment_adherence_protocol on treatment_adherence(protocol_id);
create index if not exists idx_treatment_adherence_date on treatment_adherence(adherence_date);

-- ============================================
-- TRIGGERS
-- ============================================
drop trigger if exists update_case_outcomes_updated_at on case_outcomes;
create trigger update_case_outcomes_updated_at
  before update on case_outcomes
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_case_learnings_updated_at on case_learnings;
create trigger update_case_learnings_updated_at
  before update on case_learnings
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_intake_sessions_updated_at on intake_sessions;
create trigger update_intake_sessions_updated_at
  before update on intake_sessions
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_treatment_adherence_updated_at on treatment_adherence;
create trigger update_treatment_adherence_updated_at
  before update on treatment_adherence
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-CALCULATE PROGRESS PERCENTAGE
-- ============================================
DO $$ BEGIN
  DROP FUNCTION IF EXISTS calculate_intake_progress() CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function calculate_intake_progress()
returns trigger as $$
begin
  if new.total_steps > 0 then
    new.progress_percentage := round((new.current_step::numeric / new.total_steps::numeric) * 100);
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists calculate_intake_progress_trigger on intake_sessions;
create trigger calculate_intake_progress_trigger
  before insert or update on intake_sessions
  for each row
  execute function calculate_intake_progress();
-- Migration 005: RAG and Knowledge Base
-- Created: 2026-05-18
-- Description: Vector search, WHO terminology, diseases, herbs, treatments, Charak Samhita chapters

-- Enable vector extension for embeddings
create extension if not exists vector;

-- ============================================
-- KNOWLEDGE BASE: WHO TERMINOLOGY
-- International Standard Terminologies on Ayurveda (3545 terms)
-- ============================================
create table if not exists who_terminology (
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
  search_vector tsvector,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table who_terminology is 'WHO International Standard Terminologies on Ayurveda (3545 terms)';
comment on column who_terminology.ita_code is 'ITA code (e.g., ITA-2.1.1 for Vata dosha)';
comment on column who_terminology.search_vector is 'Auto-generated tsvector for full-text search';

create index if not exists idx_who_terminology_code on who_terminology(ita_code);
create index if not exists idx_who_terminology_category on who_terminology(category);
create index if not exists idx_who_terminology_term on who_terminology using gin(search_vector);
create index if not exists idx_who_terminology_parent on who_terminology(parent_term);

drop trigger if exists update_who_terminology_search_vector_trigger on who_terminology;
create trigger update_who_terminology_search_vector_trigger
  before insert or update on who_terminology
  for each row
  execute function update_who_terminology_search_vector();

-- ============================================
-- KNOWLEDGE BASE: DISEASES
-- Ayurvedic disease database with modern correlations
-- ============================================
create table if not exists diseases (
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
  search_vector tsvector,

  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table diseases is 'Ayurvedic disease database with modern correlations';
comment on column diseases.prognosis_category is 'Sukhasadhya=easy, Krichrasadhya=difficult, Yapya=palliable, Asadhya=incurable';

create index if not exists idx_diseases_code on diseases(disease_code);
create index if not exists idx_diseases_category on diseases(category);
create index if not exists idx_diseases_dosha on diseases using gin(dosha_involvement);
create index if not exists idx_diseases_search on diseases using gin(search_vector);
create index if not exists idx_diseases_active on diseases(is_active) where is_active = true;

drop trigger if exists update_diseases_search_vector_trigger on diseases;
create trigger update_diseases_search_vector_trigger
  before insert or update on diseases
  for each row
  execute function update_diseases_search_vector();

-- ============================================
-- KNOWLEDGE BASE: HERBS
-- Herbal pharmacopeia with properties and interactions
-- ============================================
create table if not exists herbs (
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
  virya text check (virya in ('Sheeta', 'Ushna')),
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
  search_vector tsvector,

  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table herbs is 'Herbal pharmacopeia with properties, indications, and interactions';
comment on column herbs.dosha_karma is 'JSON: {vata: "pacifies", pitta: "increases", kapha: "increases"}';
comment on column herbs.classical_formulations is 'Array of classical formulations containing this herb';

create index if not exists idx_herbs_code on herbs(herb_code);
create index if not exists idx_herbs_name on herbs using gin(search_vector);
create index if not exists idx_herbs_family on herbs(family);
create index if not exists idx_herbs_virya on herbs(virya);
create index if not exists idx_herbs_indications on herbs using gin(indications);
create index if not exists idx_herbs_active on herbs(is_active) where is_active = true;

drop trigger if exists update_herbs_search_vector_trigger on herbs;
create trigger update_herbs_search_vector_trigger
  before insert or update on herbs
  for each row
  execute function update_herbs_search_vector();

-- ============================================
-- KNOWLEDGE BASE: TREATMENTS
-- Panchakarma, Purvakarma, and other therapies
-- ============================================
create table if not exists treatments (
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
  search_vector tsvector,

  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table treatments is 'Panchakarma, Purvakarma, and other Ayurvedic therapies';

create index if not exists idx_treatments_code on treatments(treatment_code);
create index if not exists idx_treatments_category on treatments(category);
create index if not exists idx_treatments_search on treatments using gin(search_vector);
create index if not exists idx_treatments_active on treatments(is_active) where is_active = true;

drop trigger if exists update_treatments_search_vector_trigger on treatments;
create trigger update_treatments_search_vector_trigger
  before insert or update on treatments
  for each row
  execute function update_treatments_search_vector();

-- ============================================
-- KNOWLEDGE BASE: CHARAK SAMHITA CHAPTERS
-- All 120 chapters with structured content
-- ============================================
create table if not exists charak_chapters (
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
  search_vector tsvector,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table charak_chapters is 'Charak Samhita - all 120 chapters across 8 Sthanas';
comment on column charak_chapters.sthana is 'One of 8 sections: Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi';

create index if not exists idx_charak_chapters_number on charak_chapters(sthana, chapter_number);
create index if not exists idx_charak_chapters_sthana on charak_chapters(sthana);
create index if not exists idx_charak_chapters_search on charak_chapters using gin(search_vector);
create index if not exists idx_charak_chapters_relevance on charak_chapters using gin(relevance_tags);

drop trigger if exists update_charak_chapters_search_vector_trigger on charak_chapters;
create trigger update_charak_chapters_search_vector_trigger
  before insert or update on charak_chapters
  for each row
  execute function update_charak_chapters_search_vector();

-- ============================================
-- KNOWLEDGE BASE: ALLOPATHY INTEGRATION
-- Drug-herb interactions and combined protocols
-- ============================================
create table if not exists allopathy_integration (
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
  search_vector tsvector,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table allopathy_integration is 'Drug-herb interactions and combined treatment protocols';

create index if not exists idx_allopathy_condition on allopathy_integration(condition_name);
create index if not exists idx_allopathy_drug on allopathy_integration(allopathic_drug);
create index if not exists idx_allopathy_herb on allopathy_integration(ayurvedic_herb);
create index if not exists idx_allopathy_interaction_type on allopathy_integration(interaction_type);
create index if not exists idx_allopathy_severity on allopathy_integration(severity);
create index if not exists idx_allopathy_search on allopathy_integration using gin(search_vector);

drop trigger if exists update_allopathy_integration_search_vector_trigger on allopathy_integration;
create trigger update_allopathy_integration_search_vector_trigger
  before insert or update on allopathy_integration
  for each row
  execute function update_allopathy_integration_search_vector();

-- ============================================
-- KNOWLEDGE BASE: COMBINED TREATMENT PROTOCOLS
-- Integrated Ayurveda-Allopathy protocols
-- ============================================
create table if not exists combined_protocols (
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
  search_vector tsvector,

  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table combined_protocols is 'Integrated Ayurveda-Allopathy treatment protocols';

create index if not exists idx_combined_protocols_condition on combined_protocols(condition_name);
create index if not exists idx_combined_protocols_search on combined_protocols using gin(search_vector);
create index if not exists idx_combined_protocols_active on combined_protocols(is_active) where is_active = true;

drop trigger if exists update_combined_protocols_search_vector_trigger on combined_protocols;
create trigger update_combined_protocols_search_vector_trigger
  before insert or update on combined_protocols
  for each row
  execute function update_combined_protocols_search_vector();

-- ============================================
-- RAG: VECTOR EMBEDDINGS
-- Semantic search across all knowledge base content
-- ============================================
create table if not exists knowledge_embeddings (
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
  
  -- Vector embedding (1536 dimensions for OpenAI/NVIDIA embeddings)
  embedding vector(1024),
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table knowledge_embeddings is 'Vector embeddings for semantic RAG search across knowledge base';
comment on column knowledge_embeddings.source_table is 'Which knowledge table this embedding comes from';
comment on column knowledge_embeddings.source_id is 'UUID of the source record';
comment on column knowledge_embeddings.embedding is '1536-dimension vector embedding for semantic search';

create index if not exists idx_knowledge_embeddings_source on knowledge_embeddings(source_table, source_id);
create index if not exists idx_knowledge_embeddings_content_type on knowledge_embeddings(content_type);
create index if not exists idx_knowledge_embeddings_embedding on knowledge_embeddings using hnsw (embedding vector_cosine_ops);

-- ============================================
-- RAG: SEARCH HISTORY
-- Track RAG queries for analytics and improvement
-- ============================================
create table if not exists rag_search_history (
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

create index if not exists idx_rag_search_doctor on rag_search_history(doctor_id);
create index if not exists idx_rag_search_case on rag_search_history(case_id);
create index if not exists idx_rag_search_type on rag_search_history(query_type);
create index if not exists idx_rag_search_created on rag_search_history(created_at desc);

-- ============================================
-- TRIGGERS
-- ============================================
drop trigger if exists update_who_terminology_updated_at on who_terminology;
create trigger update_who_terminology_updated_at
  before update on who_terminology
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_diseases_updated_at on diseases;
create trigger update_diseases_updated_at
  before update on diseases
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_herbs_updated_at on herbs;
create trigger update_herbs_updated_at
  before update on herbs
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_treatments_updated_at on treatments;
create trigger update_treatments_updated_at
  before update on treatments
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_charak_chapters_updated_at on charak_chapters;
create trigger update_charak_chapters_updated_at
  before update on charak_chapters
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_allopathy_integration_updated_at on allopathy_integration;
create trigger update_allopathy_integration_updated_at
  before update on allopathy_integration
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_combined_protocols_updated_at on combined_protocols;
create trigger update_combined_protocols_updated_at
  before update on combined_protocols
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_knowledge_embeddings_updated_at on knowledge_embeddings;
create trigger update_knowledge_embeddings_updated_at
  before update on knowledge_embeddings
  for each row
  execute function update_updated_at_column();
-- Migration 006: Row Level Security policies, views, and functions
-- Created: 2026-05-18
-- Description: Security policies, analytical views, and utility functions

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
alter table profiles enable row level security;
alter table patients enable row level security;
alter table cases enable row level security;
alter table chief_complaints enable row level security;
alter table investigation_findings enable row level security;
alter table treatment_protocols enable row level security;
alter table case_outcomes enable row level security;
alter table case_learnings enable row level security;
alter table intake_sessions enable row level security;
alter table treatment_adherence enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table attachments enable row level security;

-- Knowledge base tables are read-only for all authenticated users
alter table who_terminology enable row level security;
alter table diseases enable row level security;
alter table herbs enable row level security;
alter table treatments enable row level security;
alter table charak_chapters enable row level security;
alter table allopathy_integration enable row level security;
alter table combined_protocols enable row level security;
alter table knowledge_embeddings enable row level security;
alter table rag_search_history enable row level security;

-- ============================================
-- PROFILES POLICIES
-- ============================================
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = auth_user_id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = auth_user_id);

drop policy if exists "Users can insert own profile" on profiles;
create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = auth_user_id);

-- ============================================
-- PATIENTS POLICIES
-- ============================================
drop policy if exists "Doctors can view own patients" on patients;
create policy "Doctors can view own patients"
  on patients for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can insert own patients" on patients;
create policy "Doctors can insert own patients"
  on patients for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can update own patients" on patients;
create policy "Doctors can update own patients"
  on patients for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can delete own patients" on patients;
create policy "Doctors can delete own patients"
  on patients for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- CASES POLICIES
-- ============================================
drop policy if exists "Doctors can view own cases" on cases;
create policy "Doctors can view own cases"
  on cases for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can insert own cases" on cases;
create policy "Doctors can insert own cases"
  on cases for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can update own cases" on cases;
create policy "Doctors can update own cases"
  on cases for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can delete own cases" on cases;
create policy "Doctors can delete own cases"
  on cases for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- CHIEF COMPLAINTS POLICIES
-- ============================================
drop policy if exists "Doctors can view complaints from own cases" on chief_complaints;
create policy "Doctors can view complaints from own cases"
  on chief_complaints for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert complaints to own cases" on chief_complaints;
create policy "Doctors can insert complaints to own cases"
  on chief_complaints for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update complaints from own cases" on chief_complaints;
create policy "Doctors can update complaints from own cases"
  on chief_complaints for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can delete complaints from own cases" on chief_complaints;
create policy "Doctors can delete complaints from own cases"
  on chief_complaints for delete
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- INVESTIGATION FINDINGS POLICIES
-- ============================================
drop policy if exists "Doctors can view findings from own cases" on investigation_findings;
create policy "Doctors can view findings from own cases"
  on investigation_findings for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert findings to own cases" on investigation_findings;
create policy "Doctors can insert findings to own cases"
  on investigation_findings for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update findings from own cases" on investigation_findings;
create policy "Doctors can update findings from own cases"
  on investigation_findings for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can delete findings from own cases" on investigation_findings;
create policy "Doctors can delete findings from own cases"
  on investigation_findings for delete
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- TREATMENT PROTOCOLS POLICIES
-- ============================================
drop policy if exists "Doctors can view protocols from own cases" on treatment_protocols;
create policy "Doctors can view protocols from own cases"
  on treatment_protocols for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert protocols to own cases" on treatment_protocols;
create policy "Doctors can insert protocols to own cases"
  on treatment_protocols for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update protocols from own cases" on treatment_protocols;
create policy "Doctors can update protocols from own cases"
  on treatment_protocols for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can delete protocols from own cases" on treatment_protocols;
create policy "Doctors can delete protocols from own cases"
  on treatment_protocols for delete
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- CONVERSATIONS POLICIES
-- ============================================
drop policy if exists "Doctors can view own conversations" on conversations;
create policy "Doctors can view own conversations"
  on conversations for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can insert own conversations" on conversations;
create policy "Doctors can insert own conversations"
  on conversations for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can update own conversations" on conversations;
create policy "Doctors can update own conversations"
  on conversations for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can delete own conversations" on conversations;
create policy "Doctors can delete own conversations"
  on conversations for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- MESSAGES POLICIES
-- ============================================
drop policy if exists "Doctors can view messages from own conversations" on messages;
create policy "Doctors can view messages from own conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert messages to own conversations" on messages;
create policy "Doctors can insert messages to own conversations"
  on messages for insert
  with check (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update messages from own conversations" on messages;
create policy "Doctors can update messages from own conversations"
  on messages for update
  using (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can delete messages from own conversations" on messages;
create policy "Doctors can delete messages from own conversations"
  on messages for delete
  using (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- ATTACHMENTS POLICIES
-- ============================================
drop policy if exists "Doctors can view own attachments" on attachments;
create policy "Doctors can view own attachments"
  on attachments for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can insert own attachments" on attachments;
create policy "Doctors can insert own attachments"
  on attachments for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can update own attachments" on attachments;
create policy "Doctors can update own attachments"
  on attachments for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can delete own attachments" on attachments;
create policy "Doctors can delete own attachments"
  on attachments for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- KNOWLEDGE BASE POLICIES (Read-only for all authenticated users)
-- ============================================
drop policy if exists "Anyone can read WHO terminology" on who_terminology;
create policy "Anyone can read WHO terminology"
  on who_terminology for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read diseases" on diseases;
create policy "Anyone can read diseases"
  on diseases for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read herbs" on herbs;
create policy "Anyone can read herbs"
  on herbs for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read treatments" on treatments;
create policy "Anyone can read treatments"
  on treatments for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read Charak chapters" on charak_chapters;
create policy "Anyone can read Charak chapters"
  on charak_chapters for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read allopathy integration" on allopathy_integration;
create policy "Anyone can read allopathy integration"
  on allopathy_integration for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read combined protocols" on combined_protocols;
create policy "Anyone can read combined protocols"
  on combined_protocols for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can read knowledge embeddings" on knowledge_embeddings;
create policy "Anyone can read knowledge embeddings"
  on knowledge_embeddings for select
  using (auth.role() = 'authenticated');

drop policy if exists "Anyone can insert RAG search history" on rag_search_history;
create policy "Anyone can insert RAG search history"
  on rag_search_history for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "Anyone can read RAG search history" on rag_search_history;
create policy "Anyone can read RAG search history"
  on rag_search_history for select
  using (auth.role() = 'authenticated');

-- ============================================
-- CASE OUTCOMES POLICIES
-- ============================================
drop policy if exists "Doctors can view outcomes from own cases" on case_outcomes;
create policy "Doctors can view outcomes from own cases"
  on case_outcomes for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_outcomes.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert outcomes to own cases" on case_outcomes;
create policy "Doctors can insert outcomes to own cases"
  on case_outcomes for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_outcomes.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update outcomes from own cases" on case_outcomes;
create policy "Doctors can update outcomes from own cases"
  on case_outcomes for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_outcomes.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- CASE LEARNINGS POLICIES
-- ============================================
drop policy if exists "Doctors can view learnings from own cases" on case_learnings;
create policy "Doctors can view learnings from own cases"
  on case_learnings for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_learnings.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert learnings to own cases" on case_learnings;
create policy "Doctors can insert learnings to own cases"
  on case_learnings for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_learnings.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update learnings from own cases" on case_learnings;
create policy "Doctors can update learnings from own cases"
  on case_learnings for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_learnings.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- INTAKE SESSIONS POLICIES
-- ============================================
drop policy if exists "Doctors can view own intake sessions" on intake_sessions;
create policy "Doctors can view own intake sessions"
  on intake_sessions for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can insert own intake sessions" on intake_sessions;
create policy "Doctors can insert own intake sessions"
  on intake_sessions for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

drop policy if exists "Doctors can update own intake sessions" on intake_sessions;
create policy "Doctors can update own intake sessions"
  on intake_sessions for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- TREATMENT ADHERENCE POLICIES
-- ============================================
drop policy if exists "Doctors can view adherence from own cases" on treatment_adherence;
create policy "Doctors can view adherence from own cases"
  on treatment_adherence for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_adherence.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can insert adherence to own cases" on treatment_adherence;
create policy "Doctors can insert adherence to own cases"
  on treatment_adherence for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_adherence.case_id and p.auth_user_id = auth.uid()
    )
  );

drop policy if exists "Doctors can update adherence from own cases" on treatment_adherence;
create policy "Doctors can update adherence from own cases"
  on treatment_adherence for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_adherence.case_id and p.auth_user_id = auth.uid()
    )
  );

-- ============================================
-- ANALYTICAL VIEWS
-- ============================================

-- Patient summary view
create or replace view v_patient_summary as
select
  p.id,
  p.patient_code,
  p.name,
  p.age,
  p.gender,
  p.phone,
  p.area,
  p.bmi,
  count(distinct c.id) as total_visits,
  max(c.visit_date) as last_visit_date,
  max(c.provisional_diagnosis) as latest_diagnosis,
  max(c.status) as latest_case_status,
  count(distinct co.id) as total_follow_ups,
  avg(co.outcome_rating) as avg_outcome_rating
from patients p
left join cases c on p.id = c.patient_id
left join case_outcomes co on c.id = co.case_id
group by p.id, p.patient_code, p.name, p.age, p.gender, p.phone, p.area, p.bmi;

comment on view v_patient_summary is 'Patient summary with visit counts and outcomes';

-- Case analytics view
create or replace view v_case_analytics as
select
  c.id,
  c.case_number,
  c.visit_date,
  c.visit_type,
  c.visit_number,
  p.name as patient_name,
  p.age as patient_age,
  p.gender as patient_gender,
  c.provisional_diagnosis,
  c.final_diagnosis,
  c.status,
  c.severity_score,
  c.prakriti,
  c.vikriti,
  count(distinct co.id) as follow_up_count,
  avg(co.outcome_rating) as avg_outcome_rating,
  count(distinct tp.id) as protocol_count,
  count(distinct if2.id) as investigation_count,
  count(distinct cc.id) as complaint_count
from cases c
join patients p on c.patient_id = p.id
left join case_outcomes co on c.id = co.case_id
left join treatment_protocols tp on c.id = tp.case_id
left join investigation_findings if2 on c.id = if2.case_id
left join chief_complaints cc on c.id = cc.case_id
group by c.id, c.case_number, c.visit_date, c.visit_type, c.visit_number,
         p.name, p.age, p.gender, c.provisional_diagnosis, c.final_diagnosis,
         c.status, c.severity_score, c.prakriti, c.vikriti;

comment on view v_case_analytics is 'Case analytics with patient info and outcome metrics';

-- Doctor dashboard view
create or replace view v_doctor_dashboard as
select
  pr.id as doctor_id,
  pr.full_name,
  pr.specialization,
  pr.clinic_name,
  count(distinct pa.id) as total_patients,
  count(distinct c.id) as total_cases,
  count(distinct c.id) filter (where c.status = 'active') as active_cases,
  count(distinct c.id) filter (where c.status = 'completed') as completed_cases,
  count(distinct c.id) filter (where c.visit_date = current_date) as today_visits,
  count(distinct c.id) filter (where c.follow_up_date <= current_date + 7) as upcoming_follow_ups,
  avg(co.outcome_rating) as avg_outcome_rating,
  count(distinct conv.id) as total_conversations,
  count(distinct conv.id) filter (where conv.status = 'active') as active_conversations
from profiles pr
left join patients pa on pr.id = pa.doctor_id
left join cases c on pr.id = c.doctor_id
left join case_outcomes co on c.id = co.case_id
left join conversations conv on pr.id = conv.doctor_id
group by pr.id, pr.full_name, pr.specialization, pr.clinic_name;

comment on view v_doctor_dashboard is 'Doctor dashboard with practice statistics';

-- Treatment effectiveness view
create or replace view v_treatment_effectiveness as
select
  tp.id as protocol_id,
  tp.protocol_name,
  tp.status as protocol_status,
  c.case_number,
  c.provisional_diagnosis,
  c.prakriti,
  p.name as patient_name,
  p.age as patient_age,
  co.outcome_rating,
  co.outcome_label,
  co.what_worked,
  co.what_didnt_work,
  ta.herb_adherence,
  ta.diet_adherence,
  ta.lifestyle_adherence
from treatment_protocols tp
join cases c on tp.case_id = c.id
join patients p on c.patient_id = p.id
left join case_outcomes co on c.id = co.case_id
left join treatment_adherence ta on c.id = ta.case_id;

comment on view v_treatment_effectiveness is 'Treatment effectiveness correlated with outcomes';

-- RAG search analytics view
create or replace view v_rag_analytics as
select
  query_type,
  count(*) as total_searches,
  avg(results_count) as avg_results,
  avg(results_used) as avg_results_used,
  avg(latency_ms) as avg_latency_ms,
  count(*) filter (where embedding_used = true) as embedding_searches,
  count(*) filter (where embedding_used = false) as text_searches
from rag_search_history
group by query_type;

comment on view v_rag_analytics is 'RAG search analytics by query type';

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Get patient case history
DO $$ BEGIN
  DROP FUNCTION IF EXISTS get_patient_case_history(uuid) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function get_patient_case_history(patient_uuid uuid)
returns table (
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
) as $$
begin
  return query
  select
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
  from cases c
  left join case_outcomes co on c.id = co.case_id
  where c.patient_id = patient_uuid
  order by c.visit_date desc;
end;
$$ language plpgsql security definer;

-- Get doctor statistics
DO $$ BEGIN
  DROP FUNCTION IF EXISTS get_doctor_stats(uuid) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function get_doctor_stats(doctor_uuid uuid)
returns jsonb as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'total_patients', count(distinct pa.id),
    'total_cases', count(distinct c.id),
    'active_cases', count(distinct c.id) filter (where c.status = 'active'),
    'completed_cases', count(distinct c.id) filter (where c.status = 'completed'),
    'avg_outcome_rating', round(avg(co.outcome_rating)::numeric, 2),
    'total_protocols', count(distinct tp.id),
    'total_investigations', count(distinct if2.id),
    'critical_findings', count(distinct if2.id) filter (where if2.status = 'critical'),
    'upcoming_follow_ups', count(distinct c.id) filter (where c.follow_up_date > current_date)
  ) into result
  from profiles pr
  left join patients pa on pr.id = pa.doctor_id
  left join cases c on pr.id = c.doctor_id
  left join case_outcomes co on c.id = co.case_id
  left join treatment_protocols tp on c.id = tp.case_id
  left join investigation_findings if2 on c.id = if2.case_id
  where pr.id = doctor_uuid;
  
  return result;
end;
$$ language plpgsql security definer;

-- Search knowledge base with full-text search
DO $$ BEGIN
  DROP FUNCTION IF EXISTS search_knowledge_base(text, text[], integer) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function search_knowledge_base(
  search_query text,
  source_tables text[] default array['who_terminology', 'diseases', 'herbs', 'treatments', 'charak_chapters'],
  limit_results integer default 10
)
returns table (
  source_table text,
  source_id uuid,
  title text,
  content text,
  rank real
) as $$
begin
  return query
  select 'who_terminology' as source_table, id as source_id, term as title, coalesce(definition, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  from who_terminology
  where search_vector @@ plainto_tsquery('simple', search_query)
  and 'who_terminology' = any(source_tables)
  
  union all
  
  select 'diseases' as source_table, id as source_id, name as title, coalesce(samprapti, modern_correlation, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  from diseases
  where search_vector @@ plainto_tsquery('simple', search_query)
  and 'diseases' = any(source_tables)
  and is_active = true
  
  union all
  
  select 'herbs' as source_table, id as source_id, name as title, coalesce(prabhava, array_to_string(indications, ', '), '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  from herbs
  where search_vector @@ plainto_tsquery('simple', search_query)
  and 'herbs' = any(source_tables)
  and is_active = true
  
  union all
  
  select 'treatments' as source_table, id as source_id, name as title, coalesce(description, array_to_string(indications, ', '), '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  from treatments
  where search_vector @@ plainto_tsquery('simple', search_query)
  and 'treatments' = any(source_tables)
  and is_active = true
  
  union all
  
  select 'charak_chapters' as source_table, id as source_id, chapter_name as title, coalesce(summary, '') as content, ts_rank(search_vector, plainto_tsquery('simple', search_query)) as rank
  from charak_chapters
  where search_vector @@ plainto_tsquery('simple', search_query)
  and 'charak_chapters' = any(source_tables)
  
  order by rank desc
  limit limit_results;
end;
$$ language plpgsql security definer;

-- Semantic search using vector embeddings
DO $$ BEGIN
  DROP FUNCTION IF EXISTS semantic_search(vector(1024), float, int, text) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function semantic_search(
  query_embedding vector(1024),
  match_threshold float default 0.8,
  match_count int default 10,
  source_table_filter text default null
)
returns table (
  id uuid,
  source_table text,
  source_id uuid,
  source_title text,
  content text,
  similarity float
) as $$
begin
  return query
  select
    ke.id,
    ke.source_table,
    ke.source_id,
    ke.source_title,
    ke.content,
    1 - (ke.embedding <=> query_embedding) as similarity
  from knowledge_embeddings ke
  where 1 - (ke.embedding <=> query_embedding) > match_threshold
  and (source_table_filter is null or ke.source_table = source_table_filter)
  order by ke.embedding <=> query_embedding
  limit match_count;
end;
$$ language plpgsql security definer;

-- Get critical investigation findings
DO $$ BEGIN
  DROP FUNCTION IF EXISTS get_critical_findings(uuid, integer) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function get_critical_findings(doctor_uuid uuid, days_back integer default 30)
returns table (
  finding_id uuid,
  case_number text,
  patient_name text,
  parameter text,
  value text,
  unit text,
  normal_range text,
  clinical_correlation text,
  visit_date date
) as $$
begin
  return query
  select
    if2.id,
    c.case_number,
    p.name,
    if2.parameter,
    if2.value,
    if2.unit,
    if2.normal_range,
    if2.clinical_correlation,
    c.visit_date
  from investigation_findings if2
  join cases c on if2.case_id = c.id
  join patients p on c.patient_id = p.id
  where if2.status = 'critical'
  and c.doctor_id = doctor_uuid
  and c.visit_date >= current_date - (days_back || ' days')::interval
  order by c.visit_date desc;
end;
$$ language plpgsql security definer;

-- Archive completed cases older than X days
DO $$ BEGIN
  DROP FUNCTION IF EXISTS archive_old_cases(integer) CASCADE;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
create or replace function archive_old_cases(days_threshold integer default 365)
returns integer as $$
declare
  archived_count integer;
begin
  update cases
  set status = 'archived',
      updated_at = now()
  where status = 'completed'
  and completed_at < current_date - (days_threshold || ' days')::interval;
  
  get diagnostics archived_count = row_count;
  return archived_count; 
end;
$$ language plpgsql security definer;
