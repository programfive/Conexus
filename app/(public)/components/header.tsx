'use client';

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { H3 } from "@/components/ui/typography";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="px-6 lg:px-8 h-16 flex items-center justify-center fixed w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <Link className="flex items-center justify-center" href="#">
        <div className="flex items-center gap-2">
          <Icons.logo className="w-7 h-7"/>
          <H3>Conexus</H3>
        </div>
      </Link>
      <nav className="ml-auto flex gap-6">
        <Link className="font-medium hover:text-primary transition-colors" href="#features">
          Features
        </Link>
        <Link className="font-medium hover:text-primary transition-colors" href="#testimonials">
          Testimonials
        </Link>
        <Link className="font-medium hover:text-primary transition-colors" href="#pricing">
          Pricing
        </Link>
      </nav>
      <div className="ml-6 flex items-center gap-2">
        {!isSignedIn ? (
          <>
            <SignInButton>
              <Button variant="ghost">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button>
                Get Started
              </Button>
            </SignUpButton>
          </>
        ) : (
          <Button  asChild>
            <Link href="/users">
              Get Started
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}