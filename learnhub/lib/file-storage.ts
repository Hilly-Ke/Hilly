import { put, del, list } from "@vercel/blob"

export interface UploadedFile {
  id: string
  name: string
  url: string
  type: "video" | "pdf" | "code" | "image"
  size: number
  uploadedAt: Date
  courseId?: string
  lessonId?: string
}

export interface FileUploadResult {
  success: boolean
  file?: UploadedFile
  error?: string
}

// File storage service using real Vercel Blob integration
class FileStorageService {
  async uploadFile(file: File, metadata?: { courseId?: string; lessonId?: string }): Promise<FileUploadResult> {
    try {
      // Upload to Vercel Blob with organized folder structure
      const folderPath = metadata?.courseId ? `courses/${metadata.courseId}` : "uploads"
      const fileName = `${folderPath}/${Date.now()}_${file.name}`

      const blob = await put(fileName, file, {
        access: "public",
      })

      const uploadedFile: UploadedFile = {
        id: blob.url.split("/").pop() || `file_${Date.now()}`,
        name: file.name,
        url: blob.url, // Real Vercel Blob URL
        type: this.getFileType(file.name),
        size: file.size,
        uploadedAt: new Date(),
        ...metadata,
      }

      return {
        success: true,
        file: uploadedFile,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }
    }
  }

  async getFile(fileId: string): Promise<UploadedFile | null> {
    try {
      const { blobs } = await list()
      const blob = blobs.find((b) => b.url.includes(fileId))

      if (!blob) return null

      return {
        id: fileId,
        name: blob.pathname.split("/").pop() || "unknown",
        url: blob.url,
        type: this.getFileType(blob.pathname),
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }
    } catch (error) {
      return null
    }
  }

  async getFilesByLesson(lessonId: string): Promise<UploadedFile[]> {
    try {
      const { blobs } = await list()

      return blobs
        .filter((blob) => blob.pathname.includes(lessonId))
        .map((blob) => ({
          id: blob.url.split("/").pop() || "unknown",
          name: blob.pathname.split("/").pop() || "unknown",
          url: blob.url,
          type: this.getFileType(blob.pathname),
          size: blob.size,
          uploadedAt: blob.uploadedAt,
        }))
    } catch (error) {
      return []
    }
  }

  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      await del(fileUrl)
      return true
    } catch (error) {
      return false
    }
  }

  private getFileType(filename: string): UploadedFile["type"] {
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
}

export const fileStorage = new FileStorageService()

// API endpoints for file operations
export async function uploadCourseFile(formData: FormData): Promise<FileUploadResult> {
  const file = formData.get("file") as File
  const courseId = formData.get("courseId") as string
  const lessonId = formData.get("lessonId") as string

  if (!file) {
    return { success: false, error: "No file provided" }
  }

  return await fileStorage.uploadFile(file, { courseId, lessonId })
}
