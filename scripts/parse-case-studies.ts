/**
 * WhatsApp Case Study Parser
 *
 * Parses the exported WhatsApp chat from D'vakaso AYUR CASE STUDIES group
 * into structured JSON for RAG ingestion.
 *
 * Usage:
 *   npx tsx scripts/parse-case-studies.ts                    # parse + write JSON
 *   npx tsx scripts/parse-case-studies.ts --dry-run          # show stats only
 *   npx tsx scripts/parse-case-studies.ts --validate         # validate all cases
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Config ───────────────────────────────────────────────────────────────────
const INPUT_PATH = path.join(process.cwd(), 'Ayur case-studies',
  'WhatsApp Chat with 2️⃣D\'vakaso-AYUR CASE- STUDIES 📄',
  'WhatsApp Chat with 2️⃣D\'vakaso-AYUR CASE- STUDIES 📄.txt')
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'lib', 'ayurknowledge', 'case-studies.json')

// ─── Types ────────────────────────────────────────────────────────────────────
interface CaseStudy {
  caseNumber: number
  diseaseName: string
  modernName: string
  part1Sections: {
    nidanaam: string[]
    purvaroopam: string[]
    lakshanam: string[]
    systemicExam: string[]
    labInvestigations: string[]
  }
  part2Sections: {
    differentialDiagnosis: string[]
    samprapti: string
    sampraptiGhataka: string[]
    upashaya: string[]
    anupashaya: string[]
    samanyaChikitsa: string[]
    visheshaChikitsa: string[]
    surgicalManagement: string[]
  }
  references: string[]
  rawPart1: string
  rawPart2: string
}

interface WhatsAppMessage {
  sender: string
  content: string
}

// ─── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_LINE_RE = /^\d{2}\/\d{2}\/\d{2},\s+\d{1,2}:\d{2}\s*[ap]m\s*-\s+(.+?)(?::\s(.*))?$/
const CASE_STUDY_RE = /CASE\s+STUDY\s*[:\s-]*NO\s*[:\s]*(\d+)/i
const PART_NO_RE = /PART\s+NO[N]?\s*[:\s]*(\d+)/i
const STOP_MARKER_RE = /^[\u{1F6D1}\u{1F3AF}\u{2B55}]\s*(https:\/\/chat\.whatsapp\.com.*)?$/u
const WHATSAPP_LINK_RE = /^https:\/\/chat\.whatsapp\.com\//
const EDITED_SUFFIX_RE = /\s*<This message was edited>\s*$/

// Check if line starts with a section header marker (triangle emoji or Devanagari prefix)
function isSectionHeader(line: string): boolean {
  return /^\s*[\u{1F53A}\u{1F53B}]/u.test(line) || /^\s*[\u0900-\u097F]/u.test(line)
}

// Section header matching by content (after stripping emoji + Devanagari prefix)
function matchSection(line: string): string | null {
  // Strip leading emoji (surrogate pairs) and Devanagari characters
  const stripped = line
    .replace(/^[\u{1F53A}\u{1F53B}\u{1F4CC}\u{1F538}\u{1F539}\u{25AB}\u{25AA}]\s*/u, '')
    .replace(/^[\u0900-\u097F]+[\s()]*/, '')
    .trim()
  const upper = stripped.toUpperCase()

  if (/^NIDAN/.test(upper)) return 'nidanaam'
  if (/^P[OUU]+RVA?R[OUU]+PA/.test(upper)) return 'purvaroopam'
  if (/^LAKSH?A?NA/.test(upper)) return 'lakshanam'
  if (/^(GENERAL\s+)?(SYSTEMIC\s+)?EXAMINATION/.test(upper)) return 'systemicExam'
  if (/^LABORATORY\s+(INVESTIGATION|EXAMINATION)/.test(upper)) return 'labInvestigations'
  if (/^SPUTUM\s+EXAMINATION/.test(upper)) return 'sputumExam'
  if (/^DIFFERENTIAL\s+DIAGNOSIS/.test(upper)) return 'differentialDiagnosis'
  if (/^SAMPRAPTI/.test(upper)) return 'samprapti'
  if (/^UP[AE]SHAYA/.test(upper)) return 'upashaya'
  if (/^ANUP[AE]SHAYA/.test(upper)) return 'anupashaya'
  if (/^SAMANYA\s+CHIKITSA/.test(upper)) return 'samanyaChikitsa'
  if (/^VIS?H?ES/.test(upper) && /CHIKITSA/.test(upper)) return 'visheshaChikitsa'
  if (/^SURGICAL\s+MANAGEMENT/.test(upper)) return 'surgicalManagement'

  return null
}

