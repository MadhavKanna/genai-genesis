"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Mock user type to simulate Firebase User
type MockUser = {
  uid: string
  email: string
  displayName?: string
}

type UserRole = "patient" | "clinician" | null

type AuthContextType = {
  user: MockUser | null
  userRole: UserRole
  loading: boolean
  signIn: (email: string, password: string, role: UserRole) => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("symedon_user")
    const storedRole = localStorage.getItem("symedon_role") as UserRole

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setUserRole(storedRole)
    }

    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true)

      // Mock authentication - in a real app, this would validate against Firebase
      // For demo purposes, we'll accept any credentials
      const mockUser: MockUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: role === "patient" ? "Jane Patient" : "Dr. Thomas Smith",
      }

      // Store user in localStorage
      localStorage.setItem("symedon_user", JSON.stringify(mockUser))
      localStorage.setItem("symedon_role", role as string)

      setUser(mockUser)
      setUserRole(role)

      // Redirect based on role
      if (role === "patient") {
        router.push("/patient/dashboard")
      } else if (role === "clinician") {
        router.push("/clinician/dashboard")
      }
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true)

      // Mock user creation - in a real app, this would create a Firebase user
      const mockUser: MockUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: role === "patient" ? "Jane Patient" : "Dr. Thomas Smith",
      }

      // Store user in localStorage
      localStorage.setItem("symedon_user", JSON.stringify(mockUser))
      localStorage.setItem("symedon_role", role as string)

      setUser(mockUser)
      setUserRole(role)

      // Redirect based on role
      if (role === "patient") {
        router.push("/patient/dashboard")
      } else if (role === "clinician") {
        router.push("/clinician/dashboard")
      }
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)

      // Clear stored user data
      localStorage.removeItem("symedon_user")
      localStorage.removeItem("symedon_role")

      setUser(null)
      setUserRole(null)

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

