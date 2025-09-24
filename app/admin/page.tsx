"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, Eye, MapPin, Calendar, Shield, TrendingUp } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import { useTranslation } from "@/lib/translations"

// Mock data for threat validation
const pendingReports = [
  {
    id: "RPT-001",
    title: "Severe Coastal Flooding",
    type: "Flood Alert",
    location: "Mumbai Marine Drive",
    reporter: "Rajesh Kumar",
    reporterAvatar: "/placeholder.svg?height=40&width=40",
    submittedAt: "2024-01-15T10:30:00Z",
    threatLevel: "High",
    status: "pending",
    description: "Heavy rainfall causing severe flooding along Marine Drive. Water level rising rapidly.",
    media: ["/coastal-flooding-infrastructure.jpg"],
    coordinates: { lat: 18.922, lng: 72.8347 },
    verificationScore: 85,
    socialMentions: 23,
    officialSources: 2,
  },
  {
    id: "RPT-002",
    title: "Oil Spill Detected",
    type: "Marine Pollution",
    location: "Goa Beaches",
    reporter: "Priya Singh",
    reporterAvatar: "/placeholder.svg?height=40&width=40",
    submittedAt: "2024-01-15T09:15:00Z",
    threatLevel: "Medium",
    status: "pending",
    description: "Large oil spill observed near popular tourist beaches. Marine life at risk.",
    media: ["/marine-pollution-oil-spill.jpg"],
    coordinates: { lat: 15.2993, lng: 74.124 },
    verificationScore: 72,
    socialMentions: 15,
    officialSources: 1,
  },
  {
    id: "RPT-003",
    title: "Infrastructure Damage",
    type: "Infrastructure Damage",
    location: "Kochi Port",
    reporter: "Mohammed Ali",
    reporterAvatar: "/placeholder.svg?height=40&width=40",
    submittedAt: "2024-01-15T08:45:00Z",
    threatLevel: "Low",
    status: "pending",
    description: "Pier damage observed after recent storm. Needs immediate attention.",
    media: ["/damaged-coastal-infrastructure.jpg"],
    coordinates: { lat: 9.9312, lng: 76.2673 },
    verificationScore: 91,
    socialMentions: 8,
    officialSources: 3,
  },
]

const validatedReports = [
  {
    id: "RPT-004",
    title: "Tsunami Warning",
    type: "Tsunami Warning",
    location: "Visakhapatnam Coast",
    reporter: "Sunita Patel",
    validatedBy: "Dr. Sharma",
    validatedAt: "2024-01-14T16:20:00Z",
    status: "verified",
    threatLevel: "Critical",
    actionTaken: "Emergency alert sent to coastal communities",
  },
  {
    id: "RPT-005",
    title: "Cyclone Alert",
    type: "Cyclone Alert",
    location: "Chennai Marina",
    reporter: "Ananya S",
    validatedBy: "Capt. Reddy",
    validatedAt: "2024-01-14T14:10:00Z",
    status: "verified",
    threatLevel: "High",
    actionTaken: "Fishing boats advised to return to harbor",
  },
]

const rejectedReports = [
  {
    id: "RPT-006",
    title: "False Alarm",
    type: "Flood Alert",
    location: "Kolkata Port",
    reporter: "Test User",
    rejectedBy: "Admin Team",
    rejectedAt: "2024-01-14T12:30:00Z",
    status: "rejected",
    reason: "Insufficient evidence and conflicting reports",
  },
]

export default function AdminDashboard() {
  const [selectedReport, setSelectedReport] = useState(null)
  const [validationAction, setValidationAction] = useState("")
  const [validationNotes, setValidationNotes] = useState("")
  const { t } = useTranslation()

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600"
      case "rejected":
        return "text-red-600"
      case "pending":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const handleValidation = (reportId: string, action: string) => {
    // In a real app, this would make an API call
    console.log(`${action} report ${reportId} with notes: ${validationNotes}`)
    setValidationAction("")
    setValidationNotes("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("adminTitle")}</h1>
            <p className="text-muted-foreground">Review and validate incoming hazard reports</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {pendingReports.length} Pending
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">{pendingReports.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified Today</p>
                  <p className="text-2xl font-bold">{validatedReports.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{rejectedReports.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">12m</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Review ({pendingReports.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({validatedReports.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedReports.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-48 h-32">
                      <Image
                        src={report.media[0] || "/placeholder.svg"}
                        alt={report.title}
                        width={200}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getThreatLevelColor(report.threatLevel)} text-white`}>
                        {report.threatLevel}
                      </Badge>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{report.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(report.submittedAt).toLocaleString()}</span>
                            </div>
                            <Badge variant="outline">{report.type}</Badge>
                          </div>
                          <p className="text-sm mb-3">{report.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={report.reporterAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {report.reporter
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Reported by {report.reporter}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Verification Score: {report.verificationScore}%</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {report.socialMentions} social mentions
                          </div>
                          <div className="text-sm text-muted-foreground">{report.officialSources} official sources</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getStatusColor(report.status)}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Review Report: {report.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Validation Action</label>
                                    <Select value={validationAction} onValueChange={setValidationAction}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select action" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="verify">Verify Report</SelectItem>
                                        <SelectItem value="reject">Reject Report</SelectItem>
                                        <SelectItem value="request-more-info">Request More Info</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Threat Level</label>
                                    <Select defaultValue={report.threatLevel.toLowerCase()}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="critical">{t("critical")}</SelectItem>
                                        <SelectItem value="high">{t("high")}</SelectItem>
                                        <SelectItem value="medium">{t("medium")}</SelectItem>
                                        <SelectItem value="low">{t("low")}</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Validation Notes</label>
                                  <Textarea
                                    placeholder="Add your validation notes here..."
                                    value={validationNotes}
                                    onChange={(e) => setValidationNotes(e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button onClick={() => handleValidation(report.id, validationAction)}>
                                    Submit Validation
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="default" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            {validatedReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{report.location}</span>
                        </div>
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge className={`${getThreatLevelColor(report.threatLevel)} text-white`}>
                          {report.threatLevel}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Reported by {report.reporter} • Validated by {report.validatedBy}
                      </p>
                      <p className="text-sm">Action Taken: {report.actionTaken}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="text-green-600 bg-green-50">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(report.validatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{report.location}</span>
                        </div>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Reported by {report.reporter} • Rejected by {report.rejectedBy}
                      </p>
                      <p className="text-sm">Reason: {report.reason}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive" className="bg-red-50 text-red-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejected
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(report.rejectedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
