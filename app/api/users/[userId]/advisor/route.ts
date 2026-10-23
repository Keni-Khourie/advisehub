//ROUTE : /api/users/[userId]/advisor


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {createAdvisorSchema} from "@/validators/api/advisorApiValidators"

type RouteContext = {
  params: Promise<{ userId: string }>;
};

export async function POST(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { userId} = await params;
    const parsedUserId = Number(userId);

    if (!Number.isSafeInteger(parsedUserId) || parsedUserId <= 0) {
      return NextResponse.json(
        { message: "A valid user ID is required." },
        { status: 400 },
      );
    }

    const body: unknown = await req.json();
    const parsed = createAdvisorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid advisor data.",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      advisorId,
      title,
      office,
      yearsOfExperience,
      specialization,
    } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        advisor: {
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

    if (user.role !== "ADVISOR") {
      return NextResponse.json(
        {
          message: "The user's role must be ADVISOR to create an advisor profile.",
        },
        { status: 403 },
      );
    }

    if (user.advisor) {
      return NextResponse.json(
        { message: "This user already has an advisor profile." },
        { status: 409 },
      );
    }

    const existingSpecialization =
      await prisma.advisorSpecialization.findUnique({
        where: { name: specialization },
        select: { id: true },
      });

    if (!existingSpecialization) {
      return NextResponse.json(
        { message: "The specified advisor specialization does not exist." },
        { status: 404 },
      );
    }

    const advisor = await prisma.advisor.create({
      data: {
        advisorId,
        firstName: user.firstName,
        lastName: user.lastName,
        title: title?.trim() || null,
        office,
        yearsOfExperience,
        user: {
          connect: { id: user.id },
        },
        specialization: {
          connect: { id: existingSpecialization.id },
        },
      },
      select: {
        id: true,
        advisorId: true,
        firstName: true,
        lastName: true,
        title: true,
        office: true,
        yearsOfExperience: true,
        createdAt: true,
        specialization: {
          select: {
            id: true,
            name: true,
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
      
        advisor,
      
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
          message: "An advisor with this advisor ID or user already exists.",
        },
        { status: 409 },
      );
    }

    console.error("Failed to create advisor profile:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}
