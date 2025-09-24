"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Globe, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

const languages = [
  {
    code: "hi",
    name: "हिंदी (Hindi)",
    nativeName: "हिंदी",
    flag: "🇮🇳",
    speakers: "600M+",
  },
  {
    code: "gu",
    name: "ગુજરાતી (Gujarati)",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    speakers: "56M+",
  },
  {
    code: "mr",
    name: "मराठी (Marathi)",
    nativeName: "मराठी",
    flag: "🇮🇳",
    speakers: "83M+",
  },
  {
    code: "bn",
    name: "বাংলা (Bengali)",
    nativeName: "বাংলা",
    flag: "🇮🇳",
    speakers: "300M+",
  },
  {
    code: "ta",
    name: "தமிழ் (Tamil)",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    speakers: "78M+",
  },
  {
    code: "te",
    name: "తెలుగు (Telugu)",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    speakers: "96M+",
  },
  {
    code: "kn",
    name: "ಕನ್ನಡ (Kannada)",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    speakers: "44M+",
  },
  {
    code: "ml",
    name: "മലയാളം (Malayalam)",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
    speakers: "38M+",
  },
  {
    code: "or",
    name: "ଓଡ଼ିଆ (Odia)",
    nativeName: "ଓଡ଼ିଆ",
    flag: "🇮🇳",
    speakers: "38M+",
  },
  {
    code: "pa",
    name: "ਪੰਜਾਬੀ (Punjabi)",
    nativeName: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
    speakers: "113M+",
  },
  {
    code: "as",
    name: "অসমীয়া (Assamese)",
    nativeName: "অসমীয়া",
    flag: "🇮🇳",
    speakers: "15M+",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    speakers: "1.5B+",
  },
]

const topContributors = [
  {
    name: "Rajesh Kumar",
    location: "Chennai",
    reports: 165,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Priya Singh",
    location: "Kolkata",
    reports: 142,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mohammed Ali",
    location: "Kochi",
    reports: 128,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sunita Patel",
    location: "Mumbai",
    reports: 115,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const router = useRouter()

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
  }

  const handleSaveAndContinue = () => {
    // In a real app, this would save the language preference
    localStorage.setItem("selectedLanguage", selectedLanguage)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Select Your Language</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred language to use SAMUDRASETU in your native tongue. We support multiple Indian
            languages to make coastal safety accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Language Selection */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Available Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {languages.map((language) => (
                    <div
                      key={language.code}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedLanguage === language.code
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleLanguageSelect(language.code)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{language.flag}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{language.nativeName}</h3>
                            <p className="text-sm text-muted-foreground">{language.name}</p>
                          </div>
                        </div>
                        {selectedLanguage === language.code && <Check className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{language.speakers} speakers</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button onClick={handleSaveAndContinue} size="lg" className="px-8">
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current User Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">Ananya S</h3>
                  <p className="text-sm text-muted-foreground">Mumbai</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Your Rank</span>
                    <Badge variant="secondary">#5</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reports Submitted</span>
                    <span className="font-semibold">186</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-green-500 text-white text-xs p-2 rounded text-center">
                    <div className="text-lg mb-1">🏆</div>
                    <div>First Reporter</div>
                  </div>
                  <div className="bg-blue-500 text-white text-xs p-2 rounded text-center">
                    <div className="text-lg mb-1">✓</div>
                    <div>Verified</div>
                  </div>
                  <div className="bg-purple-500 text-white text-xs p-2 rounded text-center">
                    <div className="text-lg mb-1">🤝</div>
                    <div>Helper</div>
                  </div>
                  <div className="bg-yellow-500 text-white text-xs p-2 rounded text-center">
                    <div className="text-lg mb-1">⭐</div>
                    <div>Champion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{contributor.name}</h4>
                      <p className="text-xs text-muted-foreground">{contributor.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {contributor.reports}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Language Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Languages</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Most Popular</span>
                    <span className="font-semibold">Hindi</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span className="font-semibold">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Language Features */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Why Multilingual Support Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="font-semibold mb-2">Universal Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Report hazards in your native language for better accuracy and understanding
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-semibold mb-2">Community Inclusion</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with local communities and officials who speak your language
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="font-semibold mb-2">Faster Response</h3>
                  <p className="text-sm text-muted-foreground">
                    Emergency communications in local languages ensure quicker understanding
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
