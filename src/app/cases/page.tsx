'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Case {
  id: string
  case_number: string
  status: string
  provisional_diagnosis: string | null
  created_at: string
  chief_complaints: Array<{ complaint: string; duration: string; severity: number }>
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')

  useEffect(() => {
    fetchCases()
  }, [statusFilter])

  const fetchCases = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      params.set('limit', '50')

      const res = await fetch(`/api/cases?${params}`)
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      const data = await res.json()
      setCases(data.cases || [])
    } catch (error) {
      console.error('Failed to fetch cases:', error)
      setError('Failed to load cases. Please try again.')
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cases</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage clinical cases</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            + New Case
          </Link>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['', 'active', 'completed', 'follow_up'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status || 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground">Loading cases...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-3">{error}</p>
            <button
              onClick={fetchCases}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground">No cases found</p>
            <p className="text-sm text-muted-foreground/80 mt-1">Start a new case from the home page</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="block p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{caseItem.case_number}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </div>
                    {caseItem.provisional_diagnosis && (
                      <p className="text-sm text-muted-foreground mt-1">{caseItem.provisional_diagnosis}</p>
                    )}
                    {caseItem.chief_complaints && caseItem.chief_complaints.length > 0 && (
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        {caseItem.chief_complaints.map(c => c.complaint).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(caseItem.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
