"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";


export const addPost = async (FormData) => {
    const {title, description,userId,slug} = Object.fromEntries(FormData);

    try{
        connectToDb();
        const newPost = new Post({title, description,userId,slug});
        await newPost.save();
        console.log("saved to database")
        revalidatePath("/blog")
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to create post!")
    }
};

export const deletePost = async (formData) => {
    const {id} = Object.fromEntries(formData);
    try{
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from database")
        revalidatePath("/blog")
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to delete post!")
    }
};


export const handleGithublogin = async () => {
    "use server"
    await signIn("github")
}

export const handleGithublogout = async () => {
    "use server"
    await signOut();
}

export const register = async (formData) => {
    const {username, email, password, confirmPassword} = Object.fromEntries(formData);
    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    try{
        connectToDb();
        const user = await User.findOne({username});
        if (user) {
            return "User already exists";
        }
        const newUser = new User({username, email, password});
        await newUser.save();
        console.log("user created in db")
    }
    catch(err){
        console.log(err)
        return {error: "Failed to register!"};
    }
};