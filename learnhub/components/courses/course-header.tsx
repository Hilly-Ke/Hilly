import type { Course } from "@/lib/courses"
import { Star, Users, Clock, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" asChild>
            <a href="/courses" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{course.studentsEnrolled.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated {course.lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
