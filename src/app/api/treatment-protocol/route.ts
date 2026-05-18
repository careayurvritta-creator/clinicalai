import { NextRequest, NextResponse } from 'next/server'
import { TREATMENTS, PURVAKARMA } from '@/lib/ayurknowledge/treatments'
import { HERBS } from '@/lib/ayurknowledge/herbs'
import { DISEASES } from '@/lib/ayurknowledge/diseases'

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

function generateProtocol(patientInfo: PatientInfo, treatmentSelection: TreatmentSelection): string {
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
  protocol += `**Duration:** ${patientInfo.duration || '-'}\n\n`

  protocol += `## Treatment Duration: ${treatmentSelection.treatmentDuration} days\n`
  protocol += `## Budget Category: ${treatmentSelection.budget}\n\n`

  if (selectedDisease) {
    protocol += `## Disease Understanding\n`
    protocol += `- **Description:** ${selectedDisease.description}\n`
    protocol += `- **Samprapti:** ${selectedDisease.samprapti || 'Traditional pathogenesis'}\n`
    protocol += `- **Affected Doshas:** ${selectedDisease.doshas?.join(', ') || 'V, P, K'}\n`
    protocol += `- **Affected Dhatus:** ${selectedDisease.dhatus?.join(', ') || 'All'}\n\n`
  }

  if (selectedPurvakarma.length > 0) {
    protocol += `## Phase 1: Purvakarma (Pre-treatment)\n`
    selectedPurvakarma.forEach((p, index) => {
      protocol += `### ${index + 1}. ${p.name}\n`
      protocol += `- **Sanskrit:** ${p.id}\n`
      protocol += `- **Duration:** ${p.duration}\n`
      protocol += `- **Description:** ${p.description}\n`
      protocol += `- **Indications:** ${p.indications?.join(', ')}\n`
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
      protocol += `- **Botanical:** ${h.botanical}\n`
      protocol += `- **Rasa:** ${h.rasa?.join(', ') || 'Madhura (Sweet)'}\n`
      protocol += `- **Virya:** ${h.virya || 'Sheeta (Cooling)'}\n`
      protocol += `- **Vipaka:** ${h.vipaka || 'Madhura (Sweet)'}\n`
      protocol += `- **Indications:** ${h.primaryIndications?.join(', ') || 'General tonic'}\n`
      protocol += `- **Dosage:** ${h.classicalFormulations?.[0]?.dosage || '3-5 grams daily'}\n`
      if (h.contraindications && h.contraindications.length > 0) {
        protocol += `- **Cautions:** ${h.contraindications.join(', ')}\n`
      }
      protocol += `\n`
    })
  }

  protocol += `## Daily Regimen (Dinacharya)\n`
  protocol += `- **Morning (4-6 AM):** Wake up, drink warm water\n`
  protocol += `- **Morning (6-7 AM):** Abhyanga (self-massage) with sesame oil\n`
  protocol += `- **Morning (7-8 AM):** Light breakfast\n`
  protocol += `- **Mid-day (12-1 PM):** Main meal\n`
  protocol += `- **Evening (6-7 PM):** Light dinner before sunset\n`
  protocol += `- **Night (9-10 PM):** Sleep time\n\n`

  protocol += `## Diet Guidelines (Ahara)\n`
  if (patientInfo.prakriti.includes('Vata')) {
    protocol += `- **Favor:** Warm, moist, nourishing foods\n`
    protocol += `- **Avoid:** Dry, cold, light foods\n`
  } else if (patientInfo.prakriti.includes('Pitta')) {
    protocol += `- **Favor:** Cool, sweet, light foods\n`
    protocol += `- **Avoid:** Spicy, sour, hot foods\n`
  } else if (patientInfo.prakriti.includes('Kapha')) {
    protocol += `- **Favor:** Light, dry, warm foods\n`
    protocol += `- **Avoid:** Heavy, oily, sweet foods\n`
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

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { patientInfo, treatmentSelection } = body

    if (!patientInfo || !treatmentSelection) {
      return NextResponse.json(
        { error: 'Missing patient info or treatment selection' },
        { status: 400 }
      )
    }

    const protocol = generateProtocol(patientInfo, treatmentSelection)

    return NextResponse.json({ protocol })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate protocol' },
      { status: 500 }
    )
  }
}