//ROUTE: /api/ably/token
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import * as Ably from "ably";

const ably = new Ably.Rest(process.env.ABLY_API_KEY!);

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const userId = Number(session.user.id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return NextResponse.json(
        { message: "Invalid user." },
        { status: 401 }
      );
    }

    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: String(userId),
      capability: JSON.stringify({
        [`user:${userId}`]: ["subscribe"],
      }),
    });

    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error("Ably token error:", error);

    return NextResponse.json(
      { message: "Unable to authenticate real-time connection." },
      { status: 500 }
    );
  }
}