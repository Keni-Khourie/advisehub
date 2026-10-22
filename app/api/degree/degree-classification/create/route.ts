//ROUTE: api/degree/degree-classification/create
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validDegreeClassifications } from "@/constants";
import { createDegreeClassificationSchema } from "@/validators/api/degreeApiValidators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createDegreeClassificationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid degree classification.",
          errors: parsed.error.issues,
          allowedClassifications: validDegreeClassifications,
        },
        { status: 400 },
      );
    }

    const { name, abbreviation } = parsed.data;

    const classification = await prisma.degreeClassification.create({
      data: {
        name,
        abbreviation,
      },
    });

    return NextResponse.json(
      {
        message: "Degree classification created successfully.",
        classification,
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
        {
          message:
            "A degree classification with this name or abbreviation already exists.",
        },
        { status: 409 },
      );
    }

    console.error("Failed to create degree classification:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
