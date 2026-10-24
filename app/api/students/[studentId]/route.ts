
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ studentId: string }>;
};

export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { studentId } = await params;

    if (!/^\d{8}$/.test(studentId)) {
      return NextResponse.json(
        { message: "Student ID must contain exactly 8 digits." },
        { status: 400 },
      );
    }

    const student = await prisma.student.findUnique({
      where: {
        studentId,
      },
      select: {
        id: true,
        userId: true,
        studentId: true,
        firstName: true,
        lastName: true,
        enrollmentDate: true,
        expectedGraduationDate: true,
        completedCredits: true,
        user: {
          select: {
            image: true,
          },
        },
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
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 },
      );
    }

    const requiredCredits = student.degree.requiredCredits;
    const completedCredits = student.completedCredits;

    const degreePercentCompletion =
      requiredCredits > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round((completedCredits / requiredCredits) * 100),
            ),
          )
        : 0;

    const remainingCredits = Math.max(
      0,
      requiredCredits - completedCredits,
    );

    // Find the nearest future scheduled appointment for this student.
    const nextAppointment = await prisma.appointment.findFirst({
      where: {
        studentId: student.id,
        date: {
          gt: new Date(),
        },
        status: "SCHEDULED",
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        date:true
      },
    });

    const result = {
      id: student.userId,
      studentId: student.studentId,
      fullName: `${student.firstName} ${student.lastName}`,
      degree: `${student.degree.degreeClassification.abbreviation}. ${student.degree.degreeName}`,
      enrollmentDate: student.enrollmentDate.toISOString(),
      expectedGraduationDate:
        student.expectedGraduationDate.toISOString(),
      degreePercentCompletion,
      completedCredits,
      remainingCredits,
      requiredCredits,
      nextAppointment: nextAppointment?.date ?? "",
      studentProfileImage: student.user.image ?? "",
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch student:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
