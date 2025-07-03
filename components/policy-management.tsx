"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search } from "lucide-react"

type Policy = {
  id: string
  name: string
  category: string
  status: "Approved" | "In Review" | "Non-Compliant"
  lastUpdated: string
  framework: string
}

const policies: Policy[] = [
  {
    id: "POL-001",
    name: "Data Retention Policy",
    category: "Data Management",
    status: "Approved",
    lastUpdated: "2025-05-15",
    framework: "GDPR",
  },
  {
    id: "POL-002",
    name: "Credit Card Processing",
    category: "Payment Processing",
    status: "Approved",
    lastUpdated: "2025-04-22",
    framework: "PCI DSS",
  },
  {
    id: "POL-003",
    name: "Incident Response Plan",
    category: "Security",
    status: "In Review",
    lastUpdated: "2025-06-01",
    framework: "ISO 27001",
  },
  {
    id: "POL-004",
    name: "Third-Party Risk Management",
    category: "Vendor Management",
    status: "Non-Compliant",
    lastUpdated: "2025-03-10",
    framework: "SOC 2",
  },
  {
    id: "POL-005",
    name: "Access Control Policy",
    category: "Security",
    status: "Approved",
    lastUpdated: "2025-05-28",
    framework: "PCI DSS",
  },
  {
    id: "POL-006",
    name: "Business Continuity Plan",
    category: "Operations",
    status: "In Review",
    lastUpdated: "2025-05-30",
    framework: "ISO 27001",
  },
]

export function PolicyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? policy.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(policies.map((policy) => policy.category)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Policy Management</h1>
        <p className="text-muted-foreground">Manage and monitor your organization's policies</p>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search policies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-red hover:bg-brand-darkRed">
                <Plus className="mr-2 h-4 w-4" /> Add Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Policy</DialogTitle>
                <DialogDescription>Create a new policy for your organization</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-id" className="text-right">
                    ID
                  </Label>
                  <Input id="policy-id" defaultValue="POL-007" className="col-span-3" readOnly />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-name" className="text-right">
                    Name
                  </Label>
                  <Input id="policy-name" placeholder="Enter policy name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-framework" className="text-right">
                    Framework
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PCI DSS">PCI DSS</SelectItem>
                      <SelectItem value="GDPR">GDPR</SelectItem>
                      <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                      <SelectItem value="SOC 2">SOC 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="policy-description" placeholder="Enter policy description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-brand-red hover:bg-brand-darkRed">
                  Save Policy
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policy Repository</CardTitle>
          <CardDescription>View and manage all organizational policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.id}</TableCell>
                  <TableCell>{policy.name}</TableCell>
                  <TableCell>{policy.category}</TableCell>
                  <TableCell>{policy.framework}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        policy.status === "Approved"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : policy.status === "In Review"
                            ? "border-amber-500 bg-amber-50 text-amber-700"
                            : "border-red-500 bg-red-50 text-red-700"
                      }
                    >
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredPolicies.length} of {policies.length} policies
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
