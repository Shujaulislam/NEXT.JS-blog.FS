import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Utility function to calculate reading time
export const calculateReadingTime = (text) => {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Utility function to calculate word count
export const calculateWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

// Utility function to generate excerpt from content
export const generateExcerpt = (content, maxLength = 300) => {
  if (!content) return '';
  const cleanContent = content.replace(/[#*`]/g, '').replace(/\n+/g, ' ');
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.substring(0, maxLength).trim() + '...';
};

// Utility function to generate meta description
export const generateMetaDescription = (content, maxLength = 160) => {
  if (!content) return '';
  const cleanContent = content.replace(/[#*`]/g, '').replace(/\s+/g, ' ');
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.substring(0, maxLength).trim() + '...';
};


