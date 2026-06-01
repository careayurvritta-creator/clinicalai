export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getComprehensiveResearchContext, type ResearchPaper } from '@/lib/research-analyzer'
import { vectorSearch, initializeVectorRAG, formatVectorResultsForContext } from '@/lib/ayurrag/vector-rag'
import { getCharakTreatmentProtocols, getCharakDiseaseDescriptions } from '@/lib/ayurknowledge/charak'
import { DEFAULT_MODEL } from '@/lib/types'
import { MAX_PROTOCOL_CONTINUATIONS, streamWithAutoContinuation } from '@/lib/llm-stream-utils'
import { createServerClient } from '@/lib/supabase/client'
import { embedTreatmentProtocol } from '@/lib/input-learning'
import { buildProtocolPrompt } from '@/lib/treatment-prompts'

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
  drik?: string
  shabda?: string
  sparsh?: string
  aakriti?: string
  satva?: string
  aharaShakti?: string
  vyayamaShakti?: string
  occupation?: string
  comorbidities?: string
  medications?: string
  allergies?: string
  complaintsArray?: Array<{ complaint: string; duration: string; severity: number }>
}

interface TreatmentSelection {
  selectedPanchakarma: string[]
  selectedPurvakarma: string[]
  selectedHerbs: string[]
  treatmentDuration: string
  budget: string
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
    drik: z.string().optional(),
    shabda: z.string().optional(),
    sparsh: z.string().optional(),
    aakriti: z.string().optional(),
    satva: z.string().optional(),
    aharaShakti: z.string().optional(),
    vyayamaShakti: z.string().optional(),
    occupation: z.string().optional(),
    comorbidities: z.string().optional(),
    medications: z.string().optional(),
    allergies: z.string().optional(),
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

function formatPatientData(patientInfo: PatientInfo, treatmentSelection: TreatmentSelection): string {
  let data = ``
  data += `**Name:** ${patientInfo.name || 'Not specified'}\n`
  data += `**Age:** ${patientInfo.age || 'Not specified'}\n`
  data += `**Gender:** ${patientInfo.gender || 'Not specified'}\n`
  data += `**Occupation:** ${patientInfo.occupation || 'Not specified'}\n`
  data += `**Prakriti:** ${patientInfo.prakriti || 'To be assessed'}\n`
  data += `**Chief Complaints:** ${patientInfo.chiefComplaints || 'Not specified'}\n`
  data += `**Duration:** ${patientInfo.duration || 'Not specified'}\n`
  data += `**Severity:** ${patientInfo.associatedSymptoms || 'Not specified'}\n`
  data += `**Diagnosis:** ${patientInfo.diagnosis || 'Not specified'}\n`
  data += `**Investigation:** ${patientInfo.investigation || 'Not specified'}\n`

  if (patientInfo.comorbidities) data += `**Comorbidities:** ${patientInfo.comorbidities}\n`
  if (patientInfo.medications) data += `**Current Medications:** ${patientInfo.medications}\n`
  if (patientInfo.allergies) data += `**Allergies:** ${patientInfo.allergies}\n`

  if (patientInfo.complaintsArray && patientInfo.complaintsArray.length > 0) {
    data += `\n**Complaint Details:**\n`
    patientInfo.complaintsArray.forEach((c, i) => {
      data += `${i + 1}. ${c.complaint} — Duration: ${c.duration || 'N/A'}, Severity: ${c.severity}/10\n`
    })
  }

  data += `\n### Ashtavidha Pariksha\n`
  if (patientInfo.nadi) data += `- Nadi (Pulse): ${patientInfo.nadi}\n`
  if (patientInfo.mootra) data += `- Mootra (Urine): ${patientInfo.mootra}\n`
  if (patientInfo.mala) data += `- Mala (Stool): ${patientInfo.mala}\n`
  if (patientInfo.jivha) data += `- Jivha (Tongue): ${patientInfo.jivha}\n`
  if (patientInfo.drik) data += `- Drik (Eyes): ${patientInfo.drik}\n`
  if (patientInfo.shabda) data += `- Shabda (Voice): ${patientInfo.shabda}\n`
  if (patientInfo.sparsh) data += `- Sparsh (Skin/Touch): ${patientInfo.sparsh}\n`
  if (patientInfo.aakriti) data += `- Aakriti (Build): ${patientInfo.aakriti}\n`

  data += `\n### Dashavidha Pariksha\n`
  if (patientInfo.satva) data += `- Satva (Mental Strength): ${patientInfo.satva}\n`
  if (patientInfo.aharaShakti) data += `- Ahara Shakti (Diet Capacity): ${patientInfo.aharaShakti}\n`
  if (patientInfo.vyayamaShakti) data += `- Vyayama Shakti (Exercise Tolerance): ${patientInfo.vyayamaShakti}\n`

  data += `\n### Treatment Parameters\n`
  data += `- Selected Panchakarma: ${treatmentSelection.selectedPanchakarma.join(', ') || 'None selected'}\n`
  data += `- Selected Purvakarma: ${treatmentSelection.selectedPurvakarma.join(', ') || 'None selected'}\n`
  data += `- Selected Herbs: ${treatmentSelection.selectedHerbs.join(', ') || 'None selected'}\n`
  data += `- Treatment Duration: ${treatmentSelection.treatmentDuration} days\n`
  data += `- Budget: ${treatmentSelection.budget}\n`

  return data
}

async function persistProtocol(
  patientInfo: PatientInfo,
  protocol: string,
  researchPapers: ResearchPaper[],
  charakRefs: string[],
  protocolNumber: string
) {
  try {
    const supabase = createServerClient()

    const { error } = await supabase
      .from('treatment_protocols')
      .insert({
        protocol_number: protocolNumber,
        patient_name: patientInfo.name || 'Unknown',
        diagnosis: patientInfo.diagnosis || null,
        prakriti: patientInfo.prakriti || null,
        protocol_content: protocol,
        research_papers: researchPapers.map(p => ({ pmid: p.pmid, title: p.title, journal: p.journal, year: p.year })),
        charak_references: charakRefs,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.warn('[Treatment Protocol] Persistence skipped:', error.message)
    } else {
      console.log('[Treatment Protocol] Saved:', protocolNumber)
      // Embed protocol into RAG knowledge base (fire-and-forget)
      embedTreatmentProtocol(protocolNumber, protocol, patientInfo.diagnosis, patientInfo.prakriti).catch(err =>
        console.warn('[Treatment Protocol] Embedding failed:', err)
      )
    }
  } catch (error) {
    console.warn('[Treatment Protocol] Persistence error:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = RequestSchema.parse(await req.json())
    const { patientInfo, treatmentSelection } = body

    const complaintsText = patientInfo.chiefComplaints || 'General health'
    const durationText = patientInfo.duration || 'Not specified'
    const diagnosisText = patientInfo.diagnosis || 'Not specified'

    // Gather all context in parallel: research papers + web search + RAG + Charak
    const [researchCtx, ragResults, charakProtocols, charakDiseases] = await Promise.all([
      getComprehensiveResearchContext(complaintsText, durationText, diagnosisText, patientInfo.prakriti).catch(err => {
        console.error('[Treatment Protocol] Research fetch failed:', err)
        return null
      }),
      (async () => {
        try {
          await ensureRAGInitialized()
          const searchQuery = `${diagnosisText} ${complaintsText} treatment protocol ayurvedic`
          return await vectorSearch(searchQuery, {
            maxResults: 8,
            minRelevance: 0.25,
            includeWHO: false,
            includeAyurKnowledge: true,
          })
        } catch (err) {
          console.error('[Treatment Protocol] RAG search failed:', err)
          return []
        }
      })(),
      Promise.resolve(getCharakTreatmentProtocols(patientInfo.diagnosis || '')),
      Promise.resolve(getCharakDiseaseDescriptions(patientInfo.diagnosis || '')),
    ])

    const charakRefs = [
      ...charakProtocols.map(c => `${c.chapter}: ${c.condition} — ${c.treatment}`),
      ...charakDiseases.map(c => `${c.chapter}: ${c.name} — ${c.treatment}`),
    ]

    const ragFormatted = ragResults.length > 0 ? formatVectorResultsForContext(ragResults) : null
    const ragContext = ragFormatted?.context || ''
    const ragSources = ragFormatted?.sources || []
    const patientData = formatPatientData(patientInfo, treatmentSelection)

    // Build the comprehensive LLM prompt
    const protocolNumber = `PROTO-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const systemPrompt = buildProtocolPrompt(
      patientData,
      researchCtx?.formattedResearch || 'No research papers found for this condition.',
      ragContext || 'No additional knowledge base context available.',
      charakRefs.length > 0 ? charakRefs.join('\n') : 'No specific Charak Samhita references found.',
      researchCtx?.formattedWeb || '',
      patientInfo.name,
      patientInfo.diagnosis
    )

    console.log('[Treatment Protocol] Generating with LLM. Papers:', researchCtx?.papers.length || 0, 'Web:', researchCtx?.webResults.length || 0, 'RAG:', ragResults.length)

    const encoder = new TextEncoder()
    let fullProtocol = ''

    // Auto-continuation support
    const MAX_PROTOCOL_CONTINUATIONS = 4
    const protocolMessages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: 'Generate the complete treatment protocol for this patient now. Include ALL 16 sections. Do not truncate or abbreviate.' },
    ]

    const readable = new ReadableStream({
      async start(controller) {
        // Send metadata event first
        const metadata = {
          type: 'metadata',
          paperCount: researchCtx?.papers.length || 0,
          webCount: researchCtx?.webResults.length || 0,
          ragCount: ragResults.length,
          charakCount: charakRefs.length,
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`))

        try {
          // Use shared auto-continuation utility
          const { content: fullProtocolResult, continuationCount } = await streamWithAutoContinuation(
            protocolMessages as any,
            DEFAULT_MODEL,
            controller,
            encoder,
            MAX_PROTOCOL_CONTINUATIONS,
            'Continue the treatment protocol from where you left off. Do not repeat. Continue seamlessly with the next section. Include ALL remaining sections.',
            { max_tokens: 8192, temperature: 0.4, top_p: 0.9 }
          )
          fullProtocol = fullProtocolResult

          // Persist after streaming completes
          if (fullProtocol.length > 100) {
            persistProtocol(patientInfo, fullProtocol, researchCtx?.papers || [], charakRefs, protocolNumber)
          }

          console.log('[Treatment Protocol] Complete. Length:', fullProtocol.length, 'Continuations:', continuationCount)
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } catch (error) {
          console.error('[Treatment Protocol] Streaming error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Stream interrupted' })}\n\n`))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('[Treatment Protocol] Error:', error)

    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Invalid request', details: error.issues },
        { status: 400 }
      )
    }

    return Response.json(
      { error: 'Failed to generate protocol' },
      { status: 500 }
    )
  }
}
