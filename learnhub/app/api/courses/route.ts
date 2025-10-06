import { NextResponse } from "next/server"
import { getAllCourses } from "@/lib/db"

export const dynamic = 'force-dynamic' // Disable static optimization for this route

export async function GET() {
  try {
    const courses = await getAllCourses()
    
    // Ensure we don't have duplicate courses by using a Map with course IDs as keys
    const uniqueCoursesMap = new Map()
    
    courses.forEach(course => {
      const courseId = course.id.toString()
      if (!uniqueCoursesMap.has(courseId)) {
        uniqueCoursesMap.set(courseId, course)
      }
    })
    
    const uniqueCourses = Array.from(uniqueCoursesMap.values())
    
    // Set cache control headers to prevent browser caching
    const response = NextResponse.json({ courses: uniqueCourses })
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
