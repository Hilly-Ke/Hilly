"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, ShieldCheck, GraduationCap, Sparkles } from "lucide-react"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/contexts/auth-context"
import { PageLayout } from "@/components/layout/page-layout"
import { CourseCard } from "@/components/courses/course-card"
import { courses as allCourses } from "@/lib/courses"

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <PageLayout currentPage="home">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Background gradient accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-32 h-64 w-64 md:h-96 md:w-96 rounded-full blur-3xl opacity-20 bg-primary" />
          <div className="absolute -bottom-24 -left-32 h-64 w-64 md:h-96 md:w-96 rounded-full blur-3xl opacity-10 bg-blue-300" />
        </div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
                  Your Gateway to
                  <span className="text-primary"> Knowledge</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Join thousands of learners in our comprehensive e-learning platform. Access expert-led courses,
                  connect with peers, and advance your career.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-gray-600 text-sm md:text-base">50,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-gray-600 text-sm md:text-base">500+ Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-gray-600 text-sm md:text-base">Expert Instructors</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 w-full sm:w-auto" asChild>
                  <a href="/courses">Start Learning Today</a>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <a href="#features">See Features</a>
                </Button>
              </div>
            </div>

            {!isAuthenticated ? (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mt-8 lg:mt-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl md:text-2xl font-serif">Create your free account</CardTitle>
                  <CardDescription>Join LearnHub in seconds</CardDescription>
                </CardHeader>
                <CardContent>
                  <RegisterForm />
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mt-8 lg:mt-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl md:text-2xl font-serif">Welcome Back!</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium truncate">{user?.name}</p>
                    <Badge variant="secondary" className="capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <a href="/dashboard">View Dashboard</a>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="/courses">Browse Courses</a>
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="/certificates">My Certificates</a>
                    </Button>
                    {user?.role === "administrator" && (
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <a href="/admin">Admin Dashboard</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">About LearnHub</h3>
              <p className="text-gray-700 leading-relaxed">
                LearnHub is an innovative e-learning platform designed to make high-quality education
                accessible, flexible, and engaging for students, working professionals, and lifelong learners.
                Built for Crystal Heights International School, it removes location barriers, supports
                different learning styles, and scales with modern educational needs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Accessible</Badge>
                <Badge variant="secondary">Flexible</Badge>
                <Badge variant="secondary">Scalable</Badge>
                <Badge variant="secondary">Community-driven</Badge>
              </div>
            </div>
            <div className="md:col-span-5 grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Learn Anywhere</CardTitle>
                  </div>
                  <CardDescription>Modern web experience across devices</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">Outcome-focused</CardTitle>
                  </div>
                  <CardDescription>Certificates and progress tracking</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 md:mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">Features</h3>
            <p className="text-gray-600 mt-2">Everything you need to learn effectively</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle>Rich Course Catalog</CardTitle>
                </div>
                <CardDescription>Explore expert-led courses across disciplines</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Curated modules with practical projects and real-world scenarios.
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Community & Discussions</CardTitle>
                </div>
                <CardDescription>Share insights and get feedback</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Engage in posts and votes to deepen understanding together.
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle>Progress & Certificates</CardTitle>
                </div>
                <CardDescription>Stay motivated and showcase achievements</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                Track your learning path and earn shareable certificates.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 md:mb-12 flex items-end justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">Featured Courses</h3>
              <p className="text-gray-600 mt-2">Kickstart your journey with popular picks</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <a href="/courses">View All Courses</a>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allCourses
              .filter((c) => c.featured)
              .slice(0, 3)
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <a href="/courses">View All Courses</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="py-8 md:py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-xl md:text-2xl font-serif font-semibold">Ready to start learning?</h4>
                  <p className="text-gray-600">Join LearnHub and transform your learning experience today.</p>
                </div>
                <Button size="lg" asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageLayout>
  )
}
