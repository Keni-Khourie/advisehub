//ROUTE: /api/advisor-availability/[availabilityId]
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ availabilityId: string }>;
}

export async function DELETE(
  _request: NextRequest,
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
        { message: "Invalid session user ID." },
        { status: 401 }
      );
    }

    // 2. Validate the availability ID from the URL
    const { availabilityId} = await params;
    const parsedAvailabilityId = Number(availabilityId);

    if (
      !/^\d+$/.test(availabilityId) ||
      !Number.isSafeInteger(parsedAvailabilityId) ||
      parsedAvailabilityId <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid advisor availability ID." },
        { status: 400 }
      );
    }

    // 3. Retrieve the advisor profile associated with the session
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

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 401 }
      );
    }

    if (user.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "Only advisors can delete availability." },
        { status: 403 }
      );
    }

    // 4. Find the availability and verify ownership
    const availability = await prisma.advisorAvailability.findFirst({
      where: {
        id: parsedAvailabilityId,
        advisorId: user.advisor.id,
      },
      select: {
        id: true,
        date: true,
        appointments: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!availability) {
      return NextResponse.json(
        { message: "Availability not found." },
        { status: 404 }
      );
    }

    // 5. Prevent deletion if an appointment is linked to this slot
    if (availability.appointments.length > 0) {
      return NextResponse.json(
        {
          message:
            "This availability cannot be deleted because it has an associated appointment.",
        },
        { status: 409 }
      );
    }

    // 6. Delete the availability
    await prisma.advisorAvailability.delete({
      where: {
        id: availability.id,
      },
    });

    return NextResponse.json(
      {
        message: "Availability deleted successfully.",
        id: availability.id,
        dateTime: availability.date.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting advisor availability:", error);

    return NextResponse.json(
      {
        message:
          "An unexpected error occurred while deleting advisor availability.",
      },
      { status: 500 }
    );
  }
}