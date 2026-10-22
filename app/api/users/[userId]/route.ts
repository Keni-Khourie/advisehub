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
