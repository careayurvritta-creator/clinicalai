import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      )
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be under 10MB' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const pdfjs = await import('pdfjs-dist')
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

    const pdf = await pdfjs.getDocument({ data: uint8Array }).promise
    let fullText = ''
    let hasText = false

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = (textContent.items as any[])
        .map((item: any) => item.str)
        .join(' ')

      if (pageText.trim().length > 10) hasText = true
      fullText += `--- Page ${pageNum} ---\n${pageText}\n\n`
    }

    return NextResponse.json({
      text: fullText.trim(),
      pageCount: pdf.numPages,
      hasTextLayer: hasText,
      fileName: file.name,
    })
  } catch (error) {
    console.error('PDF extraction error:', error)
    const message = error instanceof Error ? error.message : 'Failed to extract PDF text'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
