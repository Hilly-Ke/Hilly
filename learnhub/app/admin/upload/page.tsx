import { ProtectedRoute } from "@/components/auth/protected-route"
import { CourseMaterialUploader } from "@/components/upload/course-material-uploader"

export default function UploadPage() {
  return (
    <ProtectedRoute requiredRole="administrator">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload Course Materials</h1>
          <p className="text-muted-foreground mt-2">Upload videos, PDFs, and code files for your courses</p>
        </div>

        <CourseMaterialUploader />
      </div>
    </ProtectedRoute>
  )
}
