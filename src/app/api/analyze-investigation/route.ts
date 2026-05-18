import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { analyzeLabReport, formatFindingsForChat } from '@/lib/investigation-analyzer'

const analyzeRequestSchema = z.object({
  text: z.string().min(1, 'Report text is required'),
  reportType: z.enum(['blood', 'urine', 'imaging', 'general']).optional().default('general'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = analyzeRequestSchema.parse(body)
    
    const { text, reportType } = validated
    
    const findings = analyzeLabReport(text)
    const formattedOutput = formatFindingsForChat(findings)
    
    const summary = generateSummary(findings, reportType)
    
    return NextResponse.json({
      findings,
      formattedOutput,
      summary,
      reportType,
      abnormalCount: findings.filter(f => f.status !== 'normal').length,
      criticalCount: findings.filter(f => f.status === 'critical').length,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to analyze investigation' }, { status: 500 })
  }
}

function generateSummary(
  findings: Array<{
    parameter: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'abnormal' | 'critical'
    clinicalCorrelation?: string
  }>,
  reportType: string
): string {
  const abnormal = findings.filter(f => f.status === 'abnormal' || f.status === 'critical')
  
  if (abnormal.length === 0) {
    return `All values within normal limits. No significant abnormalities detected.`
  }
  
  const critical = findings.filter(f => f.status === 'critical')
  if (critical.length > 0) {
    return `⚠️ ${critical.length} critical finding(s) require immediate attention: ${critical.map(f => f.parameter).join(', ')}`
  }
  
  const suggestions: string[] = []
  
  for (const finding of abnormal) {
    if (finding.parameter.toLowerCase().includes('glucose') || finding.parameter.toLowerCase().includes('hba1c')) {
      suggestions.push('Consider Prameha workup - suggest Medodhatu assessment')
    }
    if (finding.parameter.toLowerCase().includes('cholesterol') || finding.parameter.toLowerCase().includes('ldl') || finding.parameter.toLowerCase().includes('triglyceride')) {
      suggestions.push('Medovaha Srotas involvement likely - consider Kapha assessment')
    }
    if (finding.parameter.toLowerCase().includes('liver') || finding.parameter.toLowerCase().includes('sgot') || finding.parameter.toLowerCase().includes('sgpt')) {
      suggestions.push('Raktapitta consideration - assess Pitta status')
    }
    if (finding.parameter.toLowerCase().includes('kidney') || finding.parameter.toLowerCase().includes('creatinine')) {
      suggestions.push('Mutravaha Srotas involvement - assess Vata status')
    }
    if (finding.parameter.toLowerCase().includes('tsh')) {
      suggestions.push('Thyroid disorder - assess Meda and Agni')
    }
    if (finding.parameter.toLowerCase().includes('uric')) {
      suggestions.push('Vata-Kapha accumulation - assess joint status')
    }
  }
  
  const uniqueSuggestions = [...new Set(suggestions)]
  
  return `Found ${abnormal.length} abnormal values. ${uniqueSuggestions.length > 0 ? uniqueSuggestions.join('. ') + '.' : ''}`
}