import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, Message, Attachment, CaseData, IntakeState, StoredCase } from './types'
import { DEFAULT_MODEL } from './types'

const defaultState: Omit<ChatState, 'isStreaming' | 'intakeState'> = {
  messages: [],
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
  activeModule: 'chat',
}

const initialCaseData: CaseData = {
  name: '',
  age: '',
  gender: '',
  occupation: '',
  area: '',
  prakriti: '',
  chiefComplaints: [],
  comorbidities: [],
  investigations: [],
  investigationText: '',
  ongoingMedications: '',
  medicalHistory: '',
  allergies: '',
  familyHistory: '',
  nadi: '',
  mootra: '',
  mala: '',
  jivha: '',
  drik: '',
  sparsh: '',
  shabda: '',
  aakriti: '',
  prakritiDetail: '',
  saara: '',
  samhanana: '',
  satva: '',
  aharaShakti: '',
  vyayamaShakti: '',
  desha: '',
  provisionalDiagnosis: '',
  provisionalReasoning: '',
}

const initialIntakeState: IntakeState = {
  isCollecting: false,
  currentStep: 0,
  totalSteps: 12,
  caseData: initialCaseData,
  questionHistory: [],
  showProvisionalDiagnosis: false,
  pendingComplaints: [],
  currentComplaintIndex: 0,
}

interface ChatActions {
  addMessage: (message: Message) => void
  updateLastMessage: (content: string, status?: Message['status']) => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void
  setCanvasContent: (content: string) => void
  appendToCanvas: (content: string) => void
  clearMessages: () => void
  setActiveModule: (module: string) => void
  setIntakeState: (state: Partial<IntakeState>) => void
  updateCaseData: (data: Partial<CaseData>) => void
  addChiefComplaint: (complaint: CaseData['chiefComplaints'][0]) => void
  updateProvisionalDiagnosis: (diagnosis: string, reasoning: string) => void
  resetIntake: () => void
  setShowProvisionalDiagnosis: (show: boolean) => void
}

interface CaseStoreActions {
  storedCases: StoredCase[]
  addStoredCase: (caseData: StoredCase) => void
  updateCaseOutcome: (caseId: string, outcome: StoredCase['outcome']) => void
  exportCases: () => string
  importCases: (json: string) => void
  clearStoredCases: () => void
}

export const useChatStore = create<ChatState & ChatActions>()(
  persist(
    (set, get) => ({
      ...defaultState,
      isStreaming: false,
      activeModule: 'chat',

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
        set((state) => {
          const MAX_CANVAS_LENGTH = 50000
          const combined = state.canvasContent
            ? state.canvasContent + '\n\n---\n\n' + content
            : content
          if (combined.length > MAX_CANVAS_LENGTH) {
            const keepFrom = combined.length - Math.floor(MAX_CANVAS_LENGTH * 0.8)
            const nextSeparator = combined.indexOf('\n\n---\n\n', keepFrom)
            return {
              canvasContent: nextSeparator > 0
                ? combined.slice(nextSeparator + 7)
                : combined.slice(keepFrom)
            }
          }
          return { canvasContent: combined }
        }),

      clearMessages: () =>
        set({
          messages: [],
          canvasContent: '',
          isStreaming: false,
        }),

      setActiveModule: (module) => set({ activeModule: module }),

      setIntakeState: (stateUpdate) =>
        set((prev) => ({
          intakeState: { ...prev.intakeState, ...stateUpdate } as IntakeState,
        })),

      updateCaseData: (data) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: { ...(state.intakeState?.caseData ?? initialCaseData), ...data },
          } as IntakeState,
        })),

      addChiefComplaint: (complaint) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: {
              ...(state.intakeState?.caseData ?? initialCaseData),
              chiefComplaints: [...(state.intakeState?.caseData.chiefComplaints ?? []), complaint],
            },
          } as IntakeState,
        })),

      updateProvisionalDiagnosis: (diagnosis, reasoning) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: {
              ...(state.intakeState?.caseData ?? initialCaseData),
              provisionalDiagnosis: diagnosis,
              provisionalReasoning: reasoning,
            },
            showProvisionalDiagnosis: true,
          } as IntakeState,
        })),

      resetIntake: () =>
        set({
          intakeState: initialIntakeState,
          messages: [],
          canvasContent: '',
          isStreaming: false,
        }),

      setShowProvisionalDiagnosis: (show) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            showProvisionalDiagnosis: show,
          } as IntakeState,
        })),
    }),
    {
      name: 'clinical-ai-chat',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        selectedModel: state.selectedModel,
        canvasContent: state.canvasContent,
        activeModule: state.activeModule,
        intakeState: state.intakeState,
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

export const useCaseStore = create<CaseStoreActions>()(
  persist(
    (set, get) => ({
      storedCases: [],

      addStoredCase: (caseData) =>
        set((state) => ({
          storedCases: [...state.storedCases, caseData],
        })),

      updateCaseOutcome: (caseId, outcome) =>
        set((state) => ({
          storedCases: state.storedCases.map((c) =>
            c.id === caseId ? { ...c, outcome } : c
          ),
        })),

      exportCases: () => JSON.stringify(get().storedCases, null, 2),

      importCases: (json) => {
        try {
          const cases = JSON.parse(json)
          set({ storedCases: cases })
        } catch (e) {
          console.error('Failed to import cases')
        }
      },

      clearStoredCases: () => set({ storedCases: [] }),
    }),
    {
      name: 'clinical-ai-cases',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