// Sub-section header pattern (within samprapti)
const SAMPRAPTI_GHATAKA_RE = /SAMPRAPTI\s+GHATAKA/i

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripPhoneNumbers(text: string): string {
  return text.replace(/\+\d{1,3}\s?\d{4,5}\s?\d{5,6}/g, '[REDACTED]')
}

function stripEditedSuffix(line: string): string {
  return line.replace(EDITED_SUFFIX_RE, '')
}

function stripBullet(line: string): string {
  return line
    .replace(/^\s*[-*•\u{1F4CC}\u{1F538}\u{1F539}\u{25AB}\u{25AA}\u{FE0F}]\s*/u, '')
    .replace(/^\s*[\u{1F53A}\u{1F53B}]\s*/u, '')
    .replace(/^\s*[\u0900-\u097F]+[\s()]*/, '')
    .trim()
}

function isNoiseMessage(content: string, sender: string): boolean {
  const c = content.trim()
  // System messages
  if (c.includes('joined using a group link') ||
      c.includes('created group') ||
      c.includes('changed the group name') ||
      c.includes('changed this group') ||
      c.endsWith(' left') ||
      c === 'This message was deleted' ||
      c.includes('end-to-end encrypted') ||
      c.includes('file attached') ||
      c.includes('Waiting for this message') ||
      c === '‎image omitted' ||
      c === '‎sticker omitted' ||
      c === '‎video omitted' ||
      c === '‎audio omitted' ||
      c === '‎document omitted') return true

  // Promotional sender
  if (/Dr\s+sonu\s+kailas/i.test(sender)) return true

  // Promotional content patterns
  if (/[📣🎓🗓💻🧾💰⭕✨🔹🔍]/.test(c) &&
      /(FEES|OFFER|COURSE|MOCK|VACANCIES|WEBINAR|SEAT|FACULTY|REGISTRATION|UPI|MODULE)/i.test(c)) return true

  return false
}

function isSeparatorMessage(content: string): boolean {
  const c = content.trim()
  return STOP_MARKER_RE.test(c) || WHATSAPP_LINK_RE.test(c)
}

function extractReferences(text: string): { cleaned: string; references: string[] } {
  const refs: string[] = []

  // Pattern: References: / Reference: / Ref: followed by text
  const refLineRe = /(?:References?|Ref)\s*[:\-]\s*\(?(.+?)\)?$/gim
  let match
  while ((match = refLineRe.exec(text)) !== null) {
    refs.push(match[1].trim())
  }
  let cleaned = text.replace(refLineRe, '')

  // Pattern: Classical Reference: or Classical References:
  const classicalRe = /(?:Classical\s+References?)\s*[:\-]\s*\(?(.+?)\)?$/gim
  while ((match = classicalRe.exec(cleaned)) !== null) {
    refs.push(match[1].trim())
  }
  cleaned = cleaned.replace(classicalRe, '')

  // Pattern: inline parentheses with Samhita/Sthana references
  const inlineRefRe = /\(([^)]*(?:Samhita|Sthana|Hridaya|Nidana|Chikitsa|Uttara|Charaka|Sushruta|Ashtanga|Madhava|Bhava|Yoga)[^)]*)\)/gi
  while ((match = inlineRefRe.exec(cleaned)) !== null) {
    refs.push(match[1].trim())
  }
  cleaned = cleaned.replace(inlineRefRe, '')

  return { cleaned, references: refs.map(r => stripPhoneNumbers(r)) }
}

// ─── WhatsApp Message Reconstruction ─────────────────────────────────────────

