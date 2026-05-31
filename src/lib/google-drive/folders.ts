// Google Drive Folder Operations — Patient folder structure management

import type { drive_v3 } from 'googleapis'

const GOOGLE_DRIVE_SHARE_EMAIL = process.env.GOOGLE_DRIVE_SHARE_EMAIL

// Share a folder/file with a user so it appears in their "Shared with me"
async function shareWithUser(drive: drive_v3.Drive, fileId: string, email: string): Promise<void> {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: email,
      },
      sendNotificationEmail: false,
    })
  } catch (err: unknown) {
    // Ignore "already has permission" errors
    const message = err instanceof Error ? err.message : String(err)
    if (!message.includes('alreadyExists') && !message.includes('duplicate')) {
      console.error(`[Drive] Failed to share ${fileId} with ${email}:`, message)
    }
  }
}

// Ensure a folder is shared with the configured user
async function ensureShared(drive: drive_v3.Drive, fileId: string): Promise<void> {
  if (GOOGLE_DRIVE_SHARE_EMAIL) {
    await shareWithUser(drive, fileId, GOOGLE_DRIVE_SHARE_EMAIL)
  }
}

// Standard 20-category folder structure for each patient
export const PATIENT_FOLDER_CATEGORIES = [
  { name: '01-OPD-Registers', label: 'OPD Visit Registers' },
  { name: '02-Therapy-Registers', label: 'OPD Therapy Registers' },
  { name: '03-IPD-Registers', label: 'IPD Visit Registers' },
  { name: '04-Procedure-Registers', label: 'Panchakarma Procedure Registers' },
  { name: '05-Consultation-Notes', label: 'OPD Consultation Notes' },
  { name: '06-Invoices', label: 'Invoices' },
  { name: '07-Insurance-Forms', label: 'Insurance Forms' },
  { name: '08-Admission-Notes', label: 'IPD Admission Notes' },
  { name: '09-Treatment-Plans', label: 'IPD Treatment Plans' },
  { name: '10-Rounds-Notes', label: 'Consultant Rounds Notes' },
  { name: '11-Nursing-Medicine', label: 'Nursing Medicine Charts' },
  { name: '12-Nursing-Panchakarma', label: 'Nursing Panchakarma Charts' },
  { name: '13-Discharge-Plans', label: 'IPD Discharge Plans' },
  { name: '14-Discharge-Summaries', label: 'Discharge Summaries' },
  { name: '15-Certificates', label: 'Medical Certificates' },
  { name: '16-Receipts', label: 'Receipts' },
  { name: '17-Authorization', label: 'Authorization Status' },
  { name: '18-Garbha-Sanskar', label: 'Garbha Sanskar Certificates' },
  { name: '19-Lab-Reports', label: 'Lab Reports' },
  { name: '20-Prescriptions', label: 'Prescriptions' },
] as const

// ─── Root Folder ──────────────────────────────────────────

export async function getOrCreateRootFolder(
  drive: drive_v3.Drive,
  parentFolderId?: string
): Promise<string> {
  const rootName = 'Clinical AI'

  // Search for existing root folder
  const query = parentFolderId
    ? `name='${rootName}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
    : `name='${rootName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`

  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: 'drive',
  })

  if (res.data.files && res.data.files.length > 0) {
    const existingId = res.data.files[0].id!
    // Ensure sharing on every access (idempotent)
    await ensureShared(drive, existingId)
    return existingId
  }

  // Create root folder
  const fileMetadata: drive_v3.Schema$File = {
    name: rootName,
    mimeType: 'application/vnd.google-apps.folder',
    ...(parentFolderId ? { parents: [parentFolderId] } : {}),
  }

  const folder = await drive.files.create({
    requestBody: fileMetadata,
    fields: 'id',
  })

  const folderId = folder.data.id!
  // Share root folder so it appears in user's "Shared with me"
  await ensureShared(drive, folderId)
  return folderId
}

