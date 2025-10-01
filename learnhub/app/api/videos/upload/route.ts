import { type NextRequest, NextResponse } from "next/server"
import { videoHosting } from "@/lib/video-hosting"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("video") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const courseId = formData.get("courseId") as string
    const lessonId = formData.get("lessonId") as string

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 })
    }

    const videoMetadata = await videoHosting.uploadVideo(file, {
      title,
      description,
    })

    return NextResponse.json({
      success: true,
      video: videoMetadata,
      courseId,
      lessonId,
    })
  } catch (error) {
    return NextResponse.json({ error: "Video upload failed" }, { status: 500 })
  }
}
