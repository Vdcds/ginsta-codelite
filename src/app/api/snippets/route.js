// app/api/snippets/route.js
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const snippets = await prisma.codeSnippet.findMany({
      include: {
        user: true,
        dependencies: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch code snippets" }),
      { status: 500 }
    );
  }
}
