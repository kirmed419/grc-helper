"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Download, FileText, GitCompare, PieChart, Plus } from "lucide-react"

type GapItem = {
  id: string
  requirement: string
  framework: string
  currentState: string
  targetState: string
  gapSize: "High" | "Medium" | "Low"
  remediation: string
}

const gapItems: GapItem[] = [
  {
    id: "GAP-001",
    requirement: "Data Encryption at Rest",
    framework: "PCI DSS",
    currentState: "Partial encryption of sensitive data",
    targetState: "Full encryption of all cardholder data",
    gapSize: "High",
    remediation: "Implement database encryption for all tables with PII",
  },
  {
    id: "GAP-002",
    requirement: "Access Control Reviews",
    framework: "ISO 27001",
    currentState: "Annual review of access rights",
    targetState: "Quarterly review of access rights",
    gapSize: "Medium",
    remediation: "Establish quarterly access review process",
  },
  {
    id: "GAP-003",
    requirement: "Incident Response Testing",
    framework: "SOC 2",
    currentState: "No formal testing of incident response",
    targetState: "Annual testing of incident response procedures",
    gapSize: "High",
    remediation: "Develop and implement annual IR testing program",
  },
  {
    id: "GAP-004",
    requirement: "Vendor Risk Assessments",
    framework: "GDPR",
    currentState: "Ad-hoc vendor assessments",
    targetState: "Formal vendor risk assessment program",
    gapSize: "Medium",
    remediation: "Implement vendor risk management platform",
  },
  {
    id: "GAP-005",
    requirement: "Security Awareness Training",
    framework: "PCI DSS",
    currentState: "Annual security training",
    targetState: "Quarterly security awareness training",
    gapSize: "Low",
    remediation: "Develop quarterly training modules",
  },
]

const frameworks = ["All", "PCI DSS", "GDPR", "ISO 27001", "SOC 2"]

export function GapAnalysis() {
  const [selectedFramework, setSelectedFramework] = useState("All")

  const filteredGaps =
    selectedFramework === "All" ? gapItems : gapItems.filter((item) => item.framework === selectedFramework)

  const gapsBySize = {
    High: filteredGaps.filter((item) => item.gapSize === "High").length,
    Medium: filteredGaps.filter((item) => item.gapSize === "Medium").length,
    Low: filteredGaps.filter((item) => item.gapSize === "Low").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gap Analysis</h1>
        <p className="text-muted-foreground">
          Identify and analyze gaps between current practices and regulatory requirements
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map((framework) => (
                <SelectItem key={framework} value={framework}>
                  {framework}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-1 bg-brand-red hover:bg-brand-darkRed">
            <Plus className="h-4 w-4" /> New Analysis
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gap Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredGaps.length} Gaps Identified</div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                  <span>High Priority</span>
                </div>
                <span>{gapsBySize.High}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Medium Priority</span>
                </div>
                <span>{gapsBySize.Medium}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Low Priority</span>
                </div>
                <span>{gapsBySize.Low}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Framework Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">PCI DSS</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">GDPR</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">ISO 27001</span>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SOC 2</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Gap List
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Visual Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Identified Gaps</CardTitle>
              <CardDescription>Gaps between current practices and regulatory requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Framework</TableHead>
                    <TableHead>Gap Size</TableHead>
                    <TableHead>Current State</TableHead>
                    <TableHead>Target State</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGaps.map((gap) => (
                    <TableRow key={gap.id}>
                      <TableCell className="font-medium">{gap.id}</TableCell>
                      <TableCell>{gap.requirement}</TableCell>
                      <TableCell>{gap.framework}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            gap.gapSize === "High"
                              ? "border-red-500 bg-red-50 text-red-700"
                              : gap.gapSize === "Medium"
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : "border-green-500 bg-green-50 text-green-700"
                          }
                        >
                          {gap.gapSize}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{gap.currentState}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{gap.targetState}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <GitCompare className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visual">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" /> Gap Distribution by Priority
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="relative h-48 w-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{filteredGaps.length}</div>
                      <div className="text-xs text-muted-foreground">Total Gaps</div>
                    </div>
                  </div>
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    {/* High priority slice - 40% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#dc2626"
                      strokeWidth="20"
                      strokeDasharray={`${(gapsBySize.High / filteredGaps.length) * 251.2} 251.2`}
                      transform="rotate(-90 50 50)"
                    />
                    {/* Medium priority slice - 40% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="20"
                      strokeDasharray={`${(gapsBySize.Medium / filteredGaps.length) * 251.2} 251.2`}
                      strokeDashoffset={`${-(gapsBySize.High / filteredGaps.length) * 251.2}`}
                      transform="rotate(-90 50 50)"
                    />
                    {/* Low priority slice - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeDasharray={`${(gapsBySize.Low / filteredGaps.length) * 251.2} 251.2`}
                      strokeDashoffset={`${-((gapsBySize.High + gapsBySize.Medium) / filteredGaps.length) * 251.2}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-red-600">{gapsBySize.High}</div>
                    <div className="text-xs text-muted-foreground">High</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-600">{gapsBySize.Medium}</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{gapsBySize.Low}</div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" /> Framework Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">PCI DSS</span>
                      <span className="text-xs text-muted-foreground">
                        {gapItems.filter((item) => item.framework === "PCI DSS").length} gaps
                      </span>
                    </div>
                    <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-red-500" style={{ width: "40%" }}></div>
                      <div className="h-full bg-amber-500" style={{ width: "20%" }}></div>
                      <div className="h-full bg-green-500" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">GDPR</span>
                      <span className="text-xs text-muted-foreground">
                        {gapItems.filter((item) => item.framework === "GDPR").length} gaps
                      </span>
                    </div>
                    <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
                      <div className="h-full bg-amber-500" style={{ width: "30%" }}></div>
                      <div className="h-full bg-green-500" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">ISO 27001</span>
                      <span className="text-xs text-muted-foreground">
                        {gapItems.filter((item) => item.framework === "ISO 27001").length} gaps
                      </span>
                    </div>
                    <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-red-500" style={{ width: "20%" }}></div>
                      <div className="h-full bg-amber-500" style={{ width: "40%" }}></div>
                      <div className="h-full bg-green-500" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">SOC 2</span>
                      <span className="text-xs text-muted-foreground">
                        {gapItems.filter((item) => item.framework === "SOC 2").length} gaps
                      </span>
                    </div>
                    <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-red-500" style={{ width: "30%" }}></div>
                      <div className="h-full bg-amber-500" style={{ width: "20%" }}></div>
                      <div className="h-full bg-green-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-red-500"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Low</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
