"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function SignIn() {
  return (
    <Button
      onClick={() => signIn()}
      className="transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  );
}
