export class SimpleVectorStore {
  private chunks: string[]

  constructor(context: string) {
    this.chunks = this.chunkText(context)
  }

  private chunkText(text: string): string[] {
    const sentences = text.split(". ")
    const chunks: string[] = []
    let current = ""

    for (const sentence of sentences) {
      if ((current + sentence).split(" ").length <= 100) {
        current += sentence + ". "
      } else {
        chunks.push(current.trim())
        current = sentence + ". "
      }
    }

    if (current) {
      chunks.push(current.trim())
    }

    return chunks
  }

  retrieve(query: string): string {
    // Simple keyword matching for retrieval
    const relevantChunks = this.chunks.filter((chunk) =>
      query
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && chunk.toLowerCase().includes(word.toLowerCase())),
    )

    return relevantChunks.length > 0 ? relevantChunks.join("\n\n") : this.chunks.slice(0, 2).join("\n\n")
  }
}