function reconstructMessages(lines: string[]): WhatsAppMessage[] {
  const messages: WhatsAppMessage[] = []
  let currentSender = ''
  let currentContent = ''
  let currentLine = ''

  for (const line of lines) {
    const cleaned = stripEditedSuffix(line)
    const match = cleaned.match(WHATSAPP_LINE_RE)
    if (match) {
      // Save previous message
      if (currentContent.trim()) {
        messages.push({ sender: currentSender, content: currentContent.trim() })
      }
      currentSender = (match[1] || '').trim()
      currentContent = match[2] || ''
      currentLine = cleaned
    } else {
      // Continuation line
      if (currentContent) {
        currentContent += '\n' + cleaned
      } else if (currentLine) {
        // First line continuation (for messages that span multiple WhatsApp lines)
        currentContent = cleaned
      }
    }
  }
  // Save last message
  if (currentContent.trim()) {
    messages.push({ sender: currentSender, content: currentContent.trim() })
  }

  return messages
}

// ─── Disease Name Extraction ──────────────────────────────────────────────────

function extractDiseaseName(lines: string[]): { diseaseName: string; modernName: string } {
  // Find lines that have a 🔺 but are NOT section headers
  const sectionKeywords = [
    'NIDAN', 'PURVAR', 'LAKSHA', 'EXAMINATION', 'LABORATORY',
    'DIFFERENTIAL', 'SAMPRAPTI', 'UPASHAYA', 'ANUPASHAYA',
    'SAMANYA', 'VISHESHA', 'SURGICAL', 'PART NO', 'CASE STUDY',
    'SPUTUM', 'SYSTEMIC',
  ]

  for (const line of lines) {
    // Strip emoji and Devanagari prefix
    const stripped = line
      .replace(/[\u{1F53A}\u{1F53B}]/gu, '')
      .replace(/^[\u0900-\u097F]+[\s()]*/, '')
      .trim()
    if (!stripped) continue

    // Skip if it's a section header
    const upper = stripped.toUpperCase()
    if (sectionKeywords.some(kw => upper.includes(kw))) continue

    // Skip if it's a part number line
    if (PART_NO_RE.test(stripped)) continue

    // Extract disease name and modern name
    // Pattern: "DISEASE NAME (MODERN EQUIVALENT)"
    const parenMatch = stripped.match(/^(.+?)\s*\((.+?)\)\s*$/)
    if (parenMatch) {
      return {
        diseaseName: parenMatch[1].trim(),
        modernName: parenMatch[2].trim(),
      }
    }

    // Check if next line has parenthetical modern name
    const lineIdx = lines.indexOf(line)
    if (lineIdx + 1 < lines.length) {
      const nextLine = lines[lineIdx + 1].trim()
      const nextParenMatch = nextLine.match(/^\((.+?)\)\s*$/)
      if (nextParenMatch) {
        return {
          diseaseName: stripped,
          modernName: nextParenMatch[1].trim(),
        }
      }
    }

    // Just a disease name, no modern equivalent
    return { diseaseName: stripped, modernName: '' }
  }

  return { diseaseName: 'Unknown', modernName: '' }
}

// ─── Section Content Parsing ──────────────────────────────────────────────────

function parseSectionContent(lines: string[]): string[] {
  const items: string[] = []
  let currentItem = ''

  for (const line of lines) {
    const stripped = stripBullet(line)
    if (!stripped) {
      if (currentItem) {
        items.push(currentItem)
        currentItem = ''
      }
      continue
    }

    // Check if this is a bullet point start
    if (/^\s*[-*•📌🔸▫️🔹🔸️🔹️]/.test(line) || /^\s*\d+\./.test(line)) {
      if (currentItem) {
        items.push(currentItem)
      }
      currentItem = stripped
    } else if (/^\s*[a-z]\.\s/.test(line)) {
      // Sub-section like "a. Abdomen:"
      if (currentItem) {
        items.push(currentItem)
      }
      currentItem = stripped
    } else {
      // Continuation
      if (currentItem) {
        currentItem += ' ' + stripped
      } else {
        currentItem = stripped
      }
    }
  }

  if (currentItem) {
    items.push(currentItem)
  }

  return items.map(i => stripPhoneNumbers(i))
}

// ─── Part Content Parsing ─────────────────────────────────────────────────────

