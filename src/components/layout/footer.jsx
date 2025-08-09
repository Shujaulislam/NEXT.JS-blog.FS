"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React from "react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-background text-foreground/80">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-12"
      >
        {/* Brand + short description */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="inline-flex items-center space-x-3"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-foreground text-background text-sm font-bold">A</span>
            <span className="text-lg font-semibold text-foreground">Acme</span>
          </Link>
          <p className="max-w-xl text-sm text-foreground/70">
            A modern Next.js blog with authentication, admin tools, and server actions. Built for speed, accessibility, and great DX.
          </p>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="mt-10">
          <div className="grid grid-cols-2 gap-8 xsm:grid-cols-3 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="min-w-[10rem]">
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-foreground/70 hover:text-foreground transition"
                      >
                        <span>{link.label}</span>
                        <span className="ml-1 block h-px w-0 bg-foreground/40 transition-all duration-200 group-hover:w-8" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Extra column (empty on small screens to balance grid) */}
            <div className="hidden md:block" />
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs xsm:flex-row xsm:items-center">
          <p className="text-foreground/60">© {year} Acme. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="text-foreground/60 hover:text-foreground">About</Link>
            <Link href="/contact" className="text-foreground/60 hover:text-foreground">Contact</Link>
            <Link href="/blog" className="text-foreground/60 hover:text-foreground">Blog</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;