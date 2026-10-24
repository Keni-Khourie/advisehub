//ROUTE: /api/advisor/availability/[advisorId]
//This route is to allow students get a selected advisor's availability
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addDays, format, isValid, parseISO } from "date-fns";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    advisorId: string;
  }>;
}

function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

function isValidCalendarDate(date: string) {
  const parsed = parseISO(date);

  return (
    isValid(parsed) &&
    format(parsed, "yyyy-MM-dd") === date
  );
}

function formatDateTime(date: Date, timeZone: string) {
  return formatInTimeZone(
    date,
    timeZone,
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { advisorId } = await context.params;
    const searchParams = request.nextUrl.searchParams;

    const date = searchParams.get("date");
    const timeZone = searchParams.get("timeZone");

    // Missing or invalid parameters return an empty array.
    if (
      !advisorId ||
      !/^\d{8}$/.test(advisorId) ||
      !date ||
      !timeZone ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !isValidCalendarDate(date) ||
      !isValidTimeZone(timeZone)
    ) {
      return NextResponse.json([]);
    }

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        role: true,
        student: {
          select: {
            id: true,
          },
        },
      },
    });

    if (user?.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        { message: "Only students can view advisor availability." },
        { status: 403 }
      );
    }

    // Find the advisor using the external 8-digit advisorId.
    const advisor = await prisma.advisor.findUnique({
      where: {
        advisorId,
      },
      select: {
        id: true,
        advisorId: true,
      },
    });

    if (!advisor) {
      return NextResponse.json([]);
    }

    // Define the requested calendar day in the student's timezone.
    const nextDate = format(
      addDays(parseISO(`${date}T12:00:00`), 1),
      "yyyy-MM-dd"
    );

    const startOfDay = fromZonedTime(
      `${date}T00:00:00`,
      timeZone
    );

    const startOfNextDay = fromZonedTime(
      `${nextDate}T00:00:00`,
      timeZone
    );

    const availability = await prisma.advisorAvailability.findMany({
      where: {
        advisorId: advisor.id,
        date: {
          gte: startOfDay,
          lt: startOfNextDay,
        },
      },
      select: {
        id: true,
        date: true,
        createdAt: true,
        appointments: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(
      availability.map((slot) => ({
        id: slot.id,
        dateTime: formatDateTime(slot.date, timeZone),
        advisorId: advisor.advisorId,
        hasAppointment: slot.appointments.length > 0,
        createdAt: slot.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Get advisor's availability error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve advisor availability." },
      { status: 500 }
    );
  }
}