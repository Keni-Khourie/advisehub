//ROUTE: api/appointments

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {createAppointmentSchema} from "@/validators/api/appointmentApiValidators"

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

    const { advisorId, availabilityId, note } = parsed.data;

    // 3. Find the authenticated student's profile.
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
        { message: "Only registered students can create appointments." },
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

    // 5. Create the appointment transactionally.
    const appointment = await prisma.$transaction(
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

        // Use the exact instant stored for the selected availability slot.
        // Do not reconstruct the date from a local timezone.
        return tx.appointment.create({
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
      },
      {
        isolationLevel: "Serializable",
      }
    );

    // 6. Return the newly created appointment.
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
          { message: "You cannot book an availability slot in the past." },
          { status: 409 }
        );
      }

      if (error.message === "AVAILABILITY_ALREADY_BOOKED") {
        return NextResponse.json(
          { message: "This availability slot has already been booked." },
          { status: 409 }
        );
      }
    }

    // Prisma uses P2034 for transaction conflicts/deadlocks.
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
