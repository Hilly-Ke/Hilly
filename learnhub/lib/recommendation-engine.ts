import { type Course, courses } from "./courses"

export interface UserPreferences {
  experience?: "beginner" | "intermediate" | "advanced"
  interests?: string[]
  timeCommitment?: "light" | "moderate" | "intensive"
  goals?: "career-change" | "skill-upgrade" | "hobby" | "certification"
  learningStyle?: "practical" | "theoretical" | "mixed"
}

export interface ConversationContext {
  step: "greeting" | "experience" | "interests" | "time" | "budget" | "goals" | "recommendation"
  preferences: UserPreferences
  askedQuestions: string[]
}

export class RecommendationEngine {
  private courses: Course[]

  constructor() {
    this.courses = courses
  }

  // Analyze user message and extract preferences
  analyzeMessage(message: string, currentPreferences: UserPreferences): Partial<UserPreferences> {
    const lowerMessage = message.toLowerCase()
    const newPreferences: Partial<UserPreferences> = {}

    // Experience level detection
    if (lowerMessage.includes("beginner") || lowerMessage.includes("new to") || lowerMessage.includes("never done")) {
      newPreferences.experience = "beginner"
    } else if (
      lowerMessage.includes("intermediate") ||
      lowerMessage.includes("some experience") ||
      lowerMessage.includes("familiar with")
    ) {
      newPreferences.experience = "intermediate"
    } else if (
      lowerMessage.includes("advanced") ||
      lowerMessage.includes("expert") ||
      lowerMessage.includes("professional")
    ) {
      newPreferences.experience = "advanced"
    }

    // Interest detection
    const interestKeywords = {
      "web development": ["web", "website", "frontend", "backend", "html", "css", "javascript", "react"],
      "data science": ["data", "analytics", "python", "statistics", "machine learning", "ai"],
      "digital marketing": ["marketing", "seo", "social media", "advertising", "content"],
      design: ["design", "ui", "ux", "user experience", "interface", "figma"],
      mobile: ["mobile", "app", "android", "ios", "react native"],
      cybersecurity: ["security", "cyber", "hacking", "protection", "privacy"],
      business: ["business", "management", "analytics", "strategy", "leadership"],
      cloud: ["cloud", "aws", "azure", "devops", "infrastructure"],
    }

    const detectedInterests: string[] = []
    Object.entries(interestKeywords).forEach(([interest, keywords]) => {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        detectedInterests.push(interest)
      }
    })

    if (detectedInterests.length > 0) {
      newPreferences.interests = [...(currentPreferences.interests || []), ...detectedInterests]
    }

    // Time commitment detection
    if (lowerMessage.includes("busy") || lowerMessage.includes("part-time") || lowerMessage.includes("few hours")) {
      newPreferences.timeCommitment = "light"
    } else if (
      lowerMessage.includes("full-time") ||
      lowerMessage.includes("intensive") ||
      lowerMessage.includes("quickly")
    ) {
      newPreferences.timeCommitment = "intensive"
    } else if (lowerMessage.includes("moderate") || lowerMessage.includes("regular")) {
      newPreferences.timeCommitment = "moderate"
    }

    // Goals detection
    if (
      lowerMessage.includes("career change") ||
      lowerMessage.includes("new job") ||
      lowerMessage.includes("switch careers")
    ) {
      newPreferences.goals = "career-change"
    } else if (
      lowerMessage.includes("improve") ||
      lowerMessage.includes("upgrade") ||
      lowerMessage.includes("advance")
    ) {
      newPreferences.goals = "skill-upgrade"
    } else if (
      lowerMessage.includes("hobby") ||
      lowerMessage.includes("fun") ||
      lowerMessage.includes("personal interest")
    ) {
      newPreferences.goals = "hobby"
    } else if (
      lowerMessage.includes("certification") ||
      lowerMessage.includes("certificate") ||
      lowerMessage.includes("credential")
    ) {
      newPreferences.goals = "certification"
    }

