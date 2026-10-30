//ROUTE : api/appointments/[appointmentId]

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";
import { publishNotification } from "@/lib/ably";
import { sendAppointmentCancellationEmail } from "@/lib/email";
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
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the user.
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

    // 2. Validate the appointment ID.
    const { appointmentId: rawAppointmentId } = await params;
    const parsedId = appointmentIdSchema.safeParse(rawAppointmentId);

    if (!parsedId.success) {
      return NextResponse.json(
        { message: "Invalid appointment ID." },
        { status: 400 }
      );
    }

    const appointmentId = parsedId.data;

    // 3. Validate the requested timezone.
    // Pass it as a query parameter:
    // PATCH /api/appointments/123?timeZone=Africa/Lagos

    const parsedTimeZone = timeZoneSchema.safeParse(
      request.nextUrl.searchParams.get("timeZone") ?? "UTC"
    );

    if (!parsedTimeZone.success) {
      return NextResponse.json(
        {
          message: "Invalid timeZone. Provide a valid IANA timezone.",
        },
        { status: 400 }
      );
    }

    const timeZone = parsedTimeZone.data;

    // 4. Retrieve the user's role and profile IDs.
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
        student: {
          select: {
            id: true,
          },
        },
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

    if (user.role !== "STUDENT" && user.role !== "ADVISOR") {
      return NextResponse.json(
        {
          message: "Only students and advisors can cancel appointments.",
        },
        { status: 403 }
      );
    }

    if (
      (user.role === "STUDENT" && !user.student) ||
      (user.role === "ADVISOR" && !user.advisor)
    ) {
      return NextResponse.json(
        {
          message: "Your account profile has not been configured.",
        },
        { status: 403 }
      );
    }

    // 5. Build an ownership condition using the authenticated profile.
    const ownershipFilter =
      user.role === "STUDENT"
        ? { studentId: user.student!.id }
        : { advisorId: user.advisor!.id };

    // 6. Cancel the appointment and create notifications
    // in the same database transaction.
    const result = await prisma.$transaction(
      async (tx) => {
        const appointment = await tx.appointment.findFirst({
          where: {
            id: appointmentId,
            ...ownershipFilter,
          },
          select: {
            id: true,
            date: true,
            status: true,

            student: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                user: {
                  select: {
                    id: true,
                    email: true,
                  },
                },
              },
            },

            advisor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
                user: {
                  select: {
                    id: true,
                    email: true,
                  },
                },
              },
            },

            specialization: {
              select: {
                name: true,
              },
            },
          },
        });

        if (!appointment) {
          return {
            type: "NOT_FOUND" as const,
          };
        }

        if (appointment.status !== "SCHEDULED") {
          return {
            type: "NOT_SCHEDULED" as const,
            status: appointment.status,
          };
        }

        // Only update an appointment that is still scheduled.
        const update = await tx.appointment.updateMany({
          where: {
            id: appointmentId,
            ...ownershipFilter,
            status: "SCHEDULED",
          },
          data: {
            status: "CANCELLED",

            // Release the associated availability slot.
            availabilityId: null,
          },
        });

        if (update.count === 0) {
          return {
            type: "NOT_SCHEDULED" as const,
          };
        }

        // Prepare recipient names.
        const studentName =
          `${appointment.student.firstName} ${appointment.student.lastName}`;

        const advisorName = [
          appointment.advisor.title,
          appointment.advisor.firstName,
          appointment.advisor.lastName,
        ]
          .filter(Boolean)
          .join(" ");

        // Create the student's notification.
        const studentNotification = await tx.notification.create({
          data: {
            type: "APPOINTMENT_CANCELLED",
            title: "Appointment cancelled",
            message: `Your appointment with ${advisorName} has been cancelled.`,
            userId: appointment.student.user.id,
            appointmentId: appointment.id,
          },
        });

        // Create the advisor's notification.
        const advisorNotification = await tx.notification.create({
          data: {
            type: "APPOINTMENT_CANCELLED",
            title: "Appointment cancelled",
            message: `${studentName} has cancelled their appointment with you.`,
            userId: appointment.advisor.user.id,
            appointmentId: appointment.id,
          },
        });

        return {
          type: "CANCELLED" as const,
          id: appointment.id,
          appointmentDetails: appointment,
          studentNotification,
          advisorNotification,
        };
      },
      {
        isolationLevel: "Serializable",
      }
    );

    // 7. Handle unsuccessful cancellation results.
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

    // 8. Publish both notifications through Ably.
    // The appointment cancellation and notification records
    // have already been committed to the database.

    const notificationResults = await Promise.allSettled([
      publishNotification(
        result.appointmentDetails.student.user.id,
        result.studentNotification
      ),

      publishNotification(
        result.appointmentDetails.advisor.user.id,
        result.advisorNotification
      ),
    ]);

    notificationResults.forEach((notificationResult, index) => {
      if (notificationResult.status === "rejected") {
        console.error(
          `Cancellation notification ${index + 1} failed for appointment ${appointmentId}:`,
          notificationResult.reason
        );
      }
    });

    // 9. Send cancellation emails to both parties.
    const appointmentDetails = result.appointmentDetails;

    const studentName =
      `${appointmentDetails.student.firstName} ${appointmentDetails.student.lastName}`;

    const advisorName = [
      appointmentDetails.advisor.title,
      appointmentDetails.advisor.firstName,
      appointmentDetails.advisor.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const emailResults = await Promise.allSettled([
      sendAppointmentCancellationEmail({
        to: appointmentDetails.student.user.email,
        recipientName: studentName,
        otherPersonName: advisorName,
        appointmentDate: appointmentDetails.date.toISOString(),
        timeZone,
        specialization: appointmentDetails.specialization.name,
      }),

      sendAppointmentCancellationEmail({
        to: appointmentDetails.advisor.user.email,
        recipientName: advisorName,
        otherPersonName: studentName,
        appointmentDate: appointmentDetails.date.toISOString(),
        timeZone,
        specialization: appointmentDetails.specialization.name,
      }),
    ]);

    emailResults.forEach((emailResult, index) => {
      if (emailResult.status === "rejected") {
        console.error(
          `Cancellation email ${index + 1} failed for appointment ${appointmentId}:`,
          emailResult.reason
        );
      }
    });

    // 10. Return the successful cancellation response.
    return NextResponse.json(
      {
        message: "Appointment cancelled successfully.",
        id: result.id,
        appointmentStatus: "CANCELLED",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle Prisma serializable transaction conflicts.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2034"
    ) {
      return NextResponse.json(
        {
          message:
            "This appointment may have just been cancelled. Please refresh and try again.",
        },
        { status: 409 }
      );
    }

    console.error("PATCH cancel appointment error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

