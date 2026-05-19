import 'server-only'
import { getNvidiaClient } from './nvidia-client'

export interface ResearchPaper {
  pmid: string
  title: string
  authors: string
  journal: string
  year: string
  abstract: string
  doi: string
  relevanceScore: number
  keyFindings: string
  ayurvedicRelevance: string
}

export interface ResearchContext {
  papers: ResearchPaper[]
  summary: string
  searchQueries: string[]
  totalFound: number
}

const PUBMED_SEARCH_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
const PUBMED_FETCH_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'

async function searchPubMed(query: string, maxResults: number = 20): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      db: 'pubmed',
      term: query,
      retmax: String(maxResults),
      retmode: 'json',
      sort: 'relevance',
      datetype: 'pdat',
      reldate: '3650',
    })

    const response = await fetch(`${PUBMED_SEARCH_URL}?${params}`)
    if (!response.ok) {
      console.error('[Research] PubMed search failed:', response.status)
      return []
    }

    const data = await response.json()
    return data.esearchresult?.idlist || []
  } catch (error) {
    console.error('[Research] PubMed search error:', error)
    return []
  }
}

async function fetchAbstracts(pmids: string[]): Promise<Array<{
  pmid: string
  title: string
  authors: string
  journal: string
  year: string
  abstract: string
  doi: string
}>> {
  if (pmids.length === 0) return []

  try {
    const params = new URLSearchParams({
      db: 'pubmed',
      id: pmids.join(','),
      retmode: 'xml',
      rettype: 'abstract',
    })

    const response = await fetch(`${PUBMED_FETCH_URL}?${params}`)
    if (!response.ok) {
      console.error('[Research] PubMed fetch failed:', response.status)
      return []
    }

    const xmlText = await response.text()
    return parsePubMedXML(xmlText)
  } catch (error) {
    console.error('[Research] PubMed fetch error:', error)
    return []
  }
}

function parsePubMedXML(xml: string): Array<{
  pmid: string
  title: string
  authors: string
  journal: string
  year: string
  abstract: string
  doi: string
}> {
  const papers: Array<{
    pmid: string
    title: string
    authors: string
    journal: string
    year: string
    abstract: string
    doi: string
  }> = []

  const articleBlocks = xml.split('<PubmedArticle>')

  for (let i = 1; i < articleBlocks.length; i++) {
    const block = articleBlocks[i]

    const pmid = extractXMLValue(block, 'PMID') || ''
    const title = extractXMLValue(block, 'ArticleTitle') || ''
    const journal = extractXMLValue(block, 'Title') || extractXMLValue(block, 'ISOAbbreviation') || ''
    const year = extractXMLValue(block, 'Year') || ''
    const abstract = extractXMLValue(block, 'AbstractText') || ''

    const authorMatches = block.match(/<Author[^>]*>[\s\S]*?<\/Author>/g) || []
    const authorNames = authorMatches.map(a => {
      const lastName = extractXMLValue(a, 'LastName') || ''
      const initials = extractXMLValue(a, 'Initials') || ''
      return lastName ? `${lastName} ${initials}` : ''
    }).filter(Boolean).slice(0, 3).join(', ')

    const doiMatch = block.match(/<ArticleId IdType="doi">([^<]+)<\/ArticleId>/)
    const doi = doiMatch ? doiMatch[1] : ''

    if (pmid && title) {
      papers.push({
        pmid,
        title: decodeXMLEntities(title),
        authors: authorNames,
        journal: decodeXMLEntities(journal),
        year,
        abstract: decodeXMLEntities(abstract),
        doi,
      })
    }
  }

  return papers
}

function extractXMLValue(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : null
}

function decodeXMLEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/<[^>]+>/g, '')
}

