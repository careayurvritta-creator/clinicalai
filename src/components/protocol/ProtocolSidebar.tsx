'use client'

import { useState } from 'react'
import { useProtocolStore } from '@/lib/stores/protocol-store'

export function ProtocolSidebar() {
  const sessions = useProtocolStore((s) => s.sessions)
  const activeSessionId = useProtocolStore((s) => s.activeSessionId)
  const createSession = useProtocolStore((s) => s.createSession)
  const switchSession = useProtocolStore((s) => s.switchSession)
  const deleteSession = useProtocolStore((s) => s.deleteSession)
  const renameSession = useProtocolStore((s) => s.renameSession)
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const protocolSessions = Object.values(sessions)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 20)

  return (
    <div className="flex-1 overflow-y-auto py-2">
      <div className="px-3 py-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Patient Sessions
        </span>
        <button
          onClick={() => createSession('')}
          className="text-[10px] text-primary hover:text-primary/80 transition-colors"
        >
          + New
        </button>
      </div>
      {protocolSessions.map((session) => (
        <div
          key={session.id}
          className={`group flex items-center gap-2 px-3 py-1.5 mx-2 rounded-lg cursor-pointer transition-colors ${
            session.id === activeSessionId
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          onClick={() => switchSession(session.id)}
        >
          <div className="flex-1 min-w-0">
            {editingSessionId === session.id ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => {
                  if (editTitle.trim()) renameSession(session.id, editTitle.trim())
                  setEditingSessionId(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (editTitle.trim()) renameSession(session.id, editTitle.trim())
                    setEditingSessionId(null)
                  }
                  if (e.key === 'Escape') setEditingSessionId(null)
                }}
                className="w-full text-xs bg-transparent border-b border-primary/50 outline-none"
                autoFocus
              />
            ) : (
              <div
                className="text-xs truncate"
                onDoubleClick={() => {
                  setEditingSessionId(session.id)
                  setEditTitle(session.title)
                }}
              >
                {session.patientName || session.title || 'New Protocol'}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteSession(session.id)
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
            aria-label="Delete session"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
