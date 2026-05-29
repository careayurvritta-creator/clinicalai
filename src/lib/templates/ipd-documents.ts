// IPD Document Templates — Mixed format
// Admission Note, Treatment Plan, Consultant Rounds

import type { DocumentTemplate } from '../types'

export const admissionNote: DocumentTemplate = {
  id: 'ipd-admission-note',
  name: 'IPD Admission Note',
  description: 'In-patient admission record with vitals, diagnosis, treatment plan, and consent',
  category: 'admission-notes',
  format: 'document',
  sections: [
    {
      id: 'admission',
      title: 'Admission Details',
      fields: [
        { name: 'admission_date', label: 'Admission Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'admission_time', label: 'Admission Time', type: 'time', required: true, autoFillFrom: 'currentTime' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'admitting_doctor', label: 'Admitting Doctor', type: 'text', required: true },
        { name: 'room', label: 'Room', type: 'text', required: false },
        { name: 'bed', label: 'Bed', type: 'text', required: false },
      ],
    },
    {
      id: 'vitals',
      title: 'Vitals at Admission',
      fields: [
        { name: 'bp', label: 'Blood Pressure (mmHg)', type: 'text', required: false },
        { name: 'pulse', label: 'Pulse (/min)', type: 'text', required: false },
        { name: 'temperature', label: 'Temperature (°F)', type: 'text', required: false },
        { name: 'spo2', label: 'SpO2 (%)', type: 'text', required: false },
        { name: 'weight', label: 'Weight (kg)', type: 'number', required: false },
        { name: 'height', label: 'Height (cm)', type: 'number', required: false },
        { name: 'bmi', label: 'BMI', type: 'number', required: false },
      ],
    },
    {
      id: 'clinical',
      title: 'Clinical Information',
      fields: [
        { name: 'chief_complaints', label: 'Chief Complaints', type: 'multiline', required: true },
        { name: 'provisional_diagnosis', label: 'Provisional Diagnosis', type: 'text', required: true },
        { name: 'treatment_plan', label: 'Treatment Plan', type: 'multiline', required: true },
        { name: 'allergies', label: 'Known Allergies', type: 'text', required: false },
        { name: 'ongoing_medications', label: 'Ongoing Medications', type: 'multiline', required: false },
        { name: 'comorbidities', label: 'Comorbidities', type: 'text', required: false },
      ],
    },
    {
      id: 'consent',
      title: 'Consent & Allergies',
      fields: [
        { name: 'consent_obtained', label: 'Consent Obtained', type: 'boolean', required: true, defaultValue: true },
        { name: 'allergy_bands', label: 'Allergy Bands Applied', type: 'boolean', required: false },
        { name: 'special_instructions', label: 'Special Instructions', type: 'multiline', required: false },
      ],
    },
  ],
}

export const treatmentPlan: DocumentTemplate = {
  id: 'ipd-treatment-plan',
  name: 'IPD Treatment Plan',
  description: 'Detailed Panchakarma treatment plan with Poorvakarma, Pradhana Karma, and Paschat Karma',
  category: 'treatment-plans',
  format: 'document',
  sections: [
    {
      id: 'patient',
      title: 'Patient Information',
      fields: [
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'diagnosis', label: 'Diagnosis', type: 'text', required: true },
        { name: 'doctor', label: 'Treating Doctor', type: 'text', required: true },
        { name: 'start_date', label: 'Treatment Start Date', type: 'date', required: true },
        { name: 'duration', label: 'Total Duration (days)', type: 'number', required: true },
      ],
    },
    {
      id: 'poorvakarma',
      title: 'Poorvakarma (Preparatory Procedures)',
      fields: [
        { name: 'snehana', label: 'Snehana (Oleation)', type: 'multiline', required: false, description: 'Internal/external oleation details' },
        { name: 'swedana', label: 'Swedana (Sudation)', type: 'multiline', required: false, description: 'Fomentation type and duration' },
        { name: 'deepana_pachana', label: 'Deepana-Pachana', type: 'multiline', required: false, description: 'Digestive fire kindling medicines' },
        { name: 'duration_days', label: 'Duration (days)', type: 'number', required: false },
        { name: 'frequency', label: 'Frequency', type: 'text', required: false },
      ],
    },
    {
      id: 'pradhana-karma',
      title: 'Pradhana Karma (Main Procedures)',
      fields: [
        { name: 'procedures', label: 'Panchakarma Procedures', type: 'multiline', required: true, description: 'Vamana/Virechana/Basti/Nasya/Raktamokshana details' },
        { name: 'duration_days', label: 'Duration (days)', type: 'number', required: false },
        { name: 'frequency', label: 'Frequency', type: 'text', required: false },
        { name: 'precautions', label: 'Precautions', type: 'multiline', required: false },
      ],
    },
    {
      id: 'paschat-karma',
      title: 'Paschat Karma (Post-Treatment)',
      fields: [
        { name: 'shamana', label: 'Shamana Aushadhi', type: 'multiline', required: false, description: 'Pacifying medications post-procedure' },
        { name: 'rasayana', label: 'Rasayana (Rejuvenation)', type: 'multiline', required: false },
        { name: 'duration_days', label: 'Duration (days)', type: 'number', required: false },
      ],
    },
    {
      id: 'diet',
      title: 'Diet & Lifestyle',
      fields: [
        { name: 'pathya', label: 'Pathya (Recommended)', type: 'multiline', required: false },
        { name: 'apathya', label: 'Apathya (To Avoid)', type: 'multiline', required: false },
        { name: 'lifestyle', label: 'Lifestyle Instructions', type: 'multiline', required: false },
      ],
    },
  ],
}

