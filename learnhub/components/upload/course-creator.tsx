"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { courseCategories, addNewCourse } from "@/lib/courses"
import { FileUploadZone } from "./file-upload-zone"
import { useToast } from "@/components/ui/use-toast"

export function CourseCreator() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    duration: "",
    tags: "",
  })
  const [courseImage, setCourseImage] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (files: any[]) => {
    if (files.length > 0) {
      setCourseImage(files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would save to the database
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a new course object
      const newCourse = {
        id: `course-${Date.now()}`,
        title: courseData.title,
        description: courseData.description,
        instructor: user?.name || "Anonymous Instructor",
        category: courseData.category,
        level: courseData.level,
        duration: courseData.duration,
        rating: 0,
        studentsEnrolled: 0,
        image: courseImage ? "/placeholder.jpg" : "/placeholder.jpg", // In a real app, would upload the image
        tags: courseData.tags.split(",").map((tag) => tag.trim()),
        lessons: 0,
        lastUpdated: new Date(),
        featured: false,
      }

      // Add the course to the mockCourses array
      addNewCourse(newCourse)
      
      console.log("New course created:", newCourse)

      // Show success message
      toast({
        title: "Course Created",
        description: "Your course has been successfully created and added to the courses page.",
      })

      // Reset form
      setCourseData({
        title: "",
        description: "",
        category: "",
        level: "Beginner",
        duration: "",
        tags: "",
      })
      setCourseImage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={courseData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {courseCategories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              placeholder="Enter course description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={courseData.level}
                onValueChange={(value) => handleSelectChange("level", value as "Beginner" | "Intermediate" | "Advanced")}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 8 weeks"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={courseData.tags}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript, React, Web"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Course Image</Label>
            <FileUploadZone
              onFilesUploaded={handleImageUpload}
              acceptedTypes={["image/*"]}
              maxFiles={1}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating Course..." : "Create Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}