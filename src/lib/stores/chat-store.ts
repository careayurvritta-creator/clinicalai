'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, ChatSession } from '../types'
import { DEFAULT_MODEL, MODELS } from '../types'

const MAX_MESSAGES = 200
const MAX_TITLE_LENGTH = 40

interface ChatStoreState {
  messages: Message[]
  selectedModel: string
  canvasContent: string
  canvasTimestamp: number
  isStreaming: boolean
  activeSessionId: string | null
  sessions: Record<string, ChatSession>
  chatInputDraft: string
}

interface ChatStoreActions {
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

export const useChatStore = create<ChatStoreState & ChatStoreActions>()(
  persist(
    (set, get) => ({
      messages: [],
      selectedModel: DEFAULT_MODEL,
      canvasContent: '',
      canvasTimestamp: 0,
      isStreaming: false,
      activeSessionId: null,
      sessions: {},
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
                updatedSessions[sid].title === 'New Chat' &&
                message.role === 'user'
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
      setChatInputDraft: (draft) => set({ chatInputDraft: draft }),

      clearMessages: () =>
        set({ messages: [], canvasContent: '', canvasTimestamp: 0, isStreaming: false }),

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
            const remaining = Object.values(updatedSessions)
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

      getSessions: () => {
        return Object.values(get().sessions).sort((a, b) => b.updatedAt - a.updatedAt)
      },
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => localStorage),
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
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState
        }
        if (version < 1) {
          const state = persistedState as Record<string, unknown>
          if (state?.messages) {
            const messages = state.messages as Array<{ status?: string }>
            state.messages = messages.filter((m) => m.status !== 'streaming')
          }
          if (state?.selectedModel) {
            const validIds = MODELS.map((m) => m.id)
            if (!validIds.includes(state.selectedModel as string)) {
              state.selectedModel = DEFAULT_MODEL
            }
          }
        }
        return persistedState
      },
    }
  )
)
