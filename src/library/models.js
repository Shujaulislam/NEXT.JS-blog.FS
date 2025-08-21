import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    name: {
        type: String,
        default: function() {
            return this.username; // Default to username if no name provided
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    img:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true}
);

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        maxLength: 160, // SEO meta description limit
    },
    content:{
        type:String,
        required:true,
    },
    excerpt:{
        type:String,
        maxLength: 300, // Short preview for cards
    },
    tags:[{
        type:String,
        trim:true,
    }],
    category:{
        type:String,
        required:true,
        default: 'General',
    },
    readingTime:{
        type:Number,
        default:0,
    },
    wordCount:{
        type:Number,
        default:0,
    },
    img:{
        type:String,
    },
    userId:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:String,
        enum: ['draft', 'published', 'archived'],
        default: 'published',
    },
    featured:{
        type:Boolean,
        default:false,
    },
    seoKeywords:[String],
},{timestamps:true});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);