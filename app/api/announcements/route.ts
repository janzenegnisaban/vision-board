import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    // Build the query
    const query: any = {
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
    }

    // Add category filter if provided
    if (category) {
      query.where.category = category
    }

    // Get announcements
    const announcements = await prisma.announcement.findMany(query)

    return NextResponse.json({ announcements })
  } catch (error) {
    console.error("Announcements API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins and superadmins can create announcements
    if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get the announcement data
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.content || !data.category || !data.displayType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the announcement
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        displayType: data.displayType,
        date: new Date(),
        image: data.image,
        images: data.images ? JSON.stringify(data.images) : null,
        hotspots: data.hotspots ? JSON.stringify(data.hotspots) : null,
        timelineEvents: data.timelineEvents ? JSON.stringify(data.timelineEvents) : null,
        published: data.published !== undefined ? data.published : true,
        author: {
          connect: { id: user.id as string },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ announcement })
  } catch (error) {
    console.error("Create announcement API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
