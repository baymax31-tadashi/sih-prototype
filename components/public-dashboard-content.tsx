"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InteractiveMap } from "@/components/interactive-map"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertTriangle, MapPin, Clock, TrendingUp, Eye, Users, Activity, Shield, Zap, Globe } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function PublicDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const { t } = useTranslation()

  // Mock data for enhanced dashboard
  const publicStats = {
    totalReports: 1247,
    activeHazards: 23,
    resolvedToday: 8,
    publicViews: 15420,
    responseTime: "12m",
    accuracy: 94,
    communityMembers: 2847,
    alertsSent: 156,
  }

  const recentReports = [
    {
      id: 1,
      type: "Coastal Erosion",
      location: "Marina Beach, Chennai",
      severity: "Medium",
      time: "2 hours ago",
      status: "Under Review",
      reporter: "Citizen",
      verificationScore: 85,
    },
    {
      id: 2,
      type: "Oil Spill",
      location: "Kochi Port",
      severity: "High",
      time: "4 hours ago",
      status: "Active Response",
      reporter: "Official",
      verificationScore: 96,
    },
    {
      id: 3,
      type: "Debris",
      location: "Goa Coastline",
      severity: "Low",
      time: "6 hours ago",
      status: "Resolved",
      reporter: "Citizen",
      verificationScore: 78,
    },
    {
      id: 4,
      type: "Flooding",
      location: "Mumbai Marine Drive",
      severity: "High",
      time: "8 hours ago",
      status: "Active Response",
      reporter: "Official",
      verificationScore: 92,
    },
    {
      id: 5,
      type: "Infrastructure Damage",
      location: "Visakhapatnam Port",
      severity: "Medium",
      time: "12 hours ago",
      status: "Under Review",
      reporter: "Citizen",
      verificationScore: 88,
    },
  ]

  // Enhanced analytics data
  const hazardTrendData = [
    { name: "Jan", reports: 65, resolved: 58 },
    { name: "Feb", reports: 59, resolved: 52 },
    { name: "Mar", reports: 80, resolved: 75 },
    { name: "Apr", reports: 81, resolved: 78 },
    { name: "May", reports: 56, resolved: 51 },
    { name: "Jun", reports: 95, resolved: 89 },
  ]

  const hazardTypeData = [
    { name: "Coastal Erosion", value: 35, color: "#8884d8" },
    { name: "Oil Spills", value: 25, color: "#82ca9d" },
    { name: "Flooding", value: 20, color: "#ffc658" },
    { name: "Debris", value: 15, color: "#ff7300" },
    { name: "Other", value: 5, color: "#00ff00" },
  ]

  const responseTimeData = [
    { name: "Critical", avgTime: 8, target: 10 },
    { name: "High", avgTime: 15, target: 20 },
    { name: "Medium", avgTime: 45, target: 60 },
    { name: "Low", avgTime: 120, target: 180 },
  ]

  const hotspotData = [
    { location: "Mumbai Coast", reports: 45, trend: "+12%" },
    { location: "Chennai Marina", reports: 38, trend: "+8%" },
    { location: "Kochi Port", reports: 32, trend: "-5%" },
    { location: "Goa Beaches", reports: 28, trend: "+15%" },
    { location: "Visakhapatnam", reports: 24, trend: "+3%" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Response":
        return "destructive"
      case "Under Review":
        return "default"
      case "Resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Eye className="w-8 h-8 text-primary" />
            {t("dashboardTitle")}
          </h1>
          <p className="text-muted-foreground">{t("heroSubtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedTimeRange === "24h" ? "default" : "outline"}
            onClick={() => setSelectedTimeRange("24h")}
            size="sm"
          >
            24h
          </Button>
          <Button
            variant={selectedTimeRange === "7d" ? "default" : "outline"}
            onClick={() => setSelectedTimeRange("7d")}
            size="sm"
          >
            7d
          </Button>
          <Button
            variant={selectedTimeRange === "30d" ? "default" : "outline"}
            onClick={() => setSelectedTimeRange("30d")}
            size="sm"
          >
            30d
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{publicStats.totalReports}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
                <Progress value={75} className="mt-2 h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Hazards</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{publicStats.activeHazards}</div>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
                <Progress value={60} className="mt-2 h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{publicStats.responseTime}</div>
                <p className="text-xs text-muted-foreground">-3m from last week</p>
                <Progress value={85} className="mt-2 h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{publicStats.accuracy}%</div>
                <p className="text-xs text-muted-foreground">Report verification</p>
                <Progress value={94} className="mt-2 h-1" />
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved Today</p>
                    <p className="text-2xl font-bold text-green-600">{publicStats.resolvedToday}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("communitiesEngaged")}</p>
                    <p className="text-2xl font-bold">{publicStats.communityMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Alerts Sent</p>
                    <p className="text-2xl font-bold">{publicStats.alertsSent}</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Public Views</p>
                    <p className="text-2xl font-bold">{publicStats.publicViews}</p>
                  </div>
                  <Eye className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>{t("recentReports")}</CardTitle>
              <CardDescription>Latest coastal hazards with verification scores and detailed status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium">{report.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{report.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{report.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.reporter}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-2">
                        <div className="text-xs text-muted-foreground">Verification</div>
                        <div className="text-sm font-medium">{report.verificationScore}%</div>
                      </div>
                      <Badge variant={getSeverityColor(report.severity) as any}>{report.severity}</Badge>
                      <Badge variant={getStatusColor(report.status) as any}>{report.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hazard Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Hazard Trends</CardTitle>
                <CardDescription>Reports vs Resolutions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hazardTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reports" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="resolved" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hazard Types Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Hazard Types</CardTitle>
                <CardDescription>Distribution of reported hazard categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={hazardTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {hazardTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {hazardTypeData.map((item) => (
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

            {/* Response Time Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
                <CardDescription>Average response times by severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgTime" fill="#8884d8" />
                    <Bar dataKey="target" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Report Accuracy</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resolution Rate</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Engagement</span>
                    <span>76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>System Uptime</span>
                    <span>99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hotspots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hazard Hotspots</CardTitle>
              <CardDescription>Areas with highest concentration of reported hazards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotspotData.map((hotspot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{hotspot.location}</h4>
                        <p className="text-sm text-muted-foreground">{hotspot.reports} reports this month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={hotspot.trend.startsWith("+") ? "destructive" : "secondary"}>
                        {hotspot.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Hazard Map</CardTitle>
              <CardDescription>Interactive map showing current coastal hazards and hotspots</CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Public Notice */}
      <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Public Information Notice</h3>
              <p className="text-sm text-muted-foreground">
                This dashboard provides public access to coastal hazard information for awareness purposes. For
                emergency situations, please contact local authorities immediately. To report new hazards or access
                detailed management features, please{" "}
                <a href="/login" className="text-primary hover:underline">
                  {t("login")}
                </a>{" "}
                or{" "}
                <a href="/register" className="text-primary hover:underline">
                  {t("getStarted")}
                </a>{" "}
                as an official.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
