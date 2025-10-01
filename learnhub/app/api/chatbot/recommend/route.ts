import { type NextRequest, NextResponse } from "next/server"
import { recommendationEngine, type UserPreferences } from "@/lib/recommendation-engine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, preferences = {}, conversationHistory = [] } = body

    // Analyze the user's message to extract preferences
    const newPreferences = recommendationEngine.analyzeMessage(message, preferences)
    const updatedPreferences: UserPreferences = { ...preferences, ...newPreferences }

    // Generate response based on current conversation state
    const response = recommendationEngine.generateResponse(message, updatedPreferences, conversationHistory)

    return NextResponse.json({
      message: response.message,
      recommendations: response.recommendations || [],
      preferences: updatedPreferences,
      nextQuestion: response.nextQuestion,
    })
  } catch (error) {
    console.error("Chatbot API error:", error)
    return NextResponse.json(
      {
        message: "I'm sorry, I'm having trouble processing your request. Please try again.",
        recommendations: [],
        preferences: {},
      },
      { status: 500 },
    )
  }
}
