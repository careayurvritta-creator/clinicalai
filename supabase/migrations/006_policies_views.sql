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
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = auth_user_id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = auth_user_id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = auth_user_id);

-- ============================================
-- PATIENTS POLICIES
-- ============================================
create policy "Doctors can view own patients"
  on patients for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can insert own patients"
  on patients for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can update own patients"
  on patients for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can delete own patients"
  on patients for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- CASES POLICIES
-- ============================================
create policy "Doctors can view own cases"
  on cases for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can insert own cases"
  on cases for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can update own cases"
  on cases for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can delete own cases"
  on cases for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- CHIEF COMPLAINTS POLICIES
-- ============================================
create policy "Doctors can view complaints from own cases"
  on chief_complaints for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert complaints to own cases"
  on chief_complaints for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can update complaints from own cases"
  on chief_complaints for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = chief_complaints.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view findings from own cases"
  on investigation_findings for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert findings to own cases"
  on investigation_findings for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can update findings from own cases"
  on investigation_findings for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = investigation_findings.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view protocols from own cases"
  on treatment_protocols for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert protocols to own cases"
  on treatment_protocols for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can update protocols from own cases"
  on treatment_protocols for update
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_protocols.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view own conversations"
  on conversations for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can insert own conversations"
  on conversations for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can update own conversations"
  on conversations for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can delete own conversations"
  on conversations for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- MESSAGES POLICIES
-- ============================================
create policy "Doctors can view messages from own conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert messages to own conversations"
  on messages for insert
  with check (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can update messages from own conversations"
  on messages for update
  using (
    exists (
      select 1 from conversations conv
      join profiles p on conv.doctor_id = p.id
      where conv.id = messages.conversation_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view own attachments"
  on attachments for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can insert own attachments"
  on attachments for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can update own attachments"
  on attachments for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can delete own attachments"
  on attachments for delete
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- KNOWLEDGE BASE POLICIES (Read-only for all authenticated users)
-- ============================================
create policy "Anyone can read WHO terminology"
  on who_terminology for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read diseases"
  on diseases for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read herbs"
  on herbs for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read treatments"
  on treatments for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read Charak chapters"
  on charak_chapters for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read allopathy integration"
  on allopathy_integration for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read combined protocols"
  on combined_protocols for select
  using (auth.role() = 'authenticated');

create policy "Anyone can read knowledge embeddings"
  on knowledge_embeddings for select
  using (auth.role() = 'authenticated');

create policy "Anyone can insert RAG search history"
  on rag_search_history for insert
  with check (auth.role() = 'authenticated');

create policy "Anyone can read RAG search history"
  on rag_search_history for select
  using (auth.role() = 'authenticated');

-- ============================================
-- CASE OUTCOMES POLICIES
-- ============================================
create policy "Doctors can view outcomes from own cases"
  on case_outcomes for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_outcomes.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert outcomes to own cases"
  on case_outcomes for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_outcomes.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view learnings from own cases"
  on case_learnings for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_learnings.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert learnings to own cases"
  on case_learnings for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = case_learnings.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create policy "Doctors can view own intake sessions"
  on intake_sessions for select
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can insert own intake sessions"
  on intake_sessions for insert
  with check (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

create policy "Doctors can update own intake sessions"
  on intake_sessions for update
  using (doctor_id = (select id from profiles where auth_user_id = auth.uid()));

-- ============================================
-- TREATMENT ADHERENCE POLICIES
-- ============================================
create policy "Doctors can view adherence from own cases"
  on treatment_adherence for select
  using (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_adherence.case_id and p.auth_user_id = auth.uid()
    )
  );

create policy "Doctors can insert adherence to own cases"
  on treatment_adherence for insert
  with check (
    exists (
      select 1 from cases c
      join profiles p on c.doctor_id = p.id
      where c.id = treatment_adherence.case_id and p.auth_user_id = auth.uid()
    )
  );

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
create view v_patient_summary as
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
create view v_case_analytics as
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
create view v_doctor_dashboard as
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
create view v_treatment_effectiveness as
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
create view v_rag_analytics as
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
-- NOTE: This initial version only covers tables created in migrations 001-005.
-- Migration 009 will recreate this function to include sushruta_chapters,
-- clinical_evidence, external_qa, and modern_medicines (created in migration 008).
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
create or replace function semantic_search(
  query_embedding vector(1024),
  match_threshold float default 0.5,
  match_count int default 10,
  source_table_filter text default null
)
returns table (
  id uuid,
  source_table text,
  source_id uuid,
  source_title text,
  content text,
  metadata jsonb,
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
    ke.metadata,
    1 - (ke.embedding <=> query_embedding) as similarity
  from knowledge_embeddings ke
  where 1 - (ke.embedding <=> query_embedding) > match_threshold
  and (source_table_filter is null or ke.source_table = source_table_filter)
  order by ke.embedding <=> query_embedding
  limit match_count;
end;
$$ language plpgsql security definer;

-- Get critical investigation findings
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
