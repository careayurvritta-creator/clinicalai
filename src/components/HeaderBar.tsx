'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const MODULE_TITLES: Record<string, string> = {
  chat: 'Clinical AI Chat',
  intake: 'Case Collector',
  'treatment-protocol': 'Treatment Protocol',
}

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/cases': 'Cases',
  '/patients': 'Patients',
  '/patients/new': 'New Patient',
}

interface HeaderBarProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export function HeaderBar({ onMenuToggle, showMenuButton = false }: HeaderBarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeModule = searchParams.get('module')

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const getTitle = () => {
    if (pathname === '/' && activeModule && MODULE_TITLES[activeModule]) {
      return MODULE_TITLES[activeModule]
    }
    if (ROUTE_TITLES[pathname]) {
      return ROUTE_TITLES[pathname]
    }
    if (pathname.startsWith('/cases/')) return 'Case Details'
    if (pathname.startsWith('/patients/')) return 'Patient Details'
    return 'AyurVritta'
  }

  return (
    <header
      className="flex items-center h-12 px-4 bg-panel-header border-b border-border shrink-0"
      role="banner"
    >
      {showMenuButton && (
        <button
          onClick={onMenuToggle}
          className="mr-3 p-1.5 rounded-lg hover:bg-muted transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <h1 className="text-sm font-semibold text-foreground truncate">
        {mounted ? getTitle() : ''}
      </h1>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-primary">DR</span>
        </div>
      </div>
    </header>
  )
}
