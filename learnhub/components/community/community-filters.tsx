"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Plus } from "lucide-react"
import { forumCategories } from "@/lib/community"

interface CommunityFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalResults: number
  onClearFilters: () => void
  onNewPost?: () => void
}

export function CommunityFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalResults,
  onClearFilters,
  onNewPost,
}: CommunityFiltersProps) {
  const sortOptions = [
    { value: "default", label: "Default (Pinned First)" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most-replies", label: "Most Replies" },
    { value: "most-upvotes", label: "Most Upvotes" },
  ]

  const hasActiveFilters = searchTerm || selectedCategory !== "All Categories"

  return (
    <div className="space-y-6">
      {/* Search and New Post */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search discussions, topics, or users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
        </div>
        <Button onClick={onNewPost} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Filters:</span>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {forumCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-1 bg-transparent"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchTerm}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {selectedCategory !== "All Categories" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedCategory}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("All Categories")} />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {totalResults} discussion{totalResults !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
