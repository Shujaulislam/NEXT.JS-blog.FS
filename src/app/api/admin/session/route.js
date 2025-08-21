import { auth } from "@/library/auth"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await auth()
        
        if (!session?.user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }
        
        return NextResponse.json({
            user: {
                id: session.user.id,
                username: session.user.username,
                email: session.user.email,
                name: session.user.name,
                isAdmin: session.user.isAdmin,
                image: session.user.image
            }
        })
    } catch (error) {
        console.error("Session error:", error)
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
    }
}
