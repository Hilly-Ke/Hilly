"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, BookOpen, MessageSquare, Settings, Shield, ChevronLeft, ChevronRight } from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      badge: "8.4k",
    },
    {
      id: "courses",
      label: "Course Management",
      icon: BookOpen,
      badge: "156",
    },
    {
      id: "community",
      label: "Community Moderation",
      icon: MessageSquare,
      badge: "3",
    },
    {
      id: "settings",
      label: "System Settings",
      icon: Settings,
      badge: null,
    },
  ]

  return (
    <div className={`bg-white border-r transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-1">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${isCollapsed ? "px-2" : "px-3"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
