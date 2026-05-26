'use client'

import Link from 'next/link'

interface PatientCardProps {
  id: string
  patientCode: string
  name: string
  age: number | null
  gender: string | null
  phone?: string | null
  caseCount?: number
  lastVisit?: string | null
}

export function PatientCard({
  id,
  patientCode,
  name,
  age,
  gender,
  phone,
  caseCount,
  lastVisit,
}: PatientCardProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const ageGender = [age ? `${age} yrs` : null, gender].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/patients/${id}`}
      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
        <span className="text-sm font-semibold text-primary">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {name}
          </p>
          <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0">
            {patientCode}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {ageGender}
          {caseCount !== undefined && ` · ${caseCount} case${caseCount !== 1 ? 's' : ''}`}
        </p>

        {lastVisit && (
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">
            Last visit: {new Date(lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
