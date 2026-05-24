import type { InvestigationFinding } from './types'

export interface LabParameter {
  name: string
  patterns: RegExp[]
  normalRange: { min: number; max: number }
  unit: string
  ayurvedicCorrelation?: string
}

export const LAB_PARAMETERS: LabParameter[] = [
  {
    name: 'Hemoglobin',
    patterns: [/\bHb\b.*?(\d+\.?\d*)/i, /hemoglobin.*?(\d+\.?\d*)/i],
    normalRange: { min: 12, max: 18 },
    unit: 'g/dL',
    ayurvedicCorrelation: 'Rakta status - low Hb suggests Raktalpata',
  },
  {
    name: 'WBC',
    patterns: [/\bWBC\b.*?(\d+\.?\d*)/i, /white blood.*?(\d+\.?\d*)/i],
    normalRange: { min: 4000, max: 11000 },
    unit: '/cu mm',
    ayurvedicCorrelation: 'Immune status indicator',
  },
  {
    name: 'RBC',
    patterns: [/\bRBC\b.*?(\d+\.?\d*)/i, /red blood.*?(\d+\.?\d*)/i],
    normalRange: { min: 4.0, max: 6.0 },
    unit: 'million/cu mm',
    ayurvedicCorrelation: 'Rakta Dhatu indicator',
  },
  {
    name: 'Platelets',
    patterns: [/\bplatelets?\b.*?(\d+\.?\d*)/i, /thrombocytes.*?(\d+\.?\d*)/i],
    normalRange: { min: 150000, max: 400000 },
    unit: '/cu mm',
    ayurvedicCorrelation: 'Blood coagulation status',
  },
  {
    name: 'ESR',
    patterns: [/\bESR\b.*?(\d+\.?\d*)/i, /erythrocyte sedimentation.*?(\d+\.?\d*)/i],
    normalRange: { min: 0, max: 20 },
    unit: 'mm/hr',
    ayurvedicCorrelation: 'Inflammation indicator - elevated suggests Ama/Pitta',
  },
  {
    name: 'Fasting Blood Glucose',
    patterns: [/\bFBS\b.*?(\d+\.?\d*)/i, /fasting.*?glucose.*?(\d+\.?\d*)/i, /blood sugar.*?fasting.*?(\d+\.?\d*)/i],
    normalRange: { min: 70, max: 100 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Prameha indicator - elevated suggests Medodhatu imbalance',
  },
  {
    name: 'Post Prandial Glucose',
    patterns: [/\bPPBS\b.*?(\d+\.?\d*)/i, /post.?prandial.*?(\d+\.?\d*)/i, /pp.*?glucose.*?(\d+\.?\d*)/i],
    normalRange: { min: 70, max: 140 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Prameha indicator',
  },
  {
    name: 'HbA1c',
    patterns: [/\bHbA1c\b.*?(\d+\.?\d*)/i, /glycosylated.*?(\d+\.?\d*)/i, /hba1c.*?(\d+\.?\d*)/i],
    normalRange: { min: 4.0, max: 5.7 },
    unit: '%',
    ayurvedicCorrelation: 'Long-term glucose control - elevated suggests Prameha',
  },
  {
    name: 'Total Cholesterol',
    patterns: [
      /(?:total\s*)?cholesterol(?!\s*(?:hdl|ldl)).*?(\d+\.?\d*)/i,
      /\bchol\b\.?(?!\s*(?:hdl|ldl)).*?(\d+\.?\d*)/i,
      /\btotal\b.*?cholesterol.*?(\d+\.?\d*)/i,
    ],
    normalRange: { min: 0, max: 200 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Meda Dhatu status - elevated suggests Medodhatu imbalance',
  },
  {
    name: 'Triglycerides',
    patterns: [/\bTG\b.*?(\d+\.?\d*)/i, /triglycerides.*?(\d+\.?\d*)/i],
    normalRange: { min: 0, max: 150 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Meda Dhatu - elevated suggests Kapha/Meda dominance',
  },
  {
    name: 'HDL',
    patterns: [/\bHDL\b[^\d]*?(\d+\.?\d*)/i, /(?:good\s*)?hdl\s*(?:cholesterol)?[^\d]*?(\d+\.?\d*)/i],
    normalRange: { min: 40, max: 100 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Good cholesterol - low suggests metabolic imbalance',
  },
  {
    name: 'LDL',
    patterns: [/\bLDL\b[^\d]*?(\d+\.?\d*)/i, /(?:bad\s*)?ldl\s*(?:cholesterol)?[^\d]*?(\d+\.?\d*)/i],
    normalRange: { min: 0, max: 100 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Atherogenic lipid - elevated suggests Medovaha Srotas involvement',
  },
  {
    name: 'SGOT/AST',
    patterns: [/\bSGOT\b.*?(\d+\.?\d*)/i, /\bAST\b.*?(\d+\.?\d*)/i],
    normalRange: { min: 0, max: 40 },
    unit: 'U/L',
    ayurvedicCorrelation: 'Liver function - elevated suggests Pitta involvement',
  },
  {
    name: 'SGPT/ALT',
    patterns: [/\bSGPT\b.*?(\d+\.?\d*)/i, /\bALT\b.*?(\d+\.?\d*)/i],
    normalRange: { min: 0, max: 40 },
    unit: 'U/L',
    ayurvedicCorrelation: 'Liver function - elevated suggests Pitta/Rakta involvement',
  },
  {
    name: 'Bilirubin',
    patterns: [/\bbilirubin\b.*?(\d+\.?\d*)/i, /total.?bilirubin.*?(\d+\.?\d*)/i],
    normalRange: { min: 0.2, max: 1.2 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Pitta/Rakta indicator - elevated suggests Pitta imbalance',
  },
  {
    name: 'Alkaline Phosphatase',
    patterns: [/\bALP\b.*?(\d+\.?\d*)/i, /alkaline.?phosphatase.*?(\d+\.?\d*)/i],
    normalRange: { min: 40, max: 120 },
    unit: 'U/L',
    ayurvedicCorrelation: 'Liver/bone marker',
  },
  {
    name: 'Creatinine',
    patterns: [/\bcreatinine\b.*?(\d+\.?\d*)/i, /s.?creatinine.*?(\d+\.?\d*)/i],
    normalRange: { min: 0.6, max: 1.2 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Kidney function - elevated suggests Mutravaha Srotas involvement',
  },
  {
    name: 'BUN',
    patterns: [/\bBUN\b.*?(\d+\.?\d*)/i, /blood.?urea.*?(\d+\.?\d*)/i, /urea.*?(\d+\.?\d*)/i],
    normalRange: { min: 7, max: 20 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Kidney function indicator',
  },
  {
    name: 'Uric Acid',
    patterns: [/\buric.?acid\b.*?(\d+\.?\d*)/i, /s.?uric.?acid.*?(\d+\.?\d*)/i],
    normalRange: { min: 3.5, max: 7.2 },
    unit: 'mg/dL',
    ayurvedicCorrelation: 'Elevated suggests Vata/Kapha accumulation',
  },
  {
    name: 'TSH',
    patterns: [/\bTSH\b.*?(\d+\.?\d*)/i, /thyroid.?stimulating.*?(\d+\.?\d*)/i],
    normalRange: { min: 0.4, max: 4.0 },
    unit: 'mIU/L',
    ayurvedicCorrelation: 'Thyroid function - imbalance suggests Meda/Agni disorder',
  },
  {
    name: 'T3',
    patterns: [/\bT3\b.*?(\d+\.?\d*)/i, /triiodothyronine.*?(\d+\.?\d*)/i],
    normalRange: { min: 80, max: 200 },
    unit: 'ng/dL',
    ayurvedicCorrelation: 'Thyroid function',
  },
  {
    name: 'T4',
    patterns: [/\bT4\b.*?(\d+\.?\d*)/i, /thyroxine.*?(\d+\.?\d*)/i],
    normalRange: { min: 5.0, max: 12.0 },
    unit: 'μg/dL',
    ayurvedicCorrelation: 'Thyroid function',
  },
]

export function parseLabValue(text: string, parameter: LabParameter): { value: number | null; unit: string } {
  for (const pattern of parameter.patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      const value = parseFloat(match[1])
      if (!isNaN(value)) {
        return { value, unit: parameter.unit }
      }
    }
  }
  return { value: null, unit: parameter.unit }
}

export function getValueStatus(value: number, normalRange: { min: number; max: number }): 'normal' | 'abnormal' | 'critical' {
  const criticalLow = normalRange.min === 0 ? normalRange.max * 0.3 : normalRange.min * 0.7
  if (value < criticalLow || value > normalRange.max * 1.5) {
    return 'critical'
  }
  if (value < normalRange.min || value > normalRange.max) {
    return 'abnormal'
  }
  return 'normal'
}

export function analyzeLabReport(text: string): InvestigationFinding[] {
  const findings: InvestigationFinding[] = []
  
  for (const parameter of LAB_PARAMETERS) {
    const { value, unit } = parseLabValue(text, parameter)
    
    if (value !== null) {
      const status = getValueStatus(value, parameter.normalRange)
      
      findings.push({
        parameter: parameter.name,
        value: value.toString(),
        unit,
        normalRange: `${parameter.normalRange.min}-${parameter.normalRange.max}`,
        status,
        clinicalCorrelation: parameter.ayurvedicCorrelation,
      })
    }
  }
  
  findings.sort((a, b) => {
    if (a.status === 'critical' && b.status !== 'critical') return -1
    if (b.status === 'critical' && a.status !== 'critical') return 1
    if (a.status === 'abnormal' && b.status === 'normal') return -1
    if (b.status === 'abnormal' && a.status === 'normal') return 1
    return 0
  })
  
  return findings
}

export function formatFindingsForChat(findings: InvestigationFinding[]): string {
  const lines: string[] = []
  
  const abnormal = findings.filter(f => f.status !== 'normal')
  const normal = findings.filter(f => f.status === 'normal')
  
  lines.push('## 📋 INVESTIGATION ANALYSIS')
  lines.push('')
  lines.push(`**Reports Analyzed:** ${findings.length > 0 ? 'Yes' : 'No findings detected'}`)
  lines.push('')
  
  if (abnormal.length > 0) {
    lines.push('### ⚠️ Abnormalities Detected:')
    lines.push('')
    
    for (const finding of abnormal) {
      const statusEmoji = finding.status === 'critical' ? '🔴' : '🟡'
      lines.push(`${statusEmoji} **${finding.parameter}**: ${finding.value} ${finding.unit}`)
      lines.push(`   - Normal Range: ${finding.normalRange}`)
      lines.push(`   - ${finding.clinicalCorrelation || 'Clinical significance to be assessed'}`)
      lines.push('')
    }
  }
  
  if (normal.length > 0) {
    lines.push('### ✅ Normal Values:')
    lines.push('')
    
    for (const finding of normal) {
      lines.push(`- ${finding.parameter}: ${finding.value} ${finding.unit}`)
    }
    lines.push('')
  }
  
  if (findings.length === 0) {
    lines.push('No standard lab parameters detected in the uploaded report.')
    lines.push('')
    lines.push('This may be a narrative report or use non-standard formatting.')
    lines.push('Please review manually or upload a structured lab report.')
    lines.push('')
  }
  
  lines.push('---')
  lines.push('')
  lines.push('*Shall I proceed with these findings, or do you have any corrections?*')
  
  return lines.join('\n')
}

export function generateCorrelationSummary(findings: InvestigationFinding[]): string {
  const abnormal = findings.filter(f => f.status !== 'normal')
  
  if (abnormal.length === 0) {
    return 'No significant abnormalities requiring Ayurvedic correlation.'
  }
  
  const correlations: string[] = []
  
  for (const finding of abnormal) {
    if (finding.clinicalCorrelation) {
      correlations.push(finding.clinicalCorrelation)
    }
  }
  
  if (correlations.length === 0) {
    return 'Lab findings detected. Clinical correlation pending assessment.'
  }
  
  return 'Possible Ayurvedic correlations:\n- ' + correlations.join('\n- ')
}