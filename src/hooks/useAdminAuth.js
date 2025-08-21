"use client"

import { useState, useEffect } from "react"

export const useAdminAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/admin/session')
                
                if (!response.ok) {
                    setError('Not authenticated')
                    setUser(null)
                    return
                }
                
                const data = await response.json()
                setUser(data.user)
                setError(null)
            } catch (err) {
                console.error('Auth check error:', err)
                setError('Authentication failed')
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return { user, loading, error }
}
