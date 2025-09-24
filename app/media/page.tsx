"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Grid, List, Calendar, MapPin, Eye, Heart, Share2, Play } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import { useTranslation } from "@/lib/translations"

// Mock data for media gallery
const mediaItems = [
  {
    id: 1,
    title: "Cyclone Alert",
    type: "Cyclone Alert",
    location: "Mumbai Coast",
    date: "2024-01-15",
    views: 245,
    likes: 32,
    mediaType: "image",
    thumbnail: "/cyclone-flooding-boats.jpg",
    source: "Citizen Report",
  },
  {
    id: 2,
    title: "Flood Subm",
    type: "Flood Alert",
    location: "Chennai Marina",
    date: "2024-01-14",
    views: 189,
    likes: 28,
    mediaType: "image",
    thumbnail: "/coastal-flooding-infrastructure.jpg",
    source: "Official Report",
  },
  {
    id: 3,
    title: "Infrastructure Damage",
    type: "Infrastructure Damage",
    location: "Kochi Port",
    date: "2024-01-13",
    views: 156,
    likes: 19,
    mediaType: "image",
    thumbnail: "/damaged-coastal-infrastructure.jpg",
    source: "Social Media",
  },
  {
    id: 4,
    title: "Hazard Alert",
    type: "Marine Pollution",
    location: "Goa Beach",
    date: "2024-01-12",
    views: 203,
    likes: 41,
    mediaType: "video",
    thumbnail: "/marine-pollution-oil-spill.jpg",
    source: "Citizen Report",
  },
  {
    id: 5,
    title: "Ocean Coastal Hazard",
    type: "Tsunami Warning",
    location: "Visakhapatnam",
    date: "2024-01-11",
    views: 312,
    likes: 67,
    mediaType: "video",
    thumbnail: "/large-ocean-waves-tsunami.jpg",
    source: "Official Report",
  },
  {
    id: 6,
    title: "Flood",
    type: "Flood Alert",
    location: "Kolkata Port",
    date: "2024-01-10",
    views: 178,
    likes: 23,
    mediaType: "image",
    thumbnail: "/port-flooding-boats.jpg",
    source: "Social Media",
  },
]

const eventTypes = [
  "All Types",
  "Cyclone Alert",
  "Flood Alert",
  "Infrastructure Damage",
  "Marine Pollution",
  "Tsunami Warning",
]
const sources = ["All Sources", "Citizen Report", "Official Report", "Social Media"]

export default function MediaGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const { t } = useTranslation()

  const filteredItems = mediaItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesEventType = selectedEventTypes.length === 0 || selectedEventTypes.includes(item.type)
      const matchesSource = selectedSources.length === 0 || selectedSources.includes(item.source)

      return matchesSearch && matchesEventType && matchesSource
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "most-viewed":
          return b.views - a.views
        case "most-liked":
          return b.likes - a.likes
        default:
          return 0
      }
    })

  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    if (checked) {
      setSelectedEventTypes([...selectedEventTypes, eventType])
    } else {
      setSelectedEventTypes(selectedEventTypes.filter((type) => type !== eventType))
    }
  }

  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSelectedSources([...selectedSources, source])
    } else {
      setSelectedSources(selectedSources.filter((s) => s !== source))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("mediaTitle")}</h1>
            <p className="text-muted-foreground">Browse and filter hazard reports with visual content</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {(selectedEventTypes.length > 0 || selectedSources.length > 0) && (
              <Badge variant="secondary" className="ml-2">
                {selectedEventTypes.length + selectedSources.length}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 space-y-6">
              {/* Event Type Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Event Type</h3>
                  <div className="space-y-2">
                    {eventTypes.slice(1).map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedEventTypes.includes(type)}
                          onCheckedChange={(checked) => handleEventTypeChange(type, checked as boolean)}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Date Range Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Date Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="last24h" />
                      <label htmlFor="last24h" className="text-sm">
                        Last 24 hours
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lastweek" />
                      <label htmlFor="lastweek" className="text-sm">
                        Last week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="lastmonth" />
                      <label htmlFor="lastmonth" className="text-sm">
                        Last month
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Filter */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Source</h3>
                  <div className="space-y-2">
                    {sources.slice(1).map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={source}
                          checked={selectedSources.includes(source)}
                          onCheckedChange={(checked) => handleSourceChange(source, checked as boolean)}
                        />
                        <label
                          htmlFor={source}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {source}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full">Apply Filters</Button>
            </div>
          )}

          {/* Media Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {item.mediaType === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        {item.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                        <Calendar className="h-4 w-4 ml-2" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-48 h-32">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            width={200}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                          {item.mediaType === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 rounded-full p-2">
                                <Play className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge variant="secondary">{item.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <Badge variant="outline">{item.source}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{item.views} views</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{item.likes} likes</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
