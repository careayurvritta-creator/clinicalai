export interface EmbeddingResult {
  embedding: number[]
  tokens: number
}

// Fast hash-based embedding - no API calls needed
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  return {
    embedding: simpleTextToEmbedding(text),
    tokens: Math.ceil(text.length / 4)
  }
}

// Simple text to embedding vector using word hashing
function simpleTextToEmbedding(text: string): number[] {
  const embedding: number[] = new Array(384).fill(0)
  
  // Tokenize
  const words = text.toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2)
  
  // Create hash-based features
  const ngrams: Map<string, number> = new Map()
  
  for (const word of words) {
    // Unigrams
    ngrams.set(word, (ngrams.get(word) || 0) + 1)
    
    // Bigrams
    for (let i = 0; i < word.length - 1; i++) {
      const bigram = word.substring(i, i + 2)
      ngrams.set(bigram, (ngrams.get(bigram) || 0) + 0.5)
    }
  }
  
  // Map to fixed-size vector using hash
  for (const [token, count] of ngrams) {
    const hash = hashString(token)
    const position = hash % 384
    embedding[position] += count * 0.1
    
    // Also add to nearby positions for smoothing
    const position2 = (hash * 7) % 384
    embedding[position2] += count * 0.05
  }
  
  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
  if (magnitude > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= magnitude
    }
  }
  
  return embedding
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export async function generateBatchEmbeddings(texts: string[]): Promise<EmbeddingResult[]> {
  return texts.map(text => ({
    embedding: simpleTextToEmbedding(text),
    tokens: Math.ceil(text.length / 4)
  }))
}

// Cosine similarity between two vectors
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  
  if (normA === 0 || normB === 0) return 0
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

// Find most similar documents
export function findSimilar(
  queryEmbedding: number[],
  documents: { id: string; embedding: number[] }[],
  topK: number = 5
): { id: string; score: number }[] {
  const similarities = documents
    .map(doc => ({
      id: doc.id,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
  
  return similarities
}