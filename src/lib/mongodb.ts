import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.MONGODB_DB || 'ayurveda-clinical'

let client: MongoClient | null = null
let db: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  if (db) return db
  
  if (!client) {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    console.log('[MongoDB] Connected to', MONGODB_URI)
  }
  
  db = client.db(DB_NAME)
  return db
}

export async function getCollection<T extends Document>(name: string) {
  const database = await connectToDatabase()
  return database.collection<T>(name)
}

export async function closeDatabase() {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log('[MongoDB] Connection closed')
  }
}

export interface WhoTermDocument {
  _id?: string
  termId: string
  english: string
  definition: string
  sanskritIAST: string
  sanskritDevanagari: string
  category: string
  subcategory?: string
  embedding?: number[]
  createdAt: Date
  updatedAt: Date
}

export interface AyurKnowledgeDocument {
  _id?: string
  type: 'disease' | 'herb' | 'treatment' | 'concept' | 'procedure' | 'formula'
  name: string
  sanskrit?: string
  english?: string
  description: string
  category: string
  data: Record<string, any>
  embedding?: number[]
  createdAt: Date
  updatedAt: Date
}

export const VECTOR_COLLECTION = 'vector_embeddings'
export const WHO_TERMS_COLLECTION = 'who_terms'
export const AYUR_KNOWLEDGE_COLLECTION = 'ayur_knowledge'

export async function createIndexes() {
  const database = await connectToDatabase()
  
  // Create vector search index for semantic search
  try {
    await database.collection(VECTOR_COLLECTION).createIndex(
      { type: 1 },
      { name: 'type_index' }
    )
    console.log('[MongoDB] Created type index')
  } catch (e) {
    // Index may already exist
  }
  
  try {
    await database.collection(WHO_TERMS_COLLECTION).createIndex(
      { termId: 1 },
      { unique: true, name: 'termId_unique' }
    )
    console.log('[MongoDB] Created termId index')
  } catch (e) {
    // Index may already exist
  }
  
  try {
    await database.collection(VECTOR_COLLECTION).createIndex(
      { category: 1 },
      { name: 'category_index' }
    )
    console.log('[MongoDB] Created category index')
  } catch (e) {
    // Index may already exist
  }
}