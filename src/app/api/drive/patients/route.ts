// Google Drive Patients — List and create patient folders

import { NextRequest, NextResponse } from 'next/server'
import { getDriveClients } from '@/lib/google-drive/client'
import { getOrCreateRootFolder, listPatientsFromDrive, getOrCreatePatientFolder } from '@/lib/google-drive/folders'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') ?? undefined

  try {
    // Use service account by default
    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    const patients = await listPatientsFromDrive(drive, rootFolderId, search)

    return NextResponse.json({ patients, rootFolderId })
  } catch (error) {
    console.error('Drive patients list error:', error)
    return NextResponse.json(
      { error: 'Failed to list patients from Drive' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { patientName, clinicalId } = body

    if (!patientName || !clinicalId) {
      return NextResponse.json(
        { error: 'patientName and clinicalId are required' },
        { status: 400 }
      )
    }

    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    const result = await getOrCreatePatientFolder(drive, rootFolderId, patientName, clinicalId)

    return NextResponse.json({
      folderId: result.folderId,
      categoryFolders: result.categoryFolders,
    })
  } catch (error) {
    console.error('Drive create patient folder error:', error)
    return NextResponse.json(
      { error: 'Failed to create patient folder' },
      { status: 500 }
    )
  }
}
