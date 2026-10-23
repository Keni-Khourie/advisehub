//ROUTE: /api/students/[studentId]

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
        userId: true,
        studentId: true,
        firstName: true,
        lastName: true,
        enrollmentDate: true,
        expectedGraduationDate: true,
        completedCredits: true,
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
        ? Math.round((completedCredits / requiredCredits) * 100)
        : 0;

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
      remainingCredits: requiredCredits - completedCredits,
      requiredCredits,
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
