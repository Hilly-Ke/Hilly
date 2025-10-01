"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/progress/progress-bar"
import { Star, Clock, Users, BookOpen, Play, Award } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { progressTracker } from "@/lib/progress-tracking"
import { useRouter } from "next/navigation"
import type { Course } from "@/lib/courses"

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [courseProgress, setCourseProgress] = useState<any>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      checkEnrollmentStatus()
    }
  }, [user, course.id])

  const checkEnrollmentStatus = async () => {
    if (!user) return

    try {
      const progress = progressTracker.getCourseProgress(user.id, course.id)
      setCourseProgress(progress)
      setIsEnrolled(progress !== null)
    } catch (error) {
      console.error("Error checking enrollment:", error)
    }
  }

  const handleEnrollClick = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    if (isEnrolled) {
      router.push(`/courses/${course.id}`)
    } else {
      setLoading(true)
      try {
        await onEnroll?.(course.id)
        progressTracker.enrollInCourse(user.id, course.id)
        const progress = progressTracker.getCourseProgress(user.id, course.id)
        setCourseProgress(progress)
        setIsEnrolled(true)
      } catch (error) {
        console.error("Enrollment error:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  const getButtonText = () => {
    if (!user) return "Enroll Now"
    if (!isEnrolled) return "Enroll Now"
    if (courseProgress?.certificateEarned) return "View Certificate"
    if (courseProgress?.overallProgress > 0) return "Continue Learning"
    return "Start Learning"
  }

  const getButtonIcon = () => {
    if (!user || !isEnrolled) return null
    if (courseProgress?.certificateEarned) return <Award className="h-4 w-4 mr-2" />
    return <Play className="h-4 w-4 mr-2" />
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.featured && (
          <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-primary text-xs">Featured</Badge>
        )}
        <div className="absolute top-2 md:top-3 right-2 md:right-3 flex gap-1 md:gap-2">
          <Badge variant="secondary" className="text-xs">
            {course.level}
          </Badge>
          {isEnrolled && courseProgress?.certificateEarned && (
            <Badge className="bg-green-600 hover:bg-green-700 text-xs">
              <Award className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Completed</span>
            </Badge>
          )}
          {isEnrolled && !courseProgress?.certificateEarned && courseProgress?.overallProgress > 0 && (
            <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">
              <span className="hidden sm:inline">In Progress</span>
              <span className="sm:hidden">Progress</span>
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
        <div className="space-y-3 md:space-y-4 flex-1">
          <div className="space-y-2">
            <h3 className="font-semibold text-base md:text-lg leading-tight line-clamp-2">{course.title}</h3>
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{course.description}</p>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="truncate">{course.instructor}</span>
          </div>

          {isEnrolled && courseProgress && (
            <div className="space-y-2">
              <ProgressBar progress={courseProgress.overallProgress} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {courseProgress.lessonsProgress?.filter((lp: any) => lp.completed).length || 0}/{course.lessons}{" "}
                  <span className="hidden sm:inline">lessons completed</span>
                  <span className="sm:hidden">done</span>
                </span>
                <span>{courseProgress.overallProgress}% complete</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span>({course.studentsEnrolled})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
              <span>
                {course.lessons} <span className="hidden sm:inline">lessons</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{course.studentsEnrolled} students</span>
              <span className="sm:hidden">{course.studentsEnrolled}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{course.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 md:pt-4 border-t mt-auto">
          {!isEnrolled ? (
            <div className="text-xs md:text-sm text-muted-foreground">Enroll Now</div>
          ) : (
            <div className="text-xs md:text-sm text-muted-foreground">
              <span className="hidden sm:inline">Enrolled</span>
              <span className="sm:hidden">Enrolled</span>
              {courseProgress?.enrolledAt && (
                <span className="hidden md:inline"> {new Date(courseProgress.enrolledAt).toLocaleDateString()}</span>
              )}
            </div>
          )}
          <Button
            onClick={handleEnrollClick}
            className="px-3 md:px-6 flex items-center text-xs md:text-sm"
            variant={isEnrolled ? "default" : "default"}
            disabled={loading}
            size="sm"
          >
            <span className="hidden sm:inline">{getButtonIcon()}</span>
            {loading ? "Processing..." : getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
