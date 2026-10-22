//ROUTE: /api/degree/degree-classification

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const degreeClassifications =
      await prisma.degreeClassification.findMany({
        select: {
          id: true,
          name: true,
          abbreviation: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json(degreeClassifications, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch degree classifications:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}