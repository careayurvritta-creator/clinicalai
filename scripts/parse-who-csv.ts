import fs from 'fs'
import path from 'path'

interface WhoTerm {
  id: string
  english: string
  definition: string
  sanskritIAST: string
  sanskritDevanagari: string
  category: string
}

interface WhoCategory {
  id: string
  name: string
  terms: WhoTerm[]
}

interface WhoTerminologyData {
  metadata: {
    title: string
    isbn: string
    source: string
    license: string
    totalTerms: number
    totalCategories: number
  }
  categories: WhoCategory[]
  termsIndex: Record<string, WhoTerm>
}

const CSV_PATH = path.join(process.cwd(), 'WHO international standard terminologies on ayurveda.csv')

const categoryMap: Record<string, string> = {
  '1': 'Background Concepts',
  '2': 'Core Concepts',
  '3': 'Anatomical Structures',
  '4': 'Physiological Processes',
  '5': 'Morbidity and Diagnostic Terms',
  '6': 'Materials',
  '7': 'Therapeutic Interventions and Techniques',
  '8': 'Research and Education',
  '9': 'Clinical Specialities'
}

function parseCSV(): WhoTerminologyData {
  const content = fs.readFileSync(CSV_PATH, 'utf-8')
  const lines = content.split('\n')
  
  const terms: WhoTerm[] = []
  const categoriesMap = new Map<string, WhoTerm[]>()

  let currentId = ''
  let currentEnglish = ''
  let currentDefinition = ''
  let currentSanskritIAST = ''
  let currentSanskritDevanagari = ''
  let currentCategory = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const cols = parseCSVLine(line)
    
    if (cols.length < 2) continue
    
    const firstCol = (cols[0] || '').trim()
    const secondCol = (cols[1] || '').trim()
    const thirdCol = (cols[2] || '').trim()
    const fourthCol = (cols[3] || '').trim()
    const fifthCol = (cols[4] || '').trim()
    
    // Check if this is a new term entry (starts with ITA-)
    if (firstCol.startsWith('ITA-')) {
      // Save previous term if exists
      if (currentId && currentEnglish) {
        const term: WhoTerm = {
          id: currentId,
          english: currentEnglish,
          definition: currentDefinition.trim(),
          sanskritIAST: currentSanskritIAST,
          sanskritDevanagari: currentSanskritDevanagari,
          category: currentCategory
        }
        terms.push(term)
        
        if (!categoriesMap.has(currentCategory)) {
          categoriesMap.set(currentCategory, [])
        }
        categoriesMap.get(currentCategory)!.push(term)
      }
      
      // Start new term
      currentId = firstCol
      currentEnglish = secondCol
      currentDefinition = thirdCol
      currentSanskritIAST = fourthCol
      currentSanskritDevanagari = fifthCol
      
      // Extract category from ID (e.g., "ITA-5.10.5" -> "5")
      const categoryNum = currentId.split('.')[0]?.replace('ITA-', '') || ''
      currentCategory = categoryMap[categoryNum] || `Category ${categoryNum}`
    } else if (firstCol === '' && secondCol === '' && thirdCol !== '') {
      // Continuation of previous definition
      currentDefinition += ' ' + thirdCol
    }
  }
  
  // Don't forget last term
  if (currentId && currentEnglish) {
    const term: WhoTerm = {
      id: currentId,
      english: currentEnglish,
      definition: currentDefinition.trim(),
      sanskritIAST: currentSanskritIAST,
      sanskritDevanagari: currentSanskritDevanagari,
      category: currentCategory
    }
    terms.push(term)
    if (!categoriesMap.has(currentCategory)) {
      categoriesMap.set(currentCategory, [])
    }
    categoriesMap.get(currentCategory)!.push(term)
  }

  // Build categories array
  const categories: WhoCategory[] = []
  for (const [catName, catTerms] of categoriesMap.entries()) {
    categories.push({
      id: catName.toLowerCase().replace(/\s+/g, '-'),
      name: catName,
      terms: catTerms
    })
  }

  // Build index
  const termsIndex: Record<string, WhoTerm> = {}
  for (const term of terms) {
    termsIndex[term.id] = term
  }

  return {
    metadata: {
      title: 'WHO International Standard Terminologies on Ayurveda',
      isbn: '978-92-4-006493-5',
      source: 'World Health Organization',
      license: 'CC BY-NC-SA 3.0 IGO',
      totalTerms: terms.length,
      totalCategories: categories.length
    },
    categories,
    termsIndex
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  
  return result
}

// Run the parser
console.log('Parsing WHO CSV...')
const data = parseCSV()

// Save to JSON
const outputPath = path.join(process.cwd(), 'src/lib/ayurknowledge/who-terminology.json')
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

console.log(`✓ Parsed ${data.metadata.totalTerms} terms in ${data.metadata.totalCategories} categories`)
console.log(`✓ Saved to ${outputPath}`)

// Print category summary
console.log('\nCategory Summary:')
for (const cat of data.categories) {
  console.log(`  ${cat.name}: ${cat.terms.length} terms`)
}