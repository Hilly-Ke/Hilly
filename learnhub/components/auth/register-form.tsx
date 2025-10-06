"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as UserRole,
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Stronger password policy: ≥8 chars with letters and numbers
    const strongPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=\-{}[\]":;'`~<>,.?/\\|]{8,}$/
    if (!strongPass.test(formData.password)) {
      setError("Password must be at least 8 characters and include letters and numbers")
      return
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const result = await register(formData)
      if (result.success) {
        if (onSuccess) {
          onSuccess()
        } else {
          // Handle redirection after successful registration
          const redirect = searchParams?.get("redirect") || "/dashboard"
          router.push(redirect)
        }
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred during registration")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center px-4 md:px-6">
        <CardTitle className="text-xl md:text-2xl font-serif">Join LearnHub</CardTitle>
        <CardDescription className="text-sm md:text-base">Create your account and start learning</CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              disabled={isLoading}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Create a password"
              disabled={isLoading}
              className="text-sm md:text-base"
            />
          </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
          disabled={isLoading}
          className="text-sm md:text-base"
        />
      </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">I am a:</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="w-full p-2 md:p-3 border rounded-md text-sm md:text-base"
              disabled={isLoading}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <Button type="submit" className="w-full text-sm md:text-base py-2 md:py-3" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
