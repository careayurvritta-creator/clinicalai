import { NextRequest, NextResponse } from 'next/server'
import { getServiceAccountDrive } from '@/lib/google-drive/client'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get('fileId')
  if (!fileId) {
    return NextResponse.json({ error: 'fileId required' }, { status: 400 })
  }

  try {
    const drive = getServiceAccountDrive()

    const file = await drive.files.get({
      fileId,
      fields: 'mimeType, name, webViewLink',
    })

    const mimeType = file.data.mimeType || ''
    let embedUrl: string

    if (mimeType.includes('spreadsheet')) {
      embedUrl = `https://docs.google.com/spreadsheets/d/${fileId}/edit?usp=sharing`
    } else if (mimeType.includes('document')) {
      embedUrl = `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`
    } else {
      embedUrl = file.data.webViewLink || `https://drive.google.com/file/d/${fileId}/view`
    }

    return NextResponse.json({
      embedUrl,
      webViewLink: file.data.webViewLink,
      mimeType,
      name: file.data.name,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to get embed URL', details: String(err) },
      { status: 500 }
    )
  }
}
