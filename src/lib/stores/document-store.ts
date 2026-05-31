'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, PatientRecord } from '../types'
import { DEFAULT_MODEL } from '../types'

export interface PatientFolder {
  id: string
  name: string
  clinicalId: string
  folderUrl: string
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: number
  modifiedTime: string
  webViewLink?: string
}

export interface Breadcrumb {
  id: string
  label: string
  type: 'root' | 'patient' | 'category' | 'file'
}

interface DocumentState {
  patients: PatientFolder[]
  selectedPatient: PatientFolder | null
  patientsLoading: boolean
  currentFolderId: string | null
  currentCategory: string | null
  files: DriveFile[]
  breadcrumbs: Breadcrumb[]
  filesLoading: boolean
  editingFile: DriveFile | null
  editorMode: 'explorer' | 'spreadsheet' | 'document'
  chatMessages: Message[]
  selectedModel: string
  isStreaming: boolean
  driveConnected: boolean
  rootFolderId: string | null
  // Patient intake state
  intakeMode: 'idle' | 'creating_patient' | 'editing_patient' | 'generating_document'
  intakeData: Record<string, unknown>
  selectedPatientRecord: PatientRecord | null
}

interface DocumentActions {
  setPatients: (patients: PatientFolder[]) => void
  selectPatient: (patient: PatientFolder) => void
  clearPatient: () => void
  addPatient: (patient: PatientFolder) => void
  setLoadingPatients: (loading: boolean) => void
  navigateToCategory: (categoryId: string, categoryLabel: string) => void
  navigateToFolder: (folderId: string, label: string) => void
  navigateUp: () => void
  navigateToRoot: () => void
  setFiles: (files: DriveFile[]) => void
  setLoadingFiles: (loading: boolean) => void
  openFile: (file: DriveFile) => void
  closeEditor: () => void
  addChatMessage: (message: Message) => void
  updateLastChatMessage: (content: string, status?: Message['status']) => void
  clearChatMessages: () => void
  setChatStreaming: (streaming: boolean) => void
  setChatModel: (model: string) => void
  setDriveConnected: (connected: boolean) => void
  setRootFolderId: (id: string | null) => void
  setIntakeMode: (mode: DocumentState['intakeMode']) => void
  setIntakeData: (data: Record<string, unknown>) => void
  updateIntakeData: (field: string, value: unknown) => void
  clearIntake: () => void
  setSelectedPatientRecord: (record: PatientRecord | null) => void
}

export const useDocumentStore = create<DocumentState & DocumentActions>()(
  persist(
    (set) => ({
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
      intakeMode: 'idle',
      intakeData: {},
      selectedPatientRecord: null,

      setPatients: (patients) => set({ patients }),
      selectPatient: (patient) =>
        set({
          selectedPatient: patient,
          currentFolderId: null,
          currentCategory: null,
          files: [],
          editingFile: null,
          editorMode: 'explorer',
          breadcrumbs: [
            { id: 'root', label: 'Patients', type: 'root' },
            { id: patient.id, label: `${patient.name} (${patient.clinicalId})`, type: 'patient' },
          ],
        }),
      clearPatient: () =>
        set({
          selectedPatient: null,
          currentFolderId: null,
          currentCategory: null,
          files: [],
          breadcrumbs: [],
          editingFile: null,
          editorMode: 'explorer',
        }),
      addPatient: (patient) => set((s) => ({ patients: [...s.patients, patient] })),
      setLoadingPatients: (loading) => set({ patientsLoading: loading }),

      navigateToCategory: (categoryId, categoryLabel) =>
        set((s) => ({
          currentFolderId: categoryId,
          currentCategory: categoryLabel,
          files: [],
          editingFile: null,
          editorMode: 'explorer',
          breadcrumbs: [
            ...s.breadcrumbs.filter((b) => b.type === 'root' || b.type === 'patient'),
            { id: categoryId, label: categoryLabel, type: 'category' },
          ],
        })),
      navigateToFolder: (folderId, label) =>
        set((s) => ({
          currentFolderId: folderId,
          files: [],
          editingFile: null,
          editorMode: 'explorer',
          breadcrumbs: [...s.breadcrumbs, { id: folderId, label, type: 'file' }],
        })),
      navigateUp: () =>
        set((s) => {
          const crumbs = s.breadcrumbs
          if (crumbs.length <= 1) return s
          const newCrumbs = crumbs.slice(0, -1)
          const lastCrumb = newCrumbs[newCrumbs.length - 1]
          return {
            breadcrumbs: newCrumbs,
            currentFolderId: lastCrumb?.id ?? null,
            currentCategory: lastCrumb?.type === 'category' ? lastCrumb.label : null,
            files: [],
            editingFile: null,
            editorMode: 'explorer',
          }
        }),
      navigateToRoot: () =>
        set({
          currentFolderId: null,
          currentCategory: null,
          files: [],
          breadcrumbs: [],
          editingFile: null,
          editorMode: 'explorer',
          selectedPatient: null,
        }),
      setFiles: (files) => set({ files }),
      setLoadingFiles: (loading) => set({ filesLoading: loading }),

      openFile: (file) => {
        const isSheet = file.mimeType.includes('spreadsheet') || file.name.endsWith('.xlsx')
        const isDoc = file.mimeType.includes('document') || file.name.endsWith('.docx')
        set({ editingFile: file, editorMode: isSheet ? 'spreadsheet' : isDoc ? 'document' : 'explorer' })
      },
      closeEditor: () => set({ editingFile: null, editorMode: 'explorer' }),

      addChatMessage: (message) => set((s) => ({ chatMessages: [...s.chatMessages, message] })),
      updateLastChatMessage: (content, status) =>
        set((s) => {
          const messages = [...s.chatMessages]
          const last = messages[messages.length - 1]
          if (last) messages[messages.length - 1] = { ...last, content, status: status ?? last.status }
          return { chatMessages: messages }
        }),
      clearChatMessages: () => set({ chatMessages: [], isStreaming: false }),
      setChatStreaming: (streaming) => set({ isStreaming: streaming }),
      setChatModel: (model) => set({ selectedModel: model }),

      setDriveConnected: (connected) => set({ driveConnected: connected }),
      setRootFolderId: (id) => set({ rootFolderId: id }),

      setIntakeMode: (mode) => set({ intakeMode: mode }),
      setIntakeData: (data) => set({ intakeData: data }),
      updateIntakeData: (field, value) => set((s) => ({ intakeData: { ...s.intakeData, [field]: value } })),
      clearIntake: () => set({ intakeMode: 'idle', intakeData: {} }),
      setSelectedPatientRecord: (record) => set({ selectedPatientRecord: record }),
    }),
    {
      name: 'clinical-ai-documents-v2',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
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
