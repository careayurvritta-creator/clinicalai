import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, Message, Attachment } from './types'
import { DEFAULT_MODEL } from './types'

const defaultState: Omit<ChatState, 'isStreaming'> = {
  messages: [],
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
}

interface ChatActions {
  addMessage: (message: Message) => void
  updateLastMessage: (content: string, status?: Message['status']) => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  appendToCanvas: (content: string) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      ...defaultState,
      isStreaming: false,

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

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
          return { messages }
        }),

      setStreaming: (streaming) => set({ isStreaming: streaming }),

      setModel: (model) => set({ selectedModel: model }),

      setCanvasContent: (content) => set({ canvasContent: content }),

      appendToCanvas: (content) =>
        set((state) => ({
          canvasContent: state.canvasContent
            ? state.canvasContent + '\n\n' + content
            : content,
        })),

      clearMessages: () =>
        set({
          messages: [],
          canvasContent: '',
          isStreaming: false,
        }),
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
      }),
      version: 1,
    }
  )
)
