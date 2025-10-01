import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Runtime environment variable validation
// Lightweight check to fail fast in development and during build
export function assertEnv(vars: string[]) {
  const missing = vars.filter((v) => !process.env[v] || process.env[v] === "")
  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(", ")}`
    throw new Error(message)
  }
}
