'use client'

import { useState } from 'react'

interface ModuleItem {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const modules: ModuleItem[] = [
  {
    id: 'treatment-protocol',
    name: 'Treatment Protocol Maker',
    description: 'Create treatment protocols',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'patient-portal',
    name: 'Patient Portal',
    description: 'Manage patient records',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'diet-chart',
    name: 'Diet Chart Generator',
    description: 'Generate diet plans',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    id: 'lifestyle-advice',
    name: 'Lifestyle Advice Generator',
    description: 'Generate lifestyle recommendations',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'browse-patients',
    name: 'Browse Patients',
    description: 'View patient database',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export function ModuleSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="relative flex flex-col bg-panel-chat border-r border-border h-full flex-shrink-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-5 h-12 bg-panel-chat border border-border rounded-r-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
        style={{ left: 0 }}
      >
        <svg
          className={`w-3 h-3 text-muted-foreground transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className={`flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'w-72' : 'w-0'}`}>
        <div className="flex-shrink-0 border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">Modules</h3>
          </div>
        </div>

        <div className={`flex-1 overflow-y-auto py-2 ${isExpanded ? '' : 'invisible'}`}>
          <div className="px-3 pb-3">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-muted/30 border border-border mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">DR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Dr. Sharma</p>
                <p className="text-xs text-muted-foreground truncate">Ayurvedic Physician</p>
              </div>
            </div>

            <div className="space-y-1">
              {modules.map((module) => (
                <button
                  key={module.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-muted/30 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{module.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{module.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-muted/30 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">Settings</p>
                  <p className="text-xs text-muted-foreground">App preferences</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}