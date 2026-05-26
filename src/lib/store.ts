import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, Message } from './types'
import { DEFAULT_MODEL, MODELS } from './types'

const MAX_MESSAGES = 200

const defaultState: Omit<ChatState, 'isStreaming'> = {
  messages: [],
  messagesByModule: {},
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
  canvasTimestamp: 0,
  activeModule: 'chat',
  streamingModule: null,
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
}

function trimMessages(messages: Message[]): Message[] {
  if (messages.length <= MAX_MESSAGES) return messages
  return messages.slice(-MAX_MESSAGES)
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set) => ({
      ...defaultState,
      isStreaming: false,
      streamingModule: null,
      activeModule: 'chat',

      addMessage: (message) =>
        set((state) => {
          const newMessages = trimMessages([...state.messages, message])
          return {
            messages: newMessages,
            messagesByModule: {
              ...state.messagesByModule,
              [state.activeModule]: newMessages,
            },
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
          return {
            messages,
            messagesByModule: {
              ...state.messagesByModule,
              [targetModule]: messages,
            },
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
          return {
            activeModule: module,
            messagesByModule: updatedByModule,
            messages: updatedByModule[module] ?? [],
            canvasContent: '',
            canvasTimestamp: 0,
          }
        }),

      setChatInputDraft: (draft) => set({ chatInputDraft: draft }),
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        messagesByModule: state.messagesByModule,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
        canvasTimestamp: state.canvasTimestamp,
        activeModule: state.activeModule,
        // chatInputDraft excluded — persisted separately with debounce
      }),
      version: 6,
      migrate: (persistedState: unknown, version: number) => {
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
        // Reset selectedModel if it's not in the current MODELS list (e.g., removed broken NIM models)
        if (version < 5 && state?.selectedModel) {
          const validIds = MODELS.map((m) => m.id)
          if (!validIds.includes(state.selectedModel as string)) {
            state.selectedModel = DEFAULT_MODEL
          }
        }
        // Add canvasTimestamp if missing (v5 -> v6)
        if (version < 6 && state && !('canvasTimestamp' in state)) {
          state.canvasTimestamp = 0
        }
        return persistedState
      },
    }
  )
)
