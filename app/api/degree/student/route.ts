//ROUTE: /api/degree/student

import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    // 2. Retrieve the student's degree information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        student: {
          select: {
            completedCredits: true,
            enrollmentDate: true,
            expectedGraduationDate: true,
            degree: {
              select: {
                degreeName: true,
                requiredCredits: true,
                degreeClassification: {
                  select: {
                    abbreviation: true,
                  },
                },
              },
            },
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

    if (user.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        {
          message: "Only authenticated students can access this resource.",
        },
        { status: 403 }
      );
    }

    // 3. Calculate degree progress
    const student = user.student;
    const completedCredits = student.completedCredits;
    const requiredCredits = student.degree.requiredCredits;

    const degreeProgressPercent =
      requiredCredits > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round((completedCredits / requiredCredits) * 100)
            )
          )
        : 0;

    const remainingCredits = Math.max(
      0,
      requiredCredits - completedCredits
    );

    // 4. Return the degree information
    return NextResponse.json(
      {
        degreeProgressPercent,
        completedCredits,
        requiredCredits,
        remainingCredits,
        degreeName: student.degree.degreeName,
        degreeClassificationAbbreviation:
          student.degree.degreeClassification.abbreviation,
        enrollmentDate: student.enrollmentDate.toISOString(),
        expectedGraduationDate:
          student.expectedGraduationDate.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET student degree information error:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
