import * as natural from "natural"
const { TfIdf } = natural

export class VectorStore {
  private chunks: string[] = []
  private vectorizer: any // Declared as any to avoid undeclared variable error
  private vectors: number[][] = []

  constructor(context: string, maxTokens = 100) {
    this.chunks = this.chunkText(context, maxTokens)
    this.vectorizer = new TfIdf()

    // Add documents to TF-IDF
    this.chunks.forEach((chunk) => {
      this.vectorizer.addDocument(chunk)
    })

    // Create vectors for each chunk
    this.vectors = this.chunks.map((_, i) => {
      const vector: Record<string, number> = {}
      this.vectorizer.listTerms(i).forEach((item) => {
        vector[item.term] = item.tfidf
      })
      return this.vectorToArray(vector)
    })
  }

  private chunkText(text: string, maxTokens: number): string[] {
    const sentences = text.split(". ")
    const chunks: string[] = []
    let current = ""

    for (const sentence of sentences) {
      if ((current + sentence).split(/\s+/).length <= maxTokens) {
        current += sentence + ". "
      } else {
        chunks.push(current.trim())
        current = sentence + ". "
      }
    }

    if (current.trim()) {
      chunks.push(current.trim())
    }

    return chunks
  }

  private vectorToArray(vector: Record<string, number>): number[] {
    // Get all unique terms across all documents
    const allTerms = new Set<string>()
    for (let i = 0; i < this.vectorizer.documents.length; i++) {
      this.vectorizer.listTerms(i).forEach((item) => {
        allTerms.add(item.term)
      })
    }

    // Convert sparse vector to dense array
    const terms = Array.from(allTerms)
    return terms.map((term) => vector[term] || 0)
  }

  retrieve(query: string, k = 3): string {
    // Create query vector
    this.vectorizer.addDocument(query)
    const queryIndex = this.vectorizer.documents.length - 1
    const queryVector: Record<string, number> = {}

    this.vectorizer.listTerms(queryIndex).forEach((item) => {
      queryVector[item.term] = item.tfidf
    })

    const queryVectorArray = this.vectorToArray(queryVector)

    // Remove query from TF-IDF
    this.vectorizer.documents.pop()

    // Calculate similarities
    const similarities = this.vectors.map((vector, i) => ({
      index: i,
      similarity: this.cosineSimilarity(queryVectorArray, vector),
    }))

    // Sort by similarity (descending)
    similarities.sort((a, b) => b.similarity - a.similarity)

    // Get top k chunks
    const topIndices = similarities.slice(0, k).map((item) => item.index)
    const relevantChunks = topIndices.map((index) => this.chunks[index])

    return relevantChunks.join("\n\n")
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    // Ensure vectors are the same length
    const maxLength = Math.max(a.length, b.length)
    const paddedA = [...a, ...Array(maxLength - a.length).fill(0)]
    const paddedB = [...b, ...Array(maxLength - b.length).fill(0)]

    // Calculate dot product
    const dotProduct = paddedA.reduce((sum, value, i) => sum + value * paddedB[i], 0)

    // Calculate magnitudes
    const magnitudeA = Math.sqrt(paddedA.reduce((sum, value) => sum + value * value, 0))
    const magnitudeB = Math.sqrt(paddedB.reduce((sum, value) => sum + value * value, 0))

    // Handle zero magnitudes to avoid division by zero
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0
    }

    // Return cosine similarity
    return dotProduct / (magnitudeA * magnitudeB)
  }
}
