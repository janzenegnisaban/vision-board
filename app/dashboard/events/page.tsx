"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")

  // Mock events data
  const events = [
    {
      id: "1",
      title: "Tech Innovation Summit 2025",
      location: "Global Tech Hub, Manila",
      date: new Date(2025, 4, 15),
      startTime: "10:00 AM",
      endTime: "5:00 PM",
      details:
        "Join industry experts for a deep dive into AI, blockchain, and emerging technologies. Interactive workshops and networking opportunities available.",
      category: "conference",
    },
    {
      id: "2",
      title: "Annual Community Outreach Drive",
      location: "Central Park Community Center",
      date: new Date(2025, 5, 10),
      startTime: "8:00 AM",
      endTime: "3:00 PM",
      details:
        "Volunteers will help with educational programs, food distribution, and mentorship initiatives for local communities.",
      category: "community",
    },
    {
      id: "3",
      title: "VisionBoard System Update Webinar",
      location: "Online (Zoom)",
      date: new Date(2025, 4, 25),
      startTime: "7:00 PM",
      endTime: "8:30 PM",
      details:
        "A walkthrough of new VisionBoard features, including interactive announcements, updated admin tools, and accessibility improvements.",
      category: "webinar",
    },
    {
      id: "4",
      title: "Quarterly Team Meeting",
      location: "Main Conference Room",
      date: new Date(2025, 5, 5),
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      details: "Review of quarterly goals, team achievements, and planning for the next quarter.",
      category: "internal",
    },
    {
      id: "5",
      title: "Product Launch Event",
      location: "City Convention Center",
      date: new Date(2025, 6, 15),
      startTime: "6:00 PM",
      endTime: "9:00 PM",
      details: "Official launch of our new product line with demonstrations and special guest speakers.",
      category: "product",
    },
  ]

  // Filter events based on search query and selected date
  const filteredEvents = events.filter(
    (event) =>
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.details.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!date || format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")),
  )

  // Get events for the selected date
  const eventsOnSelectedDate = events.filter(
    (event) => date && format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
  )

  // Get unique dates with events for highlighting in the calendar
  const datesWithEvents = events.map((event) => format(event.date, "yyyy-MM-dd"))
  const uniqueDatesWithEvents = [...new Set(datesWithEvents)]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="conference">Conferences</TabsTrigger>
              <TabsTrigger value="webinar">Webinars</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredEvents.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No events found for the selected criteria</p>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>
                              {format(event.date, "MMMM d, yyyy")} | {event.startTime} - {event.endTime}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {event.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{event.details}</p>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            Add to Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {["upcoming", "conference", "webinar", "community"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filteredEvents.filter((e) => category === "upcoming" || e.category === category).length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No events found in this category</p>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents
                      .filter((e) => {
                        if (category === "upcoming") {
                          return e.date >= new Date()
                        }
                        return e.category === category
                      })
                      .map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{event.title}</CardTitle>
                                <CardDescription>
                                  {format(event.date, "MMMM d, yyyy")} | {event.startTime} - {event.endTime}
                                </CardDescription>
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {event.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{event.details}</p>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm">
                                Add to Calendar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  hasEvent: (date) => uniqueDatesWithEvents.includes(format(date, "yyyy-MM-dd")),
                }}
                modifiersStyles={{
                  hasEvent: { fontWeight: "bold", backgroundColor: "rgba(59, 130, 246, 0.1)" },
                }}
              />

              <div className="space-y-2">
                <h3 className="font-medium text-sm">
                  Events on {date ? format(date, "MMMM d, yyyy") : "selected date"}
                </h3>
                {eventsOnSelectedDate.length === 0 ? (
                  <p className="text-sm text-slate-500">No events scheduled for this date</p>
                ) : (
                  <div className="space-y-2">
                    {eventsOnSelectedDate.map((event) => (
                      <div key={event.id} className="text-sm p-2 border rounded-md">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
