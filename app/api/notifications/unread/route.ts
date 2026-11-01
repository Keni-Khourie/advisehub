import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Authenticate the user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid user." },
        { status: 401 }
      );
    }

    // 2. Fetch only unread notifications belonging to this user
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        isRead: true,
        appointmentId: true,
        createdAt: true,
      },
    });

    // 3. Return notifications
    return NextResponse.json(
      {
        notifications: notifications.map((notification) => ({
          ...notification,
          createdAt: notification.createdAt.toISOString(),
        })),
        unreadCount: notifications.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET unread notifications error:", error);

    return NextResponse.json(
      { message: "Unable to fetch unread notifications." },
      { status: 500 }
    );
  }
}