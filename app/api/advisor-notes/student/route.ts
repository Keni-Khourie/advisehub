//ROUTE: /api/advisor-notes/student
//This will get the student's advising note for the student

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
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

    // 2. Find the student profile belonging to the signed-in user
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
        { message: "Only students with an assigned student profile can access these notes." },
        { status: 403 }
      );
    }

    // 3. Retrieve all notes associated with this student
    // Includes both public and private notes.
    const notes = await prisma.advisorNote.findMany({
      where: {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // 4. Format the response
    const formattedNotes = notes.map((note) => ({
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
    }));

    return NextResponse.json(formattedNotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching student advising notes:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred while fetching your advising notes." },
      { status: 500 }
    );
  }
}