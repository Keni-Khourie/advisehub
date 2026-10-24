//ROUTE: /api/advisor-availability
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
import { format, isValid, parseISO, addDays } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import {createAdvisorAvailabilitySchema} from "@/validators/api/availabilityApiValidators"

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
  // Returns an ISO-style datetime with the requested timezone offset.
  // Example: 2026-10-25T09:00:00+01:00
  return formatInTimeZone(
    date,
    timeZone,
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: {
        role: true,
        advisor: {
          select: {
            id: true,
            advisorId: true,
          },
        },
      },
    });

    if (user?.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "Only advisors can create availability." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = createAdvisorAvailabilitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request data.", errors: parsed.error },
        { status: 400 }
      );
    }

    const { date, time, timeZone } = parsed.data;

    if (!isValidTimeZone(timeZone) || !isValidCalendarDate(date)) {
      return NextResponse.json(
        { message: "Invalid date or timezone." },
        { status: 400 }
      );
    }

    // Interpret the chosen wall-clock date and time in the advisor's timezone.
    const slotDate = fromZonedTime(
      `${date}T${time}:00`,
      timeZone
    );

    if (slotDate.getTime() <= Date.now()) {
      return NextResponse.json(
        { message: "Availability must be in the future." },
        { status: 400 }
      );
    }

    const existingSlot = await prisma.advisorAvailability.findFirst({
      where: {
        advisorId: user.advisor.id,
        date: slotDate,
      },
      select: { id: true },
    });

    if (existingSlot) {
      return NextResponse.json(
        { message: "You already have an availability slot at this time." },
        { status: 409 }
      );
    }

    const availability = await prisma.advisorAvailability.create({
      data: {
        date: slotDate,
        advisor: {
          connect: { id: user.advisor.id },
        },
      },
      select: {
        id: true,
        date: true,
        createdAt: true,
        appointments: {
          select: { id: true },
          take: 1,
        },
      },
    });

    return NextResponse.json(
      {
        id: availability.id,
        dateTime: formatDateTime(availability.date, timeZone),
        advisorId: user.advisor.advisorId,
        hasAppointment: availability.appointments.length > 0,
        createdAt: availability.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create advisor availability error:", error);

    return NextResponse.json(
      { message: "Failed to create availability." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const timeZone = searchParams.get("timeZone");

    // Per your requirement, missing or invalid query parameters return [].
    if (
      !date ||
      !timeZone ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !isValidTimeZone(timeZone) ||
      !isValidCalendarDate(date)
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
      where: { id: Number(session.user.id) },
      select: {
        role: true,
        advisor: {
          select: {
            id: true,
          },
        },
      },
    });

    if (user?.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "Only advisors can view their availability." },
        { status: 403 }
      );
    }

    // Convert local midnight in the requested timezone to absolute instants.
    const startOfDay = fromZonedTime(
      `${date}T00:00:00`,
      timeZone
    );

    // const nextDate = format(
    //   new Date(
    //     parseISO(`${date}T12:00:00`).getTime() + 24 * 60 * 60 * 1000
    //   ),
    //   "yyyy-MM-dd"
    // );
    const nextDate = format(
  addDays(parseISO(`${date}T12:00:00`), 1),
  "yyyy-MM-dd"
);

    const startOfNextDay = fromZonedTime(
      `${nextDate}T00:00:00`,
      timeZone
    );

    const availability = await prisma.advisorAvailability.findMany({
      where: {
        advisorId: user.advisor.id,
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
          select: { id: true },
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
        hasAppointment: slot.appointments.length > 0,
        createdAt: slot.createdAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Get advisor availability error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve availability." },
      { status: 500 }
    );
  }
}
