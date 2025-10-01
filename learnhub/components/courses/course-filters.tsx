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
  ]

  const hasActiveFilters = searchTerm || selectedCategory !== "All Categories" || selectedLevel !== "All Levels"

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search courses, instructors, or topics..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 text-sm md:text-base"
        />
      </div>

      {/* Filter Controls */}
      <div className="space-y-3 md:space-y-0">
        <div className="flex items-center gap-2 mb-3 md:mb-0">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Filters:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:flex md:flex-wrap md:gap-4 md:items-center">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm w-full md:w-auto"
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
            className="px-3 py-2 border rounded-md text-sm w-full md:w-auto"
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
            className="px-3 py-2 border rounded-md text-sm w-full md:w-auto"
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
              className="flex items-center gap-1 bg-transparent w-full sm:w-auto justify-center"
            >
              <X className="h-3 w-3" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              Search: "{searchTerm.length > 20 ? searchTerm.substring(0, 20) + "..." : searchTerm}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {selectedCategory !== "All Categories" && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              {selectedCategory}
              <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("All Categories")} />
            </Badge>
          )}
          {selectedLevel !== "All Levels" && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
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
