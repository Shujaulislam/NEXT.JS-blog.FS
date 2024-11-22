import PostCard from "@/components/postCard/postCard"
import styles from "./blog.module.css"
import { headers } from 'next/headers';
import { getPosts } from "@/library/data";

// FETCH DATA WITH AN API   

const getData = async () => {

    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = headers().get('host');
    const res = await fetch(`${protocol}://${host}/api/blog`, {next: {revalidate: 3600}});

    if(!res.ok) throw new Error('Failed to fetch data');

    return res.json();
};



const BlogPage = async () => {
    // FETCH DATA WITH AN API
    const posts = await getData();

    // FETCH DATA WITH DATABASE
    // const posts = await getPosts();
    return (
        <div className={styles.container}>
        {posts.map((post) => (
            <div className={styles.post} key={post.id}>
            <PostCard post={post}/>
            </div>
        ))}          
            
        </div>
    );
};

export default BlogPage
