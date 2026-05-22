import 'server-only'
import { getNvidiaClient } from './nvidia-client'
import { searchWebMultiple, formatWebResultsForContext, type WebSearchResult } from './web-search'

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

export interface ComprehensiveResearchContext {
  papers: ResearchPaper[]
  summary: string
  searchQueries: string[]
  totalFound: number
  webResults: WebSearchResult[]
  formattedResearch: string
  formattedWeb: string
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

// Trusted Ayurveda and Traditional Medicine Journals (PubMed abbreviations)
const TRUSTED_AYURVEDA_JOURNALS = [
  'J Ayurveda Integr Med',      // Journal of Ayurveda and Integrative Medicine
  'AYU',                         // An International Quarterly Journal of Research in Ayurveda
  'Int J Ayurveda Res',          // International Journal of Ayurveda Research
  'Anc Sci Life',                // Ancient Science of Life
  'Indian J Tradit Knowl',       // Indian Journal of Traditional Knowledge
  'J Ayurvedic Herb Med',        // Journal of Ayurvedic and Herbal Medicine
  'J Ethnopharmacol',            // Journal of Ethnopharmacology
  'J Altern Complement Med',     // Journal of Alternative and Complementary Medicine
  'BMC Complement Altern Med',   // BMC Complementary and Alternative Medicine
  'Evid Based Complement Alternat Med', // Evidence-Based Complementary and Alternative Medicine
  'Phytomedicine',               // Phytomedicine (herbal research)
  'J Ethnobiol Ethnomed',        // Journal of Ethnobiology and Ethnomedicine
]

function generateSearchQueries(complaints: string, duration: string, diagnosis: string): string[] {
  const queries: string[] = []
  const complaintLower = complaints.toLowerCase()

  // Query 1: Condition + Ayurveda from trusted journals
  const journalQuery = TRUSTED_AYURVEDA_JOURNALS.map(j => `"${j}"[journal]`).join(' OR ')
  queries.push(`(${complaints}) AND (${journalQuery})`)

  // Query 2: Condition + Ayurveda general
  queries.push(`(${complaints}) AND (ayurveda OR ayurvedic OR traditional medicine)`)

  // Query 3: Diagnosis-specific from Ayurveda journals
  if (diagnosis && diagnosis !== 'Based on clinical assessment') {
    queries.push(`(${diagnosis}) AND (${journalQuery})`)
  }

  // Query 4: Condition-specific with Ayurvedic herbs/treatments
  if (complaintLower.includes('joint') || complaintLower.includes('arthritis')) {
    queries.push('(osteoarthritis OR rheumatoid arthritis OR sandhivata OR amavata) AND (ayurvedic OR turmeric OR boswellia OR guggulu OR shallaki)')
    queries.push('(joint pain OR arthralgia) AND (panchakarma OR basti OR ayurvedic) AND (clinical trial OR randomized)')
  }
  if (complaintLower.includes('diabetes') || complaintLower.includes('sugar')) {
    queries.push('(diabetes mellitus OR madhumeha OR prameha) AND (ayurvedic OR gymnema OR bitter melon OR fenugreek OR karela)')
    queries.push('(hyperglycemia OR diabetes) AND (panchakarma OR ayurvedic OR traditional medicine) AND (clinical trial OR study)')
  }
  if (complaintLower.includes('skin') || complaintLower.includes('rash')) {
    queries.push('(dermatitis OR eczema OR psoriasis OR kushtha) AND (ayurvedic OR turmeric OR neem OR manjishtha)')
  }
  if (complaintLower.includes('digest') || complaintLower.includes('acidity') || complaintLower.includes('gastric')) {
    queries.push('(dyspepsia OR GERD OR irritable bowel OR grahani OR amlapitta) AND (ayurvedic OR triphala OR ginger OR hingvastak)')
  }
  if (complaintLower.includes('anxiety') || complaintLower.includes('stress')) {
    queries.push('(anxiety OR stress OR vata vyadhi) AND (ashwagandha OR brahmi OR ayurvedic OR adaptogen)')
  }
  if (complaintLower.includes('hypertension') || complaintLower.includes('blood pressure')) {
    queries.push('(hypertension OR raktagata vata) AND (ayurvedic OR arjuna OR sarpagandha OR garlic)')
  }
  if (complaintLower.includes('asthma') || complaintLower.includes('breath')) {
    queries.push('(asthma OR shwasa OR tamaka shwasa) AND (ayurvedic OR boswellia OR vasa OR pushkarmool)')
  }
  if (complaintLower.includes('insomnia') || complaintLower.includes('sleep')) {
    queries.push('(insomnia OR sleep disorder OR anidra) AND (ashwagandha OR jatamansi OR ayurvedic OR brahmi)')
  }

  // Query 5: General integrative medicine with clinical evidence
  queries.push(`(${complaints}) AND (integrative medicine OR complementary medicine OR clinical trial OR randomized controlled trial)`)

  return queries.slice(0, 8) // Allow more queries for better journal coverage
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

Trusted Ayurveda Journals (give higher relevance to papers from these):
- Journal of Ayurveda and Integrative Medicine (J-AIM)
- AYU - International Quarterly Journal of Research in Ayurveda
- International Journal of Ayurveda Research
- Ancient Science of Life
- Indian Journal of Traditional Knowledge
- Journal of Ethnopharmacology
- Evidence-Based Complementary and Alternative Medicine
- BMC Complementary and Alternative Medicine

Analyze each paper below for relevance to this patient's condition. For each paper, provide:
1. A relevance score (1-10, where 10 = highly relevant). Boost by +2 if from a trusted Ayurveda journal above.
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

Only include papers with relevance score >= 5. Prioritize clinical trials, systematic reviews, and papers from trusted Ayurveda journals. Be concise.`

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

  const sorted = analyzedPapers.sort((a, b) => b.relevanceScore - a.relevanceScore)

  // Ensure at least 10 papers: lower threshold to 4 if needed
  const highRelevance = sorted.filter(p => p.relevanceScore >= 5)
  if (highRelevance.length >= 10) {
    return highRelevance.slice(0, 15)
  }

  // Lower threshold to get more papers
  const broaderSet = sorted.filter(p => p.relevanceScore >= 4)
  return broaderSet.slice(0, 15)
}

export function formatResearchForProtocol(context: { papers: ResearchPaper[]; summary: string }): string {
  if (context.papers.length === 0) return ''

  let output = `## Research Evidence (${context.papers.length} papers analyzed from PubMed)\n\n`
  output += `*${context.summary}*\n\n`

  output += `| # | Paper | Journal | Year | Relevance |\n`
  output += `|---|-------|---------|------|----------|\n`

  for (let i = 0; i < context.papers.length; i++) {
    const p = context.papers[i]
    output += `| ${i + 1} | ${p.title.slice(0, 80)}${p.title.length > 80 ? '...' : ''} | ${p.journal} | ${p.year} | ${p.relevanceScore}/10 |\n`
  }

  output += `\n### Detailed Research Findings\n\n`
  for (let i = 0; i < context.papers.length; i++) {
    const paper = context.papers[i]
    output += `**[${i + 1}] ${paper.title}**\n`
    output += `- Authors: ${paper.authors}\n`
    output += `- Journal: ${paper.journal} (${paper.year})\n`
    if (paper.abstract) {
      output += `- Abstract: ${paper.abstract.slice(0, 500)}${paper.abstract.length > 500 ? '...' : ''}\n`
    }
    output += `- Key Findings: ${paper.keyFindings}\n`
    output += `- Ayurvedic Relevance: ${paper.ayurvedicRelevance}\n`
    if (paper.doi) {
      output += `- DOI: https://doi.org/${paper.doi}\n`
    }
    output += `- PMID: ${paper.pmid}\n`
    output += `\n`
  }

  return output
}

export async function getComprehensiveResearchContext(
  complaints: string,
  duration: string,
  diagnosis: string,
  prakriti: string = ''
): Promise<ComprehensiveResearchContext> {
  console.log('[Research] Starting comprehensive research analysis for:', { complaints, diagnosis })

  // Run PubMed search (reuse existing logic inline)
  const patientContext = `Complaints: ${complaints}, Duration: ${duration}, Diagnosis: ${diagnosis}, Prakriti: ${prakriti}`
  const queries = generateSearchQueries(complaints, duration, diagnosis)
  console.log('[Research] Generated', queries.length, 'search queries')

  const allPmids = new Set<string>()
  for (const query of queries) {
    const pmids = await searchPubMed(query, 20)
    for (const pmid of pmids) allPmids.add(pmid)
  }
  const uniquePmids = Array.from(allPmids).slice(0, 40)
  console.log('[Research] Total unique papers found:', uniquePmids.length)

  // Run PubMed and web search in parallel
  const [papers, webResults] = await Promise.all([
    (async () => {
      if (uniquePmids.length === 0) return []
      const rawPapers = await fetchAbstracts(uniquePmids)
      return analyzePapersWithLLM(rawPapers, patientContext)
    })(),
    searchWebMultiple(
      [
        `${complaints} ayurvedic treatment evidence`,
        `${diagnosis || complaints} panchakarma clinical study`,
        `${complaints} integrative medicine systematic review`,
      ],
      3
    ),
  ])

  console.log('[Research] Analyzed', papers.length, 'papers and found', webResults.length, 'web results')

  const summary = papers.length > 0
    ? `Found ${papers.length} relevant research papers from PubMed and ${webResults.length} supplementary web sources. Key themes: ${
      [...new Set(papers.map(p => p.ayurvedicRelevance))].slice(0, 3).join('; ')
    }`
    : `Limited PubMed research available. Found ${webResults.length} supplementary web sources.`

  return {
    papers,
    summary,
    searchQueries: queries,
    totalFound: allPmids.size,
    webResults,
    formattedResearch: formatResearchForProtocol({ papers, summary }),
    formattedWeb: formatWebResultsForContext(webResults),
  }
}
