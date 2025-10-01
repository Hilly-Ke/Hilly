"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu, X, Home, GraduationCap, Users, Info, LayoutDashboard, Award, Settings, Layers } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage = "" }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home", icon: Home, active: currentPage === "home" },
    { href: "/courses", label: "Courses", icon: GraduationCap, active: currentPage === "courses" },
    { href: "/quizzes", label: "Quizzes", icon: Layers, active: currentPage === "quizzes" },
    { href: "/community", label: "Community", icon: Users, active: currentPage === "community" },
    { href: "/about", label: "About", icon: Info, active: currentPage === "about" },
  ]

  const authenticatedItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: currentPage === "dashboard" },
    { href: "/certificates", label: "Certificates", icon: Award, active: currentPage === "certificates" },
  ]

  const adminItems = [{ href: "/admin", label: "Admin", icon: Settings, active: currentPage === "admin" }]

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold font-serif text-primary">LearnHub</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition-colors ${
                  item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}

            {isAuthenticated &&
              authenticatedItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 transition-colors ${
                    item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}

            {user?.role === "administrator" &&
              adminItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 transition-colors ${
                    item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-gray-600 truncate max-w-24 md:max-w-none">Welcome, {user?.name}</span>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {user?.role}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                  <a href="/login">Sign In</a>
                </Button>
                <Button size="sm" asChild>
                  <a href="/login">Get Started</a>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 transition-colors ${
                    item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}

              {isAuthenticated &&
                authenticatedItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors ${
                      item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ))}

              {user?.role === "administrator" &&
                adminItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors ${
                      item.active ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </a>
                ))}

              {!isAuthenticated && (
                <a
                  href="/login"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors sm:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
