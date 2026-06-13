// Template Registry — Central index for all 20 document templates
import type { DocumentTemplate, DocumentCategory } from '../types'
import { opdVisitRegister, opdTherapyRegister, ipdVisitRegister, procedureRegister } from './registers'
import { consultationNote } from './clinical-notes'
import { invoice, receipt } from './financial'
import { irdaiPreAuth, authorizationStatus } from './insurance'
import { admissionNote, treatmentPlan, roundsNote } from './ipd-documents'
import { nursingMedicineChart, nursingPanchakarmaChart } from './nursing-charts'
import { dischargePlan, dischargeSummary } from './discharge'
import { medicalCertificate, garbhaSanskarCertificate } from './certificates'
import { labReport } from './lab-reports'
import { prescription } from './prescriptions'

export const ALL_TEMPLATES: DocumentTemplate[] = [
  // Registers (Spreadsheet)
  opdVisitRegister,
  opdTherapyRegister,
  ipdVisitRegister,
  procedureRegister,

  // Clinical Notes (Document)
  consultationNote,

  // Financial (Spreadsheet)
  invoice,
  receipt,

  // Insurance (Mixed)
  irdaiPreAuth,
  authorizationStatus,

  // IPD Documents (Mixed)
  admissionNote,
  treatmentPlan,
  roundsNote,

  // Nursing Charts (Spreadsheet)
  nursingMedicineChart,
  nursingPanchakarmaChart,

  // Discharge (Mixed)
  dischargePlan,
  dischargeSummary,

  // Certificates (Document)
  medicalCertificate,
  garbhaSanskarCertificate,

  // Reports (Spreadsheet)
  labReport,

  // Prescriptions (Document)
  prescription,
]

export const TEMPLATE_MAP = new Map<string, DocumentTemplate>(
  ALL_TEMPLATES.map(t => [t.id, t])
)

export const TEMPLATES_BY_CATEGORY = ALL_TEMPLATES.reduce(
  (acc, template) => {
    if (!acc[template.category]) acc[template.category] = []
    acc[template.category].push(template)
    return acc
  },
  {} as Record<string, DocumentTemplate[]>
)

export function getTemplate(id: string): DocumentTemplate | undefined {
  return TEMPLATE_MAP.get(id)
}

export function getTemplatesForCategory(category: DocumentCategory): DocumentTemplate[] {
  return TEMPLATES_BY_CATEGORY[category] ?? []
}

export const DOCUMENT_CATEGORIES: { id: DocumentCategory; label: string; icon: string }[] = [
  { id: 'opd-registers', label: 'OPD Visit Registers', icon: 'clipboard-list' },
  { id: 'therapy-registers', label: 'OPD Therapy Registers', icon: 'heart-pulse' },
  { id: 'ipd-registers', label: 'IPD Visit Registers', icon: 'bed-double' },
  { id: 'procedure-registers', label: 'Panchakarma Procedure Registers', icon: 'activity' },
  { id: 'consultation-notes', label: 'OPD Consultation Notes', icon: 'stethoscope' },
  { id: 'invoices', label: 'Invoices', icon: 'indian-rupee' },
  { id: 'insurance', label: 'Insurance Forms', icon: 'shield-check' },
  { id: 'admission-notes', label: 'IPD Admission Notes', icon: 'clipboard-plus' },
  { id: 'treatment-plans', label: 'IPD Treatment Plans', icon: 'pill' },
  { id: 'rounds-notes', label: 'Consultant Rounds Notes', icon: 'user-check' },
  { id: 'nursing-medicine', label: 'Nursing Medicine Charts', icon: 'syringe' },
  { id: 'nursing-panchakarma', label: 'Nursing Panchakarma Charts', icon: 'hand' },
  { id: 'discharge-plans', label: 'IPD Discharge Plans', icon: 'file-check' },
  { id: 'discharge-summaries', label: 'Discharge Summaries', icon: 'file-text' },
  { id: 'certificates', label: 'Medical Certificates', icon: 'award' },
  { id: 'receipts', label: 'Receipts', icon: 'receipt' },
  { id: 'authorization', label: 'Authorization Status', icon: 'key-round' },
  { id: 'garbha-sanskar', label: 'Garbha Sanskar Certificates', icon: 'baby' },
  { id: 'lab-reports', label: 'Lab Reports', icon: 'flask-conical' },
  { id: 'prescriptions', label: 'Prescriptions', icon: 'pill' },
]

