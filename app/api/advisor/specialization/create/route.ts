//ROUTE: api/advisor/specialization/create
//This is to create an advisor specialization
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {createAdvisorSpecializationSchema} from "@/validators/api/advisorValidators"
//import {AdvisorSpecialization} from "@/types/types"


export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();

    const parsed = createAdvisorSpecializationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid advisor specialization.",
          errors: parsed.error.issues,
          allowedValues: [
            "Academic Planning",
            "Course Registration",
            "Degree Requirements",
            "Transfer Credits",
            "General Advising",
          ],
        },
        { status: 400 },
      );
    }

    const specialization = await prisma.advisorSpecialization.create({
      data: {
        name: parsed.data.name,
      },
    });

    return NextResponse.json(
      {
        message: "Advisor specialization created successfully.",
        specialization,
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
        { message: "This advisor specialization already exists." },
        { status: 409 },
      );
    }

    console.error("Failed to create advisor specialization:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
