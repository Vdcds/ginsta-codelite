"use client";
import { useCompletion } from "ai/react";

export default function Page() {
  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div>
      <div
        onClick={async () => {
          await complete("Generate react code for a red button");
        }}
      >
        Generate
      </div>

      {completion}
    </div>
  );
}
