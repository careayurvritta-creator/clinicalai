import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { TREATMENTS, PURVAKARMA } from '@/lib/ayurknowledge/treatments'
import { HERBS } from '@/lib/ayurknowledge/herbs'
import { DISEASES } from '@/lib/ayurknowledge/diseases'
import { getResearchContext, formatResearchForProtocol, type ResearchContext, type ResearchPaper } from '@/lib/research-analyzer'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext } from '@/lib/ayurrag/vector-rag'
import { getCharakTreatmentProtocols, getCharakDiseaseDescriptions } from '@/lib/ayurknowledge/charak'
import { createServerClient } from '@/lib/supabase/client'

interface PatientInfo {
  name: string
  age: string
  gender: string
  prakriti: string
  chiefComplaints: string
  diagnosis: string
  duration: string
  associatedSymptoms: string
  investigation: string
  nadi?: string
  mootra?: string
  mala?: string
  jivha?: string
  complaintsArray?: Array<{ complaint: string; duration: string; severity: number }>
}

interface TreatmentSelection {
  selectedPanchakarma: string[]
  selectedPurvakarma: string[]
  selectedHerbs: string[]
  treatmentDuration: string
  budget: string
}

interface RequestBody {
  patientInfo: PatientInfo
  treatmentSelection: TreatmentSelection
}

