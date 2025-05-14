import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()

    if (!session || !["ADMIN", "SUPERADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const topEvents = await db.event.findMany({
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

    return NextResponse.json({ data: topEvents })
  } catch (error) {
    console.error("Error fetching top events:", error)
    return NextResponse.json({ error: "Failed to fetch top events" }, { status: 500 })
  }
}
