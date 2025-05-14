import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { hashPassword, comparePassword, sanitizeUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { action, email, password, name } = data

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
      }

      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          password: true,
          active: true,
        },
      })

      // Check if user exists
      if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // Check if the user is active
      if (!user.active) {
        return NextResponse.json({ error: "Your account is inactive" }, { status: 403 })
      }

      // Check if password matches
      const passwordValid = await comparePassword(password, user.password)
      if (!passwordValid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
      }

      // Return user data (excluding password)
      const sanitizedUser = sanitizeUser(user)
      return NextResponse.json({ user: sanitizedUser })
    } else if (action === "register") {
      if (!email || !password || !name) {
        return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 409 })
      }

      // Hash the password
      const hashedPassword = await hashPassword(password)

      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "USER", // Default role for new users
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      })

      return NextResponse.json({ success: true, user })
    } else if (action === "logout") {
      // No server-side logout needed with localStorage
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Auth API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
