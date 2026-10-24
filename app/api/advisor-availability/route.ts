//ROUTE: /api/advisor-availability
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {createAdvisorAvailabilitySchema, availabilityDateFilterSchema} from "@/validators/api/availabilityApiValidators"
import { addDays, parseISO, format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";


// TO CREATE AN ADVISOR
export async function POST(request: NextRequest) {
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

    // 2. Validate the request body
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const validation = createAdvisorAvailabilitySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid availability data.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const date = new Date(validation.data.dateTime);

    // 3. Ensure the availability is in the future
    if (date <= new Date()) {
      return NextResponse.json(
        { message: "Availability must be scheduled for a future date and time." },
        { status: 400 }
      );
    }

    // 4. Retrieve the advisor profile from the session user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        advisor: {
          select: {
            id: true,
            advisorId: true,
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
        { message: "Only advisors can create availability." },
        { status: 403 }
      );
    }

    // 5. Check for an existing slot at the same date and time
    const existingAvailability =
      await prisma.advisorAvailability.findFirst({
        where: {
          advisorId: user.advisor.id,
          date,
        },
        select: {
          id: true,
        },
      });

    if (existingAvailability) {
      return NextResponse.json(
        { message: "You already have an availability slot at this date and time." },
        { status: 409 }
      );
    }

    // 6. Create the availability slot
    const availability = await prisma.advisorAvailability.create({
      data: {
        date,
        advisor: {
          connect: {
            id: user.advisor.id,
          },
        },
      },
      select: {
        id: true,
        date: true,
        advisor: {
          select: {
            advisorId: true,
          },
        },
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        id: availability.id,
        dateTime: availability.date.toISOString(),
        advisorId: availability.advisor.advisorId,
        createdAt: availability.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating advisor availability:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred while creating availability." },
      { status: 500 }
    );
  }
}


//TO GET AN ADVISOR'S OWN AVAILABILITY TIMES



export async function GET(request: NextRequest) {
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

    // 2. Get and validate the date query parameter
    // const dateParam = request.nextUrl.searchParams.get("date");

    // if (!dateParam) {
    //   return NextResponse.json(
    //     { message: "The date query parameter is required." },
    //     { status: 400 }
    //   );
    // }

    // const validation = availabilityDateFilterSchema.safeParse(dateParam);

    // if (!validation.success) {
    //   return NextResponse.json(
    //     {
    //       message:
    //         "Invalid date. Provide an ISO date-time string, including a timezone.",
    //     },
    //     { status: 400 }
    //   );
    // }

    // // 3. Determine the UTC calendar-day boundaries
    // const requestedDate = new Date(validation.data);

    // const startOfDay = new Date(requestedDate);
    // startOfDay.setUTCHours(0, 0, 0, 0);

    // const startOfNextDay = new Date(startOfDay);
    // startOfNextDay.setUTCDate(startOfNextDay.getUTCDate() + 1);
    const date = request.nextUrl.searchParams.get("date");

if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  return NextResponse.json([]);
}

const selectedDate = parseISO(date);
const nextDate = addDays(selectedDate, 1);

const startOfDay = fromZonedTime(
  `${date}T00:00:00`,
  "Africa/Lagos"
);

const startOfNextDay = fromZonedTime(
  `${format(nextDate, "yyyy-MM-dd")}T00:00:00`,
  "Africa/Lagos"
);

    

    // 4. Find the advisor associated with the session
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        advisor: {
          select: {
            id: true,
            advisorId: true,
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
        { message: "Only advisors can access their availability." },
        { status: 403 }
      );
    }

    // 5. Retrieve all availability slots for that UTC calendar day
    const availabilities = await prisma.advisorAvailability.findMany({
      where: {
        advisorId: user.advisor.id,
        date: {
          gte: startOfDay,
          lt: startOfNextDay,
        },
      },
      select: {
        id: true,
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

    // 6. Format the response
    const formattedAvailabilities = availabilities.map(
      (availability) => ({
        id: availability.id,
        dateTime: availability.date.toISOString(),
        advisorId: user.advisor!.advisorId,
        hasAppointment: availability.appointments.length > 0,
        createdAt: availability.createdAt.toISOString(),
      })
    );

    return NextResponse.json(formattedAvailabilities, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching advisor availability:", error);

    return NextResponse.json(
      {
        message:
          "An unexpected error occurred while fetching advisor availability.",
      },
      { status: 500 }
    );
  }
}