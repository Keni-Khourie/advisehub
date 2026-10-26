//ROUTE: /api/appointments/student/advisors/[advisorId]
//This is a route for students to get all the appointments they have had with a given student

import { NextRequest, NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    advisorId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the student
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

    // 2. Verify the user is a student and retrieve their profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        {
          message: "Forbidden. Only students can access this resource.",
        },
        { status: 403 }
      );
    }

    // 3. Validate the advisor's external ID
    const { advisorId } = await params;

    if (!/^\d{8}$/.test(advisorId)) {
      return NextResponse.json(
        { message: "Advisor ID must contain exactly 8 digits." },
        { status: 400 }
      );
    }

    // 4. Validate timezone; default to UTC
    const timeZone =
      request.nextUrl.searchParams.get("timeZone") ?? "UTC";

    try {
      new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    } catch {
      return NextResponse.json(
        {
          message: "Invalid timeZone. Provide a valid IANA timezone.",
        },
        { status: 400 }
      );
    }

    // 5. Find the advisor using their external ID
    const advisor = await prisma.advisor.findUnique({
      where: { advisorId },
      select: {
        id: true,
      },
    });

    if (!advisor) {
      return NextResponse.json(
        { message: "Advisor not found." },
        { status: 404 }
      );
    }

    // 6. Retrieve past appointments between this student and advisor
    const now = new Date();

    const appointments = await prisma.appointment.findMany({
      where: {
        studentId: user.student.id,
        advisorId: advisor.id,
        date: {
          lt: now,
        },
      },
      select: {
        id: true,
        date: true,
        status: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    // 7. Format dates in the requested timezone
    const response = appointments.map((appointment) => ({
      id: appointment.id,
      date: formatInTimeZone(
        appointment.date,
        timeZone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      ),
      status: appointment.status,
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching student's past appointments with advisor:",
      error
    );

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
