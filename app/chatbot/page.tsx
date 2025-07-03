import { DashboardLayout } from "@/components/dashboard-layout"
import { ChatbotInterface } from "@/components/chatbot-interface"

export default function ChatbotPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">GRC Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions about governance, risk, and compliance requirements for credit card transaction processing.
          </p>
        </div>
        <ChatbotInterface />
      </div>
    </DashboardLayout>
  )
}
