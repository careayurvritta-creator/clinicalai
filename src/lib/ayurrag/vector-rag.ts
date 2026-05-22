/**
 * Vector RAG Engine — True Semantic Search
 *
 * Uses NVIDIA NIM embeddings + Supabase pgvector for semantic search.
 * Falls back to full-text search (tsvector) if embedding fails.
 */

import { generateSearchEmbedding } from '@/lib/embedding-client'
import { semanticSearch, searchKnowledgeBase } from '@/lib/supabase/services'

// ─── Interfaces (preserved for backward compatibility) ────────────────────────

export interface VectorSearchResult {
  id: string
  type: 'who_term' | 'ayur_knowledge'
  content: string
  source: string
  category: string
  relevance: number
  metadata?: Record<string, unknown>
}

export interface VectorRAGConfig {
  maxResults: number
  minRelevance: number
  includeWHO: boolean
  includeAyurKnowledge: boolean
}

// ─── Initialization (no-op — no in-memory cache needed) ──────────────────────

export async function initializeVectorRAG(): Promise<void> {
  console.log('[VectorRAG] Initialized (vector search mode)')
}

// ─── Source table → category mapping ──────────────────────────────────────────

const SOURCE_TABLE_CATEGORY_MAP: Record<string, string> = {
  who_terminology: 'WHO Terminology',
  diseases: 'Disease',
  herbs: 'Herb',
  treatments: 'Treatment',
  charak_chapters: 'Classical Text',
  allopathy_integration: 'Allopathy Integration',
  combined_protocols: 'Combined Protocol',
  diagnostics: 'Diagnostic Method',
  fundamentals: 'Fundamental Concept',
}

function mapSourceTableToCategory(sourceTable: string): string {
  return SOURCE_TABLE_CATEGORY_MAP[sourceTable] || 'Knowledge Base'
}

// ─── Search History Logging (fire-and-forget) ────────────────────────────────

async function logSearchHistory(
  query: string,
  resultsCount: number,
  embeddingUsed: boolean,
  latencyMs: number
): Promise<void> {
  try {
    const { createServerClient } = await import('@/lib/supabase/client')
    const serverSupabase = createServerClient()
    await serverSupabase.from('rag_search_history').insert({
      query,
      query_type: 'general',
      results_count: resultsCount,
      results_used: Math.min(resultsCount, 10),
      latency_ms: latencyMs,
      embedding_used: embeddingUsed,
    })
  } catch {
    // Silent fail — logging is non-critical
  }
}

// ─── Vector Search ───────────────────────────────────────────────────────────

// Simple in-memory LRU cache for search results
const searchCache = new Map<string, { results: VectorSearchResult[]; timestamp: number }>()
const CACHE_MAX_SIZE = 100
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

function getCachedResults(cacheKey: string): VectorSearchResult[] | null {
  const cached = searchCache.get(cacheKey)
  if (!cached) return null
  if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
    searchCache.delete(cacheKey)
    return null
  }
  // Move to end (most recently used)
  searchCache.delete(cacheKey)
  searchCache.set(cacheKey, cached)
  return cached.results
}

function setCachedResults(cacheKey: string, results: VectorSearchResult[]) {
  // Evict oldest if at capacity
  if (searchCache.size >= CACHE_MAX_SIZE) {
    const oldestKey = searchCache.keys().next().value
    if (oldestKey) searchCache.delete(oldestKey)
  }
  searchCache.set(cacheKey, { results, timestamp: Date.now() })
}

/**
 * Detect query intent to boost relevant categories.
 */
