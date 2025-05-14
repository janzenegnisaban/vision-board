"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BarChart, LineChart, PieChart } from "@/components/charts"

interface AnalyticsData {
  id: string
  date: string
  activeUsers: number
  newUsers: number
  pageViews: number
  desktopUsers: number
  mobileUsers: number
  tabletUsers: number
  avgSessionDuration: number
  bounceRate: number
}

interface ContentEngagement {
  type: string
  views: number
  interactions: number
  shares: number
}

interface TopContent {
  id: string
  title: string
  views: number
}

export default function AnalyticsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [contentEngagement, setContentEngagement] = useState<ContentEngagement[]>([])
  const [topAnnouncements, setTopAnnouncements] = useState<TopContent[]>([])
  const [topEvents, setTopEvents] = useState<TopContent[]>([])

  // Check if user has admin or superadmin role
  useEffect(() => {
    if (user && !["ADMIN", "SUPERADMIN"].includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)

        // Fetch analytics data
        const analyticsResponse = await fetch("/api/analytics")
        if (!analyticsResponse.ok) {
          throw new Error("Failed to fetch analytics data")
        }
        const analyticsJson = await analyticsResponse.json()
        setAnalyticsData(analyticsJson.data)

        // Fetch content engagement data
        const contentResponse = await fetch("/api/analytics/content")
        if (!contentResponse.ok) {
          throw new Error("Failed to fetch content engagement data")
        }
        const contentJson = await contentResponse.json()
        setContentEngagement(contentJson.data)

        // Fetch top announcements
        const announcementsResponse = await fetch("/api/analytics/top-announcements")
        if (!announcementsResponse.ok) {
          throw new Error("Failed to fetch top announcements")
        }
        const announcementsJson = await announcementsResponse.json()
        setTopAnnouncements(announcementsJson.data)

        // Fetch top events
        const eventsResponse = await fetch("/api/analytics/top-events")
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch top events")
        }
        const eventsJson = await eventsResponse.json()
        setTopEvents(eventsJson.data)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        toast({
          title: "Error",
          description: "Failed to load analytics data. Please try again later.",
          variant: "destructive",
        })

        // Use mock data for demonstration
        setAnalyticsData([
          {
            id: "1",
            date: "2025-01-01",
            activeUsers: 120,
            newUsers: 15,
            pageViews: 450,
            desktopUsers: 78,
            mobileUsers: 36,
            tabletUsers: 6,
            avgSessionDuration: 240,
            bounceRate: 0.25,
          },
          {
            id: "2",
            date: "2025-01-02",
            activeUsers: 132,
            newUsers: 18,
            pageViews: 486,
            desktopUsers: 86,
            mobileUsers: 39,
            tabletUsers: 7,
            avgSessionDuration: 255,
            bounceRate: 0.23,
          },
          {
            id: "3",
            date: "2025-01-03",
            activeUsers: 141,
            newUsers: 12,
            pageViews: 512,
            desktopUsers: 92,
            mobileUsers: 42,
            tabletUsers: 7,
            avgSessionDuration: 262,
            bounceRate: 0.22,
          },
          {
            id: "4",
            date: "2025-01-04",
            activeUsers: 125,
            newUsers: 9,
            pageViews: 470,
            desktopUsers: 81,
            mobileUsers: 38,
            tabletUsers: 6,
            avgSessionDuration: 230,
            bounceRate: 0.26,
          },
          {
            id: "5",
            date: "2025-01-05",
            activeUsers: 118,
            newUsers: 14,
            pageViews: 435,
            desktopUsers: 77,
            mobileUsers: 35,
            tabletUsers: 6,
            avgSessionDuration: 225,
            bounceRate: 0.28,
          },
          {
            id: "6",
            date: "2025-01-06",
            activeUsers: 145,
            newUsers: 22,
            pageViews: 528,
            desktopUsers: 94,
            mobileUsers: 44,
            tabletUsers: 7,
            avgSessionDuration: 270,
            bounceRate: 0.21,
          },
          {
            id: "7",
            date: "2025-01-07",
            activeUsers: 160,
            newUsers: 25,
            pageViews: 580,
            desktopUsers: 104,
            mobileUsers: 48,
            tabletUsers: 8,
            avgSessionDuration: 285,
            bounceRate: 0.2,
          },
        ])

        setContentEngagement([
          { type: "Announcements", views: 1250, interactions: 320, shares: 45 },
          { type: "Events", views: 980, interactions: 210, shares: 30 },
          { type: "Information", views: 750, interactions: 150, shares: 25 },
        ])

        setTopAnnouncements([
          { id: "1", title: "Important System Update", views: 320 },
          { id: "2", title: "New Feature: Interactive Dashboards", views: 280 },
          { id: "3", title: "Quarterly Town Hall Meeting", views: 245 },
          { id: "4", title: "Company Roadmap 2025", views: 275 },
          { id: "5", title: "New Product Features", views: 230 },
        ])

        setTopEvents([
          { id: "1", title: "Product Launch Event", views: 225 },
          { id: "2", title: "VisionBoard System Update Webinar", views: 210 },
          { id: "3", title: "Tech Innovation Summit 2025", views: 185 },
          { id: "4", title: "Annual Community Outreach Drive", views: 165 },
          { id: "5", title: "Quarterly Team Meeting", views: 145 },
        ])
      } finally {
        setLoading(false)
      }
    }

    if (user && ["ADMIN", "SUPERADMIN"].includes(user.role)) {
      fetchAnalyticsData()
    }
  }, [user, toast])

  if (!user || !["ADMIN", "SUPERADMIN"].includes(user.role)) {
    return null
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  // Prepare data for charts
  const userActivityData = analyticsData
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      activeUsers: item.activeUsers,
      newUsers: item.newUsers,
      pageViews: item.pageViews,
    }))
    .reverse()

  const deviceUsageData = [
    {
      device: "Desktop",
      percentage: Math.round(
        (analyticsData.reduce((sum, item) => sum + item.desktopUsers, 0) /
          analyticsData.reduce((sum, item) => sum + item.activeUsers, 0)) *
          100,
      ),
    },
    {
      device: "Mobile",
      percentage: Math.round(
        (analyticsData.reduce((sum, item) => sum + item.mobileUsers, 0) /
          analyticsData.reduce((sum, item) => sum + item.activeUsers, 0)) *
          100,
      ),
    },
    {
      device: "Tablet",
      percentage: Math.round(
        (analyticsData.reduce((sum, item) => sum + item.tabletUsers, 0) /
          analyticsData.reduce((sum, item) => sum + item.activeUsers, 0)) *
          100,
      ),
    },
  ]

  // Calculate totals and averages
  const totalActiveUsers = analyticsData.reduce((sum, item) => sum + item.activeUsers, 0)
  const totalNewUsers = analyticsData.reduce((sum, item) => sum + item.newUsers, 0)
  const totalPageViews = analyticsData.reduce((sum, item) => sum + item.pageViews, 0)
  const avgSessionDuration = Math.round(
    analyticsData.reduce((sum, item) => sum + item.avgSessionDuration, 0) / analyticsData.length,
  )
  const avgBounceRate = Math.round(
    (analyticsData.reduce((sum, item) => sum + item.bounceRate, 0) / analyticsData.length) * 100,
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="content">Content Engagement</TabsTrigger>
          <TabsTrigger value="top">Top Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalActiveUsers}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalNewUsers}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPageViews}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Bounce Rate: {avgBounceRate}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={userActivityData}
                  xKey="date"
                  yKeys={["activeUsers"]}
                  colors={["#2563eb"]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Views, interactions, and shares by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={contentEngagement}
                  xKey="type"
                  yKeys={["views", "interactions", "shares"]}
                  colors={["#2563eb", "#16a34a", "#ea580c"]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>Breakdown of users by device type</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PieChart
                  data={deviceUsageData}
                  nameKey="device"
                  valueKey="percentage"
                  colors={["#2563eb", "#16a34a", "#ea580c"]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Announcements</CardTitle>
                <CardDescription>Most viewed announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAnnouncements.map((announcement, index) => (
                    <div key={announcement.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{announcement.title}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{announcement.views} views</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily active users, new users, and page views</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={userActivityData}
                xKey="date"
                yKeys={["activeUsers", "newUsers", "pageViews"]}
                colors={["#2563eb", "#16a34a", "#ea580c"]}
                height={400}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>Breakdown of users by device type</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PieChart
                  data={deviceUsageData}
                  nameKey="device"
                  valueKey="percentage"
                  colors={["#2563eb", "#16a34a", "#ea580c"]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Session Metrics</CardTitle>
                <CardDescription>Average session duration and bounce rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 pt-8">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Average Session Duration</h4>
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, (avgSessionDuration / 600) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-right mt-1">
                      {Math.floor(avgSessionDuration / 60)}m {avgSessionDuration % 60}s
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bounce Rate</h4>
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${avgBounceRate}%` }}></div>
                    </div>
                    <p className="text-sm text-right mt-1">{avgBounceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
              <CardDescription>Views, interactions, and shares by content type</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={contentEngagement}
                xKey="type"
                yKeys={["views", "interactions", "shares"]}
                colors={["#2563eb", "#16a34a", "#ea580c"]}
                height={400}
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Interaction rate by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  {contentEngagement.map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-medium">{item.type}</h4>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {Math.round((item.interactions / item.views) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.type === "Announcements"
                              ? "bg-blue-500"
                              : item.type === "Events"
                                ? "bg-green-500"
                                : "bg-orange-500"
                          }`}
                          style={{ width: `${Math.round((item.interactions / item.views) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Share Metrics</CardTitle>
                <CardDescription>Share rate by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-4">
                  {contentEngagement.map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-medium">{item.type}</h4>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {Math.round((item.shares / item.views) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.type === "Announcements"
                              ? "bg-blue-500"
                              : item.type === "Events"
                                ? "bg-green-500"
                                : "bg-orange-500"
                          }`}
                          style={{ width: `${Math.round((item.shares / item.views) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="top" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Announcements</CardTitle>
                <CardDescription>Most viewed announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAnnouncements.map((announcement, index) => (
                    <div key={announcement.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{announcement.title}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{announcement.views} views</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Events</CardTitle>
                <CardDescription>Most viewed events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEvents.map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{event.title}</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{event.views} views</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
