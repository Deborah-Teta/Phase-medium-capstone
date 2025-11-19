import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true, comments: true },
    });
    return NextResponse.json(post);
  } catch (err) {
    console.error("Get post API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const data = await req.json();
    const post = await prisma.post.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(post);
  } catch (err) {
    console.error("Update post API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: any) {
  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete post API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
