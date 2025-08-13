"use client"

import { useState, useMemo } from "react"
import { BookOpen, Users, MessageSquare, TrendingUp } from "lucide-react"
import { PostCard } from "@/components/community/post-card"
import { CommunityFilters } from "@/components/community/community-filters"
import { NewPostDialog } from "@/components/community/new-post-dialog"
import { mockPosts, filterPosts } from "@/lib/community"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CommunityPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("default")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)

  const filteredPosts = useMemo(() => {
    return filterPosts(mockPosts, searchTerm, selectedCategory, sortBy)
  }, [searchTerm, selectedCategory, sortBy])

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

  const handlePostClick = (postId: string) => {
    // Navigate to post detail page
    console.log("Navigate to post:", postId)
  }

  const handleVote = (postId: string, type: "up" | "down") => {
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }
    console.log("Vote:", postId, type)
  }

  const handleCreatePost = (postData: any) => {
    console.log("Creating post:", postData)
    // Handle post creation
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-serif text-primary">LearnHub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors">
                Home
              </a>
              <a href="/courses" className="text-gray-600 hover:text-primary transition-colors">
                Courses
              </a>
              <a href="/community" className="text-primary font-medium">
                Community
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                  <Button variant="ghost" onClick={logout}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <a href="/login">Sign In</a>
                  </Button>
                  <Button asChild>
                    <a href="/">Get Started</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

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
                <span className="text-2xl font-bold">1,247</span>
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
              <PostCard key={post.id} post={post} onPostClick={handlePostClick} onVote={handleVote} />
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold font-serif">LearnHub</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with quality education and expert instruction.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Platform</h5>
              <div className="space-y-2 text-gray-400">
                <a href="/courses" className="block hover:text-white transition-colors">
                  Courses
                </a>
                <a href="/community" className="block hover:text-white transition-colors">
                  Community
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Instructors
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Pricing
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Support</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold">Connect</h5>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
