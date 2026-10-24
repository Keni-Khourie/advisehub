//ROUTE: /api/advisor/availability/[advisorId]
//This route is to allow students get a selected advisor's availability
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { availabilityDateFilterSchema} from "@/validators/api/availabilityApiValidators"
import { addDays, format, parseISO, isValid } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
interface RouteContext {
  params: Promise<{ advisorId: string }>;
}



export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Get the advisor ID and date parameter
    const { advisorId } = await params;
    const dateParam = request.nextUrl.searchParams.get("date");
    //const timeZone = request.nextUrl.searchParams.get("timeZone")

    // Return an empty array if either parameter is missing
    if (!advisorId || !dateParam) {
      return NextResponse.json([], { status: 200 });
    }

    // 2. Validate the advisor's 8-digit ID and date
    if (!/^\d{8}$/.test(advisorId)) {
      return NextResponse.json([], { status: 200 });
    }

    // const dateValidation = availabilityDateFilterSchema.safeParse(dateParam);

    // if (!dateValidation.success) {
    //   return NextResponse.json([], { status: 200 });
    // }

    // 3. Authenticate the student
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

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 401 }
      );
    }

    if (user.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        { message: "Only students can access advisor availability." },
        { status: 403 }
      );
    }

    // 4. Calculate the requested UTC calendar-day boundaries

    // const requestedDate = new Date(dateValidation.data);

    // const startOfDay = new Date(requestedDate);
    // startOfDay.setUTCHours(0, 0, 0, 0);

    // const startOfNextDay = new Date(startOfDay);
    // startOfNextDay.setUTCDate(startOfNextDay.getUTCDate() + 1);

const selectedDate = parseISO(dateParam);
const nextDate = addDays(selectedDate, 1);

const startOfDay = fromZonedTime(
  `${dateParam}T00:00:00`,
  "Africa/Lagos"
);

const startOfNextDay = fromZonedTime(
  `${format(nextDate, "yyyy-MM-dd")}T00:00:00`,
  "Africa/Lagos"
);



    // 5. Find the selected advisor
    const advisor = await prisma.advisor.findUnique({
      where: { advisorId },
      select: {
        id: true,
        advisorId: true,
      },
    });

    if (!advisor) {
      return NextResponse.json([], { status: 200 });
    }

    // 6. Retrieve all availability slots for the selected day
    const availabilities = await prisma.advisorAvailability.findMany({
      where: {
        advisorId: advisor.id,
        date: {
          gte: startOfDay,
          lt: startOfNextDay,
        },
      },
      select: {
        date: true,
        createdAt: true,
        appointments: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // 7. Format the response
    const formattedAvailabilities = availabilities.map(
      (availability) => ({
        dateTime: availability.date.toISOString(),
        advisorId: advisor.advisorId,
        hasAppointment: availability.appointments.length > 0,
        createdAt: availability.createdAt.toISOString(),
      })
    );

    return NextResponse.json(formattedAvailabilities, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching selected advisor's availability:", error);

    return NextResponse.json(
      {
        message:
          "An unexpected error occurred while fetching advisor availability.",
      },
      { status: 500 }
    );
  }
}