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



const items = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResizableNavbar className="fixed inset-x-0 top-0">
      {/* Do NOT pass `visible` manually; parent injects it */}
      <NavBody className="px-4">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-medium text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white text-black">A</span>
            <span className="hidden xsm:inline">Acme</span>
          </Link>
          <NavItems items={items} />
          <div className="hidden items-center gap-2 lg:flex">
            <NavbarButton href="/login" variant="secondary">Login</NavbarButton>
            <NavbarButton href="/register" variant="primary">Sign up</NavbarButton>
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
            <div className="mt-2 flex gap-2">
              <NavbarButton href="/login" variant="secondary" className="flex-1 text-black">Login</NavbarButton>
              <NavbarButton href="/register" variant="primary" className="flex-1">Sign up</NavbarButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}

export default Navbar
