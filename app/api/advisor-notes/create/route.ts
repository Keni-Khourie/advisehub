//ROUTE: /api/advisor-notes/create

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";

export async function POST(req: NextRequest) {
  try {
    // Authenticate the current user.
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 },
      );
    }

    const userId = Number(session.user.id);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid session user ID." },
        { status: 401 },
      );
    }

    // Validate the request body.
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    const parsed = createAdvisingNoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid advising note data.",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const { title, content, nextSteps, isPrivate, studentId } = parsed.data;

    // Retrieve the current user's role and advisor profile.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        advisor: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (user.role !== "ADVISOR" || !user.advisor) {
      return NextResponse.json(
        {
          message:
            "Only users with an assigned advisor profile can create advising notes.",
        },
        { status: 403 },
      );
    }

    // Resolve the supplied 8-digit student ID to the Student record.
    const student = await prisma.student.findUnique({
      where: { studentId },
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 },
      );
    }

    // Create the note using the authenticated advisor's database ID.
    const advisorNote = await prisma.advisorNote.create({
      data: {
        title,
        content,
        nextSteps: nextSteps ?? [],
        isPrivate,
        student: {
          connect: { id: student.id },
        },
        advisor: {
          connect: { id: user.advisor.id },
        },
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
          },
        },
        advisor: {
          select: {
            advisorId: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(
      
        advisorNote,
      
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create advising note:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
