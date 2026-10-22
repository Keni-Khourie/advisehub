//ROUTE: /api/users/[userId]

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { assignUserRoleSchema } from "@/validators/api/userApiValidators";




type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const {userId } = await params;
    const parsedUserId = Number(userId);

    if (!Number.isSafeInteger(parsedUserId) || parsedUserId <= 0) {
      return NextResponse.json(
        { message: "A valid user ID is required." },
        { status: 400 },
      );
    }

    const body: unknown = await req.json();
    const parsed = assignUserRoleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid role.",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: parsedUserId },
      data: {
        role: parsed.data.role,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      updatedUser,
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to assign user role:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}





export async function GET(
  _req: NextRequest,
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

    const user = await prisma.user.findUnique({
      where: {
        id: parsedUserId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        student: {
          select: {
            id: true,
            studentId: true,
            enrollmentDate: true,
            expectedGraduationDate: true,
            completedCredits: true,
            degree: {
              select: {
                id: true,
                degreeName: true,
                code: true,
                requiredCredits: true,
                degreeClassification: {
                  select: {
                    id: true,
                    name: true,
                    abbreviation: true,
                  },
                },
              },
            },
          },
        },
        advisor: {
          select: {
            id: true,
            advisorId: true,
            title: true,
            office: true,
            yearsOfExperience: true,
            specialization: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        admin: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
