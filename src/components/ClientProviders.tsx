'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppLayout } from '@/components/AppLayout'
import { AuthProvider } from '@/components/AuthProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<div className="flex items-center justify-center h-screen bg-background"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
          <AppLayout>{children}</AppLayout>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  )
}
