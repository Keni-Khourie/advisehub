
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  console.log("GET ME TRIGGERED");
  const session = await auth();
  console.log("Session exists:", Boolean(session));
console.log("Session user:", session?.user);
console.log("Session user ID:", session?.user?.id);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthenticated" },
      { status: 401 },
    );
  }

  const id = Number(session.user.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { message: "Invalid session" },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      image: true,
      student: {
        select: {
          id: true,
          studentId: true,
          enrollmentDate: true,
          expectedGraduationDate: true,
          completedCredits: true,
          degree: {
            select: {
              id: true,
              degreeName: true,
              code: true,
              degreeClassification: true,
              requiredCredits: true,
            },
          },
        },
      },
      advisor: {
        select: {
          id: true,
          advisorId: true,
          title: true,
          office: true,
          yearsOfExperience: true,
          specialization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      admin: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User account not found" },
      { status: 401 },
    );
  }

  return NextResponse.json(user);
}
