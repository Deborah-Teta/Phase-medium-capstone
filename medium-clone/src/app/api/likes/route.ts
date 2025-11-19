import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    const like = await prisma.like.create({
      data: { postId, userId },
    });

    return NextResponse.json(like);
  } catch (err) {
    console.error("Create like API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
