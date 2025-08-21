"use client";
import React, { useState } from "react";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from "next-auth/react";
import UserMenu from "./user-menu";
import { signOut } from "next-auth/react";
import { User, Crown } from "lucide-react";

const items = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <ResizableNavbar className="fixed inset-x-0 top-0 z-50">
      {/* Do NOT pass `visible` manually; parent injects it */}
      <NavBody className="px-4">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-medium text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white text-black">A</span>
            <span className="hidden xsm:inline">Acme</span>
          </Link>
          <NavItems items={items} />
          <div className="hidden items-center gap-2 lg:flex">
            {isLoading ? (
              // Loading state
              <div className="flex items-center gap-2">
                <div className="w-20 h-9 bg-muted animate-pulse rounded-lg"></div>
                <div className="w-20 h-9 bg-muted animate-pulse rounded-lg"></div>
              </div>
            ) : session?.user ? (
              // Authenticated user - show user menu
              <UserMenu />
            ) : (
              // Unauthenticated user - show login/register buttons
              <>
                <NavbarButton href="/login" variant="secondary">Login</NavbarButton>
                <NavbarButton href="/register" variant="primary">Sign up</NavbarButton>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </NavBody>

      <MobileNav visible className="px-4">
        <MobileNavHeader>
          <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-medium text-black dark:text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black">A</span>
            <span className="">Acme</span>
          </Link>
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen((p) => !p)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex w-full flex-col gap-2">
            {items.map((item) => (
              <a key={item.link} href={item.link} className="px-2 py-2 text-black dark:text-white" onClick={() => setIsOpen(false)}>
                {item.name}
              </a>
            ))}
            
            {/* Mobile authentication section */}
            <div className="mt-2">
              {isLoading ? (
                // Loading state for mobile
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-muted animate-pulse rounded-lg"></div>
                  <div className="flex-1 h-10 bg-muted animate-pulse rounded-lg"></div>
                </div>
              ) : session?.user ? (
                // Authenticated user mobile view
                <div className="space-y-2">
                  <div className="px-2 py-2 border-t border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {session.user.image ? (
                          <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${session.user.image})` }}></div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        {session.user.isAdmin && (
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1">
                            <Crown className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {session.user.name || session.user.username}
                        </p>
                        {session.user.isAdmin && (
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">Admin</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <NavbarButton href="/profile" variant="secondary" className="flex-1 text-black" onClick={() => setIsOpen(false)}>
                      Profile
                    </NavbarButton>
                    <button
                      onClick={async () => {
                        await signOut({ callbackUrl: "/" });
                        setIsOpen(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                // Unauthenticated user mobile view
                <div className="flex gap-2">
                  <NavbarButton href="/login" variant="secondary" className="flex-1 text-black" onClick={() => setIsOpen(false)}>Login</NavbarButton>
                  <NavbarButton href="/register" variant="primary" className="flex-1" onClick={() => setIsOpen(false)}>Sign up</NavbarButton>
                </div>
              )}
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}

export default Navbar
