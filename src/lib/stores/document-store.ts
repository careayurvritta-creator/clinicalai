'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, PatientRecord } from '../types'
import { DEFAULT_MODEL } from '../types'

export interface PatientDemographics {
  name?: string
  age?: number | null
  gender?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  occupation?: string | null
  date_of_birth?: string | null
  blood_group?: string | null
  height_cm?: number | null
  weight_kg?: number | null
  emergency_contact?: string | null
  emergency_phone?: string | null
  uhid?: string | null
}

export interface PatientFolder {
  id: string
  name: string
  clinicalId: string
  folderUrl: string
  supabasePatientId?: string
  uhid?: string
  demographics?: PatientDemographics
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
  collectedDemographics: Partial<PatientDemographics>
  refreshPatientsToken: number
}

interface DocumentActions {
  setPatients: (patients: PatientFolder[]) => void
  selectPatient: (patient: PatientFolder) => void
  clearPatient: () => void
  addPatient: (patient: PatientFolder) => void
  setLoadingPatients: (loading: boolean) => void
  navigateToCategory: (categoryId: string, categoryLabel: string, driveFolderId?: string) => void
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
  updateCollectedDemographics: (data: Partial<PatientDemographics>) => void
  resetCollectedDemographics: () => void
  setPatientSupabaseId: (id: string, uhid: string) => void
  updatePatientDemographics: (demographics: PatientDemographics) => void
  triggerPatientRefresh: () => void
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
      collectedDemographics: {},
      refreshPatientsToken: 0,

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
            { id: patient.id, label: patient.uhid ? `${patient.uhid}_${patient.name}` : `${patient.name} (${patient.clinicalId})`, type: 'patient' },
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

      navigateToCategory: (categoryId, categoryLabel, driveFolderId?) =>
        set((s) => ({
          currentFolderId: driveFolderId || categoryId,
          currentCategory: categoryLabel,
          files: [],
          editingFile: null,
          editorMode: 'explorer',
          breadcrumbs: [
            ...s.breadcrumbs.filter((b) => b.type === 'root' || b.type === 'patient'),
            { id: driveFolderId || categoryId, label: categoryLabel, type: 'category' },
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
        set((s) => ({
          currentFolderId: null,
          currentCategory: null,
          files: [],
          breadcrumbs: s.selectedPatient
            ? [
                { id: 'root', label: 'Patients', type: 'root' as const },
                { id: s.selectedPatient.id, label: s.selectedPatient.uhid ? `${s.selectedPatient.uhid}_${s.selectedPatient.name}` : `${s.selectedPatient.name} (${s.selectedPatient.clinicalId})`, type: 'patient' as const },
              ]
            : [],
          editingFile: null,
          editorMode: 'explorer',
          // Don't clear selectedPatient — keep it selected
        })),
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
      clearIntake: () => set({ intakeMode: 'idle', intakeData: {}, collectedDemographics: {} }),
      setSelectedPatientRecord: (record) => set({ selectedPatientRecord: record }),
      updateCollectedDemographics: (data) =>
        set((s) => ({ collectedDemographics: { ...s.collectedDemographics, ...data } })),
      resetCollectedDemographics: () => set({ collectedDemographics: {} }),
      setPatientSupabaseId: (id, uhid) =>
        set((s) => ({
          selectedPatient: s.selectedPatient
            ? { ...s.selectedPatient, supabasePatientId: id, uhid }
            : s.selectedPatient,
        })),
      updatePatientDemographics: (demographics) =>
        set((s) => ({
          selectedPatient: s.selectedPatient
            ? { ...s.selectedPatient, demographics, uhid: demographics.uhid ?? s.selectedPatient.uhid }
            : s.selectedPatient,
        })),
      triggerPatientRefresh: () => set((s) => ({ refreshPatientsToken: s.refreshPatientsToken + 1 })),
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
