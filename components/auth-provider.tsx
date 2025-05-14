"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
  role: "USER" | "ADMIN" | "SUPERADMIN"
  name: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...")
        // Check localStorage for user data
        const storedUser = localStorage.getItem("visionboard-user")

        if (storedUser) {
          console.log("Found user in localStorage")
          const parsedUser = JSON.parse(storedUser)

          // Verify the user with the server
          const response = await fetch("/api/auth/session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: parsedUser.id }),
          })

          const data = await response.json()

          if (data.user) {
            console.log("User verified with server")
            setUser(data.user)
          } else {
            console.log("User not verified with server, clearing localStorage")
            localStorage.removeItem("visionboard-user")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("visionboard-user")
      } finally {
        setLoading(false)
        console.log("Auth check completed, loading set to false")
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      console.log("Attempting login for:", email)
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      })

      console.log("Login response status:", response.status)

      if (!response.ok) {
        const error = await response.json()
        console.error("Login error:", error)
        throw new Error(error.error || "Login failed")
      }

      const data = await response.json()
      console.log("Login successful, user data:", data.user)

      // Store user data in localStorage
      localStorage.setItem("visionboard-user", JSON.stringify(data.user))
      setUser(data.user)

      console.log("Redirecting to dashboard...")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          email,
          password,
          name,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Registration failed")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("visionboard-user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}
