# Three-Mode Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the monolithic app into three independent modes (Chat, Treatment Protocol, Patient Documents) with separate stores, layouts, and component trees.

**Architecture:** Route groups with per-mode layouts, independent Zustand stores, shared infrastructure (API, templates, Drive client, auth). Documents mode uses Google Drive only with embedded Sheets/Docs iframe editors.

**Tech Stack:** Next.js 15 App Router, React 19, Zustand 5, Google Drive API, Tailwind CSS 3

---

## File Structure

### Files to Create

| File | Purpose |
|---|---|
| `src/components/shared/ModeSwitcher.tsx` | 3-icon mode navigation (Chat, Protocol, Documents) |
| `src/components/shared/MobileModeNav.tsx` | Mobile bottom nav with 3 modes + Cases/Patients |
| `src/stores/chat-store.ts` | Chat-only store (extracted from store.ts) |
| `src/app/(chat)/layout.tsx` | Chat mode layout with sidebar |
| `src/app/(chat)/page.tsx` | Chat page (migrated from chat/page.tsx) |
| `src/app/(treatment-protocol)/layout.tsx` | Protocol mode layout with sidebar |
| `src/app/(treatment-protocol)/page.tsx` | Protocol page |
| `src/app/(documents)/layout.tsx` | Documents mode layout (3-panel) |
| `src/app/(documents)/page.tsx` | Documents page |
| `src/components/chat/ChatSidebar.tsx` | Session list sidebar for chat mode |
| `src/components/chat/ChatCanvas.tsx` | Enhanced markdown canvas |
| `src/components/protocol/ProtocolSidebar.tsx` | Patient session sidebar for protocol mode |
| `src/components/documents/DocumentLayout.tsx` | 3-panel layout (PatientSidebar + Explorer + AIChat) |
| `src/components/documents/PatientSidebar.tsx` | Patient list from Drive |
| `src/components/documents/DocumentExplorer.tsx` | Category grid + file list |
| `src/components/documents/EmbeddedEditor.tsx` | iframe for Google Sheets/Docs |
| `src/components/documents/AIDocumentChat.tsx` | AI sidebar for template generation |
| `src/components/documents/BreadcrumbNav.tsx` | Patient > Category > File navigation |
| `src/app/api/drive/embed/route.ts` | Get embeddable URL for Sheets/Docs iframe |

### Files to Modify

| File | Change |
|---|---|
| `src/app/layout.tsx` | Remove AppLayout wrapper, render children directly |
| `src/components/ClientProviders.tsx` | Remove AppLayout import, just wrap with providers |
| `src/lib/store.ts` | Remove module-switching logic, keep as legacy or delete |
| `src/lib/stores/document-store.ts` | Rewrite for Drive-based architecture |
| `src/components/CanvasPanel.tsx` | Split into ChatCanvas + ProtocolCanvas |
| `src/components/ResizableLayout.tsx` | Each mode gets its own, remove shared version |

### Files to Delete (after migration complete)

| File | Replaced By |
|---|---|
| `src/components/AppLayout.tsx` | Per-mode layouts |
| `src/components/DesktopSidebar.tsx` | ChatSidebar + ProtocolSidebar |
| `src/components/HeaderBar.tsx` | Per-mode headers in layouts |
| `src/components/MobileNav.tsx` | MobileModeNav |
| `src/components/ChatPanel.tsx` | chat/ChatPanel (inline in ChatView) |
| `src/components/PatientDocuments.tsx` | documents/DocumentLayout |
| `src/components/SpreadsheetEditor.tsx` | EmbeddedEditor |
| `src/app/chat/page.tsx` | (chat)/page.tsx |
| `src/app/treatment-protocol/page.tsx` | (treatment-protocol)/page.tsx |
| `src/app/documents/page.tsx` | (documents)/page.tsx |
| `src/lib/stores/chat-store.ts` (standalone duplicate) | Merged into new chat-store |

---

## Phase 1: Architecture Restructuring

### Task 1: Create Shared ModeSwitcher Component

**Files:**
- Create: `src/components/shared/ModeSwitcher.tsx`

- [ ] **Step 1: Create ModeSwitcher component**

```tsx
// src/components/shared/ModeSwitcher.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const modes = [
  {
    href: '/chat',
    label: 'Chat',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: '/treatment-protocol',
    label: 'Protocol',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: '/documents',
    label: 'Documents',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
]

export function ModeSwitcher() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-1">
        Modes
      </span>
      {modes.map((mode) => (
        <Link
          key={mode.href}
          href={mode.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive(mode.href)
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          {mode.icon}
          <span className="text-sm font-medium">{mode.label}</span>
        </Link>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors related to ModeSwitcher

---

### Task 2: Create Chat Store (Independent)

**Files:**
- Create: `src/stores/chat-store.ts`

The current `src/lib/store.ts` has module-switching logic (`activeModule`, `messagesByModule`, `setActiveModule`, `streamingModule`). The new chat store is chat-only — no module awareness.

- [ ] **Step 1: Create the chat store**

```ts
// src/stores/chat-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, ChatSession } from '@/lib/types'
import { DEFAULT_MODEL, MODELS } from '@/lib/types'

const MAX_MESSAGES = 200
const MAX_TITLE_LENGTH = 40

interface ChatState {
  messages: Message[]
  sessions: Record<string, ChatSession>
  activeSessionId: string | null
  selectedModel: string
  canvasContent: string
  canvasTimestamp: number
  isStreaming: boolean
  chatInputDraft: string // excluded from persistence
}

interface ChatActions {
  addMessage: (message: Message) => void
  updateLastMessage: (content: string, status?: Message['status']) => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  clearMessages: () => void
  setChatInputDraft: (draft: string) => void
  createSession: () => string
  switchSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  renameSession: (sessionId: string, title: string) => void
  getSessions: () => ChatSession[]
}

function trimMessages(messages: Message[]): Message[] {
  if (messages.length <= MAX_MESSAGES) return messages
  return messages.slice(-MAX_MESSAGES)
}

