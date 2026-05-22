'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Patient {
  id: string
  patient_code: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  created_at: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const res = await fetch(`/api/patients?search=${encodeURIComponent(search)}`)
      const data = await res.json()
      setPatients(data.patients || [])
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPatients()
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Patients</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage patient records</p>
          </div>
          <Link
            href="/patients/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            + New Patient
          </Link>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search patients by name, phone, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-muted-foreground">No patients found</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Add your first patient to get started</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {patients.map((patient) => (
              <Link
                key={patient.id}
                href={`/patients/${patient.id}`}
                className="block p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{patient.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {patient.patient_code}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      {patient.age && <span>{patient.age} yrs</span>}
                      {patient.gender && <span>{patient.gender}</span>}
                      {patient.phone && <span>{patient.phone}</span>}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
