import Image from 'next/image';
import PostUser from '@/components/postUser/postUser';
import { Suspense } from 'react';
import { getPost } from '@/library/data';
import { getPosts } from '@/library/data';
import { headers } from 'next/headers';
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, Eye, Bookmark, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// FETCH DATA WITH AN API
const getData = async (slug) => {
  try {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = (await headers()).get('host');
    const res = await fetch(`${protocol}://${host}/api/blog/${slug}`, {
      // Add cache control if needed
      // cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch post');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error; // Re-throw to be caught by error boundary
  }
};

export const generateMetadata = async  ({params}) => {
  const { slug } = await params;

  const post = await getPost(slug);

  return{
    title: post.title,
    description: post.description,
  };
};

// Helper function to calculate read time
const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const SinglePostPage = async ({params}) => {

  const { slug } = await params;

// FETCH DATA WITH AN API
  const post = await getData(slug);

// FETCH DATA WITH DATABASE

  // const post = await getPost(slug);
  console.log(post);

  // Fetch all posts for related articles
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug) // Exclude current post
    .slice(0, 3); // Show max 3 related posts

    return (
    <>
      {/* NEW REDESIGNED VERSION */}
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
        {/* Hero Section with Enhanced Background */}
        <div className="relative overflow-hidden">
          {/* Enhanced Background Blobs with Better Colors */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-500/15 via-yellow-500/10 to-red-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-500/25 to-purple-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/15 rounded-full blur-xl animate-pulse delay-300"></div>
          </div>
          
          {/* Navigation Back Button */}
          <div className="relative z-10 container mx-auto px-4 pt-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-200 group bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 hover:border-primary/30"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-sm font-medium mb-6 border border-primary/30 shadow-lg">
                <BookOpen className="w-4 h-4" />
                Blog Post
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight bg-gradient-to-r from-foreground via-primary to-foreground/90 bg-clip-text">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-foreground/70 mb-8">
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border/30">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border/30">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{calculateReadTime(post.description)}</span>
                </div>
                <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-border/30">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Reading</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth Transition Section */}
        <div className="relative">
          {/* Transition Blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 right-1/3 w-24 h-24 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 rounded-full blur-xl"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-yellow-500/5 rounded-full blur-2xl"></div>
          </div>
          
          {/* Gradient Overlay for Smooth Transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="relative z-10 container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {post.img && (
                <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 border border-border/50 shadow-2xl">
                  <Image 
                    src={post.img} 
                    alt={post.title || 'Blog post image'} 
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              )}

              {/* Article Content */}
              <article className="prose prose-lg md:prose-xl max-w-none">
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
                  <div className="text-foreground/80 leading-relaxed text-lg md:text-xl space-y-6">
                    {post.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>

              {/* Article Footer with Action Buttons */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground/60">Published on {formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Bookmark className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>Share</span>
                    </button>
                    <Link 
                      href="/blog" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-foreground/70 hover:text-foreground hover:border-primary/30 transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with Author Info and Related Articles */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Author Card - Clean and Simple */}
                <Suspense fallback={
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 bg-muted animate-pulse rounded w-3/4"></div>
                    </div>
                  </div>
                }>
                  <PostUser userId={post.userId} />
                </Suspense>

                {/* Reading Progress */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                  <h4 className="font-semibold text-foreground mb-3">Reading Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/60">Progress</span>
                      <span className="text-primary font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <div className="text-xs text-foreground/50">
                      {calculateReadTime(post.description)} remaining
                    </div>
                  </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                    <h4 className="font-semibold text-foreground mb-4">Related Articles</h4>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost._id} 
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="space-y-2">
                            {relatedPost.img && (
                              <div className="relative w-full h-24 rounded-lg overflow-hidden">
                                <Image 
                                  src={relatedPost.img} 
                                  alt={relatedPost.title} 
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                            )}
                            <div>
                              <h5 className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                {relatedPost.title}
                              </h5>
                              <div className="flex items-center gap-2 mt-2 text-xs text-foreground/60">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(relatedPost.createdAt)}</span>
                                <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                      >
                        View All Articles
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORIGINAL CODE - COMMENTED OUT FOR PRESERVATION */}
      {/*
      <div className={styles.container}>
            {post.img ? (
        <div className={styles.imgContainer}>
          <Image 
            className={styles.img} 
            src={post.title || 'Blog post image'} 
            alt={post.title || 'Blog post image'} 
            fill
          />
        </div>
      ) : null}
      <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.details}>
          {post && (
            <Suspense fallback={<div>loading.....</div>}>
            <PostUser userId= {post.userId}/> 
            </Suspense>)}
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className="styles.detailValue">{formattedDate}</span>
        </div>
        </div>
        <div className={styles.content}>
        {post.description}
        </div>
      </div>
    </div>
      */}
    </>
    );
  };
  
  export default SinglePostPage;