function generateSearchQueries(complaints: string, duration: string, diagnosis: string): string[] {
  const queries: string[] = []
  const complaintLower = complaints.toLowerCase()

  queries.push(`(${complaints}) AND (ayurveda OR ayurvedic OR traditional medicine)`)

  if (diagnosis && diagnosis !== 'Based on clinical assessment') {
    queries.push(`(${diagnosis}) AND (ayurveda OR ayurvedic OR herbal OR panchakarma)`)
  }

  if (complaintLower.includes('joint') || complaintLower.includes('arthritis')) {
    queries.push('(osteoarthritis OR rheumatoid arthritis) AND (ayurvedic OR turmeric OR boswellia OR guggulu)')
    queries.push('(joint pain OR arthralgia) AND (anti-inflammatory OR herbal OR traditional medicine)')
  }
  if (complaintLower.includes('diabetes') || complaintLower.includes('sugar')) {
    queries.push('(diabetes mellitus type 2) AND (ayurvedic OR gymnema OR bitter melon OR fenugreek)')
    queries.push('(hyperglycemia OR diabetes) AND (herbal OR traditional medicine OR integrative)')
  }
  if (complaintLower.includes('skin') || complaintLower.includes('rash')) {
    queries.push('(dermatitis OR eczema OR psoriasis) AND (ayurvedic OR herbal OR turmeric OR neem)')
  }
  if (complaintLower.includes('digest') || complaintLower.includes('acidity') || complaintLower.includes('gastric')) {
    queries.push('(dyspepsia OR GERD OR irritable bowel) AND (ayurvedic OR herbal OR ginger OR triphala)')
  }
  if (complaintLower.includes('anxiety') || complaintLower.includes('stress')) {
    queries.push('(anxiety OR stress) AND (ashwagandha OR ayurvedic OR adaptogen OR herbal)')
  }
  if (complaintLower.includes('hypertension') || complaintLower.includes('blood pressure')) {
    queries.push('(hypertension OR blood pressure) AND (ayurvedic OR arjuna OR garlic OR herbal)')
  }
  if (complaintLower.includes('asthma') || complaintLower.includes('breath')) {
    queries.push('(asthma OR respiratory) AND (ayurvedic OR boswellia OR traditional medicine)')
  }
  if (complaintLower.includes('insomnia') || complaintLower.includes('sleep')) {
    queries.push('(insomnia OR sleep disorder) AND (ayurvedic OR ashwagandha OR valerian OR herbal)')
  }

  queries.push(`(${complaints}) AND (integrative medicine OR complementary medicine OR clinical trial)`)

  return queries.slice(0, 5)
}

async function analyzePapersWithLLM(
  papers: Array<{ pmid: string; title: string; abstract: string; authors: string; journal: string; year: string; doi: string }>,
  patientContext: string
): Promise<ResearchPaper[]> {
  if (papers.length === 0) return []

  const client = getNvidiaClient()
  const batchSize = 5
  const analyzedPapers: ResearchPaper[] = []

  for (let i = 0; i < papers.length; i += batchSize) {
    const batch = papers.slice(i, i + batchSize)

    const papersText = batch.map((p, idx) => `
Paper ${idx + 1}:
Title: ${p.title}
Authors: ${p.authors}
Journal: ${p.journal} (${p.year})
PMID: ${p.pmid}
DOI: ${p.doi}
Abstract: ${p.abstract || 'No abstract available'}
`).join('\n---\n')

    const prompt = `You are analyzing research papers for an Ayurvedic clinical assistant.

Patient Context: ${patientContext}

Analyze each paper below for relevance to this patient's condition. For each paper, provide:
1. A relevance score (1-10, where 10 = highly relevant)
2. Key findings (2-3 sentences)
3. Ayurvedic relevance (how this relates to Ayurvedic treatment approaches)

${papersText}

Respond in JSON format (array):
[
  {
    "pmid": "...",
    "relevanceScore": 8,
    "keyFindings": "...",
    "ayurvedicRelevance": "..."
  }
]

Only include papers with relevance score >= 5. Be concise.`

    try {
      const response = await client.chat.completions.create({
        model: 'meta/llama-3.3-70b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.3,
      })

      const content = response.choices[0]?.message?.content || '[]'
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const analyses = JSON.parse(jsonMatch[0])

        for (const analysis of analyses) {
          const paper = batch.find(p => p.pmid === analysis.pmid)
          if (paper && analysis.relevanceScore >= 5) {
            analyzedPapers.push({
              pmid: paper.pmid,
              title: paper.title,
              authors: paper.authors,
              journal: paper.journal,
              year: paper.year,
              abstract: paper.abstract,
              doi: paper.doi,
              relevanceScore: analysis.relevanceScore,
              keyFindings: analysis.keyFindings,
              ayurvedicRelevance: analysis.ayurvedicRelevance,
            })
          }
        }
      }
    } catch (error) {
      console.error('[Research] LLM analysis error:', error)
      for (const paper of batch) {
        analyzedPapers.push({
          pmid: paper.pmid,
          title: paper.title,
          authors: paper.authors,
          journal: paper.journal,
          year: paper.year,
          abstract: paper.abstract,
          doi: paper.doi,
          relevanceScore: 5,
          keyFindings: 'Analysis pending',
          ayurvedicRelevance: 'To be evaluated',
        })
      }
    }
  }

  return analyzedPapers
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 12)
}

