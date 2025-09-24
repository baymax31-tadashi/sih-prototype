"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Award, MapPin, Target } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useTranslation } from "@/lib/translations"

// Mock data for gamification
const currentUser = {
  name: "Ananya S",
  location: "Mumbai",
  rank: 5,
  points: 186,
  level: "Astray Indiscretions",
  avatar: "/placeholder.svg?height=60&width=60",
  badges: [
    { name: "First Reporter", color: "bg-green-500", icon: "🏆" },
    { name: "Verified Reporter", color: "bg-blue-500", icon: "✓" },
    { name: "Community Helper", color: "bg-purple-500", icon: "🤝" },
    { name: "Safety Champion", color: "bg-yellow-500", icon: "⭐" },
  ],
  stats: {
    reportsSubmitted: 23,
    accuracy: 94,
    helpfulVotes: 156,
    daysActive: 45,
  },
}

const leaderboard = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    location: "Chennai",
    points: 842,
    reports: 67,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Champion",
  },
  {
    rank: 2,
    name: "Priya Singh",
    location: "Kolkata",
    points: 756,
    reports: 54,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Expert",
  },
  {
    rank: 3,
    name: "Mohammed Ali",
    location: "Kochi",
    points: 689,
    reports: 48,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Veteran",
  },
  {
    rank: 4,
    name: "Sunita Patel",
    location: "Surat",
    points: 623,
    reports: 41,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Advanced",
  },
  {
    rank: 5,
    name: "Ananya S",
    location: "Mumbai",
    points: 186,
    reports: 23,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Rising Star",
    isCurrentUser: true,
  },
]

const achievements = [
  {
    title: "First Report",
    description: "Submit your first hazard report",
    icon: "🎯",
    completed: true,
    points: 10,
  },
  {
    title: "Accuracy Expert",
    description: "Maintain 90%+ accuracy for 10 reports",
    icon: "🎯",
    completed: true,
    points: 50,
  },
  {
    title: "Community Helper",
    description: "Help verify 25 reports from other users",
    icon: "🤝",
    completed: true,
    points: 75,
  },
  {
    title: "Speed Reporter",
    description: "Submit 5 reports within 24 hours",
    icon: "⚡",
    completed: false,
    points: 30,
    progress: 60,
  },
  {
    title: "Regional Champion",
    description: "Be the top reporter in your region",
    icon: "👑",
    completed: false,
    points: 100,
    progress: 25,
  },
]

const reportCategories = [
  {
    name: "Marine Density Reports",
    userRank: 5,
    totalReports: 8,
    accuracy: 92,
    badges: ["Beginner", "Observer", "Analyst", "Expert"],
  },
  {
    name: "Marine Pollution Reports",
    userRank: 3,
    totalReports: 15,
    accuracy: 96,
    badges: ["Beginner", "Observer", "Analyst", "Expert"],
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("leaderboard")
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("communityTitle")}</h1>
            <p className="text-muted-foreground">Recognize and celebrate our top contributors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{currentUser.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {currentUser.location}
                  </p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Rank</span>
                    <Badge variant="secondary">#{currentUser.rank}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Points</span>
                    <span className="font-semibold">{currentUser.points}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Level</span>
                    <Badge>{currentUser.level}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {currentUser.badges.map((badge, index) => (
                    <div key={index} className={`${badge.color} text-white text-xs p-2 rounded text-center`}>
                      <div className="text-lg mb-1">{badge.icon}</div>
                      <div className="text-xs">{badge.name}</div>
                    </div>
                  ))}
                </div>

                <Button className="w-full">View Full Profile</Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Reports Submitted</span>
                  <span className="font-semibold">{currentUser.stats.reportsSubmitted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accuracy Rate</span>
                  <span className="font-semibold">{currentUser.stats.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Helpful Votes</span>
                  <span className="font-semibold">{currentUser.stats.helpfulVotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Days Active</span>
                  <span className="font-semibold">{currentUser.stats.daysActive}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="leaderboard" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user) => (
                        <div
                          key={user.rank}
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            user.isCurrentUser ? "bg-primary/5 border-primary" : "bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                              {user.rank}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {user.location}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{user.points} pts</div>
                            <div className="text-sm text-muted-foreground">{user.reports} reports</div>
                            <Badge variant="outline" className="mt-1">
                              {user.badge}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      Achievements & Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.completed ? "bg-green-50 border-green-200" : "bg-card"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant={achievement.completed ? "default" : "secondary"}>
                                  {achievement.points} pts
                                </Badge>
                                {achievement.completed ? (
                                  <Badge variant="default" className="bg-green-500">
                                    Completed
                                  </Badge>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Progress value={achievement.progress} className="w-16 h-2" />
                                    <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      Report Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reportCategories.map((category, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">{category.name}</h4>
                            <Badge variant="outline">Rank #{category.userRank}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{category.totalReports}</div>
                              <div className="text-sm text-muted-foreground">Reports</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-500">{category.accuracy}%</div>
                              <div className="text-sm text-muted-foreground">Accuracy</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-500">⭐</div>
                              <div className="text-sm text-muted-foreground">Expert Level</div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {category.badges.map((badge, badgeIndex) => (
                              <Badge
                                key={badgeIndex}
                                variant={badgeIndex < 3 ? "default" : "secondary"}
                                className={badgeIndex < 3 ? "bg-green-500" : ""}
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
