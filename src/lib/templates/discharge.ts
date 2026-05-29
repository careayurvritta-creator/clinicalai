// Discharge Templates — Mixed format
// Discharge Plan, Discharge Summary

import type { DocumentTemplate } from '../types'

export const dischargePlan: DocumentTemplate = {
  id: 'ipd-discharge-plan',
  name: 'IPD Discharge Plan',
  description: 'Post-discharge plan with medications, diet, exercises, and follow-up',
  category: 'discharge-plans',
  format: 'document',
  sections: [
    {
      id: 'patient',
      title: 'Patient Information',
      fields: [
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'discharge_date', label: 'Discharge Date', type: 'date', required: true },
        { name: 'condition', label: 'Condition at Discharge', type: 'select', required: true, options: [
          { value: 'improved', label: 'Improved' },
          { value: 'stable', label: 'Stable' },
          { value: 'recovered', label: 'Recovered' },
          { value: 'referred', label: 'Referred' },
        ]},
      ],
    },
    {
      id: 'medications',
      title: 'Discharge Medications',
      repeatable: true,
      fields: [
        { name: 'medicine', label: 'Medicine', type: 'text', required: true },
        { name: 'dose', label: 'Dose', type: 'text', required: true },
        { name: 'frequency', label: 'Frequency', type: 'select', required: true, options: [
          { value: 'OD', label: 'Once Daily (OD)' },
          { value: 'BD', label: 'Twice Daily (BD)' },
          { value: 'TDS', label: 'Thrice Daily (TDS)' },
          { value: 'QID', label: 'Four Times (QID)' },
          { value: 'HS', label: 'At Bedtime (HS)' },
          { value: 'PRN', label: 'As Needed (PRN)' },
        ]},
        { name: 'duration', label: 'Duration', type: 'text', required: true, description: 'e.g., 15 days, 1 month' },
        { name: 'instructions', label: 'Special Instructions', type: 'text', required: false },
      ],
    },
    {
      id: 'advice',
      title: 'Discharge Advice',
      fields: [
        { name: 'pathya', label: 'Pathya (Recommended Diet)', type: 'multiline', required: false },
        { name: 'apathya', label: 'Apathya (To Avoid)', type: 'multiline', required: false },
        { name: 'exercises', label: 'Exercises', type: 'multiline', required: false },
        { name: 'restrictions', label: 'Restrictions', type: 'multiline', required: false },
        { name: 'followup_date', label: 'Follow-up Date', type: 'date', required: true },
        { name: 'followup_instructions', label: 'Follow-up Instructions', type: 'multiline', required: false },
      ],
    },
  ],
}

export const dischargeSummary: DocumentTemplate = {
  id: 'discharge-summary',
  name: 'Discharge Summary',
  description: 'Complete discharge summary with diagnosis, treatment received, and outcome',
  category: 'discharge-summaries',
  format: 'document',
  sections: [
    {
      id: 'header',
      title: 'Discharge Details',
      fields: [
        { name: 'discharge_no', label: 'Discharge No.', type: 'text', required: true, description: 'Format: AYR-IPD-YYMM-NNN' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'admission_date', label: 'Admission Date', type: 'date', required: true },
        { name: 'discharge_date', label: 'Discharge Date', type: 'date', required: true },
        { name: 'stay_duration', label: 'Total Stay (days)', type: 'number', required: true },
        { name: 'discharge_condition', label: 'Condition at Discharge', type: 'select', required: true, options: [
          { value: 'improved', label: 'Improved' },
          { value: 'stable', label: 'Stable' },
          { value: 'recovered', label: 'Recovered' },
          { value: 'referred', label: 'Referred' },
        ]},
      ],
    },
    {
      id: 'diagnosis',
      title: 'Discharge Diagnosis',
      repeatable: true,
      fields: [
        { name: 'diagnosis', label: 'Diagnosis', type: 'text', required: true },
        { name: 'ayurvedic_name', label: 'Ayurvedic Name', type: 'text', required: false },
        { name: 'status', label: 'Status', type: 'select', required: false, options: [
          { value: 'improved', label: 'Improved' },
          { value: 'resolved', label: 'Resolved' },
          { value: 'stable', label: 'Stable' },
          { value: 'ongoing', label: 'Ongoing' },
        ]},
      ],
    },
    {
      id: 'treatment-received',
      title: 'Treatment Received',
      fields: [
        { name: 'panchakarma', label: 'Panchakarma Procedures', type: 'multiline', required: false },
        { name: 'internal_medicines', label: 'Internal Medicines', type: 'multiline', required: false },
        { name: 'external_treatments', label: 'External Treatments', type: 'multiline', required: false },
        { name: 'other_treatments', label: 'Other Treatments', type: 'multiline', required: false },
      ],
    },
    {
      id: 'investigations',
      title: 'Investigations During Stay',
      repeatable: true,
      fields: [
        { name: 'investigation', label: 'Investigation', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: false },
        { name: 'finding', label: 'Finding', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'select', required: false, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'abnormal', label: 'Abnormal' },
        ]},
      ],
    },
    {
      id: 'discharge-medications',
      title: 'Discharge Medications',
      repeatable: true,
      fields: [
        { name: 'medicine', label: 'Medicine', type: 'text', required: true },
        { name: 'dose', label: 'Dose', type: 'text', required: true },
        { name: 'frequency', label: 'Frequency', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true },
      ],
    },
    {
      id: 'advice',
      title: 'Discharge Advice',
      fields: [
        { name: 'pathya', label: 'Pathya (Recommended)', type: 'multiline', required: false },
        { name: 'apathya', label: 'Apathya (To Avoid)', type: 'multiline', required: false },
        { name: 'followup_date', label: 'Follow-up Date', type: 'date', required: true },
        { name: 'exercises', label: 'Exercises', type: 'multiline', required: false },
        { name: 'restrictions', label: 'Restrictions', type: 'multiline', required: false },
      ],
    },
    {
      id: 'billing',
      title: 'Billing Summary',
      fields: [
        { name: 'total_amount', label: 'Total Amount (₹)', type: 'currency', required: false },
        { name: 'paid_amount', label: 'Paid Amount (₹)', type: 'currency', required: false },
        { name: 'insurance_claim', label: 'Insurance Claim', type: 'text', required: false },
      ],
    },
  ],
}
