"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"

interface CommentFormProps {
  postId: string
  onSubmit: (postId: string, comment: string) => void
}

export function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const { user, isAuthenticated } = useAuth()
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(postId, comment)
      setComment("") // Clear the form after successful submission
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-600 mb-2">Sign in to leave a comment</p>
        <Button asChild size="sm" variant="outline">
          <a href="/login">Sign In</a>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-24 resize-none"
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !comment.trim()}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  )
}