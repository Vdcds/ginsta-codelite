import { prisma } from "@/lib/prisma";

// Fetch all snippets or a specific snippet by ID
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const snippetId = searchParams.get("id");

  try {
    if (snippetId) {
      // Fetch single snippet by ID
      const snippet = await prisma.codeSnippet.findUnique({
        where: { id: parseInt(snippetId) }, // Ensure id is an integer
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
    }

    // Fetch all snippets
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

// Create a new snippet
export async function POST(request) {
  try {
    const { title, description, code, dependencies, images, userId } =
      await request.json();

    // Validation
    if (!title || !description || !code || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }
    console.log("Prisma Client:", prisma);
    console.log("userId:", userId);

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
    console.error("Error creating code snippet:", error); // Log the error
    return new Response(
      JSON.stringify({ error: "Failed to create code snippet" }),
      { status: 500 }
    );
  }
}
