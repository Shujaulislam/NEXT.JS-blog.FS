import { connectToDb } from "@/library/utils"
import { User } from "@/library/models"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectToDb()
        const users = await User.find({}).select('-password').lean()
        
        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        )
    }
}
