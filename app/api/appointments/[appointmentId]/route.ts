//ROUTE : api/appointments/[appointmentId]

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const appointmentIdSchema = z.coerce.number().int().positive();

const timeZoneSchema = z.string().min(1).refine(
  (timeZone) => {
    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone,
      });
      return true;
    } catch {
      return false;
    }
  },
  { message: "Invalid IANA time zone." }
);

type RouteContext = {
  params: Promise<{ appointmentId: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
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

    // 2. Validate the appointment ID
    const { appointmentId: rawAppointmentId } = await params;

    const parsedAppointmentId =
      appointmentIdSchema.safeParse(rawAppointmentId);

    if (!parsedAppointmentId.success) {
      return NextResponse.json(
        { message: "Invalid appointment ID." },
        { status: 400 }
      );
    }

    const appointmentId = parsedAppointmentId.data;

    // 3. Read and validate the optional timeZone query parameter
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
          { status: 400 }
        );
      }

      timeZone = parsedTimeZone.data;
    }

    // 4. Retrieve the signed-in user's role and profile IDs
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        student: {
          select: { id: true },
        },
        advisor: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    if (user.role !== "STUDENT" && user.role !== "ADVISOR") {
      return NextResponse.json(
        {
          message:
            "You are not authorized to view this appointment.",
        },
        { status: 403 }
      );
    }

    if (
      (user.role === "STUDENT" && !user.student) ||
      (user.role === "ADVISOR" && !user.advisor)
    ) {
      return NextResponse.json(
        { message: "Your account profile has not been configured." },
        { status: 403 }
      );
    }

    // 5. Find the appointment while enforcing ownership
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        ...(user.role === "STUDENT"
          ? { studentId: user.student!.id }
          : { advisorId: user.advisor!.id }),
      },
      select: {
        id: true,
        date: true,
        note: true,
        status: true,
        student: {
          select: {
            studentId: true,
            firstName: true,
            lastName: true,
            user: {
              select: {
                image: true,
                email:true
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
        advisor: {
          select: {
            advisorId: true,
            firstName: true,
            lastName: true,
            title: true,
            office: true,
            specialization: {
              select: {
                name: true,
              },
            },
            user: {
              select: {
                image: true,
                email:true,
              },
            },
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }

    // 6. Format the appointment date in the requested time zone
    const { student, advisor } = appointment;
    const classification = student.degree.degreeClassification;

    const response = {
      id: appointment.id,
      studentId: student.studentId,
      studentFullName: `${student.firstName} ${student.lastName}`,
      studentDegree: `${classification.abbreviation} ${student.degree.degreeName} `,
      studentProfileImage: student.user.image ?? "",
      studentEmail:student.user.email,
      date: formatInTimeZone(
        appointment.date,
        timeZone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      ),
      note: appointment.note ?? "",
      appointmentStatus: appointment.status,
      advisorTitle: advisor.title ?? "",
      advisorId: advisor.advisorId,
      advisorFullName: `${advisor.firstName} ${advisor.lastName}`,
      advisorSpecialization: advisor.specialization.name,
      advisorOffice: advisor.office,
      advisorProfileImage: advisor.user.image ?? "",
      advisorEmail:advisor.user.email
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET appointment by ID error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}


export async function PATCH(
  _request: NextRequest,
  { params }: RouteContext
) {
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

    // 2. Validate the appointment ID
    const { appointmentId: rawAppointmentId } = await params;
    const parsedId = appointmentIdSchema.safeParse(rawAppointmentId);

    if (!parsedId.success) {
      return NextResponse.json(
        { message: "Invalid appointment ID." },
        { status: 400 }
      );
    }

    const appointmentId = parsedId.data;

    // 3. Retrieve the user's role and profile IDs
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        student: {
          select: { id: true },
        },
        advisor: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    if (user.role !== "STUDENT" && user.role !== "ADVISOR") {
      return NextResponse.json(
        { message: "Only students and advisors can cancel appointments." },
        { status: 403 }
      );
    }

    if (
      (user.role === "STUDENT" && !user.student) ||
      (user.role === "ADVISOR" && !user.advisor)
    ) {
      return NextResponse.json(
        { message: "Your account profile has not been configured." },
        { status: 403 }
      );
    }

    // 4. Build an ownership condition from the authenticated profile
    const ownershipFilter =
      user.role === "STUDENT"
        ? { studentId: user.student!.id }
        : { advisorId: user.advisor!.id };

    // 5. Cancel the appointment atomically
    const result = await prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findFirst({
        where: {
          id: appointmentId,
          ...ownershipFilter,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!appointment) {
        return { type: "NOT_FOUND" as const };
      }

      if (appointment.status !== "SCHEDULED") {
        return {
          type: "NOT_SCHEDULED" as const,
          status: appointment.status,
        };
      }

      // Only one concurrent request can successfully cancel
      // an appointment that is still SCHEDULED.
      const update = await tx.appointment.updateMany({
        where: {
          id: appointmentId,
          ...ownershipFilter,
          status: "SCHEDULED",
        },
        data: {
          status: "CANCELLED",
          // Release the associated availability slot so it can
          // become available for another appointment.
          availabilityId: null,
        },
      });

      if (update.count === 0) {
        return { type: "NOT_SCHEDULED" as const };
      }

      return {
        type: "CANCELLED" as const,
        id: appointment.id,
      };
    });

    if (result.type === "NOT_FOUND") {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }

    if (result.type === "NOT_SCHEDULED") {
      return NextResponse.json(
        {
          message:
            "Only scheduled appointments can be cancelled. This appointment may already be cancelled or completed.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Appointment cancelled successfully.",
        id: result.id,
        appointmentStatus: "CANCELLED",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH cancel appointment error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

