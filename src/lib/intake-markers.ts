export interface SaveDemographicsMarker {
  type: 'save_demographics'
  data: Record<string, unknown>
}

export interface GenerateDocumentMarker {
  type: 'generate_document'
  templateId: string
  data: Record<string, unknown>
}

export interface UpdateDemographicsMarker {
  type: 'update_demographics'
  field: string
  value: unknown
}

export type IntakeMarker = SaveDemographicsMarker | GenerateDocumentMarker | UpdateDemographicsMarker

/**
 * Parse intake markers from AI response text.
 * Returns markers found and text with markers removed.
 */
export function parseIntakeMarkers(text: string): { markers: IntakeMarker[]; cleanText: string } {
  const markers: IntakeMarker[] = []
  let cleanText = text

  // [SAVE_DEMOGRAPHICS] + ```json ... ```
  const saveMatch = cleanText.match(
    /\[SAVE_DEMOGRAPHICS\]\s*\n?\s*```json\s*\n?([\s\S]*?)\n?\s*```/
  )
  if (saveMatch) {
    try {
      const data = JSON.parse(saveMatch[1].trim())
      markers.push({ type: 'save_demographics', data })
      cleanText = cleanText.replace(saveMatch[0], '').trim()
    } catch { /* ignore invalid JSON */ }
  }

  // [GENERATE_DOCUMENT] + ```json ... ```
  const genMatch = cleanText.match(
    /\[GENERATE_DOCUMENT\]\s*\n?\s*```json\s*\n?([\s\S]*?)\n?\s*```/
  )
  if (genMatch) {
    try {
      const data = JSON.parse(genMatch[1].trim())
      markers.push({
        type: 'generate_document',
        templateId: data.templateId,
        data: data.data || {},
      })
      cleanText = cleanText.replace(genMatch[0], '').trim()
    } catch { /* ignore invalid JSON */ }
  }

  // [UPDATE_DEMOGRAPHICS] + ```json ... ```
  const updateMatch = cleanText.match(
    /\[UPDATE_DEMOGRAPHICS\]\s*\n?\s*```json\s*\n?([\s\S]*?)\n?\s*```/
  )
  if (updateMatch) {
    try {
      const data = JSON.parse(updateMatch[1].trim())
      markers.push({
        type: 'update_demographics',
        field: data.field,
        value: data.value,
      })
      cleanText = cleanText.replace(updateMatch[0], '').trim()
    } catch { /* ignore invalid JSON */ }
  }

  return { markers, cleanText }
}
