export interface AdminStats {
  totalUsers: number
  totalCourses: number
  totalPosts: number
  activeUsers: number
  newUsersThisMonth: number
  courseCompletions: number
  revenue: number
  revenueGrowth: number
}

export interface UserManagement {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "administrator"
  status: "active" | "suspended" | "pending"
  joinDate: Date
  lastLogin: Date
  coursesEnrolled: number
  postsCount: number
}

export interface CourseManagement {
  id: string
  title: string
  instructor: string
  category: string
  studentsEnrolled: number
  status: "published" | "draft" | "archived"
  createdDate: Date
  lastUpdated: Date
  revenue: number
  rating: number
}

export interface CommunityModeration {
  id: string
  type: "post" | "reply"
  title: string
  author: string
  content: string
  category: string
  createdDate: Date
  reports: number
  status: "active" | "flagged" | "removed"
}

export const mockAdminStats: AdminStats = {
  totalUsers: 8432,
  totalCourses: 156,
  totalPosts: 1247,
  activeUsers: 2341,
  newUsersThisMonth: 234,
  courseCompletions: 3456,
  revenue: 125000,
  revenueGrowth: 12.5,
}

export const mockUsers: UserManagement[] = [
  {
    id: "1",
    name: "John Student",
    email: "student@learnhub.com",
    role: "student",
    status: "active",
    joinDate: new Date("2024-01-15"),
    lastLogin: new Date("2024-02-14"),
    coursesEnrolled: 3,
    postsCount: 12,
  },
  {
    id: "2",
    name: "Sarah Teacher",
    email: "teacher@learnhub.com",
    role: "teacher",
    status: "active",
    joinDate: new Date("2023-12-01"),
    lastLogin: new Date("2024-02-15"),
    coursesEnrolled: 1,
    postsCount: 45,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@learnhub.com",
    role: "administrator",
    status: "active",
    joinDate: new Date("2023-11-01"),
    lastLogin: new Date("2024-02-15"),
    coursesEnrolled: 0,
    postsCount: 8,
  },
  {
    id: "4",
    name: "Alice Chen",
    email: "alice@example.com",
    role: "student",
    status: "active",
    joinDate: new Date("2024-02-01"),
    lastLogin: new Date("2024-02-13"),
    coursesEnrolled: 2,
    postsCount: 5,
  },
  {
    id: "5",
    name: "Mike Rodriguez",
    email: "mike@example.com",
    role: "student",
    status: "suspended",
    joinDate: new Date("2024-01-20"),
    lastLogin: new Date("2024-02-10"),
    coursesEnrolled: 1,
    postsCount: 3,
  },
]

export const mockCourseManagement: CourseManagement[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    instructor: "Sarah Johnson",
    category: "Web Development",
    studentsEnrolled: 1250,
    status: "published",
    createdDate: new Date("2023-12-01"),
    lastUpdated: new Date("2024-01-15"),
    revenue: 123750,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Data Science with Python",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
    studentsEnrolled: 890,
    status: "published",
    createdDate: new Date("2023-11-15"),
    lastUpdated: new Date("2024-02-01"),
    revenue: 132610,
    rating: 4.9,
  },
  {
    id: "3",
    title: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    category: "Web Development",
    studentsEnrolled: 0,
    status: "draft",
    createdDate: new Date("2024-02-10"),
    lastUpdated: new Date("2024-02-14"),
    revenue: 0,
    rating: 0,
  },
]

export const mockCommunityModeration: CommunityModeration[] = [
  {
    id: "1",
    type: "post",
    title: "Welcome to the LearnHub Community!",
    author: "Admin User",
    content: "Welcome everyone to our learning community!...",
    category: "Announcements",
    createdDate: new Date("2024-01-01"),
    reports: 0,
    status: "active",
  },
  {
    id: "2",
    type: "post",
    title: "Need help with JavaScript async/await",
    author: "John Student",
    content: "I'm struggling to understand how async/await works...",
    category: "Course Help",
    createdDate: new Date("2024-02-15"),
    reports: 0,
    status: "active",
  },
  {
    id: "3",
    type: "reply",
    title: "Re: Inappropriate content in course discussion",
    author: "Anonymous User",
    content: "This is spam content that violates community guidelines...",
    category: "General Discussion",
    createdDate: new Date("2024-02-14"),
    reports: 3,
    status: "flagged",
  },
]
