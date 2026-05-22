-- Minimal setup for vector RAG search
-- Run this in Supabase SQL Editor

-- Enable vector extension
create extension if not exists vector;

-- Knowledge embeddings table
create table if not exists knowledge_embeddings (
  id uuid primary key default uuid_generate_v4(),
  source_table text not null,
  source_id uuid not null,
  source_title text not null,
  content_type text,
  content text not null,
  metadata jsonb default '{}',
  embedding vector(1024),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes
create index if not exists idx_knowledge_embeddings_source on knowledge_embeddings(source_table, source_id);
create index if not exists idx_knowledge_embeddings_content_type on knowledge_embeddings(content_type);
create index if not exists idx_knowledge_embeddings_embedding on knowledge_embeddings using hnsw (embedding vector_cosine_ops);

-- Semantic search function
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
)
language plpgsql
as $$
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
  where (source_table_filter is null or ke.source_table = source_table_filter)
    and 1 - (ke.embedding <=> query_embedding) > match_threshold
  order by ke.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Full-text search function
create or replace function search_knowledge_base(
  search_query text,
  source_tables text[] default null,
  limit_results int default 10
)
returns table (
  source_table text,
  source_id uuid,
  title text,
  content text,
  rank float
)
language plpgsql
as $$
begin
  return query
  select
    ke.source_table,
    ke.source_id,
    ke.source_title as title,
    ke.content,
    ts_rank(to_tsvector('simple', ke.content), plainto_tsquery('simple', search_query)) as rank
  from knowledge_embeddings ke
  where (source_tables is null or ke.source_table = any(source_tables))
    and to_tsvector('simple', ke.content) @@ plainto_tsquery('simple', search_query)
  order by rank desc
  limit limit_results;
end;
$$;

-- Update trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_knowledge_embeddings_updated_at'
  ) THEN
    CREATE TRIGGER update_knowledge_embeddings_updated_at
      BEFORE UPDATE ON knowledge_embeddings
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
