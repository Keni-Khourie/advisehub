//ROUTE: /api/notifications

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate the user.
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
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Validate pagination parameters.
    const parsedQuery = paginationSchema.safeParse({
      page: request.nextUrl.searchParams.get("page") ?? 1,
      limit: request.nextUrl.searchParams.get("limit") ?? 20,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        {
          message: "Invalid pagination parameters.",
          errors: parsedQuery.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { page, limit } = parsedQuery.data;
    const skip = (page - 1) * limit;

    // 3. Retrieve the user's notifications and unread count.
    const [notifications, totalCount, unreadCount] =
      await prisma.$transaction([
        prisma.notification.findMany({
          where: {
            userId,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
            {
              id: "desc",
            },
          ],
          skip,
          take: limit,
          select: {
            id: true,
            type: true,
            title: true,
            message: true,
            isRead: true,
            appointmentId: true,
            createdAt: true,
          },
        }),

        prisma.notification.count({
          where: {
            userId,
          },
        }),

        prisma.notification.count({
          where: {
            userId,
            isRead: false,
          },
        }),
      ]);

    // 4. Return the notifications.
    return NextResponse.json(
      {
        notifications: notifications.map((notification) => ({
          ...notification,
          createdAt: notification.createdAt.toISOString(),
        })),

        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page * limit < totalCount,
          hasPreviousPage: page > 1,
        },

        unreadCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET notifications error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve notifications." },
      { status: 500 }
    );
  }
}