export const roundsNote: DocumentTemplate = {
  id: 'ipd-rounds-note',
  name: 'IPD Consultant/MO Rounds Note',
  description: 'Daily rounds note by consultant or medical officer',
  category: 'rounds-notes',
  format: 'document',
  sections: [
    {
      id: 'round',
      title: 'Rounds Details',
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'time', label: 'Time', type: 'time', required: true, autoFillFrom: 'currentTime' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'doctor', label: 'Consultant/MO', type: 'text', required: true },
        { name: 'round_type', label: 'Round Type', type: 'select', required: true, options: [
          { value: 'morning', label: 'Morning Round' },
          { value: 'evening', label: 'Evening Round' },
          { value: 'special', label: 'Special Round' },
        ]},
      ],
    },
    {
      id: 'vitals',
      title: 'Vitals',
      fields: [
        { name: 'bp', label: 'Blood Pressure', type: 'text', required: false },
        { name: 'pulse', label: 'Pulse', type: 'text', required: false },
        { name: 'temperature', label: 'Temperature', type: 'text', required: false },
        { name: 'spo2', label: 'SpO2', type: 'text', required: false },
      ],
    },
    {
      id: 'clinical-notes',
      title: 'Clinical Notes',
      fields: [
        { name: 'subjective', label: 'Subjective (Patient Complaints)', type: 'multiline', required: false },
        { name: 'objective', label: 'Objective (Examination Findings)', type: 'multiline', required: false },
        { name: 'assessment', label: 'Assessment', type: 'multiline', required: false },
        { name: 'plan', label: 'Plan', type: 'multiline', required: false },
      ],
    },
    {
      id: 'orders',
      title: 'Orders & Changes',
      fields: [
        { name: 'medication_changes', label: 'Medication Changes', type: 'multiline', required: false },
        { name: 'investigations_ordered', label: 'Investigations Ordered', type: 'multiline', required: false },
        { name: 'special_orders', label: 'Special Orders', type: 'multiline', required: false },
        { name: 'diet_changes', label: 'Diet Changes', type: 'text', required: false },
      ],
    },
  ],
}
