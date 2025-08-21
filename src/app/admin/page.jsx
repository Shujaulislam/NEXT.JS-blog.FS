"use client"

import { useState, useEffect } from "react"
import { AdminPostsWrapper, AdminUsersWrapper } from "@/components/admin/AdminDataWrapper"
import EnhancedAdminPostForm from "@/components/admin/EnhancedAdminPostForm"
import EnhancedAdminUserForm from "@/components/admin/EnhancedAdminUserForm"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { 
    FileText, 
    Users, 
    BarChart3, 
    Plus, 
    Search,
    Grid3X3,
    List,
    TrendingUp,
    Activity,
    Clock,
    Eye
} from "lucide-react"

const AdminPage = () => {
    const { user, loading, error } = useAdminAuth()
    const [activeTab, setActiveTab] = useState('overview')
    const [viewMode, setViewMode] = useState('grid')
    const [searchTerm, setSearchTerm] = useState('')
    const [stats, setStats] = useState({ posts: 0, users: 0, views: 0 })
    // const [recentActivity, setRecentActivity] = useState([])

    // Fetch dashboard statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postsRes, usersRes] = await Promise.all([
                    fetch('/api/blog'),
                    fetch('/api/users')
                ])
                
                if (postsRes.ok && usersRes.ok) {
                    const posts = await postsRes.json()
                    const users = await usersRes.json()
                    
                    setStats({
                        posts: posts.length,
                        users: users.length,
                        views: Math.floor(Math.random() * 1000) + 500 // Placeholder for now
                    })
                }
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }

        if (user) {
            fetchStats()
        }
    }, [user])

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'posts', label: 'Posts', icon: FileText },
        { id: 'users', label: 'Users', icon: Users }
    ]

    const TabButton = ({ tab, isActive }) => {
        const Icon = tab.icon
        return (
            <button
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-sm",
                    isActive 
                        ? "bg-primary text-primary-foreground shadow-lg transform scale-105" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-md"
                )}
            >
                <Icon className="h-4 w-4" />
                {tab.label}
            </button>
        )
    }

    const OverviewTab = () => (
        <div className="space-y-8">
            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.posts}</div>
                            <div className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">Total Posts</div>
                        </div>
                        <div className="p-3 bg-blue-500/20 rounded-xl">
                            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-blue-600/60 dark:text-blue-400/60">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12% from last month</span>
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.users}</div>
                            <div className="text-sm text-purple-600/70 dark:text-purple-400/70 font-medium">Total Users</div>
                        </div>
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-purple-600/60 dark:text-purple-400/60">
                        <TrendingUp className="h-3 w-3" />
                        <span>+8% from last month</span>
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-800/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.views}</div>
                            <div className="text-sm text-emerald-600/70 dark:text-emerald-400/70 font-medium">Page Views</div>
                        </div>
                        <div className="p-3 bg-emerald-500/20 rounded-xl">
                            <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600/60 dark:text-emerald-400/60">
                        <TrendingUp className="h-3 w-3" />
                        <span>+24% from last month</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        <button 
                            onClick={() => setActiveTab('posts')}
                            className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-200 group"
                        >
                            <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-foreground">Create New Post</div>
                                <div className="text-xs text-muted-foreground">Add fresh content to your blog</div>
                            </div>
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('users')}
                            className="w-full flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-200 group"
                        >
                            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-foreground">Manage Users</div>
                                <div className="text-xs text-muted-foreground">Control access and permissions</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        Recent Activity
                    </h3>
                    <div className="space-y-3">
                        {[
                            { action: 'New post published', item: 'Getting Started with Next.js 14', time: '2 hours ago', type: 'post' },
                            { action: 'User registered', item: 'jane.doe@example.com', time: '4 hours ago', type: 'user' },
                            { action: 'Post updated', item: 'Mastering Tailwind CSS', time: '6 hours ago', type: 'post' },
                            { action: 'Admin login', item: user?.email || 'admin@example.com', time: 'Just now', type: 'admin' }
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    activity.type === 'post' ? 'bg-blue-500' :
                                    activity.type === 'user' ? 'bg-purple-500' :
                                    'bg-emerald-500'
                                )} />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-foreground truncate">{activity.action}</div>
                                    <div className="text-xs text-muted-foreground truncate">{activity.item}</div>
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const PostsTab = () => (
        <div className="space-y-6">
            {/* Header with Search and Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 max-w-md">
                        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Search Posts</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                            <input
                                type="text"
                                placeholder="Search posts by title, content, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">View Mode:</span>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200",
                                viewMode === 'grid' ? "bg-blue-500 text-white shadow-lg" : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            )}
                            title="Grid View"
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200",
                                viewMode === 'list' ? "bg-blue-500 text-white shadow-lg" : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            )}
                            title="List View"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Management */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Blog Posts Management</h2>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                {stats.posts} posts
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            View, manage, and delete your blog posts. Use the search bar above to find specific posts by title, content, or tags.
                        </p>
                        <AdminPostsWrapper />
                    </div>
                </div>

                <div className="lg:w-96">
                    <div className="sticky top-32">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                                <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                Create New Post
                            </h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-4 text-sm leading-relaxed">
                                Add a new blog post to your website. Fill in the details below and click submit to publish.
                            </p>
                            <EnhancedAdminPostForm userId={user.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const UsersTab = () => (
        <div className="space-y-6">
            {/* Header with Search and Actions */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex-1 max-w-md">
                        <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">Search Users</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                            <input
                                type="text"
                                placeholder="Search users by username, email, or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md">
                            <Plus className="h-4 w-4" />
                            Export Users
                        </button>
                    </div>
                </div>
            </div>

            {/* Users Management */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">User Management</h2>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                {stats.users} users
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Manage user accounts, roles, and permissions. Use the search bar above to find specific users by username, email, or role.
                        </p>
                        <AdminUsersWrapper />
                    </div>
                </div>

                <div className="lg:w-96">
                    <div className="sticky top-32">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/50 dark:border-purple-800/30 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                                <Plus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                Add New User
                            </h3>
                            <p className="text-purple-700 dark:text-purple-300 mb-4 text-sm leading-relaxed">
                                Create a new user account. Set their role and permissions as needed for your team.
                            </p>
                            <EnhancedAdminUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-foreground/70">Checking authentication...</p>
                </div>
            </div>
        )
    }

    // Show error state
    if (error || !user) {
        return (
            <div className="min-h-screen bg-background text-foreground pt-24 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="text-red-500 text-6xl mb-4">🔒</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
                    <p className="text-foreground/70 mb-6">
                        {error || "You need to be logged in to access the admin dashboard."}
                    </p>
                    <a 
                        href="/login" 
                        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Go to Login
                    </a>
                </div>
            </div>
        )
    }

    // Check if user is admin
    if (!user.isAdmin) {
        return (
            <div className="min-h-screen bg-background text-foreground pt-24 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="text-red-500 text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h1>
                    <p className="text-foreground/70 mb-6">
                        You need administrator privileges to access this dashboard.
                    </p>
                    <a 
                        href="/" 
                        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-24">
            {/* Hero Section */}
            <section className="relative px-6 py-16 xsm:py-20 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl xsm:text-5xl md:text-6xl font-extrabold pb-4">
                            <span className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                                Admin Dashboard
                            </span>
                        </h1>
                        <p className="mt-4 text-base xsm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Manage your blog posts, users, and website content from one central location with powerful tools and insights.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                                <span>Logged in as:</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">{user.name || user.username}</span>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                    Administrator
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative background */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute left-[-10%] top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-2xl" />
                        <div className="absolute right-[-10%] top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22),transparent_60%)] blur-2xl" />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-6 pb-16">
                <div className="mx-auto max-w-7xl">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap items-center gap-2 mb-8 p-2 bg-card border border-border rounded-2xl">
                        {tabs.map((tab) => (
                            <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} />
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[600px]">
                        {activeTab === 'overview' && <OverviewTab />}
                        {activeTab === 'posts' && <PostsTab />}
                        {activeTab === 'users' && <UsersTab />}
                    </div>
                </div>
            </section>
        </div>
    )
}

// Utility function for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(' ')

export default AdminPage
