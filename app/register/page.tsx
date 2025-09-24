"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import { register } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Shield, Users, Loader2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const { toast } = useToast()
  const [userType, setUserType] = useState<"citizen" | "official" | "">("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    organization: "",
    designation: "",
    officialId: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userType) {
      toast({
        title: "Account type required",
        description: "Please select whether you're registering as a citizen or official.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        role: userType as "citizen" | "official",
        ...(userType === "official" && {
          organization: formData.organization,
          designation: formData.designation,
          officialId: formData.officialId,
        }),
      }

      const newUser = await register(userData)

      if (newUser) {
        setUser(newUser)
        toast({
          title: "Account created successfully!",
          description: `Welcome to SAMUDRASETU, ${newUser.name}. ${
            userType === "official"
              ? "Your account is pending verification by administrators."
              : "You can now start reporting coastal hazards."
          }`,
        })

        // Redirect based on user type
        if (userType === "citizen") {
          router.push("/report")
        } else {
          router.push("/dashboard")
        }
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join SAMUDRASETU</h1>
            <p className="text-muted-foreground">Register to start reporting hazards or monitoring coastal safety</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>Choose your account type and provide the required information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Account Type</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${
                        userType === "citizen" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setUserType("citizen")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Citizen</div>
                            <div className="text-sm text-muted-foreground">Report coastal hazards</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        userType === "official" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setUserType("official")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="font-medium">Official</div>
                            <div className="text-sm text-muted-foreground">Monitor and respond</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {userType && (
                  <>
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Basic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location/Area *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="City, State"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Official-specific fields */}
                    {userType === "official" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Official Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="organization">Organization *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange("organization", value)}
                              disabled={isLoading}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="coast-guard">Indian Coast Guard</SelectItem>
                                <SelectItem value="navy">Indian Navy</SelectItem>
                                <SelectItem value="incois">INCOIS</SelectItem>
                                <SelectItem value="port-authority">Port Authority</SelectItem>
                                <SelectItem value="state-maritime">State Maritime Board</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="designation">Designation *</Label>
                            <Input
                              id="designation"
                              value={formData.designation}
                              onChange={(e) => handleInputChange("designation", e.target.value)}
                              placeholder="Your designation"
                              required
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="officialId">Official ID/Badge Number *</Label>
                          <Input
                            id="officialId"
                            value={formData.officialId}
                            onChange={(e) => handleInputChange("officialId", e.target.value)}
                            placeholder="Enter your official ID"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                          disabled={isLoading}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={!formData.agreeToTerms || isLoading} size="lg">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-2" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Sign in here
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
