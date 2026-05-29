// Nursing Chart Templates — Spreadsheet format
// Nursing Medicine Chart, Nursing Panchakarma Chart

import type { DocumentTemplate } from '../types'

export const nursingMedicineChart: DocumentTemplate = {
  id: 'nursing-medicine-chart',
  name: 'IPD Nursing Medicine Chart',
  description: 'Medicine administration chart for IPD nursing staff',
  category: 'nursing-medicine',
  format: 'spreadsheet',
  sections: [
    {
      id: 'header',
      title: 'Patient Info',
      fields: [
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id', width: 120 },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'room', label: 'Room/Bed', type: 'text', required: false, width: 80 },
      ],
    },
    {
      id: 'medicines',
      title: 'Medicine Schedule',
      repeatable: true,
      fields: [
        { name: 'time', label: 'Time', type: 'time', required: true, width: 80 },
        { name: 'medicine', label: 'Medicine Name', type: 'text', required: true, width: 200 },
        { name: 'dose', label: 'Dose', type: 'text', required: true, width: 100 },
        { name: 'route', label: 'Route', type: 'select', required: true, width: 80, options: [
          { value: 'oral', label: 'Oral' },
          { value: 'sublingual', label: 'Sublingual' },
          { value: 'topical', label: 'Topical' },
          { value: 'nasal', label: 'Nasal (Nasya)' },
          { value: 'rectal', label: 'Rectal (Basti)' },
          { value: 'ocular', label: 'Ocular' },
        ]},
        { name: 'given_by', label: 'Given By', type: 'text', required: false, width: 120 },
        { name: 'remarks', label: 'Remarks', type: 'text', required: false, width: 150 },
      ],
    },
  ],
}

export const nursingPanchakarmaChart: DocumentTemplate = {
  id: 'nursing-panchakarma-chart',
  name: 'IPD Nursing Panchakarma Chart',
  description: 'Panchakarma procedure administration chart for IPD nursing staff',
  category: 'nursing-panchakarma',
  format: 'spreadsheet',
  sections: [
    {
      id: 'header',
      title: 'Patient Info',
      fields: [
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id', width: 120 },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'room', label: 'Room/Bed', type: 'text', required: false, width: 80 },
      ],
    },
    {
      id: 'procedures',
      title: 'Procedure Schedule',
      repeatable: true,
      fields: [
        { name: 'time', label: 'Time', type: 'time', required: true, width: 80 },
        { name: 'procedure', label: 'Procedure', type: 'text', required: true, width: 200 },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, width: 100 },
        { name: 'therapist', label: 'Therapist', type: 'text', required: true, width: 150 },
        { name: 'bp_before', label: 'BP Before', type: 'text', required: false, width: 80 },
        { name: 'pulse_before', label: 'Pulse Before', type: 'text', required: false, width: 80 },
        { name: 'bp_after', label: 'BP After', type: 'text', required: false, width: 80 },
        { name: 'pulse_after', label: 'Pulse After', type: 'text', required: false, width: 80 },
        { name: 'tolerance', label: 'Patient Tolerance', type: 'select', required: false, width: 100, options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' },
        ]},
        { name: 'remarks', label: 'Remarks', type: 'text', required: false, width: 150 },
      ],
    },
  ],
}
