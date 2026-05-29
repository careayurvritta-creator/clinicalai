'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message } from '../types'
import { DEFAULT_MODEL, MODELS } from '../types'

interface ProtocolSession {
  id: string
  title: string // Patient name or case title
  patientName: string
  caseId?: string
  messages: Message[]
  caseData: Record<string, unknown>
  protocolContent: string
  createdAt: number
  updatedAt: number
}

interface ProtocolStoreState {
  messages: Message[]
  selectedModel: string
  canvasContent: string
  canvasTimestamp: number
  isStreaming: boolean
  chatInputDraft: string
  activeSessionId: string | null
  sessions: Record<string, ProtocolSession>
  caseData: Record<string, unknown>
}

interface ProtocolStoreActions {
  addMessage: (message: Message) => void
  updateLastMessage: (content: string, status?: Message['status']) => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  clearMessages: () => void
  setChatInputDraft: (draft: string) => void
  setCaseData: (data: Record<string, unknown>) => void
  createSession: (patientName: string) => string
  switchSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  renameSession: (sessionId: string, title: string) => void
  getSessions: () => ProtocolSession[]
}

export const useProtocolStore = create<ProtocolStoreState & ProtocolStoreActions>()(
  persist(
    (set, get) => ({
      messages: [],
      selectedModel: DEFAULT_MODEL,
      canvasContent: '',
      canvasTimestamp: 0,
      isStreaming: false,
      chatInputDraft: '',
      activeSessionId: null,
      sessions: {},
      caseData: {},

      addMessage: (message) =>
        set((state) => {
          const newMessages = [...state.messages, message]
          const updatedSessions = { ...state.sessions }
          const sid = state.activeSessionId
          if (sid && updatedSessions[sid]) {
            updatedSessions[sid] = {
              ...updatedSessions[sid],
              messages: newMessages,
              updatedAt: Date.now(),
              title: updatedSessions[sid].patientName || updatedSessions[sid].title,
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
      setCaseData: (data) => set({ caseData: data }),

      clearMessages: () =>
        set({ messages: [], canvasContent: '', canvasTimestamp: 0, isStreaming: false }),
      setChatInputDraft: (draft) => set({ chatInputDraft: draft }),

      createSession: (patientName: string) => {
        const id = crypto.randomUUID()
        const now = Date.now()
        const session: ProtocolSession = {
          id,
          title: patientName || 'New Protocol',
          patientName,
          messages: [],
          caseData: {},
          protocolContent: '',
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({
          sessions: { ...state.sessions, [id]: session },
          activeSessionId: id,
          messages: [],
          canvasContent: '',
          canvasTimestamp: 0,
          caseData: {},
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
            updatedSessions[currentSid] = {
              ...updatedSessions[currentSid],
              messages: state.messages,
              protocolContent: state.canvasContent,
            }
          }
          return {
            sessions: updatedSessions,
            activeSessionId: sessionId,
            messages: session.messages,
            caseData: session.caseData,
            canvasContent: session.protocolContent || '',
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
              caseData: next?.caseData ?? {},
              canvasContent: next?.protocolContent ?? '',
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
      name: 'clinical-ai-protocol',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
        canvasTimestamp: state.canvasTimestamp,
        activeSessionId: state.activeSessionId,
        sessions: state.sessions,
        caseData: state.caseData,
      }),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (!persistedState || typeof persistedState !== 'object') {
          return persistedState
        }
        if (version < 1) {
          const state = persistedState as Record<string, unknown>
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
