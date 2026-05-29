// Certificate Templates — Document format
// Medical Certificate, Garbha Sanskar Certificate

import type { DocumentTemplate } from '../types'

export const medicalCertificate: DocumentTemplate = {
  id: 'medical-certificate',
  name: 'Medical Certificate',
  description: 'Medical fitness/leave certificate for employer or insurance purposes',
  category: 'certificates',
  format: 'document',
  sections: [
    {
      id: 'certificate',
      title: 'Certificate Details',
      fields: [
        { name: 'certificate_no', label: 'Certificate No.', type: 'text', required: true, description: 'Format: MC-YYMM-NNN' },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'purpose', label: 'Purpose', type: 'select', required: true, options: [
          { value: 'leave', label: 'Medical Leave' },
          { value: 'fitness', label: 'Fitness Certificate' },
          { value: 'insurance', label: 'Insurance Claim' },
          { value: 'travel', label: 'Travel Fitness' },
          { value: 'employment', label: 'Employment' },
        ]},
        { name: 'diagnosis', label: 'Diagnosis', type: 'text', required: true },
        { name: 'period_from', label: 'Period From', type: 'date', required: false },
        { name: 'period_to', label: 'Period To', type: 'date', required: false },
        { name: 'fitness_status', label: 'Fitness Status', type: 'select', required: true, options: [
          { value: 'fit', label: 'Fit' },
          { value: 'fit-with-restrictions', label: 'Fit with Restrictions' },
          { value: 'unfit', label: 'Unfit' },
          { value: 'light-work', label: 'Fit for Light Work' },
        ]},
        { name: 'restrictions', label: 'Restrictions/Recommendations', type: 'multiline', required: false },
        { name: 'doctor_name', label: 'Doctor Name', type: 'text', required: true },
        { name: 'doctor_qualification', label: 'Doctor Qualification', type: 'text', required: false },
      ],
    },
  ],
}

export const garbhaSanskarCertificate: DocumentTemplate = {
  id: 'garbha-sanskar-certificate',
  name: 'Garbha Sanskar Certificate',
  description: 'Certificate for Garbha Sanskar (prenatal care) program participation',
  category: 'garbha-sanskar',
  format: 'document',
  sections: [
    {
      id: 'certificate',
      title: 'Certificate Details',
      fields: [
        { name: 'certificate_no', label: 'Certificate No.', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'partner_name', label: 'Partner Name', type: 'text', required: false },
        { name: 'pregnancy_week', label: 'Pregnancy Week', type: 'number', required: false },
        { name: 'edd', label: 'Expected Due Date', type: 'date', required: false },
        { name: 'program_period_from', label: 'Program Period From', type: 'date', required: false },
        { name: 'program_period_to', label: 'Program Period To', type: 'date', required: false },
        { name: 'prakriti', label: 'Prakriti', type: 'text', required: false },
        { name: 'special_instructions', label: 'Special Instructions', type: 'multiline', required: false },
        { name: 'doctor_name', label: 'Doctor Name', type: 'text', required: true },
      ],
    },
  ],
}
