// Prescription Template — Document format
// Prescriptions with medications, dose, frequency, duration

import type { DocumentTemplate } from '../types'

export const prescription: DocumentTemplate = {
  id: 'prescription',
  name: 'Prescription',
  description: 'Medication prescription with internal and external medicines',
  category: 'prescriptions',
  format: 'document',
  sections: [
    {
      id: 'header',
      title: 'Prescription Header',
      fields: [
        { name: 'prescription_no', label: 'Prescription No.', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'weight', label: 'Weight (kg)', type: 'number', required: false },
        { name: 'doctor', label: 'Prescribing Doctor', type: 'text', required: true },
      ],
    },
    {
      id: 'diagnosis',
      title: 'Diagnosis',
      fields: [
        { name: 'diagnosis', label: 'Diagnosis', type: 'text', required: true },
        { name: 'ayurvedic_diagnosis', label: 'Ayurvedic Diagnosis', type: 'text', required: false },
      ],
    },
    {
      id: 'internal-medicines',
      title: 'Internal Medicines (Shamana Aushadhi)',
      repeatable: true,
      fields: [
        { name: 'sr_no', label: 'Sr.', type: 'number', required: true },
        { name: 'medicine', label: 'Medicine Name', type: 'text', required: true },
        { name: 'form', label: 'Form', type: 'select', required: false, options: [
          { value: 'tablet', label: 'Tablet' },
          { value: 'capsule', label: 'Capsule' },
          { value: 'churna', label: 'Churna (Powder)' },
          { value: 'kwath', label: 'Kwath (Decoction)' },
          { value: 'avaleha', label: 'Avaleha (Confection)' },
          { value: 'ghrita', label: 'Ghrita (Medicated Ghee)' },
          { value: 'taila', label: 'Taila (Oil)' },
          { value: 'arishta', label: 'Arishta (Fermented)' },
          { value: 'asava', label: 'Asava (Fermented)' },
          { value: 'vati', label: 'Vati (Pill)' },
          { value: 'other', label: 'Other' },
        ]},
        { name: 'dose', label: 'Dose', type: 'text', required: true },
        { name: 'frequency', label: 'Frequency', type: 'select', required: true, options: [
          { value: 'OD', label: 'Once Daily (OD)' },
          { value: 'BD', label: 'Twice Daily (BD)' },
          { value: 'TDS', label: 'Thrice Daily (TDS)' },
          { value: 'QID', label: 'Four Times (QID)' },
          { value: 'HS', label: 'At Bedtime (HS)' },
          { value: 'PRN', label: 'As Needed (PRN)' },
        ]},
        { name: 'timing', label: 'Timing', type: 'select', required: false, options: [
          { value: 'before-food', label: 'Before Food' },
          { value: 'after-food', label: 'After Food' },
          { value: 'empty-stomach', label: 'Empty Stomach' },
          { value: 'with-food', label: 'With Food' },
        ]},
        { name: 'duration', label: 'Duration', type: 'text', required: true },
        { name: 'anupana', label: 'Anupana (Vehicle)', type: 'text', required: false, description: 'e.g., warm water, milk, honey' },
      ],
    },
    {
      id: 'external-medicines',
      title: 'External Applications (Bahya Aushadhi)',
      repeatable: true,
      fields: [
        { name: 'sr_no', label: 'Sr.', type: 'number', required: true },
        { name: 'medicine', label: 'Medicine Name', type: 'text', required: true },
        { name: 'form', label: 'Form', type: 'select', required: false, options: [
          { value: 'taila', label: 'Taila (Oil)' },
          { value: 'lepa', label: 'Lepa (Paste)' },
          { value: 'ghrita', label: 'Ghrita (Ghee)' },
          { value: 'malahara', label: 'Malahara (Ointment)' },
          { value: 'churna', label: 'Churna (Powder)' },
          { value: 'other', label: 'Other' },
        ]},
        { name: 'application', label: 'Application Method', type: 'text', required: true, description: 'e.g., Local massage, Nasya, Basti' },
        { name: 'frequency', label: 'Frequency', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true },
        { name: 'instructions', label: 'Instructions', type: 'text', required: false },
      ],
    },
    {
      id: 'pathya-apathya',
      title: 'Diet & Lifestyle',
      fields: [
        { name: 'pathya', label: 'Pathya (Recommended)', type: 'multiline', required: false },
        { name: 'apathya', label: 'Apathya (To Avoid)', type: 'multiline', required: false },
      ],
    },
    {
      id: 'footer',
      title: 'Doctor Details',
      fields: [
        { name: 'doctor_name', label: 'Doctor Name', type: 'text', required: true },
        { name: 'qualification', label: 'Qualification', type: 'text', required: false },
        { name: 'registration_no', label: 'Registration No.', type: 'text', required: false },
        { name: 'next_visit', label: 'Next Visit Date', type: 'date', required: false },
      ],
    },
  ],
}
