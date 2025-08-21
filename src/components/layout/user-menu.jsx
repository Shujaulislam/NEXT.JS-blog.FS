"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { User, LogOut, Settings, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session?.user) return null;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-200 group"
      >
        <div className="relative">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || session.user.username}
              width={32}
              height={32}
              className="rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-200"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-200">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
          {session.user.isAdmin && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1 shadow-lg">
              <Crown className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {session.user.name || session.user.username}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || session.user.username}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center border-2 border-primary/20">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  {session.user.isAdmin && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1.5 shadow-lg">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {session.user.name || session.user.username}
                  </p>
                  <p className="text-foreground/60 text-xs truncate">
                    {session.user.email}
                  </p>
                  {session.user.isAdmin && (
                    <span className="inline-block mt-1 text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                Profile Settings
              </Link>
              
              {session.user.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
                >
                  <Crown className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
