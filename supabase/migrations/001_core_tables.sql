-- Migration 001: Core tables (profiles, patients, cases)
-- Created: 2026-05-18
-- Updated: 2026-05-18
-- Description: Foundation tables for the Ayurvedic Clinical AI system

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================
-- PROFILES TABLE
-- Doctor/user accounts with Ayurvedic credentials
-- ============================================
create table profiles (
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
create table patients (
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
  bmi numeric generated always as (
    case when height_cm > 0 and weight_kg > 0 
      then round(weight_kg / ((height_cm/100.0)^2), 2) 
      else null 
    end
  ) stored,
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
create table cases (
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
create index idx_profiles_email on profiles(email);
create index idx_profiles_auth_user on profiles(auth_user_id);
create index idx_profiles_active on profiles(is_active) where is_active = true;

create index idx_patients_doctor on patients(doctor_id);
create index idx_patients_name on patients using gin(to_tsvector('simple', name));
create index idx_patients_phone on patients(phone);
create index idx_patients_code on patients(patient_code);
create index idx_patients_archived on patients(is_archived) where is_archived = false;

create index idx_cases_patient on cases(patient_id);
create index idx_cases_doctor on cases(doctor_id);
create index idx_cases_status on cases(status);
create index idx_cases_visit_date on cases(visit_date);
create index idx_cases_case_number on cases(case_number);
create index idx_cases_provisional_diagnosis on cases using gin(to_tsvector('simple', coalesce(provisional_diagnosis, '')));
create index idx_cases_created_at on cases(created_at desc);
create index idx_cases_visit_type on cases(visit_type);
create index idx_cases_follow_up on cases(follow_up_date) where follow_up_date is not null;

-- ============================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

create trigger update_patients_updated_at
  before update on patients
  for each row
  execute function update_updated_at_column();

create trigger update_cases_updated_at
  before update on cases
  for each row
  execute function update_updated_at_column();

-- ============================================
-- PATIENT CODE GENERATOR
-- ============================================
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

create trigger generate_patient_code_trigger
  before insert on patients
  for each row
  when (new.patient_code is null or new.patient_code = '')
  execute function generate_patient_code();

-- ============================================
-- CASE NUMBER GENERATOR
-- ============================================
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

create trigger generate_case_number_trigger
  before insert on cases
  for each row
  when (new.case_number is null or new.case_number = '')
  execute function generate_case_number();

-- ============================================
-- AUTO-INCREMENT VISIT NUMBER
-- ============================================
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

create trigger set_visit_number_trigger
  before insert on cases
  for each row
  execute function set_visit_number();
