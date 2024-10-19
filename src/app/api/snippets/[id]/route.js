// app/api/snippets/[id]/route.js
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const snippetId = parseInt(params.id, 10);

  try {
    const snippet = await prisma.codeSnippet.findUnique({
      where: { id: snippetId },
      include: {
        user: true,
        dependencies: true,
        images: true,
      },
    });

    if (!snippet) {
      return new Response(JSON.stringify({ error: "Snippet not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(snippet), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch the snippet" }),
      { status: 500 }
    );
  }
}
