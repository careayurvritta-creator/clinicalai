export const DOCUMENT_CATEGORIES = [
  { slug: 'investigation-reports', label: 'Investigation Reports', icon: 'FlaskConical', description: 'Blood tests, imaging, biopsy, lab reports', accept: '.pdf,.jpg,.jpeg,.png,.webp' },
  { slug: 'opd-consultation-sheets', label: 'OPD Consultation Sheets', icon: 'FileText', description: 'Date-wise OPD visit records', accept: '.pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png' },
  { slug: 'ipd-sheets', label: 'IPD Sheets', icon: 'BedDouble', description: 'Admission/discharge records, date-wise', accept: '.pdf,.xlsx,.xls,.csv' },
  { slug: 'opd-registers', label: 'OPD Registers', icon: 'BookOpen', description: 'OPD register entries', accept: '.pdf,.xlsx,.xls,.csv' },
  { slug: 'ipd-registers', label: 'IPD Registers', icon: 'BookOpenCheck', description: 'IPD register entries', accept: '.pdf,.xlsx,.xls,.csv' },
  { slug: 'panchakarma-notes', label: 'Panchakarma Notes', icon: 'Leaf', description: 'Panchakarma therapy session records', accept: '.pdf,.jpg,.jpeg,.png,.docx' },
  { slug: 'reimbursement-forms', label: 'Reimbursement Forms', icon: 'Receipt', description: 'CGHS/insurance claim forms', accept: '.pdf,.jpg,.jpeg,.png,.xlsx,.xls' },
  { slug: 'medical-certificates', label: 'Medical Certificates', icon: 'Award', description: 'Fitness certificates, referral letters', accept: '.pdf,.jpg,.jpeg,.png,.docx' },
  { slug: 'prescriptions', label: 'Prescriptions', icon: 'Pill', description: 'Prescribed medications', accept: '.pdf,.jpg,.jpeg,.png' },
  { slug: 'discharge-summaries', label: 'Discharge Summaries', icon: 'ClipboardCheck', description: 'Hospital discharge documents', accept: '.pdf,.jpg,.jpeg,.png,.docx' },
] as const

export type DocumentCategory = typeof DOCUMENT_CATEGORIES[number]['slug']

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
] as const

export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.xls', '.xlsx', '.csv'] as const

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export const FILE_TYPE_ICONS: Record<string, string> = {
  'application/pdf': 'FileText',
  'image/jpeg': 'Image',
  'image/png': 'Image',
  'image/webp': 'Image',
  'application/vnd.ms-excel': 'Table',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Table',
  'text/csv': 'Table',
}

const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: 'PDF',
  jpg: 'Image',
  jpeg: 'Image',
  png: 'Image',
  webp: 'Image',
  xls: 'Excel',
  xlsx: 'Excel',
  csv: 'CSV',
  docx: 'Word',
  doc: 'Word',
}

export function getFileTypeLabel(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return FILE_TYPE_LABELS[ext] ?? 'File'
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf('.')).toLowerCase()
}

export function sanitizeForPath(name: string): string {
  return name.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_').trim()
}

export const STORAGE_BUCKET = 'patient-documents'

export function buildStoragePath(
  clinicalId: string,
  patientName: string,
  categoryId: string,
  filename: string
): string {
  const sanitizedName = patientName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_')
  const datePrefix = new Date().toISOString().split('T')[0]
  return `${clinicalId}_${sanitizedName}/${categoryId}/${datePrefix}_${filename}`
}
