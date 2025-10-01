"use client"

import { ProgressDashboard } from "@/components/progress/progress-dashboard"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DashboardPage() {
  return (
    <PageLayout currentPage="dashboard" className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Learning Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </div>

        <ProgressDashboard />
      </div>
    </PageLayout>
  )
}
