import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request) {
  const body = await req.json();
  const { id, bio, avatar, name } = body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        avatar,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
