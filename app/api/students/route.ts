//ROUTE : /api/students?search=

import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search")?.trim() ?? "";

    const searchTokens = search
      .split(/\s+/)
      .filter(Boolean);

    const students = await prisma.student.findMany({
      where: search
        ? {
            OR: [
              {
                studentId: {
                  contains: search,
                },
              },
              {
                AND: searchTokens.map((token) => ({
                  OR: [
                    {
                      firstName: {
                        contains: token,
                        mode: "insensitive",
                      },
                    },
                    {
                      lastName: {
                        contains: token,
                        mode: "insensitive",
                      },
                    },
                  ],
                })),
              },
            ],
          }
        : undefined,
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
      orderBy: {
        firstName: "asc",
      },
    });

    const result = students.map((student) => {
      const requiredCredits = student.degree.requiredCredits;
      const completedCredits = student.completedCredits;

      const degreePercentCompletion =
        requiredCredits > 0
          ? Math.round((completedCredits / requiredCredits) * 100)
          : 0;

      return {
        id: student.userId,
        studentId: student.studentId,
        fullName: `${student.firstName} ${student.lastName}`,
        degree: `${student.degree.degreeClassification.abbreviation} ${student.degree.degreeName}`,
        enrollmentDate: student.enrollmentDate.toISOString(),
        expectedGraduationDate:
          student.expectedGraduationDate.toISOString(),
        degreePercentCompletion,
        completedCredits,
        remainingCredits: requiredCredits - completedCredits,
        requiredCredits,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch students:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
