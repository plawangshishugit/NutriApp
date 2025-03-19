import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This middleware ensures protected routes are only accessible with a token
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/profile", "/diet-plan"]

  // Public routes
  const publicRoutes = ["/", "/login", "/register"]

  // Check if the route is protected and there's no token
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is logged in and tries to access login/register pages, redirect to diet-plan
  if (publicRoutes.includes(pathname) && pathname !== "/" && token) {
    return NextResponse.redirect(new URL("/diet-plan", request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: ["/", "/login", "/register", "/profile", "/diet-plan"],
}

