# Supabase Database Setup

## Overview

This directory contains the complete database schema for the Ayurvedic Clinical AI system.

## Database Architecture

### Tables (22 total)

| Category | Tables | Purpose |
|----------|--------|---------|
| **Core** | `profiles`, `patients`, `cases` | Doctor accounts, patient records, clinical cases |
| **Clinical** | `chief_complaints`, `investigation_findings`, `treatment_protocols`, `treatment_adherence` | Detailed clinical data tracking |
| **Outcomes** | `case_outcomes`, `case_learnings` | Follow-up tracking and AI learning feedback |
| **Workflow** | `intake_sessions` | Active patient intake workflow state |
| **Conversations** | `conversations`, `messages`, `attachments` | Chat sessions and file management |
| **Knowledge Base** | `who_terminology`, `diseases`, `herbs`, `treatments`, `charak_chapters` | Ayurvedic reference data |
| **Integration** | `allopathy_integration`, `combined_protocols` | Drug-herb interactions and combined protocols |
| **RAG** | `knowledge_embeddings`, `rag_search_history` | Vector embeddings and semantic search |

### Views (5 total)

- `v_patient_summary` - Patient overview with visit counts and outcomes
- `v_case_analytics` - Case analytics with patient info and metrics
- `v_doctor_dashboard` - Doctor practice statistics
- `v_treatment_effectiveness` - Treatment effectiveness correlated with outcomes
- `v_rag_analytics` - RAG search analytics by query type

### Functions (6 total)

- `get_patient_case_history(patient_uuid)` - Get all cases for a patient
- `get_doctor_stats(doctor_uuid)` - Get doctor practice statistics
- `search_knowledge_base(query, source_tables, limit)` - Full-text search across knowledge base
- `semantic_search(query_embedding, match_threshold, match_count, source_table)` - Vector similarity search
- `get_critical_findings(doctor_uuid, days_back)` - Get critical lab findings
- `archive_old_cases(days_threshold)` - Archive completed cases older than X days

## Deployment

### Option 1: Supabase Dashboard (Recommended)

1. Create a new project at https://app.supabase.com
2. Go to SQL Editor in your project dashboard
3. Run each migration file in order:
   - `001_core_tables.sql`
   - `002_clinical_data.sql`
   - `003_conversations.sql`
   - `004_outcomes_learnings.sql`
   - `005_rag_knowledge_base.sql`
   - `006_policies_views.sql`

### Option 2: GitHub Integration

1. Create a Supabase project
2. Go to Settings > Git Integration
3. Connect your GitHub repository
4. Supabase will auto-apply migrations from `supabase/migrations/`

### Option 3: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-id

# Apply migrations
supabase db push
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Row Level Security

All tables have RLS enabled. Key policies:

- **Doctors** can only access their own patients, cases, and conversations
- **Knowledge base** tables are read-only for all authenticated users
- **Attachments** are scoped to the doctor who uploaded them

## Vector Search

The `knowledge_embeddings` table uses `pgvector` for semantic search:
- Embedding dimension: 1536 (compatible with OpenAI/NVIDIA embeddings)
- Index type: HNSW for fast approximate nearest neighbor search
- Distance metric: Cosine similarity

## Data Seeding

After deployment, you'll need to seed the knowledge base tables:
1. `who_terminology` - Import from WHO CSV
2. `diseases` - Import from `src/lib/ayurknowledge/diseases.ts`
3. `herbs` - Import from `src/lib/ayurknowledge/herbs.ts`
4. `treatments` - Import from `src/lib/ayurknowledge/treatments.ts`
5. `charak_chapters` - Import from `src/lib/ayurknowledge/charak-*.json`

## Storage Buckets

Create these storage buckets in Supabase:

| Bucket | Purpose | Access |
|--------|---------|--------|
| `patient-files` | Patient documents, lab reports | Private (doctor only) |
| `case-attachments` | Case-related images and PDFs | Private (doctor only) |
| `profile-images` | Doctor and patient avatars | Public read |

## Next Steps

1. Deploy the database using one of the methods above
2. Set up environment variables
3. Seed the knowledge base tables
4. Create storage buckets
5. Test the connection from your Next.js app
6. Set up GitHub integration for automatic migrations
