//ROUTE: /api/advisor/specialization
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const specializations =
      await prisma.advisorSpecialization.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json(specializations, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch advisor specializations:", error);

    return NextResponse.json(
      { message: "An unexpected server error occurred." },
      { status: 500 },
    );
  }
}