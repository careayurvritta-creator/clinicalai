-- Migration 002: Clinical data tables (chief_complaints, investigation_findings, treatment_protocols)
-- Created: 2026-05-18
-- Description: Normalized clinical data tables for detailed tracking

-- ============================================
-- CHIEF COMPLAINTS TABLE
-- Normalized complaint tracking per case
-- ============================================
create table chief_complaints (
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

create index idx_chief_complaints_case on chief_complaints(case_id);
create index idx_chief_complaints_severity on chief_complaints(severity);
create index idx_chief_complaints_complaint on chief_complaints using gin(to_tsvector('simple', complaint));

-- ============================================
-- INVESTIGATION FINDINGS TABLE
-- Lab report analysis results per case
-- ============================================
create table investigation_findings (
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

create index idx_investigation_findings_case on investigation_findings(case_id);
create index idx_investigation_findings_status on investigation_findings(status);
create index idx_investigation_findings_parameter on investigation_findings(parameter);
create index idx_investigation_findings_report_type on investigation_findings(report_type);
create index idx_investigation_findings_critical on investigation_findings(status) where status = 'critical';

-- ============================================
-- TREATMENT PROTOCOLS TABLE
-- Generated treatment plans per case
-- ============================================
create table treatment_protocols (
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

create index idx_treatment_protocols_case on treatment_protocols(case_id);
create index idx_treatment_protocols_status on treatment_protocols(status);
create index idx_treatment_protocols_version on treatment_protocols(case_id, protocol_version);

-- ============================================
-- TRIGGERS
-- ============================================
create trigger update_chief_complaints_updated_at
  before update on chief_complaints
  for each row
  execute function update_updated_at_column();

create trigger update_investigation_findings_updated_at
  before update on investigation_findings
  for each row
  execute function update_updated_at_column();

create trigger update_treatment_protocols_updated_at
  before update on treatment_protocols
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-INCREMENT PROTOCOL VERSION
-- ============================================
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

create trigger set_protocol_version_trigger
  before insert on treatment_protocols
  for each row
  execute function set_protocol_version();
