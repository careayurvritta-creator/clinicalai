/**
 * PubMed Clinical Evidence Ingestion Script
 *
 * Fetches Ayurveda clinical trials and research papers from PubMed
 * via NCBI E-Utilities API, then upserts into Supabase clinical_evidence table.
 *
 * Usage:
 *   npx tsx scripts/ingest-pubmed.ts             # fetch + insert
 *   npx tsx scripts/ingest-pubmed.ts --dry-run   # show what would be inserted
 *   npx tsx scripts/ingest-pubmed.ts --force     # re-fetch everything
 *   npx tsx scripts/ingest-pubmed.ts --limit 50  # limit number of papers
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// ─── Config ───────────────────────────────────────────────────────────────────
const EUTILS_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'
const SEARCH_TERM = 'Medicine, Ayurvedic[MeSH]'
const BATCH_SIZE = 200        // efetch max per request
const DB_BATCH_SIZE = 50      // Supabase upsert batch
const RATE_LIMIT_MS = 340     // ~3 requests/sec without API key

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

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function extractXmlTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
  return match ? match[1].trim() : ''
}

function extractAllXmlTags(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'g')
  const results: string[] = []
  let match
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim())
  }
  return results
}

// ─── PubMed Parsers ───────────────────────────────────────────────────────────

interface ClinicalEvidenceRow {
  id: string
  pmid: string
  title: string
  authors: string[]
  journal: string
  publication_date: string | null
  abstract: string
  doi: string | null
  mesh_terms: string[]
  study_type: string
  evidence_level: string
  ayurveda_relevance: string
  herbs_mentioned: string[]
  conditions_mentioned: string[]
}

function parseArticleXml(articleXml: string): ClinicalEvidenceRow | null {
  const pmid = extractXmlTag(articleXml, 'PMID')
  if (!pmid) return null

  const title = extractXmlTag(articleXml, 'ArticleTitle')
  const abstract = extractAllXmlTags(articleXml, 'AbstractText').join(' ')

  // Authors
  const authorMatches = articleXml.match(/<Author[^>]*>[\s\S]*?<\/Author>/g) || []
  const authors = authorMatches.map(a => {
    const last = extractXmlTag(a, 'LastName')
    const first = extractXmlTag(a, 'ForeName')
    return `${last}${first ? ', ' + first : ''}`
  }).filter(Boolean)

  // Journal
  const journal = extractXmlTag(articleXml, 'Title') || extractXmlTag(articleXml, 'ISOAbbreviation')

  // Date
  const pubDateXml = articleXml.match(/<PubDate[^>]*>([\s\S]*?)<\/PubDate>/)
  let publicationDate: string | null = null
  if (pubDateXml) {
    const year = extractXmlTag(pubDateXml[0], 'Year')
    const month = extractXmlTag(pubDateXml[0], 'Month')
    const day = extractXmlTag(pubDateXml[0], 'Day')
    if (year) {
      const MONTH_MAP: Record<string, string> = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
        'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
      }
      const m = month ? (MONTH_MAP[String(month)] || String(month).padStart(2, '0')) : '01'
      const d = day ? String(day).padStart(2, '0') : '01'
      publicationDate = `${year}-${m}-${d}`
    }
  }

  // DOI
  const doiMatch = articleXml.match(/<ArticleId IdType="doi">([\s\S]*?)<\/ArticleId>/)
  const doi = doiMatch ? doiMatch[1].trim() : null

  // MeSH terms
  const meshMatches = articleXml.match(/<DescriptorName[^>]*>([\s\S]*?)<\/DescriptorName>/g) || []
  const meshTerms = meshMatches.map(m => extractXmlTag(m, 'DescriptorName')).filter(Boolean)

  // Publication types
  const pubTypeMatches = articleXml.match(/<PublicationType[^>]*>([\s\S]*?)<\/PublicationType>/g) || []
  const pubTypes = pubTypeMatches.map(p => extractXmlTag(p, 'PublicationType')).filter(Boolean)

  // Classify study type
  const pubTypeStr = pubTypes.join(' ').toLowerCase()
  let studyType = 'other'
  if (pubTypeStr.includes('clinical trial')) studyType = 'clinical_trial'
  else if (pubTypeStr.includes('meta-analysis')) studyType = 'meta_analysis'
  else if (pubTypeStr.includes('systematic review')) studyType = 'systematic_review'
  else if (pubTypeStr.includes('review')) studyType = 'review'
  else if (pubTypeStr.includes('case report')) studyType = 'case_report'

  // Classify evidence level
  let evidenceLevel = 'expert_opinion'
  if (studyType === 'systematic_review' || studyType === 'meta_analysis') evidenceLevel = 'systematic_review'
  else if (studyType === 'clinical_trial') evidenceLevel = 'rct'
  else if (studyType === 'case_report') evidenceLevel = 'case_series'
  else if (studyType === 'review') evidenceLevel = 'expert_opinion'

  // Extract Ayurveda relevance from MeSH + abstract
  const ayurvedaKeywords = ['ayurveda', 'ayurvedic', 'dosha', 'panchakarma', 'herbal', 'herb',
    'rasayana', 'prakriti', 'vata', 'pitta', 'kapha', 'sushruta', 'charaka', 'charak']
  const lowerAbstract = (abstract || '').toLowerCase()
  const lowerMesh = meshTerms.join(' ').toLowerCase()
  const relevance = ayurvedaKeywords.filter(k =>
    lowerAbstract.includes(k) || lowerMesh.includes(k)
  ).join(', ')

  // Extract mentioned herbs from abstract
  const knownHerbs = ['ashwagandha', 'turmeric', 'curcumin', 'triphala', 'guduchi', 'tinospora',
    'brahmi', 'shatavari', 'neem', 'tulsi', 'amla', 'ginger', 'pippali', 'guggulu',
    'boswellia', 'commiphora', 'terminalia', 'withania', 'curcuma', 'bacopa']
  const herbsMentioned = knownHerbs.filter(h => lowerAbstract.includes(h) || lowerMesh.includes(h))

  // Extract conditions
  const knownConditions = ['diabetes', 'hypertension', 'arthritis', 'asthma', 'obesity',
    'depression', 'anxiety', 'inflammation', 'pain', 'cancer', 'infection', 'wound',
    'cholesterol', 'immun', 'stress', 'insomnia', 'gastric', 'ulcer']
  const conditionsMentioned = knownConditions.filter(c => lowerAbstract.includes(c))

  return {
    id: deterministicUuid(`pubmed:${pmid}`),
    pmid,
    title,
    authors,
    journal,
    publication_date: publicationDate,
    abstract,
    doi,
    mesh_terms: meshTerms,
    study_type: studyType,
    evidence_level: evidenceLevel,
    ayurveda_relevance: relevance || 'Ayurveda research',
    herbs_mentioned: herbsMentioned,
    conditions_mentioned: conditionsMentioned,
  }
}

// ─── NCBI API Functions ───────────────────────────────────────────────────────

async function searchPubMed(term: string, maxResults: number): Promise<string[]> {
  const url = `${EUTILS_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmax=${maxResults}&retmode=json`
  console.log(`  Searching PubMed: ${term}`)
  const response = await fetch(url)
  const data = await response.json() as Record<string, unknown>
  const result = data.esearchresult as Record<string, unknown>
  const ids = (result.idlist || []) as string[]
  console.log(`  Found ${ids.length} articles (total: ${result.count})`)
  return ids
}

async function fetchArticles(pmids: string[]): Promise<string> {
  const url = `${EUTILS_BASE}/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&rettype=xml&retmode=xml`
  const response = await fetch(url)
  return response.text()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const force = args.includes('--force')
  const limitArg = args.find(a => a.startsWith('--limit'))
  let limit = 563
  if (limitArg) {
    if (limitArg.includes('=')) {
      limit = parseInt(limitArg.split('=')[1]) || 563
    } else {
      limit = parseInt(args[args.indexOf(limitArg) + 1] || '563') || 563
    }
  }

  console.log('=== PubMed Ayurveda Clinical Evidence Ingestion ===')
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}${force ? ' (FORCE)' : ''}`)
  console.log(`Limit: ${limit} papers`)

  // Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Step 1: Search for PMIDs
  console.log('\n[Step 1] Searching PubMed...')
  const pmids = await searchPubMed(SEARCH_TERM, limit)
  if (pmids.length === 0) {
    console.log('No articles found. Exiting.')
    return
  }

  // Step 2: Fetch and parse articles in batches
  console.log('\n[Step 2] Fetching and parsing articles...')
  const allArticles: ClinicalEvidenceRow[] = []
  const pmidBatches = batchItems(pmids, BATCH_SIZE)

  for (let i = 0; i < pmidBatches.length; i++) {
    console.log(`  Batch ${i + 1}/${pmidBatches.length} (${pmidBatches[i].length} articles)...`)
    try {
      const xml = await fetchArticles(pmidBatches[i])
      const articleXmls = xml.match(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g) || []
      for (const articleXml of articleXmls) {
        const parsed = parseArticleXml(articleXml)
        if (parsed) allArticles.push(parsed)
      }
      console.log(`    Parsed ${articleXmls.length} articles`)
    } catch (e) {
      console.error(`    Error: ${(e as Error).message}`)
    }
    if (i < pmidBatches.length - 1) await sleep(RATE_LIMIT_MS)
  }

  console.log(`\n  Total parsed: ${allArticles.length} articles`)

  // Step 3: Upsert to Supabase
  if (!dryRun) {
    console.log('\n[Step 3] Upserting to clinical_evidence...')
    const batches = batchItems(allArticles, DB_BATCH_SIZE)
    let success = 0
    let errors = 0

    for (let i = 0; i < batches.length; i++) {
      const { error } = await supabase
        .from('clinical_evidence')
        .upsert(batches[i], { onConflict: 'pmid' })

      if (error) {
        console.error(`  Batch ${i + 1}/${batches.length} error:`, error.message)
        errors++
      } else {
        success += batches[i].length
        process.stdout.write(`  Batch ${i + 1}/${batches.length} (${success} rows)\r`)
      }
    }
    console.log(`\n  Done: ${success} upserted, ${errors} errors`)
  } else {
    console.log('\n[Step 3] Would upsert', allArticles.length, 'rows into clinical_evidence')
    if (allArticles.length > 0) {
      console.log('  Sample:', JSON.stringify(allArticles[0], null, 2))
    }
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
