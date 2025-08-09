import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';

// Fetch latest posts for the homepage (server-rendered for SEO)
const getLatestPosts = async () => {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol =
      headersList.get('x-forwarded-proto') ||
      (process.env.NODE_ENV === 'development' ? 'http' : 'https');
    const res = await fetch(`${protocol}://${host}/api/blog`, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const posts = await res.json();
    return Array.isArray(posts) ? posts.slice(0, 3) : [];
  } catch {
    return [];
  }
};

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <main className="w-full bg-background text-foreground pt-28">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-16 xsm:py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs xsm:text-sm text-foreground/70">
              Modern full‑stack blog platform
            </span>
            <h1 className="mt-6 text-4xl xsm:text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Ideas to Impact, faster</span>
            </h1>
            <p className="mt-6 text-base xsm:text-lg sm:text-xl leading-relaxed text-foreground/70">
              Write, share, and manage posts with authentication and admin tools. Built with Next.js App Router, Mongoose, and NextAuth.
            </p>
            <div className="mt-10 flex flex-col xsm:flex-row items-center justify-center gap-3">
              <Link
                href="/blog"
                className="inline-flex h-11 xsm:h-12 items-center justify-center rounded-md bg-gradient-to-b from-sky-500 to-indigo-600 px-5 xsm:px-6 text-sm xsm:text-base font-semibold text-white shadow hover:translate-y-[-2px] transition"
              >
                Explore blog
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 xsm:h-12 items-center justify-center rounded-md border border-border bg-transparent px-5 xsm:px-6 text-sm xsm:text-base font-semibold hover:bg-foreground/10"
              >
                Sign in / Register
              </Link>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 xsm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/40 via-indigo-500/25 to-fuchsia-500/40">
              <div className="rounded-2xl border border-border bg-background p-5">
                <h3 className="text-base font-semibold">Authentication</h3>
                <p className="mt-2 text-sm text-foreground/70">GitHub OAuth and credentials with role‑based access control.</p>
              </div>
            </div>
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-fuchsia-500/40 via-rose-500/25 to-amber-500/40">
              <div className="rounded-2xl border border-border bg-background p-5">
                <h3 className="text-base font-semibold">Admin dashboard</h3>
                <p className="mt-2 text-sm text-foreground/70">Manage users and posts using server actions and Mongoose.</p>
              </div>
            </div>
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/40 via-cyan-500/25 to-sky-500/40">
              <div className="rounded-2xl border border-border bg-background p-5">
                <h3 className="text-base font-semibold">SEO & performance</h3>
                <p className="mt-2 text-sm text-foreground/70">Lightweight hero, semantic structure, and image best practices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25),transparent_60%)] blur-2xl" />
          <div className="absolute right-[-10%] bottom-[-20%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.25),transparent_60%)] blur-2xl" />
        </div>
      </section>

      {/* Recent posts */}
      <section className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Latest posts</h2>
            <p className="mt-1 text-sm text-foreground/70">Fresh content from the community. Updated regularly.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold hover:underline">View all</Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && (
            <div className="col-span-full rounded-xl border border-border bg-foreground/5 p-6 text-sm text-foreground/70">
              No posts yet. Be the first to write one from the admin panel.
            </div>
          )}

          {posts.map((post) => (
            <Link
              key={post._id || post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-background hover:bg-foreground/5 transition overflow-hidden"
            >
              <div className="aspect-[16/9] w-full bg-foreground/5">
                {post.img ? (
                  <Image
                    src={post.img}
                    alt={post.title || 'Post image'}
                    width={1200}
                    height={675}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold group-hover:underline">
                  {post.title || 'Untitled'}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {(post.description && String(post.description).slice(0, 120) + (post.description.length > 120 ? '…' : '')) || 'No description'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-border p-[1px] bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/30 to-rose-500/40">
          <div className="rounded-2xl bg-background p-8 sm:p-10">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to publish?</h3>
            <p className="mt-2 text-sm text-foreground/70">Log in to write a post or explore the blog to see what others are sharing.</p>
            <div className="mt-6 flex flex-col xsm:flex-row gap-3">
              <Link href="/login" className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-b from-indigo-500 to-fuchsia-600 px-5 text-sm font-semibold text-white">
                Login / Register
              </Link>
              <Link href="/blog" className="inline-flex h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-semibold hover:bg-foreground/10">
                Browse blog
              </Link>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[-20%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_60%)] blur-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
// Preserved legacy implementation (modular CSS + GIF hero) for reference:
// import Image from 'next/image';
// import styles from './home.module.css';
// const LegacyHome = () => (
//   <div className={styles.container}>
//     <div className={styles.textContainer}>
//       <h1 className={styles.title}>Creative thoughts agency</h1>
//       <p className={styles.description}>
//         lorem ipsum domentanif kjsbj soi jhasyfayuvchj hfwoafn bhdsbhshyufsgjb
//         shjfbshj bhjjkad agdwbjd iuagdyhwfb xovklsdnsjk
//       </p>
//       <div className={styles.buttons}>
//         <Link href="/about" className={styles.button}>Learn More</Link>
//         <button className={styles.button}>Contact</button>
//       </div>
//       <div className={styles.brand}>
//         <Image src="/brands.png" alt="brands" fill className={styles.brandImg} />
//       </div>
//     </div>
//     <div className={styles.imageContainer}>
//       <Image unoptimized src="/hero.gif" alt="hero" fill className={styles.heroImg} />
//     </div>
//   </div>
// );