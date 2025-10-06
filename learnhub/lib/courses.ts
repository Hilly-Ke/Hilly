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
  curriculum?: CourseModule[]
}

export interface CourseModule {
  id: string
  title: string
  lessons: CourseLesson[]
}

export interface CourseLesson {
  id: string
  title: string
  duration: string
  videoUrl?: string
  description?: string
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
    curriculum: [
      {
        id: "module-1",
        title: "HTML Fundamentals",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to HTML",
            duration: "45 minutes",
            videoUrl: "/videos/html-intro.mp4",
            description: "Learn the basics of HTML structure and elements."
          },
          {
            id: "lesson-1-2",
            title: "HTML Forms and Inputs",
            duration: "60 minutes",
            videoUrl: "/videos/html-forms.mp4",
            description: "Create interactive forms using HTML."
          }
        ]
      },
      {
        id: "module-2",
        title: "CSS Styling",
        lessons: [
          {
            id: "lesson-2-1",
            title: "CSS Selectors and Properties",
            duration: "55 minutes",
            videoUrl: "/videos/css-selectors.mp4",
            description: "Master CSS selectors and common properties."
          },
          {
            id: "lesson-2-2",
            title: "Responsive Design with CSS",
            duration: "65 minutes",
            videoUrl: "/videos/responsive-css.mp4",
            description: "Create websites that work on any device size."
          }
        ]
      }
    ]
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
    title: "Business Analytics for Decision Making",
    description: "Learn how to analyze business data to make informed decisions and drive organizational success.",
    instructor: "Jennifer Adams",
    category: "Business Analytics",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.7,
    studentsEnrolled: 520,
    image: "/placeholder-z4i6m.png",
    tags: ["Data Analysis", "Business Intelligence", "Decision Making", "Reporting"],
    lessons: 32,
    lastUpdated: new Date("2024-02-25"),
    featured: true,
  },
  {
    id: "7",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter.",
    instructor: "Daniel Park",
    category: "Mobile Development",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.8,
    studentsEnrolled: 750,
    image: "/mobile-app-development.png",
    tags: ["Flutter", "Dart", "Mobile UI", "Cross-platform"],
    lessons: 40,
    lastUpdated: new Date("2024-03-01"),
    featured: true,
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
  {
    id: "11",
    title: "Digital Photography Fundamentals",
    description: "Master the basics of digital photography, from camera settings to composition techniques.",
    instructor: "James Wilson",
    category: "Photography",
    level: "Beginner",
    duration: "6 weeks",
    rating: 4.8,
    studentsEnrolled: 1350,
    image: "/placeholder.jpg",
    tags: ["Camera Basics", "Composition", "Lighting", "Photo Editing"],
    lessons: 24,
    lastUpdated: new Date("2024-01-28"),
    featured: true,
  },
  {
    id: "14",
    title: "AWS Cloud Computing Essentials",
    description: "Learn the fundamentals of cloud computing with Amazon Web Services (AWS).",
    instructor: "David Johnson",
    category: "Cloud Computing",
    level: "Beginner",
    duration: "10 weeks",
    rating: 4.8,
    studentsEnrolled: 1120,
    image: "/placeholder-z4i6m.png",
    tags: ["AWS", "EC2", "S3", "Cloud Architecture"],
    lessons: 40,
    lastUpdated: new Date("2024-02-15"),
    featured: true,
  },
]

export const courses = mockCourses

// Function to add a new course to the mockCourses array
export function addNewCourse(course: Course) {
  mockCourses.push(course);
  return course;
}

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
