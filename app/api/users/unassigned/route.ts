//ROUTE: /api/users/unassigned
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        image: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch unassigned users:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}