import { type NextRequest, NextResponse } from "next/server"
import { uploadCourseMaterial, addMaterialToCourse } from "@/lib/course-materials"
import { z } from "zod"

const UploadSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().or(z.literal("")),
  type: z.enum(["video", "pdf", "code", "assignment"]),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const courseId = formData.get("courseId") as string
    const lessonId = formData.get("lessonId") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const type = formData.get("type") as "video" | "pdf" | "code" | "assignment"

    const parsed = UploadSchema.safeParse({ courseId, lessonId, title, description, type })
    if (!file || !parsed.success) {
      return NextResponse.json({ error: "Invalid form data", issues: parsed.success ? undefined : parsed.error.format() }, { status: 400 })
    }

    const material = await uploadCourseMaterial(file, courseId, lessonId, {
      title,
      description,
      type,
    })

    if (!material) {
      return NextResponse.json({ error: "Failed to upload material" }, { status: 500 })
    }

    await addMaterialToCourse(courseId, material)

    return NextResponse.json({
      success: true,
      material,
    })
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
