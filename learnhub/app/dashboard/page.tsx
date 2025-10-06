"use client"

import { ProgressDashboard } from "@/components/progress/progress-dashboard"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { CourseMaterialUploader } from "@/components/upload/course-material-uploader"
import { CourseCreator } from "@/components/upload/course-creator"

export default function DashboardPage() {
  const { user } = useAuth()

  const role = user?.role || "student"

  const Header = (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Personalized workspace for your role</p>
      </div>
      <Button variant="outline" asChild>
        <a href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </a>
      </Button>
    </div>
  )

  const StudentView = (
    <div className="space-y-6">
      {Header}
      <ProgressDashboard />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Browse and enroll in new courses.</p>
            <Button asChild>
              <a href="/courses">Explore Courses</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Certification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">View and download your certificates.</p>
            <Button variant="secondary" asChild>
              <a href="/certificates">Go to Certificates</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Share feedback and discuss in community.</p>
            <Button variant="outline" asChild>
              <a href="/community">Open Community</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const TeacherView = (
    <div className="space-y-6">
      {Header}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseCreator />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Add Course Material</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseMaterialUploader />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Review lessons and update materials.</p>
            <Button asChild>
              <a href="/courses">Open Courses</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assess Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">View student posts and feedback.</p>
            <Button variant="outline" asChild>
              <a href="/community">Open Community</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const AdminView = (
    <div className="space-y-6">
      {Header}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseCreator />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Suspend, activate and assign roles.</p>
            <Button asChild>
              <a href="/admin">Open Admin</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Upload and remove courses/materials.</p>
            <Button variant="secondary" asChild>
              <a href="/admin">Go to Console</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Monitor usage, growth and activity.</p>
            <Button variant="outline" asChild>
              <a href="/admin">View Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <PageLayout currentPage="dashboard" className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {role === "administrator" ? AdminView : role === "teacher" ? TeacherView : StudentView}
      </div>
    </PageLayout>
  )
}
