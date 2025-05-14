"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function ManageEventsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [department, setDepartment] = useState("")

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Quarterly Meeting",
      date: new Date(2025, 4, 15),
      startTime: "10:00",
      endTime: "12:00",
      location: "Conference Room A",
      department: "All Departments",
    },
    {
      id: "2",
      title: "Team Building Activity",
      date: new Date(2025, 4, 20),
      startTime: "14:00",
      endTime: "17:00",
      location: "Central Park",
      department: "Marketing",
    },
    {
      id: "3",
      title: "Product Launch",
      date: new Date(2025, 4, 25),
      startTime: "09:00",
      endTime: "11:00",
      location: "Main Auditorium",
      department: "Product",
    },
  ])

  // Check if user has admin or superadmin role
  if (user && !["admin", "superadmin"].includes(user.role)) {
    router.push("/dashboard")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) {
      toast({
        title: "Date is required",
        description: "Please select a date for the event.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // This is a mock implementation - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Add new event to the list
      const newEvent = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        date,
        startTime,
        endTime,
        location,
        department,
      }

      setEvents([...events, newEvent])

      toast({
        title: "Event created",
        description: "Your event has been created successfully.",
      })

      // Reset form
      setTitle("")
      setDescription("")
      setDate(undefined)
      setStartTime("")
      setEndTime("")
      setLocation("")
      setDepartment("")
    } catch (error) {
      toast({
        title: "Failed to create event",
        description: "There was an error creating your event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      // This is a mock implementation - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove event from the list
      setEvents(events.filter((event) => event.id !== id))

      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to delete event",
        description: "There was an error deleting the event. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Events</h2>
        <Button onClick={() => document.getElementById("create-event-form")?.scrollIntoView({ behavior: "smooth" })}>
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>View and manage all scheduled events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-center text-slate-500 py-4">No events scheduled</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <div>Date: {format(event.date, "MMMM d, yyyy")}</div>
                      <div>
                        Time: {event.startTime} - {event.endTime}
                      </div>
                      <div>Location: {event.location}</div>
                      <div>Department: {event.department}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-500 hover:text-red-500"
                    onClick={() => deleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card id="create-event-form">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Schedule a new event for the organization</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Departments">All Departments</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
