'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ProtocolSection {
  id: string
  title: string
  rawTitle: string
  content: string
  icon: string
  sectionNumber: string | null
  isAbstract: boolean
  isKeywords: boolean
  isConflict: boolean
  isDisclaimer: boolean
  isConclusion: boolean
  isReferences: boolean
}

function parseProtocolSections(markdown: string): ProtocolSection[] {
  const sections: ProtocolSection[] = []
  const sectionPattern = /^## (.+)$/gm
  const matches = [...markdown.matchAll(sectionPattern)]

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : markdown.length
    const rawTitle = matches[i][1].trim()
    const content = markdown.slice(start, end).trim()

    if (content.length > 0) {
      const id = rawTitle
        .replace(/^\d+\.\s*/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      // Extract section number prefix (e.g., "2." from "2. Case Presentation")
      const numMatch = rawTitle.match(/^(\d+)\.\s*/)
      const sectionNumber = numMatch ? numMatch[1] : null

      const titleClean = rawTitle.replace(/^\d+\.\s*/, '').trim()
      const t = titleClean.toLowerCase()

      sections.push({
        id,
        title: titleClean,
        rawTitle,
        content,
        icon: getSectionIcon(titleClean),
        sectionNumber,
        isAbstract: t === 'abstract',
        isKeywords: t === 'keywords',
        isConflict: t.includes('conflict of interest'),
        isDisclaimer: t === 'disclaimer',
        isConclusion: t === 'conclusion',
        isReferences: t === 'references',
      })
    }
  }

  // If no sections found, treat entire content as one section
  if (sections.length === 0 && markdown.trim().length > 0) {
    sections.push({
      id: 'protocol',
      title: 'Treatment Protocol',
      rawTitle: 'Treatment Protocol',
      content: markdown.trim(),
      icon: '',
      sectionNumber: null,
      isAbstract: false,
      isKeywords: false,
      isConflict: false,
      isDisclaimer: false,
      isConclusion: false,
      isReferences: false,
    })
  }

  return sections
}

function getSectionIcon(title: string): string {
  const t = title.toLowerCase()
  if (t === 'abstract') return 'Abstract'
  if (t === 'keywords') return 'Keywords'
  if (t.includes('introduction')) return 'Intro'
  if (t.includes('case presentation') || t.includes('patient') || t.includes('demographics')) return 'Case'
  if (t.includes('diagnostic') || t.includes('samprapti') || t.includes('pathogenesis')) return 'Diagnosis'
  if (t.includes('literature') || t.includes('research') || t.includes('evidence')) return 'Research'
  if (t.includes('classical') || t.includes('charak') || t.includes('text reference')) return 'Texts'
  if (t.includes('treatment protocol')) return 'Protocol'
  if (t.includes('purvakarma')) return 'Prep'
  if (t.includes('pradhana') || t.includes('panchakarma')) return 'Panchakarma'
  if (t.includes('paschat')) return 'Recovery'
  if (t.includes('pharmacotherapy') || t.includes('herbal') || t.includes('formulation')) return 'Herbs'
  if (t.includes('pathya') || t.includes('apathya') || t.includes('diet')) return 'Diet'
  if (t.includes('dinacharya') || t.includes('lifestyle') || t.includes('yoga')) return 'Lifestyle'
  if (t.includes('monitoring') || t.includes('follow')) return 'Follow-up'
  if (t.includes('precaution') || t.includes('safety')) return 'Safety'
  if (t === 'conclusion') return 'Conclusion'
  if (t === 'references') return 'References'
  if (t.includes('conflict')) return 'COI'
  if (t === 'disclaimer') return 'Disclaimer'
  return ''
}

