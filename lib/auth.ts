// Authentication and authorization utilities
export type UserRole = "citizen" | "official" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  organization?: string
  designation?: string
  officialId?: string
  location: string
  isVerified: boolean
  createdAt: string
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Citizen",
    email: "john@example.com",
    phone: "+91 9876543210",
    role: "citizen",
    location: "Mumbai, Maharashtra",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "user-2",
    name: "Officer Sarah",
    email: "sarah@coastguard.gov.in",
    phone: "+91 9876543211",
    role: "official",
    organization: "Indian Coast Guard",
    designation: "Lieutenant",
    officialId: "ICG-2024-001",
    location: "Mumbai, Maharashtra",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

// Simulate authentication state
let currentUser: User | null = null

export const getCurrentUser = (): User | null => {
  return currentUser
}

export const setCurrentUser = (user: User | null) => {
  currentUser = user
}

export const login = async (email: string, password: string, userType: UserRole): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.role === userType)
  if (user) {
    setCurrentUser(user)
    return user
  }
  return null
}

export const logout = () => {
  setCurrentUser(null)
}

export const register = async (userData: Partial<User>): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: userData.name || "",
    email: userData.email || "",
    phone: userData.phone || "",
    role: userData.role || "citizen",
    organization: userData.organization,
    designation: userData.designation,
    officialId: userData.officialId,
    location: userData.location || "",
    isVerified: userData.role === "citizen", // Citizens auto-verified, officials need manual verification
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  setCurrentUser(newUser)
  return newUser
}

// Permission checks
export const canAccessDashboard = (user: User | null): boolean => {
  return user?.role === "official" || user?.role === "admin"
}

export const canVerifyReports = (user: User | null): boolean => {
  return user?.role === "official" || user?.role === "admin"
}

export const canSubmitReports = (user: User | null): boolean => {
  return user?.role === "citizen" || user?.role === "official" || user?.role === "admin"
}

export const canViewAnalytics = (user: User | null): boolean => {
  return user?.role === "official" || user?.role === "admin"
}
