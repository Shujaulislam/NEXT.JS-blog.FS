import { Post } from "@/library/models";
import { connectToDb } from "@/library/utils";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {

    const {slug} = params;
    try{
        connectToDb();
        const post = await Post.findOne({slug})
        return NextResponse.json(post)

    } 
    
    catch (error) {
        console.log(error)
        throw new Error("Failed to fetch post!")
    }

};

export const DELETE = async (request, {params}) => {
    const {slug} = params;

    try{
        connectToDb();
        await Post.deleteOne({slug});
        return NextResponse.json("post deleted")

    } 
    
    catch (error) {
        console.log(error)
        throw new Error("Failed to delete post!")
    }

};