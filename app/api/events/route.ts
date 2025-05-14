import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const dateStr = searchParams.get("date")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    // Build the query
    const query: any = {
      where: {
        published: true,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
      take: limit,
    }

    // Add category filter if provided
    if (category) {
      query.where.category = category
    }

    // Add date filter if provided
    if (dateStr) {
      const date = new Date(dateStr)
      query.where.date = {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      }
    }

    // Get events
    const events = await prisma.event.findMany(query)

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Events API error:", error)
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

    // Only admins and superadmins can create events
    if (user.role !== "ADMIN" && user.role !== "SUPERADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get the event data
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.location || !data.date || !data.startTime || !data.endTime || !data.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title: data.title,
        location: data.location,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        details: data.details || "",
        category: data.category,
        department: data.department,
        published: data.published !== undefined ? data.published : true,
        createdBy: {
          connect: { id: user.id as string },
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ event })
  } catch (error) {
    console.error("Create event API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
