"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { canAccessDashboard } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock } from "lucide-react"
import Link from "next/link"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: "citizen" | "official" | "admin"
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requireRole, fallback }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>You need to sign in to access this page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/register">Create Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  if (requireRole && user.role !== requireRole && user.role !== "admin") {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this page. Required role: {requireRole}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  // Special check for dashboard access
  if (requireRole === "official" && !canAccessDashboard(user)) {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
              <CardTitle>Official Access Required</CardTitle>
              <CardDescription>This dashboard is restricted to verified maritime officials only.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/report">Report a Hazard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