function generateTitle(content: string): string {
  const clean = content.replace(/\n/g, ' ').trim()
  if (clean.length <= MAX_TITLE_LENGTH) return clean
  return clean.slice(0, MAX_TITLE_LENGTH) + '...'
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      messages: [],
      sessions: {},
      activeSessionId: null,
      selectedModel: DEFAULT_MODEL,
      canvasContent: '',
      canvasTimestamp: 0,
      isStreaming: false,
      chatInputDraft: '',

      addMessage: (message) =>
        set((state) => {
          const newMessages = trimMessages([...state.messages, message])
          const updatedSessions = { ...state.sessions }
          const sid = state.activeSessionId
          if (sid && updatedSessions[sid]) {
            updatedSessions[sid] = {
              ...updatedSessions[sid],
              messages: newMessages,
              updatedAt: Date.now(),
              title:
                updatedSessions[sid].title === 'New Chat' && message.role === 'user'
                  ? generateTitle(message.content)
                  : updatedSessions[sid].title,
            }
          }
          return { messages: newMessages, sessions: updatedSessions }
        }),

      updateLastMessage: (content, status) =>
        set((state) => {
          const messages = [...state.messages]
          const last = messages[messages.length - 1]
          if (last) {
            messages[messages.length - 1] = { ...last, content, status: status ?? last.status }
          }
          const updatedSessions = { ...state.sessions }
          const sid = state.activeSessionId
          if (sid && updatedSessions[sid]) {
            updatedSessions[sid] = { ...updatedSessions[sid], messages, updatedAt: Date.now() }
          }
          return { messages, sessions: updatedSessions }
        }),

      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setModel: (model) => set({ selectedModel: model }),
      setCanvasContent: (content) => set({ canvasContent: content, canvasTimestamp: Date.now() }),

      clearMessages: () =>
        set({ messages: [], canvasContent: '', canvasTimestamp: 0, isStreaming: false }),

      setChatInputDraft: (draft) => set({ chatInputDraft: draft }),

      createSession: () => {
        const id = crypto.randomUUID()
        const now = Date.now()
        const session: ChatSession = {
          id,
          title: 'New Chat',
          module: 'chat',
          messages: [],
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          sessions: { ...state.sessions, [id]: session },
          activeSessionId: id,
          messages: [],
          canvasContent: '',
          canvasTimestamp: 0,
        }))
        return id
      },

      switchSession: (sessionId) =>
        set((state) => {
          const session = state.sessions[sessionId]
          if (!session) return state
          const updatedSessions = { ...state.sessions }
          const currentSid = state.activeSessionId
          if (currentSid && updatedSessions[currentSid]) {
            updatedSessions[currentSid] = { ...updatedSessions[currentSid], messages: state.messages }
          }
          return {
            sessions: updatedSessions,
            activeSessionId: sessionId,
            messages: session.messages,
            canvasContent: '',
            canvasTimestamp: 0,
          }
        }),

      deleteSession: (sessionId) =>
        set((state) => {
          const updatedSessions = { ...state.sessions }
          delete updatedSessions[sessionId]
          if (state.activeSessionId === sessionId) {
            const remaining = Object.values(updatedSessions).sort((a, b) => b.updatedAt - a.updatedAt)
            const next = remaining[0]
            return {
              sessions: updatedSessions,
              activeSessionId: next?.id ?? null,
              messages: next?.messages ?? [],
              canvasContent: '',
              canvasTimestamp: 0,
            }
          }
          return { sessions: updatedSessions }
        }),

      renameSession: (sessionId, title) =>
        set((state) => {
          const session = state.sessions[sessionId]
          if (!session) return state
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: { ...session, title, updatedAt: Date.now() },
            },
          }
        }),

      getSessions: () => {
        return Object.values(get().sessions).sort((a, b) => b.updatedAt - a.updatedAt)
      },
    }),
    {
      name: 'clinical-ai-chat-v2',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
        }
        return localStorage
      }),
      partialize: (state) => ({
        messages: state.messages,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
        canvasTimestamp: state.canvasTimestamp,
        activeSessionId: state.activeSessionId,
        sessions: state.sessions,
      }),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') return persistedState
        const state = persistedState as Record<string, unknown>
        if (version < 1 && state?.selectedModel) {
          const validIds = MODELS.map((m) => m.id)
          if (!validIds.includes(state.selectedModel as string)) {
            state.selectedModel = DEFAULT_MODEL
          }
        }
        return persistedState
      },
    }
  )
)
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 3: Create Chat Mode Layout and Page

**Files:**
- Create: `src/app/(chat)/layout.tsx`
- Create: `src/app/(chat)/page.tsx`

- [ ] **Step 1: Create chat layout**

```tsx
// src/app/(chat)/layout.tsx
'use client'

import { ModeSwitcher } from '@/components/shared/ModeSwitcher'
import { ChatSidebar } from '@/components/chat/ChatSidebar'
import { MobileModeNav } from '@/components/shared/MobileModeNav'
import { ToastContainer } from '@/components/Toast'
import { useState } from 'react'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col bg-panel-sidebar border-r border-border flex-shrink-0 transition-all duration-200 ${sidebarCollapsed ? 'w-16' : 'w-[260px]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {!sidebarCollapsed && <span className="text-sm font-semibold text-foreground">AyurVritta AI</span>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sidebarCollapsed ? 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12' : 'M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'} />
            </svg>
          </button>
        </div>

        {/* Mode switcher */}
        {!sidebarCollapsed && <ModeSwitcher />}

        {/* Chat sessions */}
        {!sidebarCollapsed && <ChatSidebar />}

        {/* Collapsed mode icons */}
        {sidebarCollapsed && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <ModeSwitcher />
          </div>
        )}

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-border mt-auto">
            <div className="text-[10px] text-muted-foreground text-center">AyurVritta Ayurveda</div>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </main>
        <MobileModeNav />
      </div>

      <ToastContainer />
    </div>
  )
}
```

- [ ] **Step 2: Create chat page**

```tsx
// src/app/(chat)/page.tsx
'use client'

import { useChatStore } from '@/stores/chat-store'
import { MessageBubble } from '@/components/MessageBubble'
import { ChatInput } from '@/components/ChatInput'
import { ChatCanvas } from '@/components/chat/ChatCanvas'
import { ResizableLayout } from '@/components/ResizableLayout'
import { useEffect, useRef } from 'react'

function ChatView() {
  const messages = useChatStore((state) => state.messages)
  const isStreaming = useChatStore((state) => state.isStreaming)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const { scrollHeight, scrollTop, clientHeight } = container
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 200
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-3 py-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Clinical AI</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Your AI-powered Ayurvedic clinical assistant. Ask about symptoms, treatments, herbs, or clinical protocols.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            Processing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput />
    </div>
  )
}

export default function ChatPage() {
  return (
    <ResizableLayout
      chatPanel={<ChatView />}
      canvasPanel={<ChatCanvas />}
    />
  )
}
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors for the (chat) route group

---

### Task 4: Create ChatSidebar Component

**Files:**
- Create: `src/components/chat/ChatSidebar.tsx`

- [ ] **Step 1: Create ChatSidebar**

Extract the session list logic from `DesktopSidebar.tsx` (lines 164-228) into a standalone component that uses the new `useChatStore`.

```tsx
// src/components/chat/ChatSidebar.tsx
'use client'

import { useState } from 'react'
import { useChatStore } from '@/stores/chat-store'

