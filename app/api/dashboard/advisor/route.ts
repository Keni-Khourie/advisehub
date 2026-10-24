//ROUTE: /api/dashboard/advisor

import { NextRequest, NextResponse } from "next/server";
import { addDays, parseISO } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
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
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Validate the timeZone query parameter
    const timeZone = request.nextUrl.searchParams.get("timeZone");

    if (!timeZone || !isValidTimeZone(timeZone)) {
      return NextResponse.json(
        {
          message:
            "A valid timeZone query parameter is required, e.g. Africa/Lagos.",
        },
        { status: 400 }
      );
    }

    // 3. Verify the user is an advisor with an advisor profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        advisor: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    if (user.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        {
          message: "Only authenticated advisors can access this resource.",
        },
        { status: 403 }
      );
    }

    const advisorId = user.advisor.id;

    // 4. Calculate today's calendar-day boundaries in the requested timezone
    const now = new Date();

    const today = formatInTimeZone(now, timeZone, "yyyy-MM-dd");

    // Use local noon to derive tomorrow's date safely across DST changes.
    const tomorrow = formatInTimeZone(
      addDays(parseISO(`${today}T12:00:00`), 1),
      "UTC",
      "yyyy-MM-dd"
    );

    const startOfDay = fromZonedTime(
      `${today}T00:00:00`,
      timeZone
    );

    const startOfTomorrow = fromZonedTime(
      `${tomorrow}T00:00:00`,
      timeZone
    );

    // 5. Count today's unbooked availability slots and scheduled appointments
    const [availableSlotsTodayCount, appointmentsTodayCount] =
      await prisma.$transaction([
        prisma.advisorAvailability.count({
          where: {
            advisorId,
            date: {
              gte: startOfDay,
              lt: startOfTomorrow,
            },
            appointments: {
              none: {},
            },
          },
        }),

        prisma.appointment.count({
          where: {
            advisorId,
            date: {
              gte: startOfDay,
              lt: startOfTomorrow,
            },
            status: "SCHEDULED",
          },
        }),
      ]);

    // 6. Return the dashboard summary
    return NextResponse.json(
      {
        availableSlotsTodayCount,
        appointmentsTodayCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET advisor dashboard summary error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
