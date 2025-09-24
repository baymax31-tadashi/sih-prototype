"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { AlertTriangle, MapPin, Camera, Upload, Wifi, WifiOff, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/lib/translations"

export default function ReportPage() {
  const { toast } = useToast()
  const [isOnline, setIsOnline] = useState(true)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState("")
  const [formData, setFormData] = useState({
    hazardType: "",
    severity: "",
    description: "",
    location: "",
    media: null as File | null,
  })
  const { t } = useTranslation()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        }))
        setLocationError("")
        toast({
          title: "Location captured",
          description: "Your current location has been added to the report",
        })
      },
      (error) => {
        setLocationError("Unable to retrieve location. Please enter manually.")
        console.error("Location error:", error)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }
      setFormData((prev) => ({ ...prev, media: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.hazardType || !formData.severity || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    console.log("Report data:", formData)

    if (isOnline) {
      toast({
        title: "Report submitted",
        description: "Your hazard report has been sent to maritime officials",
      })
    } else {
      toast({
        title: "Report saved offline",
        description: "Your report will be sent when connection is restored",
      })
    }

    setFormData({
      hazardType: "",
      severity: "",
      description: "",
      location: "",
      media: null,
    })
    setLocation(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h1 className="text-3xl font-bold">{t("reportTitle")}</h1>
            </div>
            <p className="text-muted-foreground">{t("reportSubtitle")}</p>

            <div className="flex items-center justify-center gap-2 mt-4">
              {isOnline ? (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  <Wifi className="w-4 h-4 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                  <WifiOff className="w-4 h-4 mr-1" />
                  Offline Mode
                </Badge>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hazard Report Form</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help officials respond effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hazardType">{t("hazardType")} *</Label>
                  <Select onValueChange={(value) => handleInputChange("hazardType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectHazardType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil-spill">Oil Spill</SelectItem>
                      <SelectItem value="vessel-distress">Vessel in Distress</SelectItem>
                      <SelectItem value="debris">Marine Debris</SelectItem>
                      <SelectItem value="pollution">{t("pollution")}</SelectItem>
                      <SelectItem value="weather">Severe Weather</SelectItem>
                      <SelectItem value="navigation">Navigation Hazard</SelectItem>
                      <SelectItem value="wildlife">{t("wildlifeDisturbance")}</SelectItem>
                      <SelectItem value="infrastructure">Coastal Infrastructure Damage</SelectItem>
                      <SelectItem value="other">{t("other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">{t("severity")} *</Label>
                  <Select onValueChange={(value) => handleInputChange("severity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectSeverity")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                          {t("low")} - Minor concern
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                          {t("medium")} - Requires attention
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          {t("high")} - Immediate response needed
                        </div>
                      </SelectItem>
                      <SelectItem value="critical">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                          {t("critical")} - Emergency
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t("location")}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder={t("enterLocation")}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getCurrentLocation}
                      className="shrink-0 bg-transparent"
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  {locationError && <p className="text-sm text-destructive">{locationError}</p>}
                  {location && (
                    <p className="text-sm text-muted-foreground">
                      Current location captured: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t("description")} *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t("describeHazard")}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="media">{t("uploadPhotos")}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      id="media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="media" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        {formData.media ? (
                          <>
                            <Upload className="w-8 h-8 text-primary" />
                            <p className="text-sm font-medium">{formData.media.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(formData.media.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Camera className="w-8 h-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Click to upload photo or video</p>
                            <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={!formData.hazardType || !formData.severity || !formData.description}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isOnline ? t("submitReport") : "Save Report (Offline)"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h3 className="font-medium text-destructive mb-2">Emergency Situations</h3>
                <p className="text-sm text-muted-foreground">
                  For immediate emergencies requiring rescue or urgent response, call:
                </p>
                <div className="flex gap-4 mt-2">
                  <Badge variant="outline" className="border-destructive text-destructive">
                    Coast Guard: 1554
                  </Badge>
                  <Badge variant="outline" className="border-destructive text-destructive">
                    Emergency: 112
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
