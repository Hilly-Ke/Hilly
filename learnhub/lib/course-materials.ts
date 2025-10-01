import { fileStorage } from "./file-storage"
import { videoHosting } from "./video-hosting"

export interface CourseMaterial {
  id: string
  lessonId: string
  title: string
  type: "video" | "pdf" | "quiz" | "assignment" | "code"
  url: string
  duration?: string
  size?: string
  description: string
}

export interface VideoMaterial extends CourseMaterial {
  type: "video"
  thumbnail: string
  transcript?: string
}

export interface PDFMaterial extends CourseMaterial {
  type: "pdf"
  pages: number
  downloadable: boolean
}

// Mock course materials for each course
export const courseMaterials: Record<string, CourseMaterial[]> = {
  "1": [
    // Web Development Fundamentals
    {
      id: "1-1-video",
      lessonId: "1-1-1",
      title: "Introduction to HTML",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "15:30",
      description: "Learn the basics of HTML structure and elements",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/html-intro.jpg",
    } as VideoMaterial,
    {
      id: "1-1-pdf",
      lessonId: "1-1-1",
      title: "HTML Reference Guide",
      type: "pdf",
      url: "https://storage.googleapis.com/learnhub-materials/html-reference.pdf", // Real PDF URL
      size: "2.5 MB",
      pages: 24,
      downloadable: true,
      description: "Complete HTML elements and attributes reference",
    } as PDFMaterial,
    {
      id: "1-2-video",
      lessonId: "1-1-2",
      title: "HTML Document Structure",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "18:45",
      description: "Understanding HTML document structure and semantic elements",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/html-structure.jpg",
    } as VideoMaterial,
    {
      id: "1-3-video",
      lessonId: "1-1-3",
      title: "HTML Forms and Input Elements",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:15",
      description: "Creating interactive forms with HTML",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/html-forms.jpg",
    } as VideoMaterial,
    {
      id: "1-4-video",
      lessonId: "1-1-4",
      title: "HTML Tables and Lists",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "16:30",
      description: "Organizing data with tables and lists",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/html-tables.jpg",
    } as VideoMaterial,
    {
      id: "1-5-video",
      lessonId: "1-1-5",
      title: "HTML Media Elements",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "19:20",
      description: "Adding images, audio, and video to web pages",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/html-media.jpg",
    } as VideoMaterial,

    // Module 2: CSS Fundamentals (Lessons 13-24)
    {
      id: "1-13-video",
      lessonId: "1-2-1",
      title: "CSS Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:15",
      description: "Understanding CSS selectors, properties, and styling",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/css-basics.jpg",
    } as VideoMaterial,
    {
      id: "1-13-code",
      lessonId: "1-2-1",
      title: "CSS Practice Files",
      type: "code",
      url: "https://storage.googleapis.com/learnhub-materials/css-practice.zip",
      size: "1.2 MB",
      description: "Starter files and solutions for CSS exercises",
    },
    {
      id: "1-14-video",
      lessonId: "1-2-2",
      title: "CSS Box Model",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "20:45",
      description: "Understanding margins, padding, borders, and content",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/css-box-model.jpg",
    } as VideoMaterial,
    {
      id: "1-15-video",
      lessonId: "1-2-3",
      title: "CSS Flexbox Layout",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:30",
      description: "Creating flexible layouts with Flexbox",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/css-flexbox.jpg",
    } as VideoMaterial,
    {
      id: "1-16-video",
      lessonId: "1-2-4",
      title: "CSS Grid Layout",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:15",
      description: "Building complex layouts with CSS Grid",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/css-grid.jpg",
    } as VideoMaterial,
    {
      id: "1-17-video",
      lessonId: "1-2-5",
      title: "Responsive Design Principles",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:00",
      description: "Creating mobile-friendly responsive websites",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/responsive-design.jpg",
    } as VideoMaterial,

    // Module 3: JavaScript Fundamentals (Lessons 25-36)
    {
      id: "1-25-video",
      lessonId: "1-3-1",
      title: "JavaScript Introduction",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "18:30",
      description: "Getting started with JavaScript programming",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-intro.jpg",
    } as VideoMaterial,
    {
      id: "1-26-video",
      lessonId: "1-3-2",
      title: "JavaScript Variables and Data Types",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "21:45",
      description: "Understanding JavaScript data types and variables",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-variables.jpg",
    } as VideoMaterial,
    {
      id: "1-27-video",
      lessonId: "1-3-3",
      title: "JavaScript Functions",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:15",
      description: "Creating and using functions in JavaScript",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-functions.jpg",
    } as VideoMaterial,
    {
      id: "1-28-video",
      lessonId: "1-3-4",
      title: "DOM Manipulation",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:30",
      description: "Interacting with HTML elements using JavaScript",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-dom.jpg",
    } as VideoMaterial,
    {
      id: "1-29-video",
      lessonId: "1-3-5",
      title: "Event Handling",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "23:45",
      description: "Handling user interactions with event listeners",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-events.jpg",
    } as VideoMaterial,

    // Module 4: Advanced Topics (Lessons 37-45)
    {
      id: "1-37-video",
      lessonId: "1-4-1",
      title: "Asynchronous JavaScript",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "32:15",
      description: "Working with promises and async/await",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/js-async.jpg",
    } as VideoMaterial,
    {
      id: "1-38-video",
      lessonId: "1-4-2",
      title: "API Integration",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:30",
      description: "Fetching data from external APIs",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/api-integration.jpg",
    } as VideoMaterial,
    {
      id: "1-39-video",
      lessonId: "1-4-3",
      title: "Local Storage and Session Storage",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "19:45",
      description: "Storing data in the browser",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/web-storage.jpg",
    } as VideoMaterial,
    {
      id: "1-40-video",
      lessonId: "1-4-4",
      title: "Final Project Setup",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "35:00",
      description: "Building a complete web application",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/final-project.jpg",
    } as VideoMaterial,
    {
      id: "1-41-assignment",
      lessonId: "1-4-5",
      title: "Final Project Submission",
      type: "assignment",
      url: "https://storage.googleapis.com/learnhub-materials/final-project.pdf",
      description: "Complete your final web development project",
    },
  ],
  "2": [
    // Data Science with Python
    {
      id: "2-1-video",
      lessonId: "2-1-1",
      title: "Python Data Types",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "18:45",
      description: "Understanding Python's core data types and structures",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/python-datatypes.jpg",
    } as VideoMaterial,
    {
      id: "2-1-pdf",
      lessonId: "2-1-1",
      title: "Python Cheat Sheet",
      type: "pdf",
      url: "https://storage.googleapis.com/learnhub-materials/python-cheatsheet.pdf",
      size: "1.8 MB",
      pages: 12,
      downloadable: true,
      description: "Quick reference for Python syntax and functions",
    } as PDFMaterial,
    {
      id: "2-2-video",
      lessonId: "2-1-2",
      title: "Python Control Structures",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:30",
      description: "Loops, conditionals, and control flow in Python",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/python-control.jpg",
    } as VideoMaterial,
    {
      id: "2-3-video",
      lessonId: "2-1-3",
      title: "Python Functions and Modules",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:15",
      description: "Creating reusable code with functions and modules",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/python-functions.jpg",
    } as VideoMaterial,
    {
      id: "2-4-video",
      lessonId: "2-1-4",
      title: "Object-Oriented Programming in Python",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:45",
      description: "Classes, objects, and inheritance in Python",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/python-oop.jpg",
    } as VideoMaterial,
    {
      id: "2-5-video",
      lessonId: "2-1-5",
      title: "Error Handling and Debugging",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "20:30",
      description: "Managing errors and debugging Python code",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/python-debugging.jpg",
    } as VideoMaterial,

    // Module 2: Data Analysis with Pandas (Lessons 16-30)
    {
      id: "2-16-video",
      lessonId: "2-2-1",
      title: "Pandas Introduction",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:30",
      description: "Getting started with Pandas for data manipulation",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/pandas-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-17-video",
      lessonId: "2-2-2",
      title: "DataFrames and Series",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "23:15",
      description: "Working with Pandas data structures",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/pandas-dataframes.jpg",
    } as VideoMaterial,
    {
      id: "2-18-video",
      lessonId: "2-2-3",
      title: "Data Cleaning and Preprocessing",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "30:45",
      description: "Cleaning and preparing data for analysis",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/data-cleaning.jpg",
    } as VideoMaterial,
    {
      id: "2-19-video",
      lessonId: "2-2-4",
      title: "Data Aggregation and Grouping",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:20",
      description: "Summarizing data with groupby operations",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/data-aggregation.jpg",
    } as VideoMaterial,
    {
      id: "2-20-video",
      lessonId: "2-2-5",
      title: "Merging and Joining Data",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:30",
      description: "Combining multiple datasets effectively",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/data-merging.jpg",
    } as VideoMaterial,

    // Module 3: Data Visualization (Lessons 31-45)
    {
      id: "2-31-video",
      lessonId: "2-3-1",
      title: "Matplotlib Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:15",
      description: "Creating basic plots with Matplotlib",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/matplotlib-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-32-video",
      lessonId: "2-3-2",
      title: "Advanced Matplotlib Techniques",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:45",
      description: "Customizing plots and creating complex visualizations",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/matplotlib-advanced.jpg",
    } as VideoMaterial,
    {
      id: "2-33-video",
      lessonId: "2-3-3",
      title: "Seaborn for Statistical Visualization",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:30",
      description: "Creating beautiful statistical plots with Seaborn",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/seaborn-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-34-video",
      lessonId: "2-3-4",
      title: "Interactive Visualizations with Plotly",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "31:20",
      description: "Building interactive charts and dashboards",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/plotly-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-35-video",
      lessonId: "2-3-5",
      title: "Data Storytelling Principles",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:45",
      description: "Communicating insights through effective visualization",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/data-storytelling.jpg",
    } as VideoMaterial,

    // Module 4: Machine Learning Basics (Lessons 46-60)
    {
      id: "2-46-video",
      lessonId: "2-4-1",
      title: "Introduction to Machine Learning",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:30",
      description: "Understanding machine learning concepts and types",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ml-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-47-video",
      lessonId: "2-4-2",
      title: "Scikit-learn Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:15",
      description: "Getting started with scikit-learn library",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/sklearn-intro.jpg",
    } as VideoMaterial,
    {
      id: "2-48-video",
      lessonId: "2-4-3",
      title: "Linear Regression",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:45",
      description: "Building and evaluating linear regression models",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/linear-regression.jpg",
    } as VideoMaterial,
    {
      id: "2-49-video",
      lessonId: "2-4-4",
      title: "Classification Algorithms",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "32:30",
      description: "Implementing classification models and evaluation metrics",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/classification.jpg",
    } as VideoMaterial,
    {
      id: "2-50-video",
      lessonId: "2-4-5",
      title: "Final Data Science Project",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "35:00",
      description: "End-to-end data science project walkthrough",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ds-final-project.jpg",
    } as VideoMaterial,
  ],
  "3": [
    // Digital Marketing Strategy
    {
      id: "3-1-video",
      lessonId: "3-1-1",
      title: "Marketing Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "20:15",
      description: "Core principles of digital marketing",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/marketing-fundamentals.jpg",
    } as VideoMaterial,
    {
      id: "3-1-pdf",
      lessonId: "3-1-1",
      title: "Marketing Strategy Template",
      type: "pdf",
      url: "https://storage.googleapis.com/learnhub-materials/marketing-template.pdf",
      size: "3.2 MB",
      pages: 18,
      downloadable: true,
      description: "Template for creating your marketing strategy",
    } as PDFMaterial,
    {
      id: "3-2-video",
      lessonId: "3-1-2",
      title: "Target Audience Research",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:30",
      description: "Identifying and understanding your target market",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/audience-research.jpg",
    } as VideoMaterial,
    {
      id: "3-3-video",
      lessonId: "3-1-3",
      title: "Brand Positioning and Messaging",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:45",
      description: "Developing compelling brand messages",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/brand-positioning.jpg",
    } as VideoMaterial,
    {
      id: "3-4-video",
      lessonId: "3-1-4",
      title: "Marketing Funnel Strategy",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:15",
      description: "Building effective customer acquisition funnels",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/marketing-funnel.jpg",
    } as VideoMaterial,

    // Module 2: SEO and Content Marketing (Lessons 9-16)
    {
      id: "3-9-video",
      lessonId: "3-2-1",
      title: "SEO Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:30",
      description: "Search engine optimization basics and best practices",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/seo-fundamentals.jpg",
    } as VideoMaterial,
    {
      id: "3-10-video",
      lessonId: "3-2-2",
      title: "Keyword Research and Strategy",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "23:45",
      description: "Finding and targeting the right keywords",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/keyword-research.jpg",
    } as VideoMaterial,
    {
      id: "3-11-video",
      lessonId: "3-2-3",
      title: "Content Marketing Strategy",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:20",
      description: "Creating valuable content that drives engagement",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/content-strategy.jpg",
    } as VideoMaterial,
    {
      id: "3-12-video",
      lessonId: "3-2-4",
      title: "Blog Writing and Optimization",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "21:15",
      description: "Writing SEO-optimized blog content",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/blog-writing.jpg",
    } as VideoMaterial,

    // Module 3: Social Media Marketing (Lessons 17-24)
    {
      id: "3-17-video",
      lessonId: "3-3-1",
      title: "Social Media Strategy",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:45",
      description: "Developing effective social media campaigns",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/social-media-strategy.jpg",
    } as VideoMaterial,
    {
      id: "3-18-video",
      lessonId: "3-3-2",
      title: "Facebook and Instagram Marketing",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:30",
      description: "Leveraging Facebook and Instagram for business",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/facebook-instagram.jpg",
    } as VideoMaterial,
    {
      id: "3-19-video",
      lessonId: "3-3-3",
      title: "LinkedIn Marketing for B2B",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:15",
      description: "Professional networking and B2B marketing on LinkedIn",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/linkedin-marketing.jpg",
    } as VideoMaterial,
    {
      id: "3-20-video",
      lessonId: "3-3-4",
      title: "Social Media Analytics",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:45",
      description: "Measuring and optimizing social media performance",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/social-analytics.jpg",
    } as VideoMaterial,

    // Module 4: Paid Advertising and Analytics (Lessons 25-32)
    {
      id: "3-25-video",
      lessonId: "3-4-1",
      title: "Google Ads Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:30",
      description: "Setting up and optimizing Google Ads campaigns",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/google-ads.jpg",
    } as VideoMaterial,
    {
      id: "3-26-video",
      lessonId: "3-4-2",
      title: "Facebook Ads Manager",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:45",
      description: "Creating effective Facebook advertising campaigns",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/facebook-ads.jpg",
    } as VideoMaterial,
    {
      id: "3-27-video",
      lessonId: "3-4-3",
      title: "Google Analytics Setup",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:20",
      description: "Tracking and analyzing website performance",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/google-analytics.jpg",
    } as VideoMaterial,
    {
      id: "3-28-video",
      lessonId: "3-4-4",
      title: "Marketing Campaign Optimization",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:15",
      description: "Improving campaign performance through data analysis",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/campaign-optimization.jpg",
    } as VideoMaterial,
  ],
  "4": [
    // Machine Learning Basics - Sample lessons from 52 total
    {
      id: "4-1-video",
      lessonId: "4-1-1",
      title: "Introduction to Machine Learning",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:30",
      description: "Understanding the fundamentals of machine learning",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ml-introduction.jpg",
    } as VideoMaterial,
    {
      id: "4-2-video",
      lessonId: "4-1-2",
      title: "Types of Machine Learning",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:15",
      description: "Supervised, unsupervised, and reinforcement learning",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ml-types.jpg",
    } as VideoMaterial,
    {
      id: "4-3-video",
      lessonId: "4-1-3",
      title: "Data Preprocessing for ML",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:45",
      description: "Preparing data for machine learning algorithms",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ml-preprocessing.jpg",
    } as VideoMaterial,
    {
      id: "4-4-video",
      lessonId: "4-1-4",
      title: "Linear Regression Deep Dive",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "31:20",
      description: "Advanced concepts in linear regression",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/linear-regression-deep.jpg",
    } as VideoMaterial,
    {
      id: "4-5-video",
      lessonId: "4-1-5",
      title: "Decision Trees and Random Forests",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:15",
      description: "Tree-based algorithms for classification and regression",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/decision-trees.jpg",
    } as VideoMaterial,
  ],
  "5": [
    // UX/UI Design Principles - Sample lessons from 38 total
    {
      id: "5-1-video",
      lessonId: "5-1-1",
      title: "Introduction to UX Design",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "20:45",
      description: "Understanding user experience design principles",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/ux-introduction.jpg",
    } as VideoMaterial,
    {
      id: "5-2-video",
      lessonId: "5-1-2",
      title: "User Research Methods",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:30",
      description: "Conducting effective user research and interviews",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/user-research.jpg",
    } as VideoMaterial,
    {
      id: "5-3-video",
      lessonId: "5-1-3",
      title: "Information Architecture",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:15",
      description: "Organizing content and navigation structures",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/information-architecture.jpg",
    } as VideoMaterial,
    {
      id: "5-4-video",
      lessonId: "5-1-4",
      title: "Wireframing and Prototyping",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:45",
      description: "Creating wireframes and interactive prototypes",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/wireframing.jpg",
    } as VideoMaterial,
    {
      id: "5-5-video",
      lessonId: "5-1-5",
      title: "Visual Design Principles",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:30",
      description: "Color theory, typography, and visual hierarchy",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/visual-design.jpg",
    } as VideoMaterial,
  ],
  "6": [
    // Business Analytics - Sample lessons from 42 total
    {
      id: "6-1-video",
      lessonId: "6-1-1",
      title: "Introduction to Business Analytics",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "21:30",
      description: "Understanding data-driven business decisions",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/business-analytics-intro.jpg",
    } as VideoMaterial,
    {
      id: "6-2-video",
      lessonId: "6-1-2",
      title: "Excel for Business Analysis",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:45",
      description: "Advanced Excel techniques for data analysis",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/excel-business.jpg",
    } as VideoMaterial,
    {
      id: "6-3-video",
      lessonId: "6-1-3",
      title: "SQL for Business Intelligence",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "32:15",
      description: "Querying databases for business insights",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/sql-business.jpg",
    } as VideoMaterial,
    {
      id: "6-4-video",
      lessonId: "6-1-4",
      title: "Data Visualization with Tableau",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "29:30",
      description: "Creating interactive dashboards with Tableau",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/tableau-intro.jpg",
    } as VideoMaterial,
    {
      id: "6-5-video",
      lessonId: "6-1-5",
      title: "KPI Development and Tracking",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:45",
      description: "Defining and monitoring key performance indicators",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/kpi-development.jpg",
    } as VideoMaterial,
  ],
  "7": [
    // React Native Mobile Development - Sample lessons from 48 total
    {
      id: "7-1-video",
      lessonId: "7-1-1",
      title: "React Native Introduction",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "23:15",
      description: "Getting started with React Native development",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/react-native-intro.jpg",
    } as VideoMaterial,
    {
      id: "7-2-video",
      lessonId: "7-1-2",
      title: "Setting Up Development Environment",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:45",
      description: "Installing and configuring React Native tools",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/rn-setup.jpg",
    } as VideoMaterial,
    {
      id: "7-3-video",
      lessonId: "7-1-3",
      title: "React Native Components",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:30",
      description: "Building UI with React Native components",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/rn-components.jpg",
    } as VideoMaterial,
    {
      id: "7-4-video",
      lessonId: "7-1-4",
      title: "Navigation in React Native",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "31:20",
      description: "Implementing navigation between screens",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/rn-navigation.jpg",
    } as VideoMaterial,
    {
      id: "7-5-video",
      lessonId: "7-1-5",
      title: "State Management in Mobile Apps",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "27:15",
      description: "Managing application state effectively",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/rn-state.jpg",
    } as VideoMaterial,
  ],
  "8": [
    // Cybersecurity Fundamentals - Sample lessons from 35 total
    {
      id: "8-1-video",
      lessonId: "8-1-1",
      title: "Introduction to Cybersecurity",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "22:30",
      description: "Understanding cybersecurity threats and principles",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/cybersecurity-intro.jpg",
    } as VideoMaterial,
    {
      id: "8-2-video",
      lessonId: "8-1-2",
      title: "Network Security Fundamentals",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "28:15",
      description: "Securing networks and communication channels",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/network-security.jpg",
    } as VideoMaterial,
    {
      id: "8-3-video",
      lessonId: "8-1-3",
      title: "Encryption and Cryptography",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "25:45",
      description: "Understanding encryption methods and applications",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/encryption.jpg",
    } as VideoMaterial,
    {
      id: "8-4-video",
      lessonId: "8-1-4",
      title: "Risk Assessment and Management",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "24:30",
      description: "Identifying and mitigating security risks",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/risk-assessment.jpg",
    } as VideoMaterial,
    {
      id: "8-5-video",
      lessonId: "8-1-5",
      title: "Incident Response Planning",
      type: "video",
      url: "https://www.youtube.com/embed/nu_pCVPKzTk?si=GCdoE5QMUGcrgyzz",
      duration: "26:45",
      description: "Preparing for and responding to security incidents",
      thumbnail: "https://storage.googleapis.com/learnhub-thumbnails/incident-response.jpg",
    } as VideoMaterial,
  ],
}

