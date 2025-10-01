"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, Video, FileText, Code, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadFile extends File {
  id: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  preview?: string
}

interface FileUploadZoneProps {
  onFilesUploaded: (files: UploadFile[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  courseId?: string
  lessonId?: string
}

export function FileUploadZone({
  onFilesUploaded,
  acceptedTypes = ["video/*", "application/pdf", ".zip", ".js", ".py", ".html", ".css"],
  maxFiles = 10,
  courseId,
  lessonId,
}: FileUploadZoneProps) {
  const [files, setFiles] = useState<UploadFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        ...file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        progress: 0,
        status: "pending" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])
      uploadFiles(newFiles)
    },
    [courseId, lessonId],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
  })

  const uploadFiles = async (filesToUpload: UploadFile[]) => {
    for (const file of filesToUpload) {
      try {
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "uploading" } : f)))

        // Simulate upload progress
        const uploadPromise = simulateUpload(file, (progress) => {
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
        })

        await uploadPromise

        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "completed", progress: 100 } : f)))
      } catch (error) {
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "error" } : f)))
      }
    }

    onFilesUploaded(filesToUpload)
  }

  const simulateUpload = (file: UploadFile, onProgress: (progress: number) => void): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          resolve()
        }
        onProgress(progress)
      }, 200)
    })
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const getFileIcon = (file: UploadFile) => {
    if (file.type.startsWith("video/")) return <Video className="h-8 w-8 text-blue-500" />
    if (file.type === "application/pdf") return <FileText className="h-8 w-8 text-red-500" />
    if (file.name.endsWith(".zip") || file.name.endsWith(".js") || file.name.endsWith(".py"))
      return <Code className="h-8 w-8 text-green-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop files here" : "Upload Course Materials"}
            </h3>
            <p className="text-muted-foreground mb-4">Drag and drop files here, or click to select files</p>
            <p className="text-sm text-muted-foreground">
              Supports: Videos (MP4, WebM), PDFs, Code files (ZIP, JS, PY, HTML, CSS)
            </p>
            <Button variant="outline" className="mt-4 bg-transparent">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Upload Progress</h3>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {getFileIcon(file)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium truncate">{file.name}</span>
                      <div className="flex items-center gap-2">
                        {file.status === "completed" && <Check className="h-4 w-4 text-green-500" />}
                        {file.status === "error" && <X className="h-4 w-4 text-red-500" />}
                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)} className="h-6 w-6 p-0">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={file.progress} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-12">{Math.round(file.progress)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
