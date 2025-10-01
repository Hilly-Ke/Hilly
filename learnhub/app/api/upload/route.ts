import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const courseId = formData.get("courseId") as string
    const lessonId = formData.get("lessonId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob with organized folder structure
    const folderPath = courseId ? `courses/${courseId}` : "uploads"
    const fileName = `${folderPath}/${Date.now()}_${file.name}`

    const blob = await put(fileName, file, {
      access: "public",
    })

    const uploadedFile = {
      id: blob.url.split("/").pop() || `file_${Date.now()}`,
      name: file.name,
      url: blob.url,
      type: getFileType(file.name),
      size: file.size,
      uploadedAt: new Date(),
      courseId,
      lessonId,
    }

    return NextResponse.json(uploadedFile)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

function getFileType(filename: string): "video" | "pdf" | "code" | "image" {
  const ext = filename.toLowerCase().split(".").pop()
  switch (ext) {
    case "mp4":
    case "webm":
    case "mov":
      return "video"
    case "pdf":
      return "pdf"
    case "js":
    case "py":
    case "zip":
    case "html":
    case "css":
      return "code"
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image"
    default:
      return "pdf"
  }
}
