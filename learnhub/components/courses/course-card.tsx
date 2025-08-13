"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, BookOpen } from "lucide-react"
import type { Course } from "@/lib/courses"

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">{course.level}</Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{course.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span>{course.instructor}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span>({course.studentsEnrolled})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsEnrolled} students</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-2xl font-bold text-primary">${course.price}</div>
            <Button onClick={() => onEnroll?.(course.id)} className="px-6">
              Enroll Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
