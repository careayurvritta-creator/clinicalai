// Insurance Templates — Mixed format
// IRDAI Pre-Authorisation Form, Authorization Status

import type { DocumentTemplate } from '../types'

export const irdaiPreAuth: DocumentTemplate = {
  id: 'irdai-pre-auth',
  name: 'IRDAI Pre-Authorisation Form',
  description: 'Insurance pre-authorization form for cashless treatment claims',
  category: 'insurance',
  format: 'document',
  sections: [
    {
      id: 'patient-info',
      title: 'Patient Information',
      fields: [
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'patient_code', label: 'Patient Code', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'uhid', label: 'UHID', type: 'text', required: false, autoFillFrom: 'patient.uhid' },
        { name: 'abha_id', label: 'ABHA ID', type: 'text', required: false, autoFillFrom: 'patient.abha_id' },
      ],
    },
    {
      id: 'insurance-details',
      title: 'Insurance Details',
      fields: [
        { name: 'insurance_company', label: 'Insurance Company', type: 'text', required: true },
        { name: 'policy_number', label: 'Policy Number', type: 'text', required: true },
        { name: 'tpa', label: 'TPA', type: 'text', required: true },
        { name: 'claim_type', label: 'Claim Type', type: 'select', required: true, options: [
          { value: 'cashless', label: 'Cashless' },
          { value: 'reimbursement', label: 'Reimbursement' },
        ]},
        { name: 'member_id', label: 'Member ID', type: 'text', required: false },
        { name: 'group_id', label: 'Group ID', type: 'text', required: false },
      ],
    },
    {
      id: 'treatment-details',
      title: 'Treatment Details',
      fields: [
        { name: 'diagnosis', label: 'Diagnosis (Ayurvedic)', type: 'text', required: true },
        { name: 'icd_codes', label: 'ICD Codes', type: 'text', required: false },
        { name: 'modern_correlation', label: 'Modern Diagnosis', type: 'text', required: false },
        { name: 'treatment', label: 'Treatment Proposed', type: 'multiline', required: true },
        { name: 'procedures', label: 'Panchakarma Procedures', type: 'multiline', required: false },
        { name: 'estimated_stay', label: 'Estimated Stay (days)', type: 'number', required: true },
        { name: 'estimated_cost', label: 'Estimated Cost (₹)', type: 'currency', required: true },
        { name: 'admission_date', label: 'Date of Admission', type: 'date', required: true },
      ],
    },
    {
      id: 'hospital-details',
      title: 'Hospital Details',
      fields: [
        { name: 'hospital_name', label: 'Hospital Name', type: 'text', required: true, defaultValue: 'AyurVritta Ayurveda' },
        { name: 'hospital_address', label: 'Hospital Address', type: 'text', required: true },
        { name: 'doctor_name', label: 'Treating Doctor', type: 'text', required: true },
        { name: 'doctor_qualification', label: 'Doctor Qualification', type: 'text', required: false },
      ],
    },
  ],
}

export const authorizationStatus: DocumentTemplate = {
  id: 'authorization-status',
  name: 'Authorization Status',
  description: 'Track insurance authorization approval status and details',
  category: 'authorization',
  format: 'spreadsheet',
  sections: [
    {
      id: 'authorization',
      title: 'Authorization Details',
      fields: [
        { name: 'claim_number', label: 'Claim Number', type: 'text', required: true },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'insurance_company', label: 'Insurance Company', type: 'text', required: true },
        { name: 'authorization_status', label: 'Status', type: 'select', required: true, options: [
          { value: 'submitted', label: 'Submitted' },
          { value: 'under-review', label: 'Under Review' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' },
          { value: 'partial', label: 'Partially Approved' },
        ]},
        { name: 'approved_amount', label: 'Approved Amount (₹)', type: 'currency', required: false },
        { name: 'requested_amount', label: 'Requested Amount (₹)', type: 'currency', required: true },
        { name: 'validity_from', label: 'Valid From', type: 'date', required: false },
        { name: 'validity_to', label: 'Valid To', type: 'date', required: false },
        { name: 'remarks', label: 'Remarks', type: 'text', required: false },
        { name: 'updated_at', label: 'Last Updated', type: 'date', required: true },
      ],
    },
  ],
}
