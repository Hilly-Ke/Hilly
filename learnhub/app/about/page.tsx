"use client"

import { BookOpen, Users, Award, Target } from "lucide-react"
import { PageLayout } from "@/components/layout/page-layout"

export default function AboutPage() {
  return (
    <PageLayout currentPage="about">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold font-serif text-gray-900 mb-6">About LearnHub</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're on a mission to democratize education and make high-quality learning accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold font-serif text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At LearnHub, we believe that education is the key to unlocking human potential. Our platform connects
                learners with expert instructors from around the world, providing access to cutting-edge courses in
                technology, business, design, and more.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're looking to advance your career, explore a new passion, or build the skills needed for
                tomorrow's economy, LearnHub provides the tools, community, and support you need to succeed.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">50K+</h4>
                <p className="text-gray-600">Active Learners</p>
              </div>
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">500+</h4>
                <p className="text-gray-600">Expert Courses</p>
              </div>
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">95%</h4>
                <p className="text-gray-600">Completion Rate</p>
              </div>
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">4.8/5</h4>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold font-serif text-gray-900 text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Quality Education</h4>
              <p className="text-gray-600">
                We partner with industry experts and leading institutions to deliver courses that meet the highest
                standards of educational excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Community First</h4>
              <p className="text-gray-600">
                Learning is better together. Our vibrant community of learners and instructors supports each other
                through every step of the journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Accessibility</h4>
              <p className="text-gray-600">
                Education should be accessible to everyone. We're committed to breaking down barriers and making
                learning affordable and inclusive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold font-serif mb-6">Ready to Start Learning?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are already transforming their careers with LearnHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Browse Courses
            </a>
            <a
              href="/"
              className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors font-medium"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
