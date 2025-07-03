import { DashboardLayout } from "@/components/dashboard-layout"
import { PolicyManagement } from "@/components/policy-management"

export default function PoliciesPage() {
  return (
    <DashboardLayout>
      <PolicyManagement />
    </DashboardLayout>
  )
}
