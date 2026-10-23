"use server";
import { NextResponse } from "next/server";
import { signOut, auth } from "@/auth";
export async function authenticateUser(){
  const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }
}


export async function signOutUser() {
  await signOut({
    redirectTo: "/",
  });
}