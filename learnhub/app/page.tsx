"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award } from "lucide-react"
import { RegisterForm } from "@/components/auth/register-form"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const { isAuthenticated, user, logout } = useAuth()

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
              <a href="/" className="text-primary font-medium">
                Home
              </a>
              <a href="/courses" className="text-gray-600 hover:text-primary transition-colors">
                Courses
              </a>
              <a href="/community" className="text-gray-600 hover:text-primary transition-colors">
                Community
              </a>
              {user?.role === "administrator" && (
                <a href="/admin" className="text-gray-600 hover:text-primary transition-colors">
                  Admin
                </a>
              )}
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
                  <Button>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-bold font-serif text-gray-900 leading-tight">
                  Your Gateway to
                  <span className="text-primary"> Knowledge</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of learners in our comprehensive e-learning platform. Access expert-led courses,
                  connect with peers, and advance your career.
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">50,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">500+ Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-gray-600">Expert Instructors</span>
                </div>
              </div>

              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <a href="/courses">Start Learning Today</a>
              </Button>
            </div>

            {!isAuthenticated ? (
              <RegisterForm />
            ) : (
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif">Welcome Back!</CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium">{user?.name}</p>
                    <Badge variant="secondary" className="capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Continue Learning</Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href="/courses">Browse Courses</a>
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
    </div>
  )
}
