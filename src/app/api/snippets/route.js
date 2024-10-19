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
// app/api/snippets/route.js
export async function POST(request) {
  try {
    const { title, description, code, dependencies, images, userId } =
      await request.json();

    // Validation (optional but recommended)
    if (!title || !description || !code || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create new code snippet
    const newSnippet = await prisma.codeSnippet.create({
      data: {
        title,
        description,
        code,
        user: { connect: { id: userId } },
        dependencies: {
          create: dependencies?.map((dep) => ({
            name: dep.name,
            version: dep.version,
          })),
        },
        images: {
          create: images?.map((img) => ({
            url: img.url,
            description: img.description,
          })),
        },
      },
      include: {
        user: true,
        dependencies: true,
        images: true,
      },
    });

    return new Response(JSON.stringify(newSnippet), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create code snippet" }),
      { status: 500 }
    );
  }
}
