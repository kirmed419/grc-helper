"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  FileText,
  CheckSquare,
  GitCompare,
  MessageSquare,
  PieChart,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3 },
    { name: "Policies", href: "/policies", icon: FileText },
    { name: "Compliance", href: "/compliance", icon: CheckSquare },
    { name: "Gap Analysis", href: "/gap-analysis", icon: GitCompare },
    { name: "Chatbot", href: "/chatbot", icon: MessageSquare },
    { name: "Reports", href: "/reports", icon: PieChart },
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "lg:relative" : "relative",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-brand-red"></div>
            <h1 className="ml-2 text-xl font-bold text-gray-900">GRC Manager</h1>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-brand-lightRed text-brand-red"
                  : "text-gray-600 hover:bg-brand-lightRed hover:text-brand-red",
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  pathname === item.href ? "text-brand-red" : "text-gray-400 group-hover:text-brand-red",
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-red-100 text-red-800">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
      </div>
    </div>
  )
}
