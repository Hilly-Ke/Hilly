"use client"

import type React from "react"

import { Header } from "./header"
import { Footer } from "./footer"

interface PageLayoutProps {
  children: React.ReactNode
  currentPage?: string
  showFooter?: boolean
  className?: string
}

export function PageLayout({
  children,
  currentPage,
  showFooter = true,
  className = "min-h-screen bg-gradient-to-b from-blue-50 to-white",
}: PageLayoutProps) {
  return (
    <div className={className}>
      <Header currentPage={currentPage} />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
