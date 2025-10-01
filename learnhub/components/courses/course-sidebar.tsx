"use client"

import { useState, useEffect } from "react"
import type { Course } from "@/lib/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { progressTracker } from "@/lib/progress-tracking"
import { ProgressBar } from "@/components/progress/progress-bar"
import { Play, FileText, Download, Award } from "lucide-react"

interface CourseSidebarProps {
  course: Course
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [courseProgress, setCourseProgress] = useState<any>(null)

  useEffect(() => {
    if (user) {
      const progress = progressTracker.getCourseProgress(user.id, course.id)
      setCourseProgress(progress)
    }
  }, [user, course.id])

  const handleEnroll = () => {
    if (!user) {
      alert("Please log in to enroll in courses")
      return
    }
    progressTracker.enrollInCourse(user.id, course.id, course.lessons)
    const progress = progressTracker.getCourseProgress(user.id, course.id)
    setCourseProgress(progress)
    alert(`Successfully enrolled in ${course.title}!`)
  }

  const isEnrolled = courseProgress !== null

  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-600">Free Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isEnrolled ? (
            <Button onClick={handleEnroll} className="w-full" size="lg">
              Enroll for Free
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-3">
                  Enrolled
                </Badge>
                {courseProgress?.certificateEarned && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 ml-2">
                    <Award className="h-3 w-3 mr-1" />
                    Certified
                  </Badge>
                )}
              </div>

              <ProgressBar progress={courseProgress?.overallProgress || 0} />

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  // Navigate to curriculum and trigger auto-start via query param
                  const url = `${pathname}?start=1`
                  router.push(url)
                }}
              >
                {courseProgress?.overallProgress === 0 ? "Start Learning" : "Continue Learning"}
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex justify-between">
              <span>Lessons:</span>
              <span>{course.lessons}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Level:</span>
              <span>{course.level}</span>
            </div>
            {isEnrolled && (
              <>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span>
                    {courseProgress?.lessonsProgress?.filter((lp: any) => lp.completed).length || 0}/{course.lessons}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span>{courseProgress?.overallProgress || 0}%</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Features */}
      <Card>
        <CardHeader>
          <CardTitle>What You'll Get</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Play className="h-5 w-5 text-primary" />
            <span>HD Video Lectures</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <span>Downloadable Resources</span>
          </div>
          <div className="flex items-center gap-3">
            <Download className="h-5 w-5 text-primary" />
            <span>Source Code & Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <span>Certificate of Completion</span>
          </div>
        </CardContent>
      </Card>

      {/* Instructor */}
      <Card>
        <CardHeader>
          <CardTitle>Instructor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h4 className="font-semibold">{course.instructor}</h4>
              <p className="text-sm text-muted-foreground">Expert Instructor</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Skills You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
