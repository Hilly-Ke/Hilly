import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple middleware guard: redirect unauthenticated users away from protected routes
// Assumes an auth cookie named "auth_token"; adapt to your auth implementation
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/dashboard")
  if (!isProtected) return NextResponse.next()

  const authToken = request.cookies.get("auth_token")?.value
  if (!authToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}


