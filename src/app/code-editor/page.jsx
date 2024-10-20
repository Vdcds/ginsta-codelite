// app/code-editor/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Loader2 } from "lucide-react";
import DynamicComponent from "@/components/DynamicComponent";

const CodeEditorPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const snippetId = searchParams.get("id");
  const [originalCode, setOriginalCode] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [snippetTitle, setSnippetTitle] = useState("");
  const [snippetDescription, setSnippetDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { completion, complete } = useCompletion({
    api: "/api/completion",
  });

  useEffect(() => {
    if (snippetId) {
      fetch(`/api/snippets?id=${snippetId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.code) {
            setOriginalCode(data.code);
            setUpdatedCode(data.code); // Initialize updatedCode with originalCode
            setSnippetTitle(data.title);
            setSnippetDescription(data.description);
            setLanguage(data.language);
          } else {
            console.error("Snippet not found");
          }
        })
        .catch((error) => console.error("Error fetching snippet:", error));
    }
  }, [snippetId]);

  useEffect(() => {
    if (completion) {
      console.log("AI Generated Code:", completion);
      const cleanedCode = extractCodeFromCompletion(completion);
      setUpdatedCode(cleanedCode);
    }
  }, [completion]);

  const handleUpdateCode = async () => {
    setIsLoading(true);
    await complete(
      `Please update the following code based on this instruction: "${prompt}". Ensure the updated code is a valid React functional component, including the function definition. Do not include any explanations or additional text.

Original code:
${originalCode}`
    );
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSaveUpdatedCode = async () => {
    setIsSaving(true);

    const newSnippet = {
      title: snippetTitle + " (Updated)",
      description: snippetDescription,
      code: updatedCode,
      language: language,
      dependencies: [],
      images: [],
      userId: "9faa40f0-83aa-47b6-a44e-3888780439b2",
    };

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSnippet),
      });

      if (response.ok) {
        const createdSnippet = await response.json();
        console.log("Updated code snippet saved:", createdSnippet);
        router.push(`/code-editor?id=${createdSnippet.id}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to save updated snippet:", errorData.error);
      }
    } catch (error) {
      console.error("Error saving updated snippet:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to clean AI-generated code
  function extractCodeFromCompletion(completion) {
    // Remove code fences if present
    const codeMatch = completion.match(/```(?:jsx|javascript)?\n([\s\S]*?)```/);
    if (codeMatch && codeMatch[1]) {
      return codeMatch[1].trim();
    }
    // If no code fences, return the completion as is
    return completion.trim();
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Code Editor</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Original Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>Original Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={originalCode}
              readOnly
              className="font-mono h-96"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => copyToClipboard(originalCode)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Original
            </Button>
          </CardFooter>
        </Card>
        {/* Updated Code Card */}
        <Card>
          <CardHeader>
            <CardTitle>Updated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="w-full">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <Textarea
                  value={updatedCode}
                  onChange={(e) => setUpdatedCode(e.target.value)}
                  className="font-mono h-96"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="p-4 overflow-auto border rounded h-96">
                  {updatedCode.trim() ? (
                    <DynamicComponent codeStr={updatedCode} />
                  ) : (
                    <p>No code to preview.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button onClick={() => copyToClipboard(updatedCode)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Updated
            </Button>
            <Button onClick={handleSaveUpdatedCode} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Updated Code"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* Prompt Input and Update Button */}
      <div className="mt-6">
        <Input
          type="text"
          placeholder="Enter your prompt to update the code..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleUpdateCode} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Code"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CodeEditorPage;
