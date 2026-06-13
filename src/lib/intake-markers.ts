// ──────────────────────────────────────────────────────────────
// Intake Marker Types — all structured actions the AI can emit
// ──────────────────────────────────────────────────────────────

// ── Existing markers (backward-compatible) ────────────────────

export interface SaveDemographicsMarker {
  type: 'save_demographics'
  data: Record<string, unknown>
}

export interface GenerateDocumentMarker {
  type: 'generate_document'
  templateId: string
  data?: Record<string, unknown>
}

export interface UpdateDemographicsMarker {
  type: 'update_demographics'
  field: string
  value: unknown
}

// ── Folder operations ─────────────────────────────────────────

export interface CreateFolderMarker {
  type: 'create_folder'
  parentFolderId: string
  name: string
}

export interface RenameFolderMarker {
  type: 'rename_folder'
  folderId: string
  newName: string
}

export interface DeleteFolderMarker {
  type: 'delete_folder'
  folderId: string
  name: string
}

export interface ListFoldersMarker {
  type: 'list_folders'
  parentFolderId: string
}

// ── File listing & search ─────────────────────────────────────

export interface ListFilesMarker {
  type: 'list_files'
  folderId: string
  categoryName?: string
}

export interface SearchFilesMarker {
  type: 'search_files'
  query: string
}

// ── Document operations ───────────────────────────────────────

export interface ReadDocumentMarker {
  type: 'read_document'
  fileId: string
  mimeType: string
  fileName: string
}

export interface GenerateBulkMarker {
  type: 'generate_bulk'
  documents: Array<{ templateId: string; data?: Record<string, unknown> }>
}

// ── Navigation ────────────────────────────────────────────────

export interface NavigateToMarker {
  type: 'navigate_to'
  folderId: string
  label: string
  navType: 'root' | 'patient' | 'category'
}

// ── File mutations ────────────────────────────────────────────

export interface DeleteFileMarker {
  type: 'delete_file'
  fileId: string
  fileName: string
}

export interface RenameFileMarker {
  type: 'rename_file'
  fileId: string
  newName: string
}

export interface MoveFileMarker {
  type: 'move_file'
  fileId: string
  newParentFolderId: string
}

// ── Union of ALL markers ──────────────────────────────────────

export type IntakeMarker =
  | SaveDemographicsMarker
  | GenerateDocumentMarker
  | UpdateDemographicsMarker
  | CreateFolderMarker
  | RenameFolderMarker
  | DeleteFolderMarker
  | ListFoldersMarker
  | ListFilesMarker
  | SearchFilesMarker
  | ReadDocumentMarker
  | GenerateBulkMarker
  | NavigateToMarker
  | DeleteFileMarker
  | RenameFileMarker
  | MoveFileMarker

// ──────────────────────────────────────────────────────────────
// Marker registry — defines how to parse each marker name
// ──────────────────────────────────────────────────────────────

type MarkerFactory = (data: Record<string, unknown>) => IntakeMarker | null

const MARKER_REGISTRY: Record<string, MarkerFactory> = {
  SAVE_DEMOGRAPHICS: (d) => ({ type: 'save_demographics', data: d }),
  UPDATE_DEMOGRAPHICS: (d) => ({ type: 'update_demographics', field: d.field as string, value: d.value }),
  GENERATE_DOCUMENT: (d) => ({ type: 'generate_document', templateId: d.templateId as string, data: d.data as Record<string, unknown> | undefined }),
  GENERATE_BULK: (d) => ({ type: 'generate_bulk', documents: d.documents as Array<{ templateId: string; data?: Record<string, unknown> }> }),
  CREATE_FOLDER: (d) => ({ type: 'create_folder', parentFolderId: (d.parentFolderId as string) || '', name: d.name as string }),
  RENAME_FOLDER: (d) => ({ type: 'rename_folder', folderId: d.folderId as string, newName: d.newName as string }),
  DELETE_FOLDER: (d) => ({ type: 'delete_folder', folderId: d.folderId as string, name: d.name as string }),
  LIST_FOLDERS: (d) => ({ type: 'list_folders', parentFolderId: (d.parentFolderId as string) || '' }),
  LIST_FILES: (d) => ({ type: 'list_files', folderId: (d.folderId as string) || '', categoryName: d.categoryName as string | undefined }),
  SEARCH_FILES: (d) => ({ type: 'search_files', query: d.query as string }),
  READ_DOCUMENT: (d) => ({ type: 'read_document', fileId: d.fileId as string, mimeType: d.mimeType as string, fileName: d.fileName as string }),
  NAVIGATE_TO: (d) => ({ type: 'navigate_to', folderId: (d.folderId as string) || '', label: d.label as string, navType: (d.navType ?? d.type) as 'root' | 'patient' | 'category' }),
  DELETE_FILE: (d) => ({ type: 'delete_file', fileId: d.fileId as string, fileName: d.fileName as string }),
  RENAME_FILE: (d) => ({ type: 'rename_file', fileId: d.fileId as string, newName: d.newName as string }),
  MOVE_FILE: (d) => ({ type: 'move_file', fileId: d.fileId as string, newParentFolderId: d.newParentFolderId as string }),
}

// ──────────────────────────────────────────────────────────────
// Parser
// ──────────────────────────────────────────────────────────────

/**
 * Parse ALL intake markers from AI response text.
 * Pattern: [MARKER_NAME]\n```json\n{...}\n```
 * Returns parsed markers and the text with markers stripped.
 */
export function parseIntakeMarkers(text: string): { markers: IntakeMarker[]; cleanText: string } {
  const markers: IntakeMarker[] = []
  let cleanText = text

  // Match every [MARKER_NAME] + ```json ... ``` block
  const markerPattern = /\[([A-Z_]+)\]\s*\n?\s*```json\s*\n?([\s\S]*?)\n?\s*```/g
  let match: RegExpExecArray | null

  while ((match = markerPattern.exec(text)) !== null) {
    const markerName = match[1]
    const jsonRaw = match[2].trim()
    const factory = MARKER_REGISTRY[markerName]

    if (factory) {
      try {
        const data = JSON.parse(jsonRaw)
        const parsed = factory(data)
        if (parsed) {
          markers.push(parsed)
          cleanText = cleanText.replace(match[0], '').trim()
        }
      } catch {
        // ignore invalid JSON
      }
    }
  }

  return { markers, cleanText }
}
