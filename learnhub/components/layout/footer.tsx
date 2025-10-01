"use client"

import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-serif">LearnHub</span>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Empowering learners worldwide with quality education and expert instruction.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold">Platform</h5>
            <div className="space-y-2 text-gray-400 text-sm md:text-base">
              <a href="/courses" className="block hover:text-white transition-colors">
                Courses
              </a>
              <a href="/community" className="block hover:text-white transition-colors">
                Community
              </a>
              <a href="/dashboard" className="block hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/certificates" className="block hover:text-white transition-colors">
                Certificates
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold">Support</h5>
            <div className="space-y-2 text-gray-400 text-sm md:text-base">
              <a href="/about" className="block hover:text-white transition-colors">
                About Us
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold">Connect</h5>
            <div className="space-y-2 text-gray-400 text-sm md:text-base">
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

        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
          <p>&copy; 2025 LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
