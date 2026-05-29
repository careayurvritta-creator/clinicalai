'use client'

import { MobileModeNav } from '@/components/shared/MobileModeNav'
import { ToastContainer } from '@/components/Toast'

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col app-height w-screen overflow-hidden bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <main
        id="main-content"
        className="flex-1 min-h-0 flex flex-col overflow-hidden"
        role="main"
      >
        {children}
      </main>

      <MobileModeNav />
      <ToastContainer />
    </div>
  )
}
