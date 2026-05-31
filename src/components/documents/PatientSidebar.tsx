'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'
import { ModeSwitcher } from '@/components/shared/ModeSwitcher'

interface DrivePatient {
  name: string
  clinicalId: string
  folderId: string
}

export function PatientSidebar() {
  const [patients, setPatients] = useState<DrivePatient[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const selectPatient = useDocumentStore((s) => s.selectPatient)
  const clearPatient = useDocumentStore((s) => s.clearPatient)
  const updatePatientDemographics = useDocumentStore((s) => s.updatePatientDemographics)
  const setPatientSupabaseId = useDocumentStore((s) => s.setPatientSupabaseId)
  const resetCollectedDemographics = useDocumentStore((s) => s.resetCollectedDemographics)
  const clearChatMessages = useDocumentStore((s) => s.clearChatMessages)
  const setIntakeMode = useDocumentStore((s) => s.setIntakeMode)
  const addChatMessage = useDocumentStore((s) => s.addChatMessage)
  const refreshPatientsToken = useDocumentStore((s) => s.refreshPatientsToken)

  const fetchPatients = useCallback(async (search?: string) => {
    setLoading(true)
    setError(null)
    try {
      const params = search ? `?search=${encodeURIComponent(search)}` : ''
      const res = await fetch(`/api/drive/patients${params}`)
      if (!res.ok) throw new Error('Failed to fetch patients')
      const data = await res.json()
      setPatients(data.patients ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load patients')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPatients(searchQuery || undefined)
    }, searchQuery ? 300 : 0)
    return () => clearTimeout(timer)
  }, [searchQuery, fetchPatients])

  // Re-fetch when another component triggers a patient refresh (e.g., after AI creates a patient)
  useEffect(() => {
    if (refreshPatientsToken > 0) {
      fetchPatients(searchQuery || undefined)
    }
  }, [refreshPatientsToken, fetchPatients, searchQuery])

  const handleSelect = async (patient: DrivePatient) => {
    selectPatient({
      id: patient.folderId,
      name: patient.name,
      clinicalId: patient.clinicalId,
      folderUrl: `https://drive.google.com/drive/folders/${patient.folderId}`,
    })

    // Try to load Supabase demographics
    try {
      const linkRes = await fetch(`/api/patients/drive-link?folderId=${patient.folderId}`)
      if (linkRes.ok) {
        const linkData = await linkRes.json()

        const patientRes = await fetch(`/api/patients/intake?folderId=${patient.folderId}`)
        if (patientRes.ok) {
          const patientData = await patientRes.json()
          if (patientData.patient) {
            updatePatientDemographics(patientData.patient)
            setPatientSupabaseId(linkData.patientId, patientData.patient.uhid || linkData.clinicalId || patient.clinicalId || '')
          } else {
            setPatientSupabaseId(linkData.patientId, linkData.clinicalId || patient.clinicalId || '')
          }
        }
      }
    } catch {
      // No Supabase record yet — chatbot will collect demographics
    }
  }

  const handleCreatePatient = () => {
    clearPatient()
    resetCollectedDemographics()
    clearChatMessages()
    setIntakeMode('creating_patient')
    addChatMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: "Let's register a new patient. What is the patient's full name?",
      timestamp: Date.now(),
      status: 'complete',
    })
  }

  return (
    <div className="flex flex-col w-[240px] border-r border-border bg-panel-sidebar flex-shrink-0">
      {/* Mode Switcher */}
      <div className="border-b border-border">
        <ModeSwitcher />
      </div>

      {/* Header */}
      <div className="px-3 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-foreground">Patients</h2>
          <button
            onClick={handleCreatePatient}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            title="Create patient folder"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {/* Patient list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="px-3 py-4 text-center">
            <p className="text-xs text-red-400">{error}</p>
            <button
              onClick={() => fetchPatients()}
              className="mt-2 text-xs text-primary hover:text-primary/80"
            >
              Retry
            </button>
          </div>
        ) : patients.length === 0 ? (
          <div className="px-3 py-8 text-center">
            <p className="text-xs text-muted-foreground">
              {searchQuery ? 'No patients found' : 'No patients yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreatePatient}
                className="mt-2 text-xs text-primary hover:text-primary/80"
              >
                Create first patient
              </button>
            )}
          </div>
        ) : (
          <div className="py-1">
            {patients.map((patient) => (
              <button
                key={patient.folderId}
                onClick={() => handleSelect(patient)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  selectedPatient?.id === patient.folderId
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted/50'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                  selectedPatient?.id === patient.folderId
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{patient.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {patient.clinicalId}
                    {selectedPatient?.id === patient.folderId && selectedPatient.uhid && (
                      <span className="ml-1 text-primary">| {selectedPatient.uhid}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-border">
        <div className="text-[10px] text-muted-foreground text-center">
          {patients.length} patient{patients.length !== 1 ? 's' : ''} in Drive
        </div>
      </div>
    </div>
  )
}
