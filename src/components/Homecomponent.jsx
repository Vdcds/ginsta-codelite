"use client";

import Link from "next/link";
import { Code, Star, GitBranch, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="transition-all duration-300 transform shadow-lg hover:shadow-xl hover:-translate-y-2 rounded-xl">
    <CardHeader className="pb-6 bg-primary/10">
      <CardTitle className="flex items-center text-2xl">
        <Icon className="mr-4 text-primary" size={32} aria-hidden="true" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6 text-lg">{description}</CardContent>
  </Card>
);

const features = [
  {
    icon: Star,
    title: "Rate Snippets",
    description: "Discover and rate the best code snippets from the community.",
  },
  {
    icon: GitBranch,
    title: "Clone & Modify",
    description: "Easily clone snippets and adapt them to your needs.",
  },
  {
    icon: Bot,
    title: "AI Assistance",
    description:
      "Get AI-powered suggestions to improve and optimize your code.",
  },
];

const steps = [
  {
    icon: Code,
    title: "Share Snippets",
    description:
      "Post your best code snippets for the community to see and use.",
  },
  {
    icon: Star,
    title: "Rate & Comment",
    description:
      "Engage with other developers by rating and discussing snippets.",
  },
  {
    icon: GitBranch,
    title: "Clone & Modify",
    description:
      "Take inspiration from others and adapt code to your projects.",
  },
  {
    icon: Bot,
    title: "AI Enhance",
    description: "Use AI to get suggestions and improvements for your code.",
  },
];

const trendingSnippets = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: `Awesome Function ${i + 1}`,
  code: `function awesome${
    i + 1
  }() {\n  // Some cool code here\n  return "Amazing!";\n}`,
  author: `@coder${i + 1}`,
  rating: 4 + i + 0.9,
}));

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        className="container px-6 py-20 mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-5xl font-bold text-center md:text-7xl">
          <Code
            className="inline-block mr-2 text-primary"
            size={64}
            aria-hidden="true"
          />
          Ginsta
        </h1>
        <p className="mb-10 text-xl md:text-3xl">
          Share, Discover, and Evolve Code Snippets
        </p>
        <Link href="/feed" className="inline-block">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
            >
              Explore Snippets
            </Button>
          </motion.div>
        </Link>
      </motion.header>

      <section
        className="container px-4 py-20 mx-auto"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="mb-16 text-4xl font-bold text-center"
        >
          Ginsta Features
        </h2>
        <motion.div
          className="grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-3"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={animations.item}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section
        className="py-20 bg-primary/5"
        aria-labelledby="how-it-works-heading"
      >
        <div className="container px-4 mx-auto">
          <h2
            id="how-it-works-heading"
            className="mb-12 text-4xl font-bold text-center"
          >
            How Ginsta Works
          </h2>
          <motion.div
            className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-4"
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={animations.item}
              >
                <step.icon
                  className="mx-auto mb-4 text-primary"
                  size={48}
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="trending-heading">
        <div className="container px-4 mx-auto">
          <h2
            id="trending-heading"
            className="mb-12 text-4xl font-bold text-center"
          >
            Trending Snippets
          </h2>
          <motion.div
            className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3"
            variants={animations.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trendingSnippets.map((snippet) => (
              <motion.div key={snippet.id} variants={animations.item}>
                <Card className="transition-all duration-300 shadow-lg bg-card hover:shadow-xl">
                  <CardHeader className="pb-4 bg-primary/10">
                    <CardTitle className="flex items-center justify-between text-xl">
                      <span>{snippet.title}</span>
                      <Star
                        className="text-yellow-400"
                        size={24}
                        aria-hidden="true"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <pre className="p-4 overflow-x-auto rounded-md bg-muted">
                      <code className="text-sm">{snippet.code}</code>
                    </pre>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">
                        by {snippet.author}
                      </span>
                      <div className="flex items-center">
                        <Star
                          className="mr-1 text-yellow-400"
                          size={16}
                          aria-hidden="true"
                        />
                        <span>{snippet.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10 text-center">
            <Link href="/feed">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Star className="mr-2" size={20} aria-hidden="true" />
                  View More Trending Snippets
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary/5" aria-labelledby="cta-heading">
        <motion.div
          className="container px-4 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 id="cta-heading" className="mb-6 text-4xl font-bold">
            Ready to Share Your Code? 🚀
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl">
            Join Ginsta today and become part of a thriving community of
            developers sharing, rating, and evolving code snippets together.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
              onClick={() => signIn()}
            >
              Sign Up Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <footer className="py-8 bg-background text-foreground">
        <div className="container px-4 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Ginsta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
