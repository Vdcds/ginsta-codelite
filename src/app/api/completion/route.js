import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const context = await req.json();
  console.log(context);

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    prompt: `Generate React code according to the given prompt. Just the code, nothing extra and make all buttons and backgrounds of small components bg-black only. ${context.prompt}`,
  });

  return result.toDataStreamResponse();
}