const sectionStyles: Record<string, string> = {
  'Abstract': 'border-l-violet-500 bg-violet-500/5',
  'Keywords': 'border-l-violet-400 bg-violet-500/5',
  'Intro': 'border-l-sky-500 bg-sky-500/5',
  'Case': 'border-l-blue-500 bg-blue-500/5',
  'Diagnosis': 'border-l-purple-500 bg-purple-500/5',
  'Research': 'border-l-cyan-500 bg-cyan-500/5',
  'Texts': 'border-l-amber-500 bg-amber-500/5',
  'Protocol': 'border-l-green-500 bg-green-500/5',
  'Prep': 'border-l-emerald-500 bg-emerald-500/5',
  'Panchakarma': 'border-l-teal-500 bg-teal-500/5',
  'Recovery': 'border-l-sky-500 bg-sky-500/5',
  'Herbs': 'border-l-lime-500 bg-lime-500/5',
  'Diet': 'border-l-orange-500 bg-orange-500/5',
  'Lifestyle': 'border-l-pink-500 bg-pink-500/5',
  'Follow-up': 'border-l-indigo-500 bg-indigo-500/5',
  'Safety': 'border-l-red-500 bg-red-500/5',
  'Conclusion': 'border-l-slate-500 bg-slate-500/5',
  'References': 'border-l-slate-400 bg-slate-500/5',
  'COI': 'border-l-gray-400 bg-gray-500/5',
  'Disclaimer': 'border-l-gray-400 bg-gray-500/5',
}

function SectionCard({ section }: { section: ProtocolSection }) {
  const style = sectionStyles[section.icon] || 'border-l-gray-500 bg-gray-500/5'

  return (
    <div
      id={section.id}
      className={`border-l-4 ${style} rounded-r-lg p-4 md:p-6 mb-4 protocol-section`}
    >
      <div className="flex items-center gap-3 mb-3">
        {section.sectionNumber && (
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
            {section.sectionNumber}
          </span>
        )}
        {section.icon && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background/50 text-muted-foreground flex-shrink-0">
            {section.icon}
          </span>
        )}
        <h3 className="text-base font-semibold text-foreground">{section.rawTitle}</h3>
      </div>
      <div className="prose prose-sm prose-invert max-w-none protocol-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

function AbstractBlock({ section }: { section: ProtocolSection }) {
  return (
    <div id={section.id} className="mb-6 p-5 rounded-lg border border-violet-500/30 bg-violet-500/5 protocol-section">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold">
          A
        </span>
        <h3 className="text-lg font-bold text-foreground tracking-wide">Abstract</h3>
      </div>
      <div className="prose prose-sm prose-invert max-w-none protocol-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

function KeywordsBlock({ section }: { section: ProtocolSection }) {
  return (
    <div id={section.id} className="mb-6 p-4 rounded-lg border border-violet-400/20 bg-violet-500/5 protocol-section">
      <h3 className="text-sm font-bold text-foreground mb-2">Keywords</h3>
      <div className="prose prose-sm prose-invert max-w-none protocol-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

function FooterBlock({ section }: { section: ProtocolSection }) {
  return (
    <div
      id={section.id}
      className="mt-2 p-4 rounded-lg border border-border/50 bg-muted/20 text-sm text-muted-foreground protocol-section"
    >
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-2">
        {section.rawTitle}
      </h4>
      <div className="prose prose-xs prose-invert max-w-none protocol-content opacity-80">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {section.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export function ProtocolRenderer({ content }: { content: string }) {
  const sections = parseProtocolSections(content)

  if (sections.length === 0) {
    return (
      <div className="prose prose-sm prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    )
  }

  const mainSections = sections.filter(s => !s.isAbstract && !s.isKeywords && !s.isConflict && !s.isDisclaimer)
  const abstractSection = sections.find(s => s.isAbstract)
  const keywordsSection = sections.find(s => s.isKeywords)
  const footerSections = sections.filter(s => s.isConflict || s.isDisclaimer)

  return (
    <div className="protocol-document" id="protocol-document">
      {/* Table of Contents */}
      {sections.length > 4 && (
        <nav className="mb-6 p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 tracking-wide uppercase">Contents</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate py-0.5 flex items-center gap-1.5"
              >
                {s.sectionNumber && (
                  <span className="text-primary/70 font-mono">{s.sectionNumber}.</span>
                )}
                {s.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Abstract */}
      {abstractSection && <AbstractBlock section={abstractSection} />}

      {/* Keywords */}
      {keywordsSection && <KeywordsBlock section={keywordsSection} />}

      {/* Main Sections */}
      {mainSections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}

      {/* Footer sections (COI + Disclaimer) */}
      {footerSections.map((section) => (
        <FooterBlock key={section.id} section={section} />
      ))}
    </div>
  )
}
