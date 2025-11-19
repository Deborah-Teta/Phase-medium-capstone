import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, authorId, content } = await req.json();

    const comment = await prisma.comment.create({
      data: { postId, authorId, content },
    });

    return NextResponse.json(comment);
  } catch (err) {
    console.error("Create comment API failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       include: {
//         author: {
//           select: { id: true, author: true, avatarUrl: true },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json({ posts });
//   } catch (error) {
//     return NextResponse.json({ error: "Server Error" }, { status: 500 });
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, username: true, avatarUrl: true },
        },
        comments: true,
      },
    });

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json({ post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}