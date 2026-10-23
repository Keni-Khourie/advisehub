//ROUTE: api/advisor-notes

import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.advisorNote.findMany({
      where: {
        isPrivate: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        nextSteps: true,
        createdAt: true,
        advisorId: true,
        studentId: true,
        advisor: {
          select: {
            advisorId: true,
            firstName: true,
            lastName: true,
            title: true,
            specialization: {
              select: {
                name: true,
              },
            },
          },
        },
        student: {
          select: {
            studentId: true,
            firstName: true,
            lastName: true,
            degree: {
              select: {
                degreeName: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = notes.map((note) => ({
      id: note.id,
      advisorFullName: [
        note.advisor.title?.trim(),
        note.advisor.firstName,
        note.advisor.lastName,
      ]
        .filter(Boolean)
        .join(" "),
      createdAt: note.createdAt.toISOString(),
      advisorSpecialization: note.advisor.specialization.name,
      title: note.title,
      nextSteps: note.nextSteps,
      content: note.content,
      studentFullName: `${note.student.firstName} ${note.student.lastName}`,
      studentDegree: `${note.student.degree.degreeClassification.abbreviation} ${note.student.degree.degreeName}`,
      advisorId: note.advisor.advisorId,
      studentId: note.student.studentId,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch public advising notes:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