// ─── Template Intelligence Helpers ──────────────────────────────────────────

/**
 * Returns a map of field names to human-friendly questions for AI conversation.
 * For select fields, includes the available options in the prompt.
 */
export function getFieldPrompts(templateId: string): Record<string, string> {
  const template = TEMPLATE_MAP.get(templateId)
  if (!template) return {}

  const prompts: Record<string, string> = {}
  for (const section of template.sections) {
    for (const field of section.fields) {
      let prompt = `What is the patient's ${field.label.toLowerCase()}?`
      if (field.type === 'select' && field.options && field.options.length > 0) {
        const optionLabels = field.options.map(o => o.label).join(', ')
        prompt += ` Options: ${optionLabels}.`
      }
      prompts[field.name] = prompt
    }
  }
  return prompts
}

/**
 * Returns field names that have NO defaultValue — these must be collected from the user.
 */
export function getRequiredFields(templateId: string): string[] {
  const template = TEMPLATE_MAP.get(templateId)
  if (!template) return []

  return template.sections
    .flatMap(s => s.fields)
    .filter(f => f.defaultValue === undefined || f.defaultValue === null || f.defaultValue === '')
    .map(f => f.name)
}

/**
 * Returns a human-readable summary of what the template contains.
 * Useful for the AI to describe templates to users.
 */
export function getTemplateSummary(templateId: string): string {
  const template = TEMPLATE_MAP.get(templateId)
  if (!template) return `Template "${templateId}" not found.`

  const totalFields = template.sections.reduce((sum, s) => sum + s.fields.length, 0)
  const sectionNames = template.sections.map(s => s.title).join(', ')

  return [
    `${template.name} (${template.format} format)`,
    template.description,
    `Contains ${template.sections.length} section(s): ${sectionNames}.`,
    `Total fields: ${totalFields}.`,
  ].join(' ')
}

/**
 * Returns a formatted string listing ALL templates grouped by category.
 * Designed for injection into the system prompt.
 */
export function getTemplateCatalog(): string {
  const lines: string[] = ['## Available Document Templates', '']

  for (const cat of DOCUMENT_CATEGORIES) {
    const templates = TEMPLATES_BY_CATEGORY[cat.id]
    if (!templates || templates.length === 0) continue

    lines.push(`### ${cat.label}`)
    for (const t of templates) {
      lines.push(`- **${t.name}** (ID: \`${t.id}\`, Format: ${t.format}) — ${t.description}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Returns IDs of related templates based on clinical workflow relationships.
 */
export function getRelatedTemplates(templateId: string): string[] {
  const relations: Record<string, string[]> = {
    'opd-visit-register': ['opd-consultation-note', 'prescription', 'invoice'],
    'opd-consultation-note': ['prescription', 'opd-visit-register'],
    'ipd-admission-note': ['ipd-treatment-plan', 'nursing-medicine-chart', 'nursing-panchakarma-chart', 'ipd-rounds-note'],
    'ipd-treatment-plan': ['ipd-rounds-note', 'nursing-medicine-chart', 'nursing-panchakarma-chart'],
    'ipd-rounds-note': ['ipd-treatment-plan', 'ipd-discharge-plan'],
    'ipd-discharge-plan': ['discharge-summary', 'prescription'],
    'discharge-summary': ['ipd-discharge-plan', 'prescription', 'medical-certificate'],
    'prescription': ['invoice', 'receipt'],
    'invoice': ['receipt'],
    'irdai-pre-auth': ['authorization-status'],
    'medical-certificate': [],
    'lab-report': ['opd-consultation-note'],
    'garbha-sanskar-certificate': [],
  }

  return relations[templateId] ?? []
}
