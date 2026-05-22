'use client'

import { useState } from 'react'
import { TREATMENTS, PURVAKARMA } from '@/lib/ayurknowledge/treatments'
import { HERBS } from '@/lib/ayurknowledge/herbs'
import { DISEASES } from '@/lib/ayurknowledge/diseases'

interface PatientInfo {
  name: string
  age: string
  gender: string
  prakriti: string
  chiefComplaints: string
  diagnosis: string
  duration: string
  associatedSymptoms: string
  investigation: string
}

interface TreatmentSelection {
  selectedPanchakarma: string[]
  selectedPurvakarma: string[]
  selectedHerbs: string[]
  treatmentDuration: string
  budget: string
}

export function TreatmentProtocolMaker() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    age: '',
    gender: '',
    prakriti: '',
    chiefComplaints: '',
    diagnosis: '',
    duration: '',
    associatedSymptoms: '',
    investigation: '',
  })

  const [treatmentSelection, setTreatmentSelection] = useState<TreatmentSelection>({
    selectedPanchakarma: [],
    selectedPurvakarma: [],
    selectedHerbs: [],
    treatmentDuration: '14',
    budget: 'medium',
  })

  const [generatedProtocol, setGeneratedProtocol] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const prakritiOptions = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Kapha-Vata', 'Tridosha']
  const genderOptions = ['Male', 'Female', 'Other']

  const togglePanchakarma = (id: string) => {
    setTreatmentSelection(prev => ({
      ...prev,
      selectedPanchakarma: prev.selectedPanchakarma.includes(id)
        ? prev.selectedPanchakarma.filter(p => p !== id)
        : [...prev.selectedPanchakarma, id]
    }))
  }

  const togglePurvakarma = (id: string) => {
    setTreatmentSelection(prev => ({
      ...prev,
      selectedPurvakarma: prev.selectedPurvakarma.includes(id)
        ? prev.selectedPurvakarma.filter(p => p !== id)
        : [...prev.selectedPurvakarma, id]
    }))
  }

  const toggleHerb = (id: string) => {
    setTreatmentSelection(prev => ({
      ...prev,
      selectedHerbs: prev.selectedHerbs.includes(id)
        ? prev.selectedHerbs.filter(h => h !== id)
        : [...prev.selectedHerbs, id]
    }))
  }

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }))
  }

  const generateProtocol = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/treatment-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientInfo, treatmentSelection }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setGeneratedProtocol(data.protocol || 'No protocol generated.')
    } catch (error) {
      setGeneratedProtocol('Error generating protocol. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-panel-chat">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <h2 className="text-sm font-semibold text-foreground">Treatment Protocol Maker</h2>
        <button
          onClick={generateProtocol}
          disabled={isGenerating}
          className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Protocol'}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 space-y-6">
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary text-xs">1</span>
              Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter name"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Age</label>
                  <input
                    type="text"
                    value={patientInfo.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Age"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Gender</label>
                  <select
                    value={patientInfo.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select</option>
                    {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Prakriti</label>
                <div className="flex flex-wrap gap-2">
                  {prakritiOptions.map(p => (
                    <button
                      key={p}
                      onClick={() => handleInputChange('prakriti', p)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        patientInfo.prakriti === p
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Chief Complaints</label>
                <textarea
                  value={patientInfo.chiefComplaints}
                  onChange={(e) => handleInputChange('chiefComplaints', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  rows={2}
                  placeholder="Main symptoms..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Diagnosis</label>
                <select
                  value={patientInfo.diagnosis}
                  onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select diagnosis</option>
                  {DISEASES.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-muted-foreground mb-1">Duration of Illness</label>
                <input
                  type="text"
                  value={patientInfo.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g., 6 months"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary text-xs">2</span>
              Treatment Selection
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Purvakarma (Pre-treatment)</label>
                <div className="flex flex-wrap gap-2">
                  {PURVAKARMA.map(p => (
                    <button
                      key={p.id}
                      onClick={() => togglePurvakarma(p.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        treatmentSelection.selectedPurvakarma.includes(p.id)
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2">Panchakarma / Main Treatments</label>
                <div className="grid grid-cols-2 gap-2">
                  {TREATMENTS.filter(t => t.category.includes('Panchakarma')).map(t => (
                    <button
                      key={t.id}
                      onClick={() => togglePanchakarma(t.id)}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        treatmentSelection.selectedPanchakarma.includes(t.id)
                          ? 'bg-primary/20 border-primary'
                          : 'bg-muted border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.sanskrit}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-2">Adjuvant Herbs</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {HERBS.slice(0, 12).map(h => (
                    <button
                      key={h.id}
                      onClick={() => toggleHerb(h.id)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        treatmentSelection.selectedHerbs.includes(h.id)
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-muted border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {h.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Treatment Duration (days)</label>
                  <select
                    value={treatmentSelection.treatmentDuration}
                    onChange={(e) => setTreatmentSelection(prev => ({ ...prev, treatmentDuration: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="21">21 days</option>
                    <option value="30">30 days</option>
                    <option value="45">45 days</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Budget</label>
                  <select
                    value={treatmentSelection.budget}
                    onChange={(e) => setTreatmentSelection(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="low">Economical</option>
                    <option value="medium">Standard</option>
                    <option value="high">Premium</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {generatedProtocol && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary text-xs">3</span>
                Generated Protocol
              </h3>
              <div className="p-4 bg-muted/50 border border-border rounded-lg">
                <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                  {generatedProtocol}
                </pre>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}