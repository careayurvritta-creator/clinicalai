'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Patient {
  id: string
  patient_code: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  email: string | null
  address: string | null
  date_of_birth: string | null
  blood_group: string | null
  height_cm: number | null
  weight_kg: number | null
  occupation: string | null
  emergency_contact: string | null
  emergency_phone: string | null
  notes: string | null
  created_at: string
}

interface Case {
  id: string
  case_number: string
  status: string
  provisional_diagnosis: string | null
  visit_date: string | null
  created_at: string
  chief_complaints: Array<{ complaint: string; duration: string; severity: number }>
}

export default function PatientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [patient, setPatient] = useState<Patient | null>(null)
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      try {
        setLoading(true)
        const [patientRes, casesRes] = await Promise.all([
          fetch(`/api/patients/${id}`),
          fetch(`/api/cases?patient_id=${id}`),
        ])

        if (!patientRes.ok) {
          setError('Patient not found')
          return
        }

        const pData = await patientRes.json()
        setPatient(pData.patient)

        if (casesRes.ok) {
          const cData = await casesRes.json()
          setCases(cData.cases || [])
        }
      } catch {
        setError('Failed to load patient data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to archive this patient?')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/patients/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/patients')
      } else {
        setError('Failed to delete patient')
      }
    } catch {
      setError('Failed to delete patient')
    } finally {
      setDeleting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500'
      case 'completed': return 'bg-blue-500/10 text-blue-500'
      case 'follow_up': return 'bg-yellow-500/10 text-yellow-500'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground">Loading patient...</p>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-3">{error || 'Patient not found'}</p>
          <Link href="/patients" className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg">
            Back to Patients
          </Link>
        </div>
      </div>
    )
  }

  const bmi = patient.height_cm && patient.weight_kg
    ? Math.round((patient.weight_kg / ((patient.height_cm / 100) ** 2)) * 10) / 10
    : null

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
              <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="px-2 py-0.5 bg-muted rounded-full text-xs mr-2">{patient.patient_code}</span>
                Registered {new Date(patient.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/patients/new`}
                className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1.5 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Archiving...' : 'Archive'}
              </button>
            </div>
          </div>
        </div>

        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Demographics */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Demographics</h2>
            <div className="space-y-2">
              {patient.age && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Age</span><span className="text-foreground text-sm">{patient.age} years</span></div>
              )}
              {patient.gender && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Gender</span><span className="text-foreground text-sm">{patient.gender}</span></div>
              )}
              {patient.date_of_birth && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Date of Birth</span><span className="text-foreground text-sm">{new Date(patient.date_of_birth).toLocaleDateString()}</span></div>
              )}
              {patient.blood_group && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Blood Group</span><span className="text-foreground text-sm">{patient.blood_group}</span></div>
              )}
              {patient.occupation && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Occupation</span><span className="text-foreground text-sm">{patient.occupation}</span></div>
              )}
              {!patient.age && !patient.gender && !patient.blood_group && !patient.occupation && (
                <p className="text-sm text-muted-foreground/60">No demographic data recorded</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contact</h2>
            <div className="space-y-2">
              {patient.phone && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Phone</span><span className="text-foreground text-sm">{patient.phone}</span></div>
              )}
              {patient.email && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Email</span><span className="text-foreground text-sm">{patient.email}</span></div>
              )}
              {patient.address && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Address</span><span className="text-foreground text-sm text-right max-w-[60%]">{patient.address}</span></div>
              )}
              {patient.emergency_contact && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Emergency</span><span className="text-foreground text-sm">{patient.emergency_contact}{patient.emergency_phone ? ` (${patient.emergency_phone})` : ''}</span></div>
              )}
              {!patient.phone && !patient.email && !patient.address && (
                <p className="text-sm text-muted-foreground/60">No contact data recorded</p>
              )}
            </div>
          </div>

          {/* Physical */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Physical</h2>
            <div className="space-y-2">
              {patient.height_cm && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Height</span><span className="text-foreground text-sm">{patient.height_cm} cm</span></div>
              )}
              {patient.weight_kg && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">Weight</span><span className="text-foreground text-sm">{patient.weight_kg} kg</span></div>
              )}
              {bmi && (
                <div className="flex justify-between"><span className="text-muted-foreground text-sm">BMI</span><span className="text-foreground text-sm">{bmi}</span></div>
              )}
              {!patient.height_cm && !patient.weight_kg && (
                <p className="text-sm text-muted-foreground/60">No physical data recorded</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Notes</h2>
            {patient.notes ? (
              <p className="text-sm text-foreground whitespace-pre-wrap">{patient.notes}</p>
            ) : (
              <p className="text-sm text-muted-foreground/60">No notes recorded</p>
            )}
          </div>
        </div>

        {/* Cases */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Cases ({cases.length})</h2>
          </div>
          {cases.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm">No cases found for this patient</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {cases.map((c) => (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  className="block p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{c.case_number}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </div>
                      {c.provisional_diagnosis && (
                        <p className="text-sm text-muted-foreground mt-1">{c.provisional_diagnosis}</p>
                      )}
                      {c.chief_complaints && c.chief_complaints.length > 0 && (
                        <p className="text-xs text-muted-foreground/80 mt-1">
                          {c.chief_complaints.map(cc => cc.complaint).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
