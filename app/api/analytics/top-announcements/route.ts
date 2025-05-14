import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()

    if (!session || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const topAnnouncements = await db.announcement.findMany({
      select: {
        id: true,
        title: true,
        views: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 5,
    })

    return NextResponse.json({ data: topAnnouncements })
  } catch (error) {
    console.error("Error fetching top announcements:", error)
    return NextResponse.json({ error: "Failed to fetch top announcements" }, { status: 500 })
  }
}
