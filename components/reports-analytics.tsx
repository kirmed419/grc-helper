"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FileText, PieChart, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ReportsAnalytics() {
  const [selectedReport, setSelectedReport] = useState("Compliance")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate and analyze reports on governance, risk, and compliance activities
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <select
            className="flex h-10 w-auto items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="Compliance">Compliance Report</option>
            <option value="Policy">Policy Report</option>
            <option value="Risk">Risk Report</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" /> {selectedReport} Overview
            </CardTitle>
            <CardDescription>High-level summary of {selectedReport.toLowerCase()} data</CardDescription>
          </CardHeader>
          <CardContent>
            <div>{/* Placeholder for chart */}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" /> {selectedReport} Trends
            </CardTitle>
            <CardDescription>Historical trends and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div>{/* Placeholder for chart */}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Detailed {selectedReport} Report
          </CardTitle>
          <CardDescription>Comprehensive data and analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{/* Placeholder for table or detailed report */}</div>
        </CardContent>
      </Card>
    </div>
  )
}
