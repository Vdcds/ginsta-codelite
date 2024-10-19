// app/api/snippets/[id]/like/route.js

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export async function POST(req, { params }) {
  const session = await auth();
  if (!session) {
    return new Response(
      JSON.stringify({ error: "You must be logged in to like a snippet" }),
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;
  const snippetId = parseInt(params.id, 10);

  try {
    // Check if the user already liked the snippet
    const snippet = await prisma.codeSnippet.findUnique({
      where: { id: snippetId },
      include: { likedBy: { where: { id: userId } } },
    });

    if (snippet?.likedBy.length > 0) {
      return new Response(
        JSON.stringify({ error: "You have already liked this snippet" }),
        {
          status: 400,
        }
      );
    }

    // Increment like count and add like relation
    await prisma.codeSnippet.update({
      where: { id: snippetId },
      data: {
        likedBy: { connect: { id: userId } },
        likeCount: { increment: 1 },
      },
    });

    return new Response(
      JSON.stringify({ message: "Snippet liked successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while liking the snippet" }),
      {
        status: 500,
      }
    );
  }
}
