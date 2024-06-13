import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'

const PostCard = () => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src="https://images.pexels.com/photos/6153617/pexels-photo-6153617.jpeg" alt='' fill className={styles.img}/>
                </div>
                <span className={styles.date}>{formattedDate}</span>
                    
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>Title</h1>
                <p className={styles.desc}>lorem ahdadna sijacnas coiasjanc aioasjjascn oaidjjaoicn basuhauhdw oiawicn cosaj haodhawodna ciohcassnc.</p>
                <Link className={styles.link} href="/blog/post">READ MORE</Link>
            </div>
        </div>
    )
}

export default PostCard