//ROUTE: api/advisor-notes/[noteId]/student
//This will get the note by id but for the student
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
    // 1. Authenticate the student
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

    // 2. Validate the advising note ID
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

    // 3. Find the signed-in user's student profile
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
        { message: "Only students with an assigned student profile can access this endpoint." },
        { status: 403 }
      );
    }

    // 4. Find the note only if it belongs to this student
    const note = await prisma.advisorNote.findFirst({
      where: {
        id: parsedNoteId,
        studentId: user.student.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        isPrivate: true,
        nextSteps: true,
        createdAt: true,
        advisor: {
          select: {
            firstName: true,
            lastName: true,
            title: true,
            user: {
              select: {
                image: true,
              },
            },
            specialization: {
              select: {
                name: true,
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

    // 5. Format the response
    const formattedNote = {
      id: note.id,
      title: note.title,
      content: note.content,
      isPrivate: note.isPrivate,
      nextSteps: note.nextSteps,
      advisorFullName: `${note.advisor.firstName} ${note.advisor.lastName}`,
      advisorTitle: note.advisor.title ?? "",
      advisorProfileImage: note.advisor.user.image ?? undefined,
      advisorSpecialization: note.advisor.specialization.name,
      createdAt: note.createdAt.toISOString(),
    };

    return NextResponse.json(formattedNote, { status: 200 });
  } catch (error) {
    console.error("Error fetching student advising note:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred while fetching the advising note." },
      { status: 500 }
    );
  }
}