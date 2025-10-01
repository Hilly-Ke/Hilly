"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react"
import type { Course } from "@/lib/courses"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  recommendations?: Course[]
}

interface UserPreferences {
  experience?: string
  interests?: string[]
  timeCommitment?: string
  budget?: string
  goals?: string
}

export function CourseRecommendationChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your course recommendation assistant. I'll help you find the perfect course based on your interests, experience level, and goals. What would you like to learn?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chatbot/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          preferences: userPreferences,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.message,
        timestamp: new Date(),
        recommendations: data.recommendations,
      }

      setMessages((prev) => [...prev, botMessage])

      if (data.preferences) {
        setUserPreferences((prev) => ({ ...prev, ...data.preferences }))
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, I'm having trouble processing your request. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content:
          "Hi! I'm your course recommendation assistant. I'll help you find the perfect course based on your interests, experience level, and goals. What would you like to learn?",
        timestamp: new Date(),
      },
    ])
    setUserPreferences({})
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] md:w-96">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-full">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-lg font-semibold">Course Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 hover:bg-white/20 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.type === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>

                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="ml-11 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Recommended Courses:</p>
                    {message.recommendations.map((course) => (
                      <Card key={course.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 truncate">{course.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {course.instructor} • {course.duration}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {course.level}
                              </Badge>
                              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                Free
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-gray-50/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about courses..."
                className="flex-1 border-gray-200 focus:border-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="px-3 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
