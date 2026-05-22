export interface WebSearchResult {
  title: string
  snippet: string
  url: string
}

let lastSearchTime = 0

async function rateLimitedFetch(url: string, options?: RequestInit): Promise<Response> {
  const now = Date.now()
  const elapsed = now - lastSearchTime
  if (elapsed < 1200) {
    await new Promise((r) => setTimeout(r, 1200 - elapsed))
  }
  lastSearchTime = Date.now()
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      ...options?.headers,
    },
  })
}

function parseHTMLResults(html: string, maxResults: number): WebSearchResult[] {
  const results: WebSearchResult[] = []

  // DuckDuckGo HTML result blocks: <a class="result__a" href="...">title</a>
  // and <a class="result__snippet" ...>snippet</a>
  const resultBlocks = html.split(/class="result\s/)
  for (let i = 1; i < resultBlocks.length && results.length < maxResults; i++) {
    const block = resultBlocks[i]

    // Extract URL from result__a tag
    const linkMatch = block.match(/<a\s+class="result__a"[^>]*href="([^"]*)"/)
    // Extract title
    const titleMatch = block.match(/<a\s+class="result__a"[^>]*>([\s\S]*?)<\/a>/)
    // Extract snippet
    const snippetMatch = block.match(/<a\s+class="result__snippet"[^>]*>([\s\S]*?)<\/a>/)

    if (linkMatch && titleMatch) {
      const url = decodeURIComponent(linkMatch[1].replace(/.*uddg=/, '').replace(/&.*/, ''))
      const title = titleMatch[1].replace(/<[^>]+>/g, '').trim()
      const snippet = snippetMatch
        ? snippetMatch[1].replace(/<[^>]+>/g, '').trim()
        : ''

      if (title && url.startsWith('http')) {
        results.push({ title, snippet, url })
      }
    }
  }

  return results
}

export async function searchWeb(
  query: string,
  maxResults: number = 5
): Promise<WebSearchResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query)
    const url = `https://html.duckduckgo.com/html/?q=${encodedQuery}`
    const response = await rateLimitedFetch(url)

    if (!response.ok) {
      console.warn(`[WebSearch] HTTP ${response.status} for query: ${query}`)
      return []
    }

    const html = await response.text()
    const results = parseHTMLResults(html, maxResults)

    console.log(`[WebSearch] Found ${results.length} results for: ${query}`)
    return results
  } catch (error) {
    console.warn(`[WebSearch] Failed for query "${query}":`, error)
    return []
  }
}

export async function searchWebMultiple(
  queries: string[],
  maxResultsPerQuery: number = 3
): Promise<WebSearchResult[]> {
  const allResults: WebSearchResult[] = []
  const seenUrls = new Set<string>()

  for (const query of queries) {
    const results = await searchWeb(query, maxResultsPerQuery)
    for (const result of results) {
      if (!seenUrls.has(result.url)) {
        seenUrls.add(result.url)
        allResults.push(result)
      }
    }
  }

  return allResults
}

export function formatWebResultsForContext(results: WebSearchResult[]): string {
  if (results.length === 0) return ''

  const sections = results.map(
    (r, i) =>
      `[W${i + 1}] ${r.title}\nURL: ${r.url}\n${r.snippet}`
  )

  return `## Supplementary Web Search Results\n\n${sections.join('\n\n')}`
}