function parsePartContent(content: string): Record<string, string[]> {
  const lines = content.split('\n')
  const result: Record<string, string[]> = {}
  let currentKey: string | null = null
  let currentLines: string[] = []

  for (const line of lines) {
    // Only try to match section headers if the line starts with a triangle emoji or Devanagari
    let matchedKey: string | null = null
    if (isSectionHeader(line)) {
      matchedKey = matchSection(line)
    }

    // Also check for sub-section header (samprapti ghataka) without triangle
    if (currentKey === 'samprapti' && SAMPRAPTI_GHATAKA_RE.test(line)) {
      result['sampraptiGhataka'] = parseSectionContent(currentLines)
      currentLines = []
      continue
    }

    if (matchedKey) {
      // Save previous section
      if (currentKey && currentLines.length > 0) {
        result[currentKey] = parseSectionContent(currentLines)
      }
      currentKey = matchedKey
      currentLines = []
    } else {
      currentLines.push(line)
    }
  }

  // Save last section
  if (currentKey && currentLines.length > 0) {
    result[currentKey] = parseSectionContent(currentLines)
  }

  return result
}

// ─── Case Study Extraction ────────────────────────────────────────────────────

interface RawCaseBlock {
  caseNumber: number
  part1Content: string
  part2Content: string
  diseaseLines: string[]  // lines after part header, before first section
  isProcedure: boolean
}

function extractRawCaseBlocks(messages: WhatsAppMessage[]): RawCaseBlock[] {
  const cases: Map<number, RawCaseBlock> = new Map()

  // Find all case study messages
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i]
    const content = msg.content

    // Skip noise
    if (isNoiseMessage(content, msg.sender)) continue
    if (isSeparatorMessage(content)) continue

    // Check if this is a case study message
    const caseMatch = content.match(CASE_STUDY_RE)
    if (!caseMatch) continue

    const caseNumber = parseInt(caseMatch[1], 10)
    if (isNaN(caseNumber)) continue

    // Check for part number
    const partMatch = content.match(PART_NO_RE)
    const isProcedure = !partMatch

    // Get or create case block
    let block = cases.get(caseNumber)
    if (!block) {
      block = { caseNumber, part1Content: '', part2Content: '', diseaseLines: [], isProcedure }
      cases.set(caseNumber, block)
    }
    if (isProcedure) {
      block.isProcedure = true
    }

    // Get the content after the case study header and part number
    const contentLines = content.split('\n')
    let bodyStart = 0
    for (let j = 0; j < contentLines.length; j++) {
      const cl = contentLines[j]
      if (CASE_STUDY_RE.test(cl)) {
        bodyStart = j + 1
        continue
      }
      if (PART_NO_RE.test(cl)) {
        bodyStart = j + 1
        break
      }
      // If we're past the case study line and this is a procedure case
      if (j > bodyStart) break
    }

    const body = contentLines.slice(bodyStart).join('\n').trim()

    // Determine which part this is
    if (isProcedure) {
      // Single-part procedure case
      block.part1Content = body
    } else {
      const partNum = parseInt(partMatch[1], 10)
      if (partNum === 1 || partNum === 0) {
        block.part1Content = body
      } else if (partNum === 2) {
        block.part2Content = body
      }
    }
  }

  return Array.from(cases.values())
}

// ─── Build Case Study Objects ─────────────────────────────────────────────────

