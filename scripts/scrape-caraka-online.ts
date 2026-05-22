/**
 * carakasamhitaonline.com Scraper
 *
 * Fetches articles from the MediaWiki API at carakasamhitaonline.com,
 * extracts structured content, and enriches existing charak_chapters in Supabase.
 *
 * License: CC BY-NC-SA 4.0 — attribution required in metadata
 *
 * Usage:
 *   npx tsx scripts/scrape-caraka-online.ts             # fetch + insert
 *   npx tsx scripts/scrape-caraka-online.ts --dry-run   # show what would be inserted
 *   npx tsx scripts/scrape-caraka-online.ts --limit 10  # limit number of pages
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// ─── Config ───────────────────────────────────────────────────────────────────
const WIKI_API = 'https://www.carakasamhitaonline.com/api.php'
const RATE_LIMIT_MS = 1100  // 1 request per second (respectful)
const BATCH_SIZE = 50

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

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── MediaWiki API ────────────────────────────────────────────────────────────

interface WikiPage {
  pageid: number
  title: string
  wikitext?: string
  html?: string
}

async function getAllPages(limit: number): Promise<{ pageid: number; title: string }[]> {
  const pages: { pageid: number; title: string }[] = []
  let apcontinue: string | undefined

  while (pages.length < limit) {
    const params = new URLSearchParams({
      action: 'query',
      list: 'allpages',
      aplimit: String(Math.min(500, limit - pages.length)),
      apnamespace: '0',
      format: 'json',
    })
    if (apcontinue) params.set('apcontinue', apcontinue)

    const url = `${WIKI_API}?${params.toString()}`
    console.log(`  Fetching page list... (${pages.length} so far)`)
    const response = await fetch(url)
    const data = await response.json() as Record<string, unknown>
    const query = data.query as Record<string, unknown>
    const allpages = (query.allpages || []) as { pageid: number; title: string }[]

    pages.push(...allpages)

    if (data.continue) {
      apcontinue = (data.continue as Record<string, string>).apcontinue
    } else {
      break
    }

    await sleep(RATE_LIMIT_MS)
  }

  return pages.slice(0, limit)
}

async function getPageContent(pageid: number): Promise<{ wikitext: string; html: string } | null> {
  const params = new URLSearchParams({
    action: 'parse',
    pageid: String(pageid),
    prop: 'wikitext|text',
    format: 'json',
  })

  const url = `${WIKI_API}?${params.toString()}`
  const response = await fetch(url)
  if (!response.ok) return null

  const data = await response.json() as Record<string, unknown>
  if (data.error) return null

  const parse = data.parse as Record<string, unknown>
  const wikitext = (parse?.wikitext as Record<string, string>)?.['*'] || ''
  const htmlObj = parse?.text as Record<string, string>
  const html = htmlObj?.['*'] || ''

  return { wikitext, html }
}

// ─── Content Extraction ───────────────────────────────────────────────────────

interface ScrapedChapter {
  id: string
  title: string
  content: string
  summary: string
  key_concepts: string[]
  source: string
  attribution: string
}

function extractChapterInfo(title: string, html: string, wikitext: string): ScrapedChapter | null {
  const cleanText = stripHtml(html)
  if (cleanText.length < 100) return null  // Skip very short pages

  // Try to identify sthana and chapter number from title
  // Common patterns: "Sutra Sthana Chapter 1", "Chikitsa Sthana - Chapter 5"
  const sthanaMatch = title.match(/(Sutra|Nidana|Vimana|Sharira|Indriya|Chikitsa|Kalpa|Siddhi)\s*Sthana/i)
  const chapterMatch = title.match(/Chapter\s*(\d+)/i)

  // Extract sections from wikitext
  const sections = wikitext.split(/==+[^=]+==+/).map(s => s.trim()).filter(Boolean)
  const headings = wikitext.match(/==+([^=]+)==+/g)?.map(h => h.replace(/=/g, '').trim()) || []

  // Extract key concepts from headings
  const keyConcepts = headings
    .filter(h => h.length > 3 && h.length < 100)
    .slice(0, 10)

  // Generate summary from first 500 chars
  const summary = cleanText.slice(0, 500).replace(/\s+\S*$/, '') + '...'

  return {
    id: deterministicUuid(`caraka_online:${title}`),
    title,
    content: cleanText.slice(0, 10000),  // Cap at 10K chars
    summary,
    key_concepts: keyConcepts,
    source: 'carakasamhitaonline.com',
    attribution: 'Content from carakasamhitaonline.com, licensed under CC BY-NC-SA 4.0. Edited by Dr. Gopal Basisht and Dr. Yogesh Deole.',
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const limitArg = args.find(a => a.startsWith('--limit'))
  const limit = limitArg ? parseInt(args[args.indexOf(limitArg) + 1] || '802') : 802

  console.log('=== carakasamhitaonline.com Scraper ===')
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Limit: ${limit} pages`)

  // Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Step 1: Get all page titles
  console.log('\n[Step 1] Fetching page list...')
  const pages = await getAllPages(limit)
  console.log(`  Found ${pages.length} pages`)

  // Step 2: Fetch and parse each page
  console.log('\n[Step 2] Fetching page content...')
  const chapters: ScrapedChapter[] = []
  let skipped = 0

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    process.stdout.write(`  [${i + 1}/${pages.length}] ${page.title.slice(0, 60).padEnd(60)}\r`)

    try {
      const content = await getPageContent(page.pageid)
      if (!content) { skipped++; continue }

      const chapter = extractChapterInfo(page.title, content.html, content.wikitext)
      if (chapter) {
        chapters.push(chapter)
      } else {
        skipped++
      }
    } catch (e) {
      console.error(`\n  Error on "${page.title}": ${(e as Error).message}`)
      skipped++
    }

    await sleep(RATE_LIMIT_MS)
  }

  console.log(`\n  Parsed ${chapters.length} chapters, skipped ${skipped}`)

  // Step 3: Upsert to Supabase
  if (!dryRun) {
    console.log('\n[Step 3] Upserting to charak_chapters...')

    // We'll store scraped content as additional enrichment in metadata
    // since the charak_chapters table has a fixed schema
    const embeddingRows = chapters.map(ch => ({
      id: ch.id,
      source_table: 'charak_chapters',
      source_id: ch.id,
      source_title: ch.title,
      content_type: 'description' as const,
      content: `Charak Samhita Online — ${ch.title}\n\n${ch.content}`,
      metadata: {
        source: ch.source,
        attribution: ch.attribution,
        summary: ch.summary,
        key_concepts: ch.key_concepts,
        scraped_at: new Date().toISOString(),
      },
    }))

    // Insert into knowledge_embeddings directly
    const batches = []
    for (let i = 0; i < embeddingRows.length; i += BATCH_SIZE) {
      batches.push(embeddingRows.slice(i, i + BATCH_SIZE))
    }

    let success = 0
    for (let i = 0; i < batches.length; i++) {
      const { error } = await supabase
        .from('knowledge_embeddings')
        .upsert(batches[i], { onConflict: 'id' })

      if (error) {
        console.error(`  Batch ${i + 1}/${batches.length} error:`, error.message)
      } else {
        success += batches[i].length
        process.stdout.write(`  Batch ${i + 1}/${batches.length} (${success} rows)\r`)
      }
    }
    console.log(`\n  Upserted ${success} rows into knowledge_embeddings`)
  } else {
    console.log('\n[Step 3] Would upsert', chapters.length, 'rows')
    if (chapters.length > 0) {
      console.log('  Sample:', JSON.stringify(chapters[0], null, 2).slice(0, 500))
    }
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
