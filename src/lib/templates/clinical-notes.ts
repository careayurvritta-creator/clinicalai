// Clinical Notes Templates — Document format
// OPD Consultation Note (comprehensive)

import type { DocumentTemplate } from '../types'

export const consultationNote: DocumentTemplate = {
  id: 'opd-consultation-note',
  name: 'OPD Consultation Note',
  description: 'Comprehensive clinical assessment with Ashtavidha Pariksha, Prakriti, diagnosis, and treatment plan',
  category: 'consultation-notes',
  format: 'document',
  sections: [
    {
      id: 'header',
      title: 'Patient Information',
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'time', label: 'Time', type: 'time', required: true, autoFillFrom: 'currentTime' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'occupation', label: 'Occupation', type: 'text', required: false, autoFillFrom: 'patient.occupation' },
        { name: 'mobile', label: 'Mobile', type: 'text', required: true, autoFillFrom: 'patient.phone' },
        { name: 'doctor', label: 'Consulting Doctor', type: 'text', required: true },
      ],
    },
    {
      id: 'chief-complaints',
      title: 'Chief Complaints',
      repeatable: true,
      description: 'Patient presenting complaints with duration and severity',
      fields: [
        { name: 'complaint', label: 'Complaint', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true, description: 'e.g., 6 months, 2 years' },
        { name: 'severity', label: 'Severity (1-10)', type: 'number', required: true, validation: { min: 1, max: 10 } },
        { name: 'location', label: 'Location', type: 'text', required: false },
        { name: 'onset', label: 'Onset', type: 'select', required: false, options: [
          { value: 'acute', label: 'Acute' },
          { value: 'gradual', label: 'Gradual' },
          { value: 'chronic', label: 'Chronic' },
        ]},
        { name: 'aggravating_factors', label: 'Aggravating Factors', type: 'text', required: false },
        { name: 'relieving_factors', label: 'Relieving Factors', type: 'text', required: false },
        { name: 'associated_symptoms', label: 'Associated Symptoms', type: 'text', required: false },
      ],
    },
    {
      id: 'history',
      title: 'History',
      fields: [
        { name: 'present_illness', label: 'History of Present Illness', type: 'multiline', required: false },
        { name: 'past_history', label: 'Past Medical History', type: 'multiline', required: false },
        { name: 'family_history', label: 'Family History', type: 'multiline', required: false },
        { name: 'personal_history', label: 'Personal History (diet, sleep, bowel, bladder, habits)', type: 'multiline', required: false },
        { name: 'allergies', label: 'Allergies', type: 'text', required: false },
        { name: 'ongoing_medications', label: 'Ongoing Medications', type: 'multiline', required: false },
        { name: 'comorbidities', label: 'Comorbidities', type: 'text', required: false },
      ],
    },
    {
      id: 'ashtavidha-pariksha',
      title: 'Ashtavidha Pariksha (8-Fold Examination)',
      fields: [
        { name: 'nadi', label: 'Nadi (Pulse)', type: 'text', required: false, description: 'e.g., Vata-Pitta Jwar Nadi' },
        { name: 'mutra', label: 'Mutra (Urine)', type: 'text', required: false, description: 'Color, frequency, burning' },
        { name: 'mala', label: 'Mala (Stool)', type: 'text', required: false, description: 'Consistency, frequency, color' },
        { name: 'jivha', label: 'Jivha (Tongue)', type: 'text', required: false, description: 'Coating, color, texture' },
        { name: 'shabda', label: 'Shabda (Speech)', type: 'text', required: false, description: 'Clarity, tone' },
        { name: 'sparsh', label: 'Sparsh (Touch)', type: 'text', required: false, description: 'Skin texture, temperature' },
        { name: 'drik', label: 'Drik (Eyes)', type: 'text', required: false, description: 'Color, clarity' },
        { name: 'aakriti', label: 'Aakriti (Build)', type: 'text', required: false, description: 'Body frame, weight' },
      ],
    },
    {
      id: 'dashavidha-pariksha',
      title: 'Dashavidha Pariksha (10-Fold Examination)',
      fields: [
        { name: 'prakriti', label: 'Prakriti (Constitution)', type: 'text', required: false },
        { name: 'vikriti', label: 'Vikriti (Current Imbalance)', type: 'text', required: false },
        { name: 'sara', label: 'Sara (Tissue Quality)', type: 'select', required: false, options: [
          { value: 'pravara', label: 'Pravara (Best)' },
          { value: 'madhyama', label: 'Madhyama (Medium)' },
          { value: 'avara', label: 'Avara (Poor)' },
        ]},
        { name: 'samhanana', label: 'Samhanana (Body Build)', type: 'select', required: false, options: [
          { value: 'pravara', label: 'Pravara (Compact)' },
          { value: 'madhyama', label: 'Madhyama (Medium)' },
          { value: 'avara', label: 'Avara (Loose)' },
        ]},
        { name: 'satva', label: 'Satva (Mental Strength)', type: 'select', required: false, options: [
          { value: 'pravara', label: 'Pravara (Strong)' },
          { value: 'madhyama', label: 'Madhyama (Medium)' },
          { value: 'avara', label: 'Avara (Weak)' },
        ]},
        { name: 'ahara_shakti', label: 'Ahara Shakti (Intake Capacity)', type: 'select', required: false, options: [
          { value: 'pravara', label: 'Pravara (Strong)' },
          { value: 'madhyama', label: 'Madhyama (Medium)' },
          { value: 'avara', label: 'Avara (Weak)' },
        ]},
        { name: 'vyayama_shakti', label: 'Vyayama Shakti (Exercise Capacity)', type: 'select', required: false, options: [
          { value: 'pravara', label: 'Pravara (High)' },
          { value: 'madhyama', label: 'Madhyama (Medium)' },
          { value: 'avara', label: 'Avara (Low)' },
        ]},
        { name: 'satmya', label: 'Satmya (Habituation)', type: 'text', required: false },
      ],
    },
    {
      id: 'investigations',
      title: 'Investigations',
      repeatable: true,
      fields: [
        { name: 'investigation', label: 'Investigation', type: 'text', required: true },
        { name: 'finding', label: 'Finding', type: 'text', required: true },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: false },
        { name: 'status', label: 'Status', type: 'select', required: false, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'abnormal', label: 'Abnormal' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'diagnosis',
      title: 'Diagnosis',
      fields: [
        { name: 'ayurvedic_diagnosis', label: 'Ayurvedic Diagnosis', type: 'text', required: true },
        { name: 'modern_correlation', label: 'Modern Correlation', type: 'text', required: false },
        { name: 'dosha_involved', label: 'Dosha Involved', type: 'text', required: false },
        { name: 'dushya', label: 'Dushya (Tissues Affected)', type: 'text', required: false },
        { name: 'srotas', label: 'Srotas (Channels)', type: 'text', required: false },
        { name: 'stage', label: 'Stage (Samprapti)', type: 'text', required: false },
      ],
    },
    {
      id: 'treatment',
      title: 'Treatment Plan',
      fields: [
        { name: 'treatment_principle', label: 'Treatment Principle (Chikitsa Sutra)', type: 'multiline', required: false },
        { name: 'panchakarma', label: 'Panchakarma Procedures', type: 'multiline', required: false },
        { name: 'internal_medicines', label: 'Internal Medicines', type: 'multiline', required: false },
        { name: 'external_applications', label: 'External Applications', type: 'multiline', required: false },
        { name: 'pathya', label: 'Pathya (Recommended Diet)', type: 'multiline', required: false },
        { name: 'apathya', label: 'Apathya (Avoid)', type: 'multiline', required: false },
        { name: 'lifestyle_advice', label: 'Lifestyle Advice', type: 'multiline', required: false },
        { name: 'followup_date', label: 'Follow-up Date', type: 'date', required: false },
        { name: 'followup_instructions', label: 'Follow-up Instructions', type: 'multiline', required: false },
      ],
    },
  ],
}
