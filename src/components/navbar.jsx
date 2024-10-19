"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  User,
  LogOut,
  Bookmark,
  Home,
  Code,
  LayoutDashboard,
  Info,
} from "lucide-react";
import { SignIn } from "./auth/signin";

const NavComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const isAuthenticated = false; // Simulate authentication status
  const user = null; // No user data for now

  return (
    <nav className="shadow-md bg-background text-foreground">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/ginsta-logo.png"
                alt="Ginsta Logo"
                width={40}
                height={40}
                className="mr-2 bg-transparent rounded-full"
              />
              <span className="ml-2 text-xl font-bold">Ginsta</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink href="/" icon={<Home size={18} />}>
              Home
            </NavLink>
            <NavLink href="/feed" icon={<Code size={18} />}>
              Feed
            </NavLink>
            <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />}>
              Dashboard
            </NavLink>
            <NavLink href="/about" icon={<Info size={18} />}>
              About Us
            </NavLink>
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label="User menu"
                >
                  <Image
                    src={user?.picture || "/default-avatar.png"}
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 z-10 w-48 py-1 mt-2 border rounded-md shadow-lg bg-background border-border">
                    <ProfileMenuItem
                      onClick={toggleProfileMenu}
                      icon={<User size={18} />}
                    >
                      Profile
                    </ProfileMenuItem>
                    <ProfileMenuItem
                      onClick={toggleProfileMenu}
                      icon={<Bookmark size={18} />}
                    >
                      Saved Snippets
                    </ProfileMenuItem>
                    <ProfileMenuItem icon={<LogOut size={18} />}>
                      Log Out
                    </ProfileMenuItem>
                  </div>
                )}
              </div>
            ) : (
              <SignIn></SignIn>
            )}
          </div>
          <div className="flex items-center md:hidden">
            {isAuthenticated ? (
              <div className="mr-2">
                <Image
                  src={user?.picture || "/default-avatar.png"}
                  width={32}
                  height={32}
                  alt="User"
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="mr-2">
                <User size={32} />
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" icon={<Home size={18} />}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/feed" icon={<Code size={18} />}>
              Feed
            </MobileNavLink>
            <MobileNavLink
              href="/dashboard"
              icon={<LayoutDashboard size={18} />}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="/about" icon={<Info size={18} />}>
              About Us
            </MobileNavLink>
            {!isAuthenticated && <SignIn></SignIn>}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, icon }) => (
  <Link
    href={href}
    className="flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-primary hover:text-primary-foreground"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const MobileNavLink = ({ href, children, icon }) => (
  <Link
    href={href}
    className="flex items-center px-3 py-2 text-base font-medium transition-colors rounded-md hover:bg-primary hover:text-primary-foreground"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

const ProfileMenuItem = ({ onClick, children, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors hover:bg-primary hover:text-primary-foreground"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </button>
);

export default NavComponent;
