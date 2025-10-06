export type UserRole = "student" | "teacher" | "administrator"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
  lastLogin?: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user database
const mockUsers: Array<User & { password: string; failedAttempts: number; lockedUntil?: Date }> = [
  {
    id: "1",
    name: "John Student",
    email: "student@learnhub.com",
    password: "password123",
    role: "student",
    createdAt: new Date(),
    failedAttempts: 0,
  },
  {
    id: "2",
    name: "Sarah Teacher",
    email: "teacher@learnhub.com",
    password: "password123",
    role: "teacher",
    createdAt: new Date(),
    failedAttempts: 0,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@learnhub.com",
    password: "password123",
    role: "administrator",
    createdAt: new Date(),
    failedAttempts: 0,
  },
]

const MAX_FAILED_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export class AuthService {
  static async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userRecord = mockUsers.find((u) => u.email === email)

    if (!userRecord) {
      return { success: false, error: "Invalid email or password" }
    }

    // Check if account is locked
    if (userRecord.lockedUntil && userRecord.lockedUntil > new Date()) {
      const remainingTime = Math.ceil((userRecord.lockedUntil.getTime() - Date.now()) / 60000)
      return {
        success: false,
        error: `Account locked. Try again in ${remainingTime} minutes.`,
      }
    }

    // Reset lock if expired
    if (userRecord.lockedUntil && userRecord.lockedUntil <= new Date()) {
      userRecord.lockedUntil = undefined
      userRecord.failedAttempts = 0
    }

    if (userRecord.password !== password) {
      userRecord.failedAttempts++

      if (userRecord.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        userRecord.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION)
        return {
          success: false,
          error: "Too many failed attempts. Account locked for 15 minutes.",
        }
      }

      return {
        success: false,
        error: `Invalid email or password. ${MAX_FAILED_ATTEMPTS - userRecord.failedAttempts} attempts remaining.`,
      }
    }

    // Successful login
    userRecord.failedAttempts = 0
    userRecord.lockedUntil = undefined
    userRecord.lastLogin = new Date()

    const { password: _, failedAttempts: __, lockedUntil: ___, ...user } = userRecord

    // Set a simple auth cookie so middleware allows protected routes
    if (typeof document !== "undefined") {
      const sevenDays = 7 * 24 * 60 * 60
      // SameSite=Lax mitigates CSRF on navigations; add Secure in production envs
      const secure = location.protocol === "https:" ? "; Secure" : ""
      document.cookie = `auth_token=${encodeURIComponent(user.id)}; Max-Age=${sevenDays}; Path=/; SameSite=Lax${secure}`
    }

    return { success: true, user }
  }

  static async register(userData: {
    name: string
    email: string
    password: string
    role: UserRole
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers.find((u) => u.email === userData.email)) {
      return { success: false, error: "Email already registered" }
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      createdAt: new Date(),
      failedAttempts: 0,
    }

    mockUsers.push(newUser)

    const { password: _, failedAttempts: __, ...user } = newUser

    if (typeof document !== "undefined") {
      const sevenDays = 7 * 24 * 60 * 60
      const secure = location.protocol === "https:" ? "; Secure" : ""
      document.cookie = `auth_token=${encodeURIComponent(user.id)}; Max-Age=${sevenDays}; Path=/; SameSite=Lax${secure}`
    }

    return { success: true, user }
  }

  static logout(): void {
    // Clear any stored session data
    if (typeof window !== "undefined") {
      localStorage.removeItem("learnhub_user")
    }
    if (typeof document !== "undefined") {
      document.cookie = "auth_token=; Max-Age=0; Path=/"
    }
  }
}
