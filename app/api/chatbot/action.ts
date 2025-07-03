"use server"

import { SimpleVectorStore } from "@/lib/simple-vector-store"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyCpzP0CY3MVKqJkQGqsFmSn_tf4MOsJpPw"
const MODEL_NAME = "models/gemini-1.5-flash"

// Embed GRC context directly in the code
// In a production environment, this would be stored in a database or loaded differently
const GRC_CONTEXT = `
PCI DSS (Payment Card Industry Data Security Standard) requires encryption of cardholder data both in transit and at rest.
GDPR (General Data Protection Regulation) mandates that organizations implement appropriate technical and organizational measures to protect personal data.
ISO 27001 is an international standard for information security management systems (ISMS).
SOC 2 is a framework for service organizations to demonstrate their controls related to security, availability, processing integrity, confidentiality, and privacy.
Credit card transaction companies must maintain a secure network, protect cardholder data, maintain a vulnerability management program, implement strong access control measures, regularly monitor and test networks, and maintain an information security policy.

PCI DSS has 12 main requirements:
1. Install and maintain a firewall configuration to protect cardholder data
2. Do not use vendor-supplied defaults for system passwords and other security parameters
3. Protect stored cardholder data
4. Encrypt transmission of cardholder data across open, public networks
5. Use and regularly update anti-virus software or programs
6. Develop and maintain secure systems and applications
7. Restrict access to cardholder data by business need to know
8. Assign a unique ID to each person with computer access
9. Restrict physical access to cardholder data
10. Track and monitor all access to network resources and cardholder data
11. Regularly test security systems and processes
12. Maintain a policy that addresses information security for all personnel

ISO 27001 is organized into the following clauses:
4. Context of the organization
5. Leadership
6. Planning
7. Support
8. Operation
9. Performance evaluation
10. Improvement

ISO 27001 Annex A controls are organized into four categories:
1. Organizational controls (37 controls)
2. People controls (8 controls)
3. Physical controls (14 controls)
4. Technological controls (34 controls)

GDPR key principles:
1. Lawfulness, fairness, and transparency
2. Purpose limitation
3. Data minimization
4. Accuracy
5. Storage limitation
6. Integrity and confidentiality (security)
7. Accountability

SOC 2 Trust Service Criteria:
1. Security: Information and systems are protected against unauthorized access, unauthorized disclosure of information, and damage to systems.
2. Availability: Information and systems are available for operation and use to meet the entity's objectives.
3. Processing Integrity: System processing is complete, valid, accurate, timely, and authorized.
4. Confidentiality: Information designated as confidential is protected as committed or agreed.
5. Privacy: Personal information is collected, used, retained, disclosed, and disposed of in conformity with the commitments in the entity's privacy notice.
`

export async function processQuery(query: string): Promise<string> {
  try {
    // Initialize the vector store with embedded context
    const vectorStore = new SimpleVectorStore(GRC_CONTEXT)

    // Retrieve relevant context
    const relevantContext = vectorStore.retrieve(query)

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })

    // Construct the prompt with the retrieved context
    const prompt = `You are a GRC (Governance, Risk, and Compliance) assistant for a credit card transaction company. 
Use the following GRC context to answer the question. Be concise and accurate.
If the answer is not in the context, use your general knowledge but make it clear that you're providing general information.
For any compliance-related answers, mention the relevant regulation or standard.
Make sure to use the PCI-DSS standard and to look up your general knowledge base. When asked, always compare with it and other standards and cite which individual standard and article you're using. give percentages even if they're not completely sure give approximates. always try to give percentages
Context:
${relevantContext}

Question: ${query}`

    // Generate response using Gemini
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error processing query:", error)
    return "I'm sorry, I encountered an error while processing your query. Please try again."
  }
}
