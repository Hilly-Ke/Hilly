"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, ThumbsDown, Pin, Lock, Paperclip, FileText, ImageIcon } from "lucide-react"
import { type ForumPost, getTimeAgo } from "@/lib/community"

interface PostCardProps {
  post: ForumPost
  onPostClick?: (postId: string) => void
  onVote?: (postId: string, type: "up" | "down") => void
}

export function PostCard({ post, onPostClick, onVote }: PostCardProps) {
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

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-sm">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="font-semibold text-lg leading-tight hover:text-primary transition-colors"
                  onClick={() => onPostClick?.(post.id)}
                >
                  {post.title}
                </h3>
                {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                {post.isClosed && <Lock className="h-4 w-4 text-gray-500" />}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="font-medium">{post.author.name}</span>
                <Badge variant="outline" className={`text-xs ${getRoleColor(post.author.role)}`}>
                  {post.author.role}
                </Badge>
                <span>•</span>
                <span>{getTimeAgo(post.createdAt)}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-gray-700 line-clamp-3 cursor-pointer" onClick={() => onPostClick?.(post.id)}>
            {post.content}
          </p>

          {post.attachments.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Paperclip className="h-4 w-4" />
              <span>
                {post.attachments.length} attachment{post.attachments.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => onVote?.(post.id, "up")} className="h-8 px-2">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {post.upvotes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onVote?.(post.id, "down")} className="h-8 px-2">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  {post.downvotes}
                </Button>
              </div>

              <Button variant="ghost" size="sm" onClick={() => onPostClick?.(post.id)} className="h-8 px-2">
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.replies.length} {post.replies.length === 1 ? "reply" : "replies"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
