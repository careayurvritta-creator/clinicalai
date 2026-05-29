// Register Templates — Spreadsheet format
// OPD Visit, OPD Therapy, IPD Visit, Panchakarma Procedure

import type { DocumentTemplate } from '../types'

export const opdVisitRegister: DocumentTemplate = {
  id: 'opd-visit-register',
  name: 'OPD Visit Register',
  description: 'Daily register of all OPD patient visits with token, doctor, and purpose',
  category: 'opd-registers',
  format: 'spreadsheet',
  sections: [
    {
      id: 'visits',
      title: 'OPD Visits',
      repeatable: true,
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'time', label: 'Time', type: 'time', required: true, autoFillFrom: 'currentTime', width: 80 },
        { name: 'token', label: 'Token No.', type: 'number', required: true, width: 80 },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age', width: 60 },
        { name: 'gender', label: 'Gender', type: 'select', required: true, autoFillFrom: 'patient.gender', width: 80, options: [
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
          { value: 'Other', label: 'Other' },
        ]},
        { name: 'mobile', label: 'Mobile', type: 'text', required: true, autoFillFrom: 'patient.phone', width: 120 },
        { name: 'doctor', label: 'Doctor Name', type: 'text', required: true, width: 180 },
        { name: 'purpose', label: 'Purpose', type: 'text', required: true, width: 150 },
        { name: 'status', label: 'Status', type: 'select', required: false, width: 100, options: [
          { value: 'attended', label: 'Attended' },
          { value: 'waiting', label: 'Waiting' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'no-show', label: 'No Show' },
        ], defaultValue: 'attended' },
      ],
    },
  ],
}

export const opdTherapyRegister: DocumentTemplate = {
  id: 'opd-therapy-register',
  name: 'OPD Therapy Register',
  description: 'Register of Panchakarma and therapy sessions for OPD patients',
  category: 'therapy-registers',
  format: 'spreadsheet',
  sections: [
    {
      id: 'sessions',
      title: 'Therapy Sessions',
      repeatable: true,
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'session_no', label: 'Session No.', type: 'number', required: true, width: 80 },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'therapy_name', label: 'Therapy Name', type: 'text', required: true, width: 180 },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, width: 100 },
        { name: 'doctor', label: 'Doctor', type: 'text', required: true, width: 150 },
        { name: 'therapist', label: 'Therapist', type: 'text', required: true, width: 150 },
        { name: 'status', label: 'Status', type: 'select', required: false, width: 100, options: [
          { value: 'completed', label: 'Completed' },
          { value: 'partial', label: 'Partial' },
          { value: 'skipped', label: 'Skipped' },
        ], defaultValue: 'completed' },
        { name: 'remarks', label: 'Remarks', type: 'text', required: false, width: 200 },
      ],
    },
  ],
}

export const ipdVisitRegister: DocumentTemplate = {
  id: 'ipd-visit-register',
  name: 'IPD Visit Register',
  description: 'Register of all IPD (in-patient) admissions and visits',
  category: 'ipd-registers',
  format: 'spreadsheet',
  sections: [
    {
      id: 'visits',
      title: 'IPD Visits',
      repeatable: true,
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'time', label: 'Time', type: 'time', required: true, autoFillFrom: 'currentTime', width: 80 },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age', width: 60 },
        { name: 'gender', label: 'Gender', type: 'select', required: true, autoFillFrom: 'patient.gender', width: 80, options: [
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' },
          { value: 'Other', label: 'Other' },
        ]},
        { name: 'mobile', label: 'Mobile', type: 'text', required: true, autoFillFrom: 'patient.phone', width: 120 },
        { name: 'doctor', label: 'Doctor Name', type: 'text', required: true, width: 180 },
        { name: 'visit_type', label: 'Visit Type', type: 'select', required: true, width: 100, options: [
          { value: 'admission', label: 'Admission' },
          { value: 'follow-up', label: 'Follow-up' },
          { value: 'discharge', label: 'Discharge' },
        ]},
        { name: 'room', label: 'Room', type: 'text', required: false, width: 80 },
        { name: 'bed', label: 'Bed', type: 'text', required: false, width: 60 },
      ],
    },
  ],
}

export const procedureRegister: DocumentTemplate = {
  id: 'procedure-register',
  name: 'Panchakarma Procedure Register',
  description: 'Register of Panchakarma procedures with vitals before/after',
  category: 'procedure-registers',
  format: 'spreadsheet',
  sections: [
    {
      id: 'procedures',
      title: 'Procedures',
      repeatable: true,
      fields: [
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'session_no', label: 'Session No.', type: 'number', required: true, width: 80 },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'procedure_name', label: 'Procedure Name', type: 'text', required: true, width: 180 },
        { name: 'duration', label: 'Duration (min)', type: 'number', required: true, width: 100 },
        { name: 'doctor', label: 'Doctor', type: 'text', required: true, width: 150 },
        { name: 'therapist', label: 'Therapist', type: 'text', required: true, width: 150 },
        { name: 'bp_before', label: 'BP Before', type: 'text', required: false, width: 80 },
        { name: 'pulse_before', label: 'Pulse Before', type: 'text', required: false, width: 80 },
        { name: 'bp_after', label: 'BP After', type: 'text', required: false, width: 80 },
        { name: 'pulse_after', label: 'Pulse After', type: 'text', required: false, width: 80 },
        { name: 'remarks', label: 'Remarks', type: 'text', required: false, width: 200 },
      ],
    },
  ],
}
