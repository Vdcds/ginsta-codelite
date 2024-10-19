"use client"; // Ensure that the component runs on the client side
import Link from "next/link"; // Default import for next/link
import { Code, Star, GitBranch, Bot } from "lucide-react"; // Named imports from lucide-react
import { Button } from "@/components/ui/button"; // Correct import for Button component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Correct imports for Card components

const Home = () => {
  // Simulated authentication state
  const isUserAuthenticated = false;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <header className="container px-6 py-20 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-bold text-center md:text-7xl">
          <Code className="inline-block mr-4 text-primary" size={64} /> Ginsta
        </h1>
        <p className="mb-10 text-xl md:text-3xl">
          Share, Discover, and Evolve Code Snippets
        </p>
        <Button
          size="lg"
          className="px-8 py-3 text-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
        >
          <Link href="/feed">Explore Snippets</Link>
        </Button>
      </header>

      {/* Features Section */}
      <section className="container px-4 py-20 mx-auto">
        <h2 className="mb-16 text-4xl font-bold text-center">
          Ginsta Features
        </h2>
        <div className="grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-3">
          {/* Feature Card 1 */}
          <Card className="transition-all duration-300 transform shadow-lg hover:shadow-xl hover:-translate-y-2 rounded-xl">
            <CardHeader className="pb-6 bg-primary/10">
              <CardTitle className="flex items-center text-2xl">
                <Star className="mr-4 text-primary" size={32} />
                Rate Snippets
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-lg">
              Discover and rate the best code snippets from the community.
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="transition-all duration-300 transform shadow-lg hover:shadow-xl hover:-translate-y-2 rounded-xl">
            <CardHeader className="pb-6 bg-primary/10">
              <CardTitle className="flex items-center text-2xl">
                <GitBranch className="mr-4 text-primary" size={32} />
                Clone & Modify
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-lg">
              Easily clone snippets and adapt them to your needs.
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="transition-all duration-300 transform shadow-lg hover:shadow-xl hover:-translate-y-2 rounded-xl">
            <CardHeader className="pb-6 bg-primary/10">
              <CardTitle className="flex items-center text-2xl">
                <Bot className="mr-4 text-primary" size={32} />
                AI Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-lg">
              Get AI-powered suggestions to improve and optimize your code.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-center">
            How Ginsta Works
          </h2>
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-4">
            <div className="text-center">
              <Code className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="mb-2 text-xl font-semibold">Share Snippets</h3>
              <p>
                Post your best code snippets for the community to see and use.
              </p>
            </div>
            <div className="text-center">
              <Star className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="mb-2 text-xl font-semibold">Rate & Comment</h3>
              <p>
                Engage with other developers by rating and discussing snippets.
              </p>
            </div>
            <div className="text-center">
              <GitBranch className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="mb-2 text-xl font-semibold">Clone & Modify</h3>
              <p>
                Take inspiration from others and adapt code to your projects.
              </p>
            </div>
            <div className="text-center">
              <Bot className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="mb-2 text-xl font-semibold">AI Enhance</h3>
              <p>Use AI to get suggestions and improvements for your code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-center">
            Trending Snippets
          </h2>
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="transition-all duration-300 shadow-lg bg-card hover:shadow-xl"
              >
                <CardHeader className="pb-4 bg-primary/10">
                  <CardTitle className="flex items-center justify-between text-xl">
                    <span>Awesome Function {i}</span>
                    <Star className="text-yellow-400" size={24} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <pre className="p-4 overflow-x-auto rounded-md bg-muted">
                    <code className="text-sm">
                      {`function awesome${i}() {
  // Some cool code here
  return "Amazing!";
}`}
                    </code>
                  </pre>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      by @coder{i}
                    </span>
                    <div className="flex items-center">
                      <Star className="mr-1 text-yellow-400" size={16} />
                      <span>{4 + i}.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Star className="mr-2" size={20} />
              View More Trending Snippets
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Share Your Code? 🚀
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl">
            Join Ginsta today and become part of a thriving community of
            developers sharing, rating, and evolving code snippets together.
          </p>
          <Button
            size="lg"
            className="px-8 py-3 text-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background text-foreground">
        <div className="container px-4 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Ginsta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
