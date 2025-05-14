"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Clock, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Announcement = {
  id: string
  title: string
  content: string
  category: string
  date: string
}

type Event = {
  id: string
  title: string
  location: string
  date: string
  startTime: string
  endTime: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [recentAnnouncements, setRecentAnnouncements] = useState<Announcement[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch recent announcements
        const announcementsResponse = await fetch("/api/announcements?limit=3")
        if (!announcementsResponse.ok) {
          throw new Error("Failed to fetch announcements")
        }
        const announcementsData = await announcementsResponse.json()
        setRecentAnnouncements(announcementsData.announcements)

        // Fetch upcoming events
        const eventsResponse = await fetch("/api/events?limit=3")
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events")
        }
        const eventsData = await eventsResponse.json()
        setUpcomingEvents(eventsData.events)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">Welcome, {user?.name}</span>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
            {user?.role}
          </span>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Next event in 3 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">+5 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest announcements from the organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnnouncements.length === 0 ? (
                    <p className="text-center text-slate-500 py-4">No recent announcements</p>
                  ) : (
                    recentAnnouncements.map((announcement) => (
                      <div key={announcement.id} className="flex items-start gap-4 rounded-lg border p-4">
                        <Bell className="mt-1 h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <div>
                          <h3 className="font-medium">{announcement.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
                          <div className="mt-2 flex items-center text-xs text-slate-500">
                            <span>{new Date(announcement.date).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>Category: {announcement.category}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-center text-slate-500 py-4">No upcoming events</p>
                  ) : (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4">
                        <Calendar className="mt-1 h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">Location: {event.location}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Announcements</CardTitle>
              <CardDescription>Browse all announcements from the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentAnnouncements.length === 0 ? (
                  <p className="text-center text-slate-500 py-4">No announcements found</p>
                ) : (
                  recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{announcement.title}</h3>
                        <span className="text-xs text-slate-500">
                          {new Date(announcement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{announcement.content}</p>
                      <div className="flex items-center text-xs text-slate-500">
                        <span>Category: {announcement.category}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>View all scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingEvents.length === 0 ? (
                  <p className="text-center text-slate-500 py-4">No upcoming events found</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold dark:bg-slate-800">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Join us for this event at {event.location}.
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>All Departments</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
