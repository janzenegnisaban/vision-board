"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type Announcement = {
  id: string
  title: string
  content: string
  category: string
  displayType: string
  date: string
  author: {
    id: string
    name: string
  }
  image?: string
  images?: any
  hotspots?: any
  timelineEvents?: any
}

export default function AnnouncementsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch("/api/announcements")
        if (!response.ok) {
          throw new Error("Failed to fetch announcements")
        }
        const data = await response.json()
        setAnnouncements(data.announcements)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        toast({
          title: "Error",
          description: "Failed to load announcements. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [toast])

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3)
  }

  const handleEditAnnouncement = (id: string) => {
    router.push(`/dashboard/edit-announcement/${id}`)
  }

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete announcement")
      }

      toast({
        title: "Announcement deleted",
        description: "The announcement has been deleted successfully.",
      })

      // Update the announcements state to remove the deleted announcement
      setAnnouncements(announcements.filter((a) => a.id !== id))
    } catch (error) {
      console.error("Error deleting announcement:", error)
      toast({
        title: "Error",
        description: "Failed to delete announcement. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Update the renderAnnouncement function to include admin controls
  const renderAnnouncement = (announcement: Announcement) => {
    // Parse JSON fields if they exist
    const images = announcement.images
      ? typeof announcement.images === "string"
        ? JSON.parse(announcement.images)
        : announcement.images
      : null
    const hotspots = announcement.hotspots
      ? typeof announcement.hotspots === "string"
        ? JSON.parse(announcement.hotspots)
        : announcement.hotspots
      : null
    const timelineEvents = announcement.timelineEvents
      ? typeof announcement.timelineEvents === "string"
        ? JSON.parse(announcement.timelineEvents)
        : announcement.timelineEvents
      : null

    // Create admin controls that will be added to each announcement
    const adminControls =
      user && ["ADMIN", "SUPERADMIN"].includes(user.role) ? (
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => handleEditAnnouncement(announcement.id)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
            Delete
          </Button>
        </div>
      ) : null

    switch (announcement.displayType) {
      case "standard":
        return (
          <div className="space-y-2 p-4 border rounded-lg">
            <h3 className="font-medium text-lg">{announcement.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
            <div className="flex items-center text-xs text-slate-500 mt-2">
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>By: {announcement.author.name}</span>
              <span className="mx-2">•</span>
              <span>Category: {announcement.category}</span>
            </div>
            {adminControls}
          </div>
        )
      case "card":
        return (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
              </div>
              <CardDescription>{new Date(announcement.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {announcement.image && (
                <div className="w-full h-40 relative rounded-md overflow-hidden">
                  <Image
                    src={announcement.image || "/placeholder.svg"}
                    alt="Announcement image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
              <div className="flex items-center text-xs text-slate-500">
                <span>By: {announcement.author.name}</span>
                <span className="mx-2">•</span>
                <span>Category: {announcement.category}</span>
              </div>
              {adminControls}
            </CardContent>
          </Card>
        )
      case "banner":
        return (
          <div className="w-full relative h-48 rounded-lg overflow-hidden">
            <Image src={announcement.image || "/placeholder.svg"} alt="Banner image" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
              <h3 className="font-bold text-xl text-white">{announcement.title}</h3>
              <p className="text-sm text-white/80">{announcement.content}</p>
              <div className="flex items-center text-xs text-white/60 mt-2">
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>By: {announcement.author.name}</span>
              </div>
              {adminControls && <div className="mt-2">{adminControls}</div>}
            </div>
          </div>
        )
      case "grid":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{announcement.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {images &&
                Array.isArray(images) &&
                images.map((image: string, index: number) => (
                  <div key={index} className="aspect-square relative rounded-md overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg?height=200&width=200"}
                      alt={`Grid image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
            <div className="flex items-center text-xs text-slate-500">
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>By: {announcement.author.name}</span>
            </div>
            {adminControls}
          </div>
        )
      case "image_carousel":
        return (
          <div className="border rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
              {images && Array.isArray(images) && images.length > 0 ? (
                <Image
                  src={images[currentImageIndex % images.length] || "/placeholder.svg?height=200&width=400"}
                  alt={`Carousel image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image src="/placeholder.svg?height=200&width=400" alt="Placeholder" fill className="object-cover" />
              )}
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 text-slate-900 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 text-slate-900 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-black/50 p-3">
                <h3 className="font-medium text-white">{announcement.title}</h3>
                <p className="text-xs text-white/80 line-clamp-2">{announcement.content}</p>
              </div>
            </div>
            {images && Array.isArray(images) && (
              <div className="flex justify-center gap-1 p-2">
                {images.map((_: string, index: number) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index === currentImageIndex % images.length
                        ? "w-4 bg-slate-900 dark:bg-slate-50"
                        : "w-1.5 bg-slate-300 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            )}
            {adminControls}
          </div>
        )
      case "image_hotspots":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{announcement.title}</h3>
            <div className="relative w-full h-64 border rounded-md overflow-hidden">
              <Image
                src={announcement.image || "/placeholder.svg?height=300&width=500"}
                alt="Interactive image"
                fill
                className="object-cover"
              />
              {hotspots &&
                Array.isArray(hotspots) &&
                hotspots.map((hotspot: any, index: number) => (
                  <div
                    key={index}
                    className="absolute w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onMouseEnter={() => setActiveHotspot(index)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    {index + 1}
                    {activeHotspot === index && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 bg-white dark:bg-slate-800 rounded shadow-lg z-10 text-left">
                        <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{hotspot.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{hotspot.description}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
            <div className="flex items-center text-xs text-slate-500">
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>By: {announcement.author.name}</span>
            </div>
            {adminControls}
          </div>
        )
      case "timeline_view":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{announcement.title}</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-4 h-0.5 w-full bg-slate-200 dark:bg-slate-700"></div>

              {/* Timeline events */}
              {timelineEvents && Array.isArray(timelineEvents) && (
                <div className="flex justify-between relative pt-8">
                  {timelineEvents.map((event: any, index: number) => (
                    <div key={index} className="flex flex-col items-center w-1/3 px-2">
                      <div className="w-4 h-4 rounded-full bg-blue-500 absolute top-0 transform -translate-y-1/2"></div>
                      <div className="text-xs font-medium mb-1">{event.date}</div>
                      <div className="w-full h-24 relative rounded-md overflow-hidden mb-2">
                        <Image
                          src={event.image || "/placeholder.svg?height=100&width=200"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 text-center">{event.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">{announcement.content}</p>
            <div className="flex items-center text-xs text-slate-500">
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>By: {announcement.author.name}</span>
            </div>
            {adminControls}
          </div>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500">Loading announcements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
        {user && ["ADMIN", "SUPERADMIN"].includes(user.role) && (
          <Link href="/dashboard/create-announcement">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="update">Updates</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No announcements found</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAnnouncements.map((announcement) => (
                <div key={announcement.id}>{renderAnnouncement(announcement)}</div>
              ))}
            </div>
          )}
        </TabsContent>

        {["important", "event", "update", "general"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {filteredAnnouncements.filter((a) => a.category === category).length === 0 ? (
              <p className="text-center text-slate-500 py-8">No {category} announcements found</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAnnouncements
                  .filter((a) => a.category === category)
                  .map((announcement) => (
                    <div key={announcement.id}>{renderAnnouncement(announcement)}</div>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
