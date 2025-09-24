"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import { login } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { LogIn, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [citizenData, setCitizenData] = useState({ email: "", password: "" })
  const [officialData, setOfficialData] = useState({ email: "", password: "", officialId: "" })

  const handleCitizenLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await login(citizenData.email, citizenData.password, "citizen")
      if (user) {
        setUser(user)
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in as a citizen.",
        })
        router.push("/report")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOfficialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await login(officialData.email, officialData.password, "official")
      if (user) {
        setUser(user)
        toast({
          title: "Welcome back, Officer!",
          description: "You have successfully signed in to the officials dashboard.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials or unauthorized access.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your SAMUDRASETU account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Choose your account type to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="citizen" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="citizen" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Citizen
                  </TabsTrigger>
                  <TabsTrigger value="official" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Official
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="citizen" className="space-y-4">
                  <form onSubmit={handleCitizenLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="citizen-email">Email</Label>
                      <Input
                        id="citizen-email"
                        type="email"
                        value={citizenData.email}
                        onChange={(e) => setCitizenData({ ...citizenData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizen-password">Password</Label>
                      <Input
                        id="citizen-password"
                        type="password"
                        value={citizenData.password}
                        onChange={(e) => setCitizenData({ ...citizenData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <LogIn className="w-4 h-4 mr-2" />
                      {isLoading ? "Signing In..." : "Sign In as Citizen"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="official" className="space-y-4">
                  <form onSubmit={handleOfficialLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="official-email">Official Email</Label>
                      <Input
                        id="official-email"
                        type="email"
                        value={officialData.email}
                        onChange={(e) => setOfficialData({ ...officialData, email: e.target.value })}
                        placeholder="official.email@gov.in"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="official-id">Official ID</Label>
                      <Input
                        id="official-id"
                        value={officialData.officialId}
                        onChange={(e) => setOfficialData({ ...officialData, officialId: e.target.value })}
                        placeholder="Your official ID"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="official-password">Password</Label>
                      <Input
                        id="official-password"
                        type="password"
                        value={officialData.password}
                        onChange={(e) => setOfficialData({ ...officialData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <LogIn className="w-4 h-4 mr-2" />
                      {isLoading ? "Signing In..." : "Sign In as Official"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center space-y-2">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </Link>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
