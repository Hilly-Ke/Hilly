"use client"

import { useEffect, useMemo, useState } from "react"
import type { Course } from "@/lib/courses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, FileText, Clock, CheckCircle, Lock } from "lucide-react"
import { MaterialViewer } from "./material-viewer"
import { getMaterialsForLesson } from "@/lib/course-materials"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { progressTracker } from "@/lib/progress-tracking"

interface CourseContentProps {
  course: Course
}

// Mock lesson data based on course
const generateLessons = (course: Course) => {
  const lessons = []
  const lessonsPerModule = Math.ceil(course.lessons / 4)

  for (let module = 1; module <= 4; module++) {
    const moduleTitle = getModuleTitle(course.category, module)
    for (let lesson = 1; lesson <= lessonsPerModule && lessons.length < course.lessons; lesson++) {
      lessons.push({
        id: `${course.id}-${module}-${lesson}`,
        title: `${moduleTitle} - Lesson ${lesson}`,
        duration: `${Math.floor(Math.random() * 20) + 10} min`,
        type: Math.random() > 0.3 ? "video" : "reading",
        completed: Math.random() > 0.7,
        locked: lessons.length > 2, // First 3 lessons unlocked
        module: module,
      })
    }
  }
  return lessons
}

const getModuleTitle = (category: string, module: number) => {
  const modules: Record<string, string[]> = {
    "Web Development": ["HTML Basics", "CSS Styling", "JavaScript Fundamentals", "Advanced Topics"],
    "Data Science": ["Python Basics", "Data Analysis", "Visualization", "Machine Learning"],
    "Digital Marketing": ["Marketing Fundamentals", "SEO Strategies", "Social Media", "Analytics"],
    "Machine Learning": ["ML Foundations", "Algorithms", "Neural Networks", "Deep Learning"],
    "UX/UI Design": ["Design Principles", "User Research", "Prototyping", "Testing"],
    "Business Analytics": ["Data Fundamentals", "Excel Mastery", "SQL Queries", "Business Intelligence"],
    "Mobile Development": ["React Native Basics", "UI Components", "Navigation", "Publishing"],
    Cybersecurity: ["Security Basics", "Network Security", "Encryption", "Risk Management"],
  }
  return modules[category]?.[module - 1] || `Module ${module}`
}

export function CourseContent({ course }: CourseContentProps) {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [completedMaterials, setCompletedMaterials] = useState<Set<string>>(new Set())
  const lessons = useMemo(() => generateLessons(course), [course])

  // Compute locked lessons based on previous lesson completion from progressTracker
  const courseProgress = user ? progressTracker.getCourseProgress(user.id, course.id) : null
  const lockedLessons = useMemo(() => {
    const lockMap = new Map<string, boolean>()
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]
      if (i === 0) {
        lockMap.set(lesson.id, false)
        continue
      }
      const prevLesson = lessons[i - 1]
      const prevProgress = courseProgress?.lessonsProgress?.find((lp) => lp.lessonId === prevLesson.id)
      const isPrevCompleted = Boolean(prevProgress?.completed)
      lockMap.set(lesson.id, !isPrevCompleted)
    }
    return lockMap
  }, [lessons, courseProgress])

  // Auto-start on first unlocked lesson when start=1
  useEffect(() => {
    if (!searchParams) return
    const start = searchParams.get("start")
    if (start === "1" && !activeLesson) {
      const firstUnlocked = lessons.find((l) => !lockedLessons.get(l.id)) || lessons[0]
      setActiveLesson(firstUnlocked?.id || null)
    }
  }, [searchParams, lessons, lockedLessons, activeLesson])

  const modules = lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.module]) acc[lesson.module] = []
      acc[lesson.module].push(lesson)
      return acc
    },
    {} as Record<number, typeof lessons>,
  )

  const handleMaterialComplete = (materialId: string) => {
    setCompletedMaterials((prev) => new Set([...prev, materialId]))

    if (user && activeLesson) {
      progressTracker.markMaterialCompleted(user.id, course.id, activeLesson, materialId)
    }

    // If all video materials for this lesson are completed, mark lesson complete automatically
    if (activeLesson) {
      const materials = getMaterialsForLesson(activeLesson)
      const videoIds = materials.filter((m) => m.type === "video").map((m) => m.id)
      const allVideosDone = videoIds.every((id) => id === materialId || completedMaterials.has(id))
      if (videoIds.length > 0 && allVideosDone) {
        handleLessonComplete(activeLesson)
      }
    }
  }

  const handleLessonComplete = (lessonId: string) => {
    if (user) {
      progressTracker.updateLessonProgress(user.id, course.id, lessonId, {
        completed: true,
        timeSpent: Math.floor(Math.random() * 30) + 15, // Mock time spent
      })
    }

    // Auto-advance to next lesson
    const idx = lessons.findIndex((l) => l.id === lessonId)
    if (idx >= 0 && idx + 1 < lessons.length) {
      setActiveLesson(lessons[idx + 1].id)
    }
  }

  const activeLessonMaterials = activeLesson ? getMaterialsForLesson(activeLesson) : []

  return (
    <div className="space-y-6">
      {activeLesson && activeLessonMaterials.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Lesson Materials</h3>
            <div className="flex items-center gap-2">
              <Button onClick={() => handleLessonComplete(activeLesson)} variant="outline" size="sm">
                Mark as Complete
              </Button>
              {(() => {
                const cp = courseProgress
                const lp = cp?.lessonsProgress?.find((l) => l.lessonId === activeLesson)
                const isCompleted = Boolean(lp?.completed)
                return (
                  <Button
                    size="sm"
                    disabled={!isCompleted}
                    onClick={() => handleLessonComplete(activeLesson)}
                  >
                    Next Lesson
                  </Button>
                )
              })()}
            </div>
          </div>
          <MaterialViewer materials={activeLessonMaterials} onMaterialComplete={handleMaterialComplete} />
        </div>
      )}

      <Tabs defaultValue="curriculum" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum" className="space-y-4">
          <div className="space-y-4">
            {Object.entries(modules).map(([moduleNum, moduleLessons]) => (
              <Card key={moduleNum}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      Module {moduleNum}: {getModuleTitle(course.category, Number.parseInt(moduleNum))}
                    </span>
                    <Badge variant="outline">{moduleLessons.length} lessons</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {moduleLessons.map((lesson) => {
                    const isLocked = lockedLessons.get(lesson.id)
                    return (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                        isLocked ? "opacity-50" : ""
                      } ${activeLesson === lesson.id ? "bg-primary/10 border-primary" : ""}`}
                      onClick={() => !isLocked && setActiveLesson(lesson.id)}
                    >
                      <div className="flex items-center gap-3">
                        {isLocked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : lesson.type === "video" ? (
                          <Play className="h-4 w-4 text-primary" />
                        ) : (
                          <FileText className="h-4 w-4 text-primary" />
                        )}
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {!isLocked && (
                        <Button variant="ghost" size="sm">
                          {lesson.completed ? "Review" : activeLesson === lesson.id ? "Active" : "Start"}
                        </Button>
                      )}
                    </div>
                  )})}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {course.description} This comprehensive course will take you from beginner to advanced level, providing
                hands-on experience with real-world projects and industry best practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Master the fundamental concepts and principles</li>
                <li>• Build practical projects to reinforce learning</li>
                <li>• Understand industry best practices and standards</li>
                <li>• Develop problem-solving and critical thinking skills</li>
                <li>• Prepare for real-world applications and career opportunities</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold">U{review}</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Student {review}</h5>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent course! The instructor explains concepts clearly and the hands-on projects really helped
                    me understand the material better.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
