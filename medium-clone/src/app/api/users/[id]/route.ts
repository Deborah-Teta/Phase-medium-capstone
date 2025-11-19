import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing authorization token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // Optional: restrict access to only the owner
    // if (decoded.id !== params.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: { posts: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Profile API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
