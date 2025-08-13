import { NextResponse } from "next/server"
import { getAllUsers } from "@/lib/db"

export async function GET() {
  try {
    const users = await getAllUsers()

    // Format users for admin dashboard
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user.raw_json as any)?.role || "student",
      status: "active",
      joinDate: user.created_at,
      lastActive: user.updated_at || user.created_at,
    }))

    return NextResponse.json({ users: formattedUsers })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
