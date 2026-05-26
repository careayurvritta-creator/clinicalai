'use client'

import { useState, useEffect, useCallback } from 'react'

interface Toast {
  id: string
  message: string
  type: 'info' | 'error' | 'success'
}

let toastListeners: Array<(toast: Toast) => void> = []

export function showToast(message: string, type: Toast['type'] = 'info') {
  const toast: Toast = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    message,
    type,
  }
  toastListeners.forEach((listener) => listener(toast))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id))
    }, 4000)
  }, [])

  useEffect(() => {
    toastListeners.push(addToast)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== addToast)
    }
  }, [addToast])

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-up ${
            toast.type === 'error'
              ? 'bg-red-500/90 text-white'
              : toast.type === 'success'
              ? 'bg-green-500/90 text-white'
              : 'bg-muted border border-border text-foreground'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