export async function getResearchContext(
  complaints: string,
  duration: string,
  diagnosis: string,
  prakriti: string = ''
): Promise<ResearchContext> {
  console.log('[Research] Starting research analysis for:', { complaints, diagnosis })

  const patientContext = `Complaints: ${complaints}, Duration: ${duration}, Diagnosis: ${diagnosis}, Prakriti: ${prakriti}`

  const queries = generateSearchQueries(complaints, duration, diagnosis)
  console.log('[Research] Generated', queries.length, 'search queries')

  const allPmids = new Set<string>()
  for (const query of queries) {
    const pmids = await searchPubMed(query, 15)
    for (const pmid of pmids) {
      allPmids.add(pmid)
    }
    console.log('[Research] Query found', pmids.length, 'papers')
  }

  const uniquePmids = Array.from(allPmids).slice(0, 30)
  console.log('[Research] Total unique papers found:', uniquePmids.length)

  if (uniquePmids.length === 0) {
    return {
      papers: [],
      summary: 'No relevant research papers found in PubMed for this condition.',
      searchQueries: queries,
      totalFound: 0,
    }
  }

  const papers = await fetchAbstracts(uniquePmids)
  console.log('[Research] Fetched', papers.length, 'abstracts')

  const analyzedPapers = await analyzePapersWithLLM(papers, patientContext)
  console.log('[Research] Analyzed and selected', analyzedPapers.length, 'relevant papers')

  const summary = analyzedPapers.length > 0
    ? `Found ${analyzedPapers.length} relevant research papers from PubMed. Key themes: ${
      [...new Set(analyzedPapers.map(p => p.ayurvedicRelevance))].slice(0, 3).join('; ')
    }`
    : 'Limited research available for this specific condition.'

  return {
    papers: analyzedPapers,
    summary,
    searchQueries: queries,
    totalFound: allPmids.size,
  }
}

export function formatResearchForProtocol(context: ResearchContext): string {
  if (context.papers.length === 0) return ''

  let output = `## Research Evidence (${context.papers.length} papers analyzed)\n\n`
  output += `*${context.summary}*\n\n`

  output += `| # | Paper | Journal | Year | Relevance |\n`
  output += `|---|-------|---------|------|----------|\n`

  for (let i = 0; i < context.papers.length; i++) {
    const p = context.papers[i]
    output += `| ${i + 1} | ${p.title.slice(0, 80)}${p.title.length > 80 ? '...' : ''} | ${p.journal} | ${p.year} | ${p.relevanceScore}/10 |\n`
  }

  output += `\n### Key Research Findings\n\n`
  for (const paper of context.papers.slice(0, 6)) {
    output += `**${paper.title.slice(0, 60)}** (${paper.authors}, ${paper.year})\n`
    output += `- Findings: ${paper.keyFindings}\n`
    output += `- Ayurvedic Relevance: ${paper.ayurvedicRelevance}\n\n`
  }

  return output
}
