import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, ChatSession, Message } from './types'
import { DEFAULT_MODEL, MODELS } from './types'

const MAX_MESSAGES = 200
const MAX_TITLE_LENGTH = 40

const defaultState: Omit<ChatState, 'isStreaming'> = {
  messages: [],
  messagesByModule: {},
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
  canvasTimestamp: 0,
  activeModule: 'chat',
  streamingModule: null,
  activeSessionId: null,
  sessions: {},
  chatInputDraft: '',
}

interface ChatActions {
  addMessage: (message: Message) => void
  updateLastMessage: (content: string, status?: Message['status']) => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  clearMessages: () => void
  setActiveModule: (module: string) => void
  setChatInputDraft: (draft: string) => void
  setStreamingModule: (module: string | null) => void
  createSession: (module?: string) => string
  switchSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  renameSession: (sessionId: string, title: string) => void
  getSessionsForModule: (module: string) => ChatSession[]
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
      ...defaultState,
      isStreaming: false,
      streamingModule: null,
      activeModule: 'chat',

      addMessage: (message) =>
        set((state) => {
          const newMessages = trimMessages([...state.messages, message])
          const updatedSessions = { ...state.sessions }
          const sid = state.activeSessionId

          // Update active session
          if (sid && updatedSessions[sid]) {
            updatedSessions[sid] = {
              ...updatedSessions[sid],
              messages: newMessages,
              updatedAt: Date.now(),
              // Auto-title from first user message
              title:
                updatedSessions[sid].title === 'New Chat' &&
                message.role === 'user'
                  ? generateTitle(message.content)
                  : updatedSessions[sid].title,
            }
          }

          return {
            messages: newMessages,
            messagesByModule: {
              ...state.messagesByModule,
              [state.activeModule]: newMessages,
            },
            sessions: updatedSessions,
          }
        }),

      updateLastMessage: (content, status) =>
        set((state) => {
          const targetModule = state.streamingModule ?? state.activeModule
          const messages = [...state.messages]
          const last = messages[messages.length - 1]
          if (last) {
            messages[messages.length - 1] = {
              ...last,
              content,
              status: status ?? last.status,
            }
          }
          const updatedSessions = { ...state.sessions }
          const sid = state.activeSessionId
          if (sid && updatedSessions[sid]) {
            updatedSessions[sid] = {
              ...updatedSessions[sid],
              messages,
              updatedAt: Date.now(),
            }
          }
          return {
            messages,
            messagesByModule: {
              ...state.messagesByModule,
              [targetModule]: messages,
            },
            sessions: updatedSessions,
          }
        }),

      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setStreamingModule: (module) => set({ streamingModule: module }),
      setModel: (model) => set({ selectedModel: model }),
      setCanvasContent: (content) => set({ canvasContent: content, canvasTimestamp: Date.now() }),

      clearMessages: () =>
        set((state) => ({
          messages: [],
          messagesByModule: {
            ...state.messagesByModule,
            [state.activeModule]: [],
          },
          canvasContent: '',
          canvasTimestamp: 0,
          isStreaming: false,
        })),

      setActiveModule: (module) =>
        set((state) => {
          const updatedByModule = { ...state.messagesByModule }
          updatedByModule[state.activeModule] = state.messages

          // Find most recent session for the target module, or null
          const moduleSessions = Object.values(state.sessions)
            .filter((s) => s.module === module)
            .sort((a, b) => b.updatedAt - a.updatedAt)
          const latestSession = moduleSessions[0] ?? null

          return {
            activeModule: module,
            messagesByModule: updatedByModule,
            messages: latestSession?.messages ?? updatedByModule[module] ?? [],
            activeSessionId: latestSession?.id ?? null,
            canvasContent: '',
            canvasTimestamp: 0,
          }
        }),

      setChatInputDraft: (draft) => set({ chatInputDraft: draft }),

      // ─── Session management ────────────────────────────────

      createSession: (module) => {
        const id = crypto.randomUUID()
        const now = Date.now()
        const mod = module ?? get().activeModule
        const session: ChatSession = {
          id,
          title: 'New Chat',
          module: mod,
          messages: [],
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          sessions: { ...state.sessions, [id]: session },
          activeSessionId: id,
          messages: [],
          messagesByModule: {
            ...state.messagesByModule,
            [state.activeModule]: state.messages,
          },
          canvasContent: '',
          canvasTimestamp: 0,
        }))
        return id
      },

      switchSession: (sessionId) =>
        set((state) => {
          const session = state.sessions[sessionId]
          if (!session) return state

          // Save current messages to current session
          const updatedSessions = { ...state.sessions }
          const currentSid = state.activeSessionId
          if (currentSid && updatedSessions[currentSid]) {
            updatedSessions[currentSid] = {
              ...updatedSessions[currentSid],
              messages: state.messages,
            }
          }

          return {
            sessions: updatedSessions,
            activeSessionId: sessionId,
            activeModule: session.module,
            messages: session.messages,
            canvasContent: '',
            canvasTimestamp: 0,
          }
        }),

      deleteSession: (sessionId) =>
        set((state) => {
          const updatedSessions = { ...state.sessions }
          delete updatedSessions[sessionId]

          // If deleting active session, switch to latest or create new
          if (state.activeSessionId === sessionId) {
            const remaining = Object.values(updatedSessions)
              .filter((s) => s.module === state.activeModule)
              .sort((a, b) => b.updatedAt - a.updatedAt)
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

      getSessionsForModule: (module) => {
        return Object.values(get().sessions)
          .filter((s) => s.module === module)
          .sort((a, b) => b.updatedAt - a.updatedAt)
      },
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),
      partialize: (state) => ({
        messages: state.messages,
        messagesByModule: state.messagesByModule,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
        canvasTimestamp: state.canvasTimestamp,
        activeModule: state.activeModule,
        activeSessionId: state.activeSessionId,
        sessions: state.sessions,
        // chatInputDraft excluded — ephemeral
      }),
      version: 7,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return defaultState
        }
        const state = persistedState as Record<string, unknown>
        // Clean up stale streaming messages on migration
        if (version < 4 && state?.messages) {
          const messages = state.messages as Array<{ status?: string }>
          state.messages = messages.filter((m) => m.status !== 'streaming')
          if (state.messagesByModule) {
            const byModule = state.messagesByModule as Record<string, Array<{ status?: string }>>
            for (const key of Object.keys(byModule)) {
              byModule[key] = byModule[key].filter((m) => m.status !== 'streaming')
            }
          }
        }
        // Reset selectedModel if it's not in the current MODELS list
        if (version < 5 && state?.selectedModel) {
          const validIds = MODELS.map((m) => m.id)
          if (!validIds.includes(state.selectedModel as string)) {
            state.selectedModel = DEFAULT_MODEL
          }
        }
        // Add canvasTimestamp if missing
        if (version < 6 && state && !('canvasTimestamp' in state)) {
          state.canvasTimestamp = 0
        }
        // Add sessions map if missing (v6 -> v7)
        if (version < 7 && state && !('sessions' in state)) {
          state.sessions = {}
        }
        return persistedState
      },
    }
  )
)
