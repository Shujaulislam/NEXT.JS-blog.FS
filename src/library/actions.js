"use server"

import { revalidatePath } from "next/cache";
import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import crypto from "crypto";


export const addPost = async (prevState,FormData) => {
    const {title, description,userId,slug,img} = Object.fromEntries(FormData);

    try{
        connectToDb();
        const newPost = new Post({title, description,userId,slug,img});
        await newPost.save();
        console.log("post saved to database")
        revalidatePath("/blog");
        revalidatePath("/admin");
    }
    catch(err){
        console.log(err)
        return {error: "Failed to create post!"}
    }
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try{
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("deleted from database")
        revalidatePath("/blog");
        revalidatePath("/admin");
    }
    catch(err){
        console.log(err)
        return {error: "Failed to delete post!"}
    }
};

export const addUser = async (prevState, FormData) => {
    const {username, email, password, img, isAdmin} = Object.fromEntries(FormData);

    try{
        connectToDb();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password:hashedPassword, img, isAdmin: isAdmin === "true"});
        await newUser.save();
        console.log("User saved to database")
        revalidatePath("/admin")
    }
    catch(err){
        console.log(err)
        return {error: "Failed to add USER!"}
    }
};

export const deleteUser = async (formData) => {
    const {id} = Object.fromEntries(formData);
    try{
        connectToDb();
        await Post.deleteMany({userId:id});
        await User.findByIdAndDelete(id);
        console.log("User deleted from database")
        revalidatePath("/admin")
    }
    catch(err){
        console.log(err)
        return {error: "Failed to Delete USER!"}
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

    // Input validation
    if (!username || !email || !password || !confirmPassword) {
        return {error: "All fields are required"};
    }

    if (username.length < 3 || username.length > 20) {
        return {error: "Username must be between 3 and 20 characters"};
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {error: "Please enter a valid email address"};
    }

    if (password.length < 6) {
        return {error: "Password must be at least 6 characters long"};
    }

    if (password !== confirmPassword) {
        return {error: "Passwords do not match"};
    }

    try {
        await connectToDb();
    } catch (err) {
        console.error("Database connection failed:", err);
        return {error: "Service temporarily unavailable. Please try again later."};
    }

    try {
        // Check both username and email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return {error: "Username is already taken"};
            }
            return {error: "Email is already registered"};
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        });
        await newUser.save();
        console.log("user created in db");
        return {success: "User created successfully"};
    }
    catch(err){
        console.error("Registration error:", err);
        return {error: "An error occurred during registration. Please try again later."};
    }
};

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    if (!username || !password) {
        return { error: "Please provide both username and password" };
    }

    try {
        const result = await signIn("credentials", { 
            username, 
            password,
            redirect: false
        });

        if (result?.error) {
            // Handle specific error types
            switch (result.error) {
                case "CREDENTIALS_MISSING":
                    return { error: "Please provide both username and password" };
                case "DATABASE_ERROR":
                    return { error: "Service temporarily unavailable. Please try again later" };
                case "INVALID_USERNAME":
                    return { error: "Invalid username" };
                case "INVALID_PASSWORD":
                    return { error: "Incorrect password" };
                default:
                    console.error("Unhandled error type:", result.error);
                    return { error: "Something went wrong. Please try again" };
            }
        }

        // If login successful, return success message
        if (result?.ok) {
            // Add a small delay to ensure session is properly established
            await new Promise(resolve => setTimeout(resolve, 100));
            return { success: "Login successful" };
        }

        return result;
    } catch (err) {
        console.error("Login error:", err);
        return { error: "An unexpected error occurred. Please try again later" };
    }
};

// Request password reset: generates token and returns a link (in real apps, email it)
export const requestPasswordReset = async (prevState, formData) => {
    const { email } = Object.fromEntries(formData);
    if (!email) return { error: "Please provide your email" };

    try {
        await connectToDb();
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Do not reveal existence
            return { success: "If that email exists, a reset link has been generated." };
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        return { success: "Reset link generated", token };
    } catch (err) {
        console.error("requestPasswordReset error:", err);
        return { error: "Could not process request. Please try again later." };
    }
};

// Perform password reset using token
export const resetPassword = async (prevState, formData) => {
    const { token, password, confirmPassword } = Object.fromEntries(formData);
    if (!token || !password || !confirmPassword) {
        return { error: "Missing fields" };
    }
    if (password.length < 6) {
        return { error: "Password must be at least 6 characters long" };
    }
    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    try {
        await connectToDb();
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() },
        });
        if (!user) return { error: "Invalid or expired token" };

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        user.password = hashed;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return { success: "Password updated successfully" };
    } catch (err) {
        console.error("resetPassword error:", err);
        return { error: "Could not reset password. Please try again later." };
    }
};