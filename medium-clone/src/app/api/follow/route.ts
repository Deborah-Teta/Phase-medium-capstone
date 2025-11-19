import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { followerId, followingId } = await req.json();

    const follow = await prisma.follow.create({
      data: { followerId, followingId },
    });

    return NextResponse.json(follow);
  } catch (err) {
    console.error("Create follow API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
