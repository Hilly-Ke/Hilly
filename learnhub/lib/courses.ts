export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar?: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  rating: number
  studentsEnrolled: number
  image: string
  tags: string[]
  lessons: number
  lastUpdated: Date
  featured: boolean
}

export const courseCategories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "Machine Learning",
  "UX/UI Design",
  "Business Analytics",
  "Mobile Development",
  "Cybersecurity",
  "Cloud Computing",
  "Photography",
]

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites from scratch.",
    instructor: "Sarah Johnson",
    category: "Web Development",
    level: "Beginner",
    duration: "12 weeks",
    rating: 4.8,
    studentsEnrolled: 1250,
    image: "/web-development-coding.png",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    lessons: 45,
    lastUpdated: new Date("2024-01-15"),
    featured: true,
  },
  {
    id: "2",
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python and popular libraries.",
    instructor: "Dr. Michael Chen",
    category: "Data Science",
    level: "Intermediate",
    duration: "16 weeks",
    rating: 4.9,
    studentsEnrolled: 890,
    image: "/data-science-python-analytics.png",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
    lessons: 60,
    lastUpdated: new Date("2024-02-01"),
    featured: true,
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    description: "Comprehensive guide to digital marketing including SEO, social media, and content marketing.",
    instructor: "Emma Rodriguez",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.7,
    studentsEnrolled: 2100,
    image: "/digital-marketing-strategy.png",
    tags: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    lessons: 32,
    lastUpdated: new Date("2024-01-20"),
    featured: false,
  },
  {
    id: "4",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning algorithms and their practical applications.",
    instructor: "Prof. David Kim",
    category: "Machine Learning",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.8,
    studentsEnrolled: 675,
    image: "/machine-learning-ai.png",
    tags: ["ML Algorithms", "TensorFlow", "Neural Networks", "Deep Learning"],
    lessons: 52,
    lastUpdated: new Date("2024-02-10"),
    featured: true,
  },
  {
    id: "5",
    title: "UX/UI Design Principles",
    description: "Learn user experience and interface design principles to create intuitive digital products.",
    instructor: "Lisa Thompson",
    category: "UX/UI Design",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.9,
    studentsEnrolled: 1450,
    image: "/ux-ui-design-interface.png",
    tags: ["User Research", "Wireframing", "Prototyping", "Figma"],
    lessons: 38,
    lastUpdated: new Date("2024-01-25"),
    featured: false,
  },
  {
    id: "6",
    title: "Business Analytics",
    description: "Use data to make informed business decisions and drive organizational growth.",
    instructor: "Robert Wilson",
    category: "Business Analytics",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.6,
    studentsEnrolled: 820,
    image: "/placeholder-z4i6m.png",
    tags: ["Excel", "SQL", "Tableau", "Business Intelligence"],
    lessons: 42,
    lastUpdated: new Date("2024-02-05"),
    featured: false,
  },
  {
    id: "7",
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile applications using React Native and JavaScript.",
    instructor: "Alex Martinez",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "14 weeks",
    rating: 4.7,
    studentsEnrolled: 650,
    image: "/mobile-app-development.png",
    tags: ["React Native", "JavaScript", "Mobile UI", "API Integration"],
    lessons: 48,
    lastUpdated: new Date("2024-01-30"),
    featured: false,
  },
  {
    id: "8",
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity concepts and practices to protect digital assets.",
    instructor: "Jennifer Lee",
    category: "Cybersecurity",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.8,
    studentsEnrolled: 920,
    image: "/cybersecurity-shield.png",
    tags: ["Network Security", "Encryption", "Risk Assessment", "Compliance"],
    lessons: 35,
    lastUpdated: new Date("2024-02-12"),
    featured: true,
  },
]

export const courses = mockCourses

export function filterCourses(
  courses: Course[],
  searchTerm: string,
  category: string,
  level: string,
  sortBy: string,
): Course[] {
  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = category === "All Categories" || course.category === category
    const matchesLevel = level === "All Levels" || course.level === level

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Sort courses
  switch (sortBy) {
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case "students":
      filtered.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
      break
    case "newest":
      filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
      break
    default:
      // Default: featured first, then by rating
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.rating - a.rating
      })
  }

  return filtered
}
