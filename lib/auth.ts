import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import type { User } from "@prisma/client"

// JWT token expiration time (7 days)
const JWT_EXPIRATION = 60 * 60 * 24 * 7

// Function to create a JWT token
export function createToken(user: Partial<User>) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET || "fallback-secret",
    { expiresIn: JWT_EXPIRATION },
  )
  return token
}

// Function to verify a JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")
  } catch (error) {
    return null
  }
}

// Function to hash a password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

// Function to compare a password with a hash
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

// Simple function to sanitize user data (remove password)
export function sanitizeUser(user: any) {
  if (!user) return null

  const { password, ...sanitizedUser } = user
  return sanitizedUser
}

// Function to get the current user from the request
export async function getCurrentUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  return decoded
}

// Function to set the auth token cookie
export async function setAuthCookie(token: string) {
  // In Next.js 14, we need to use Response objects for cookie operations
  const response = new Response(null, {
    status: 200,
  })

  response.headers.set(
    "Set-Cookie",
    `auth-token=${token}; Path=/; HttpOnly; Max-Age=${JWT_EXPIRATION}; ${
      process.env.NODE_ENV === "production" ? "Secure;" : ""
    } SameSite=Lax`,
  )

  return response
}

// Function to clear the auth token cookie
export async function clearAuthCookie() {
  // In Next.js 14, we need to use Response objects for cookie operations
  const response = new Response(null, {
    status: 200,
  })

  response.headers.set("Set-Cookie", "auth-token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax")

  return response
}