function buildCaseStudy(block: RawCaseBlock): CaseStudy {
  const { diseaseName, modernName } = extractDiseaseName(block.diseaseLines)

  // Parse Part 1 and Part 2
  const part1Sections = parsePartContent(block.part1Content)
  const part2Sections = parsePartContent(block.part2Content)

  // Extract references from both parts
  const { cleaned: cleanedPart1, references: refs1 } = extractReferences(block.part1Content)
  const { cleaned: cleanedPart2, references: refs2 } = extractReferences(block.part2Content)
  const allRefs = [...new Set([...refs1, ...refs2])]

  // Clean disease name from phone numbers
  const cleanDiseaseName = stripPhoneNumbers(diseaseName)
  const cleanModernName = stripPhoneNumbers(modernName)

  return {
    caseNumber: block.caseNumber,
    diseaseName: cleanDiseaseName,
    modernName: cleanModernName,
    part1Sections: {
      nidanaam: part1Sections['nidanaam'] || [],
      purvaroopam: part1Sections['purvaroopam'] || [],
      lakshanam: part1Sections['lakshanam'] || [],
      systemicExam: [
        ...(part1Sections['systemicExam'] || []),
        ...(part1Sections['sputumExam'] || []),
      ],
      labInvestigations: part1Sections['labInvestigations'] || [],
    },
    part2Sections: {
      differentialDiagnosis: part2Sections['differentialDiagnosis'] || [],
      samprapti: (part2Sections['samprapti'] || []).join('\n'),
      sampraptiGhataka: part2Sections['sampraptiGhataka'] || [],
      upashaya: part2Sections['upashaya'] || [],
      anupashaya: part2Sections['anupashaya'] || [],
      samanyaChikitsa: part2Sections['samanyaChikitsa'] || [],
      visheshaChikitsa: part2Sections['visheshaChikitsa'] || [],
      surgicalManagement: part2Sections['surgicalManagement'] || [],
    },
    references: allRefs,
    rawPart1: stripPhoneNumbers(cleanedPart1),
    rawPart2: stripPhoneNumbers(cleanedPart2),
  }
}

// ─── Disease Name Extraction from Raw Content ─────────────────────────────────

function extractDiseaseNameFromContent(content: string): { diseaseName: string; modernName: string } {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean)
  return extractDiseaseName(lines)
}

// ─── Validation ───────────────────────────────────────────────────────────────

interface ValidationResult {
  caseNumber: number
  warnings: string[]
}