function generateProtocol(
  patientInfo: PatientInfo,
  treatmentSelection: TreatmentSelection,
  researchContext: ResearchContext | null = null
): string {
  const selectedTreatments = TREATMENTS.filter(t => treatmentSelection.selectedPanchakarma.includes(t.id))
  const selectedPurvakarma = PURVAKARMA.filter(p => treatmentSelection.selectedPurvakarma.includes(p.id))
  const selectedHerbs = HERBS.filter(h => treatmentSelection.selectedHerbs.includes(h.id))
  const selectedDisease = DISEASES.find(d => d.name === patientInfo.diagnosis)

  let protocol = `# TREATMENT PROTOCOL\n`
  protocol += `=====================================\n\n`
  protocol += `**Patient:** ${patientInfo.name || 'Not specified'}\n`
  protocol += `**Age/Gender:** ${patientInfo.age || '-'}/${patientInfo.gender || '-'}\n`
  protocol += `**Prakriti:** ${patientInfo.prakriti || 'To be assessed'}\n`
  protocol += `**Chief Complaints:** ${patientInfo.chiefComplaints || '-'}\n`
  protocol += `**Diagnosis:** ${patientInfo.diagnosis || '-'}\n`
  protocol += `**Duration:** ${patientInfo.duration || '-'}\n`

  if (patientInfo.nadi || patientInfo.mootra || patientInfo.mala || patientInfo.jivha) {
    protocol += `\n### Ashtavidha Pariksha\n`
    if (patientInfo.nadi) protocol += `- **Nadi:** ${patientInfo.nadi}\n`
    if (patientInfo.mootra) protocol += `- **Mootra:** ${patientInfo.mootra}\n`
    if (patientInfo.mala) protocol += `- **Mala:** ${patientInfo.mala}\n`
    if (patientInfo.jivha) protocol += `- **Jivha:** ${patientInfo.jivha}\n`
  }

  if (patientInfo.complaintsArray && patientInfo.complaintsArray.length > 0) {
    protocol += `\n### Complaint Details\n`
    patientInfo.complaintsArray.forEach((c, i) => {
      protocol += `${i + 1}. **${c.complaint}** — Duration: ${c.duration || 'N/A'}, Severity: ${c.severity}/10\n`
    })
  }

  protocol += `\n## Treatment Duration: ${treatmentSelection.treatmentDuration} days\n`
  protocol += `## Budget Category: ${treatmentSelection.budget}\n\n`

  if (selectedDisease) {
    protocol += `## Disease Understanding\n`
    protocol += `- **Description:** ${selectedDisease.modernCorrelation}\n`
    protocol += `- **Samprapti:** ${selectedDisease.samprapti || 'Traditional pathogenesis'}\n`
    protocol += `- **Affected Doshas:** ${selectedDisease.doshaInvolvement?.join(', ') || 'V, P, K'}\n`
    protocol += `- **Clinical Features:** ${selectedDisease.clinicalFeatures?.join(', ') || 'As per classical texts'}\n\n`
  }

  if (selectedPurvakarma.length > 0) {
    protocol += `## Phase 1: Purvakarma (Pre-treatment)\n`
    selectedPurvakarma.forEach((p, index) => {
      protocol += `### ${index + 1}. ${p.name}\n`
      protocol += `- **ID:** ${p.id}\n`
      protocol += `- **Duration:** ${p.duration}\n`
      protocol += `- **Description:** ${p.description}\n`
      protocol += `- **Indications:** ${p.indications?.join(', ') || 'General preparation'}\n`
      if (p.types) {
        protocol += `- **Types:** ${p.types.join(', ')}\n`
      }
      protocol += `\n`
    })
  }

  if (selectedTreatments.length > 0) {
    protocol += `## Phase 2: Main Panchakarma Therapy\n`
    selectedTreatments.forEach((t, index) => {
      protocol += `### ${selectedPurvakarma.length + index + 1}. ${t.name}\n`
      protocol += `- **Sanskrit:** ${t.sanskrit}\n`
      protocol += `- **Category:** ${t.category}\n`
      protocol += `- **Description:** ${t.description}\n`
      protocol += `- **Duration:** ${t.duration}\n`
      protocol += `- **Indications:** ${t.indications.join(', ')}\n`
      protocol += `- **Contraindications:** ${t.contraindications.join(', ')}\n\n`
      protocol += `**Procedure:**\n`
      t.procedure.forEach((step, i) => {
        protocol += `${i + 1}. ${step}\n`
      })
      protocol += `\n**Preparation:**\n`
      t.preparation.forEach((step, i) => {
        protocol += `- ${step}\n`
      })
      protocol += `\n**Post-Treatment Care:**\n`
      t.postTreatment.forEach((step, i) => {
        protocol += `- ${step}\n`
      })
      protocol += `\n`
    })
  }

  if (selectedHerbs.length > 0) {
    protocol += `## Phase 3: Adjuvant Herbs & Formulations\n`
    selectedHerbs.forEach((h, index) => {
      protocol += `### ${selectedPurvakarma.length + selectedTreatments.length + index + 1}. ${h.name}\n`
      protocol += `- **Botanical:** ${h.botanicalName}\n`
      protocol += `- **Rasa:** ${h.rasa?.join(', ') || 'Madhura (Sweet)'}\n`
      protocol += `- **Virya:** ${h.virya || 'Sheeta (Cooling)'}\n`
      protocol += `- **Vipaka:** ${h.vipaka || 'Madhura (Sweet)'}\n`
      protocol += `- **Indications:** ${h.indications?.join(', ') || 'General tonic'}\n`
      protocol += `- **Dosage:** ${h.dosage || '3-5 grams daily'}\n`
      if (h.contraindications && h.contraindications.length > 0) {
        protocol += `- **Cautions:** ${h.contraindications.join(', ')}\n`
      }
      protocol += `\n`
    })
  }

  // Add research evidence section
  if (researchContext && researchContext.papers.length > 0) {
    protocol += `\n${formatResearchForProtocol(researchContext)}\n`

    protocol += `\n## Evidence-Based Recommendations\n\n`
    protocol += `Based on analysis of ${researchContext.papers.length} research papers:\n\n`

    const highRelevance = researchContext.papers.filter(p => p.relevanceScore >= 7)
    if (highRelevance.length > 0) {
      protocol += `### High-Relevance Evidence\n`
      for (const paper of highRelevance) {
        protocol += `- **${paper.title.slice(0, 80)}**: ${paper.keyFindings}\n`
      }
      protocol += `\n`
    }
  }

  protocol += `## Daily Regimen (Dinacharya)\n`
  protocol += `- **Morning (4-6 AM):** Wake up, drink warm water\n`
  protocol += `- **Morning (6-7 AM):** Abhyanga (self-massage) with sesame oil\n`
  protocol += `- **Morning (7-8 AM):** Light breakfast\n`
  protocol += `- **Mid-day (12-1 PM):** Main meal\n`
  protocol += `- **Evening (6-7 PM):** Light dinner before sunset\n`
  protocol += `- **Night (9-10 PM):** Sleep time\n\n`

  protocol += `## Diet Guidelines (Ahara)\n`
  if (patientInfo.prakriti?.includes('Vata')) {
    protocol += `- **Favor:** Warm, moist, nourishing foods\n`
    protocol += `- **Avoid:** Dry, cold, light foods\n`
  } else if (patientInfo.prakriti?.includes('Pitta')) {
    protocol += `- **Favor:** Cool, sweet, light foods\n`
    protocol += `- **Avoid:** Spicy, sour, hot foods\n`
  } else if (patientInfo.prakriti?.includes('Kapha')) {
    protocol += `- **Favor:** Light, dry, warm foods\n`
    protocol += `- **Avoid:** Heavy, oily, sweet foods\n`
  } else {
    protocol += `- **Favor:** Balanced, seasonal, whole foods\n`
    protocol += `- **Avoid:** Processed foods, extreme temperatures\n`
  }
  protocol += `- **Water:** Warm water throughout the day\n`
  protocol += `- **Avoid:** Cold drinks, processed foods, leftovers\n\n`

  protocol += `## Follow-up Schedule\n`
  protocol += `- **Day 3:** Initial assessment\n`
  protocol += `- **Day 7:** Mid-course evaluation\n`
  protocol += `- **Day ${treatmentSelection.treatmentDuration}:** Final assessment & next steps\n\n`

  protocol += `---\n`
  protocol += `*This is a preliminary protocol. Adjust based on patient response.*\n`
  protocol += `*Generated by Clinical AI*\n`

  return protocol
}

