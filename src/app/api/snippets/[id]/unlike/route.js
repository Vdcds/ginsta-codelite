// app/api/snippets/[id]/dislike/route.js
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
export async function POST(req, { params }) {
  const session = await auth();

  if (!session) {
    return new Response(
      JSON.stringify({ error: "You must be logged in to dislike a snippet" }),
      {
        status: 401,
      }
    );
  }

  const userId = session.user.id;
  const snippetId = parseInt(params.id, 10);

  try {
    // Check if the user has liked the snippet
    const snippet = await prisma.codeSnippet.findUnique({
      where: { id: snippetId },
      include: { likedBy: { where: { id: userId } } },
    });

    if (snippet?.likedBy.length === 0) {
      return new Response(
        JSON.stringify({ error: "You have not liked this snippet yet" }),
        {
          status: 400,
        }
      );
    }

    // Decrement like count and remove like relation
    await prisma.codeSnippet.update({
      where: { id: snippetId },
      data: {
        likedBy: { disconnect: { id: userId } },
        likeCount: { decrement: 1 },
      },
    });

    return new Response(
      JSON.stringify({ message: "Snippet disliked successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "An error occurred while disliking the snippet",
      }),
      {
        status: 500,
      }
    );
  }
}
