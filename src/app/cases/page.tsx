'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { CaseCard } from '@/components/CaseCard'

interface Case {
  id: string
  case_number: string
  status: string
  provisional_diagnosis: string | null
  created_at: string
  patient_name?: string
  chief_complaints: Array<{ complaint: string; duration: string; severity: number }>
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'follow_up', label: 'Follow-up' },
]

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  const fetchCases = useCallback(async () => {
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
  }, [statusFilter])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  // Filter and sort cases
  const filteredCases = cases
    .filter((c) => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        c.case_number.toLowerCase().includes(q) ||
        c.patient_name?.toLowerCase().includes(q) ||
        c.provisional_diagnosis?.toLowerCase().includes(q) ||
        c.chief_complaints?.some((cc) => cc.complaint.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4 md:p-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Cases</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/?module=intake"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Case
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="flex-1">
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
                placeholder="Search by name, complaint, or diagnosis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Status filter */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-thin">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === opt.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button
            onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors shrink-0"
          >
            <svg className={`w-3.5 h-3.5 transition-transform ${sortBy === 'oldest' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {sortBy === 'newest' ? 'Newest' : 'Oldest'}
          </button>
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
              onClick={fetchCases}
              className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:border-primary/30 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-sm text-muted-foreground mb-1">
              {search ? 'No cases match your search' : 'No cases yet'}
            </p>
            {!search && (
              <Link
                href="/?module=intake"
                className="inline-block mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Create First Case
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCases.map((c) => (
              <CaseCard
                key={c.id}
                id={c.id}
                caseNumber={c.case_number}
                patientName={c.patient_name}
                status={c.status}
                diagnosis={c.provisional_diagnosis}
                chiefComplaints={c.chief_complaints}
                createdAt={c.created_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
