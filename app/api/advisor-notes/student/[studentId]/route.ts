//ROUTE: /api/advisor-notes/student/[studentId]
//This will get all public notes written about the students by all advisors AND the private ones written about that student by the advisor making the query

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ studentId: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the requesting advisor
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

    // 2. Validate the student's external 8-digit ID
    const { studentId } = await params;

    if (!/^\d{8}$/.test(studentId)) {
      return NextResponse.json(
        { message: "Student ID must contain exactly 8 digits." },
        { status: 400 }
      );
    }

    // 3. Identify the requesting advisor from the session
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

    if (user.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        { message: "Only advisors can access this endpoint." },
        { status: 403 }
      );
    }

    // 4. Confirm that the student exists
    const student = await prisma.student.findUnique({
      where: { studentId },
      select: { id: true },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    // 5. Fetch public notes and all notes written by this advisor
    const notes = await prisma.advisorNote.findMany({
      where: {
        studentId: student.id,
        OR: [
          { isPrivate: false },
          { advisorId: user.advisor.id },
        ],
      },
      select: {
        id: true,
        title: true,
        content: true,
        nextSteps: true,
        createdAt: true,
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

    // 6. Format the results into the requested interface
    const formattedNotes = notes.map((note) => ({
      id: note.id,
      advisorFullName: [
        note.advisor.title,
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
      advisorId: note.advisor.advisorId,
    }));

    return NextResponse.json(formattedNotes, { status: 200 });
  } catch (error) {
    console.error("Error fetching student advising notes:", error);

    return NextResponse.json(
      {
        message:
          "An unexpected error occurred while fetching advising notes.",
      },
      { status: 500 }
    );
  }
}