"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Bell, ChevronLeft, ChevronRight, Loader2, Upload, X } from "lucide-react"

export default function CreateAnnouncementPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("Announcement Title")
  const [content, setContent] = useState(
    "This is a sample announcement content. It will be displayed according to the selected display type.",
  )
  const [displayType, setDisplayType] = useState("standard")
  const [category, setCategory] = useState("general")
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=200&width=400",
    "/placeholder.svg?height=200&width=400",
    "/placeholder.svg?height=200&width=400",
  ])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // For Image Hotspots
  const [hotspots, setHotspots] = useState([
    { x: 25, y: 30, title: "Feature 1", description: "This is the first feature" },
    { x: 60, y: 50, title: "Feature 2", description: "This is the second feature" },
    { x: 80, y: 70, title: "Feature 3", description: "This is the third feature" },
  ])
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [newHotspot, setNewHotspot] = useState({ title: "", description: "" })
  const [addingHotspot, setAddingHotspot] = useState(false)

  // For Timeline View
  const [timelineEvents, setTimelineEvents] = useState([
    {
      date: "Jan 2025",
      title: "Phase 1",
      description: "Initial launch",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      date: "Mar 2025",
      title: "Phase 2",
      description: "Feature expansion",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      date: "Jun 2025",
      title: "Phase 3",
      description: "Market growth",
      image: "/placeholder.svg?height=100&width=200",
    },
  ])
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    description: "",
    image: "/placeholder.svg?height=100&width=200",
  })
  const [addingEvent, setAddingEvent] = useState(false)

  // Check if user has admin or superadmin role
  useEffect(() => {
    if (user && !["ADMIN", "SUPERADMIN"].includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // This is a mock implementation - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Announcement created",
        description: "Your announcement has been published successfully.",
      })

      // Reset form
      setTitle("Announcement Title")
      setContent("This is a sample announcement content. It will be displayed according to the selected display type.")
      setDisplayType("standard")
      setCategory("")

      // Redirect to dashboard
      router.push("/dashboard/announcements")
    } catch (error) {
      toast({
        title: "Failed to create announcement",
        description: "There was an error creating your announcement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newImages = [...images]
      for (let i = 0; i < Math.min(files.length, 5 - images.length); i++) {
        // In a real app, you would upload the file to a server and get a URL back
        // For this demo, we'll just use the placeholder
        newImages.push("/placeholder.svg?height=200&width=400")
      }
      setImages(newImages)
      toast({
        title: "Images added",
        description: "Your images have been added to the announcement.",
      })
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const addHotspot = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!addingHotspot) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (newHotspot.title && newHotspot.description) {
      setHotspots([...hotspots, { x, y, title: newHotspot.title, description: newHotspot.description }])
      setNewHotspot({ title: "", description: "" })
      setAddingHotspot(false)

      toast({
        title: "Hotspot added",
        description: "Your hotspot has been added to the image.",
      })
    }
  }

  const removeHotspot = (index: number) => {
    setHotspots(hotspots.filter((_, i) => i !== index))
  }

  const addTimelineEvent = () => {
    if (newEvent.date && newEvent.title && newEvent.description) {
      setTimelineEvents([...timelineEvents, { ...newEvent }])
      setNewEvent({ date: "", title: "", description: "", image: "/placeholder.svg?height=100&width=200" })
      setAddingEvent(false)

      toast({
        title: "Event added",
        description: "Your event has been added to the timeline.",
      })
    }
  }

  const removeTimelineEvent = (index: number) => {
    setTimelineEvents(timelineEvents.filter((_, i) => i !== index))
  }

  // Render preview based on selected display type
  const renderPreview = () => {
    switch (displayType) {
      case "standard":
        return (
          <div className="space-y-2 p-4 border rounded-lg">
            <h3 className="font-medium text-lg">{title || "Announcement Title"}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {content || "This is a sample announcement content."}
            </p>
            <div className="flex items-center text-xs text-slate-500 mt-2">
              <span>Posted just now</span>
              <span className="mx-2">•</span>
              <span>Category: {category || "General"}</span>
            </div>
          </div>
        )
      case "card":
        return (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <CardTitle className="text-lg">{title || "Announcement Title"}</CardTitle>
              </div>
              <CardDescription>Posted just now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="w-full h-40 relative rounded-md overflow-hidden">
                <Image src={images[0] || "/placeholder.svg"} alt="Announcement image" fill className="object-cover" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {content || "This is a sample announcement content."}
              </p>
            </CardContent>
          </Card>
        )
      case "banner":
        return (
          <div className="w-full relative h-48 rounded-lg overflow-hidden">
            <Image src={images[0] || "/placeholder.svg"} alt="Banner image" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
              <h3 className="font-bold text-xl text-white">{title || "Announcement Title"}</h3>
              <p className="text-sm text-white/80 line-clamp-2">
                {content || "This is a sample announcement content."}
              </p>
            </div>
          </div>
        )
      case "popup":
        return (
          <div className="border rounded-lg shadow-lg p-4 bg-white dark:bg-slate-950">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{title || "Announcement Title"}</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {content || "This is a sample announcement content."}
            </p>
            <div className="flex justify-end">
              <Button size="sm">View Details</Button>
            </div>
          </div>
        )
      case "image-carousel":
        return (
          <div className="border rounded-lg overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Carousel image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
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
                <h3 className="font-medium text-white">{title || "Announcement Title"}</h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  {content || "This is a sample announcement content."}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-1 p-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full ${
                    index === currentImageIndex
                      ? "w-4 bg-slate-900 dark:bg-slate-50"
                      : "w-1.5 bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        )
      case "grid":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{title || "Announcement Title"}</h3>
            <div className="grid grid-cols-2 gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square relative rounded-md overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Grid image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {content || "This is a sample announcement content."}
            </p>
          </div>
        )
      case "timeline":
        return (
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-900 dark:bg-slate-50 absolute -ml-[22px]" />
              <span className="text-xs text-slate-500">Just now</span>
            </div>
            <h3 className="font-medium text-lg">{title || "Announcement Title"}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {content || "This is a sample announcement content."}
            </p>
            {images.length > 0 && (
              <div className="w-full h-40 relative rounded-md overflow-hidden">
                <Image src={images[0] || "/placeholder.svg"} alt="Timeline image" fill className="object-cover" />
              </div>
            )}
          </div>
        )
      case "image-hotspots":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{title || "Announcement Title"}</h3>
            <div className="relative w-full h-64 border rounded-md overflow-hidden">
              <Image src={images[0] || "/placeholder.svg"} alt="Interactive image" fill className="object-cover" />
              {hotspots.map((hotspot, index) => (
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
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {content || "This is a sample announcement content."}
            </p>
          </div>
        )
      case "timeline-view":
        return (
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{title || "Announcement Title"}</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-4 h-0.5 w-full bg-slate-200 dark:bg-slate-700"></div>

              {/* Timeline events */}
              <div className="flex justify-between relative pt-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="flex flex-col items-center w-1/3 px-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 absolute top-0 transform -translate-y-1/2"></div>
                    <div className="text-xs font-medium mb-1">{event.date}</div>
                    <div className="w-full h-24 relative rounded-md overflow-hidden mb-2">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 text-center">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
              {content || "This is a sample announcement content."}
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create Announcement</h2>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Announcement Details</CardTitle>
              <CardDescription>Create a new announcement to share with users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter announcement content"
                  className="min-h-[150px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Display Type</Label>
                <RadioGroup value={displayType} onValueChange={setDisplayType} className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-normal">
                      Standard Text
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="font-normal">
                      Card with Image
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="banner" id="banner" />
                    <Label htmlFor="banner" className="font-normal">
                      Full-width Banner
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="popup" id="popup" />
                    <Label htmlFor="popup" className="font-normal">
                      Modal Popup
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="image-carousel" id="image-carousel" />
                    <Label htmlFor="image-carousel" className="font-normal">
                      Image Carousel
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="grid" id="grid" />
                    <Label htmlFor="grid" className="font-normal">
                      Image Grid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="timeline" id="timeline" />
                    <Label htmlFor="timeline" className="font-normal">
                      Timeline Entry
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="image-hotspots" id="image-hotspots" />
                    <Label htmlFor="image-hotspots" className="font-normal">
                      Image Hotspots
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-2">
                    <RadioGroupItem value="timeline-view" id="timeline-view" />
                    <Label htmlFor="timeline-view" className="font-normal">
                      Timeline View
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {["card", "banner", "image-carousel", "grid", "timeline", "image-hotspots"].includes(displayType) && (
                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {images.map((image, index) => (
                      <div key={index} className="aspect-video relative rounded-md overflow-hidden border">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {images.length < 5 && (
                      <div className="aspect-video flex items-center justify-center border rounded-md border-dashed">
                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center p-2">
                          <Upload className="h-6 w-6 text-slate-400 mb-1" />
                          <span className="text-xs text-slate-500">Add Image</span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Upload up to 5 images. For best results, use images with a 16:9 aspect ratio.
                  </p>
                </div>
              )}

              {displayType === "image-hotspots" && (
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Image Hotspots</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => setAddingHotspot(!addingHotspot)}>
                      {addingHotspot ? "Cancel" : "Add Hotspot"}
                    </Button>
                  </div>

                  {addingHotspot && (
                    <div className="space-y-3 border-t pt-3">
                      <p className="text-xs text-slate-500">Click on the image in the preview to place a hotspot</p>
                      <div className="space-y-2">
                        <Label htmlFor="hotspot-title">Hotspot Title</Label>
                        <Input
                          id="hotspot-title"
                          placeholder="Enter hotspot title"
                          value={newHotspot.title}
                          onChange={(e) => setNewHotspot({ ...newHotspot, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hotspot-description">Hotspot Description</Label>
                        <Input
                          id="hotspot-description"
                          placeholder="Enter hotspot description"
                          value={newHotspot.description}
                          onChange={(e) => setNewHotspot({ ...newHotspot, description: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {hotspots.length > 0 && (
                    <div className="space-y-2">
                      <Label>Current Hotspots</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {hotspots.map((hotspot, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-md p-2">
                            <div>
                              <div className="font-medium text-sm">{hotspot.title}</div>
                              <div className="text-xs text-slate-500">{hotspot.description}</div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() => removeHotspot(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {displayType === "timeline-view" && (
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Timeline Events</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => setAddingEvent(!addingEvent)}>
                      {addingEvent ? "Cancel" : "Add Event"}
                    </Button>
                  </div>

                  {addingEvent && (
                    <div className="space-y-3 border-t pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="event-date">Date</Label>
                          <Input
                            id="event-date"
                            placeholder="e.g., Jan 2025"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="event-title">Title</Label>
                          <Input
                            id="event-title"
                            placeholder="Enter event title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-description">Description</Label>
                        <Input
                          id="event-description"
                          placeholder="Enter event description"
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        />
                      </div>
                      <Button type="button" variant="secondary" size="sm" className="w-full" onClick={addTimelineEvent}>
                        Add to Timeline
                      </Button>
                    </div>
                  )}

                  {timelineEvents.length > 0 && (
                    <div className="space-y-2">
                      <Label>Current Timeline Events</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {timelineEvents.map((event, index) => (
                          <div key={index} className="flex items-center justify-between border rounded-md p-2">
                            <div>
                              <div className="font-medium text-sm">{event.title}</div>
                              <div className="text-xs text-slate-500">
                                {event.date} - {event.description}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() => removeTimelineEvent(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Announcement"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your announcement will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-4 bg-white dark:bg-slate-950"
                onClick={displayType === "image-hotspots" && addingHotspot ? addHotspot : undefined}
              >
                {renderPreview()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Type Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayType === "standard" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Standard text displays your announcement as simple text with a title and content. Best for simple
                    announcements that don't need visual elements.
                  </p>
                )}
                {displayType === "card" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Card with image displays your announcement in a card format with a featured image at the top. Good
                    for announcements that benefit from visual context.
                  </p>
                )}
                {displayType === "banner" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Full-width banner displays your announcement as a prominent banner with text overlay on an image.
                    Ideal for important announcements you want to highlight.
                  </p>
                )}
                {displayType === "popup" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Modal popup displays your announcement in a popup window that appears over the content. Best for
                    critical announcements that require immediate attention.
                  </p>
                )}
                {displayType === "image-carousel" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Image carousel displays multiple images in a scrollable carousel. Perfect for announcements with
                    multiple visual elements or step-by-step instructions.
                  </p>
                )}
                {displayType === "grid" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Image grid displays multiple images in a grid layout. Great for visual announcements like photo
                    galleries or showcasing multiple items.
                  </p>
                )}
                {displayType === "timeline" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Timeline entry displays your announcement as part of a chronological timeline. Useful for updates,
                    progress reports, or historical information.
                  </p>
                )}
                {displayType === "image-hotspots" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Image hotspots allow you to create interactive images with clickable areas that reveal additional
                    information. Perfect for product features, maps, or educational content.
                  </p>
                )}
                {displayType === "timeline-view" && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Timeline view displays events along a horizontal timeline with dates, descriptions, and images.
                    Ideal for roadmaps, project plans, or historical overviews.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
