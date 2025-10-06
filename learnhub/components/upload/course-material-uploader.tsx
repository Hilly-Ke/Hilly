"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploadZone } from "./file-upload-zone"
import { mockCourses } from "@/lib/courses"

interface UploadedMaterial {
  id: string
  name: string
  type: "video" | "pdf" | "code"
  url: string
  courseId: string
  lessonId: string
  title: string
  description: string
}

export function CourseMaterialUploader() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedLesson, setSelectedLesson] = useState("")
  const [materialTitle, setMaterialTitle] = useState("")
  const [materialDescription, setMaterialDescription] = useState("")
  const [uploadedMaterials, setUploadedMaterials] = useState<UploadedMaterial[]>([])

  const selectedCourseData = mockCourses.find((c) => c.id === selectedCourse)
  const availableLessons =
    selectedCourseData?.curriculum?.flatMap((module: any) =>
      module.lessons.map((lesson: any) => ({
        id: `${selectedCourse}-${module.id}-${lesson.id}`,
        title: `${module.title} - ${lesson.title}`,
      })),
    ) || []

  const handleFilesUploaded = (files: any[]) => {
    const newMaterials: UploadedMaterial[] = files.map((file) => ({
      id: file.id,
      name: file.name,
      type: file.type.startsWith("video/") ? "video" : file.type === "application/pdf" ? "pdf" : "code",
      url: `/uploads/${file.id}`,
      courseId: selectedCourse,
      lessonId: selectedLesson,
      title: materialTitle || file.name,
      description: materialDescription,
    }))

    setUploadedMaterials((prev) => [...prev, ...newMaterials])
  }

  const handleSaveMaterials = async () => {
    // In a real implementation, this would save to the database
    console.log("Saving materials:", uploadedMaterials)
    alert(`Successfully uploaded ${uploadedMaterials.length} materials!`)

    // Reset form
    setUploadedMaterials([])
    setMaterialTitle("")
    setMaterialDescription("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Course Materials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course and Lesson Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lesson">Select Lesson</Label>
              <Select value={selectedLesson} onValueChange={setSelectedLesson} disabled={!selectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a lesson" />
                </SelectTrigger>
                <SelectContent>
                  {availableLessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Material Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Material Title</Label>
              <Input
                id="title"
                value={materialTitle}
                onChange={(e) => setMaterialTitle(e.target.value)}
                placeholder="Enter material title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={materialDescription}
                onChange={(e) => setMaterialDescription(e.target.value)}
                placeholder="Enter material description"
                rows={3}
              />
            </div>
          </div>

          {/* File Upload Zone */}
          {selectedCourse && selectedLesson && (
            <FileUploadZone onFilesUploaded={handleFilesUploaded} courseId={selectedCourse} lessonId={selectedLesson} />
          )}

          {/* Save Button */}
          {uploadedMaterials.length > 0 && (
            <div className="flex justify-end">
              <Button onClick={handleSaveMaterials} size="lg">
                Save {uploadedMaterials.length} Material{uploadedMaterials.length !== 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Materials Preview */}
      {uploadedMaterials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{material.title}</h4>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {material.type.toUpperCase()} • {material.name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
