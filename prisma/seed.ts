import { PrismaClient, Role, AnnouncementCategory, EventCategory, DisplayType } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Clear existing data
  await prisma.analytics.deleteMany()
  await prisma.event.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10)

  const superadmin = await prisma.user.create({
    data: {
      email: "superadmin@example.com",
      password: hashedPassword,
      name: "Super Admin",
      role: Role.SUPERADMIN,
    },
  })

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "John Admin",
      role: Role.ADMIN,
    },
  })

  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedPassword,
      name: "Regular User",
      role: Role.USER,
    },
  })

  console.log("Created users:", { superadmin, admin, user })

  // Create announcements
  const announcements = await Promise.all([
    prisma.announcement.create({
      data: {
        title: "Important System Update",
        content:
          "We're updating our systems this weekend. The platform will be unavailable from Saturday 10 PM to Sunday 2 AM. Please save your work before this time.",
        category: AnnouncementCategory.important,
        displayType: DisplayType.standard,
        date: new Date(),
        authorId: admin.id,
        views: 320,
        interactions: 85,
        shares: 12,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "New Feature: Interactive Dashboards",
        content:
          "We're excited to announce our new interactive dashboards feature. Now you can customize your dashboard with the metrics that matter most to you.",
        category: AnnouncementCategory.update,
        displayType: DisplayType.card,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        image: "/placeholder.svg?height=200&width=400",
        authorId: admin.id,
        views: 280,
        interactions: 65,
        shares: 8,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "Quarterly Town Hall Meeting",
        content:
          "Join us for our quarterly town hall meeting where we'll discuss company updates, achievements, and future plans.",
        category: AnnouncementCategory.event,
        displayType: DisplayType.banner,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        image: "/placeholder.svg?height=200&width=400",
        authorId: superadmin.id,
        views: 245,
        interactions: 55,
        shares: 10,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "Photo Gallery: Company Retreat",
        content:
          "Check out photos from our recent company retreat. It was a great opportunity for team building and relaxation.",
        category: AnnouncementCategory.general,
        displayType: DisplayType.grid,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        images: JSON.stringify([
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
        ]),
        authorId: admin.id,
        views: 210,
        interactions: 48,
        shares: 5,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "Office Tour",
        content:
          "Take a virtual tour of our new office space. We've designed it to promote collaboration and creativity.",
        category: AnnouncementCategory.general,
        displayType: DisplayType.image_carousel,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        images: JSON.stringify([
          "/placeholder.svg?height=200&width=400",
          "/placeholder.svg?height=200&width=400",
          "/placeholder.svg?height=200&width=400",
        ]),
        authorId: admin.id,
        views: 195,
        interactions: 42,
        shares: 7,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "New Product Features",
        content:
          "Explore the new features of our latest product release. We've added several enhancements based on your feedback.",
        category: AnnouncementCategory.update,
        displayType: DisplayType.image_hotspots,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        image: "/placeholder.svg?height=300&width=500",
        hotspots: JSON.stringify([
          { x: 25, y: 30, title: "Feature 1", description: "Enhanced user interface with customizable widgets" },
          { x: 60, y: 50, title: "Feature 2", description: "Advanced analytics with real-time data processing" },
          { x: 80, y: 70, title: "Feature 3", description: "Improved security with multi-factor authentication" },
        ]),
        authorId: superadmin.id,
        views: 230,
        interactions: 60,
        shares: 15,
      },
    }),
    prisma.announcement.create({
      data: {
        title: "Company Roadmap 2025",
        content: "Our strategic plan for the upcoming year includes several key initiatives and milestones.",
        category: AnnouncementCategory.important,
        displayType: DisplayType.timeline_view,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        timelineEvents: JSON.stringify([
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
        ]),
        authorId: superadmin.id,
        views: 275,
        interactions: 70,
        shares: 18,
      },
    }),
  ])

  console.log(`Created ${announcements.length} announcements`)

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Tech Innovation Summit 2025",
        location: "Global Tech Hub, Manila",
        date: new Date(2025, 4, 15),
        startTime: "10:00 AM",
        endTime: "5:00 PM",
        details:
          "Join industry experts for a deep dive into AI, blockchain, and emerging technologies. Interactive workshops and networking opportunities available.",
        category: EventCategory.conference,
        createdById: admin.id,
        views: 185,
        interactions: 45,
        shares: 12,
      },
    }),
    prisma.event.create({
      data: {
        title: "Annual Community Outreach Drive",
        location: "Central Park Community Center",
        date: new Date(2025, 5, 10),
        startTime: "8:00 AM",
        endTime: "3:00 PM",
        details:
          "Volunteers will help with educational programs, food distribution, and mentorship initiatives for local communities.",
        category: EventCategory.community,
        createdById: superadmin.id,
        views: 165,
        interactions: 38,
        shares: 9,
      },
    }),
    prisma.event.create({
      data: {
        title: "VisionBoard System Update Webinar",
        location: "Online (Zoom)",
        date: new Date(2025, 4, 25),
        startTime: "7:00 PM",
        endTime: "8:30 PM",
        details:
          "A walkthrough of new VisionBoard features, including interactive announcements, updated admin tools, and accessibility improvements.",
        category: EventCategory.webinar,
        createdById: admin.id,
        views: 210,
        interactions: 52,
        shares: 14,
      },
    }),
    prisma.event.create({
      data: {
        title: "Quarterly Team Meeting",
        location: "Main Conference Room",
        date: new Date(2025, 5, 5),
        startTime: "9:00 AM",
        endTime: "11:00 AM",
        details: "Review of quarterly goals, team achievements, and planning for the next quarter.",
        category: EventCategory.internal,
        createdById: admin.id,
        views: 145,
        interactions: 32,
        shares: 5,
      },
    }),
    prisma.event.create({
      data: {
        title: "Product Launch Event",
        location: "City Convention Center",
        date: new Date(2025, 6, 15),
        startTime: "6:00 PM",
        endTime: "9:00 PM",
        details: "Official launch of our new product line with demonstrations and special guest speakers.",
        category: EventCategory.product,
        createdById: superadmin.id,
        views: 225,
        interactions: 58,
        shares: 20,
      },
    }),
  ])

  console.log(`Created ${events.length} events`)

  // Create analytics data for the past 7 days
  const today = new Date()
  const analytics = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Generate random but realistic analytics data
    const activeUsers = 100 + Math.floor(Math.random() * 100)
    const newUsers = 5 + Math.floor(Math.random() * 25)
    const pageViews = activeUsers * (3 + Math.floor(Math.random() * 3))

    // Device distribution
    const desktopUsers = Math.floor(activeUsers * (0.6 + Math.random() * 0.1))
    const mobileUsers = Math.floor(activeUsers * (0.25 + Math.random() * 0.1))
    const tabletUsers = activeUsers - desktopUsers - mobileUsers

    // Session data
    const avgSessionDuration = 180 + Math.floor(Math.random() * 180) // 3-6 minutes in seconds
    const bounceRate = 0.2 + Math.random() * 0.2 // 20-40%

    analytics.push(
      await prisma.analytics.create({
        data: {
          date,
          activeUsers,
          newUsers,
          pageViews,
          desktopUsers,
          mobileUsers,
          tabletUsers,
          avgSessionDuration,
          bounceRate,
          createdById: i % 2 === 0 ? admin.id : superadmin.id,
        },
      }),
    )
  }

  console.log(`Created ${analytics.length} analytics entries`)
  console.log("Seed completed successfully")
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
