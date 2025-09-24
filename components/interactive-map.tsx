"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Waves, AlertTriangle, Info, Zap } from "lucide-react"

// Mock data for map markers
const mockMapData = [
  {
    id: "RPT-001",
    type: "Oil Spill",
    severity: "high",
    lat: 19.076,
    lng: 72.8777,
    location: "Mumbai Coast",
    status: "pending",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "RPT-002",
    type: "Vessel Distress",
    severity: "critical",
    lat: 9.9312,
    lng: 76.2673,
    location: "Kochi Harbor",
    status: "verified",
    timestamp: "2024-01-15T09:15:00Z",
  },
  {
    id: "RPT-003",
    type: "Marine Debris",
    severity: "medium",
    lat: 13.0827,
    lng: 80.2707,
    location: "Chennai Beach",
    status: "resolved",
    timestamp: "2024-01-15T08:45:00Z",
  },
  {
    id: "RPT-004",
    type: "Weather Alert",
    severity: "high",
    lat: 15.2993,
    lng: 74.124,
    location: "Goa Coast",
    status: "verified",
    timestamp: "2024-01-15T07:20:00Z",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "#dc2626"
    case "high":
      return "#ea580c"
    case "medium":
      return "#ca8a04"
    case "low":
      return "#16a34a"
    default:
      return "#6b7280"
  }
}

const getMarkerIcon = (type: string) => {
  switch (type) {
    case "Oil Spill":
      return "🛢️"
    case "Vessel Distress":
      return "🚢"
    case "Marine Debris":
      return "🗑️"
    case "Weather Alert":
      return "⛈️"
    default:
      return "⚠️"
  }
}

export function InteractiveMap() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 15.0, lng: 77.0 }) // Center of Indian coast
  const [zoomLevel, setZoomLevel] = useState(6)

  // Simulate map interaction
  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId)
  }

  const selectedReport = mockMapData.find((report) => report.id === selectedMarker)

  // Calculate hotspots (areas with multiple reports)
  const hotspots = [
    { lat: 19.076, lng: 72.8777, count: 3, area: "Mumbai Region" },
    { lat: 13.0827, lng: 80.2707, count: 2, area: "Chennai Region" },
  ]

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Coastal Hazard Map
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-destructive border-destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {mockMapData.filter((r) => r.severity === "critical").length} Critical
              </Badge>
              <Badge variant="outline" className="text-chart-4 border-chart-4">
                <Zap className="w-3 h-3 mr-1" />
                {mockMapData.filter((r) => r.severity === "high").length} High Priority
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Interface */}
          <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden border">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="text-blue-300">
                <defs>
                  <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 Q10 10 20 20 T40 20" stroke="currentColor" fill="none" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#waves)" />
              </svg>
            </div>

            {/* Coastline Simulation */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" className="text-green-600 opacity-30">
                <path
                  d="M0 200 Q100 180 200 200 T400 200 Q500 220 600 200 T800 200 L800 400 L0 400 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Hotspot Indicators */}
            {hotspots.map((hotspot, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{
                  left: `${((hotspot.lng - 70) / 15) * 100}%`,
                  top: `${((20 - hotspot.lat) / 10) * 100}%`,
                }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-destructive/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-16 h-16 bg-destructive/30 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-destructive">{hotspot.count}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Report Markers */}
            {mockMapData.map((report) => (
              <div
                key={report.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
                style={{
                  left: `${((report.lng - 70) / 15) * 100}%`,
                  top: `${((20 - report.lat) / 10) * 100}%`,
                }}
                onClick={() => handleMarkerClick(report.id)}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: getSeverityColor(report.severity) }}
                >
                  {getMarkerIcon(report.type)}
                </div>
                {selectedMarker === report.id && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-white rounded-lg shadow-lg p-3 min-w-48 border">
                      <div className="text-sm font-medium">{report.type}</div>
                      <div className="text-xs text-muted-foreground">{report.location}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: getSeverityColor(report.severity),
                            color: "white",
                          }}
                        >
                          {report.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {report.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm"
                onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 10))}
              >
                +
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm"
                onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
              >
                -
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
              <div className="font-medium mb-2">Severity Levels</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                  <span>Critical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hotspot Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-destructive" />
              Active Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotspots.map((hotspot, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium">{hotspot.area}</div>
                    <div className="text-sm text-muted-foreground">
                      {hotspot.lat.toFixed(4)}°N, {hotspot.lng.toFixed(4)}°E
                    </div>
                  </div>
                  <Badge variant="destructive">{hotspot.count} Reports</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Map Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Active Reports</span>
                <Badge variant="outline">{mockMapData.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Coverage Area</span>
                <Badge variant="outline">Indian Coastline</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <Badge variant="outline">2 min ago</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Teams</span>
                <Badge variant="outline" className="text-accent border-accent">
                  12 Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
