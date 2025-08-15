"use client"

import Link from "next/link"
import { motion } from "motion/react"
import React from "react"  
import { useState } from "react"
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react"
import { Mail, Send } from "lucide-react"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Admin", href: "/admin" },
]

const socialLinks = [
  { icon: IconBrandGithub, href: "https://github.com/Shujaulislam", label: "GitHub" },
  { icon: IconBrandTwitter, href: "https://twitter.com/Shujaulislam09", label: "Twitter" },
  { icon: IconBrandLinkedin, href: "https://linkedin.com/in/shuja-ul-islam", label: "LinkedIn" },
  { icon: Mail, href: "mailto:shujaulisla@gmail.com", label: "Email" },
]

function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
    // You can add actual newsletter signup logic here
  }

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
        <div className="flex flex-col items-start justify-between gap-8 xsm:flex-row xsm:items-center">
          <Link href="/" aria-label="Go to homepage" className="inline-flex items-center space-x-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-foreground text-background text-sm font-bold">
              A
            </span>
            <span className="text-lg font-semibold text-foreground">Acme</span>
          </Link>
          <p className="max-w-xl text-sm text-foreground/70">
            A modern Next.js blog with authentication, admin tools, and server actions. Built for speed, accessibility,
            and great DX.
          </p>
        </div>

        {/* Main content grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 xsm:grid-cols-2 lg:grid-cols-4">
          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-foreground/70 hover:text-foreground transition-all duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Account</h3>
            <ul className="space-y-2 text-sm">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-foreground/70 hover:text-foreground transition-all duration-200"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground/70 transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
            <p className="text-xs text-foreground/60">Get the latest posts delivered right to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-l-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:border-foreground/20 focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center rounded-r-md border border-l-0 border-border bg-foreground px-3 py-2 text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs xsm:flex-row xsm:items-center">
          <p className="text-foreground/60">© {year} Acme. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-foreground/60 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-foreground/60 hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