function detectQueryIntent(query: string): { boostCategories: string[]; keywords: string[] } {
  const lower = query.toLowerCase()
  const boostCategories: string[] = []
  const keywords: string[] = []

  // Disease/treatment queries
  if (lower.match(/\b(treat|cure|therapy|protocol|manage|heal)\b/)) {
    boostCategories.push('Treatment', 'Classical Text')
    keywords.push('treatment', 'therapy')
  }
  if (lower.match(/\b(disease|diagnosis|condition|symptom|vyadhi)\b/)) {
    boostCategories.push('Disease')
    keywords.push('disease', 'diagnosis')
  }
  if (lower.match(/\b(herb|dravya|medicine|drug|plant|formulation)\b/)) {
    boostCategories.push('Herb')
    keywords.push('herb', 'medicine')
  }
  if (lower.match(/\b(panchakarma|basti|vamana|virechana|nasya|raktamokshana)\b/)) {
    boostCategories.push('Treatment', 'Classical Text')
    keywords.push('panchakarma')
  }
  if (lower.match(/\b(diet|food|pathya|apathya|ahara|nutrition)\b/)) {
    boostCategories.push('Disease', 'Classical Text')
    keywords.push('diet', 'pathya')
  }
  if (lower.match(/\b(dosha|vata|pitta|kapha|prakriti|vikriti)\b/)) {
    boostCategories.push('Fundamental Concept', 'Classical Text')
    keywords.push('dosha', 'prakriti')
  }
  if (lower.match(/\b(interaction|allopathy|modern|combine|safe|contraindic)\b/)) {
    boostCategories.push('Allopathy Integration')
    keywords.push('interaction', 'safety')
  }

  return { boostCategories: [...new Set(boostCategories)], keywords: [...new Set(keywords)] }
}

/**
 * Re-rank results with hybrid scoring: semantic + keyword match + category boost.
 */
function hybridRerank(
  results: VectorSearchResult[],
  query: string,
  intent: { boostCategories: string[]; keywords: string[] }
): VectorSearchResult[] {
  const queryWords = new Set(
    query.toLowerCase().split(/\s+/).filter(w => w.length > 3)
  )

  return results.map(r => {
    let boostedRelevance = r.relevance

    // Category boost: +0.15 for matching categories
    if (intent.boostCategories.includes(r.category)) {
      boostedRelevance += 0.15
    }

    // Keyword match boost: count matching words in content
    const contentLower = r.content.toLowerCase()
    let keywordMatches = 0
    for (const word of queryWords) {
      if (contentLower.includes(word)) keywordMatches++
    }
    boostedRelevance += Math.min(keywordMatches * 0.03, 0.12)

    // Intent keyword boost
    for (const kw of intent.keywords) {
      if (contentLower.includes(kw)) boostedRelevance += 0.05
    }

    return { ...r, relevance: Math.min(boostedRelevance, 1.0) }
  }).sort((a, b) => b.relevance - a.relevance)
}

export async function vectorSearch(
  query: string,
  config: VectorRAGConfig = {
    maxResults: 10,
    minRelevance: 0.25,
    includeWHO: true,
    includeAyurKnowledge: true,
  }
): Promise<VectorSearchResult[]> {
  const startTime = Date.now()

  // Check cache
  const cacheKey = `${query}:${config.maxResults}:${config.minRelevance}:${config.includeWHO}:${config.includeAyurKnowledge}`
  const cached = getCachedResults(cacheKey)
  if (cached) {
    console.log('[VectorRAG] Cache hit for query:', query.substring(0, 50))
    return cached
  }

  const results: VectorSearchResult[] = []
  let embeddingUsed = false
  const intent = detectQueryIntent(query)

  // Phase 1: Semantic vector search
  try {
    const queryEmbedding = await generateSearchEmbedding(query)
    embeddingUsed = true

    const { data: semanticResults, error } = await semanticSearch(
      queryEmbedding,
      config.minRelevance,
      config.maxResults * 2, // fetch extra to allow dedup with text search
      undefined // search all source tables
    )

    if (!error && semanticResults && semanticResults.length > 0) {
      for (const r of semanticResults) {
        results.push({
          id: r.id,
          type: 'ayur_knowledge',
          content: r.content,
          source: r.source_title,
          category: mapSourceTableToCategory(r.source_table),
          relevance: r.similarity,
          metadata: {
            source_table: r.source_table,
            source_id: r.source_id,
          },
        })
      }
    }
  } catch (embeddingError) {
    console.error('[VectorRAG] Embedding search failed, falling back to full-text:', embeddingError)
  }

  // Phase 2: Full-text search complement (fill gaps if vector search returned few results)
  if (results.length < config.maxResults) {
    try {
      const remaining = config.maxResults - results.length
      const sourceTables = ['diseases', 'herbs', 'treatments', 'charak_chapters', 'allopathy_integration']
      if (config.includeWHO) sourceTables.push('who_terminology')

      const { data: textResults, error: textError } = await searchKnowledgeBase(
        query,
        sourceTables,
        remaining
      )

      if (!textError && textResults) {
        const existingKeys = new Set(
          results.map(r => `${r.metadata?.source_table}:${r.metadata?.source_id}`)
        )

        for (const tr of textResults) {
          const key = `${tr.source_table}:${tr.source_id}`
          if (!existingKeys.has(key)) {
            existingKeys.add(key)
            results.push({
              id: tr.source_id,
              type: 'ayur_knowledge',
              content: tr.content,
              source: tr.title,
              category: mapSourceTableToCategory(tr.source_table),
              relevance: Math.min(tr.rank * 10, 1.0) * 0.8, // normalize then downweight text search results
              metadata: {
                source_table: tr.source_table,
                source_id: tr.source_id,
              },
            })
          }
        }
      }
    } catch (textError) {
      console.error('[VectorRAG] Full-text search also failed:', textError)
    }
  }

  // Phase 3: Hybrid re-ranking
  const reranked = hybridRerank(results, query, intent)

  // Filter and limit
  const finalResults = reranked
    .filter(r => r.relevance >= config.minRelevance)
    .slice(0, config.maxResults)

  // Cache results
  setCachedResults(cacheKey, finalResults)

  // Log to search history (non-blocking)
  logSearchHistory(query, finalResults.length, embeddingUsed, Date.now() - startTime).catch(() => {})

  console.log('[VectorRAG] Search complete:', {
    query: query.substring(0, 50),
    results: finalResults.length,
    intent: intent.boostCategories,
    timeMs: Date.now() - startTime,
  })

  return finalResults
}

