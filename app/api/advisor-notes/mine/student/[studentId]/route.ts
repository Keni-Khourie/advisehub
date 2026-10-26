//ROUTE: /api/advisor-notes/mine/student/[studentId]
//This route will get all of an advisor's notes about a given student, taking the student's 8-digit ID:

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    studentId: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    // 1. Authenticate the advisor
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
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Retrieve the advisor profile from the authenticated user
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

    if (user?.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        {
          message: "Forbidden. Only advisors can access this resource.",
        },
        { status: 403 }
      );
    }

    // 3. Validate the student's external 8-digit ID
    const { studentId } = await params;

    if (!/^\d{8}$/.test(studentId)) {
      return NextResponse.json(
        { message: "Student ID must contain exactly 8 digits." },
        { status: 400 }
      );
    }

    // 4. Find the student using their external ID
    const student = await prisma.student.findUnique({
      where: { studentId },
      select: {
        id: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    // 5. Retrieve public and private notes authored by this advisor
    const notes = await prisma.advisorNote.findMany({
      where: {
        advisorId: user.advisor.id,
        studentId: student.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        nextSteps: true,
        isPrivate: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 6. Return the requested response shape
    const response = notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      nextSteps: note.nextSteps,
      isPrivate: note.isPrivate,
      createdAt: note.createdAt.toISOString(),
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching advisor notes for student:",
      error
    );

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
