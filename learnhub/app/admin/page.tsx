"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { UserManagementSection } from "@/components/admin/user-management"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function AdminPage() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "users":
        return <UserManagementSection />
      case "courses":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Course Management</h2>
              <p className="text-gray-600">Manage courses, instructors, and content</p>
            </div>
            <div className="text-center py-12 text-gray-500">Course management features coming soon...</div>
          </div>
        )
      case "community":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Community Moderation</h2>
              <p className="text-gray-600">Monitor and moderate community discussions</p>
            </div>
            <div className="text-center py-12 text-gray-500">Community moderation features coming soon...</div>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">System Settings</h2>
              <p className="text-gray-600">Configure platform settings and preferences</p>
            </div>
            <div className="text-center py-12 text-gray-500">System settings coming soon...</div>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }

  return (
    <ProtectedRoute requiredRole="administrator">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold font-serif text-primary">LearnHub Admin</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button variant="ghost" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

          <main className="flex-1 p-6">{renderContent()}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
