import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json()

    // Basic validation
    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate user ID (in production, use proper UUID)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create user in database
    const result = await createUser({
      id: userId,
      email,
      name,
      role,
    })

    if (!result.success) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email,
        name,
        role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
