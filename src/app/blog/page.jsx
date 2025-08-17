"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, X, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

const BlogPage = () => {
  const [expandedCards, setExpandedCards] = useState(new Set())
  const [posts, setPosts] = useState([])

  // Fetch posts from your API
  useEffect(() => {
    const getData = async () => {
      try {
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
        const host = window.location.host
        const res = await fetch(`${protocol}://${host}/api/blog`)
        if (!res.ok) throw new Error("Failed to fetch posts")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  const toggleExpanded = (cardId) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  // Calculate read time based on description length
  const calculateReadTime = (text) => {
    const wordsPerMinute = 200
    const wordCount = text.split(' ').length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  // Format date from createdAt timestamp
  const formatDate = (createdAt) => {
    if (!createdAt) return "Unknown date"
    const date = new Date(createdAt)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-20 h-32 w-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute right-[-10%] top-40 h-40 w-40 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute left-1/4 bottom-20 h-24 w-24 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl xsm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Discover Stories
              </span>
              <br />
              <span className="text-foreground">That Inspire</span>
            </h1>
            
            <p className="text-lg xsm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of articles, insights, and stories from passionate writers and creators. 
              From cutting-edge tech to timeless wisdom, find your next great read.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{posts.length}+</div>
                <div className="text-sm text-foreground/60">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">50+</div>
                <div className="text-sm text-foreground/60">Authors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">10k+</div>
                <div className="text-sm text-foreground/60">Readers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 pb-20">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const isExpanded = expandedCards.has(post._id)
            const readTime = calculateReadTime(post.description)
            const formattedDate = formatDate(post.createdAt)
            
            return (
              <div key={post._id} className="group">
                <Card className="transition-all duration-500 bg-card border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 group-hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.img || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full object-cover h-64 transition-all duration-500 group-hover:scale-110"
                    />
                    {isExpanded && (
                      <button
                        onClick={() => toggleExpanded(post._id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3 hover:text-primary transition-colors text-foreground">
                      {post.title}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {isExpanded ? post.description : post.description.substring(0, 120) + "..."}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {readTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-primary font-medium hover:text-primary/80 transition-colors hover:underline"
                      >
                        View Post
                      </Link>
                      
                      <button
                        onClick={() => toggleExpanded(post._id)}
                        className="flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>Show Less</span>
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Read More</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default BlogPage
