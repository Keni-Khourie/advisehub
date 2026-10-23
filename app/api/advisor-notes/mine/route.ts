//ROUTE: /api/advisor-notes/mine
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Get the current session
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

    // 2. Find the signed-in user and their advisor profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        advisor: {
          select: {
            id: true, // Internal database ID, used for the query
            advisorId: true, // External 8-digit advisor ID
          },
        },
      },
    });

    if (!user || user.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "You are not authorized to access these advising notes." },
        { status: 403 }
      );
    }

    // 3. Get all notes created by this advisor
    const notes = await prisma.advisorNote.findMany({
      where: {
        advisorId: user.advisor.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        nextSteps: true,
        isPrivate: true,
        createdAt: true,
        updatedAt: true,

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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 4. Format the response for the frontend
    const formattedNotes = notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      nextSteps: note.nextSteps,
      isPrivate: note.isPrivate,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),

      advisorId: note.advisor.advisorId,
      advisorFullName: [
        note.advisor.title,
        note.advisor.firstName,
        note.advisor.lastName,
      ]
        .filter(Boolean)
        .join(" "),
      advisorSpecialization: note.advisor.specialization.name,

      studentId: note.student.studentId,
      studentFullName: `${note.student.firstName} ${note.student.lastName}`,
      studentDegree: `${note.student.degree.degreeClassification.abbreviation} ${note.student.degree.degreeName}`,
    }));

    return NextResponse.json(formattedNotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching advisor's notes:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred while fetching advising notes." },
      { status: 500 }
    );
  }
}