export function getMaterialsForLesson(lessonId: string): CourseMaterial[] {
  const courseId = lessonId.split("-")[0]
  const materials = courseMaterials[courseId] || []
  return materials.filter((material) => material.lessonId === lessonId)
}

export function getAllMaterialsForCourse(courseId: string): CourseMaterial[] {
  return courseMaterials[courseId] || []
}

export async function uploadCourseMaterial(
  file: File,
  courseId: string,
  lessonId: string,
  metadata: {
    title: string
    description: string
    type: CourseMaterial["type"]
  },
): Promise<CourseMaterial | null> {
  try {
    if (metadata.type === "video") {
      // Upload video using video hosting service
      const videoMetadata = await videoHosting.uploadVideo(file, {
        title: metadata.title,
        description: metadata.description,
      })

      const videoMaterial: VideoMaterial = {
        id: `${courseId}-${lessonId}-${Date.now()}`,
        lessonId,
        title: metadata.title,
        type: "video",
        url: videoMetadata.sources[0].url,
        duration: `${Math.floor(videoMetadata.duration / 60)}:${(videoMetadata.duration % 60).toString().padStart(2, "0")}`,
        description: metadata.description,
        thumbnail: videoMetadata.thumbnail,
      }

      return videoMaterial
    } else {
      // Upload other files using file storage service
      const formData = new FormData()
      formData.append("file", file)
      formData.append("courseId", courseId)
      formData.append("lessonId", lessonId)

      const uploadResult = await fileStorage.uploadFile(file, { courseId, lessonId })

      if (uploadResult.success && uploadResult.file) {
        const material: CourseMaterial = {
          id: `${courseId}-${lessonId}-${Date.now()}`,
          lessonId,
          title: metadata.title,
          type: metadata.type,
          url: uploadResult.file.url,
          size: `${(uploadResult.file.size / 1024 / 1024).toFixed(1)} MB`,
          description: metadata.description,
        }

        if (metadata.type === "pdf") {
          ;(material as PDFMaterial).pages = 1 // Would be extracted from PDF
          ;(material as PDFMaterial).downloadable = true
        }

        return material
      }
    }
  } catch (error) {
    console.error("Failed to upload course material:", error)
  }

  return null
}

