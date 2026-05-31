// Google Drive File Operations — Create, list, delete files
import type { drive_v3 } from 'googleapis'

export interface FileInfo {
  id: string
  name: string
  mimeType: string
  size?: string
  createdTime?: string
  modifiedTime?: string
  webViewLink?: string
  iconLink?: string
}

// List files in a folder
export async function listFiles(
  drive: drive_v3.Drive,
  folderId: string,
  mimeType?: string
): Promise<FileInfo[]> {
  let q = `'${folderId}' in parents and trashed = false`
  if (mimeType) {
    q += ` and mimeType = '${mimeType}'`
  }

  const response = await drive.files.list({
    q,
    fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, iconLink)',
    orderBy: 'modifiedTime desc',
    pageSize: 100,
  })

  return (response.data.files || []).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    size: f.size ?? undefined,
    createdTime: f.createdTime ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    iconLink: f.iconLink ?? undefined,
  }))
}

// Get file metadata
export async function getFile(
  drive: drive_v3.Drive,
  fileId: string
): Promise<FileInfo> {
  const response = await drive.files.get({
    fileId,
    fields: 'id, name, mimeType, size, createdTime, modifiedTime, webViewLink, iconLink',
  })

  const f = response.data
  return {
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    size: f.size ?? undefined,
    createdTime: f.createdTime ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    iconLink: f.iconLink ?? undefined,
  }
}

// Move a file to trash
export async function deleteFile(
  drive: drive_v3.Drive,
  fileId: string
): Promise<void> {
  await drive.files.update({
    fileId,
    requestBody: { trashed: true },
  })
}

// Rename a file
export async function renameFile(
  drive: drive_v3.Drive,
  fileId: string,
  newName: string
): Promise<void> {
  await drive.files.update({
    fileId,
    requestBody: { name: newName },
  })
}

// Move a file to a different folder
export async function moveFile(
  drive: drive_v3.Drive,
  fileId: string,
  newParentFolderId: string
): Promise<void> {
  // Get current parents
  const file = await drive.files.get({
    fileId,
    fields: 'parents',
  })
  const previousParents = file.data.parents?.join(',') || ''

  await drive.files.update({
    fileId,
    addParents: newParentFolderId,
    removeParents: previousParents,
  })
}

// Get a shareable link for a file
export async function getShareableLink(
  drive: drive_v3.Drive,
  fileId: string
): Promise<string> {
  // Make the file readable to anyone with the link
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  })

  const file = await drive.files.get({
    fileId,
    fields: 'webViewLink',
  })

  return file.data.webViewLink || ''
}

// Upload a file to a folder
export async function uploadFile(
  drive: drive_v3.Drive,
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<FileInfo> {
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      mimeType,
    },
    media: {
      mimeType,
      body: Buffer.from(buffer),
    },
    fields: 'id, name, mimeType, size, createdTime, modifiedTime, webViewLink, iconLink',
  })

  const f = response.data
  return {
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    size: f.size ?? undefined,
    createdTime: f.createdTime ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    iconLink: f.iconLink ?? undefined,
  }
}

// Count files in a folder
export async function countFiles(
  drive: drive_v3.Drive,
  folderId: string
): Promise<number> {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id)',
    pageSize: 1000,
  })
  return response.data.files?.length || 0
}

// Search files by name across all patient folders
export async function searchFiles(
  drive: drive_v3.Drive,
  query: string,
  rootFolderId?: string
): Promise<FileInfo[]> {
  let q = `name contains '${query}' and trashed = false`
  if (rootFolderId) {
    q += ` and '${rootFolderId}' in parents`
  }

  const response = await drive.files.list({
    q,
    fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, iconLink)',
    orderBy: 'modifiedTime desc',
    pageSize: 50,
  })

  return (response.data.files || []).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    size: f.size ?? undefined,
    createdTime: f.createdTime ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
    iconLink: f.iconLink ?? undefined,
  }))
}
