import { NextResponse } from "next/server"
import { getAllCourses } from "@/lib/db"

export async function GET() {
  try {
    const courses = await getAllCourses()
    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
