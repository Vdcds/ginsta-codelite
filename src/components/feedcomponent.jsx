"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Star, Heart, Code, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CodeSnippetCard = ({ snippet }) => {
  const [showCode, setShowCode] = useState(true);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleUseCode = () => {
    router.push(`/code-editor?id=${snippet.id}`);
  };

  const imageUrl =
    snippet.images && snippet.images.length > 0
      ? snippet.images[0].url
      : "/placeholder.svg?height=400&width=600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto mb-8 overflow-hidden">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-2xl">{snippet.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            {showCode ? (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <pre className="p-4 overflow-x-auto bg-gray-100 rounded-md h-80">
                  <code
                    className={`language-${
                      snippet.language || "javascript"
                    } text-sm`}
                  >
                    {snippet.code}
                  </code>
                </pre>
              </motion.div>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageUrl}
                  alt={`Screenshot of ${snippet.title}`}
                  width={600}
                  height={400}
                  className="object-cover w-full rounded-md h-80"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-center mt-4 mb-2 space-x-2">
            <Button
              variant={showCode ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCode(true)}
              className="transition-all duration-300"
            >
              <Code className="w-4 h-4 mr-2" />
              Code
            </Button>
            <Button
              variant={!showCode ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCode(false)}
              className="transition-all duration-300"
            >
              <ImageIcon className="w-4 h-4 mb-2 mr-2" />
              Screenshot
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 bg-primary/5">
          <div className="flex space-x-4">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`transition-colors duration-300 ${
                  liked ? "text-red-500" : ""
                }`}
              >
                <Heart
                  className="w-4 h-4 mr-2"
                  fill={liked ? "currentColor" : "none"}
                />
                {snippet.likeCount + (liked ? 1 : 0)}
              </Button>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" onClick={handleUseCode}>
              <Code className="w-4 h-4 mr-2" />
              Use this code
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PostSnippetDialog = ({ onSnippetPosted }) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSnippet = {
      title,
      description,
      code,
      language,
      dependencies: [],
      images: [],
      userId: "9faa40f0-83aa-47b6-a44e-3888780439b2", // Replace with actual user ID if you have authentication
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
        onSnippetPosted(createdSnippet);
        setTitle("");
        setDescription("");
        setCode("");
        setLanguage("");
      } else {
        const errorData = await response.json();
        console.error("Failed to post snippet:", errorData.error);
      }
    } catch (error) {
      console.error("Error posting snippet:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Post Snippet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a New Snippet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Snippet Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Snippet Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Textarea
            placeholder="Paste your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Input
            placeholder="Programming Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <Button type="submit">Post Snippet</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const GinstaFeed = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("/api/snippets");
        if (response.ok) {
          const data = await response.json();
          setSnippets(data);
        } else {
          console.error("Failed to fetch snippets");
        }
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };

    fetchSnippets();
  }, []);

  const handleSnippetPosted = (newSnippet) => {
    setSnippets((prevSnippets) => [newSnippet, ...prevSnippets]);
  };

  return (
    <div className="container px-4 py-8 mx-auto bg-gradient-to-b from-background to-primary/5">
      <motion.h2
        className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trending Code Snippets
      </motion.h2>
      <div className="flex justify-end mb-8">
        <PostSnippetDialog onSnippetPosted={handleSnippetPosted} />
      </div>
      <div className="space-y-12">
        {snippets.map((snippet, index) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CodeSnippetCard snippet={snippet} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GinstaFeed;
