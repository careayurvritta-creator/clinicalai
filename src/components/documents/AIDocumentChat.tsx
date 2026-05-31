'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useDocumentStore } from '@/lib/stores/document-store'
import { ALL_TEMPLATES, getRelatedTemplates } from '@/lib/templates'
import type { Message } from '@/lib/types'
import { DEFAULT_MODEL, MODELS } from '@/lib/types'
import { buildIntakeSystemPrompt } from '@/lib/intake-prompt'
import { parseIntakeMarkers, type IntakeMarker } from '@/lib/intake-markers'

// Quick action definitions
const QUICK_ACTIONS = [
  { label: 'New Patient', message: 'Register a new patient' },
  { label: 'Prescription', message: 'Generate a prescription for this patient' },
  { label: 'View Files', message: 'Show me all files for this patient' },
  { label: 'Discharge', message: 'Create a discharge summary' },
  { label: 'Search', message: 'Search for a document' },
  { label: 'Help', message: 'What can you help me with?' },
]

export function AIDocumentChat() {
  const chatMessages = useDocumentStore((s) => s.chatMessages)
  const addChatMessage = useDocumentStore((s) => s.addChatMessage)
  const updateLastChatMessage = useDocumentStore((s) => s.updateLastChatMessage)
  const clearChatMessages = useDocumentStore((s) => s.clearChatMessages)
  const isStreaming = useDocumentStore((s) => s.isStreaming)
  const setStreaming = useDocumentStore((s) => s.setChatStreaming)
  const selectedModel = useDocumentStore((s) => s.selectedModel)
  const setModel = useDocumentStore((s) => s.setChatModel)
  const selectedPatient = useDocumentStore((s) => s.selectedPatient)
  const collectedDemographics = useDocumentStore((s) => s.collectedDemographics)
  const updateCollectedDemographics = useDocumentStore((s) => s.updateCollectedDemographics)
  const resetCollectedDemographics = useDocumentStore((s) => s.resetCollectedDemographics)
  const setPatientSupabaseId = useDocumentStore((s) => s.setPatientSupabaseId)
  const updatePatientDemographics = useDocumentStore((s) => s.updatePatientDemographics)
  const clearPatient = useDocumentStore((s) => s.clearPatient)
  const setIntakeMode = useDocumentStore((s) => s.setIntakeMode)
  const setFiles = useDocumentStore((s) => s.setFiles)
  const navigateToCategory = useDocumentStore((s) => s.navigateToCategory)
  const navigateToFolder = useDocumentStore((s) => s.navigateToFolder)
  const openFile = useDocumentStore((s) => s.openFile)
  const currentCategory = useDocumentStore((s) => s.currentCategory)
  const rootFolderId = useDocumentStore((s) => s.rootFolderId)
  const currentFolderId = useDocumentStore((s) => s.currentFolderId)

  const [input, setInput] = useState('')
  const [pendingConfirmation, setPendingConfirmation] = useState<IntakeMarker | null>(null)
  const [sessionActions, setSessionActions] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const makeId = () => crypto.randomUUID()
  const now = () => Date.now()

  const addSystemMessage = useCallback((content: string, status: Message['status'] = 'complete') => {
    addChatMessage({ id: makeId(), role: 'assistant', content, timestamp: now(), status })
  }, [addChatMessage])

  // ─── Chat-Action API caller ─────────────────────
  const callChatAction = useCallback(async (body: Record<string, unknown>) => {
    const res = await fetch('/api/documents/chat-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.details || err.error || 'Action failed')
    }
    return res.json()
  }, [])

  // ─── Marker Handlers ─────────────────────────────

  const handleSaveDemographics = useCallback(async (demographics: Record<string, unknown>) => {
    try {
      const data = await callChatAction({ action: 'create_patient', ...demographics })
      updateCollectedDemographics(demographics)
      if (data.patient) {
        setPatientSupabaseId(data.patient.id, data.patient.uhid)
        updatePatientDemographics(data.patient)
      }
      addSystemMessage(`Patient saved.\n\n**UHID:** ${data.patient?.uhid}\n**Name:** ${data.patient?.name}\n\nWhat document would you like to generate?`)
      setSessionActions(prev => [...prev, `Created patient ${demographics.name}`])
      resetCollectedDemographics()
    } catch (err) {
      addSystemMessage(`Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, updateCollectedDemographics, setPatientSupabaseId, updatePatientDemographics, addSystemMessage, resetCollectedDemographics])

  const handleGenerateDocument = useCallback(async (templateId: string, documentData: Record<string, unknown>) => {
    if (!selectedPatient?.supabasePatientId) {
      addSystemMessage('Please select or create a patient first.')
      return
    }
    try {
      const data = await callChatAction({
        action: 'generate_document',
        patientId: selectedPatient.supabasePatientId,
        templateId,
        data: documentData,
      })
      addSystemMessage(`Document created!\n\n**${data.document.title}**\n\n[Open in Google Drive](${data.document.url})`)
      setSessionActions(prev => [...prev, `Generated ${templateId}`])

      // Suggest related templates
      const related = getRelatedTemplates(templateId)
      if (related.length > 0) {
        const relatedNames = related.slice(0, 3).map(id => ALL_TEMPLATES.find(t => t.id === id)?.name).filter(Boolean)
        if (relatedNames.length > 0) {
          addSystemMessage(`Would you also like to create: ${relatedNames.join(', ')}?`)
        }
      }
    } catch (err) {
      addSystemMessage(`Generation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [selectedPatient, callChatAction, addSystemMessage])

  const handleGenerateBulk = useCallback(async (documents: Array<{ templateId: string; data?: Record<string, unknown> }>) => {
    if (!selectedPatient?.supabasePatientId) {
      addSystemMessage('Please select or create a patient first.')
      return
    }
    addSystemMessage(`Generating ${documents.length} documents...`)
    try {
      const data = await callChatAction({
        action: 'generate_bulk',
        patientId: selectedPatient.supabasePatientId,
        documents,
      })
      const results = data.results as Array<{ success: boolean; document?: { title: string; url: string }; error?: string }>
      const successful = results.filter(r => r.success)
      const failed = results.filter(r => !r.success)
      let msg = `Generated ${successful.length}/${documents.length} documents:\n`
      for (const r of successful) {
        msg += `\n- [${r.document?.title}](${r.document?.url})`
      }
      if (failed.length > 0) {
        msg += `\n\nFailed: ${failed.map(f => f.error).join(', ')}`
      }
      addSystemMessage(msg)
      setSessionActions(prev => [...prev, `Bulk generated ${successful.length} documents`])
    } catch (err) {
      addSystemMessage(`Bulk generation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [selectedPatient, callChatAction, addSystemMessage])

  const handleUpdateDemographic = useCallback(async (field: string, value: unknown) => {
    if (!selectedPatient?.supabasePatientId) {
      updateCollectedDemographics({ [field]: value })
      addSystemMessage(`Updated ${field} locally. Save demographics to persist.`)
      return
    }
    try {
      await callChatAction({ action: 'update_patient', patientId: selectedPatient.supabasePatientId, updates: { [field]: value } })
      addSystemMessage(`Updated ${field} to "${value}".`)
    } catch (err) {
      addSystemMessage(`Failed to update ${field}: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [selectedPatient, callChatAction, updateCollectedDemographics, addSystemMessage])

  const handleListFiles = useCallback(async (folderId: string, categoryName?: string) => {
    try {
      const data = await callChatAction({ action: 'list_files', folderId })
      const files = data.files as Array<{ id: string; name: string; mimeType: string }>
      if (files.length === 0) {
        addSystemMessage(`No files found${categoryName ? ` in ${categoryName}` : ''}.`)
      } else {
        let msg = `**${categoryName || 'Files'}** (${files.length}):\n`
        for (const f of files) {
          const icon = f.mimeType?.includes('spreadsheet') ? '[Sheet]' : f.mimeType?.includes('document') ? '[Doc]' : '[File]'
          msg += `\n- ${icon} ${f.name}`
        }
        addSystemMessage(msg)
      }
      // Update explorer if in same category
      if (categoryName) {
        setFiles(files.map(f => ({ id: f.id, name: f.name, mimeType: f.mimeType || '', modifiedTime: '' })))
      }
    } catch (err) {
      addSystemMessage(`Failed to list files: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage, setFiles])

  const handleListFolders = useCallback(async (parentFolderId: string) => {
    try {
      const data = await callChatAction({ action: 'list_folders', parentFolderId })
      const folders = data.folders as Array<{ id: string; name: string }>
      if (folders.length === 0) {
        addSystemMessage('No subfolders found.')
      } else {
        let msg = `**Folders** (${folders.length}):\n`
        for (const f of folders) {
          msg += `\n- 📁 ${f.name}`
        }
        addSystemMessage(msg)
      }
    } catch (err) {
      addSystemMessage(`Failed to list folders: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleSearchFiles = useCallback(async (query: string) => {
    try {
      const data = await callChatAction({ action: 'search_files', query, rootFolderId: rootFolderId || undefined })
      const files = data.files as Array<{ id: string; name: string; parents?: string[] }>
      if (files.length === 0) {
        addSystemMessage(`No files matching "${query}" found.`)
      } else {
        let msg = `Found ${files.length} files matching "${query}":\n`
        for (const f of files) {
          msg += `\n- ${f.name}`
        }
        addSystemMessage(msg)
      }
    } catch (err) {
      addSystemMessage(`Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage, rootFolderId])

  const handleReadDocument = useCallback(async (fileId: string, mimeType: string, fileName: string) => {
    try {
      const data = await callChatAction({ action: 'read_document', fileId, mimeType })
      const content = data.file?.content as string
      addSystemMessage(`**${fileName}**\n\n${content.substring(0, 2000)}${content.length > 2000 ? '\n\n...(truncated)' : ''}`)
    } catch (err) {
      addSystemMessage(`Failed to read document: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleNavigateTo = useCallback(async (folderId: string, label: string, type: string) => {
    try {
      const data = await callChatAction({ action: 'navigate_to', folderId })
      const files = data.files as Array<{ id: string; name: string; mimeType: string; modifiedTime?: string; webViewLink?: string }>
      setFiles(files.map(f => ({ id: f.id, name: f.name, mimeType: f.mimeType || '', modifiedTime: f.modifiedTime || '', webViewLink: f.webViewLink })))
      if (type === 'category') {
        navigateToCategory(folderId, label)
      } else {
        navigateToFolder(folderId, label)
      }
      addSystemMessage(`Navigated to **${label}** (${files.length} items)`)
    } catch (err) {
      addSystemMessage(`Navigation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, setFiles, navigateToCategory, navigateToFolder, addSystemMessage])

  const handleDeleteFile = useCallback(async (fileId: string, fileName: string) => {
    try {
      await callChatAction({ action: 'delete_file', fileId, confirmation: true })
      addSystemMessage(`Deleted "${fileName}".`)
      setSessionActions(prev => [...prev, `Deleted ${fileName}`])
    } catch (err) {
      addSystemMessage(`Delete failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleRenameFile = useCallback(async (fileId: string, newName: string) => {
    try {
      await callChatAction({ action: 'rename_file', fileId, newName })
      addSystemMessage(`Renamed to "${newName}".`)
    } catch (err) {
      addSystemMessage(`Rename failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleMoveFile = useCallback(async (fileId: string, newParentFolderId: string) => {
    try {
      await callChatAction({ action: 'move_file', fileId, newParentFolderId })
      addSystemMessage('File moved successfully.')
    } catch (err) {
      addSystemMessage(`Move failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleCreateFolder = useCallback(async (parentFolderId: string, name: string) => {
    try {
      await callChatAction({ action: 'create_folder', parentFolderId, name })
      addSystemMessage(`Folder "${name}" created.`)
      setSessionActions(prev => [...prev, `Created folder ${name}`])
    } catch (err) {
      addSystemMessage(`Folder creation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleDeleteFolder = useCallback(async (folderId: string, name: string) => {
    try {
      await callChatAction({ action: 'delete_folder', folderId, confirmation: true })
      addSystemMessage(`Folder "${name}" deleted.`)
      setSessionActions(prev => [...prev, `Deleted folder ${name}`])
    } catch (err) {
      addSystemMessage(`Folder deletion failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  const handleRenameFolder = useCallback(async (folderId: string, newName: string) => {
    try {
      await callChatAction({ action: 'rename_folder', folderId, newName })
      addSystemMessage(`Folder renamed to "${newName}".`)
      setSessionActions(prev => [...prev, `Renamed folder to ${newName}`])
    } catch (err) {
      addSystemMessage(`Folder rename failed: ${err instanceof Error ? err.message : 'Unknown error'}`, 'error')
    }
  }, [callChatAction, addSystemMessage])

  // ─── File Upload ─────────────────────────────────

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setIsUploading(true)

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        if (currentFolderId) formData.append('folderId', currentFolderId)

        addSystemMessage(`Uploading "${file.name}"...`, 'streaming')

        const res = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Upload failed')
        }

        const data = await res.json()
        updateLastChatMessage(`Uploaded **${file.name}** successfully.`)
        setSessionActions(prev => [...prev, `Uploaded ${file.name}`])
      } catch (err) {
        updateLastChatMessage(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    setIsUploading(false)
    // Reset file input so same file can be re-uploaded
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [currentFolderId, addSystemMessage, updateLastChatMessage])

  // ─── Marker Router ───────────────────────────────

  const processMarkers = useCallback(async (markers: IntakeMarker[]) => {
    // Resolve folder IDs — use currentFolderId or rootFolderId as fallback
    const effectiveFolderId = currentFolderId || rootFolderId || ''

    for (const marker of markers) {
      switch (marker.type) {
        case 'save_demographics':
          await handleSaveDemographics(marker.data ?? {})
          break
        case 'generate_document':
          await handleGenerateDocument(marker.templateId, marker.data ?? {})
          break
        case 'generate_bulk':
          await handleGenerateBulk(marker.documents)
          break
        case 'update_demographics':
          await handleUpdateDemographic(marker.field, marker.value)
          break
        case 'list_files':
          await handleListFiles(marker.folderId || effectiveFolderId, marker.categoryName)
          break
        case 'search_files':
          await handleSearchFiles(marker.query)
          break
        case 'read_document':
          if (!marker.fileId) {
            addSystemMessage('Cannot read document: no file ID provided.')
            break
          }
          await handleReadDocument(marker.fileId, marker.mimeType, marker.fileName)
          break
        case 'navigate_to':
          await handleNavigateTo(marker.folderId || effectiveFolderId, marker.label, marker.navType)
          break
        case 'delete_file':
          if (!marker.fileId) {
            addSystemMessage('Cannot delete file: no file ID provided. I need to list files first to find the ID.')
            break
          }
          if (!pendingConfirmation) {
            setPendingConfirmation(marker)
            addSystemMessage(`Are you sure you want to delete "${marker.fileName}"? Type "yes" to confirm.`)
          } else {
            await handleDeleteFile(marker.fileId, marker.fileName)
            setPendingConfirmation(null)
          }
          break
        case 'rename_file':
          if (!marker.fileId) {
            addSystemMessage('Cannot rename file: no file ID provided. I need to list files first to find the ID.')
            break
          }
          await handleRenameFile(marker.fileId, marker.newName)
          break
        case 'move_file':
          if (!marker.fileId) {
            addSystemMessage('Cannot move file: no file ID provided. I need to list files first to find the ID.')
            break
          }
          await handleMoveFile(marker.fileId, marker.newParentFolderId)
          break
        case 'create_folder':
          await handleCreateFolder(marker.parentFolderId || effectiveFolderId, marker.name)
          break
        case 'delete_folder':
          if (!marker.folderId) {
            addSystemMessage('Cannot delete folder: no folder ID provided. I need to list folders first to find the ID.')
            break
          }
          if (!pendingConfirmation) {
            setPendingConfirmation(marker)
            addSystemMessage(`Are you sure you want to delete folder "${marker.name}"? Type "yes" to confirm.`)
          } else {
            await handleDeleteFolder(marker.folderId, marker.name)
            setPendingConfirmation(null)
          }
          break
        case 'rename_folder':
          if (!marker.folderId) {
            addSystemMessage('Cannot rename folder: no folder ID provided. I need to list folders first to find the ID.')
            break
          }
          await handleRenameFolder(marker.folderId, marker.newName)
          break
        case 'list_folders':
          await handleListFolders(marker.parentFolderId || effectiveFolderId)
          break
      }
    }
  }, [pendingConfirmation, currentFolderId, rootFolderId, handleSaveDemographics, handleGenerateDocument, handleGenerateBulk, handleUpdateDemographic, handleListFiles, handleListFolders, handleSearchFiles, handleReadDocument, handleNavigateTo, handleDeleteFile, handleRenameFile, handleMoveFile, handleCreateFolder, handleDeleteFolder, handleRenameFolder, addSystemMessage])

  // ─── Send Message ────────────────────────────────

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    setInput('')

    // Handle confirmation
    if (pendingConfirmation) {
      if (text.toLowerCase() === 'yes' || text.toLowerCase() === 'y') {
        await processMarkers([pendingConfirmation])
      } else {
        addSystemMessage('Cancelled.')
        setPendingConfirmation(null)
      }
      return
    }

    const userMsg: Message = { id: makeId(), role: 'user', content: text, timestamp: now(), status: 'complete' }
    addChatMessage(userMsg)

    const aiMsg: Message = { id: makeId(), role: 'assistant', content: '', timestamp: now(), status: 'streaming' }
    addChatMessage(aiMsg)
    setStreaming(true)

    try {
      const systemPrompt = buildIntakeSystemPrompt({
        selectedPatient: selectedPatient ? {
          name: selectedPatient.name,
          clinicalId: selectedPatient.clinicalId,
          demographics: selectedPatient.demographics ? { ...selectedPatient.demographics } as Record<string, unknown> : undefined,
        } : null,
        collectedDemographics,
        currentLocation: {
          category: currentCategory || undefined,
          folderId: currentFolderId || undefined,
        },
        rootFolderId: rootFolderId || undefined,
        recentActions: sessionActions.slice(-5),
      })

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          model: selectedModel,
          enableRAG: true,
        }),
      })

      if (!res.ok) throw new Error('Chat request failed')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response stream')

      let accumulated = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) {
                accumulated += content
                updateLastChatMessage(accumulated, 'streaming')
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      const { markers, cleanText } = parseIntakeMarkers(accumulated)

      if (markers.length > 0) {
        updateLastChatMessage(cleanText || 'Done.', 'complete')
        await processMarkers(markers)
      } else {
        updateLastChatMessage(accumulated, 'complete')
      }
    } catch (err) {
      updateLastChatMessage(
        `Error: ${err instanceof Error ? err.message : 'Failed to get response'}`,
        'error'
      )
    } finally {
      setStreaming(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleNewPatient = () => {
    clearPatient()
    resetCollectedDemographics()
    clearChatMessages()
    setIntakeMode('creating_patient')
    setSessionActions([])
    addSystemMessage("Let's register a new patient. What is the patient's full name?")
  }

  return (
    <div className="flex flex-col w-[320px] border-l border-border bg-panel-chat flex-shrink-0">
      {/* Header */}
      <div className="px-3 py-2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-foreground">Document Manager</span>
        </div>
        <div className="flex items-center gap-1">
          <select
            value={selectedModel}
            onChange={(e) => setModel(e.target.value)}
            className="text-[10px] bg-muted border border-border rounded px-1.5 py-0.5 text-foreground outline-none"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <button
            onClick={clearChatMessages}
            className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
            title="Clear chat"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin min-h-0">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <svg className="w-10 h-10 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xs font-medium">Document Manager</p>
            <p className="text-[10px] mt-1 max-w-[200px]">
              Manage patients, folders, and all clinical documents through conversation.
            </p>
            <div className="mt-4 space-y-1.5 w-full">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => setInput(action.message)}
                  className="w-full text-left text-[10px] px-2.5 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}>
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                {msg.status === 'streaming' && (
                  <span className="inline-block w-1.5 h-3 bg-primary animate-blink ml-0.5" />
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (when chat has messages) */}
      {chatMessages.length > 0 && (
        <div className="px-3 py-1.5 flex gap-1 flex-wrap border-t border-border/50">
          {QUICK_ACTIONS.slice(0, 4).map((action) => (
            <button
              key={action.label}
              onClick={() => setInput(action.message)}
              className="text-[9px] px-2 py-1 rounded bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-2 border-t border-border">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Attach file (PDF, Word, Excel, JPG, PNG)"
          >
            {isUploading ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            )}
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={pendingConfirmation ? 'Type "yes" to confirm...' : 'Ask AI to manage documents...'}
            rows={1}
            className="flex-1 text-xs bg-muted/50 border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 resize-none min-h-[32px] max-h-[80px]"
            style={{ height: 'auto' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 80) + 'px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
