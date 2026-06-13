// Google Drive Patients — List, create, rename, and delete patient folders

import { NextRequest, NextResponse } from 'next/server'
import { getDriveClients } from '@/lib/google-drive/client'
import { getOrCreateRootFolder, listPatientsFromDrive, getOrCreatePatientFolder, renameFolder, deleteFile } from '@/lib/google-drive/folders'
import { createServerClient } from '@/lib/supabase/client'
import { generateUHID } from '@/lib/uhid'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') ?? undefined

  try {
    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    const pageToken = searchParams.get('pageToken') ?? undefined
    const result = await listPatientsFromDrive(drive, rootFolderId, search, pageToken)

    return NextResponse.json({ patients: result.patients, rootFolderId, nextPageToken: result.nextPageToken })
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

    if (!patientName) {
      return NextResponse.json(
        { error: 'patientName is required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    const cid = clinicalId || `AAH-${Date.now().toString(36).toUpperCase()}`

    // Create Supabase patient record first
    const uhid = await generateUHID()
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .insert({
        name: patientName,
        uhid,
        clinical_id: cid,
      })
      .select()
      .single()

    if (patientError) {
      console.error('Supabase patient create error:', patientError)
    }

    // Create Drive folder with UHID naming
    const { drive } = getDriveClients('service-account')
    const rootFolderId = await getOrCreateRootFolder(drive)
    const result = await getOrCreatePatientFolder(drive, rootFolderId, patientName, cid, uhid)

    // Link Drive folder to Supabase patient
    if (patient) {
      await supabase.from('patient_drive_links').insert({
        patient_id: patient.id,
        drive_folder_id: result.folderId,
        clinical_id: cid,
      })
    }

    return NextResponse.json({
      folderId: result.folderId,
      categoryFolders: result.categoryFolders,
      clinicalId: cid,
      uhid,
      patient: patient ? {
        id: patient.id,
        name: patient.name,
        uhid: patient.uhid,
        clinicalId: patient.clinical_id,
      } : null,
    })
  } catch (error) {
    console.error('Drive create patient folder error:', error)
    return NextResponse.json(
      { error: 'Failed to create patient folder' },
      { status: 500 }
    )
  }
}

// PATCH /api/drive/patients — Rename patient folder
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { folderId, newName } = body

    if (!folderId || !newName) {
      return NextResponse.json(
        { error: 'folderId and newName are required' },
        { status: 400 }
      )
    }

    const { drive } = getDriveClients('service-account')
    await renameFolder(drive, folderId, newName)

    return NextResponse.json({ success: true, folderId, newName })
  } catch (error) {
    console.error('Drive rename folder error:', error)
    return NextResponse.json(
      { error: 'Failed to rename folder' },
      { status: 500 }
    )
  }
}

// DELETE /api/drive/patients — Delete patient folder
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get('folderId')

    if (!folderId) {
      return NextResponse.json(
        { error: 'folderId is required' },
        { status: 400 }
      )
    }

    const { drive } = getDriveClients('service-account')
    await deleteFile(drive, folderId)

    return NextResponse.json({ success: true, folderId })
  } catch (error) {
    console.error('Drive delete folder error:', error)
    return NextResponse.json(
      { error: 'Failed to delete folder' },
      { status: 500 }
    )
  }
}
