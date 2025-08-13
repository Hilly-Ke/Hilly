"use client"

import { useState, useMemo } from "react"
import { BookOpen } from "lucide-react"
import { CourseCard } from "@/components/courses/course-card"
import { CourseFilters } from "@/components/courses/course-filters"
import { mockCourses, filterCourses } from "@/lib/courses"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [sortBy, setSortBy] = useState("featured")

  const filteredCourses = useMemo(() => {
    return filterCourses(mockCourses, searchTerm, selectedCategory, selectedLevel, sortBy)
  }, [searchTerm, selectedCategory, selectedLevel, sortBy])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setSelectedLevel("All Levels")
    setSortBy("featured")
  }

  const handleEnroll = (courseId: string) => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      window.location.href = "/login"
      return
    }

    // Handle enrollment logic here
    console.log(`Enrolling in course ${courseId}`)
    alert("Enrollment successful! (This is a demo)")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-serif text-primary">LearnHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors">
                Home
              </a>
              <a href="/courses" className="text-primary font-medium">
                Courses
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                Community
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                  <Button variant="ghost" onClick={logout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <a href="/login">Sign In</a>
                  </Button>
                  <Button asChild>
                    <a href="/">Get Started</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-gray-900 mb-4">Course Catalog</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to help you master new skills and advance your
            career.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold font-serif">LearnHub</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and expert instruction.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Platform</h5>
              <div className="space-y-2 text-gray-400">
                <a href="/courses" className="block hover:text-white transition-colors">
                  Courses
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Community
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Instructors
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Pricing
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Support</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Connect</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
