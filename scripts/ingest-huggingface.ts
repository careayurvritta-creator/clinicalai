/**
 * HuggingFace Dataset Ingestion Script
 *
 * Downloads and parses Ayurveda datasets from HuggingFace Hub,
 * then upserts into Supabase (external_qa + modern_medicines tables).
 *
 * Datasets:
 *   - jaychedaa/Ayurveda-LLM-dataset → Sushruta Samhita Q&A (external_qa)
 *   - Macromrit/ayurveda-text-based-qanda → General Ayurveda Q&A (external_qa)
 *   - dmedhi/indian-medicines → Modern medicines (modern_medicines)
 *
 * Usage:
 *   npx tsx scripts/ingest-huggingface.ts             # download + insert
 *   npx tsx scripts/ingest-huggingface.ts --dry-run   # show what would be inserted
 *   npx tsx scripts/ingest-huggingface.ts --force     # re-download everything
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// ─── Config ───────────────────────────────────────────────────────────────────
const HF_BASE = 'https://huggingface.co/datasets'
const BATCH_SIZE = 100

const DATASETS = {
  sushrutaQA: `${HF_BASE}/jaychedaa/Ayurveda-LLM-dataset/resolve/main/AYURVEDIC_DATASETFULL.json`,
  // ayurvedaQA: gated/private — skip for now
  // medicines: Parquet — use HF datasets server API with pagination
  medicinesApiBase: `https://datasets-server.huggingface.co/rows?dataset=dmedhi/indian-medicines&config=default&split=train`,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function deterministicUuid(input: string): string {
  const hash = createHash('sha256').update(input).digest('hex')
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    hash.slice(16, 20),
    hash.slice(20, 32),
  ].join('-')
}

function batchItems<T>(items: T[], size: number): T[][] {
  const batches: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size))
  }
  return batches
}

async function fetchJson(url: string): Promise<Record<string, unknown>[]> {
  console.log(`  Fetching: ${url}`)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()

  // Handle HF datasets API format: { rows: [{ row: {...} }, ...] }
  if (data.rows && Array.isArray(data.rows)) {
    return data.rows.map((r: Record<string, unknown>) => (r as Record<string, unknown>).row || r)
  }

  // Handle plain JSON array
  if (Array.isArray(data)) {
    return data
  }

  // Handle JSONL (newline-delimited JSON)
  if (typeof data === 'string') {
    return data.trim().split('\n').map(line => JSON.parse(line))
  }

  throw new Error('Unexpected data format')
}

// ─── Parsers ──────────────────────────────────────────────────────────────────

interface QARow {
  id: string
  source_dataset: string
  question: string
  answer: string
  context: string | null
  category: string | null
  classical_reference: string | null
}

interface MedicineRow {
  id: string
  medicine_name: string
  composition: string
  manufacturer: string | null
  uses: string
  side_effects: string | null
  precautions: string | null
  drug_interactions: string | null
  therapeutic_class: string | null
  ayurvedic_alternatives: string[]
}

function parseSushrutaQA(data: Record<string, unknown>[]): QARow[] {
  return data.map((row, i) => ({
    id: deterministicUuid(`sushruta_qa:${i}:${String(row.question || '').slice(0, 50)}`),
    source_dataset: 'sushruta_qa',
    question: String(row.question || ''),
    answer: String(row.response || ''),
    context: row.Context_Cot ? String(row.Context_Cot) : null,
    category: 'Sushruta Samhita',
    classical_reference: 'Sushruta Samhita',
  }))
}

function parseAyurvedaQA(data: Record<string, unknown>[]): QARow[] {
  return data.map((row, i) => ({
    id: deterministicUuid(`ayurveda_qa:${i}:${String(row.question || row.Question || '').slice(0, 50)}`),
    source_dataset: 'ayurveda_qa',
    question: String(row.question || row.Question || row.query || ''),
    answer: String(row.answer || row.Answer || row.response || ''),
    context: row.context || row.Context ? String(row.context || row.Context) : null,
    category: row.category || row.Category ? String(row.category || row.Category) : null,
    classical_reference: null,
  }))
}

function parseMedicines(data: Record<string, unknown>[]): MedicineRow[] {
  return data.map((row, i) => ({
    id: deterministicUuid(`medicine:${i}:${String(row.name || '').slice(0, 50)}`),
    medicine_name: String(row.name || ''),
    composition: String(row.composition || ''),
    manufacturer: row.manufacturer ? String(row.manufacturer) : null,
    uses: String(row.uses || ''),
    side_effects: row.side_effects ? String(row.side_effects) : null,
    precautions: row.precautions ? String(row.precautions) : null,
    drug_interactions: row.drug_interactions ? String(row.drug_interactions) : null,
    therapeutic_class: row.therapeutic_class ? String(row.therapeutic_class) : null,
    ayurvedic_alternatives: [],
  }))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const force = args.includes('--force')

  console.log('=== HuggingFace Ayurveda Dataset Ingestion ===')
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}${force ? ' (FORCE)' : ''}`)

  // Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // ── 1. Sushruta Samhita Q&A ──
  console.log('\n[1/3] Sushruta Samhita Q&A...')
  try {
    const sushrutaData = await fetchJson(DATASETS.sushrutaQA)
    const qaRows = parseSushrutaQA(sushrutaData)
    console.log(`  Parsed ${qaRows.length} Sushruta Q&A pairs`)

    if (!dryRun) {
      const batches = batchItems(qaRows, BATCH_SIZE)
      for (let i = 0; i < batches.length; i++) {
        const { error } = await supabase
          .from('external_qa')
          .upsert(batches[i], { onConflict: 'id' })
        if (error) {
          console.error(`  Batch ${i + 1}/${batches.length} error:`, error.message)
        } else {
          process.stdout.write(`  Batch ${i + 1}/${batches.length} done\r`)
        }
      }
      console.log(`\n  Upserted ${qaRows.length} rows into external_qa`)
    } else {
      console.log(`  Would upsert ${qaRows.length} rows into external_qa`)
      console.log('  Sample:', JSON.stringify(qaRows[0], null, 2))
    }
  } catch (e) {
    console.error('  Failed:', (e as Error).message)
  }

  // ── 2. Modern Medicines (paginated from HF datasets server) ──
  console.log('\n[2/2] Modern Medicines...')
  try {
    const PAGE_SIZE = 100  // HF datasets server max per page
    let totalUpserted = 0
    let offset = 0
    let hasMore = true

    while (hasMore) {
      const url = `${DATASETS.medicinesApiBase}&offset=${offset}&length=${PAGE_SIZE}`
      console.log(`  Fetching offset ${offset}...`)
      try {
        const data = await fetchJson(url)
        if (data.length === 0) break

        const rows = parseMedicines(data)

        if (!dryRun) {
          const { error } = await supabase
            .from('modern_medicines')
            .upsert(rows, { onConflict: 'id' })
          if (error) {
            console.error(`  Upsert error at offset ${offset}:`, error.message)
          } else {
            totalUpserted += rows.length
          }
        } else {
          totalUpserted += rows.length
        }

        offset += PAGE_SIZE
        hasMore = data.length === PAGE_SIZE
        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 200))
      } catch (e) {
        console.log(`  Stopped at offset ${offset}: ${(e as Error).message}`)
        break
      }
    }

    console.log(`  ${dryRun ? 'Would upsert' : 'Upserted'} ${totalUpserted} rows into modern_medicines`)
  } catch (e) {
    console.error('  Failed:', (e as Error).message)
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
