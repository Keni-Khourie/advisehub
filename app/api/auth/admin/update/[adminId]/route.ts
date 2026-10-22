
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ adminId: string }>;
}

export async function POST(
  _req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { adminId: idParam } = await params;
    const userId = Number(idParam);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid user ID." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        admin: {
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

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message:
            "The user's role must already be ADMIN.",
        },
        { status: 409 },
      );
    }

    if (user.admin) {
      return NextResponse.json(
        {
          message: "The user already has an Admin record.",
          user,
        },
        { status: 200 },
      );
    }

    const admin = await prisma.admin.create({
      data: {
        user: {
          connect: { id: userId },
        },
      },
      select: {
        id: true,
        userId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "Admin record created successfully.",
        userId,
        admin,
      },
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
        { message: "An Admin record already exists for this user." },
        { status: 409 },
      );
    }

    console.error("Failed to create Admin record:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
