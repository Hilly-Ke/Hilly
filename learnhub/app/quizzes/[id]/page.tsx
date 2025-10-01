"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, ArrowLeft, RefreshCcw } from "lucide-react"

interface QuizQuestion {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctOptionId: string
}

interface QuizDetail {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  questions: QuizQuestion[]
}

const mockQuizBank: Record<string, QuizDetail> = {
  q1: {
    id: "q1",
    title: "HTML & CSS Basics",
    description: "Fundamentals of structure and styling",
    level: "Beginner",
    questions: [
      {
        id: "q1-1",
        text: "Which tag defines the main heading?",
        options: [
          { id: "a", text: "<p>" },
          { id: "b", text: "<h1>" },
          { id: "c", text: "<title>" },
          { id: "d", text: "<header>" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q1-2",
        text: "Which CSS property controls text color?",
        options: [
          { id: "a", text: "font-color" },
          { id: "b", text: "text" },
          { id: "c", text: "color" },
          { id: "d", text: "foreground" },
        ],
        correctOptionId: "c",
      },
      {
        id: "q1-3",
        text: "Which meta tag is essential for responsive design?",
        options: [
          { id: "a", text: "charset" },
          { id: "b", text: "viewport" },
          { id: "c", text: "robots" },
          { id: "d", text: "refresh" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q1-4",
        text: "Which CSS unit scales with the root font size?",
        options: [
          { id: "a", text: "px" },
          { id: "b", text: "em" },
          { id: "c", text: "rem" },
          { id: "d", text: "%" },
        ],
        correctOptionId: "c",
      },
      {
        id: "q1-5",
        text: "Which HTML element is semantic for navigation links?",
        options: [
          { id: "a", text: "<nav>" },
          { id: "b", text: "<section>" },
          { id: "c", text: "<div>" },
          { id: "d", text: "<aside>" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  q2: {
    id: "q2",
    title: "JavaScript Essentials",
    description: "Core syntax and concepts",
    level: "Intermediate",
    questions: [
      {
        id: "q2-1",
        text: "Which keyword declares a block-scoped variable?",
        options: [
          { id: "a", text: "var" },
          { id: "b", text: "let" },
          { id: "c", text: "function" },
          { id: "d", text: "const var" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q2-2",
        text: "What does Array.prototype.map return?",
        options: [
          { id: "a", text: "A mutated original array" },
          { id: "b", text: "A new array" },
          { id: "c", text: "A number" },
          { id: "d", text: "An object" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q2-3",
        text: "What is the value of `typeof null`?",
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "number" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q2-4",
        text: "Which method adds an element to the end of an array?",
        options: [
          { id: "a", text: "shift" },
          { id: "b", text: "push" },
          { id: "c", text: "unshift" },
          { id: "d", text: "concat" },
        ],
        correctOptionId: "b",
      },
    ],
  },
  q3: {
    id: "q3",
    title: "Python for Data Science",
    description: "Popular libraries and workflows",
    level: "Intermediate",
    questions: [
      {
        id: "q3-1",
        text: "Which library is primarily used for dataframes?",
        options: [
          { id: "a", text: "NumPy" },
          { id: "b", text: "Pandas" },
          { id: "c", text: "Matplotlib" },
          { id: "d", text: "Seaborn" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q3-2",
        text: "Which file format is commonly used to store tabular data?",
        options: [
          { id: "a", text: "CSV" },
          { id: "b", text: "PNG" },
          { id: "c", text: "MP4" },
          { id: "d", text: "WAV" },
        ],
        correctOptionId: "a",
      },
      {
        id: "q3-3",
        text: "Which library is best for plotting static graphs?",
        options: [
          { id: "a", text: "Matplotlib" },
          { id: "b", text: "Flask" },
          { id: "c", text: "Requests" },
          { id: "d", text: "Django" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  q4: {
    id: "q4",
    title: "Version Control with Git",
    description: "Branching, merging, workflows, and collaboration",
    level: "Beginner",
    questions: [
      {
        id: "q4-1",
        text: "Which command initializes a new Git repository?",
        options: [
          { id: "a", text: "git start" },
          { id: "b", text: "git init" },
          { id: "c", text: "git create" },
          { id: "d", text: "git new" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q4-2",
        text: "Which command stages changes for commit?",
        options: [
          { id: "a", text: "git add" },
          { id: "b", text: "git push" },
          { id: "c", text: "git pull" },
          { id: "d", text: "git merge" },
        ],
        correctOptionId: "a",
      },
      {
        id: "q4-3",
        text: "Which command creates a new branch?",
        options: [
          { id: "a", text: "git switch -c <name>" },
          { id: "b", text: "git fork <name>" },
          { id: "c", text: "git split <name>" },
          { id: "d", text: "git make-branch <name>" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  q5: {
    id: "q5",
    title: "Databases & SQL",
    description: "Queries, joins, indexes, and normalization basics",
    level: "Intermediate",
    questions: [
      {
        id: "q5-1",
        text: "Which SQL clause filters rows?",
        options: [
          { id: "a", text: "ORDER BY" },
          { id: "b", text: "WHERE" },
          { id: "c", text: "GROUP BY" },
          { id: "d", text: "JOIN" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q5-2",
        text: "Which join returns only matching records in both tables?",
        options: [
          { id: "a", text: "INNER JOIN" },
          { id: "b", text: "LEFT JOIN" },
          { id: "c", text: "RIGHT JOIN" },
          { id: "d", text: "FULL OUTER JOIN" },
        ],
        correctOptionId: "a",
      },
      {
        id: "q5-3",
        text: "Which is used to speed up queries?",
        options: [
          { id: "a", text: "Index" },
          { id: "b", text: "Trigger" },
          { id: "c", text: "Constraint" },
          { id: "d", text: "View" },
        ],
        correctOptionId: "a",
      },
    ],
  },
  q6: {
    id: "q6",
    title: "React Fundamentals",
    description: "Components, props, state, and hooks essentials",
    level: "Beginner",
    questions: [
      {
        id: "q6-1",
        text: "Which hook manages state in a function component?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useState" },
          { id: "c", text: "useContext" },
          { id: "d", text: "useMemo" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q6-2",
        text: "Props are best described as...",
        options: [
          { id: "a", text: "Component private state" },
          { id: "b", text: "Immutable inputs to components" },
          { id: "c", text: "Global variables" },
          { id: "d", text: "DOM attributes only" },
        ],
        correctOptionId: "b",
      },
      {
        id: "q6-3",
        text: "Which method renders a Next.js client route?",
        options: [
          { id: "a", text: "window.navigate" },
          { id: "b", text: "router.push" },
          { id: "c", text: "history.replaceState" },
          { id: "d", text: "location.goto" },
        ],
        correctOptionId: "b",
      },
    ],
  },
}

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = (params?.id as string) || ""
  const quiz = useMemo(() => mockQuizBank[quizId], [quizId])

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!quiz) {
    return (
      <PageLayout currentPage="quizzes">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 mb-4">Quiz not found.</p>
          <Button variant="outline" onClick={() => router.push("/quizzes")}>Back to Quizzes</Button>
        </div>
      </PageLayout>
    )
  }

  const total = quiz.questions.length
  const correctCount = quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctOptionId ? 1 : 0), 0)
  const scorePct = Math.round((correctCount / Math.max(1, total)) * 100)

  const handleSelect = (questionId: string, optionId: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <PageLayout currentPage="quizzes">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/quizzes")}> 
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Badge variant="secondary" className="capitalize">{quiz.level}</Badge>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">{quiz.title}</h1>
          <p className="text-gray-600 mt-1">{quiz.description}</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Questions: {total}</div>
              <div className="w-40">
                <Progress value={submitted ? scorePct : (Object.keys(answers).length / Math.max(1, total)) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => {
            const selected = answers[q.id]
            const isCorrect = selected && selected === q.correctOptionId
            return (
              <Card key={q.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{idx + 1}. {q.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const isSelected = selected === opt.id
                      const showCorrect = submitted && opt.id === q.correctOptionId
                      const showIncorrectSelected = submitted && isSelected && opt.id !== q.correctOptionId
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelect(q.id, opt.id)}
                          className={`text-left border rounded-md p-3 transition-colors ${
                            showCorrect
                              ? "border-green-600/50 bg-green-50"
                              : showIncorrectSelected
                              ? "border-red-600/50 bg-red-50"
                              : isSelected
                              ? "border-primary bg-primary/5"
                              : "hover:bg-gray-50"
                          }`}
                          disabled={submitted}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt.text}</span>
                            {submitted && showCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {submitted && showIncorrectSelected && <XCircle className="h-4 w-4 text-red-600" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {submitted && (
                    <div className="text-sm text-gray-600">
                      {isCorrect ? (
                        <span className="text-green-700">Correct</span>
                      ) : selected ? (
                        <span className="text-red-700">Incorrect</span>
                      ) : (
                        <span>Not answered</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex items-center justify-between mt-6">
          {!submitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={Object.keys(answers).length === 0}>
              Submit Answers
            </Button>
          ) : (
            <div className="w-full">
              <Card>
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-gray-600 text-sm">Your score</div>
                      <div className="text-2xl font-semibold">{correctCount} / {total} ({scorePct}%)</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleRetry}>
                        <RefreshCcw className="h-4 w-4 mr-2" /> Retry
                      </Button>
                      <Button asChild>
                        <a href="/quizzes">Back to Quizzes</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}



