"use client"

import { useState, useMemo, useEffect } from "react"
import { CourseCard } from "@/components/courses/course-card"
import { CourseFilters } from "@/components/courses/course-filters"
import { CourseRecommendationChatbot } from "@/components/chatbot/course-recommendation-chatbot"
import { filterCourses, type Course, courses as mockCourses } from "@/lib/courses"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"

export default function CoursesPage() {
  const { isAuthenticated, user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Use Next.js cache: no-store to prevent caching
        const response = await fetch('/api/courses', {
          cache: 'no-store',
          next: { revalidate: 0 },
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        
        // Always use mockCourses for now to ensure exactly 10 courses
        // This is a temporary fix until the API is stable
        setCourses(mockCourses)
        
        /* Commenting out API data handling to fix duplicate issues
        if (!response.ok) {
          setCourses(mockCourses)
          return
        }
        
        const data = await response.json()
        if (Array.isArray(data.courses) && data.courses.length > 0) {
          // Create a Map to track unique course IDs to prevent duplicates
          const uniqueCoursesMap = new Map()
          
          data.courses.forEach((course: any) => {
            const courseId = (course.id ?? "").toString()
            if (!uniqueCoursesMap.has(courseId)) {
              uniqueCoursesMap.set(courseId, {
                id: courseId,
                title: course.title ?? "Untitled Course",
                description: course.description ?? "",
                instructor: course.instructor ?? "LearnHub Instructor",
                category: course.category ?? "Web Development",
                level: (course.level as Course["level"]) ?? "Beginner",
                duration: course.duration ?? "10 weeks",
                rating: Number.isFinite(Number.parseFloat(course.rating)) ? Number.parseFloat(course.rating) : 4.5,
                studentsEnrolled: Number.isFinite(Number(course.students_count)) ? Number(course.students_count) : 0,
                image: course.image_url || "/placeholder.svg",
                tags: Array.isArray(course.tags) ? course.tags : [],
                lessons: Number.isFinite(Number(course.lessons)) ? Number(course.lessons) : 0,
                lastUpdated: course.updated_at ? new Date(course.updated_at) : new Date(),
                featured: (Number.parseFloat(course.rating) || 0) >= 4.8,
              })
            }
          })
          
          const transformedCourses = Array.from(uniqueCoursesMap.values()) as Course[]
          setCourses(transformedCourses)
        } else {
          setCourses(mockCourses)
        }
        */
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        setCourses(mockCourses)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = useMemo(() => {
    return filterCourses(courses, searchTerm, selectedCategory, selectedLevel, sortBy)
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setSelectedLevel("All Levels")
    setSortBy("featured")
  }

  const handleEnroll = async (courseId: string) => {
    if (!isAuthenticated || !user) {
      window.location.href = "/login"
      return
    }

    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      if (response.ok) {
        alert("Enrollment successful!")
      } else {
        alert("Enrollment failed. Please try again.")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      alert("Enrollment failed. Please try again.")
    }
  }

  if (loading) {
    return (
      <PageLayout currentPage="courses">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="h-12 w-12 bg-primary rounded-full mx-auto mb-4 animate-pulse flex items-center justify-center">
              <span className="text-white font-bold">📚</span>
            </div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout currentPage="courses">
      {/* Page Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4">Course Catalog</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to help you master new skills and advance your
            career.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 md:mb-8">
          <CourseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredCourses.length}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Course Recommendation Chatbot */}
      <CourseRecommendationChatbot />
    </PageLayout>
  )
}
