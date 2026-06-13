// Google Drive Files — List and delete files

import { NextRequest, NextResponse } from 'next/server'
import { getDriveClients } from '@/lib/google-drive/client'
import { listFilesInFolder } from '@/lib/google-drive/folders'
import { deleteFile } from '@/lib/google-drive/files'

export const dynamic = 'force-dynamic'

// GET /api/drive/files — List files in a folder
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const folderId = searchParams.get('folderId')

  if (!folderId) {
    return NextResponse.json({ error: 'folderId is required' }, { status: 400 })
  }

  try {
    const { drive } = getDriveClients('service-account')
    const files = await listFilesInFolder(drive, folderId)
    return NextResponse.json({ files })
  } catch (error) {
    console.error('Drive files error:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}

// DELETE /api/drive/files — Delete a file
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const fileId = searchParams.get('fileId')

  if (!fileId) {
    return NextResponse.json({ error: 'fileId is required' }, { status: 400 })
  }

  try {
    const { drive } = getDriveClients('service-account')
    await deleteFile(drive, fileId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Drive files error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
