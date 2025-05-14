import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, path, timestamp, data } = await req.json();

    // Create analytics entry
    const analytics = await prisma.analytics.create({
      data: {
        date: new Date(timestamp),
        activeUsers: 1,
        newUsers: 0,
        pageViews: type === 'page_view' ? 1 : 0,
        desktopUsers: 0,
        mobileUsers: 0,
        tabletUsers: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error creating analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const analytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
