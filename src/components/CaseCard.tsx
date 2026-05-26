'use client'

import Link from 'next/link'

interface CaseCardProps {
  id: string
  caseNumber: string
  patientName?: string
  status: string
  diagnosis?: string | null
  chiefComplaints?: Array<{ complaint: string; duration: string; severity: number }>
  createdAt: string
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  follow_up: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  pending: 'bg-muted text-muted-foreground border-border',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  follow_up: 'Follow-up',
  pending: 'Pending',
}

export function CaseCard({
  id,
  caseNumber,
  patientName,
  status,
  diagnosis,
  chiefComplaints,
  createdAt,
}: CaseCardProps) {
  const date = new Date(createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const complaints = chiefComplaints
    ?.map((c) => c.complaint)
    .slice(0, 3)
    .join(', ')

  return (
    <Link
      href={`/cases/${id}`}
      className="block p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
    >
      {/* Top row: case number + status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-muted-foreground">{caseNumber}</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
            STATUS_STYLES[status] || STATUS_STYLES.pending
          }`}
        >
          {STATUS_LABELS[status] || status}
        </span>
      </div>

      {/* Patient name */}
      {patientName && (
        <p className="text-sm font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
          {patientName}
        </p>
      )}

      {/* Chief complaints */}
      {complaints && (
        <p className="text-xs text-muted-foreground mb-1.5 truncate">
          {complaints}
        </p>
      )}

      {/* Diagnosis */}
      {diagnosis && (
        <p className="text-xs text-muted-foreground/80 mb-2 line-clamp-1 italic">
          {diagnosis}
        </p>
      )}

      {/* Footer: date + arrow */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
        <span className="text-[11px] text-muted-foreground/70">{date}</span>
        <svg
          className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
