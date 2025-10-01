"use client"

import { useAuth } from "@/contexts/auth-context"
import { progressTracker } from "@/lib/progress-tracking"
import { mockCourses } from "@/lib/courses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseProgressCard } from "./course-progress-card"
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProgressDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Please log in to view your progress</p>
        </CardContent>
      </Card>
    )
  }

  const userProgress = progressTracker.getUserProgress(user.id)
  const stats = progressTracker.getProgressStats(user.id)

  const enrolledCourses = userProgress.coursesProgress
    .map((cp) => {
      const course = mockCourses.find((c) => c.id === cp.courseId)
      return course ? { course, progress: cp } : null
    })
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(stats.totalTimeSpent / 60)}h</div>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map(({ course, progress }) => (
              <CourseProgressCard
                key={course!.id}
                course={course!}
                progress={progress}
                onContinue={() => router.push(`/courses/${course!.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No courses enrolled yet. Browse our catalog to get started!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
