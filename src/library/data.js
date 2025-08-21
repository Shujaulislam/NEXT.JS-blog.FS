import { Post, User } from "./models";
import { connectToDb, calculateReadingTime, calculateWordCount, generateExcerpt, generateMetaDescription } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async (filters = {}) => {
    try{
        await connectToDb();
        
        // Build query based on filters
        let query = { status: 'published' };
        
        if (filters.category && filters.category !== 'all') {
            query.category = filters.category;
        }
        
        if (filters.tags && filters.tags.length > 0) {
            query.tags = { $in: filters.tags };
        }
        
        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { content: { $regex: filters.search, $options: 'i' } },
                { tags: { $in: [new RegExp(filters.search, 'i')] } }
            ];
        }
        
        const posts = await Post.find(query).sort({ createdAt: -1 });
        return posts;
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch posts!")
    }
};

export const getPost = async (slug) => {
    try{
        await connectToDb();
        const post = await Post.findOne({ slug, status: 'published' });
        
        if (!post) {
            throw new Error("Post not found!");
        }
        
        return post;
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch post!")
    }
};

export const getUser = async (id) => {
    noStore();
    try{
        await connectToDb();
        const user = await User.findById(id)
        return user
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch user!")
    }
};

export const getUsers = async () => {
    try{
        await connectToDb();
        const users = await User.find()
        return users
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch users!")
    }
};

// New function to get all categories
export const getCategories = async () => {
    try {
        await connectToDb();
        const categories = await Post.distinct('category');
        return categories.filter(cat => cat && cat !== 'General');
    } catch (err) {
        console.log(err);
        return [];
    }
};

// New function to get all tags
export const getTags = async () => {
    try {
        await connectToDb();
        const tags = await Post.distinct('tags');
        return tags.filter(tag => tag && tag.trim() !== '');
    } catch (err) {
        console.log(err);
        return [];
    }
};

// New function to create/update post with calculated fields
export const createOrUpdatePost = async (postData) => {
    try {
        await connectToDb();
        
        // Calculate derived fields
        const wordCount = calculateWordCount(postData.content);
        const readingTime = calculateReadingTime(postData.content);
        const excerpt = generateExcerpt(postData.content);
        const metaDescription = generateMetaDescription(postData.content);
        
        // If no description provided, use generated meta description
        if (!postData.description) {
            postData.description = metaDescription;
        }
        
        const postWithCalculatedFields = {
            ...postData,
            wordCount,
            readingTime,
            excerpt,
            status: postData.status || 'published'
        };
        
        if (postData._id) {
            // Update existing post
            const updatedPost = await Post.findByIdAndUpdate(
                postData._id,
                postWithCalculatedFields,
                { new: true, runValidators: true }
            );
            return updatedPost;
        } else {
            // Create new post
            const newPost = new Post(postWithCalculatedFields);
            return await newPost.save();
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create/update post!");
    }
};