//ROUTE: /api/appointments/advisor

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { addDays, format, parseISO, } from "date-fns";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
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

    if (period === "today" && (!timeZone || !isValidTimeZone(timeZone))) {
      return NextResponse.json(
        {
          message:
            "A valid timeZone query parameter is required for the today filter.",
        },
        { status: 400 }
      );
    }

    // Authenticate the advisor.
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    // Identify the advisor from the authenticated session.
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
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
        { message: "Only advisors can view their appointments." },
        { status: 403 }
      );
    }

    // Capture the request time once for consistent filtering.
    const now = new Date();

    let dateFilter = {};

    if (period === "today") {
      // Determine today's calendar date in the advisor's timezone.
      const today = formatInTimeZone(now, timeZone!, "yyyy-MM-dd");

      const nextDay = format(
        addDays(parseISO(`${today}T12:00:00`), 1),
        "yyyy-MM-dd"
      );

      // Convert the advisor's local day boundaries to actual instants.
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
        advisorId: user.advisor.id,
        ...(period ? { date: dateFilter } : {}),
      },
      select: {
        id: true,
        date: true,
        status: true,
        student: {
          select: {
            studentId: true,
            firstName: true,
            lastName: true,
            user: {
              select: {
                image: true,
              },
            },
            degree: {
              select: {
                degreeName: true,
                degreeClassification: {
                  select: {
                    name: true,
                    abbreviation: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    const result = appointments.map((appointment) => {
      const student = appointment.student;
      const classification = student.degree.degreeClassification;

      return {
        id: appointment.id,
        studentId: student.studentId,
        studentFullName: `${student.firstName} ${student.lastName}`,
        studentDegree: `${student.degree.degreeName} (${classification.abbreviation})`,
        studentProfileImage: student.user.image ?? "",
        date: appointment.date.toISOString(),
        appointmentStatus: appointment.status,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get advisor appointments error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve appointments." },
      { status: 500 }
    );
  }
}
