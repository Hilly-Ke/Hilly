"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { type Reply } from "@/lib/community"
import { getTimeAgo } from "@/lib/community"

interface CommentListProps {
  comments: Reply[]
  onVote?: (commentId: string, type: "up" | "down") => void
}

export function CommentList({ comments, onVote }: CommentListProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "administrator":
        return "bg-red-100 text-red-800"
      case "teacher":
        return "bg-blue-100 text-blue-800"
      case "student":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-6 last:border-b-0">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {comment.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author.name}</span>
                <Badge variant="outline" className={`text-xs ${getRoleColor(comment.author.role)}`}>
                  {comment.author.role}
                </Badge>
                <span className="text-xs text-gray-500">{getTimeAgo(comment.createdAt)}</span>
              </div>

              <p className="text-gray-700 mb-3">{comment.content}</p>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onVote?.(comment.id, "up")} className="h-7 px-2">
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  {comment.upvotes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onVote?.(comment.id, "down")} className="h-7 px-2">
                  <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                  {comment.downvotes}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}