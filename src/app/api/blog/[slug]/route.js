import { Post } from "@/library/models";
import { connectToDb } from "@/library/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { slug } = await params;
    try {
        await connectToDb();
        const post = await Post.findOne({ slug });
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch post!" },
            { status: 500 }
        );
    }
};

export const DELETE = async (request, { params }) => {
    const { slug } = await params;
    try {
        await connectToDb();
        const result = await Post.deleteOne({ slug });
        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete post!" },
            { status: 500 }
        );
    }
};