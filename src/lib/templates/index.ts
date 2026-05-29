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
