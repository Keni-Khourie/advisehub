//ROUTE: /api/advisor-notes/[noteId]
//this will get an advising note for the advisor
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ noteId: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
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

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid session user ID." },
        { status: 401 }
      );
    }

    // 2. Validate the note ID from the URL
    const { noteId } = await params;
    const parsedNoteId = Number(noteId);

    if (
      !/^\d+$/.test(noteId) ||
      !Number.isSafeInteger(parsedNoteId) ||
      parsedNoteId <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid advising note ID." },
        { status: 400 }
      );
    }

    // 3. Retrieve the signed-in user's role and advisor profile
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

    if (
      user.role !== "ADMIN" &&
      (user.role !== "ADVISOR" || !user.advisor)
    ) {
      return NextResponse.json(
        { message: "You are not authorized to access advising notes." },
        { status: 403 }
      );
    }

    // 4. Find the advising note
    const note = await prisma.advisorNote.findUnique({
      where: { id: parsedNoteId },
      select: {
        id: true,
        title: true,
        content: true,
        nextSteps: true,
        isPrivate: true,
        createdAt: true,
        updatedAt: true,
        advisorId: true,

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
            user: {
      select: {
        image: true,
      },
    },
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
    });

    if (!note) {
      return NextResponse.json(
        { message: "Advising note not found." },
        { status: 404 }
      );
    }

    // 5. Advisors may only access their own notes.
    // Admins may access any note.
    if (
      user.role !== "ADMIN" &&
      note.advisorId !== user.advisor!.id
    ) {
      return NextResponse.json(
        { message: "You are not authorized to access this advising note." },
        { status: 403 }
      );
    }

    // 6. Return the requested response shape
    const formattedNote = {
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
      studentProfileImage: note.student.user.image ?? undefined,
    };

    return NextResponse.json(formattedNote, { status: 200 });
  } catch (error) {
    console.error("Error fetching advising note:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred while fetching the advising note." },
      { status: 500 }
    );
  }
}