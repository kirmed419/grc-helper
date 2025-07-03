import fs from "fs"
import path from "path"

export async function loadSummary(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "public", "summary.txt")
    const content = await fs.promises.readFile(filePath, "utf-8")
    return content
  } catch (error) {
    console.error("Error loading summary file:", error)
    return "Failed to load GRC context. Please check the summary.txt file."
  }
}