const RequestSchema = z.object({
  patientInfo: z.object({
    name: z.string().default(''),
    age: z.string().default(''),
    gender: z.string().default(''),
    prakriti: z.string().default(''),
    chiefComplaints: z.string().default(''),
    diagnosis: z.string().default(''),
    duration: z.string().default(''),
    associatedSymptoms: z.string().default(''),
    investigation: z.string().default(''),
    nadi: z.string().optional(),
    mootra: z.string().optional(),
    mala: z.string().optional(),
    jivha: z.string().optional(),
    complaintsArray: z.array(z.object({
      complaint: z.string(),
      duration: z.string(),
      severity: z.number(),
    })).optional(),
  }),
  treatmentSelection: z.object({
    selectedPanchakarma: z.array(z.string()).default([]),
    selectedPurvakarma: z.array(z.string()).default([]),
    selectedHerbs: z.array(z.string()).default([]),
    treatmentDuration: z.string().default('14'),
    budget: z.string().default('moderate'),
  }),
})

let ragInitialized = false

async function ensureRAGInitialized() {
  if (!ragInitialized) {
    try {
      await initializeVectorRAG()
      ragInitialized = true
    } catch (error) {
      console.error('[Treatment Protocol] RAG init failed:', error)
    }
  }
}

// Fire-and-forget protocol persistence
async function persistProtocol(
  patientInfo: PatientInfo,
  protocol: string,
  researchPapers: ResearchPaper[],
  charakRefs: string[]
) {
  try {
    const supabase = createServerClient()
    const protocolNumber = `PROTO-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Check if treatment_protocols table exists, if not skip
    const { error } = await supabase
      .from('treatment_protocols')
      .insert({
        protocol_number: protocolNumber,
        patient_name: patientInfo.name || 'Unknown',
        diagnosis: patientInfo.diagnosis || null,
        prakriti: patientInfo.prakriti || null,
        protocol_content: protocol,
        research_papers: researchPapers.map(p => ({ pmid: p.pmid, title: p.title })),
        charak_references: charakRefs,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.warn('[Treatment Protocol] Persistence skipped:', error.message)
    } else {
      console.log('[Treatment Protocol] Saved:', protocolNumber)
    }
  } catch (error) {
    console.warn('[Treatment Protocol] Persistence error:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = RequestSchema.parse(await req.json())
    const { patientInfo, treatmentSelection } = body

    // Extract complaints text for research
    const complaintsText = patientInfo.chiefComplaints || 'General health'
    const durationText = patientInfo.duration || 'Not specified'
    const diagnosisText = patientInfo.diagnosis || 'Not specified'

    // Fetch research papers and RAG context in parallel
    const [researchContext, ragResults] = await Promise.all([
      getResearchContext(complaintsText, durationText, diagnosisText, patientInfo.prakriti).catch(err => {
        console.error('[Treatment Protocol] Research fetch failed:', err)
        return null
      }),
      (async () => {
        try {
          await ensureRAGInitialized()
          const searchQuery = `${diagnosisText} ${complaintsText} treatment protocol`
          return await vectorSearch(searchQuery, {
            maxResults: 5,
            minRelevance: 0.3,
            includeWHO: false,
            includeAyurKnowledge: true,
          })
        } catch (err) {
          console.error('[Treatment Protocol] RAG search failed:', err)
          return []
        }
      })(),
    ])

    console.log('[Treatment Protocol] Research:', researchContext?.papers.length || 0, 'papers, RAG:', ragResults.length, 'results')

    // Get Charak Samhita references for the diagnosis
    const charakProtocols = getCharakTreatmentProtocols(patientInfo.diagnosis || '')
    const charakDiseases = getCharakDiseaseDescriptions(patientInfo.diagnosis || '')
    const charakRefs = [
      ...charakProtocols.map(c => `${c.chapter}: ${c.condition} — ${c.treatment}`),
      ...charakDiseases.map(c => `${c.chapter}: ${c.name} — ${c.treatment}`),
    ]

    // Build RAG context for protocol enhancement
    let ragContext = ''
    if (ragResults.length > 0) {
      ragContext = formatVectorResultsForContext(ragResults)
    }

    const protocol = generateProtocol(patientInfo, treatmentSelection, researchContext)

    // Persist protocol (fire-and-forget)
    persistProtocol(patientInfo, protocol, researchContext?.papers || [], charakRefs)

    return NextResponse.json({
      protocol,
      researchPapers: researchContext?.papers || [],
      researchSummary: researchContext?.summary || '',
      paperCount: researchContext?.papers.length || 0,
      charakReferences: charakRefs.length > 0 ? charakRefs.slice(0, 5) : undefined,
      ragContext: ragContext || undefined,
    })
  } catch (error) {
    console.error('[Treatment Protocol] Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate protocol' },
      { status: 500 }
    )
  }
}
