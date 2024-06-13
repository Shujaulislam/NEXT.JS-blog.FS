import Image from 'next/image';
import styles from './singlepost.module.css'

const SinglePostPage = () => {

  const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    return <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src="https://images.pexels.com/photos/6153617/pexels-photo-6153617.jpeg" alt='' fill/>
      </div>
      <div className={styles.textContainer}>
          <h1 className={styles.title}>Title</h1>
        <div className={styles.details}>
          <Image className={styles.avatar} src="https://images.pexels.com/photos/6153617/pexels-photo-6153617.jpeg" alt='' width={50}height={50}/>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Author</span>
          <span className={styles.detailValue}>Huzaif Akhter</span>
        </div>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>{formattedDate}</span>
        </div>
        </div>
        <div className={styles.content}>
          loremipsum djaskdhwqrhn n czxcwjhmn  nweriopwefrfbn xcvuiosf sd fmn fhuic cvl;sdfsefdcbn cwehnfefujh qwrrrxi8jmn mndfjmnxc bnxcxcyjhuyjhr jmnxcefaj xcvduyhsefjhfcbn xcbnefefn lorem dore mitanjdyh mwpusiocnw qlkujcioscnqwemnop-c nejdhi9 p qwnklwdju ipsum.
        </div>
      </div>
    </div>;
  };
  
  export default SinglePostPage;