// MongoDB is optional - used for production vector storage
// For local development, the system uses in-memory embeddings

const MONGODB_URI = process.env.MONGODB_URI || ''
const DB_NAME = process.env.MONGODB_DB || 'ayurveda-clinical'

let isConnected = false

export async function connectToDatabase(): Promise<any> {
  if (!MONGODB_URI) {
    console.log('[MongoDB] No URI configured - using local in-memory mode')
    return null
  }
  
  if (isConnected) {
    return {}
  }
  
  try {
    const { MongoClient } = await import('mongodb' as string)
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    isConnected = true
    console.log('[MongoDB] Connected to', MONGODB_URI)
    return client.db(DB_NAME)
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error)
    console.log('[MongoDB] Falling back to local in-memory mode')
    return null
  }
}

export async function closeDatabase(): Promise<void> {
  isConnected = false
  console.log('[MongoDB] Local mode - no connection to close')
}

export function isMongoConfigured(): boolean {
  return !!MONGODB_URI
}

export const VECTOR_COLLECTION = 'vector_embeddings'
export const WHO_TERMS_COLLECTION = 'who_terms'
export const AYUR_KNOWLEDGE_COLLECTION = 'ayur_knowledge'

export async function createIndexes(): Promise<void> {
  // Indexes handled in local mode
  console.log('[MongoDB] Indexes handled by local embeddings')
}