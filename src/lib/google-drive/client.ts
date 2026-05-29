// Google Drive Client — Handles auth and core API operations
// Supports both OAuth (per-user) and Service Account (shared) authentication

import { google, type drive_v3, type sheets_v4, type docs_v1 } from 'googleapis'

// ─── Configuration ──────────────────────────────────────────

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/drive/auth/callback`
const GOOGLE_SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY // JSON string

// Scopes needed for Drive + Sheets + Docs
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/documents',
]

// ─── Service Account Client (shared) ──────────────────────

let serviceAccountDrive: drive_v3.Drive | null = null
let serviceAccountSheets: sheets_v4.Sheets | null = null
let serviceAccountDocs: docs_v1.Docs | null = null

function getServiceAccountAuth() {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY not configured')
  }
  const credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_KEY)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: GOOGLE_SCOPES,
  })
}

export function getServiceAccountDrive(): drive_v3.Drive {
  if (!serviceAccountDrive) {
    serviceAccountDrive = google.drive({ version: 'v3', auth: getServiceAccountAuth() })
  }
  return serviceAccountDrive
}

export function getServiceAccountSheets(): sheets_v4.Sheets {
  if (!serviceAccountSheets) {
    serviceAccountSheets = google.sheets({ version: 'v4', auth: getServiceAccountAuth() })
  }
  return serviceAccountSheets
}

export function getServiceAccountDocs(): docs_v1.Docs {
  if (!serviceAccountDocs) {
    serviceAccountDocs = google.docs({ version: 'v1', auth: getServiceAccountAuth() })
  }
  return serviceAccountDocs
}

// ─── OAuth Client (per-user) ──────────────────────────────

export function createOAuthClient() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials not configured')
  }
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  )
}

export function getOAuthUrl(state?: string): string {
  const oauth2Client = createOAuthClient()
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GOOGLE_SCOPES,
    prompt: 'consent',
    state,
  })
}

export async function getOAuthTokens(code: string) {
  const oauth2Client = createOAuthClient()
  const { tokens } = await oauth2Client.getToken(code)
  return tokens
}

export function createOAuthDrive(accessToken: string, refreshToken?: string): drive_v3.Drive {
  const oauth2Client = createOAuthClient()
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return google.drive({ version: 'v3', auth: oauth2Client })
}

export function createOAuthSheets(accessToken: string, refreshToken?: string): sheets_v4.Sheets {
  const oauth2Client = createOAuthClient()
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return google.sheets({ version: 'v4', auth: oauth2Client })
}

export function createOAuthDocs(accessToken: string, refreshToken?: string): docs_v1.Docs {
  const oauth2Client = createOAuthClient()
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  })
  return google.docs({ version: 'v1', auth: oauth2Client })
}

// ─── Helper: Get appropriate Drive client ──────────────────

export type DriveAuthMode = 'service-account' | 'oauth'

export function getDriveClients(
  mode: DriveAuthMode,
  tokens?: { access_token: string; refresh_token?: string }
) {
  if (mode === 'service-account') {
    return {
      drive: getServiceAccountDrive(),
      sheets: getServiceAccountSheets(),
      docs: getServiceAccountDocs(),
    }
  }

  if (!tokens?.access_token) {
    throw new Error('OAuth tokens required for user mode')
  }

  return {
    drive: createOAuthDrive(tokens.access_token, tokens.refresh_token),
    sheets: createOAuthSheets(tokens.access_token, tokens.refresh_token),
    docs: createOAuthDocs(tokens.access_token, tokens.refresh_token),
  }
}
