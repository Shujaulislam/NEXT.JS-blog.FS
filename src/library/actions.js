"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";


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

export const register = async (previousState,formData) => {
    const {username, email, password, confirmPassword} = Object.fromEntries(formData);
    if (password !== confirmPassword) {
        return {error: "Passwords do not match"};
    }
    try{
        connectToDb();
        const user = await User.findOne({username});
        if (user) {
            return {error: "User already exists"};
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        console.log("user created in db");
        return {success: "User created successfully"};
    }
    catch(err){
        console.log(err)
        return {error: "Failed to register!"};
    }
};

export const login = async (previousState, formData) => {
    const {username, password} = Object.fromEntries(formData);

    try{
        await signIn("credentials", {username, password });
    }
    catch(err){
        console.log(err);
        if (err.message.includes("CredentialsSignin")) {
            return {error: "Wrong username or password"};
        }
        throw err;
    }
}; 