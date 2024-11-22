import Image from 'next/image';
import styles from './home.module.css';
import Link from 'next/link';

const Home = () => {
  return (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.title}>Creative thoughts agency</h1>
      <p className={styles.description}> lorem ipsum domentanif kjsbj soi jhasyfayuvchj
      hfwoafn bhdsbhshyufsgjb shjfbshj bhjjkad agdwbjd iuagdyhwfb xovklsdnsjk</p>
      <div className={styles.buttons}>
        <Link href="/about" className={styles.button}>Learn More</Link>
        <button className={styles.button}>Contact</button>
      </div>
      <div className={styles.brand}><Image src="/brands.png" alt='' fill className={styles.brandImg}/></div>
    </div>
    <div className={styles.imageContainer}>
      <Image unoptimized src="/hero.gif" alt='' fill className={styles.heroImg}/>
    </div>
  </div> 
  );   
      
};

export default Home;
