import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ChatState, Message, Attachment, CaseData, IntakeState, StoredCase } from './types'
import { DEFAULT_MODEL } from './types'

const defaultState: Omit<ChatState, 'isStreaming'> = {
  messages: [],
  selectedModel: DEFAULT_MODEL,
  canvasContent: '',
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
  sparSh: '',
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

      setActiveModule: (module) => set({ activeModule: module }),

      setIntakeState: (state) =>
        set((prev) => ({
          intakeState: { ...prev.intakeState, ...state },
        })),

      updateCaseData: (data) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: { ...state.intakeState.caseData, ...data },
          },
        })),

      addChiefComplaint: (complaint) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: {
              ...state.intakeState.caseData,
              chiefComplaints: [...state.intakeState.caseData.chiefComplaints, complaint],
            },
          },
        })),

      updateProvisionalDiagnosis: (diagnosis, reasoning) =>
        set((state) => ({
          intakeState: {
            ...state.intakeState,
            caseData: {
              ...state.intakeState.caseData,
              provisionalDiagnosis: diagnosis,
              provisionalReasoning: reasoning,
            },
            showProvisionalDiagnosis: true,
          },
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
          },
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
      version: 2,
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
