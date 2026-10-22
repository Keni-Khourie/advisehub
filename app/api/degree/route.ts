//ROUTE: /api/degree

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const degrees = await prisma.degree.findMany({
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
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        degreeName: "asc",
      },
    });

    return NextResponse.json(degrees, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch degrees:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}