// Financial Templates — Spreadsheet format
// Invoice, Receipt

import type { DocumentTemplate } from '../types'

export const invoice: DocumentTemplate = {
  id: 'invoice',
  name: 'Invoice',
  description: 'Clinical services invoice with line items, taxes, and payment details',
  category: 'invoices',
  format: 'spreadsheet',
  sections: [
    {
      id: 'header',
      title: 'Invoice Header',
      fields: [
        { name: 'invoice_no', label: 'Invoice No.', type: 'text', required: true, description: 'Format: AYR/AH/YYMM/NNN', width: 140 },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate', width: 100 },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name', width: 180 },
        { name: 'patient_code', label: 'Patient Code', type: 'text', required: true, autoFillFrom: 'patient.clinical_id', width: 140 },
        { name: 'age', label: 'Age', type: 'number', required: true, autoFillFrom: 'patient.age', width: 60 },
        { name: 'gender', label: 'Gender', type: 'text', required: true, autoFillFrom: 'patient.gender', width: 80 },
        { name: 'mobile', label: 'Mobile', type: 'text', required: true, autoFillFrom: 'patient.phone', width: 120 },
        { name: 'doctor', label: 'Doctor', type: 'text', required: true, width: 180 },
      ],
    },
    {
      id: 'line-items',
      title: 'Line Items',
      repeatable: true,
      fields: [
        { name: 'sr_no', label: 'Sr.', type: 'number', required: true, width: 50 },
        { name: 'description', label: 'Description', type: 'text', required: true, width: 300 },
        { name: 'quantity', label: 'Qty', type: 'number', required: true, width: 60, defaultValue: 1 },
        { name: 'rate', label: 'Rate (₹)', type: 'currency', required: true, width: 100 },
        { name: 'amount', label: 'Amount (₹)', type: 'currency', required: true, width: 100 },
      ],
    },
    {
      id: 'totals',
      title: 'Totals',
      fields: [
        { name: 'subtotal', label: 'Subtotal (₹)', type: 'currency', required: true },
        { name: 'discount', label: 'Discount (₹)', type: 'currency', required: false, defaultValue: 0 },
        { name: 'tax_percent', label: 'Tax %', type: 'number', required: false, defaultValue: 0 },
        { name: 'tax_amount', label: 'Tax Amount (₹)', type: 'currency', required: false, defaultValue: 0 },
        { name: 'total', label: 'Total (₹)', type: 'currency', required: true },
      ],
    },
    {
      id: 'payment',
      title: 'Payment Details',
      fields: [
        { name: 'payment_mode', label: 'Payment Mode', type: 'select', required: true, options: [
          { value: 'cash', label: 'Cash' },
          { value: 'upi', label: 'UPI' },
          { value: 'card', label: 'Card' },
          { value: 'netbanking', label: 'Net Banking' },
          { value: 'insurance', label: 'Insurance' },
          { value: 'credit', label: 'Credit' },
        ]},
        { name: 'payment_status', label: 'Payment Status', type: 'select', required: true, options: [
          { value: 'paid', label: 'Paid' },
          { value: 'partial', label: 'Partial' },
          { value: 'pending', label: 'Pending' },
        ], defaultValue: 'paid' },
        { name: 'remarks', label: 'Remarks', type: 'text', required: false },
      ],
    },
  ],
}

export const receipt: DocumentTemplate = {
  id: 'receipt',
  name: 'Receipt',
  description: 'Payment receipt for clinical services',
  category: 'receipts',
  format: 'document',
  sections: [
    {
      id: 'receipt-details',
      title: 'Receipt Details',
      fields: [
        { name: 'receipt_no', label: 'Receipt No.', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true, autoFillFrom: 'currentDate' },
        { name: 'patient_name', label: 'Patient Name', type: 'text', required: true, autoFillFrom: 'patient.name' },
        { name: 'patient_code', label: 'Patient Code', type: 'text', required: true, autoFillFrom: 'patient.clinical_id' },
        { name: 'amount', label: 'Amount (₹)', type: 'currency', required: true },
        { name: 'amount_words', label: 'Amount in Words', type: 'text', required: false },
        { name: 'payment_mode', label: 'Payment Mode', type: 'select', required: true, options: [
          { value: 'cash', label: 'Cash' },
          { value: 'upi', label: 'UPI' },
          { value: 'card', label: 'Card' },
          { value: 'netbanking', label: 'Net Banking' },
        ]},
        { name: 'reference_no', label: 'Reference/Transaction No.', type: 'text', required: false },
        { name: 'towards', label: 'Payment Towards', type: 'text', required: true, description: 'e.g., OPD Consultation, Panchakarma, Medicines' },
        { name: 'invoice_ref', label: 'Invoice Reference', type: 'text', required: false },
      ],
    },
  ],
}
