'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, User, Phone } from 'lucide-react'

interface PatientInfo {
  id: string
  clinical_id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
}

interface PatientSelectorProps {
  onSelect: (patient: PatientInfo) => void
}

export function PatientSelector({ onSelect }: PatientSelectorProps) {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<PatientInfo[]>([])
  const [loading, setLoading] = useState(false)

  const searchPatients = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/patients/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setPatients(data.patients ?? [])
    } catch {
      setPatients([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    searchPatients('')
  }, [searchPatients])

  useEffect(() => {
    const timer = setTimeout(() => searchPatients(query), 300)
    return () => clearTimeout(timer)
  }, [query, searchPatients])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, or AAH ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            autoFocus
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {query ? `Results for "${query}"` : 'Recent patients'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No patients found</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelect(patient)}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/30 transition-colors text-left w-full"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {patient.clinical_id?.slice(-3) ?? '???'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {patient.name}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground font-mono">
                      {patient.clinical_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    {patient.age && <span>{patient.age}y</span>}
                    {patient.gender && <span>{patient.gender}</span>}
                    {patient.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
