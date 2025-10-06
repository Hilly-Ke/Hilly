"use client"

import { useState, useMemo } from "react"
import { MessageSquare, TrendingUp, Users } from "lucide-react"
import { PostCard } from "@/components/community/post-card"
import { CommunityFilters } from "@/components/community/community-filters"
import { NewPostDialog } from "@/components/community/new-post-dialog"
import { mockPosts, filterPosts, type ForumPost } from "@/lib/community"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageLayout } from "@/components/layout/page-layout"

export default function CommunityPage() {
  const { isAuthenticated } = useAuth()
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("default")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)

  const filteredPosts = useMemo(() => {
    return filterPosts(posts, searchTerm, selectedCategory, sortBy)
  }, [posts, searchTerm, selectedCategory, sortBy])

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setSortBy("default")
  }

  const handleNewPost = () => {
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }
    setShowNewPostDialog(true)
  }

  const handlePostClick = (_postId: string) => {
    // Placeholder for navigation to post detail when implemented
    // router.push(`/community/posts/${postId}`)
  }

  const handleVote = (postId: string, type: "up" | "down") => {
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              upvotes: type === "up" ? p.upvotes + 1 : p.upvotes,
              downvotes: type === "down" ? p.downvotes + 1 : p.downvotes,
            }
          : p,
      ),
    )
  }
  
  const handleAddComment = (postId: string, comment: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }
    
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: `${Date.now()}-${p.replies.length}`,
                  content: comment,
                  author: {
                    id: "me",
                    name: "You",
                    role: "student",
                  },
                  createdAt: new Date(),
                  upvotes: 0,
                  downvotes: 0,
                  attachments: [],
                },
              ],
            }
          : p,
      ),
    )
  }
  
  const handleVoteComment = (postId: string, commentId: string, type: "up" | "down") => {
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }
    
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: p.replies.map((r) =>
                r.id === commentId
                  ? {
                      ...r,
                      upvotes: type === "up" ? r.upvotes + 1 : r.upvotes,
                      downvotes: type === "down" ? r.downvotes + 1 : r.downvotes,
                    }
                  : r,
              ),
            }
          : p,
      ),
    )
  }

  const handleCreatePost = (postData: any) => {
    const newPost: ForumPost = {
      id: (posts.length + 1).toString(),
      title: postData.title,
      content: postData.content,
      author: {
        id: "me",
        name: postData.author?.name || "You",
        role: (postData.author?.role as ForumPost["author"]["role"]) || "student",
      },
      category: postData.category,
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      replies: [],
      upvotes: 0,
      downvotes: 0,
      isPinned: false,
      isClosed: false,
      attachments: (postData.attachments || []).map((f: File, i: number) => ({
        id: `${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
        type: f.type,
        url: "#",
        uploadedBy: "me",
        uploadedAt: new Date(),
      })),
    }

    setPosts((prev) => [newPost, ...prev])
    setShowNewPostDialog(false)
  }

  return (
    <PageLayout currentPage="community">
      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-serif text-gray-900 mb-4">Community Hub</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow learners, share knowledge, get help, and showcase your projects in our vibrant learning
            community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{posts.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">8,432</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">156</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Study Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">23</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CommunityFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredPosts.length}
            onClearFilters={handleClearFilters}
            onNewPost={handleNewPost}
          />
        </div>

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onPostClick={handlePostClick} 
                onVote={handleVote}
                onAddComment={handleAddComment}
                onVoteComment={handleVoteComment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No discussions found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or start a new discussion</p>
            <Button onClick={handleNewPost} variant="outline">
              Start New Discussion
            </Button>
          </div>
        )}
      </div>

      {/* New Post Dialog */}
      <NewPostDialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog} onSubmit={handleCreatePost} />
    </PageLayout>
  )
}
