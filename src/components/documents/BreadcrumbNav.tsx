'use client'

import { useDocumentStore } from '@/lib/stores/document-store'

export function BreadcrumbNav() {
  const breadcrumbs = useDocumentStore((s) => s.breadcrumbs)
  const navigateUp = useDocumentStore((s) => s.navigateUp)
  const navigateToRoot = useDocumentStore((s) => s.navigateToRoot)

  if (breadcrumbs.length === 0) return null

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-muted/30 text-xs">
      <button
        onClick={navigateUp}
        className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
        aria-label="Go back"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {breadcrumbs.map((crumb, i) => (
        <span key={crumb.id} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground">/</span>}
          {i === 0 ? (
            <button onClick={navigateToRoot} className="hover:text-primary transition-colors text-muted-foreground">
              {crumb.label}
            </button>
          ) : (
            <span className={i === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}
