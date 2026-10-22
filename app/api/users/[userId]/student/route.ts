//ROUTE: /api/users/[userId]/student

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {createStudentSchema} from "@/validators/api/studentApiValidators"

type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function POST(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { userId } = await params;
    const parsedUserId = Number(userId);

    if (!Number.isSafeInteger(parsedUserId) || parsedUserId <= 0) {
      return NextResponse.json(
        { message: "A valid user ID is required." },
        { status: 400 },
      );
    }

    const body: unknown = await req.json();
    const parsed = createStudentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid student data.",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      studentId,
      degreeId,
      enrollmentDate,
      expectedGraduationDate,
      completedCredits,
    } = parsed.data;

    const enrollment = new Date(enrollmentDate);
    const graduation = new Date(expectedGraduationDate);

    if (graduation <= enrollment) {
      return NextResponse.json(
        {
          message: "Expected graduation date must be after the enrollment date.",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        student: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 },
      );
    }

    if (user.role !== "STUDENT") {
      return NextResponse.json(
        { message: "The user's role must be STUDENT to create a student profile." },
        { status: 403 },
      );
    }

    if (user.student) {
      return NextResponse.json(
        { message: "This user already has a student profile." },
        { status: 409 },
      );
    }

    const degree = await prisma.degree.findUnique({
      where: { id: degreeId },
      select: { id: true },
    });

    if (!degree) {
      return NextResponse.json(
        { message: "The specified degree does not exist." },
        { status: 404 },
      );
    }

    const student = await prisma.student.create({
      data: {
        studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        enrollmentDate: enrollment,
        expectedGraduationDate: graduation,
        completedCredits,
        user: {
          connect: { id: user.id },
        },
        degree: {
          connect: { id: degreeId },
        },
      },
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        enrollmentDate: true,
        expectedGraduationDate: true,
        completedCredits: true,
        createdAt: true,
        degree: {
          select: {
            id: true,
            degreeName: true,
            code: true,
            requiredCredits: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(
     
        student,
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "A student with this student ID or user already exists.",
        },
        { status: 409 },
      );
    }

    console.error("Failed to create student profile:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
