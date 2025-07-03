import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Clock, FileWarning, ShieldAlert } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">GRC Dashboard</h1>
        <p className="text-muted-foreground">Monitor your governance, risk, and compliance activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliant Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">78%</div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-brand-red">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Medium</div>
              <ShieldAlert className="h-5 w-5 text-brand-red" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <FileWarning className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="compliance"
            className="data-[state=active]:bg-brand-lightRed data-[state=active]:text-brand-red"
          >
            Compliance Status
          </TabsTrigger>
          <TabsTrigger
            value="policies"
            className="data-[state=active]:bg-brand-lightRed data-[state=active]:text-brand-red"
          >
            Policy Status
          </TabsTrigger>
          <TabsTrigger
            value="risks"
            className="data-[state=active]:bg-brand-lightRed data-[state=active]:text-brand-red"
          >
            Risk Overview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">PCI DSS</div>
                  <div className="text-sm text-muted-foreground">92%</div>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">GDPR</div>
                  <div className="text-sm text-muted-foreground">78%</div>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">ISO 27001</div>
                  <div className="text-sm text-muted-foreground">85%</div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">SOC 2</div>
                  <div className="text-sm text-muted-foreground">67%</div>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Policy Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-green-50 p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">42</div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">8</div>
                    <div className="text-sm text-muted-foreground">In Review</div>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-muted-foreground">Non-Compliant</div>
                  </div>
                </div>
                <div className="rounded-md bg-amber-50 p-3">
                  <div className="flex">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    <div className="text-sm text-amber-800">4 policies require review before the end of the month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Risk by Severity</div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="rounded bg-red-100 p-2">
                        <div className="text-lg font-bold text-red-700">5</div>
                        <div className="text-xs">High</div>
                      </div>
                      <div className="rounded bg-amber-100 p-2">
                        <div className="text-lg font-bold text-amber-700">12</div>
                        <div className="text-xs">Medium</div>
                      </div>
                      <div className="rounded bg-yellow-100 p-2">
                        <div className="text-lg font-bold text-yellow-700">8</div>
                        <div className="text-xs">Low</div>
                      </div>
                      <div className="rounded bg-green-100 p-2">
                        <div className="text-lg font-bold text-green-700">23</div>
                        <div className="text-xs">Mitigated</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Risk by Category</div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="rounded bg-blue-100 p-2">
                        <div className="text-lg font-bold text-blue-700">14</div>
                        <div className="text-xs">Operational</div>
                      </div>
                      <div className="rounded bg-purple-100 p-2">
                        <div className="text-lg font-bold text-purple-700">9</div>
                        <div className="text-xs">Technical</div>
                      </div>
                      <div className="rounded bg-indigo-100 p-2">
                        <div className="text-lg font-bold text-indigo-700">11</div>
                        <div className="text-xs">Compliance</div>
                      </div>
                      <div className="rounded bg-pink-100 p-2">
                        <div className="text-lg font-bold text-pink-700">7</div>
                        <div className="text-xs">Financial</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md bg-red-50 p-3">
                  <div className="flex">
                    <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                    <div className="text-sm text-red-800">2 high-risk items require immediate attention</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
