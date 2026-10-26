//ROUTE: /api/appointments/advisor/students/[studentId]
//This route is for an advisor to get all their past appointments with a given student

import { NextRequest, NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    studentId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the advisor
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Get the advisor profile from the session user
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

    if (user?.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "Forbidden. Only advisors can access this resource." },
        { status: 403 }
      );
    }

    const advisorId = user.advisor.id;

    // 3. Validate the student's external 8-digit ID
    const { studentId } = await params;

    if (!/^\d{8}$/.test(studentId)) {
      return NextResponse.json(
        { message: "Student ID must contain exactly 8 digits." },
        { status: 400 }
      );
    }

    // 4. Validate the requested timezone (default: UTC)
    const searchParams = request.nextUrl.searchParams;
    const timeZone = searchParams.get("timeZone") ?? "UTC";

    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone,
      }).format(new Date());
    } catch {
      return NextResponse.json(
        { message: "Invalid timeZone. Provide a valid IANA timezone." },
        { status: 400 }
      );
    }

    // 5. Find the student by their external ID
    const student = await prisma.student.findUnique({
      where: {
        studentId,
      },
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    // 6. Fetch past appointments between this advisor and student
    const now = new Date();

    const appointments = await prisma.appointment.findMany({
      where: {
        advisorId,
        studentId: student.id,
        date: {
          lt: now,
        },
      },
      select: {
        id: true,
        date: true,
        note: true,
        status: true,
        createdAt: true,
        specialization: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    // 7. Format appointment dates in the requested timezone
    const response = appointments.map((appointment) => ({
      id: appointment.id,
      date: formatInTimeZone(
        appointment.date,
        timeZone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      ),
      note: appointment.note ?? "",
      appointmentStatus: appointment.status,
      specialization: appointment.specialization.name,
      createdAt: appointment.createdAt.toISOString(),
    }));

    return NextResponse.json(
      response,
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error fetching advisor's past appointments with student:",
      error
    );

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
