
// ROUTE: app/api/appointments/route.ts

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createAppointmentSchema } from "@/validators/api/appointmentApiValidators";
import { sendAppointmentConfirmationEmail } from "@/lib/email";
import { publishNotification } from "@/lib/ably";

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate the student.
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const authenticatedUserId = Number(session.user.id);

    if (
      !Number.isInteger(authenticatedUserId) ||
      authenticatedUserId <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid user session." },
        { status: 401 }
      );
    }

    // 2. Validate the request body.
    const body: unknown = await request.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid appointment data.",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { advisorId, availabilityId, note, timeZone } = parsed.data;

    // 3. Find the authenticated student's profile.
    const user = await prisma.user.findUnique({
      where: {
        id: authenticatedUserId,
      },
      select: {
        id: true,
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
          message: "Only registered students can create appointments.",
        },
        { status: 403 }
      );
    }

    // 4. Find the advisor using their external 8-digit ID.
    const advisor = await prisma.advisor.findUnique({
      where: {
        advisorId,
      },
      select: {
        id: true,
        userId: true,
        advisorId: true,
        specializationId: true,
        specialization: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!advisor) {
      return NextResponse.json(
        { message: "Advisor not found." },
        { status: 404 }
      );
    }

    // 5. Validate the timezone.
    const resolvedTimeZone = timeZone ?? "UTC";

    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone: resolvedTimeZone,
      }).format(new Date());
    } catch {
      return NextResponse.json(
        {
          message: "Invalid timeZone. Provide a valid IANA timezone.",
        },
        { status: 400 }
      );
    }

    // 6. Create appointment and notifications transactionally.
    const result = await prisma.$transaction(
      async (tx) => {
        const availability = await tx.advisorAvailability.findFirst({
          where: {
            id: availabilityId,
            advisorId: advisor.id,
          },
          select: {
            id: true,
            date: true,
            appointments: {
              select: {
                id: true,
              },
              take: 1,
            },
          },
        });

        if (!availability) {
          throw new Error("AVAILABILITY_NOT_FOUND");
        }

        if (availability.date.getTime() <= Date.now()) {
          throw new Error("AVAILABILITY_IN_PAST");
        }

        if (availability.appointments.length > 0) {
          throw new Error("AVAILABILITY_ALREADY_BOOKED");
        }

        // Create the appointment.
        const appointment = await tx.appointment.create({
          data: {
            date: availability.date,
            note: note?.trim() || null,
            status: "SCHEDULED",

            student: {
              connect: {
                id: user.student!.id,
              },
            },

            advisor: {
              connect: {
                id: advisor.id,
              },
            },

            specialization: {
              connect: {
                id: advisor.specializationId,
              },
            },

            availability: {
              connect: {
                id: availability.id,
              },
            },
          },
          select: {
            id: true,
            date: true,
            note: true,
            status: true,
            createdAt: true,

            student: {
              select: {
                studentId: true,
                firstName: true,
                lastName: true,
              },
            },

            advisor: {
              select: {
                advisorId: true,
                firstName: true,
                lastName: true,
                title: true,
              },
            },

            specialization: {
              select: {
                name: true,
              },
            },

            availability: {
              select: {
                id: true,
              },
            },
          },
        });

        // Prepare names for the notification messages.
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
            type: "APPOINTMENT_SCHEDULED",
            title: "Appointment scheduled",
            message: `Your appointment with ${advisorName} has been scheduled.`,
            userId: user.id,
            appointmentId: appointment.id,
          },
        });

        // Create the advisor's notification.
        const advisorNotification = await tx.notification.create({
          data: {
            type: "APPOINTMENT_SCHEDULED",
            title: "New appointment",
            message: `${studentName} has scheduled an appointment with you.`,
            userId: advisor.userId,
            appointmentId: appointment.id,
          },
        });

        return {
          appointment,
          studentNotification,
          advisorNotification,
        };
      },
      {
        isolationLevel: "Serializable",
      }
    );

    const {
      appointment,
      studentNotification,
      advisorNotification,
    } = result;

    // 7. Publish notifications through Ably.
    // The database transaction has already committed.
    const notificationResults = await Promise.allSettled([
      publishNotification(user.id, studentNotification),
      publishNotification(advisor.userId, advisorNotification),
    ]);

    notificationResults.forEach((notificationResult, index) => {
      if (notificationResult.status === "rejected") {
        console.error(
          `Real-time notification ${index + 1} failed:`,
          notificationResult.reason
        );
      }
    });

    // 8. Retrieve email details.
    const appointmentDetails = await prisma.appointment.findUnique({
      where: {
        id: appointment.id,
      },
      select: {
        date: true,

        student: {
          select: {
            firstName: true,
            lastName: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },

        advisor: {
          select: {
            firstName: true,
            lastName: true,
            title: true,
            user: {
              select: {
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

    // 9. Send confirmation emails to both parties.
    if (appointmentDetails) {
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
        sendAppointmentConfirmationEmail({
          to: appointmentDetails.student.user.email,
          recipientName: studentName,
          otherPersonName: advisorName,
          appointmentDate: appointmentDetails.date.toISOString(),
          timeZone: resolvedTimeZone,
          specialization: appointmentDetails.specialization.name,
        }),

        sendAppointmentConfirmationEmail({
          to: appointmentDetails.advisor.user.email,
          recipientName: advisorName,
          otherPersonName: studentName,
          appointmentDate: appointmentDetails.date.toISOString(),
          timeZone: resolvedTimeZone,
          specialization: appointmentDetails.specialization.name,
        }),
      ]);

      emailResults.forEach((emailResult, index) => {
        if (emailResult.status === "rejected") {
          console.error(
            `Appointment confirmation email ${index + 1} failed:`,
            emailResult.reason
          );
        }
      });
    }

    // 10. Return the newly created appointment.
    return NextResponse.json(
      {
        id: appointment.id,
        dateTime: appointment.date.toISOString(),
        note: appointment.note,
        status: appointment.status,
        createdAt: appointment.createdAt.toISOString(),
        studentId: appointment.student.studentId,
        advisorId: appointment.advisor.advisorId,

        advisorFullName: [
          appointment.advisor.title,
          appointment.advisor.firstName,
          appointment.advisor.lastName,
        ]
          .filter(Boolean)
          .join(" "),

        specialization: appointment.specialization.name,
        availabilityId: appointment.availability?.id ?? null,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "AVAILABILITY_NOT_FOUND") {
        return NextResponse.json(
          {
            message:
              "The selected availability slot does not belong to this advisor or no longer exists.",
          },
          { status: 404 }
        );
      }

      if (error.message === "AVAILABILITY_IN_PAST") {
        return NextResponse.json(
          {
            message: "You cannot book an availability slot in the past.",
          },
          { status: 409 }
        );
      }

      if (error.message === "AVAILABILITY_ALREADY_BOOKED") {
        return NextResponse.json(
          {
            message: "This availability slot has already been booked.",
          },
          { status: 409 }
        );
      }
    }

    // Prisma transaction conflicts/deadlocks.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2034"
    ) {
      return NextResponse.json(
        {
          message:
            "This slot may have just been booked. Please refresh availability and try another slot.",
        },
        { status: 409 }
      );
    }

    console.error("Create appointment error:", error);

    return NextResponse.json(
      { message: "Failed to create appointment." },
      { status: 500 }
    );
  }
}
