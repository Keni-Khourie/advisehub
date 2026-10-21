import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){
    const json = await req.json()
}