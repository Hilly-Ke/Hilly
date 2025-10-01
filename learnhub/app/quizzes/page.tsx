"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Clock, Layers } from "lucide-react"

interface Quiz {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  questions: number
  tags: string[]
}

const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    title: "HTML & CSS Basics",
    description: "Test your fundamentals of building web pages",
    level: "Beginner",
    duration: "15 min",
    questions: 16,
    tags: ["HTML", "CSS", "Responsive"],
  },
  {
    id: "q2",
    title: "JavaScript Essentials",
    description: "Core JS concepts including scope, arrays, and objects",
    level: "Intermediate",
    duration: "20 min",
    questions: 18,
    tags: ["JavaScript", "ES6"],
  },
  {
    id: "q3",
    title: "Python for Data Science",
    description: "Numpy, Pandas, and data manipulation basics",
    level: "Intermediate",
    duration: "20 min",
    questions: 17,
    tags: ["Python", "Pandas"],
  },
  {
    id: "q4",
    title: "Version Control with Git",
    description: "Branching, merging, workflows, and collaboration",
    level: "Beginner",
    duration: "15 min",
    questions: 12,
    tags: ["Git", "VCS"],
  },
  {
    id: "q5",
    title: "Databases & SQL",
    description: "Queries, joins, indexes, and normalization basics",
    level: "Intermediate",
    duration: "20 min",
    questions: 16,
    tags: ["SQL", "Database"],
  },
  {
    id: "q6",
    title: "React Fundamentals",
    description: "Components, props, state, and hooks essentials",
    level: "Beginner",
    duration: "20 min",
    questions: 15,
    tags: ["React", "Frontend"],
  },
]

export default function QuizzesPage() {
  const [quizzes] = useState<Quiz[]>(mockQuizzes)

  return (
    <PageLayout currentPage="">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-3">Quizzes</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Reinforce your learning with quick assessments and track your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{quiz.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.duration}</span>
                  </div>
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">{quiz.level}</Badge>
                  {quiz.tags.map((t, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <div className="pt-2 border-t flex items-center justify-between">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="h-4 w-4" /> Earn points
                  </div>
                  <Button size="sm" asChild>
                    <a href={`/quizzes/${quiz.id}`}>Start Quiz</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}



