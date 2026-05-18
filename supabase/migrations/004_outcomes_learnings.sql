-- Migration 004: Outcomes, learnings, and intake sessions
-- Created: 2026-05-18
-- Description: Follow-up tracking, AI learning feedback, and intake workflow state

-- ============================================
-- CASE OUTCOMES TABLE
-- Follow-up outcomes and treatment effectiveness
-- ============================================
create table case_outcomes (
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

create index idx_case_outcomes_case on case_outcomes(case_id);
create index idx_case_outcomes_rating on case_outcomes(outcome_rating);
create index idx_case_outcomes_follow_up_date on case_outcomes(follow_up_date);
create index idx_case_outcomes_label on case_outcomes(outcome_label);

-- ============================================
-- CASE LEARNINGS TABLE
-- AI learning feedback loop for continuous improvement
-- ============================================
create table case_learnings (
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

create index idx_case_learnings_case on case_learnings(case_id);
create index idx_case_learnings_outcome on case_learnings(outcome_id);
create index idx_case_learnings_category on case_learnings(pattern_category);
create index idx_case_learnings_validated on case_learnings(is_validated) where is_validated = true;
create index idx_case_learnings_frequency on case_learnings(frequency desc);

-- ============================================
-- INTAKE SESSIONS TABLE
-- Active patient intake workflow state
-- ============================================
create table intake_sessions (
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

create index idx_intake_sessions_case on intake_sessions(case_id);
create index idx_intake_sessions_doctor on intake_sessions(doctor_id);
create index idx_intake_sessions_patient on intake_sessions(patient_id);
create index idx_intake_sessions_session on intake_sessions(session_id);
create index idx_intake_sessions_status on intake_sessions(status);
create index idx_intake_sessions_active on intake_sessions(status) where status = 'active';

-- ============================================
-- TREATMENT ADHERENCE TABLE
-- Track patient compliance with treatment plan
-- ============================================
create table treatment_adherence (
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

create index idx_treatment_adherence_case on treatment_adherence(case_id);
create index idx_treatment_adherence_protocol on treatment_adherence(protocol_id);
create index idx_treatment_adherence_date on treatment_adherence(adherence_date);

-- ============================================
-- TRIGGERS
-- ============================================
create trigger update_case_outcomes_updated_at
  before update on case_outcomes
  for each row
  execute function update_updated_at_column();

create trigger update_case_learnings_updated_at
  before update on case_learnings
  for each row
  execute function update_updated_at_column();

create trigger update_intake_sessions_updated_at
  before update on intake_sessions
  for each row
  execute function update_updated_at_column();

create trigger update_treatment_adherence_updated_at
  before update on treatment_adherence
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-CALCULATE PROGRESS PERCENTAGE
-- ============================================
create or replace function calculate_intake_progress()
returns trigger as $$
begin
  if new.total_steps > 0 then
    new.progress_percentage := round((new.current_step::numeric / new.total_steps::numeric) * 100);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger calculate_intake_progress_trigger
  before insert or update on intake_sessions
  for each row
  execute function calculate_intake_progress();
