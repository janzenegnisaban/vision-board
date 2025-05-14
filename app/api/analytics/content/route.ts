import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()

    if (!session || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get announcement stats
    const announcements = await db.announcement.aggregate({
      _sum: {
        views: true,
        interactions: true,
        shares: true,
      },
    })

    // Get event stats
    const events = await db.event.aggregate({
      _sum: {
        views: true,
        interactions: true,
        shares: true,
      },
    })

    const contentEngagement = [
      {
        type: "Announcements",
        views: announcements._sum.views || 0,
        interactions: announcements._sum.interactions || 0,
        shares: announcements._sum.shares || 0,
      },
      {
        type: "Events",
        views: events._sum.views || 0,
        interactions: events._sum.interactions || 0,
        shares: events._sum.shares || 0,
      },
      {
        type: "Information",
        views: 750, // Mock data for information section
        interactions: 150,
        shares: 25,
      },
    ]

    return NextResponse.json({ data: contentEngagement })
  } catch (error) {
    console.error("Error fetching content engagement:", error)
    return NextResponse.json({ error: "Failed to fetch content engagement" }, { status: 500 })
  }
}
