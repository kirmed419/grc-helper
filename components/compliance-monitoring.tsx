import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"

type ComplianceItem = {
  id: string
  requirement: string
  framework: string
  status: "Compliant" | "Non-Compliant" | "In Progress"
  dueDate: string
  assignedTo: string
}

const complianceItems: ComplianceItem[] = [
  {
    id: "PCI-1.1",
    requirement: "Maintain a firewall configuration",
    framework: "PCI DSS",
    status: "Compliant",
    dueDate: "2025-07-15",
    assignedTo: "Security Team",
  },
  {
    id: "PCI-3.2",
    requirement: "Protect stored cardholder data",
    framework: "PCI DSS",
    status: "Compliant",
    dueDate: "2025-07-15",
    assignedTo: "Data Team",
  },
  {
    id: "GDPR-5.1",
    requirement: "Data minimization",
    framework: "GDPR",
    status: "In Progress",
    dueDate: "2025-06-30",
    assignedTo: "Data Team",
  },
  {
    id: "ISO-A.9",
    requirement: "Access control",
    framework: "ISO 27001",
    status: "Non-Compliant",
    dueDate: "2025-06-15",
    assignedTo: "IT Team",
  },
  {
    id: "SOC-CC5.1",
    requirement: "Logical access security",
    framework: "SOC 2",
    status: "In Progress",
    dueDate: "2025-07-01",
    assignedTo: "Security Team",
  },
  {
    id: "PCI-6.1",
    requirement: "Patch management",
    framework: "PCI DSS",
    status: "Non-Compliant",
    dueDate: "2025-06-10",
    assignedTo: "IT Team",
  },
]

const frameworks = [
  {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    version: "4.0",
    compliance: 85,
    nextAudit: "2025-09-15",
  },
  {
    name: "GDPR",
    description: "General Data Protection Regulation",
    version: "2018",
    compliance: 78,
    nextAudit: "2025-08-01",
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    version: "2022",
    compliance: 82,
    nextAudit: "2025-10-30",
  },
  {
    name: "SOC 2",
    description: "Service Organization Control",
    version: "2017",
    compliance: 67,
    nextAudit: "2025-07-15",
  },
]

export function ComplianceMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Compliance Monitoring</h1>
        <p className="text-muted-foreground">Track and manage compliance with regulatory frameworks</p>
      </div>

      <Tabs defaultValue="requirements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        </TabsList>
        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>Track the status of individual compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Framework</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.requirement}</TableCell>
                      <TableCell>{item.framework}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "Compliant"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : item.status === "In Progress"
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : "border-red-500 bg-red-50 text-red-700"
                          }
                        >
                          {item.status === "Compliant" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {item.status === "In Progress" && <Clock className="mr-1 h-3 w-3" />}
                          {item.status === "Non-Compliant" && <XCircle className="mr-1 h-3 w-3" />}
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>{item.assignedTo}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frameworks">
          <div className="grid gap-4 md:grid-cols-2">
            {frameworks.map((framework) => (
              <Card key={framework.name}>
                <CardHeader>
                  <CardTitle>{framework.name}</CardTitle>
                  <CardDescription>{framework.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Version:</span>
                      <span>{framework.version}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Compliance Level:</span>
                        <span
                          className={
                            framework.compliance >= 80
                              ? "text-green-600"
                              : framework.compliance >= 70
                                ? "text-amber-600"
                                : "text-red-600"
                          }
                        >
                          {framework.compliance}%
                        </span>
                      </div>
                      <Progress
                        value={framework.compliance}
                        className={
                          framework.compliance >= 80
                            ? "bg-green-100"
                            : framework.compliance >= 70
                              ? "bg-amber-100"
                              : "bg-red-100"
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Next Audit:</span>
                      <span>{framework.nextAudit}</span>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        className="border-red-200 text-brand-red hover:bg-brand-lightRed hover:text-brand-darkRed"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Compliance Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-brand-lightRed p-4">
              <div className="flex">
                <AlertCircle className="mr-3 h-5 w-5 text-brand-red" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Critical Deadlines</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>PCI-6.1 Patch Management due in 3 days</li>
                      <li>ISO-A.9 Access Control due in 8 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-amber-50 p-4">
              <div className="flex">
                <Clock className="mr-3 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Upcoming Deadlines</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>GDPR-5.1 Data Minimization due in 17 days</li>
                      <li>SOC-CC5.1 Logical Access Security due in 18 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
