// ROUTE: api/degree/create

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {createDegreeSchema} from "@/validators/api/degreeApiValidators"


export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = createDegreeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid degree data.",
          errors: parsed.error.issues,
        },
        { status: 400 },
      );
    }

    const {
      degreeName,
      code,
      requiredCredits,
      degreeClassificationId,
    } = parsed.data;

    // Ensure the referenced classification exists.
    const classification = await prisma.degreeClassification.findUnique({
      where: { id: degreeClassificationId },
      select: { id: true, name: true, abbreviation: true },
    });

    if (!classification) {
      return NextResponse.json(
        {
          message: "The specified degree classification does not exist.",
        },
        { status: 404 },
      );
    }

    // Create the degree and associate it with its classification.
    const degree = await prisma.degree.create({
      data: {
        degreeName,
        code,
        requiredCredits,
        degreeClassification: {
          connect: { id: degreeClassificationId },
        },
      },
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
      },
    });
   
    return NextResponse.json(
      
        degree,
      
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
          message: "A degree with this code already exists.",
        },
        { status: 409 },
      );
    }

    console.error("Failed to create degree:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
