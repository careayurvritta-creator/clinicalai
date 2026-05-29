'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, DocumentCategory } from '../types'
import { DEFAULT_MODEL } from '../types'

interface PatientInfo {
  id: string
  name: string
  driveFolderId: string
  driveFolderUrl?: string
}

interface DocumentInfo {
  id: string
  name: string
  category: DocumentCategory
  driveFileId: string
  driveFileUrl?: string
  mimeType: string
  size?: number
  createdAt: string
  updatedAt: string
}

interface DocumentStoreState {
  // Patient selection
  selectedPatient: PatientInfo | null
  patients: PatientInfo[]

  // Folder navigation
  currentCategory: DocumentCategory | null
  documents: DocumentInfo[]

  // Document editing
  editingDocument: DocumentInfo | null

  // AI Chat sidebar
  chatMessages: Message[]
  selectedModel: string
  isStreaming: boolean

  // Google Drive
  driveConnected: boolean
  rootFolderId: string | null
}

interface DocumentStoreActions {
  // Patient
  selectPatient: (patient: PatientInfo) => void
  clearPatient: () => void
  setPatients: (patients: PatientInfo[]) => void
  addPatient: (patient: PatientInfo) => void

  // Folder navigation
  setCurrentCategory: (category: DocumentCategory | null) => void
  setDocuments: (docs: DocumentInfo[]) => void
  addDocument: (doc: DocumentInfo) => void
  removeDocument: (docId: string) => void

  // Document editing
  openDocument: (doc: DocumentInfo) => void
  closeDocument: () => void

  // AI Chat
  addChatMessage: (message: Message) => void
  updateLastChatMessage: (content: string, status?: Message['status']) => void
  clearChatMessages: () => void
  setStreaming: (streaming: boolean) => void
  setModel: (model: string) => void

  // Drive
  setDriveConnected: (connected: boolean) => void
  setRootFolderId: (id: string | null) => void
}

export const useDocumentStore = create<DocumentStoreState & DocumentStoreActions>()(
  persist(
    (set) => ({
      selectedPatient: null,
      patients: [],
      currentCategory: null,
      documents: [],
      editingDocument: null,
      chatMessages: [],
      selectedModel: DEFAULT_MODEL,
      isStreaming: false,
      driveConnected: false,
      rootFolderId: null,

      // Patient
      selectPatient: (patient) => set({ selectedPatient: patient, currentCategory: null, documents: [], editingDocument: null }),
      clearPatient: () => set({ selectedPatient: null, currentCategory: null, documents: [], editingDocument: null }),
      setPatients: (patients) => set({ patients }),
      addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),

      // Folder navigation
      setCurrentCategory: (category) => set({ currentCategory: category, editingDocument: null }),
      setDocuments: (docs) => set({ documents: docs }),
      addDocument: (doc) => set((state) => ({ documents: [...state.documents, doc] })),
      removeDocument: (docId) => set((state) => ({ documents: state.documents.filter(d => d.id !== docId) })),

      // Document editing
      openDocument: (doc) => set({ editingDocument: doc }),
      closeDocument: () => set({ editingDocument: null }),

      // AI Chat
      addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
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
      setDriveConnected: (connected) => set({ driveConnected: connected }),
      setRootFolderId: (id) => set({ rootFolderId: id }),
    }),
    {
      name: 'clinical-ai-documents',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedPatient: state.selectedPatient,
        patients: state.patients,
        selectedModel: state.selectedModel,
        driveConnected: state.driveConnected,
        rootFolderId: state.rootFolderId,
      }),
      version: 1,
    }
  )
)
