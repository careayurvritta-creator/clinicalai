'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, User } from 'lucide-react'

interface Patient {
  id: string
  name: string
  age: number | null
  gender: string | null
  phone: string | null
  clinical_id: string | null
  created_at: string
}

interface PatientSelectorProps {
  onSelect: (patientId: string) => void
}

export function PatientSelector({ onSelect }: PatientSelectorProps) {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPatients = useCallback(async (search: string) => {
    setLoading(true)
    try {
      const params = search ? `?q=${encodeURIComponent(search)}` : ''
      const res = await fetch(`/api/patients/search${params}`)
      const data = await res.json()
      setPatients(data.patients || [])
    } catch {
      setPatients([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchPatients(query), 300)
    return () => clearTimeout(timer)
  }, [query, fetchPatients])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Patient Documents
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, or AAH ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!query && (
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Recent Patients
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
          </div>
        ) : patients.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <User className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">{query ? 'No patients found' : 'No patients yet'}</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {patients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onSelect(patient.id)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    {patient.clinical_id?.slice(-3) || 'PT'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {patient.name}
                      </span>
                      {patient.clinical_id && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono">
                          {patient.clinical_id}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {[patient.age && `${patient.age}y`, patient.gender, patient.phone]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
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
