import { type NextRequest, NextResponse } from "next/server"
import { enrollInCourse } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await request.json()
    const courseId = Number.parseInt(params.id)

    if (!userId || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await enrollInCourse(userId, courseId)

    if (!result.success) {
      return NextResponse.json({ error: "Failed to enroll in course" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Enrollment error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
