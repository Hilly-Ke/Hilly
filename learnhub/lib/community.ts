export interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    role: "student" | "teacher" | "administrator"
    avatar?: string
  }
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  replies: Reply[]
  upvotes: number
  downvotes: number
  isPinned: boolean
  isClosed: boolean
  attachments: FileAttachment[]
}

export interface Reply {
  id: string
  content: string
  author: {
    id: string
    name: string
    role: "student" | "teacher" | "administrator"
    avatar?: string
  }
  createdAt: Date
  upvotes: number
  downvotes: number
  attachments: FileAttachment[]
}

export interface FileAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}

export const forumCategories = [
  "All Categories",
  "General Discussion",
  "Course Help",
  "Study Groups",
  "Career Advice",
  "Technical Support",
  "Project Showcase",
  "Resources & Materials",
  "Announcements",
]

export const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Welcome to the LearnHub Community!",
    content:
      "Welcome everyone to our learning community! This is a place where students, teachers, and administrators can connect, share knowledge, and support each other on our learning journeys. Please read our community guidelines and feel free to introduce yourself!",
    author: {
      id: "3",
      name: "Admin User",
      role: "administrator",
    },
    category: "Announcements",
    tags: ["welcome", "community", "guidelines"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    replies: [
      {
        id: "1-1",
        content: "Thanks for the warm welcome! Excited to be part of this community.",
        author: {
          id: "1",
          name: "John Student",
          role: "student",
        },
        createdAt: new Date("2024-01-02"),
        upvotes: 5,
        downvotes: 0,
        attachments: [],
      },
      {
        id: "1-2",
        content: "Looking forward to helping students and sharing knowledge!",
        author: {
          id: "2",
          name: "Sarah Teacher",
          role: "teacher",
        },
        createdAt: new Date("2024-01-02"),
        upvotes: 8,
        downvotes: 0,
        attachments: [],
      },
    ],
    upvotes: 25,
    downvotes: 0,
    isPinned: true,
    isClosed: false,
    attachments: [],
  },
  {
    id: "2",
    title: "Need help with JavaScript async/await",
    content:
      "I'm struggling to understand how async/await works in JavaScript. Can someone explain the difference between promises and async/await? I've attached my code that's not working properly.",
    author: {
      id: "1",
      name: "John Student",
      role: "student",
    },
    category: "Course Help",
    tags: ["javascript", "async", "promises", "help"],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    replies: [
      {
        id: "2-1",
        content:
          "Async/await is syntactic sugar over promises. It makes asynchronous code look more like synchronous code. Here's a simple example:\n\n```javascript\n// Promise way\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n\n// Async/await way\nasync function getData() {\n  const response = await fetch('/api/data')\n  const data = await response.json()\n  console.log(data)\n}\n```",
        author: {
          id: "2",
          name: "Sarah Teacher",
          role: "teacher",
        },
        createdAt: new Date("2024-02-15"),
        upvotes: 12,
        downvotes: 0,
        attachments: [],
      },
    ],
    upvotes: 8,
    downvotes: 0,
    isPinned: false,
    isClosed: false,
    attachments: [
      {
        id: "att-1",
        name: "my-async-code.js",
        size: 1024,
        type: "application/javascript",
        url: "#",
        uploadedBy: "1",
        uploadedAt: new Date("2024-02-15"),
      },
    ],
  },
  {
    id: "3",
    title: "Study Group for Data Science Course",
    content:
      "Looking to form a study group for the Data Science with Python course. We can meet weekly to discuss concepts, work on projects together, and help each other with assignments. Anyone interested?",
    author: {
      id: "4",
      name: "Alice Chen",
      role: "student",
    },
    category: "Study Groups",
    tags: ["data-science", "python", "study-group", "collaboration"],
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-12"),
    replies: [
      {
        id: "3-1",
        content: "I'm interested! I'm currently on week 4 of the course. What time zone are you in?",
        author: {
          id: "5",
          name: "Mike Rodriguez",
          role: "student",
        },
        createdAt: new Date("2024-02-11"),
        upvotes: 3,
        downvotes: 0,
        attachments: [],
      },
      {
        id: "3-2",
        content: "Count me in! I have some experience with pandas and would love to share tips.",
        author: {
          id: "6",
          name: "Emma Wilson",
          role: "student",
        },
        createdAt: new Date("2024-02-12"),
        upvotes: 4,
        downvotes: 0,
        attachments: [],
      },
    ],
    upvotes: 15,
    downvotes: 0,
    isPinned: false,
    isClosed: false,
    attachments: [],
  },
  {
    id: "4",
    title: "My First React Project - Portfolio Website",
    content:
      "Just finished building my first React portfolio website! It was challenging but so rewarding. I've learned so much about components, state management, and responsive design. Check it out and let me know what you think!",
    author: {
      id: "7",
      name: "David Park",
      role: "student",
    },
    category: "Project Showcase",
    tags: ["react", "portfolio", "project", "showcase"],
    createdAt: new Date("2024-02-08"),
    updatedAt: new Date("2024-02-08"),
    replies: [
      {
        id: "4-1",
        content:
          "Looks great! I love the clean design and smooth animations. How did you implement the dark mode toggle?",
        author: {
          id: "2",
          name: "Sarah Teacher",
          role: "teacher",
        },
        createdAt: new Date("2024-02-09"),
        upvotes: 6,
        downvotes: 0,
        attachments: [],
      },
    ],
    upvotes: 18,
    downvotes: 0,
    isPinned: false,
    isClosed: false,
    attachments: [
      {
        id: "att-2",
        name: "portfolio-screenshot.png",
        size: 2048000,
        type: "image/png",
        url: "#",
        uploadedBy: "7",
        uploadedAt: new Date("2024-02-08"),
      },
    ],
  },
  {
    id: "5",
    title: "Career Transition: From Marketing to Tech",
    content:
      "I'm currently working in marketing but want to transition into tech. I've been taking web development courses on LearnHub. Any advice on building a portfolio, networking, or landing that first tech job? What skills should I focus on?",
    author: {
      id: "8",
      name: "Jennifer Lee",
      role: "student",
    },
    category: "Career Advice",
    tags: ["career-change", "tech-transition", "advice", "portfolio"],
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-07"),
    replies: [
      {
        id: "5-1",
        content:
          "I made a similar transition 3 years ago! Focus on building real projects, contribute to open source, and don't underestimate the value of your marketing background - it's actually a huge asset in tech!",
        author: {
          id: "9",
          name: "Alex Thompson",
          role: "student",
        },
        createdAt: new Date("2024-02-06"),
        upvotes: 10,
        downvotes: 0,
        attachments: [],
      },
      {
        id: "5-2",
        content:
          "Great advice from Alex! I'd also recommend attending local tech meetups and building your LinkedIn presence. Happy to review your portfolio when you're ready!",
        author: {
          id: "2",
          name: "Sarah Teacher",
          role: "teacher",
        },
        createdAt: new Date("2024-02-07"),
        upvotes: 8,
        downvotes: 0,
        attachments: [],
      },
    ],
    upvotes: 22,
    downvotes: 0,
    isPinned: false,
    isClosed: false,
    attachments: [],
  },
]

export function filterPosts(posts: ForumPost[], searchTerm: string, category: string, sortBy: string): ForumPost[] {
  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = category === "All Categories" || post.category === category

    return matchesSearch && matchesCategory
  })

  // Sort posts
  switch (sortBy) {
    case "newest":
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case "oldest":
      filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      break
    case "most-replies":
      filtered.sort((a, b) => b.replies.length - a.replies.length)
      break
    case "most-upvotes":
      filtered.sort((a, b) => b.upvotes - a.upvotes)
      break
    default:
      // Default: pinned first, then by newest
      filtered.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1
        if (!a.isPinned && b.isPinned) return 1
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
  }

  return filtered
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return date.toLocaleDateString()
}
