//ROUTE: /api/advisor


import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const advisorSpecializationSchema = z.enum([
  "Academic Planning",
  "Course Registration",
  "Degree Requirements",
  "Transfer Credits",
  "General Advising",
]);

export async function GET(request: NextRequest) {
  try {
    // Require an authenticated student.
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

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
        { message: "Only students can view advisors." },
        { status: 403 }
      );
    }

    // Validate the optional specialization query parameter.
    const specializationParam =
      request.nextUrl.searchParams.get("specialization");

    let specialization: string | undefined;

    if (specializationParam !== null) {
      const parsed =
        advisorSpecializationSchema.safeParse(specializationParam);

      if (!parsed.success) {
        return NextResponse.json(
          {
            message: "Invalid advisor specialization.",
            validSpecializations: advisorSpecializationSchema.options,
          },
          { status: 400 }
        );
      }

      specialization = parsed.data;
    }

    // Only availability slots strictly in the future qualify.
    const now = new Date();

    const advisors = await prisma.advisor.findMany({
      where: specialization
        ? {
            specialization: {
              name: specialization,
            },
          }
        : undefined,
      select: {
        advisorId: true,
        firstName: true,
        lastName: true,
        title: true,
        office: true,
        yearsOfExperience: true,
        specialization: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            image: true,
          },
        },
        availabilitySlots: {
          where: {
            date: {
              gt: now,
            },
          },
          orderBy: {
            date: "asc",
          },
          take: 1,
          select: {
            date: true,
          },
        },
      },
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
      ],
    });

    const result = advisors.map((advisor) => ({
      // Keep this as a string to preserve leading zeros.
      advisorId: advisor.advisorId,
      specialization: advisor.specialization.name,
      office: advisor.office,
      yearsOfExperience: advisor.yearsOfExperience,
      closestAvailability:
        advisor.availabilitySlots[0]?.date.toISOString() ?? "",
      fullName: `${advisor.firstName} ${advisor.lastName}`,
      title: advisor.title ?? "",
      advisorProfileImg: advisor.user.image ?? "",
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get advisors error:", error);

    return NextResponse.json(
      { message: "Failed to retrieve advisors." },
      { status: 500 }
    );
  }
}
