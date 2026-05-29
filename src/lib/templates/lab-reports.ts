// Lab Report Templates — Spreadsheet format
// Lab Reports with test panels

import type { DocumentTemplate } from '../types'

export const labReport: DocumentTemplate = {
  id: 'lab-report',
  name: 'Lab Report',
  description: 'Laboratory investigation report with multiple test panels',
  category: 'lab-reports',
  format: 'spreadsheet',
  sections: [
    {
      id: 'header',
      title: 'Report Header',
      fields: [
        { name: 'report_no', label: 'Report No.', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age' },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender' },
        { name: 'clinical_id', label: 'Clinical ID', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'referred_by', label: 'Referred By', type: 'text', required: false },
        { name: 'lab_name', label: 'Laboratory Name', type: 'text', required: false },
      ],
    },
    {
      id: 'cbc',
      title: 'Complete Blood Count (CBC)',
      repeatable: true,
      description: 'Hemoglobin, TLC, DLC, Platelets, ESR',
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'lipid',
      title: 'Lipid Profile',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'sugar',
      title: 'Blood Sugar',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'renal',
      title: 'Renal Function',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'liver',
      title: 'Liver Function',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'thyroid',
      title: 'Thyroid Profile',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'inflammatory',
      title: 'Inflammatory Markers (RA/CRP)',
      repeatable: true,
      fields: [
        { name: 'parameter', label: 'Parameter', type: 'text', required: true, width: 200 },
        { name: 'value', label: 'Value', type: 'text', required: true, width: 100 },
        { name: 'unit', label: 'Unit', type: 'text', required: true, width: 80 },
        { name: 'normal_range', label: 'Normal Range', type: 'text', required: true, width: 120 },
        { name: 'status', label: 'Status', type: 'select', required: true, width: 80, options: [
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'low', label: 'Low' },
          { value: 'critical', label: 'Critical' },
        ]},
      ],
    },
    {
      id: 'imaging',
      title: 'Imaging Reports',
      repeatable: true,
      fields: [
        { name: 'study', label: 'Study', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: false },
        { name: 'finding', label: 'Finding', type: 'multiline', required: true },
        { name: 'impression', label: 'Impression', type: 'multiline', required: true },
      ],
    },
    {
      id: 'footer',
      title: 'Report Footer',
      fields: [
        { name: 'pathologist', label: 'Pathologist', type: 'text', required: false },
        { name: 'technician', label: 'Technician', type: 'text', required: false },
        { name: 'remarks', label: 'Remarks', type: 'multiline', required: false },
      ],
    },
  ],
}
