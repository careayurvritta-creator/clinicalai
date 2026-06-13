import type { DocumentTemplate } from './types'

interface PatientData {
  name?: string
  age?: number | null
  gender?: string | null
  phone?: string | null
  address?: string | null
  occupation?: string | null
  uhid?: string | null
  comorbidities?: unknown
  allergies?: string | null
  medical_history?: string | null
  prakriti?: string | null
  vikriti?: string | null
  blood_group?: string | null
  area?: string | null
  [key: string]: unknown
}

/**
 * Resolve autoFillFrom references in template fields against patient data.
 * Manual data values take precedence over auto-filled values.
 */
export function resolveAutoFill(
  template: DocumentTemplate,
  patient: PatientData,
  manualData: Record<string, unknown>
): Record<string, unknown> {
  const resolved: Record<string, unknown> = {}

  for (const section of template.sections) {
    for (const field of section.fields) {
      const fieldName = field.name

      // Manual data takes precedence
      if (fieldName in manualData && manualData[fieldName] !== undefined) {
        resolved[fieldName] = manualData[fieldName]
        continue
      }

      // Resolve autoFillFrom
      if (field.autoFillFrom) {
        const value = resolveAutoFillFrom(field.autoFillFrom, patient)
        if (value !== undefined && value !== null) {
          resolved[fieldName] = value
        }
      }

      // Fall back to default value
      if (fieldName in resolved === false && 'defaultValue' in field && field.defaultValue !== undefined) {
        resolved[fieldName] = field.defaultValue
      }
    }
  }

  return resolved
}

function resolveAutoFillFrom(ref: string, patient: PatientData): unknown {
  const now = new Date()

  switch (ref) {
    case 'currentDate':
      return now.toISOString().split('T')[0]
    case 'currentTime':
      return now.toTimeString().split(' ')[0].slice(0, 5)
    case 'patient.name':
      return patient.name
    case 'patient.age':
      return patient.age
    case 'patient.gender':
      return patient.gender
    case 'patient.phone':
      return patient.phone
    case 'patient.address':
      return patient.address
    case 'patient.occupation':
      return patient.occupation
    case 'patient.uhid':
      return patient.uhid
    case 'patient.comorbidities':
      return Array.isArray(patient.comorbidities)
        ? patient.comorbidities.join(', ')
        : patient.comorbidities
    case 'patient.allergies':
      return patient.allergies
    case 'patient.medical_history':
      return patient.medical_history
    case 'patient.prakriti':
      return patient.prakriti
    case 'patient.vikriti':
      return patient.vikriti
    case 'patient.blood_group':
      return patient.blood_group
    case 'patient.area':
      return patient.area
    default:
      if (ref.startsWith('patient.')) {
        const key = ref.replace('patient.', '')
        return patient[key]
      }
      return undefined
  }
}
