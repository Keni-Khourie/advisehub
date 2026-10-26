//ROUTE: /api/appointments/student
//the get request is to get a specific student's appointments
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addDays, format, parseISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const periodSchema = z.enum(["today", "previous", "upcoming"]);

function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

// function isValidCalendarDate(date: string) {
//   const parsed = parseISO(date);

//   return (
//     isValid(parsed) &&
//     format(parsed, "yyyy-MM-dd") === date
//   );
// }

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const periodParam = searchParams.get("period");
    const timeZone = searchParams.get("timeZone");

    let period: z.infer<typeof periodSchema> | undefined;

    if (periodParam !== null) {
      const parsedPeriod = periodSchema.safeParse(periodParam);

      if (!parsedPeriod.success) {
        return NextResponse.json(
          {
            message: "Invalid period filter.",
            validPeriods: ["today", "previous", "upcoming"],
          },
          { status: 400 }
        );
      }

      period = parsedPeriod.data;
    }

    if (period === "today") {
      if (!timeZone || !isValidTimeZone(timeZone)) {
        return NextResponse.json(
          {
            message:
              "A valid timeZone query parameter is required for the today filter.",
          },
          { status: 400 }
        );
      }
    }

    // Authenticate the current user.
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    // Find the student profile associated with the session.
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
        { message: "Only students can view their appointments." },
        { status: 403 }
      );
    }

    // Capture the request time once for consistent filtering.
    const now = new Date();

    let dateFilter = {};

    if (period === "today" && timeZone) {
      const today = format(
        new Date(
          new Intl.DateTimeFormat("en-CA", {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(now)
        ),
        "yyyy-MM-dd"
      );

      // Compute local calendar-day boundaries in the student's timezone.
      const nextDay = format(
        addDays(parseISO(`${today}T12:00:00`), 1),
        "yyyy-MM-dd"
      );

      const startOfDay = fromZonedTime(
        `${today}T00:00:00`,
        timeZone!
      );

      const startOfNextDay = fromZonedTime(
        `${nextDay}T00:00:00`,
        timeZone!
      );

      dateFilter = {
        gte: startOfDay,
        lt: startOfNextDay,
      };
    } else if (period === "previous") {
      dateFilter = {
        lt: now,
      };
    } else if (period === "upcoming") {
      dateFilter = {
        gt: now,
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        studentId: user.student.id,
        ...(period ? { date: dateFilter } : {}),
      },
      select: {
        id: true,
        date: true,
        status: true,
        advisor: {
          select: {
            advisorId: true,
            firstName: true,
            lastName: true,
            title: true,
            office: true,
            user: {
              select: {
                image: true,
              },
            },
            specialization: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const result = appointments.map((appointment) => ({
      id: appointment.id,
      advisorTitle: appointment.advisor.title ?? "",
      advisorId: appointment.advisor.advisorId,
      advisorFullName: [
        appointment.advisor.firstName,
        appointment.advisor.lastName,
      ].join(" "),
      advisorSpecialization: appointment.advisor.specialization.name,
      advisorOffice: appointment.advisor.office,
      advisorProfileImage: appointment.advisor.user.image ?? "",
      date: appointment.date.toISOString(),
      appointmentStatus: appointment.status,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get student appointments error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve appointments." },
      { status: 500 }
    );
  }
}
