'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
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

const MODULE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Chats' },
  { value: 'chat', label: 'Chat' },
  { value: 'intake', label: 'Case Collector' },
  { value: 'treatment-protocol', label: 'Protocol' },
]

interface HeaderBarProps {
  onMenuToggle?: () => void
}

// ─── Swipeable Session Item ──────────────────────────────

function SwipeableSessionItem({
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
  const [showActions, setShowActions] = useState(false)
  const [swipeX, setSwipeX] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const SWIPE_THRESHOLD = 80
  const DELETE_THRESHOLD = 120

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
    setSwiping(false)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.touches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y

    // Only swipe left, and only if horizontal movement dominates
    if (dx < -10 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setSwiping(true)
      setSwipeX(Math.min(0, Math.max(-DELETE_THRESHOLD * 1.2, dx)))
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current) return

    if (swipeX < -DELETE_THRESHOLD) {
      onDelete()
    } else if (swipeX < -SWIPE_THRESHOLD) {
      setShowActions(true)
    }

    setSwipeX(0)
    setSwiping(false)
    touchStartRef.current = null
  }, [swipeX, onDelete])

  const handleRename = () => {
    if (editValue.trim() && editValue !== session.title) {
      onRename(editValue.trim())
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="px-1 py-0.5">
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
            if (e.key === 'Escape') { setEditValue(session.title); setEditing(false) }
          }}
          className="w-full px-3 py-2.5 text-sm bg-muted border border-primary/50 rounded-xl text-foreground outline-none"
        />
      </div>
    )
  }

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden rounded-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Delete background revealed on swipe */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-4 bg-red-500/20 rounded-xl"
        style={{ opacity: Math.min(1, Math.abs(swipeX) / SWIPE_THRESHOLD) }}
      >
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>

      {/* Main item */}
      <div
        className={`relative flex items-center gap-3 px-3 py-2.5 transition-transform ${
          swiping ? '' : 'transition-none'
        } ${isActive ? 'bg-primary/10' : 'active:bg-muted/50'}`}
        style={{ transform: `translateX(${swipeX}px)` }}
      >
        {/* Session icon */}
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
          isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
        }`}>
          {session.title.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <button
          onClick={onSwitch}
          className="flex-1 min-w-0 text-left"
        >
          <p className={`text-sm truncate ${isActive ? 'text-primary font-medium' : 'text-foreground'}`}>
            {session.title}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <span>{MODULE_TITLES[session.module] ?? session.module}</span>
            <span className="opacity-40">·</span>
            <span>{formatRelativeTime(session.updatedAt)}</span>
          </p>
        </button>

        {/* Action buttons — always visible on mobile, hover on desktop */}
        <div className={`flex items-center gap-1 shrink-0 ${
          showActions ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
        } transition-opacity`}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setEditValue(session.title)
              setEditing(true)
              setShowActions(false)
            }}
            className="p-2 rounded-lg active:bg-muted text-muted-foreground touch-target"
            title="Rename"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-2 rounded-lg active:bg-red-500/10 text-muted-foreground active:text-red-400 touch-target"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Tap-to-toggle actions (mobile) */}
        {!showActions && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowActions(true)
            }}
            className="p-2 rounded-lg active:bg-muted text-muted-foreground/60 md:hidden touch-target"
            aria-label="More actions"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Session Drawer ──────────────────────────────────────

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
  const backdropRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [moduleFilter, setModuleFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)

  // Filter sessions
  const allSessions = Object.values(sessions).sort((a, b) => b.updatedAt - a.updatedAt)
  const filteredSessions = allSessions.filter((s) => {
    if (moduleFilter !== 'all' && s.module !== moduleFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return s.title.toLowerCase().includes(q) || s.module.toLowerCase().includes(q)
    }
    return true
  })
  const grouped = groupSessionsByTime(filteredSessions)

  // Close on backdrop touch
  const handleBackdropTouch = useCallback((e: React.TouchEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }, [onClose])

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

  // Reset state when closing
  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      setModuleFilter('all')
      setFilterOpen(false)
    }
  }, [open])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const handleNewChat = () => {
    createSession(moduleFilter !== 'all' ? moduleFilter : activeModule)
    onClose()
  }

  const handleSwitch = (id: string) => {
    switchSession(id)
    onClose()
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop with fade */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in"
        onClick={onClose}
        onTouchEnd={handleBackdropTouch}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 left-0 z-50 w-[300px] max-w-[85vw] bg-panel-chat border-r border-border flex flex-col animate-slide-in md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0 safe-top">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">AV</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Chats</h2>
              <p className="text-[10px] text-muted-foreground">{allSessions.length} conversations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg active:bg-muted transition-colors touch-target"
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
            className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-sm font-medium text-primary active:bg-primary/20 transition-colors touch-target"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2 shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md active:bg-muted"
              >
                <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Module filter chips */}
        <div className="px-3 pb-3 shrink-0">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {MODULE_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setModuleFilter(opt.value)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  moduleFilter === opt.value
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted/50 text-muted-foreground active:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin">
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm font-medium">
                {searchQuery ? 'No matching chats' : 'No conversations yet'}
              </p>
              <p className="text-xs mt-1 opacity-60">
                {searchQuery ? 'Try a different search' : 'Start a new chat to begin'}
              </p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.label} className="mb-4">
                <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.sessions.map((session) => (
                    <SwipeableSessionItem
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

// ─── Header Bar ──────────────────────────────────────────

export function HeaderBar({ onMenuToggle }: HeaderBarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeModule = searchParams.get('module')
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const createSession = useChatStore((state) => state.createSession)
  const sessions = useChatStore((state) => state.sessions)
  const activeSessionId = useChatStore((state) => state.activeSessionId)

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

  const handleNewChat = () => {
    const mod = activeModule || 'chat'
    createSession(mod)
    if (pathname !== '/') {
      window.location.href = `/?module=${mod}`
    }
  }

  // Show active session title on mobile if one exists
  const activeSession = activeSessionId ? sessions[activeSessionId] : null
  const subtitle = activeSession && activeSession.title !== 'New Chat'
    ? activeSession.title
    : null

  return (
    <>
      <header
        className="flex items-center h-12 px-3 md:px-4 bg-panel-header border-b border-border shrink-0"
        role="banner"
      >
        {/* Mobile: hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="mr-2 p-2 rounded-lg active:bg-muted transition-colors md:hidden touch-target"
          aria-label="Open chat history"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate leading-tight">
            {mounted ? getTitle() : ''}
          </h1>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground truncate leading-tight md:hidden">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* New Chat — mobile */}
          <button
            onClick={handleNewChat}
            className="p-2 rounded-lg active:bg-muted transition-colors md:hidden touch-target"
            aria-label="New chat"
          >
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return 'just now'
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < 2 * day) return 'yesterday'
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

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
