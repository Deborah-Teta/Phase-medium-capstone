import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(posts);
  } catch (err: unknown) {
    console.error("Posts API failed:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    // Check for common Prisma connection errors
    if (errorMessage.includes("Can't reach database server") || 
        errorMessage.includes("P1001") ||
        errorMessage.includes("SSL") ||
        errorMessage.includes("connection")) {
      return NextResponse.json({ 
        error: "Database connection failed. Please check your DATABASE_URL and ensure it includes ?sslmode=require for Supabase." 
      }, { status: 500 });
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, tags, authorId } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags,
        authorId,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("Create post API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
