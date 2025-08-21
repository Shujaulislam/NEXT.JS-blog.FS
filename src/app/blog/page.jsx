"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, X, ChevronDown, ChevronUp, Search, Tag, FolderOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const BlogPage = () => {
  const [expandedCards, setExpandedCards] = useState([])
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])

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
        setFilteredPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  // Filter posts based on search, category, and tags
  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags && post.tags.some(tag => selectedTags.includes(tag))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, selectedTags, posts]);

  const toggleExpanded = (cardId) => {
    setExpandedCards(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId)
      } else {
        return [...prev, cardId]
      }
    })
  }

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }

  // Calculate read time based on content or description
  const calculateReadTime = (text) => {
    if (!text) return "1 min read"
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

  // Get unique categories and tags from posts
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  const tags = [...new Set(posts.flatMap(post => post.tags || []).filter(Boolean))];

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

            {/* Search and Filters */}
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-sm text-foreground/60 mr-2">Category:</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-card/80 text-foreground/70 hover:bg-card hover:text-foreground border border-border/50'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-card/80 text-foreground/70 hover:bg-card hover:text-foreground border border-border/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Tags Filter */}
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-sm text-foreground/60 mr-2">Tags:</span>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-secondary text-white shadow-lg'
                          : 'bg-card/80 text-foreground/70 hover:bg-card hover:text-foreground border border-border/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Clear Filters */}
              {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 text-foreground/70 hover:text-foreground rounded-full text-sm font-medium transition-all duration-200 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{filteredPosts.length}+</div>
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
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-foreground/70">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const isExpanded = expandedCards.includes(post._id)
              const readTime = calculateReadTime(post.content || post.description)
              const formattedDate = formatDate(post.createdAt)
              const displayContent = post.content || post.description
              
              return (
                <div key={post._id} className="group">
                  <Card className="transition-all duration-500 bg-card border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 group-hover:scale-105">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.img || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={256}
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
                      {/* Category */}
                      {post.category && (
                        <div className="flex items-center gap-2 mb-3">
                          <FolderOpen className="w-4 h-4 text-primary" />
                          <span className="text-sm text-primary font-medium">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-xl mb-3 hover:text-primary transition-colors text-foreground">
                        {post.title}
                      </h3>
                      
                      <div className="mb-4">
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {isExpanded ? displayContent : (displayContent.length > 120 ? displayContent.substring(0, 120) + "..." : displayContent)}
                        </p>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-muted/50 text-foreground/60 rounded-full text-xs"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-foreground/40 px-2 py-1">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No posts found</h3>
            <p className="text-foreground/70 mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogPage
