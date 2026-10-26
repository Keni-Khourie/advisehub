
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ studentId: string }>;
};

const timeZoneSchema = z.string().min(1).refine(
  (timeZone) => {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone });
      return true;
    } catch {
      return false;
    }
  },
  { message: "Invalid IANA time zone." }
);

export async function GET(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    // 1. Validate the student ID
    const { studentId } = await params;

    if (!/^\d{8}$/.test(studentId)) {
      return NextResponse.json(
        { message: "Student ID must contain exactly 8 digits." },
        { status: 400 },
      );
    }

    // 2. Read and validate the optional timezone
    const rawTimeZone = request.nextUrl.searchParams.get("timeZone");
    let timeZone = "UTC";

    if (rawTimeZone !== null) {
      const parsedTimeZone = timeZoneSchema.safeParse(rawTimeZone);

      if (!parsedTimeZone.success) {
        return NextResponse.json(
          {
            message:
              "Invalid timeZone. Provide a valid IANA time zone, such as Africa/Lagos.",
          },
          { status: 400 },
        );
      }

      timeZone = parsedTimeZone.data;
    }

    // 3. Retrieve the student and their degree information
    const student = await prisma.student.findUnique({
      where: { studentId },
      select: {
        id: true,
        userId: true,
        studentId: true,
        firstName: true,
        lastName: true,
        enrollmentDate: true,
        expectedGraduationDate: true,
        completedCredits: true,
        user: {
          select: {
            image: true,
          },
        },
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
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 },
      );
    }

    // 4. Calculate degree progress
    const requiredCredits = student.degree.requiredCredits;
    const completedCredits = student.completedCredits;

    const degreePercentCompletion =
      requiredCredits > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round((completedCredits / requiredCredits) * 100),
            ),
          )
        : 0;

    const remainingCredits = Math.max(
      0,
      requiredCredits - completedCredits,
    );

    // 5. Find the nearest future scheduled appointment
    // The comparison uses absolute instants, regardless of timezone.
    const now = new Date();

    const nextAppointment = await prisma.appointment.findFirst({
      where: {
        studentId: student.id,
        date: {
          gt: now,
        },
        status: "SCHEDULED",
      },
      orderBy: {
        date: "asc",
      },
      select: {
        date: true,
      },
    });

    // 6. Format the next appointment in the requested timezone
    const nextAppointmentDate = nextAppointment
      ? formatInTimeZone(
          nextAppointment.date,
          timeZone,
          "yyyy-MM-dd'T'HH:mm:ssXXX",
        )
      : "";

    // 7. Return the response
    const result = {
      id: student.userId,
      studentId: student.studentId,
      fullName: `${student.firstName} ${student.lastName}`,
      degree: `${student.degree.degreeClassification.abbreviation}. ${student.degree.degreeName}`,
      enrollmentDate: student.enrollmentDate.toISOString(),
      expectedGraduationDate:
        student.expectedGraduationDate.toISOString(),
      degreePercentCompletion,
      completedCredits,
      remainingCredits,
      requiredCredits,
      nextAppointment: nextAppointmentDate,
      studentProfileImage: student.user.image ?? "",
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch student:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
