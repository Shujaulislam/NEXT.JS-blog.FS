"use client"

import { useState, useEffect } from "react"
import styles from "./adminPosts.module.css"
import Image from "next/image"
import { deletePost } from "@/library/actions"
import { Spinner } from "@/components/ui/spinners"

const AdminPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/blog')
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }
                const data = await response.json()
                setPosts(data)
            } catch (err) {
                console.error('Error fetching posts:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const handleDelete = async (postId) => {
        try {
            setDeletingIds(prev => new Set(prev).add(postId))
            
            // Optimistic update
            setPosts(prev => prev.filter(post => post.id !== postId))
            
            const formData = new FormData()
            formData.append('id', postId)
            
            const result = await deletePost(formData)
            
            if (result?.error) {
                // Revert optimistic update on error
                const response = await fetch('/api/blog')
                if (response.ok) {
                    const data = await response.json()
                    setPosts(data)
                }
                setError(result.error)
            }
        } catch (err) {
            console.error('Error deleting post:', err)
            setError('Failed to delete post')
            
            // Revert optimistic update on error
            const response = await fetch('/api/blog')
            if (response.ok) {
                const data = await response.json()
                setPosts(data)
            }
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(postId)
                return newSet
            })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner type="dots" size="lg" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-600 dark:text-red-400">
                <p>Error loading posts: {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No posts found.</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Posts</h1>
            {posts.map(post => (
                <div className={styles.post} key={post.id}>
                    <div className={styles.details}>
                        <Image
                         src={post.img || "/noAvatar.png"}
                         alt="post image" 
                         width={50} 
                         height={50}/>
                        <span className={styles.postTitle}>{post.title}</span>
                    </div>
                    <button 
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingIds.has(post.id)}
                        className={`${styles.button} ${deletingIds.has(post.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {deletingIds.has(post.id) ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Deleting...
                            </span>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default AdminPosts