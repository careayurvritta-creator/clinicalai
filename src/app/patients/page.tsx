'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { PatientCard } from '@/components/PatientCard'

interface Patient {
  id: string
  patient_code: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  created_at: string
  case_count?: number
  last_visit?: string | null
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef(search)
  searchRef.current = search

  const fetchPatients = useCallback(async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(`/api/patients?search=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      const data = await res.json()
      setPatients(data.patients || [])
    } catch (error) {
      console.error('Failed to fetch patients:', error)
      setError('Failed to load patients. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPatients(searchRef.current)
    }, 300)
    return () => clearTimeout(timer)
  }, [search, fetchPatients])

  // Group patients by first letter for alphabetical jump
  const groupedPatients = patients.reduce<Record<string, Patient[]>>((acc, p) => {
    const letter = (p.name[0] || '#').toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(p)
    return acc
  }, {})

  const alphabet = Object.keys(groupedPatients).sort()

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4 md:p-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Patients</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {patients.length} patient{patients.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/patients/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Patient
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search patients by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-400 mb-3">{error}</p>
            <button
              onClick={() => fetchPatients(search)}
              className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:border-primary/30 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-muted-foreground mb-1">
              {search ? 'No patients match your search' : 'No patients yet'}
            </p>
            {!search && (
              <Link
                href="/patients/new"
                className="inline-block mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Add First Patient
              </Link>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            {/* Patient list */}
            <div className="flex-1 space-y-2">
              {search ? (
                // Flat list when searching
                patients.map((p) => (
                  <PatientCard
                    key={p.id}
                    id={p.id}
                    patientCode={p.patient_code}
                    name={p.name}
                    age={p.age}
                    gender={p.gender}
                    phone={p.phone}
                    caseCount={p.case_count}
                    lastVisit={p.last_visit}
                  />
                ))
              ) : (
                // Grouped by letter when browsing
                alphabet.map((letter) => (
                  <div key={letter}>
                    <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-wider px-1 mb-1.5 mt-4 first:mt-0">
                      {letter}
                    </p>
                    <div className="space-y-2">
                      {groupedPatients[letter].map((p) => (
                        <PatientCard
                          key={p.id}
                          id={p.id}
                          patientCode={p.patient_code}
                          name={p.name}
                          age={p.age}
                          gender={p.gender}
                          phone={p.phone}
                          caseCount={p.case_count}
                          lastVisit={p.last_visit}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Alphabet quick-jump (desktop only) */}
            {alphabet.length > 3 && (
              <div className="hidden md:flex flex-col items-center gap-0.5 sticky top-0 pt-12">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => {
                      document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded text-[10px] font-semibold text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
