"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { courseCategories } from "@/lib/courses"

interface CourseFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedLevel: string
  onLevelChange: (level: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalResults: number
  onClearFilters: () => void
}

export function CourseFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  sortBy,
  onSortChange,
  totalResults,
  onClearFilters,
}: CourseFiltersProps) {
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "rating", label: "Highest Rated" },
    { value: "students", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ]

  const hasActiveFilters = searchTerm || selectedCategory !== "All Categories" || selectedLevel !== "All Levels"

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search courses, instructors, or topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
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
          {courseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Level Filter */}
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
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
              Sort by: {option.label}
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
          {selectedLevel !== "All Levels" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedLevel}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onLevelChange("All Levels")} />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {totalResults} course{totalResults !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
