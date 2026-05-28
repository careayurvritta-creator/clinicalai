'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useChatStore } from '@/lib/store'
import type { ChatSession } from '@/lib/types'

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

function SessionDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const sessions = useChatStore((state) => state.sessions)
  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const createSession = useChatStore((state) => state.createSession)
  const switchSession = useChatStore((state) => state.switchSession)
  const deleteSession = useChatStore((state) => state.deleteSession)
  const renameSession = useChatStore((state) => state.renameSession)
  const activeModule = useChatStore((state) => state.activeModule)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Group sessions by time
  const grouped = groupSessionsByTime(
    Object.values(sessions).sort((a, b) => b.updatedAt - a.updatedAt)
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  // Close on escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleNewChat = () => {
    createSession(activeModule)
    onClose()
  }

  const handleSwitch = (id: string) => {
    switchSession(id)
    onClose()
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 left-0 z-50 w-[280px] max-w-[80vw] bg-panel-chat border-r border-border flex flex-col animate-slide-in md:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-12 px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AV</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Chats</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New Chat button */}
        <div className="p-3 shrink-0">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-muted/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1 opacity-60">Start a new chat to begin</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.label} className="mb-3">
                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.sessions.map((session) => (
                    <MobileSessionItem
                      key={session.id}
                      session={session}
                      isActive={session.id === activeSessionId}
                      onSwitch={() => handleSwitch(session.id)}
                      onDelete={() => deleteSession(session.id)}
                      onRename={(title) => renameSession(session.id, title)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

function MobileSessionItem({
  session,
  isActive,
  onSwitch,
  onDelete,
  onRename,
}: {
  session: ChatSession
  isActive: boolean
  onSwitch: () => void
  onDelete: () => void
  onRename: (title: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(session.title)
  const [showMenu, setShowMenu] = useState(false)

  const handleRename = () => {
    if (editValue.trim() && editValue !== session.title) {
      onRename(editValue.trim())
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="px-2">
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="w-full px-3 py-2 text-sm bg-muted border border-primary/50 rounded-lg text-foreground outline-none"
        />
      </div>
    )
  }

  return (
    <div className="relative group">
      <button
        onClick={onSwitch}
        onContextMenu={(e) => {
          e.preventDefault()
          setShowMenu(!showMenu)
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-foreground hover:bg-muted/40'
        }`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate">{session.title}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {MODULE_TITLES[session.module] ?? session.module}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setEditValue(session.title)
              setEditing(true)
            }}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Rename"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </button>
    </div>
  )
}

export function HeaderBar({ onMenuToggle, showMenuButton = false }: HeaderBarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeModule = searchParams.get('module')
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

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

  const createSession = useChatStore((state) => state.createSession)

  const handleNewChat = () => {
    const mod = activeModule || 'chat'
    createSession(mod)
    if (pathname !== '/') {
      window.location.href = `/?module=${mod}`
    }
  }

  return (
    <>
      <header
        className="flex items-center h-12 px-3 md:px-4 bg-panel-header border-b border-border shrink-0"
        role="banner"
      >
        {/* Mobile: hamburger or back */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="mr-2 p-1.5 rounded-lg hover:bg-muted transition-colors md:hidden"
          aria-label="Open chat history"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-sm font-semibold text-foreground truncate">
          {mounted ? getTitle() : ''}
        </h1>

        <div className="flex-1" />

        {/* Right side actions */}
        <div className="flex items-center gap-1.5">
          {/* New Chat button — mobile */}
          <button
            onClick={handleNewChat}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors md:hidden"
            aria-label="New chat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile session drawer */}
      <SessionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}

// ─── Helpers ──────────────────────────────────────────────

function groupSessionsByTime(sessions: ChatSession[]): { label: string; sessions: ChatSession[] }[] {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000

  const groups: Record<string, ChatSession[]> = {
    'Today': [],
    'Yesterday': [],
    'Previous 7 Days': [],
    'Previous 30 Days': [],
    'Older': [],
  }

  for (const session of sessions) {
    const age = now - session.updatedAt
    if (age < day) groups['Today'].push(session)
    else if (age < 2 * day) groups['Yesterday'].push(session)
    else if (age < 7 * day) groups['Previous 7 Days'].push(session)
    else if (age < 30 * day) groups['Previous 30 Days'].push(session)
    else groups['Older'].push(session)
  }

  return Object.entries(groups)
    .filter(([, s]) => s.length > 0)
    .map(([label, s]) => ({ label, sessions: s }))
}
