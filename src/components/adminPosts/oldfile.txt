import { getPosts } from "@/library/data"
import styles from "./adminPosts.module.css"
import Image from "next/image";
import { deletePost } from "@/library/actions";

const AdminPosts = async () => {

    const posts = await getPosts();


    return (
        <div className={styles.container}>
        <h1>Posts</h1>
        {posts.map(post => (
            <div className={styles.post} key={post.id}>
                <div className={styles.details}>
                    <Image
                     src={post.img || "/noAvatar.png"}
                     alt="post image" 
                     width={50} 
                     height={50}/>
                    <span className={styles.postTitle}>{post.title}</span>
                </div>
                <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id}></input>
                    <button className={styles.button}>Delete</button>
                </form>
            </div>
        ))}
        </div>
    )
}

export default AdminPosts