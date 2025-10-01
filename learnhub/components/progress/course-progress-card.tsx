"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "./progress-bar"
import { Clock, Award, BookOpen } from "lucide-react"
import type { CourseProgress } from "@/lib/progress-tracking"
import type { Course } from "@/lib/courses"

interface CourseProgressCardProps {
  course: Course
  progress: CourseProgress
  onContinue: () => void
}

export function CourseProgressCard({ course, progress, onContinue }: CourseProgressCardProps) {
  const completedLessons = progress.lessonsProgress.filter((lp) => lp.completed).length
  const totalTimeSpent = progress.lessonsProgress.reduce((total, lp) => total + lp.timeSpent, 0)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>
                  {completedLessons}/{course.lessons} lessons
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalTimeSpent}min spent</span>
              </div>
            </div>
          </div>
          {progress.certificateEarned && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Award className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressBar progress={progress.overallProgress} />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Last accessed: {progress.lastAccessedAt.toLocaleDateString()}
          </span>
          <Button onClick={onContinue} size="sm">
            {progress.overallProgress === 0 ? "Start Course" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
