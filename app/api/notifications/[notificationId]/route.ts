
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const notificationIdSchema = z.coerce.number().int().positive();

type RouteContext = {
  params: Promise<{
    notificationId: string;
  }>;
};

export async function PATCH(
  _request: NextRequest,
  { params }: RouteContext
) {
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

    // 2. Validate the notification ID.
    const { notificationId: rawNotificationId } = await params;

    const parsedId = notificationIdSchema.safeParse(
      rawNotificationId
    );

    if (!parsedId.success) {
      return NextResponse.json(
        { message: "Invalid notification ID." },
        { status: 400 }
      );
    }

    const notificationId = parsedId.data;

    // 3. Find and update the notification.
    // The userId condition ensures users can only update
    // notifications belonging to their own account.
    const notification = await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    // 4. Check whether a notification was updated.
    if (notification.count === 0) {
      // Check whether the notification already exists
      // and belongs to the authenticated user.
      const existingNotification =
        await prisma.notification.findFirst({
          where: {
            id: notificationId,
            userId,
          },
          select: {
            id: true,
            isRead: true,
          },
        });

      if (!existingNotification) {
        return NextResponse.json(
          { message: "Notification not found." },
          { status: 404 }
        );
      }

      // It already was read, so return a successful response.
      return NextResponse.json(
        {
          message: "Notification has already been read.",
          notification: existingNotification,
        },
        { status: 200 }
      );
    }

    // 5. Retrieve the updated notification.
    const updatedNotification =
      await prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
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

    return NextResponse.json(
      {
        message: "Notification marked as read successfully.",
        notification: {
          ...updatedNotification!,
          createdAt: updatedNotification!.createdAt.toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH notification error:", error);

    return NextResponse.json(
      { message: "Failed to mark notification as read." },
      { status: 500 }
    );
  }
}
