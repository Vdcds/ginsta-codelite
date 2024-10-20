"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Heart,
  Code,
  Image as ImageIcon,
  Share2,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dummy JS array for screenshots
const dummyScreenshots = ["/ss2.png", "/ss1.png"];

// SupportDevDialog Component
const SupportDevDialog = ({ author }) => {
  const [isOpen, setIsOpen] = useState(false);
  const amounts = [40, 60, 80];

  const handleSupport = (amount) => {
    alert(`Thank you for supporting ${author} with $${amount}!`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <DollarSign className="w-4 h-4 mr-2" />
          Support Dev
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Support the Developer</DialogTitle>
          <DialogDescription>
            Choose an amount to support {author}:
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around mt-4">
          {amounts.map((amount) => (
            <Button key={amount} onClick={() => handleSupport(amount)}>
              ${amount}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// CodeSnippetCard Component
const CodeSnippetCard = ({ snippet, onRepost }) => {
  const [showCode, setShowCode] = useState(true);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleUseCode = () => {
    router.push(`/code-editor?id=${snippet.id}`);
  };

  const handleRepost = async () => {
    try {
      const response = await fetch(`/api/snippets/${snippet.id}/repost`, {
        method: "POST",
      });
      if (response.ok) {
        onRepost(snippet.id);
        toast({
          title: "Snippet reposted",
          description: "The snippet has been reposted to your profile.",
        });
      } else {
        throw new Error("Failed to repost snippet");
      }
    } catch (error) {
      console.error("Error reposting snippet:", error);
      toast({
        title: "Repost failed",
        description:
          "There was an error reposting the snippet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const imageUrl = dummyScreenshots[snippet.id % dummyScreenshots.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto mb-8 overflow-hidden transition-shadow duration-300 shadow-lg hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>
                  {snippet.author ? snippet.author[0].toUpperCase() : "A"}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                @{snippet.author || "anonymous"}
              </span>
            </div>
            <SupportDevDialog author={snippet.author || "anonymous"} />
          </div>
          <CardTitle className="text-2xl font-bold">{snippet.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{snippet.description}</p>
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
              <ImageIcon className="w-4 h-4 mr-2" />
              Screenshot
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10">
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
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRepost}
                className="transition-colors duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Repost
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

// PostSnippetDialog Component
const PostSnippetDialog = ({ onSnippetPosted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSnippet = {
      title,
      description,
      code,
      language,
      author: author || "anonymous",
      userId: "9faa40f0-83aa-47b6-a44e-3888780439b2", // Fixed userID
      dependencies: [],
      images: [],
      likeCount: 0,
      repostCount: 0,
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
        setAuthor("");
        setIsOpen(false);
        toast({
          title: "Snippet posted",
          description: "Your new snippet has been successfully posted.",
        });
      } else {
        throw new Error("Failed to post snippet");
      }
    } catch (error) {
      console.error("Error posting snippet:", error);
      toast({
        title: "Post failed",
        description:
          "There was an error posting your snippet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Post Snippet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a New Snippet</DialogTitle>
          <DialogDescription>
            Share your code snippet with the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Textarea
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <Input
              placeholder="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
            <Input
              placeholder="Author (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// GinstaFeed Component
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
          throw new Error("Failed to fetch snippets");
        }
      } catch (error) {
        console.error("Error fetching snippets:", error);
        toast({
          title: "Error",
          description: "Failed to load snippets. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchSnippets();
  }, []);

  const handleSnippetPosted = (newSnippet) => {
    setSnippets((prevSnippets) => [newSnippet, ...prevSnippets]);
  };

  const handleRepost = (snippetId) => {
    setSnippets((prevSnippets) =>
      prevSnippets.map((snippet) =>
        snippet.id === snippetId
          ? { ...snippet, repostCount: (snippet.repostCount || 0) + 1 }
          : snippet
      )
    );
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
            <CodeSnippetCard snippet={snippet} onRepost={handleRepost} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GinstaFeed;
