//ROUTE: /api/dashboard/student

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

    // 2. Validate the timezone query parameter
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

    // 3. Find the authenticated user's student profile and degree information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        student: {
          select: {
            id: true,
            completedCredits: true,
            degree: {
              select: {
                degreeName: true,
                requiredCredits: true,
                degreeClassification: {
                  select: {
                    abbreviation: true,
                  },
                },
              },
            },
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

    if (user.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        {
          message: "Only authenticated students can access this resource.",
        },
        { status: 403 }
      );
    }

    const student = user.student;
    const now = new Date();

    // 4. Calculate today's boundaries in the requested timezone
    const today = formatInTimeZone(now, timeZone, "yyyy-MM-dd");

    // Use UTC noon to safely calculate the next calendar date.
    const tomorrow = formatInTimeZone(
      addDays(parseISO(`${today}T12:00:00Z`), 1),
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

    // 5. Fetch the closest upcoming scheduled appointment,
    // count past appointments, and count today's advisor notes.
    const [closestAppointment, pastAppointmentsCount, todaysNotesCount] =
      await prisma.$transaction([
        prisma.appointment.findFirst({
          where: {
            studentId: student.id,
            date: { gt: now },
            status: "SCHEDULED",
          },
          orderBy: {
            date: "asc",
          },
          select: {
            id: true,
            date: true,
            status: true,
            advisor: {
              select: {
                title: true,
                firstName: true,
                lastName: true,
                specialization: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),

        prisma.appointment.count({
          where: {
            studentId: student.id,
            date: { lt: now },
          },
        }),

        prisma.advisorNote.count({
          where: {
            studentId: student.id,
            createdAt: {
              gte: startOfDay,
              lt: startOfTomorrow,
            },
          },
        }),
      ]);

    // 6. Calculate degree progress
    const completedCredits = student.completedCredits;
    const requiredCredits = student.degree.requiredCredits;

    const degreeProgressPercent =
      requiredCredits > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round((completedCredits / requiredCredits) * 100)
            )
          )
        : 0;

    const remainingCredits = Math.max(
      0,
      requiredCredits - completedCredits
    );

    // 7. Build the response
    return NextResponse.json(
      {
        closestAppointment: closestAppointment
          ? {
              id: closestAppointment.id,
              appointmentStatus: closestAppointment.status,
              date: formatInTimeZone(
                closestAppointment.date,
                timeZone,
                "yyyy-MM-dd'T'HH:mm:ssXXX"
              ),
              advisorTitle: closestAppointment.advisor.title ?? "",
              advisorFullName: `${closestAppointment.advisor.firstName} ${closestAppointment.advisor.lastName}`,
              advisorSpecialization:
                closestAppointment.advisor.specialization.name,
            }
          : null,

        degreeInfo: {
          degreeProgressPercent,
          completedCredits,
          remainingCredits,
          degreeName: student.degree.degreeName,
          degreeClassification:
            student.degree.degreeClassification.abbreviation,
        },

        pastAppointmentsCount,
        todaysNotesCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET student dashboard summary error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
