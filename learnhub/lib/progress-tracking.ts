export interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: Date
  timeSpent: number // in minutes
  materialsCompleted: string[]
}

export interface CourseProgress {
  courseId: string
  userId: string
  enrolledAt: Date
  lastAccessedAt: Date
  overallProgress: number // percentage 0-100
  lessonsProgress: LessonProgress[]
  certificateEarned: boolean
  certificateEarnedAt?: Date
  totalLessons?: number
}

export interface UserProgress {
  userId: string
  coursesProgress: CourseProgress[]
  totalCoursesCompleted: number
  totalTimeSpent: number
  achievements: string[]
}

// Mock progress data storage (in real app, this would be in database)
const PROGRESS_STORAGE_KEY = "learnhub_progress"

export class ProgressTracker {
  private static instance: ProgressTracker
  private progressData: Map<string, UserProgress> = new Map()

  private constructor() {
    this.loadFromStorage()
  }

  static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker()
    }
    return ProgressTracker.instance
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY)
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.progressData = new Map(Object.entries(data))
        } catch (error) {
          console.error("Failed to load progress data:", error)
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      const data = Object.fromEntries(this.progressData)
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data))
    }
  }

  getUserProgress(userId: string): UserProgress {
    if (!this.progressData.has(userId)) {
      this.progressData.set(userId, {
        userId,
        coursesProgress: [],
        totalCoursesCompleted: 0,
        totalTimeSpent: 0,
        achievements: [],
      })
    }
    return this.progressData.get(userId)!
  }

  getCourseProgress(userId: string, courseId: string): CourseProgress | null {
    const userProgress = this.getUserProgress(userId)
    return userProgress.coursesProgress.find((cp) => cp.courseId === courseId) || null
  }

  enrollInCourse(userId: string, courseId: string, totalLessons?: number): void {
    const userProgress = this.getUserProgress(userId)
    const existingProgress = userProgress.coursesProgress.find((cp) => cp.courseId === courseId)

    if (!existingProgress) {
      const newCourseProgress: CourseProgress = {
        courseId,
        userId,
        enrolledAt: new Date(),
        lastAccessedAt: new Date(),
        overallProgress: 0,
        lessonsProgress: [],
        certificateEarned: false,
        totalLessons,
      }
      userProgress.coursesProgress.push(newCourseProgress)
      this.saveToStorage()
    }
  }

  updateLessonProgress(userId: string, courseId: string, lessonId: string, updates: Partial<LessonProgress>): void {
    const courseProgress = this.getCourseProgress(userId, courseId)
    if (!courseProgress) return

    let lessonProgress = courseProgress.lessonsProgress.find((lp) => lp.lessonId === lessonId)
    if (!lessonProgress) {
      lessonProgress = {
        lessonId,
        completed: false,
        timeSpent: 0,
        materialsCompleted: [],
      }
      courseProgress.lessonsProgress.push(lessonProgress)
    }

    Object.assign(lessonProgress, updates)

    if (updates.completed && !lessonProgress.completedAt) {
      lessonProgress.completedAt = new Date()
    }

    // Update overall course progress
    this.updateCourseProgress(userId, courseId)
    this.saveToStorage()
  }

  markMaterialCompleted(userId: string, courseId: string, lessonId: string, materialId: string): void {
    const courseProgress = this.getCourseProgress(userId, courseId)
    if (!courseProgress) return

    let lessonProgress = courseProgress.lessonsProgress.find((lp) => lp.lessonId === lessonId)
    if (!lessonProgress) {
      lessonProgress = {
        lessonId,
        completed: false,
        timeSpent: 0,
        materialsCompleted: [],
      }
      courseProgress.lessonsProgress.push(lessonProgress)
    }

    if (!lessonProgress.materialsCompleted.includes(materialId)) {
      lessonProgress.materialsCompleted.push(materialId)
    }

    this.updateCourseProgress(userId, courseId)
    this.saveToStorage()
  }

  private updateCourseProgress(userId: string, courseId: string): void {
    const courseProgress = this.getCourseProgress(userId, courseId)
    if (!courseProgress) return

    const totalLessons = courseProgress.lessonsProgress.length
    const completedLessons = courseProgress.lessonsProgress.filter((lp) => lp.completed).length

    const denominator = courseProgress.totalLessons && courseProgress.totalLessons > 0 ? courseProgress.totalLessons : totalLessons
    courseProgress.overallProgress = denominator > 0 ? Math.round((completedLessons / denominator) * 100) : 0
    courseProgress.lastAccessedAt = new Date()

    // Check if course is completed (100%)
    if (courseProgress.overallProgress >= 100 && !courseProgress.certificateEarned) {
      courseProgress.certificateEarned = true
      courseProgress.certificateEarnedAt = new Date()

      // Generate certificate
      const { certificateManager } = require("./certificates")
      const { mockCourses } = require("./courses")

      const course = mockCourses.find((c: any) => c.id === courseId)
      if (course) {
        certificateManager.generateCertificate(
          userId,
          courseId,
          course.title,
          "Student Name", // In real app, get from user data
          course.instructor,
          course.tags,
        )
      }

      // Update user's total completed courses
      const userProgress = this.getUserProgress(userId)
      userProgress.totalCoursesCompleted += 1
      userProgress.achievements.push(`Completed ${courseId}`)
    }
  }

  getProgressStats(userId: string): {
    totalCourses: number
    completedCourses: number
    inProgressCourses: number
    totalTimeSpent: number
    certificatesEarned: number
  } {
    const userProgress = this.getUserProgress(userId)
    const completedCourses = userProgress.coursesProgress.filter((cp) => cp.certificateEarned).length
    const inProgressCourses = userProgress.coursesProgress.filter(
      (cp) => !cp.certificateEarned && cp.overallProgress > 0,
    ).length
    const totalTimeSpent = userProgress.coursesProgress.reduce((total, cp) => {
      return total + cp.lessonsProgress.reduce((lessonTotal, lp) => lessonTotal + lp.timeSpent, 0)
    }, 0)

    return {
      totalCourses: userProgress.coursesProgress.length,
      completedCourses,
      inProgressCourses,
      totalTimeSpent,
      certificatesEarned: completedCourses,
    }
  }
}

export const progressTracker = ProgressTracker.getInstance()
