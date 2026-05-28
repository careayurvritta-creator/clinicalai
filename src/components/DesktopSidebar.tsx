'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useChatStore } from '@/lib/store'

interface SidebarItem {
  href: string
  label: string
  description: string
  icon: React.ReactNode
  matchModules?: string[]
}

const mainItems: SidebarItem[] = [
  {
    href: '/?module=chat',
    label: 'Chat',
    description: 'Clinical AI Chat',
    matchModules: ['chat'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: '/?module=documents',
    label: 'Patient Documents',
    description: 'Manage patient clinical documents',
    matchModules: ['documents'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    href: '/?module=treatment-protocol',
    label: 'Treatment Protocol',
    description: 'Create treatment protocols',
    matchModules: ['treatment-protocol'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

const secondaryItems: SidebarItem[] = [
  {
    href: '/cases',
    label: 'Cases',
    description: 'Manage clinical cases',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    href: '/patients',
    label: 'Patients',
    description: 'Manage patient records',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

function SessionItem({
  id,
  title,
  isActive,
  onSwitch,
  onDelete,
  onRename,
  collapsed,
}: {
  id: string
  title: string
  isActive: boolean
  onSwitch: () => void
  onDelete: () => void
  onRename: (title: string) => void
  collapsed: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)
  const [showActions, setShowActions] = useState(false)

  const handleRename = () => {
    if (editValue.trim() && editValue !== title) {
      onRename(editValue.trim())
    }
    setEditing(false)
  }

  if (collapsed) {
    return (
      <button
        onClick={onSwitch}
        className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs transition-colors ${
          isActive
            ? 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
        }`}
        title={title}
      >
        {title.charAt(0).toUpperCase()}
      </button>
    )
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => { setShowActions(false); setEditing(false) }}
    >
      {editing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="w-full px-3 py-1.5 text-xs bg-muted border border-primary/50 rounded-lg text-foreground outline-none"
        />
      ) : (
        <button
          onClick={onSwitch}
          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors ${
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
          }`}
        >
          <span className="flex-1 text-xs truncate">{title}</span>
          {showActions && (
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setEditValue(title)
                  setEditing(true)
                }}
                className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                title="Rename"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="p-0.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
                title="Delete"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </button>
      )}
    </div>
  )
}

export function DesktopSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeModule = searchParams.get('module')
  const [collapsed, setCollapsed] = useState(false)

  const sessions = useChatStore((state) => state.sessions)
  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const createSession = useChatStore((state) => state.createSession)
  const switchSession = useChatStore((state) => state.switchSession)
  const deleteSession = useChatStore((state) => state.deleteSession)
  const renameSession = useChatStore((state) => state.renameSession)

  // Persist collapse state
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored === 'true') setCollapsed(true)
  }, [])

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  const isActive = (item: SidebarItem) => {
    if (item.matchModules && activeModule) {
      return item.matchModules.includes(activeModule)
    }
    return pathname === item.href.split('?')[0]
  }

  // Get sessions grouped by module
  const getSessionsForModule = (module: string) =>
    Object.values(sessions)
      .filter((s) => s.module === module)
      .sort((a, b) => b.updatedAt - a.updatedAt)

  const handleNewChat = (module: string) => {
    createSession(module)
    // Navigate to the module
    window.location.href = `/?module=${module}`
  }

  return (
    <aside
      className={`hidden md:flex flex-col h-full bg-panel-chat border-r border-border transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-[260px]'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center h-12 px-4 border-b border-border shrink-0">
        {collapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
            <span className="text-xs font-bold text-primary">AV</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">AV</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground leading-tight">AyurVritta</h2>
              <p className="text-[10px] text-muted-foreground leading-tight">Clinical AI</p>
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {/* Main modules with sessions */}
        <div className="px-2 space-y-0.5">
          {!collapsed && (
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              Modules
            </p>
          )}
          {mainItems.map((item) => {
            const active = isActive(item)
            const moduleKey = item.matchModules?.[0] ?? ''
            const moduleSessions = getSessionsForModule(moduleKey)
            const isModuleExpanded = active || moduleSessions.some((s) => s.id === activeSessionId)

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                    active
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  aria-current={active ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <div className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.label}</p>
                    </div>
                  )}
                  {active && !collapsed && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </Link>

                {/* Sessions list for this module */}
                {!collapsed && isModuleExpanded && moduleSessions.length > 0 && (
                  <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l border-border pl-2">
                    {/* New Chat button */}
                    <button
                      onClick={() => handleNewChat(moduleKey)}
                      className="flex items-center gap-2 w-full px-2 py-1 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Chat
                    </button>
                    {moduleSessions.slice(0, 8).map((session) => (
                      <SessionItem
                        key={session.id}
                        id={session.id}
                        title={session.title}
                        isActive={session.id === activeSessionId}
                        onSwitch={() => switchSession(session.id)}
                        onDelete={() => deleteSession(session.id)}
                        onRename={(title) => renameSession(session.id, title)}
                        collapsed={false}
                      />
                    ))}
                    {moduleSessions.length > 8 && (
                      <p className="px-2 py-1 text-[10px] text-muted-foreground/50">
                        +{moduleSessions.length - 8} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="my-3 mx-3 border-t border-border" />

        {/* Secondary items */}
        <div className="px-2 space-y-0.5">
          {!collapsed && (
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              Records
            </p>
          )}
          {secondaryItems.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                aria-current={active ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                <div className={`shrink-0 ${active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Collapse toggle */}
      <div className="px-2 py-2 border-t border-border">
        <button
          onClick={toggleCollapse}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
