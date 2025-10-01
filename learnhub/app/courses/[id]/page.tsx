import { notFound } from "next/navigation"
import { mockCourses, type Course } from "@/lib/courses"
import { CourseContent } from "@/components/courses/course-content"
import { CourseHeader } from "@/components/courses/course-header"
import { CourseSidebar } from "@/components/courses/course-sidebar"
import { PageLayout } from "@/components/layout/page-layout"

interface CoursePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params
  let course = mockCourses.find((c) => c.id === id)

  // Try to fetch from API and transform to Course shape
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/courses/${id}`, { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      const transformed: Course = {
        id: (data.id ?? "").toString(),
        title: data.title ?? "Untitled Course",
        description: data.description ?? "",
        instructor: data.instructor ?? "LearnHub Instructor",
        category: data.category ?? "Web Development",
        level: (data.level as Course["level"]) ?? "Beginner",
        duration: data.duration ?? "10 weeks",
        rating: Number.isFinite(Number.parseFloat(data.rating)) ? Number.parseFloat(data.rating) : 4.5,
        studentsEnrolled: Number.isFinite(Number(data.students_count)) ? Number(data.students_count) : 0,
        image: data.image_url || "/placeholder.svg",
        tags: Array.isArray(data.tags) ? data.tags : [],
        lessons: Number.isFinite(Number(data.lessons)) ? Number(data.lessons) : course?.lessons || 0,
        lastUpdated: data.updated_at ? new Date(data.updated_at) : new Date(),
        featured: (Number.parseFloat(data.rating) || 0) >= 4.8,
      }
      course = transformed
    }
  } catch {}

  if (!course) {
    notFound()
  }

  return (
    <PageLayout currentPage="courses" showFooter={false} className="min-h-screen bg-background">
      <CourseHeader course={course} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseContent course={course} />
          </div>
          <div className="lg:col-span-1">
            <CourseSidebar course={course} />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
