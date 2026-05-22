'use client'

import { useState } from 'react'
import { useChatStore } from '@/lib/store'
import { MODELS } from '@/lib/types'

export function ModelSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const selectedModel = useChatStore((state) => state.selectedModel)
  const setModel = useChatStore((state) => state.setModel)

  const currentModel = MODELS.find((m) => m.id === selectedModel) || MODELS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select AI model: ${currentModel.name}`}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">{currentModel.name}</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full right-0 mb-2 w-72 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-border">
              <span className="text-xs font-medium text-muted-foreground">Select Model</span>
            </div>
            <div className="max-h-64 overflow-y-auto scrollbar-thin">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setModel(model.id)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2.5 hover:bg-muted transition-colors ${
                    selectedModel === model.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">{model.name}</span>
                    {selectedModel === model.id && (
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                    <span className="text-[10px] text-muted-foreground/50 bg-muted px-1.5 py-0.5 rounded">
                      {model.context}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
