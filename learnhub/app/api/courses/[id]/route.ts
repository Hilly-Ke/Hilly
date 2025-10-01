import { NextResponse } from "next/server"
import { getCourseById } from "@/lib/db"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
    const numericId = Number.parseInt(id, 10)
    if (!Number.isFinite(numericId)) {
      return NextResponse.json({ error: "Invalid course id" }, { status: 400 })
    }

    const course = await getCourseById(numericId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}


