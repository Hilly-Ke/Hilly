"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleLoginSuccess = () => {
    const redirect = searchParams?.get("redirect") || "/dashboard"
    router.push(redirect)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-serif text-primary">LearnHub</h1>
          </div>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/" className="text-primary hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