// ─── Context Formatting (preserved exactly) ──────────────────────────────────

export function formatVectorResultsForContext(results: VectorSearchResult[]): string {
  if (results.length === 0) return ''

  // Deduplicate by content similarity (first 100 chars)
  const seen = new Set<string>()
  const deduped = results.filter(r => {
    const key = r.content.substring(0, 100).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // Group by category for structured formatting
  const byCategory = new Map<string, VectorSearchResult[]>()
  for (const r of deduped) {
    const list = byCategory.get(r.category) || []
    list.push(r)
    byCategory.set(r.category, list)
  }

  // Priority order: Diseases > Treatments > Herbs > Classical Text > WHO > Others
  const categoryPriority = [
    'Disease', 'Treatment', 'Herb', 'Classical Text',
    'Allopathy Integration', 'Combined Protocol',
    'Diagnostic Method', 'Fundamental Concept', 'WHO Terminology',
  ]

  const sortedCategories = [...byCategory.entries()].sort((a, b) => {
    const aIdx = categoryPriority.indexOf(a[0])
    const bIdx = categoryPriority.indexOf(b[0])
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx)
  })

  let context = '\n## Relevant Knowledge Base Information:\n\n'
  let totalTokens = 0
  const maxTokens = 3000 // ~12000 chars

  for (const [category, items] of sortedCategories) {
    const categoryHeader = `### ${category}\n`
    const categoryContent = items
      .map(r => {
        const source = r.source ? ` [Source: ${r.source}]` : ''
        return `- ${r.content}${source}`
      })
      .join('\n')

    const section = categoryHeader + categoryContent + '\n\n'
    const sectionTokens = Math.ceil(section.length / 4) // rough token estimate

    if (totalTokens + sectionTokens > maxTokens) {
      // Truncate to fit budget
      const remaining = maxTokens - totalTokens
      if (remaining > 100) {
        context += section.substring(0, remaining * 4) + '\n\n'
      }
      break
    }

    context += section
    totalTokens += sectionTokens
  }

  // Add safety warning if drug interaction results present
  const hasDrugInteraction = deduped.some(r =>
    r.category === 'Allopathy Integration' ||
    r.content.toLowerCase().includes('interaction') ||
    r.content.toLowerCase().includes('contraindication')
  )

  if (hasDrugInteraction) {
    context += '\n**Safety Notice:** Some results involve drug interactions or contraindications. Always verify with current pharmacological references and consult specialists when combining Ayurvedic and modern treatments.\n'
  }

  return context
}

export function getCacheSize(): number {
  return 0
}
