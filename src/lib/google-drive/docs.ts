// Google Docs Operations — Create and manage document files

import type { docs_v1 } from 'googleapis'
import type { DocumentTemplate } from '../types'

// ─── Create Document from Template ──────────────────────

export async function createDocument(
  docs: docs_v1.Docs,
  title: string,
  template: DocumentTemplate,
  data?: Record<string, unknown>
): Promise<{ documentId: string; documentUrl: string }> {
  // Create the document
  const createRes = await docs.documents.create({
    requestBody: { title },
  })

  const documentId = createRes.data.documentId!
  const documentUrl = `https://docs.google.com/document/d/${documentId}/edit`

  // Build content from template and data
  const requests: docs_v1.Schema$Request[] = []
  let currentIndex = 1 // Start after the default paragraph

  for (const section of template.sections) {
    // Section heading
    requests.push({
      insertText: {
        location: { index: currentIndex },
        text: `${section.title}\n`,
      },
    })

    // Format heading as bold
    requests.push({
      updateTextStyle: {
        range: {
          startIndex: currentIndex,
          endIndex: currentIndex + section.title.length,
        },
        textStyle: { bold: true, fontSize: { magnitude: 14, unit: 'PT' } },
        fields: 'bold,fontSize',
      },
    })
    currentIndex += section.title.length + 1

    // Section fields
    for (const field of section.fields) {
      const value = data?.[field.name]
      const displayValue = value !== undefined && value !== null
        ? String(value)
        : field.defaultValue !== undefined
          ? String(field.defaultValue)
          : ''

      const lineText = `${field.label}: ${displayValue}\n`
      requests.push({
        insertText: {
          location: { index: currentIndex },
          text: lineText,
        },
      })

      // Bold the field label
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: currentIndex,
            endIndex: currentIndex + field.label.length + 1,
          },
          textStyle: { bold: true },
          fields: 'bold',
        },
      })
      currentIndex += lineText.length
    }

    // Add spacing between sections
    requests.push({
      insertText: {
        location: { index: currentIndex },
        text: '\n',
      },
    })
    currentIndex += 1
  }

  // Apply all formatting in batch
  if (requests.length > 0) {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: { requests },
    })
  }

  return { documentId, documentUrl }
}

// ─── Append Content to Document ──────────────────────────

export async function appendToDocument(
  docs: docs_v1.Docs,
  documentId: string,
  text: string
): Promise<void> {
  // Get document to find end index
  const doc = await docs.documents.get({ documentId })
  const endIndex = doc.data.body?.content?.slice(-1)[0]?.endIndex ?? 1

  await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: endIndex - 1 },
            text,
          },
        },
      ],
    },
  })
}

// ─── Read Document Content ──────────────────────────────

export async function readDocument(
  docs: docs_v1.Docs,
  documentId: string
): Promise<string> {
  const doc = await docs.documents.get({ documentId })
  const content = doc.data.body?.content ?? []
  let text = ''

  for (const element of content) {
    if (element.paragraph) {
      for (const paraElement of element.paragraph.elements ?? []) {
        if (paraElement.textRun) {
          text += paraElement.textRun.content
        }
      }
    }
  }

  return text
}
