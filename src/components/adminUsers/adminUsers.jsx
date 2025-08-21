"use client"

import { useState, useEffect } from "react"
import styles from "./adminUsers.module.css"
import Image from "next/image"
import { deleteUser } from "@/library/actions"
import { Spinner } from "@/components/ui/spinners"

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [deletingIds, setDeletingIds] = useState(new Set())

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/users')
                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }
                const data = await response.json()
                setUsers(data)
            } catch (err) {
                console.error('Error fetching users:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleDelete = async (userId) => {
        try {
            setDeletingIds(prev => new Set(prev).add(userId))
            
            // Optimistic update
            setUsers(prev => prev.filter(user => user.id !== userId))
            
            const formData = new FormData()
            formData.append('id', userId)
            
            const result = await deleteUser(formData)
            
            if (result?.error) {
                // Revert optimistic update on error
                const response = await fetch('/api/users')
                if (response.ok) {
                    const data = await response.json()
                    setUsers(data)
                }
                setError(result.error)
            }
        } catch (err) {
            console.error('Error deleting user:', err)
            setError('Failed to delete user')
            
            // Revert optimistic update on error
            const response = await fetch('/api/users')
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            }
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(userId)
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
                <p>Error loading users: {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No users found.</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1>Users</h1>
            {users.map(user => (
                <div className={styles.user} key={user.id}>
                    <div className={styles.details}>
                        <Image
                         src={user.img || "/noAvatar.png"}
                         alt="" 
                         width={50} 
                         height={50}/>
                        <span>{user.username}</span>
                    </div>
                    <button 
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingIds.has(user.id)}
                        className={`${styles.button} ${deletingIds.has(user.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {deletingIds.has(user.id) ? (
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

export default AdminUsers