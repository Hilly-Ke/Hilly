"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type AuthState, AuthService, type UserRole } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: { name: string; email: string; password: string; role: UserRole }) => Promise<{
    success: boolean
    error?: string
  }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("learnhub_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        localStorage.removeItem("learnhub_user")
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    const result = await AuthService.login(email, password)

    if (result.success && result.user) {
      localStorage.setItem("learnhub_user", JSON.stringify(result.user))
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return { success: true }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: result.error }
    }
  }

  const register = async (userData: { name: string; email: string; password: string; role: UserRole }) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    const result = await AuthService.register(userData)

    if (result.success && result.user) {
      localStorage.setItem("learnhub_user", JSON.stringify(result.user))
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      })
      return { success: true }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: result.error }
    }
  }

  const logout = () => {
    AuthService.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
