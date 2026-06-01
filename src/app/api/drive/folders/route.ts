// Google Drive Folders — List, create, manage patient folders
import { NextRequest, NextResponse } from 'next/server'
import { createOAuthDrive } from '@/lib/google-drive/client'
import { listPatientsFromDrive, getOrCreatePatientFolder, listFilesInFolder } from '@/lib/google-drive/folders'

export const dynamic = 'force-dynamic'

// GET /api/drive/folders — List patient folders or files in a folder
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const accessToken = searchParams.get('access_token')
  const refreshToken = searchParams.get('refresh_token')
  const parentFolderId = searchParams.get('parent_id')
  const rootFolderId = searchParams.get('root_folder_id')
  const search = searchParams.get('search')

  if (!accessToken) {
    return NextResponse.json({ error: 'access_token required' }, { status: 401 })
  }

  try {
    const drive = createOAuthDrive(accessToken, refreshToken ?? undefined)

    if (rootFolderId) {
      // List patient folders in root
      const patients = await listPatientsFromDrive(drive, rootFolderId, search ?? undefined)
      return NextResponse.json({ patients })
    }

    if (parentFolderId) {
      // List subfolders/files of a specific folder
      const files = await listFilesInFolder(drive, parentFolderId)
      return NextResponse.json({ folders: files.filter(f => f.mimeType === 'application/vnd.google-apps.folder'), files })
    }

    return NextResponse.json({ error: 'parent_id or root_folder_id required' }, { status: 400 })
  } catch (error) {
    console.error('Drive folders error:', error)
    return NextResponse.json({ error: 'Failed to list folders' }, { status: 500 })
  }
}

// POST /api/drive/folders — Create patient folder structure
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { access_token, refresh_token, patient_name, clinical_id, root_folder_id, uhid } = body

  if (!access_token || !patient_name || !clinical_id || !root_folder_id) {
    return NextResponse.json(
      { error: 'access_token, patient_name, clinical_id, root_folder_id required' },
      { status: 400 }
    )
  }

  try {
    const drive = createOAuthDrive(access_token, refresh_token)
    const result = await getOrCreatePatientFolder(drive, root_folder_id, patient_name, clinical_id, uhid)
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('Drive folders error:', error)
    return NextResponse.json({ error: 'Failed to create patient folders' }, { status: 500 })
  }
}
