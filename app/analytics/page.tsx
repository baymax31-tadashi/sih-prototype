"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Twitter, Facebook, Instagram, TrendingUp, Globe, Heart, MessageCircle, Share2 } from "lucide-react"
import { Navigation } from "@/components/navigation"

// Mock data for social media monitoring
const sentimentData = [
  { name: "Jan", positive: 65, negative: 35 },
  { name: "Feb", positive: 59, negative: 41 },
  { name: "Mar", positive: 80, negative: 20 },
  { name: "Apr", positive: 81, negative: 19 },
  { name: "May", positive: 56, negative: 44 },
  { name: "Jun", positive: 55, negative: 45 },
]

const sourceBreakdown = [
  { name: "Twitter", value: 60, color: "#1DA1F2" },
  { name: "Facebook", value: 30, color: "#4267B2" },
  { name: "Instagram", value: 10, color: "#E4405F" },
]

const trendingKeywords = [
  { word: "Heavy Rain", size: "text-4xl", color: "text-blue-600" },
  { word: "Flood", size: "text-3xl", color: "text-red-600" },
  { word: "Cyclone", size: "text-2xl", color: "text-orange-600" },
  { word: "Alert", size: "text-3xl", color: "text-yellow-600" },
  { word: "Damage", size: "text-2xl", color: "text-red-500" },
  { word: "Safe", size: "text-xl", color: "text-green-600" },
  { word: "Relief", size: "text-xl", color: "text-blue-500" },
  { word: "Emergency", size: "text-2xl", color: "text-red-700" },
]

const liveFeedData = [
  {
    id: 1,
    platform: "twitter",
    user: "@coastal_watch",
    content: "Massive waves hitting coast roads are #2FeetFirst",
    timestamp: "2 min ago",
    sentiment: "negative",
    engagement: { likes: 45, retweets: 12, replies: 8 },
  },
  {
    id: 2,
    platform: "facebook",
    user: "Public Safety Group",
    content: "Relief teams, seawalls, stay safe everyone! #CommunitySupport",
    timestamp: "5 min ago",
    sentiment: "positive",
    engagement: { likes: 89, shares: 23, comments: 15 },
  },
]

export default function SocialAnalytics() {
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Social Listening & Sentiment Analysis</h1>
            <p className="text-muted-foreground">
              Monitor social media mentions and analyze public sentiment about coastal hazards
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Platform Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={selectedPlatform === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPlatform("all")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  All Platforms
                </Button>
                <Button
                  variant={selectedPlatform === "twitter" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPlatform("twitter")}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant={selectedPlatform === "facebook" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPlatform("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant={selectedPlatform === "instagram" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPlatform("instagram")}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
              </CardContent>
            </Card>

            {/* Keywords Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keywords</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Negative</span>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Positive</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Neutral</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Negative</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Range */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Date Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Recent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* World Map Placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="relative h-80 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive World Map</p>
                    <p className="text-sm text-muted-foreground">Social media mentions by location</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Sentiment Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Source Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Source Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={sourceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sourceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {sourceBreakdown.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trending Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Trending Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 items-center justify-center p-4">
                    {trendingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className={`${keyword.size} ${keyword.color} font-bold hover:opacity-80 cursor-pointer transition-opacity`}
                      >
                        {keyword.word}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Live Feed Snippets */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Feed Snippets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liveFeedData.map((post) => (
                    <div key={post.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        {post.platform === "twitter" && <Twitter className="h-4 w-4 text-blue-500" />}
                        {post.platform === "facebook" && <Facebook className="h-4 w-4 text-blue-600" />}
                        <span className="font-medium text-sm">{post.user}</span>
                        <Badge variant={post.sentiment === "positive" ? "default" : "destructive"} className="text-xs">
                          {post.sentiment}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{post.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.timestamp}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.engagement.likes || post.engagement.retweets}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.engagement.replies || post.engagement.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            <span>{post.engagement.retweets || post.engagement.shares}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
