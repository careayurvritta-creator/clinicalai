import 'server-only'

export function getNvidiaApiKey(): string {
  const key = process.env.NVIDIA_API_KEY
  if (!key) {
    throw new Error('NVIDIA_API_KEY is not set in environment variables')
  }
  return key
}

export const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1'
