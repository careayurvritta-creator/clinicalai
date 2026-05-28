'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/AuthProvider'

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
  const { user, signOut } = useAuth()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

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

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Doctor'
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-muted transition-colors"
            aria-label="Profile menu"
            aria-expanded={dropdownOpen}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-7 h-7 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-semibold text-primary">{initials}</span>
              </div>
            )}
          </button>

          {/* Profile dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-card border border-border shadow-2xl shadow-black/50 z-50 animate-fade-in overflow-hidden">
              {/* User info */}
              <div className="px-4 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-10 h-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{initials}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Sign out */}
              <div className="p-1.5">
                <button
                  onClick={() => {
                    setDropdownOpen(false)
                    signOut()
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
