'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface ChiefComplaint {
  id: string
  complaint: string
  duration: string | null
  severity: number | null
  onset: string | null
  associated_symptoms: string[] | null
}

interface InvestigationFinding {
  id: string
  parameter: string
  value: string
  unit: string | null
  normal_range: string | null
  interpretation: string | null
}

interface TreatmentProtocol {
  id: string
  title: string
  protocol_text: string
  herbs: string[] | null
  panchakarma: string[] | null
  diet_recommendations: string[] | null
  lifestyle_changes: string[] | null
  created_at: string
}

interface CaseData {
  id: string
  case_number: string
  status: string
  provisional_diagnosis: string | null
  prakriti: string | null
  vikriti: string | null
  visit_date: string | null
  notes: string | null
  created_at: string
  patients: {
    id: string
    name: string
    age: number | null
    gender: string | null
    patient_code: string
  } | null
  chief_complaints: ChiefComplaint[]
  investigation_findings: InvestigationFinding[]
  treatment_protocols: TreatmentProtocol[]
}

export default function CaseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/cases/${id}`)
        if (!res.ok) {
          setError('Case not found')
          return
        }
        const data = await res.json()
        setCaseData(data.case)
      } catch {
        setError('Failed to load case data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500 border-green-500/30'
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/30'
      case 'follow_up': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground">Loading case...</p>
        </div>
      </div>
    )
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-3">{error || 'Case not found'}</p>
          <Link href="/cases" className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">
            Back to Cases
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back
          </button>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{caseData.case_number}</h1>
                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(caseData.status)}`}>
                  {caseData.status}
                </span>
              </div>
              {caseData.patients && (
                <p className="text-sm text-muted-foreground mt-1">
                  Patient: <Link href={`/patients/${caseData.patients.id}`} className="text-primary hover:underline">{caseData.patients.name}</Link>
                  {caseData.patients.age ? ` (${caseData.patients.age} yrs)` : ''}
                  {caseData.patients.gender ? ` — ${caseData.patients.gender}` : ''}
                </p>
              )}
            </div>
            <div className="text-right">
              {caseData.visit_date && (
                <p className="text-sm text-muted-foreground">Visit: {new Date(caseData.visit_date).toLocaleDateString()}</p>
              )}
              <p className="text-xs text-muted-foreground/60 mt-1">
                Created {new Date(caseData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Diagnosis + Prakriti/Vikriti */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {caseData.provisional_diagnosis && (
            <div className="bg-card border border-border rounded-xl p-5 md:col-span-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Provisional Diagnosis</h2>
              <p className="text-foreground">{caseData.provisional_diagnosis}</p>
            </div>
          )}
          {caseData.prakriti && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prakriti</h2>
              <p className="text-foreground">{caseData.prakriti}</p>
            </div>
          )}
          {caseData.vikriti && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Vikriti</h2>
              <p className="text-foreground">{caseData.vikriti}</p>
            </div>
          )}
        </div>

        {/* Chief Complaints */}
        {caseData.chief_complaints && caseData.chief_complaints.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Chief Complaints</h2>
            <div className="grid gap-3">
              {caseData.chief_complaints.map((cc) => (
                <div key={cc.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{cc.complaint}</p>
                      <div className="flex gap-3 mt-1 text-sm text-muted-foreground">
                        {cc.duration && <span>Duration: {cc.duration}</span>}
                        {cc.severity && <span>Severity: {cc.severity}/10</span>}
                        {cc.onset && <span>Onset: {cc.onset}</span>}
                      </div>
                      {cc.associated_symptoms && cc.associated_symptoms.length > 0 && (
                        <p className="text-xs text-muted-foreground/80 mt-1">
                          Associated: {cc.associated_symptoms.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investigation Findings */}
        {caseData.investigation_findings && caseData.investigation_findings.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Investigation Findings</h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Parameter</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Value</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Normal Range</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {caseData.investigation_findings.map((inv) => (
                    <tr key={inv.id} className="border-b border-border/50 last:border-0">
                      <td className="p-3 text-foreground">{inv.parameter}</td>
                      <td className="p-3 text-foreground">{inv.value}{inv.unit ? ` ${inv.unit}` : ''}</td>
                      <td className="p-3 text-muted-foreground">{inv.normal_range || '—'}</td>
                      <td className="p-3">
                        {inv.interpretation && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            inv.interpretation === 'high' ? 'bg-red-500/10 text-red-400' :
                            inv.interpretation === 'low' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-green-500/10 text-green-400'
                          }`}>
                            {inv.interpretation}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Treatment Protocols */}
        {caseData.treatment_protocols && caseData.treatment_protocols.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Treatment Protocols</h2>
            <div className="grid gap-3">
              {caseData.treatment_protocols.map((tp) => (
                <div key={tp.id} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-medium text-foreground mb-2">{tp.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">{tp.protocol_text}</p>
                  {tp.herbs && tp.herbs.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Herbs: </span>
                      <span className="text-sm text-foreground">{tp.herbs.join(', ')}</span>
                    </div>
                  )}
                  {tp.panchakarma && tp.panchakarma.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Panchakarma: </span>
                      <span className="text-sm text-foreground">{tp.panchakarma.join(', ')}</span>
                    </div>
                  )}
                  {tp.diet_recommendations && tp.diet_recommendations.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Diet: </span>
                      <span className="text-sm text-foreground">{tp.diet_recommendations.join(', ')}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Created {new Date(tp.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {caseData.notes && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Notes</h2>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-sm text-foreground whitespace-pre-wrap">{caseData.notes}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!caseData.chief_complaints?.length && !caseData.investigation_findings?.length && !caseData.treatment_protocols?.length && !caseData.notes && (
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">No clinical data recorded for this case</p>
          </div>
        )}
      </div>
    </div>
  )
}
