"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/", // Redirect to home page after sign out
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center w-full text-sm text-gray-600 hover:text-gray-900"
    >
      Log Out
    </button>
  );
}
