import Image from 'next/image';
import styles from './singlePost.module.css'
import PostUser from '@/components/postUser/postUser';
import { Suspense } from 'react';
import { getPost } from '@/library/data';
import { headers } from 'next/headers';

// FETCH DATA WITH AN API
const getData = async (slug) => {
  try {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = (await headers()).get('host');
    const res = await fetch(`${protocol}://${host}/api/blog/${slug}`, {
      // Add cache control if needed
      // cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to fetch post');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error; // Re-throw to be caught by error boundary
  }
};

export const generateMetadata = async  ({params}) => {
  const { slug } = await params;

  const post = await getPost(slug);

  return{
    title: post.title,
    description: post.description,
  };
};

const SinglePostPage = async ({params}) => {

  const { slug } = await params;

// FETCH DATA WITH AN API
  const post = await getData(slug);

// FETCH DATA WITH DATABASE

  // const post = await getPost(slug);
  console.log(post);

  const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    return (
    <div className={styles.container}>
            {post.img ? (
        <div className={styles.imgContainer}>
          <Image 
            className={styles.img} 
            src={post.img} 
            alt={post.title || 'Blog post image'} 
            fill
          />
        </div>
      ) : null}
      <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.details}>
          {post && (
            <Suspense fallback={<div>loading.....</div>}>
            <PostUser userId= {post.userId}/> 
            </Suspense>)}
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>{formattedDate}</span>
        </div>
        </div>
        <div className={styles.content}>
        {post.description}
        </div>
      </div>
    </div>
    );
  };
  
  export default SinglePostPage;