function validateCaseStudy(cs: CaseStudy): ValidationResult {
  const warnings: string[] = []

  if (!cs.diseaseName || cs.diseaseName === 'Unknown') {
    warnings.push('Missing disease name')
  }

  const hasPart1 = cs.rawPart1.length > 0
  const hasPart2 = cs.rawPart2.length > 0

  if (!hasPart1 && !hasPart2) {
    warnings.push('No content found (empty Part 1 and Part 2)')
  }

  if (hasPart1) {
    if (cs.part1Sections.nidanaam.length === 0) warnings.push('Part 1: Missing Nidanam (etiology)')
    if (cs.part1Sections.lakshanam.length === 0 && cs.part1Sections.purvaroopam.length === 0)
      warnings.push('Part 1: Missing both Lakshanam and Purvaroopam')
  }

  if (hasPart2) {
    if (cs.part2Sections.samprapti === '' && cs.part2Sections.sampraptiGhataka.length === 0)
      warnings.push('Part 2: Missing Samprapti (pathogenesis)')
    if (cs.part2Sections.samanyaChikitsa.length === 0 && cs.part2Sections.visheshaChikitsa.length === 0)
      warnings.push('Part 2: Missing treatment (both Samanya and Vishesha Chikitsa)')
  }

  return { caseNumber: cs.caseNumber, warnings }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const validate = args.includes('--validate')

  console.log('=== WhatsApp Case Study Parser ===')
  console.log(`Mode: ${dryRun ? 'DRY RUN' : validate ? 'VALIDATE' : 'PARSE'}`)

  // Read input
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Input file not found: ${INPUT_PATH}`)
    process.exit(1)
  }

  const raw = fs.readFileSync(INPUT_PATH, 'utf-8')
  const lines = raw.split('\n')
  console.log(`Read ${lines.length} lines`)

  // Reconstruct messages
  const messages = reconstructMessages(lines)
  console.log(`Reconstructed ${messages.length} messages`)

  // Filter noise and extract case blocks
  const caseBlocks = extractRawCaseBlocks(messages)
  console.log(`Found ${caseBlocks.length} case study blocks`)

  // Build case studies
  const caseStudies: CaseStudy[] = caseBlocks.map(block => {
    // Extract disease name from the content itself
    const contentToSearch = block.part1Content || block.part2Content
    const { diseaseName, modernName } = extractDiseaseNameFromContent(contentToSearch)
    block.diseaseLines = [diseaseName, modernName ? `(${modernName})` : ''].filter(Boolean)
    return buildCaseStudy(block)
  })

  // Sort by case number
  caseStudies.sort((a, b) => a.caseNumber - b.caseNumber)

  // Stats
  const caseNums = caseStudies.map(c => c.caseNumber)
  console.log(`\nCase study range: ${Math.min(...caseNums)} to ${Math.max(...caseNums)}`)
  console.log(`Total cases: ${caseStudies.length}`)

  const procedureCases = caseStudies.filter(c => c.rawPart1 && !c.rawPart2 && c.part1Sections.nidanaam.length === 0)
  console.log(`Procedure-based cases: ${procedureCases.length}`)

  const casesWithPart2 = caseStudies.filter(c => c.rawPart2.length > 0)
  console.log(`Cases with Part 2: ${casesWithPart2.length}`)

  // Section coverage
  const sectionCounts = {
    nidanaam: caseStudies.filter(c => c.part1Sections.nidanaam.length > 0).length,
    purvaroopam: caseStudies.filter(c => c.part1Sections.purvaroopam.length > 0).length,
    lakshanam: caseStudies.filter(c => c.part1Sections.lakshanam.length > 0).length,
    systemicExam: caseStudies.filter(c => c.part1Sections.systemicExam.length > 0).length,
    labInvestigations: caseStudies.filter(c => c.part1Sections.labInvestigations.length > 0).length,
    differentialDiagnosis: caseStudies.filter(c => c.part2Sections.differentialDiagnosis.length > 0).length,
    samprapti: caseStudies.filter(c => c.part2Sections.samprapti || c.part2Sections.sampraptiGhataka.length > 0).length,
    samanyaChikitsa: caseStudies.filter(c => c.part2Sections.samanyaChikitsa.length > 0).length,
    visheshaChikitsa: caseStudies.filter(c => c.part2Sections.visheshaChikitsa.length > 0).length,
  }
  console.log('\nSection coverage:')
  for (const [section, count] of Object.entries(sectionCounts)) {
    console.log(`  ${section}: ${count}/${caseStudies.length} (${(count / caseStudies.length * 100).toFixed(0)}%)`)
  }

  if (dryRun) {
    console.log('\n[DRY RUN] Would write', caseStudies.length, 'case studies to', OUTPUT_PATH)
    // Show first case
    console.log('\nFirst case study:')
    console.log(JSON.stringify(caseStudies[0], null, 2).slice(0, 1000))
    return
  }

  if (validate) {
    console.log('\n=== Validation Results ===')
    let totalWarnings = 0
    const missingCases: number[] = []

    // Check for gaps in case numbering
    const allNums = new Set(caseNums)
    for (let i = Math.min(...caseNums); i <= Math.max(...caseNums); i++) {
      if (!allNums.has(i)) missingCases.push(i)
    }
    if (missingCases.length > 0) {
      console.log(`\nMissing case numbers (${missingCases.length}): ${missingCases.slice(0, 20).join(', ')}${missingCases.length > 20 ? '...' : ''}`)
    }

    for (const cs of caseStudies) {
      const result = validateCaseStudy(cs)
      if (result.warnings.length > 0) {
        console.log(`\nCase #${result.caseNumber} (${cs.diseaseName}):`)
        for (const w of result.warnings) {
          console.log(`  ⚠ ${w}`)
        }
        totalWarnings += result.warnings.length
      }
    }
    console.log(`\nTotal warnings: ${totalWarnings}`)
    console.log(`Cases with warnings: ${caseStudies.filter((_, i) => validateCaseStudy(caseStudies[i]).warnings.length > 0).length}`)
    return
  }

  // Write output
  const outputDir = path.dirname(OUTPUT_PATH)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(caseStudies, null, 2), 'utf-8')
  console.log(`\nWrote ${caseStudies.length} case studies to ${OUTPUT_PATH}`)

  // Summary
  const totalRefs = caseStudies.reduce((sum, c) => sum + c.references.length, 0)
  console.log(`Total references extracted: ${totalRefs}`)
  console.log(`Average references per case: ${(totalRefs / caseStudies.length).toFixed(1)}`)
}

main()
