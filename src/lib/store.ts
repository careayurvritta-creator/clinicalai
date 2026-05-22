import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, Message } from './types'
import { DEFAULT_MODEL } from './types'

const defaultState: Omit<ChatState, 'isStreaming'> = {
  messages: [],
  messagesByModule: {},
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
  activeModule: 'chat',
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
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set) => ({
      ...defaultState,
      isStreaming: false,
      activeModule: 'chat',

      addMessage: (message) =>
        set((state) => {
          const newMessages = [...state.messages, message]
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
              [state.activeModule]: messages,
            },
          }
        }),

      setStreaming: (streaming) => set({ isStreaming: streaming }),
      setModel: (model) => set({ selectedModel: model }),
      setCanvasContent: (content) => set({ canvasContent: content }),

      clearMessages: () =>
        set((state) => ({
          messages: [],
          messagesByModule: {
            ...state.messagesByModule,
            [state.activeModule]: [],
          },
          canvasContent: '',
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
        activeModule: state.activeModule,
        chatInputDraft: state.chatInputDraft,
      }),
      version: 3,
      migrate: (persistedState: any, version: number) => {
        if (version < 3) {
          const state = persistedState as any
          if (state?.intakeState?.caseData?.sparSh !== undefined) {
            state.intakeState.caseData.sparsh = state.intakeState.caseData.sparSh
            delete state.intakeState.caseData.sparSh
          }
        }
        return persistedState
      },
    }
  )
)
