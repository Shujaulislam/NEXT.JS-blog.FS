"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  // Intersection Observer for fade-in
  const useFadeIn = () => {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return [ref, visible];
  };

  // Counter Animation
  const useCounter = (end, duration = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration]);
    return count;
  };

  // Sections with fade-in
  const [heroRef, heroVisible] = useFadeIn();
  const [storyRef, storyVisible] = useFadeIn();
  const [statsRef, statsVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  const posts = useCounter(320);
  const authors = useCounter(15);
  const readers = useCounter(4800);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      {/* Hero Section */}
      <section
        id="about-hero"
        ref={heroRef}
        className={`flex flex-col items-center justify-center px-6 py-20 xsm:py-24 sm:py-28 transition-all duration-1000 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-center text-4xl xsm:text-5xl md:text-6xl font-extrabold pb-4">
          <span className="bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Your Daily Dose of Insight & Inspiration
          </span>
        </h1>
        <p className="mt-4 text-base xsm:text-lg text-foreground/70 max-w-2xl text-center">
          We craft thoughtful articles, stories, and resources to keep you informed and inspired — every single day.
        </p>

        {/* Quick section nav */}
        <nav aria-label="About sections" className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <li>
              <a href="#our-story" className="rounded-full border border-border bg-card/50 px-3 py-1 hover:bg-card transition-colors">Our Story</a>
            </li>
            <li>
              <a href="#our-values" className="rounded-full border border-border bg-card/50 px-3 py-1 hover:bg-card transition-colors">Values</a>
            </li>
            <li>
              <a href="#our-stats" className="rounded-full border border-border bg-card/50 px-3 py-1 hover:bg-card transition-colors">Stats</a>
            </li>
          </ul>
        </nav>

        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-2xl" />
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        ref={storyRef}
        className={`mx-auto max-w-4xl px-6 py-16 transition-all duration-1000 ${
          storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl xsm:text-3xl font-bold mb-4 text-primary">Our Story</h2>
        <p className="text-foreground/80 leading-relaxed">
          Founded with a passion for storytelling and knowledge-sharing, our blog has grown into a thriving community of
          curious minds. From deep dives into tech trends to uplifting personal narratives, we cover it all — always
          with the goal of sparking conversation and inspiring action.
        </p>
        <p className="mt-4 text-foreground/60">
          We believe the best ideas come from open collaboration. That's why we welcome contributions from writers and
          readers alike, and we're continuously improving the reading experience for accessibility and performance.
        </p>
      </section>

      {/* Values */}
      <section
        id="our-values"
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <h2 className="text-2xl xsm:text-3xl font-bold text-foreground">What we value</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 xsm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/40 via-indigo-500/25 to-fuchsia-500/40 hover:from-sky-500/60 hover:via-indigo-500/40 hover:to-fuchsia-500/60 transition-all duration-300">
            <div className="rounded-2xl border border-border bg-card p-5 h-full">
              <h3 className="text-base font-semibold text-foreground">Clarity</h3>
              <p className="mt-2 text-sm text-foreground/70">We write for humans first — clear, actionable, and inclusive.</p>
            </div>
          </div>
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-fuchsia-500/40 via-rose-500/25 to-amber-500/40 hover:from-fuchsia-500/60 hover:via-rose-500/40 hover:to-amber-500/60 transition-all duration-300">
            <div className="rounded-2xl border border-border bg-card p-5 h-full">
              <h3 className="text-base font-semibold text-foreground">Trust</h3>
              <p className="mt-2 text-sm text-foreground/70">Sources cited, opinions separated, and respectful debate encouraged.</p>
            </div>
          </div>
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/40 via-cyan-500/25 to-sky-500/40 hover:from-emerald-500/60 hover:via-cyan-500/40 hover:to-sky-500/60 transition-all duration-300">
            <div className="rounded-2xl border border-border bg-card p-5 h-full">
              <h3 className="text-base font-semibold text-foreground">Craft</h3>
              <p className="mt-2 text-sm text-foreground/70">Thoughtful design, strong editing, and a fast, accessible app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts / Stats */}
      <section
        id="our-stats"
        ref={statsRef}
        className={`px-6 py-16 transition-all duration-1000 ${
          statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl xsm:text-3xl font-bold text-center mb-10 text-primary">By the numbers</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-card transition-colors">
            <p className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-5xl font-extrabold text-transparent">{posts}+</p>
            <p className="mt-2 text-foreground/60">Posts Published</p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-card transition-colors">
            <p className="bg-gradient-to-r from-fuchsia-400 to-rose-400 bg-clip-text text-5xl font-extrabold text-transparent">{authors}+</p>
            <p className="mt-2 text-foreground/60">Contributing Authors</p>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-card transition-colors">
            <p className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-5xl font-extrabold text-transparent">{readers}+</p>
            <p className="mt-2 text-foreground/60">Active Readers</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className={`px-6 pb-24 pt-6 flex flex-col items-center justify-center transition-all duration-1000 ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl xsm:text-3xl font-bold text-center mb-6 text-foreground">Ready to explore more?</h2>
        <div className="flex flex-col xsm:flex-row gap-3">
          <Link
            href="/blog"
            className="rounded-md bg-gradient-to-b from-primary to-primary/80 px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow hover:translate-y-[-1px] transition-all duration-200 hover:shadow-lg"
          >
            Browse latest posts
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-border bg-card px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-card/80 transition-colors"
          >
            Contact the team
          </Link>
        </div>
      </section>
    </div>
  );
}
