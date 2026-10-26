//ROUTE: /api/advisor-notes/student/advisor/[advisorId]
//This route will get all the notes about a specific student made by a specific advisor. The advisor's ID will be passed in the params.


import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    advisorId: string;
  }>;
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
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    // 2. Retrieve the authenticated student's profile
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

    if (user?.role !== "STUDENT" || !user.student) {
      return NextResponse.json(
        {
          message: "Forbidden. Only students can access this resource.",
        },
        { status: 403 }
      );
    }

    // 3. Validate the advisor's external 8-digit ID
    const { advisorId } = await params;

    if (!/^\d{8}$/.test(advisorId)) {
      return NextResponse.json(
        { message: "Advisor ID must contain exactly 8 digits." },
        { status: 400 }
      );
    }

    // 4. Find the advisor using their external ID
    const advisor = await prisma.advisor.findUnique({
      where: { advisorId },
      select: {
        id: true,
      },
    });

    if (!advisor) {
      return NextResponse.json(
        { message: "Advisor not found." },
        { status: 404 }
      );
    }

    // 5. Retrieve both public and private notes
    // written by this advisor about the authenticated student
    const notes = await prisma.advisorNote.findMany({
      where: {
        advisorId: advisor.id,
        studentId: user.student.id,
      },
      select: {
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