    return newPreferences
  }

  // Generate contextual response based on conversation state
  generateResponse(
    message: string,
    preferences: UserPreferences,
    conversationHistory: any[],
  ): {
    message: string
    recommendations?: Course[]
    nextQuestion?: string
  } {
    const missingInfo = this.getMissingInformation(preferences)

    // If we have enough information, provide recommendations
    if (missingInfo.length === 0 || conversationHistory.length > 8) {
      const recommendations = this.getRecommendations(preferences)
      return {
        message: this.generateRecommendationMessage(preferences, recommendations),
        recommendations: recommendations.slice(0, 3), // Top 3 recommendations
      }
    }

    // Ask for missing information
    const nextQuestion = this.getNextQuestion(missingInfo[0], preferences)
    return {
      message: nextQuestion,
      nextQuestion: missingInfo[0],
    }
  }

  private getMissingInformation(preferences: UserPreferences): string[] {
    const missing: string[] = []

    if (!preferences.experience) missing.push("experience")
    if (!preferences.interests || preferences.interests.length === 0) missing.push("interests")
    if (!preferences.timeCommitment) missing.push("timeCommitment")
    if (!preferences.goals) missing.push("goals")

    return missing
  }

  private getNextQuestion(missingInfo: string, preferences: UserPreferences): string {
    switch (missingInfo) {
      case "experience":
        return "What's your experience level? Are you a complete beginner, have some experience, or would you consider yourself advanced?"

      case "interests":
        return "What areas are you most interested in? For example: web development, data science, digital marketing, UX/UI design, or something else?"

      case "timeCommitment":
        return "How much time can you dedicate to learning? Are you looking for something light (a few hours per week), moderate (5-10 hours per week), or intensive (15+ hours per week)?"

      case "goals":
        return "What's your main goal? Are you looking to change careers, upgrade your current skills, learn as a hobby, or get a certification?"

      default:
        return "Tell me more about what you're looking for in a course."
    }
  }

  private generateRecommendationMessage(preferences: UserPreferences, recommendations: Course[]): string {
    let message = "Based on your preferences, here are my top course recommendations:\n\n"

    if (preferences.experience) {
      message += `Since you're at a ${preferences.experience} level, `
    }

    if (preferences.goals) {
      const goalMessages = {
        "career-change": "these courses will help you transition to a new career",
        "skill-upgrade": "these courses will enhance your existing skills",
        hobby: "these courses are perfect for personal enrichment",
        certification: "these courses can help you earn valuable certifications",
      }
      message += goalMessages[preferences.goals] + ". "
    }

    if (recommendations.length === 0) {
      message =
        "I couldn't find courses that perfectly match your criteria, but let me show you some popular options that might interest you."
    }

    // Updated message to mention courses are free
    message +=
      "\n\nAll courses are completely free! Would you like more details about any of these courses, or would you like me to find alternatives?"

    return message
  }

  // Core recommendation algorithm
  getRecommendations(preferences: UserPreferences): Course[] {
    const scoredCourses = this.courses.map((course) => ({
      course,
      score: this.calculateCourseScore(course, preferences),
    }))

    // Sort by score (highest first)
    scoredCourses.sort((a, b) => b.score - a.score)

    // If interests exist, bias list so matching categories appear first even among similar scores
    const courseList = scoredCourses.map((item) => item.course)
    if (preferences.interests && preferences.interests.length > 0) {
      const interestSet = new Set(preferences.interests.map((i) => i.toLowerCase()))
      courseList.sort((a, b) => {
        const aMatch = interestSet.has(a.category.toLowerCase()) ? 1 : 0
        const bMatch = interestSet.has(b.category.toLowerCase()) ? 1 : 0
        return bMatch - aMatch
      })
    }
    return courseList
  }

  private calculateCourseScore(course: Course, preferences: UserPreferences): number {
    let score = 0

    // Experience level matching (high weight)
    if (preferences.experience) {
      if (course.level.toLowerCase() === preferences.experience) {
        score += 40
      } else if (
        (preferences.experience === "beginner" && course.level === "Intermediate") ||
        (preferences.experience === "intermediate" && course.level === "Advanced")
      ) {
        score += 20 // Adjacent levels get partial credit
      }
    }

    // Interest matching (high weight)
    if (preferences.interests && preferences.interests.length > 0) {
      const courseCategory = course.category.toLowerCase()
      const courseTags = course.tags.map((tag) => tag.toLowerCase())

      for (const interest of preferences.interests) {
        if (courseCategory.includes(interest) || courseTags.some((tag) => tag.includes(interest))) {
          score += 35
        }
      }
    }

    // Time commitment matching (medium weight)
    if (preferences.timeCommitment) {
      const courseDurationWeeks = this.extractWeeksFromDuration(course.duration)

      if (preferences.timeCommitment === "light" && courseDurationWeeks <= 10) {
        score += 15
      } else if (preferences.timeCommitment === "moderate" && courseDurationWeeks >= 8 && courseDurationWeeks <= 14) {
        score += 15
      } else if (preferences.timeCommitment === "intensive" && courseDurationWeeks >= 12) {
        score += 15
      }
    }

    // Quality indicators (low weight but important)
    score += course.rating * 3 // Rating out of 5, so max 15 points
    score += Math.min(course.studentsEnrolled / 100, 10) // Popular courses get bonus, max 10 points

    if (course.featured) {
      score += 5 // Featured courses get small bonus
    }

    return score
  }

  private extractWeeksFromDuration(duration: string): number {
    const match = duration.match(/(\d+)\s*weeks?/i)
    return match ? Number.parseInt(match[1]) : 12 // Default to 12 weeks if can't parse
  }

  // Get follow-up questions for refinement
  getFollowUpQuestions(preferences: UserPreferences): string[] {
    const questions: string[] = []

    if (!preferences.learningStyle) {
      questions.push("Do you prefer hands-on practical learning or more theoretical approaches?")
    }

    if (preferences.interests && preferences.interests.length > 1) {
      questions.push("Which of these interests is most important to you right now?")
    }

    return questions
  }
}

export const recommendationEngine = new RecommendationEngine()
