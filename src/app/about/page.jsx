const AboutPage = () => {
    return (
        <div className={styles.container}>
    <div className={styles.textContainer}>

      <h2 className={styles.subtitle}>About Agency</h2>

      <h1 className={styles.title}>We Create Digital ideas that are bigger,  bolder, brave and Better</h1>

      <p className={styles.description}> We create digital ideas that are bigger, bolder, braver and better. We
          believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance solution provider. Wide range
          of web and software development services.</p>

      <div className={styles.boxes}>
        <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Year of experience</p>
        </div>
        <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Year of experience</p>
        </div>
        <div className={styles.box}>
            <h1>10 k+</h1>
            <p>Year of experience</p>
        </div>
      </div>
      
    </div>
    <div className={styles.imageContainer}>
      <Image src="/about.png" alt='about image' fill className={styles.Img}/>
    </div>
  </div> 
    )
}

export default AboutPage
