-- Migration 003: Conversations, messages, and attachments
-- Created: 2026-05-18
-- Description: Chat session tracking and file management

-- ============================================
-- CONVERSATIONS TABLE
-- Chat sessions per case or standalone
-- ============================================
create table conversations (
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

create index idx_conversations_case on conversations(case_id);
create index idx_conversations_doctor on conversations(doctor_id);
create index idx_conversations_session on conversations(session_id);
create index idx_conversations_module on conversations(module);
create index idx_conversations_status on conversations(status);
create index idx_conversations_created_at on conversations(created_at desc);

-- ============================================
-- MESSAGES TABLE
-- Individual chat messages within conversations
-- ============================================
create table messages (
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

create index idx_messages_conversation on messages(conversation_id);
create index idx_messages_role on messages(role);
create index idx_messages_status on messages(status);
create index idx_messages_created_at on messages(created_at);
create index idx_messages_is_question on messages(is_question) where is_question = true;

-- Full text search on message content
create index idx_messages_content_search on messages using gin(to_tsvector('simple', content));

-- ============================================
-- ATTACHMENTS TABLE
-- File metadata for images, PDFs, and other uploads
-- ============================================
create table attachments (
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

create index idx_attachments_case on attachments(case_id);
create index idx_attachments_conversation on attachments(conversation_id);
create index idx_attachments_message on attachments(message_id);
create index idx_attachments_doctor on attachments(doctor_id);
create index idx_attachments_file_type on attachments(file_type);
create index idx_attachments_analysis_status on attachments(analysis_status);
create index idx_attachments_created_at on attachments(created_at desc);

-- Full text search on extracted text
create index idx_attachments_text_search on attachments using gin(to_tsvector('simple', coalesce(extracted_text, '')));

-- ============================================
-- TRIGGERS
-- ============================================
create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();

create trigger update_messages_updated_at
  before update on messages
  for each row
  execute function update_updated_at_column();

create trigger update_attachments_updated_at
  before update on attachments
  for each row
  execute function update_updated_at_column();

-- ============================================
-- AUTO-INCREMENT MESSAGE COUNT
-- ============================================
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

create trigger increment_message_count_trigger
  after insert on messages
  for each row
  execute function increment_message_count();
