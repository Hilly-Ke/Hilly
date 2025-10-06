import { CourseMaterialUploader } from "@/components/upload/course-material-uploader"

export default function UploadPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Course Material Upload</h1>
      <CourseMaterialUploader />
    </div>
  )
}