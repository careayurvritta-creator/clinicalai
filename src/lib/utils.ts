import { type ClassValue, clsx } from 'clsx'
import { MODELS, DEFAULT_MODEL, type ModelOption } from './types'

export { MODELS, DEFAULT_MODEL }
export type { ModelOption }

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/\x00/g, '')
    .trim()
    .substring(0, 5000)
}