export async function addMaterialToCourse(courseId: string, material: CourseMaterial): Promise<void> {
  if (!courseMaterials[courseId]) {
    courseMaterials[courseId] = []
  }

  courseMaterials[courseId].push(material)

  // In a real implementation, this would save to the database
  console.log(`Added material ${material.id} to course ${courseId}`)
}

export async function getMaterialUrl(materialId: string): Promise<string | null> {
  // Find the material across all courses
  for (const courseId in courseMaterials) {
    const material = courseMaterials[courseId].find((m) => m.id === materialId)
    if (material) {
      // For real files, ensure the URL is accessible
      if (material.url.startsWith("https://")) {
        return material.url
      } else {
        // Convert relative URLs to absolute URLs
        return `${process.env.NEXT_PUBLIC_STORAGE_URL || ""}${material.url}`
      }
    }
  }

  return null
}

export async function validateMaterialAccess(materialId: string, userId: string): Promise<boolean> {
  // Check if user has access to the material (enrolled in course, etc.)
  // This would integrate with the enrollment system
  return true // Simplified for now
}

export async function getMaterialsForLessonWithUrls(lessonId: string): Promise<CourseMaterial[]> {
  const materials = getMaterialsForLesson(lessonId)

  // Ensure all URLs are accessible
  return materials.map((material) => ({
    ...material,
    url: material.url.startsWith("https://")
      ? material.url
      : `${process.env.NEXT_PUBLIC_STORAGE_URL || ""}${material.url}`,
  }))
}