export function ChatSidebar() {
  const sessions = useChatStore((s) => s.sessions)
  const activeSessionId = useChatStore((s) => s.activeSessionId)
  const createSession = useChatStore((s) => s.createSession)
  const switchSession = useChatStore((s) => s.switchSession)
  const deleteSession = useChatStore((s) => s.deleteSession)
  const renameSession = useChatStore((s) => s.renameSession)
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const chatSessions = Object.values(sessions)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 20)

  return (
    <div className="flex-1 overflow-y-auto py-2">
      <div className="px-3 py-1 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Sessions
        </span>
        <button
          onClick={() => createSession()}
          className="text-[10px] text-primary hover:text-primary/80 transition-colors"
        >
          + New
        </button>
      </div>
      {chatSessions.map((session) => (
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
                {session.title}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 5: Create ChatCanvas Component

**Files:**
- Create: `src/components/chat/ChatCanvas.tsx`

- [ ] **Step 1: Create ChatCanvas**

Adapt `CanvasPanel.tsx` to use the new `useChatStore` instead of the old shared store.

```tsx
// src/components/chat/ChatCanvas.tsx
'use client'

import { useChatStore } from '@/stores/chat-store'
import { CanvasToolbar } from '@/components/CanvasToolbar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function ChatCanvas() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  const canvasTimestamp = useChatStore((state) => state.canvasTimestamp)

  if (!canvasContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Output will appear here</p>
      </div>
    )
  }

  const isStale = Date.now() - canvasTimestamp > 5 * 60 * 1000

  return (
    <div className="flex flex-col min-h-0 h-full">
      {isStale && (
        <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-xs text-yellow-600 dark:text-yellow-400">
          This content may be outdated. Send a new message for fresh results.
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-6 py-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {canvasContent}
          </ReactMarkdown>
        </div>
      </div>
      <CanvasToolbar />
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 6: Create Protocol Mode Layout and Page

**Files:**
- Create: `src/app/(treatment-protocol)/layout.tsx`
- Create: `src/app/(treatment-protocol)/page.tsx`
- Create: `src/components/protocol/ProtocolSidebar.tsx`

- [ ] **Step 1: Create ProtocolSidebar**

```tsx
// src/components/protocol/ProtocolSidebar.tsx
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
                {session.patientName || session.title}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create protocol layout**

```tsx
// src/app/(treatment-protocol)/layout.tsx
'use client'

import { ModeSwitcher } from '@/components/shared/ModeSwitcher'
import { ProtocolSidebar } from '@/components/protocol/ProtocolSidebar'
import { MobileModeNav } from '@/components/shared/MobileModeNav'
import { ToastContainer } from '@/components/Toast'
import { useState } from 'react'

export default function ProtocolLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      <aside className={`hidden md:flex flex-col bg-panel-sidebar border-r border-border flex-shrink-0 transition-all duration-200 ${sidebarCollapsed ? 'w-16' : 'w-[260px]'}`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {!sidebarCollapsed && <span className="text-sm font-semibold text-foreground">AyurVritta AI</span>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sidebarCollapsed ? 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12' : 'M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'} />
            </svg>
          </button>
        </div>
        {!sidebarCollapsed && <ModeSwitcher />}
        {!sidebarCollapsed && <ProtocolSidebar />}
        {sidebarCollapsed && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <ModeSwitcher />
          </div>
        )}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-border mt-auto">
            <div className="text-[10px] text-muted-foreground text-center">AyurVritta Ayurveda</div>
          </div>
        )}
      </aside>
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </main>
        <MobileModeNav />
      </div>
      <ToastContainer />
    </div>
  )
}
```

- [ ] **Step 3: Create protocol page**

```tsx
// src/app/(treatment-protocol)/page.tsx
'use client'

import { CaseCollectorChat } from '@/components/CaseCollectorChat'
import { CanvasPanel } from '@/components/CanvasPanel'
import { ResizableLayout } from '@/components/ResizableLayout'

export default function TreatmentProtocolPage() {
  return (
    <ResizableLayout
      chatPanel={<CaseCollectorChat />}
      canvasPanel={<CanvasPanel />}
    />
  )
}
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: No errors for the (treatment-protocol) route group

---

### Task 7: Create MobileModeNav Component

**Files:**
- Create: `src/components/shared/MobileModeNav.tsx`

- [ ] **Step 1: Create MobileModeNav**

```tsx
// src/components/shared/MobileModeNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/chat', label: 'Chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { href: '/documents', label: 'Docs', icon: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z' },
  { href: '/treatment-protocol', label: 'Protocol', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { href: '/cases', label: 'Cases', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { href: '/patients', label: 'Patients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
]

export function MobileModeNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="md:hidden flex items-center justify-around bg-panel-sidebar border-t border-border h-14 flex-shrink-0 safe-area-pb">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
            isActive(tab.href) ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
          </svg>
          <span className="text-[10px]">{tab.label}</span>
        </Link>
      ))}
    </nav>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 8: Update Root Layout and ClientProviders

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/ClientProviders.tsx`

The root layout currently wraps children in `AppLayout`. With route groups, each mode has its own layout, so the root layout should just render children with providers (no AppLayout).

- [ ] **Step 1: Update ClientProviders to remove AppLayout**

```tsx
// src/components/ClientProviders.tsx
'use client'

import { AuthProvider } from './AuthProvider'
import { ErrorBoundary } from './ErrorBoundary'
import { Suspense } from 'react'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" /></div>}>
          {children}
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  )
}
```

- [ ] **Step 2: Update root layout to not import AppLayout**

The root `layout.tsx` should wrap children in `ClientProviders` but NOT in `AppLayout`. Each route group layout handles its own shell.

```tsx
// src/app/layout.tsx — update the ClientProviders usage
// Change: <ClientProviders><AppLayout>{children}</AppLayout></ClientProviders>
// To: <ClientProviders>{children}</ClientProviders>
```

Read the current file first, then make the minimal edit to remove AppLayout wrapping.

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors. The app should still work — each route group provides its own layout shell.

---

### Task 9: Update ChatInput to Use New Chat Store

**Files:**
- Modify: `src/components/ChatInput.tsx`

The current `ChatInput` imports from `@/lib/store` (the old shared store). It needs to import from `@/stores/chat-store` instead.

- [ ] **Step 1: Update imports in ChatInput**

Change:
```ts
import { useChatStore } from '@/lib/store'
```
To:
```ts
import { useChatStore } from '@/stores/chat-store'
```

Also remove any references to `activeModule`, `messagesByModule`, `streamingModule`, `setActiveModule`, `setStreamingModule` — these don't exist in the new store.

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 10: Update MessageBubble and CanvasPanel Imports

**Files:**
- Modify: `src/components/MessageBubble.tsx`
- Modify: `src/components/CanvasPanel.tsx`

- [ ] **Step 1: Check MessageBubble imports**

If MessageBubble imports from `@/lib/store`, update to use the appropriate store. MessageBubble likely doesn't import the store directly (it receives message as a prop), so this may be a no-op.

- [ ] **Step 2: Update CanvasPanel**

CanvasPanel is used by the protocol page. It should import from `@/lib/stores/protocol-store` instead of `@/lib/store`. Read the file first and update the import.

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 11: Update ResizableLayout to Accept Store-Agnostic Props

**Files:**
- Modify: `src/components/ResizableLayout.tsx`

The current `ResizableLayout` imports from `@/lib/store` to read `canvasContent` for mobile auto-switch. It needs to accept `canvasContent` as a prop instead.

- [ ] **Step 1: Update ResizableLayout props**

Change the interface and remove the store import:

```tsx
// Change interface from:
interface ResizableLayoutProps {
  chatPanel: ReactNode
  canvasPanel: ReactNode
}

// To:
interface ResizableLayoutProps {
  chatPanel: ReactNode
  canvasPanel: ReactNode
  canvasContent?: string
}
```

- [ ] **Step 2: Update the component to use the prop**

```tsx
// Change:
export function ResizableLayout({ chatPanel, canvasPanel }: ResizableLayoutProps) {
// To:
export function ResizableLayout({ chatPanel, canvasPanel, canvasContent = '' }: ResizableLayoutProps) {
```

Remove the store import and the `useChatStore` line:
```tsx
// Remove:
import { useChatStore } from '@/lib/store'
// Remove:
const canvasContent = useChatStore((state) => state.canvasContent)
```

- [ ] **Step 3: Update chat page to pass canvasContent**

```tsx
// src/app/(chat)/page.tsx — update the render:
export default function ChatPage() {
  const canvasContent = useChatStore((state) => state.canvasContent)
  return (
    <ResizableLayout
      chatPanel={<ChatView />}
      canvasPanel={<ChatCanvas />}
      canvasContent={canvasContent}
    />
  )
}
```

- [ ] **Step 4: Update protocol page to pass canvasContent**

```tsx
// src/app/(treatment-protocol)/page.tsx — update the render:
export default function TreatmentProtocolPage() {
  const canvasContent = useProtocolStore((state) => state.canvasContent)
  return (
    <ResizableLayout
      chatPanel={<CaseCollectorChat />}
      canvasPanel={<CanvasPanel />}
      canvasContent={canvasContent}
    />
  )
}
```

- [ ] **Step 5: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 12: Remove Old Route Pages

**Files:**
- Delete: `src/app/chat/page.tsx`
- Delete: `src/app/treatment-protocol/page.tsx`
- Delete: `src/app/documents/page.tsx`

These are replaced by the route group pages in `(chat)/`, `(treatment-protocol)/`, `(documents)/`.

- [ ] **Step 1: Delete old pages**

```bash
rm src/app/chat/page.tsx
rm src/app/treatment-protocol/page.tsx
rm src/app/documents/page.tsx
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 13: Remove Old Shared Components

**Files:**
- Delete: `src/components/AppLayout.tsx`
- Delete: `src/components/DesktopSidebar.tsx`
- Delete: `src/components/HeaderBar.tsx`
- Delete: `src/components/MobileNav.tsx`
- Delete: `src/components/ChatPanel.tsx`
- Delete: `src/components/PatientDocuments.tsx`
- Delete: `src/components/SpreadsheetEditor.tsx`

- [ ] **Step 1: Delete old components**

```bash
rm src/components/AppLayout.tsx
rm src/components/DesktopSidebar.tsx
rm src/components/HeaderBar.tsx
rm src/components/MobileNav.tsx
rm src/components/ChatPanel.tsx
rm src/components/PatientDocuments.tsx
rm src/components/SpreadsheetEditor.tsx
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors. If any file still imports from deleted components, fix the import.

---

### Task 14: Verify Phase 1 Complete

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build with no errors

- [ ] **Step 2: Manual smoke test**

Start dev server: `npm run dev`

Test each route:
1. `/` — should redirect to `/chat`
2. `/chat` — should show chat mode with sidebar, messages, canvas
3. `/treatment-protocol` — should show protocol mode with sidebar, wizard, canvas
4. `/documents` — should show documents mode (may be incomplete, that's OK for Phase 1)
5. `/cases` — should show case listing
6. `/patients` — should show patient listing
7. Mobile viewport — bottom nav should show 5 tabs

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: split monolithic app into three independent mode layouts

- Create route groups: (chat), (treatment-protocol), (documents)
- Extract chat store as independent Zustand store
- Create ModeSwitcher for cross-mode navigation
- Create MobileModeNav for mobile bottom nav
- Create ChatSidebar, ProtocolSidebar, ChatCanvas
- Remove shared AppLayout, DesktopSidebar, HeaderBar, MobileNav
- Each mode has its own layout, sidebar, and component tree"
```

---

## Phase 2: Documents Mode — Drive Integration

### Task 15: Install Google API Dependencies

- [ ] **Step 1: Install packages**

```bash
npm install googleapis google-auth-library
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors

---

### Task 16: Create Drive Connections Migration

**Files:**
- Create: `supabase/migrations/015_drive_connections.sql`

- [ ] **Step 1: Write migration SQL**

```sql
-- 015: Google Drive connections table
CREATE TABLE IF NOT EXISTS drive_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  scope TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expiry_date BIGINT,
  root_folder_id TEXT,
  connected_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS
ALTER TABLE drive_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own drive connection"
  ON drive_connections FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

- [ ] **Step 2: Apply migration via Supabase Dashboard**

Since Supabase CLI segfaults on Windows, apply via Dashboard SQL Editor.

---

### Task 17: Rewrite Document Store for Drive

**Files:**
- Modify: `src/lib/stores/document-store.ts`

- [ ] **Step 1: Rewrite document store**

```ts
// src/lib/stores/document-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message } from '../types'
import { DEFAULT_MODEL } from '../types'

export interface PatientFolder {
  id: string           // Drive folder ID
  name: string         // Display name (parsed from folder name)
  clinicalId: string   // Clinical ID (parsed from folder name)
  folderUrl: string    // Drive folder URL
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: number
  modifiedTime: string
  webViewLink?: string
  iconLink?: string
}

export interface Breadcrumb {
  id: string
  label: string
  type: 'root' | 'patient' | 'category' | 'file'
}

interface DocumentState {
  // Patient
  patients: PatientFolder[]
  selectedPatient: PatientFolder | null
  patientsLoading: boolean

  // Navigation
  currentFolderId: string | null
  currentCategory: string | null
  files: DriveFile[]
  breadcrumbs: Breadcrumb[]
  filesLoading: boolean

  // Editor
  editingFile: DriveFile | null
  editorMode: 'explorer' | 'spreadsheet' | 'document'

  // AI Chat
  chatMessages: Message[]
  selectedModel: string
  isStreaming: boolean

  // Drive
  driveConnected: boolean
  rootFolderId: string | null
}

interface DocumentActions {
  // Patient
  loadPatients: () => Promise<void>
  selectPatient: (patient: PatientFolder) => void
  clearPatient: () => void
  createPatientFolder: (name: string, clinicalId: string) => Promise<void>

  // Navigation
  navigateToCategory: (categoryId: string, categoryLabel: string) => Promise<void>
  navigateToFolder: (folderId: string, label: string) => Promise<void>
  navigateUp: () => void
  navigateToRoot: () => void

  // Editor
  openFile: (file: DriveFile) => void
  closeEditor: () => void

  // AI Chat
  addChatMessage: (message: Message) => void
  updateLastChatMessage: (content: string, status?: Message['status']) => void
  clearChatMessages: () => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void

  // Drive
  checkDriveConnection: () => Promise<void>
  connectDrive: () => void
  setDriveConnected: (connected: boolean) => void
  setRootFolderId: (id: string | null) => void
}

export const useDocumentStore = create<DocumentState & DocumentActions>()(
  persist(
    (set, get) => ({
      patients: [],
      selectedPatient: null,
      patientsLoading: false,
      currentFolderId: null,
      currentCategory: null,
      files: [],
      breadcrumbs: [],
      filesLoading: false,
      editingFile: null,
      editorMode: 'explorer',
      chatMessages: [],
      selectedModel: DEFAULT_MODEL,
      isStreaming: false,
      driveConnected: false,
      rootFolderId: null,

      // Patient
      loadPatients: async () => {
        set({ patientsLoading: true })
        try {
          const res = await fetch('/api/drive/patients')
          if (!res.ok) throw new Error('Failed to load patients')
          const data = await res.json()
          set({ patients: data.patients || [], patientsLoading: false })
        } catch {
          set({ patientsLoading: false })
        }
      },

      selectPatient: (patient) => set({
        selectedPatient: patient,
        currentFolderId: patient.id,
        currentCategory: null,
        files: [],
        editingFile: null,
        editorMode: 'explorer',
        breadcrumbs: [
          { id: 'root', label: 'Patients', type: 'root' },
          { id: patient.id, label: `${patient.name} (${patient.clinicalId})`, type: 'patient' },
        ],
      }),

      clearPatient: () => set({
        selectedPatient: null,
        currentFolderId: null,
        currentCategory: null,
        files: [],
        breadcrumbs: [],
        editingFile: null,
        editorMode: 'explorer',
      }),

      createPatientFolder: async (name, clinicalId) => {
        const res = await fetch('/api/drive/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, clinicalId }),
        })
        if (!res.ok) throw new Error('Failed to create patient folder')
        const data = await res.json()
        const newPatient: PatientFolder = {
          id: data.folderId,
          name,
          clinicalId,
          folderUrl: data.folderUrl,
        }
        set((state) => ({ patients: [...state.patients, newPatient] }))
      },

      // Navigation
      navigateToCategory: async (categoryId, categoryLabel) => {
        const state = get()
        if (!state.selectedPatient) return
        set({ filesLoading: true, editorMode: 'explorer', editingFile: null })
        try {
          const res = await fetch(`/api/drive/files?folderId=${categoryId}`)
          if (!res.ok) throw new Error('Failed to load files')
          const data = await res.json()
          set({
            currentFolderId: categoryId,
            currentCategory: categoryLabel,
            files: data.files || [],
            filesLoading: false,
            breadcrumbs: [
              ...state.breadcrumbs,
              { id: categoryId, label: categoryLabel, type: 'category' },
            ],
          })
        } catch {
          set({ filesLoading: false })
        }
      },

      navigateToFolder: async (folderId, label) => {
        const state = get()
        set({ filesLoading: true, editorMode: 'explorer', editingFile: null })
        try {
          const res = await fetch(`/api/drive/files?folderId=${folderId}`)
          if (!res.ok) throw new Error('Failed to load files')
          const data = await res.json()
          set({
            currentFolderId: folderId,
            files: data.files || [],
            filesLoading: false,
            breadcrumbs: [
              ...state.breadcrumbs,
              { id: folderId, label, type: 'file' },
            ],
          })
        } catch {
          set({ filesLoading: false })
        }
      },

      navigateUp: () => {
        const state = get()
        const crumbs = [...state.breadcrumbs]
        crumbs.pop()
        const parent = crumbs[crumbs.length - 1]
        if (!parent) return
        if (parent.type === 'patient') {
          set({
            breadcrumbs: crumbs,
            currentFolderId: parent.id,
            currentCategory: null,
            files: [],
            editingFile: null,
            editorMode: 'explorer',
          })
        } else {
          // Re-fetch parent folder
          set({ breadcrumbs: crumbs })
          get().navigateToFolder(parent.id, parent.label)
        }
      },

      navigateToRoot: () => set({
        selectedPatient: null,
        currentFolderId: null,
        currentCategory: null,
        files: [],
        breadcrumbs: [],
        editingFile: null,
        editorMode: 'explorer',
      }),

      // Editor
      openFile: (file) => {
        const isSheet = file.mimeType.includes('spreadsheet') || file.name.endsWith('.xlsx')
        set({
          editingFile: file,
          editorMode: isSheet ? 'spreadsheet' : 'document',
        })
      },

      closeEditor: () => set({ editingFile: null, editorMode: 'explorer' }),

      // AI Chat
      addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),
      updateLastChatMessage: (content, status) =>
        set((state) => {
          const messages = [...state.chatMessages]
          const last = messages[messages.length - 1]
          if (last) {
            messages[messages.length - 1] = { ...last, content, status: status ?? last.status }
          }
          return { chatMessages: messages }
        }),
      clearChatMessages: () => set({ chatMessages: [], isStreaming: false }),
      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setModel: (model) => set({ selectedModel: model }),

      // Drive
      checkDriveConnection: async () => {
        try {
          const res = await fetch('/api/drive/folders')
          if (res.ok) {
            const data = await res.json()
            set({ driveConnected: true, rootFolderId: data.rootFolderId })
          }
        } catch {
          set({ driveConnected: false })
        }
      },

      connectDrive: () => {
        window.location.href = '/api/drive/auth'
      },

      setDriveConnected: (connected) => set({ driveConnected: connected }),
      setRootFolderId: (id) => set({ rootFolderId: id }),
    }),
    {
      name: 'clinical-ai-documents-v2',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
        }
        return localStorage
      }),
      partialize: (state) => ({
        selectedModel: state.selectedModel,
        driveConnected: state.driveConnected,
        rootFolderId: state.rootFolderId,
      }),
      version: 1,
    }
  )
)
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 18: Create Documents Mode Layout and Page

**Files:**
- Create: `src/app/(documents)/layout.tsx`
- Create: `src/app/(documents)/page.tsx`
- Create: `src/components/documents/DocumentLayout.tsx`

- [ ] **Step 1: Create DocumentLayout (3-panel)**

```tsx
// src/components/documents/DocumentLayout.tsx
'use client'

import { PatientSidebar } from './PatientSidebar'
import { DocumentExplorer } from './DocumentExplorer'
import { AIDocumentChat } from './AIDocumentChat'
import { EmbeddedEditor } from './EmbeddedEditor'
import { useDocumentStore } from '@/lib/stores/document-store'
import { useState } from 'react'

export function DocumentLayout() {
  const editorMode = useDocumentStore((s) => s.editorMode)
  const editingFile = useDocumentStore((s) => s.editingFile)
  const [showAIChat, setShowAIChat] = useState(true)

  return (
    <div className="flex flex-1 min-h-0 h-full">
      {/* Left: Patient Sidebar */}
      <PatientSidebar />

      {/* Center: Explorer or Editor */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 border-r border-border">
        {editorMode !== 'explorer' && editingFile ? (
          <EmbeddedEditor file={editingFile} />
        ) : (
          <DocumentExplorer />
        )}
      </div>

      {/* Right: AI Chat Sidebar */}
      {showAIChat && <AIDocumentChat />}

      {/* Toggle AI Chat button */}
      <button
        onClick={() => setShowAIChat(!showAIChat)}
        className="absolute right-2 top-2 z-10 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-muted-foreground"
        aria-label={showAIChat ? 'Hide AI Chat' : 'Show AI Chat'}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Create documents layout**

```tsx
// src/app/(documents)/layout.tsx
'use client'

import { ModeSwitcher } from '@/components/shared/ModeSwitcher'
import { MobileModeNav } from '@/components/shared/MobileModeNav'
import { ToastContainer } from '@/components/Toast'

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {children}
        </main>
        <MobileModeNav />
      </div>
      <ToastContainer />
    </div>
  )
}
```

- [ ] **Step 3: Create documents page**

```tsx
// src/app/(documents)/page.tsx
'use client'

import { DocumentLayout } from '@/components/documents/DocumentLayout'

export default function DocumentsPage() {
  return <DocumentLayout />
}
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 19: Create PatientSidebar Component

**Files:**
- Create: `src/components/documents/PatientSidebar.tsx`

- [ ] **Step 1: Create PatientSidebar**

```tsx
// src/components/documents/PatientSidebar.tsx
'use client'

import { useDocumentStore } from '@/lib/stores/document-store'
import { useEffect, useState } from 'react'

export function PatientSidebar() {
  const patients = useDocumentStore((s) => s.patients)
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const patientsLoading = useDocumentStore((s) => s.patientsLoading)
  const driveConnected = useDocumentStore((s) => s.driveConnected)
  const loadPatients = useDocumentStore((s) => s.loadPatients)
  const selectPatient = useDocumentStore((s) => s.selectPatient)
  const connectDrive = useDocumentStore((s) => s.connectDrive)
  const checkDriveConnection = useDocumentStore((s) => s.checkDriveConnection)
  const createPatientFolder = useDocumentStore((s) => s.createPatientFolder)
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newId, setNewId] = useState('')

  useEffect(() => {
    checkDriveConnection()
  }, [checkDriveConnection])

  useEffect(() => {
    if (driveConnected) loadPatients()
  }, [driveConnected, loadPatients])

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.clinicalId.toLowerCase().includes(search.toLowerCase())
  )

  if (!driveConnected) {
    return (
      <div className="w-[200px] flex flex-col items-center justify-center p-4 border-r border-border bg-panel-sidebar">
        <svg className="w-8 h-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
        <p className="text-xs text-muted-foreground text-center mb-3">Connect Google Drive to manage patient documents</p>
        <button
          onClick={connectDrive}
          className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Connect Drive
        </button>
      </div>
    )
  }

  return (
    <div className="w-[200px] flex flex-col border-r border-border bg-panel-sidebar flex-shrink-0">
      {/* Header */}
      <div className="px-3 py-3 border-b border-border">
        <div className="text-xs font-semibold text-foreground mb-2">Patients</div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-2 py-1 text-xs bg-muted rounded border border-border outline-none focus:border-primary/50"
        />
      </div>

      {/* Patient list */}
      <div className="flex-1 overflow-y-auto py-1">
        {patientsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-3 py-4 text-xs text-muted-foreground text-center">
            {search ? 'No patients found' : 'No patients yet'}
          </div>
        ) : (
          filtered.map((patient) => (
            <button
              key={patient.id}
              onClick={() => selectPatient(patient)}
              className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                selectedPatient?.id === patient.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="font-medium truncate">{patient.name}</div>
              <div className="text-[10px] text-muted-foreground">{patient.clinicalId}</div>
            </button>
          ))
        )}
      </div>

      {/* Create patient */}
      <div className="px-3 py-2 border-t border-border">
        {showCreate ? (
          <div className="space-y-2">
            <input
              placeholder="Patient Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-2 py-1 text-xs bg-muted rounded border border-border outline-none focus:border-primary/50"
            />
            <input
              placeholder="Clinical ID (e.g. AAH230)"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="w-full px-2 py-1 text-xs bg-muted rounded border border-border outline-none focus:border-primary/50"
            />
            <div className="flex gap-1">
              <button
                onClick={async () => {
                  if (newName.trim() && newId.trim()) {
                    await createPatientFolder(newName.trim(), newId.trim())
                    setNewName('')
                    setNewId('')
                    setShowCreate(false)
                  }
                }}
                className="flex-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="px-2 py-1 text-xs bg-muted rounded hover:bg-muted/80"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCreate(true)}
            className="w-full px-2 py-1.5 text-xs text-primary hover:bg-primary/5 rounded transition-colors"
          >
            + New Patient
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 20: Create DocumentExplorer Component

**Files:**
- Create: `src/components/documents/DocumentExplorer.tsx`
- Create: `src/components/documents/BreadcrumbNav.tsx`

- [ ] **Step 1: Create BreadcrumbNav**

```tsx
// src/components/documents/BreadcrumbNav.tsx
'use client'

import { useDocumentStore, type Breadcrumb } from '@/lib/stores/document-store'

export function BreadcrumbNav() {
  const breadcrumbs = useDocumentStore((s) => s.breadcrumbs)
  const navigateToRoot = useDocumentStore((s) => s.navigateToRoot)
  const navigateUp = useDocumentStore((s) => s.navigateUp)

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
```

- [ ] **Step 2: Create DocumentExplorer**

```tsx
// src/components/documents/DocumentExplorer.tsx
'use client'

import { useDocumentStore } from '@/lib/stores/document-store'
import { BreadcrumbNav } from './BreadcrumbNav'

const CATEGORY_ICONS: Record<string, string> = {
  'OPD Registers': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'Therapy Registers': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'IPD Registers': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'Procedure Registers': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  'Consultation Notes': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'Invoices': 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
}

const DEFAULT_ICON = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'

export function DocumentExplorer() {
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const files = useDocumentStore((s) => s.files)
  const filesLoading = useDocumentStore((s) => s.filesLoading)
  const navigateToCategory = useDocumentStore((s) => s.navigateToCategory)
  const openFile = useDocumentStore((s) => s.openFile)

  if (!selectedPatient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center px-4">
        <svg className="w-12 h-12 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
        <p className="text-sm text-muted-foreground">Select a patient to view documents</p>
      </div>
    )
  }

  // Category grid view
  if (!currentCategory) {
    const categories = [
      { id: '01-OPD-Registers', label: 'OPD Registers', count: 0 },
      { id: '02-Therapy-Registers', label: 'Therapy Registers', count: 0 },
      { id: '03-IPD-Registers', label: 'IPD Registers', count: 0 },
      { id: '04-Procedure-Registers', label: 'Procedure Registers', count: 0 },
      { id: '05-Consultation-Notes', label: 'Consultation Notes', count: 0 },
      { id: '06-Invoices', label: 'Invoices', count: 0 },
      { id: '07-Insurance', label: 'Insurance', count: 0 },
      { id: '08-Admission-Notes', label: 'Admission Notes', count: 0 },
      { id: '09-Treatment-Plans', label: 'Treatment Plans', count: 0 },
      { id: '10-Rounds-Notes', label: 'Rounds Notes', count: 0 },
      { id: '11-Nursing-Medicine', label: 'Nursing Medicine', count: 0 },
      { id: '12-Nursing-Panchakarma', label: 'Nursing PK', count: 0 },
      { id: '13-Discharge-Plans', label: 'Discharge Plans', count: 0 },
      { id: '14-Discharge-Summaries', label: 'Discharge Summaries', count: 0 },
      { id: '15-Certificates', label: 'Certificates', count: 0 },
      { id: '16-Receipts', label: 'Receipts', count: 0 },
      { id: '17-Authorization', label: 'Authorization', count: 0 },
      { id: '18-Garbha-Sanskar', label: 'Garbha Sanskar', count: 0 },
      { id: '19-Lab-Reports', label: 'Lab Reports', count: 0 },
      { id: '20-Prescriptions', label: 'Prescriptions', count: 0 },
    ]

    return (
      <div className="flex flex-col min-h-0 h-full">
        <BreadcrumbNav />
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateToCategory(cat.id, cat.label)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted border border-border hover:border-primary/30 transition-all"
              >
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={CATEGORY_ICONS[cat.label] || DEFAULT_ICON} />
                </svg>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // File list view
  return (
    <div className="flex flex-col min-h-0 h-full">
      <BreadcrumbNav />
      <div className="flex-1 overflow-y-auto">
        {filesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <svg className="w-10 h-10 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-muted-foreground">No files in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => openFile(file)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors text-left"
              >
                <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground truncate">{file.name}</div>
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {file.size ? `${Math.round(file.size / 1024)} KB` : ''}
                </div>
                <div className="text-[10px] text-muted-foreground flex-shrink-0">
                  {new Date(file.modifiedTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 21: Create EmbeddedEditor Component

**Files:**
- Create: `src/components/documents/EmbeddedEditor.tsx`

- [ ] **Step 1: Create EmbeddedEditor**

```tsx
// src/components/documents/EmbeddedEditor.tsx
'use client'

import { useDocumentStore, type DriveFile } from '@/lib/stores/document-store'

interface EmbeddedEditorProps {
  file: DriveFile
}

export function EmbeddedEditor({ file }: EmbeddedEditorProps) {
  const closeEditor = useDocumentStore((s) => s.closeEditor)

  // Google embed URLs
  const embedUrl = file.mimeType.includes('spreadsheet')
    ? `https://docs.google.com/spreadsheets/d/${file.id}/edit?usp=sharing`
    : file.mimeType.includes('document')
    ? `https://docs.google.com/document/d/${file.id}/edit?usp=sharing`
    : file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`

  return (
    <div className="flex flex-col min-h-0 h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30 flex-shrink-0">
        <button
          onClick={closeEditor}
          className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Close editor"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
        <a
          href={file.webViewLink || embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-primary hover:underline"
        >
          Open in Drive
        </a>
      </div>

      {/* iframe */}
      <iframe
        src={embedUrl}
        className="flex-1 w-full border-0"
        title={file.name}
        allow="autoplay"
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 22: Create AIDocumentChat Component

**Files:**
- Create: `src/components/documents/AIDocumentChat.tsx`

- [ ] **Step 1: Create AIDocumentChat**

```tsx
// src/components/documents/AIDocumentChat.tsx
'use client'

import { useDocumentStore } from '@/lib/stores/document-store'
import { useRef, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function AIDocumentChat() {
  const chatMessages = useDocumentStore((s) => s.chatMessages)
  const isStreaming = useDocumentStore((s) => s.isStreaming)
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const addChatMessage = useDocumentStore((s) => s.addChatMessage)
  const updateLastChatMessage = useDocumentStore((s) => s.updateLastChatMessage)
  const setStreaming = useDocumentStore((s) => s.setStreaming)
  const loadPatients = useDocumentStore((s) => s.loadPatients)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return

    const userMsg = input.trim()
    setInput('')

    addChatMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: userMsg,
      timestamp: Date.now(),
      status: 'complete',
    })

    addChatMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      status: 'streaming',
    })

    setStreaming(true)

    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          patientId: selectedPatient?.id,
          patientName: selectedPatient?.name,
          clinicalId: selectedPatient?.clinicalId,
        }),
      })

      if (!res.ok) throw new Error('Failed to generate document')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No reader')

      let accumulated = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        updateLastChatMessage(accumulated, 'streaming')
      }

      updateLastChatMessage(accumulated, 'complete')
      // Refresh patient list in case new files were created
      loadPatients()
    } catch (err) {
      updateLastChatMessage(
        `Error: ${err instanceof Error ? err.message : 'Failed to generate document'}`,
        'error'
      )
    } finally {
      setStreaming(false)
    }
  }

  return (
    <div className="w-[320px] flex flex-col border-l border-border bg-panel-chat flex-shrink-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="text-sm font-semibold text-foreground">AI Document Assistant</div>
        {selectedPatient && (
          <div className="text-[10px] text-muted-foreground">
            {selectedPatient.name} ({selectedPatient.clinicalId})
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-xs text-muted-foreground text-center py-4">
            {selectedPatient
              ? 'Ask me to generate documents. E.g., "Create a discharge summary"'
              : 'Select a patient first, then ask me to generate documents.'}
          </div>
        )}
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`text-xs ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block max-w-[90%] px-3 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.role === 'assistant' ? (
                <div className="prose prose-xs dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={selectedPatient ? 'Ask AI to generate...' : 'Select patient first'}
            disabled={!selectedPatient || isStreaming}
            className="flex-1 px-3 py-1.5 text-xs bg-muted rounded-lg border border-border outline-none focus:border-primary/50 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!selectedPatient || isStreaming || !input.trim()}
            className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 23: Create Drive Embed API Route

**Files:**
- Create: `src/app/api/drive/embed/route.ts`

- [ ] **Step 1: Create embed endpoint**

```ts
// src/app/api/drive/embed/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getDriveClients } from '@/lib/google-drive/client'

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get('fileId')
  if (!fileId) {
    return NextResponse.json({ error: 'fileId required' }, { status: 400 })
  }

  try {
    const { drive } = await getDriveClients('service')

    // Get file metadata
    const file = await drive.files.get({
      fileId,
      fields: 'mimeType, name, webViewLink',
    })

    // Build embed URL based on mimeType
    const mimeType = file.data.mimeType || ''
    let embedUrl: string

    if (mimeType.includes('spreadsheet')) {
      embedUrl = `https://docs.google.com/spreadsheets/d/${fileId}/edit?usp=sharing`
    } else if (mimeType.includes('document')) {
      embedUrl = `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`
    } else {
      embedUrl = file.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`
    }

    return NextResponse.json({
      embedUrl,
      webViewLink: file.data.webViewLink,
      mimeType,
      name: file.data.name,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to get embed URL', details: String(err) },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 24: Verify Phase 2 Complete

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build

- [ ] **Step 2: Manual smoke test**

Start dev server: `npm run dev`

Test documents mode:
1. Navigate to `/documents`
2. If not connected, click "Connect Drive" — should redirect to Google OAuth
3. After connecting, patient list should load
4. Click a patient — category grid should appear
5. Click a category — file list should appear
6. Click a file — embedded editor should open
7. Type in AI chat sidebar — should send to generation API

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: documents mode with Google Drive integration

- Rewrite document store for Drive-based architecture
- Create PatientSidebar with Drive patient list
- Create DocumentExplorer with category grid and file list
- Create EmbeddedEditor with Google Sheets/Docs iframe
- Create AIDocumentChat sidebar for template generation
- Create BreadcrumbNav for navigation
- Create drive_connections migration
- Add drive/embed API route"
```

---

## Phase 3: Documents Mode — AI Generation

### Task 25: Wire AI Chat to Template System

The AI chat sidebar needs to send the patient context and template info to the LLM, then call the generation API with structured data.

**Files:**
- Modify: `src/components/documents/AIDocumentChat.tsx`
- Modify: `src/app/api/documents/generate/route.ts`

- [ ] **Step 1: Update AIDocumentChat to include template context**

Update the `handleSend` function to include template definitions in the prompt:

```ts
// In handleSend, before the fetch call, build a context-aware prompt:
const templateContext = selectedPatient
  ? `\n\nPatient: ${selectedPatient.name} (${selectedPatient.clinicalId})\nFolder ID: ${selectedPatient.id}`
  : ''

const fullPrompt = `You are a document generation assistant for an Ayurvedic clinic. You can create clinical documents from templates.

Available templates:
1. OPD Visit Register — daily patient visits
2. OPD Therapy Register — therapy sessions
3. IPD Visit Register — in-patient admissions
4. Procedure Register — Panchakarma procedures
5. Consultation Note — OPD consultation with Ashtavidha/Dashavidha Pariksha
6. Invoice — billing with line items
7. Receipt — payment receipts
8. IRDAI Pre-Auth — insurance authorization
9. Authorization Status — claim tracking
10. IPD Admission Note — admission details
11. IPD Treatment Plan — Poorvakarma/Pradhana/Paschat Karma
12. IPD Rounds Note — consultant rounds
13. Nursing Medicine Chart — medication schedule
14. Nursing Panchakarma Chart — procedure schedule
15. Discharge Plan — discharge planning
16. Discharge Summary — full discharge summary
17. Medical Certificate — fitness/leave certificates
18. Garbha Sanskar Certificate — prenatal program
19. Lab Report — investigation results
20. Prescription — medications with dose/frequency
${templateContext}

User request: ${userMsg}

If the user asks to create a document, respond with a JSON block containing the template ID and data fields. Otherwise, answer their question about documents.`
```

- [ ] **Step 2: Update generate route to handle template creation**

Read the existing `src/app/api/documents/generate/route.ts` and update it to:
1. Parse the template ID from the AI response
2. Use the template definition to create a Google Sheet/Doc
3. Place it in the correct patient subfolder

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 26: Verify Phase 3 Complete

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build

- [ ] **Step 2: Manual smoke test**

1. Navigate to `/documents`
2. Select a patient
3. In AI chat, type "Create a discharge summary"
4. AI should respond with template data
5. Document should be created in Drive
6. File should appear in the explorer

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: wire AI document chat to template generation system"
```

---

## Phase 4: Chat Mode Polish

### Task 27: Enhance Chat Canvas Markdown Rendering

**Files:**
- Modify: `src/components/chat/ChatCanvas.tsx`

- [ ] **Step 1: Add enhanced markdown styles**

Add Tailwind prose classes for better table borders, code block styling, and list formatting:

```tsx
// In ChatCanvas.tsx, update the prose container:
<div className="prose prose-sm dark:prose-invert max-w-none
  prose-table:border-collapse prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:bg-muted/50
  prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg
  prose-li:marker:text-primary">
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 28: Verify Phase 4 Complete

- [ ] **Step 1: Commit**

```bash
git add -A
git commit -m "polish: enhance chat canvas markdown rendering"
```

---

## Phase 5: Protocol Mode Polish

### Task 29: Polish ProtocolRenderer

**Files:**
- Modify: `src/components/ProtocolRenderer.tsx`

- [ ] **Step 1: Update section color palette**

Read the current ProtocolRenderer and update the section color mapping for better visual distinction.

- [ ] **Step 2: Add smooth TOC navigation**

Add `scrollIntoView({ behavior: 'smooth' })` when clicking TOC items.

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 30: Verify Phase 5 Complete

- [ ] **Step 1: Commit**

```bash
git add -A
git commit -m "polish: improve protocol renderer colors and TOC navigation"
```

---

## Phase 6: Cleanup

### Task 31: Remove Old Shared Store

**Files:**
- Delete: `src/lib/store.ts`
- Delete: `src/lib/stores/chat-store.ts` (the old standalone duplicate)

- [ ] **Step 1: Check for remaining imports**

Search for any files still importing from `@/lib/store`:
```bash
grep -r "from '@/lib/store'" src/
```

Fix any remaining imports to use the new store paths.

- [ ] **Step 2: Delete old store files**

```bash
rm src/lib/store.ts
rm src/lib/stores/chat-store.ts
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 32: Remove Supabase Storage Document Code

**Files:**
- Delete: `src/app/api/patient-documents/` (old Supabase Storage routes)
- Modify: Remove any Supabase Storage references from remaining components

- [ ] **Step 1: Check for Supabase Storage imports**

```bash
grep -r "supabase.*storage" src/ --include="*.ts" --include="*.tsx"
```

- [ ] **Step 2: Remove old patient-documents API routes**

```bash
rm -rf src/app/api/patient-documents/
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: No errors

---

### Task 33: Final Verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build with no errors or warnings

- [ ] **Step 2: Full smoke test**

Test all routes:
1. `/` — redirects to `/chat`
2. `/chat` — chat with sessions, canvas, model selector
3. `/treatment-protocol` — wizard with patient sessions, protocol output
4. `/documents` — Drive-based patient sidebar, category grid, file list, embedded editor, AI chat
5. `/cases` — case listing
6. `/patients` — patient listing
7. Mobile — bottom nav with 5 tabs

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "cleanup: remove old shared store, Supabase Storage doc code, finalize three-mode architecture"
```

---

## Summary

| Phase | Tasks | Description |
|---|---|---|
| 1 | 1-14 | Architecture restructuring (routes, stores, layouts, components) |
| 2 | 15-24 | Documents mode — Drive integration |
| 3 | 25-26 | Documents mode — AI generation |
| 4 | 27-28 | Chat mode polish |
| 5 | 29-30 | Protocol mode polish |
| 6 | 31-33 | Cleanup and final verification |
