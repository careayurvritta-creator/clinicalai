'use client'

import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'
import { DesktopSidebar } from './DesktopSidebar'
import { HeaderBar } from './HeaderBar'
import { ToastContainer } from './Toast'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Login page renders without app shell
  if (pathname === '/login') {
    return <>{children}</>
  }

  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <HeaderBar />

        {/* Content area */}
        <main
          id="main-content"
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          role="main"
        >
          {children}
        </main>

        {/* Mobile bottom nav */}
        <MobileNav />
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
}
