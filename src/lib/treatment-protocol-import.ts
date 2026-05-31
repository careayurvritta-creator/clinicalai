import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface ImportedDemographics {
  name: string
  age: number | null
  gender: string | null
  occupation: string | null
  area: string | null
  phone: string | null
  source: 'treatment_protocol'
}

/**
 * Check if a patient has existing case data in the Treatment Protocol module.
 * If found, extract demographics to pre-populate the patient creation form.
 */
export async function importFromTreatmentProtocol(
  patientName: string,
  clinicalId?: string
): Promise<ImportedDemographics | null> {
  try {
    // Search cases table for matching patient name
    let query = supabase
      .from('cases')
      .select('name, age, gender, occupation, area')
      .ilike('name', `%${patientName}%`)
      .order('created_at', { ascending: false })
      .limit(1)

    const { data, error } = await query

    if (error || !data || data.length === 0) return null

    const caseData = data[0]
    return {
      name: caseData.name || patientName,
      age: caseData.age ?? null,
      gender: caseData.gender ?? null,
      occupation: caseData.occupation ?? null,
      area: caseData.area ?? null,
      phone: null, // cases table doesn't store phone
      source: 'treatment_protocol',
    }
  } catch {
    return null
  }
}