// ─── Patient Folder ──────────────────────────────────────

export async function getOrCreatePatientFolder(
  drive: drive_v3.Drive,
  rootFolderId: string,
  patientName: string,
  clinicalId: string
): Promise<{ folderId: string; categoryFolders: Record<string, string> }> {
  const folderName = `${patientName} (${clinicalId})`

  // Search for existing patient folder
  const res = await drive.files.list({
    q: `name='${folderName}' and '${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  })

  let patientFolderId: string

  if (res.data.files && res.data.files.length > 0) {
    patientFolderId = res.data.files[0].id!
  } else {
    // Create patient folder
    const folder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [rootFolderId],
      },
      fields: 'id',
    })
    patientFolderId = folder.data.id!
  }

  // Create all 20 category subfolders
  const categoryFolders: Record<string, string> = {}

  for (const category of PATIENT_FOLDER_CATEGORIES) {
    const catRes = await drive.files.list({
      q: `name='${category.name}' and '${patientFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    })

    if (catRes.data.files && catRes.data.files.length > 0) {
      categoryFolders[category.name] = catRes.data.files[0].id!
    } else {
      const catFolder = await drive.files.create({
        requestBody: {
          name: category.name,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [patientFolderId],
        },
        fields: 'id',
      })
      categoryFolders[category.name] = catFolder.data.id!
    }
  }

  return { folderId: patientFolderId, categoryFolders }
}

// ─── List Patients ──────────────────────────────────────

export interface DrivePatient {
  name: string
  clinicalId: string
  folderId: string
}

export async function listPatientsFromDrive(
  drive: drive_v3.Drive,
  rootFolderId: string,
  searchQuery?: string,
  pageToken?: string
): Promise<{ patients: DrivePatient[]; nextPageToken?: string }> {
  let q = `'${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`

  if (searchQuery) {
    q += ` and name contains '${searchQuery}'`
  }

  const res = await drive.files.list({
    q,
    fields: 'files(id, name), nextPageToken',
    spaces: 'drive',
    pageSize: 100,
    orderBy: 'name',
    ...(pageToken ? { pageToken } : {}),
  })

  const patients: DrivePatient[] = []

  for (const file of res.data.files ?? []) {
    // Parse "Patient Name (CLINICAL_ID)" format
    const match = file.name?.match(/^(.+?)\s*\(([^)]+)\)$/)
    if (match && file.id) {
      patients.push({
        name: match[1].trim(),
        clinicalId: match[2].trim(),
        folderId: file.id,
      })
    }
  }

  return {
    patients,
    nextPageToken: res.data.nextPageToken ?? undefined,
  }
}

// ─── List Files in Category ──────────────────────────────

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: number
  createdTime?: string
  modifiedTime?: string
  webViewLink?: string
}

export async function listFilesInFolder(
  drive: drive_v3.Drive,
  folderId: string
): Promise<DriveFile[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
    spaces: 'drive',
    pageSize: 100,
    orderBy: 'name',
  })

  return (res.data.files ?? []).map((f) => ({
    id: f.id!,
    name: f.name!,
    mimeType: f.mimeType!,
    size: f.size ? parseInt(f.size) : undefined,
    createdTime: f.createdTime ?? undefined,
    modifiedTime: f.modifiedTime ?? undefined,
    webViewLink: f.webViewLink ?? undefined,
  }))
}

// ─── Delete File/Folder ──────────────────────────────────

export async function deleteFile(
  drive: drive_v3.Drive,
  fileId: string
): Promise<void> {
  await drive.files.delete({ fileId })
}

// ─── Get Folder URL ──────────────────────────────────────

export async function getFolderUrl(
  drive: drive_v3.Drive,
  folderId: string
): Promise<string> {
  const res = await drive.files.get({
    fileId: folderId,
    fields: 'webViewLink',
  })
  return res.data.webViewLink ?? `https://drive.google.com/drive/folders/${folderId}`
}
