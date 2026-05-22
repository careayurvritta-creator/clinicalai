'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ProtocolSection {
  id: string
  title: string
  content: string
  icon: string
}

function parseProtocolSections(markdown: string): ProtocolSection[] {
  const sections: ProtocolSection[] = []
  const sectionPattern = /^## (.+)$/gm
  const matches = [...markdown.matchAll(sectionPattern)]

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : markdown.length
    const title = matches[i][1].trim()
    const content = markdown.slice(start, end).trim()

    if (content.length > 0) {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      sections.push({ id, title, content, icon: getSectionIcon(title) })
    }
  }

  // If no sections found, treat entire content as one section
  if (sections.length === 0 && markdown.trim().length > 0) {
    sections.push({
      id: 'protocol',
      title: 'Treatment Protocol',
      content: markdown.trim(),
      icon: '',
    })
  }

  return sections
}

function getSectionIcon(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('case summary') || t.includes('patient')) return 'Patient'
  if (t.includes('samprapti') || t.includes('pathogenesis')) return 'Analysis'
  if (t.includes('literature') || t.includes('research') || t.includes('evidence')) return 'Research'
  if (t.includes('classical') || t.includes('charak') || t.includes('reference')) return 'Texts'
  if (t.includes('treatment protocol') || t.includes('detailed treatment')) return 'Protocol'
  if (t.includes('purvakarma')) return 'Prep'
  if (t.includes('pradhana') || t.includes('panchakarma')) return 'Panchakarma'
  if (t.includes('paschat')) return 'Recovery'
  if (t.includes('herbal') || t.includes('formulation')) return 'Herbs'
  if (t.includes('diet') || t.includes('pathya') || t.includes('apathya')) return 'Diet'
  if (t.includes('dinacharya') || t.includes('lifestyle') || t.includes('yoga')) return 'Lifestyle'
  if (t.includes('monitoring') || t.includes('follow')) return 'Follow-up'
  if (t.includes('precaution') || t.includes('contraindication') || t.includes('safety')) return 'Safety'
  if (t.includes('reference')) return 'References'
  return ''
}

const sectionStyles: Record<string, string> = {
  'Patient': 'border-l-blue-500 bg-blue-500/5',
  'Analysis': 'border-l-purple-500 bg-purple-500/5',
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
  'References': 'border-l-slate-400 bg-slate-500/5',
}

function SectionCard({ section }: { section: ProtocolSection }) {
  const style = sectionStyles[section.icon] || 'border-l-gray-500 bg-gray-500/5'

  return (
    <div
      id={section.id}
      className={`border-l-4 ${style} rounded-r-lg p-4 md:p-6 mb-4 protocol-section`}
    >
      <div className="flex items-center gap-2 mb-3">
        {section.icon && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background/50 text-muted-foreground">
            {section.icon}
          </span>
        )}
        <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
      </div>
      <div className="prose prose-sm prose-invert max-w-none protocol-content">
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

  return (
    <div className="protocol-document" id="protocol-document">
      {/* Table of Contents */}
      {sections.length > 3 && (
        <nav className="mb-6 p-4 rounded-lg bg-muted/30 border border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Contents</h4>
          <div className="grid grid-cols-2 gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate py-0.5"
              >
                {s.icon} {s.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Sections */}
      {sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  )
}
