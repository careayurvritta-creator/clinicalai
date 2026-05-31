import { NextResponse } from 'next/server'
import { getDriveClients } from '@/lib/google-drive/client'
import { uploadFile } from '@/lib/google-drive/files'
import { getOrCreateRootFolder } from '@/lib/google-drive/folders'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
]

const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folderId = formData.get('folderId') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Allowed: PDF, Word, Excel, JPG, PNG` },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 })
    }

    const { drive } = getDriveClients('service-account')

    // Use provided folderId or fall back to root
    let targetFolderId = folderId
    if (!targetFolderId) {
      targetFolderId = await getOrCreateRootFolder(drive)
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploaded = await uploadFile(
      drive,
      targetFolderId,
      file.name,
      file.type || 'application/octet-stream',
      buffer
    )

    return NextResponse.json({ success: true, file: uploaded })
  } catch (error) {
    console.error('[Upload] Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
