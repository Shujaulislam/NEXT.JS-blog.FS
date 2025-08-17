import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
    title: ' Contact Page',
    description: 'contact page description',
  }

const ContactPage = () => {
    return (
        <div className={styles.container}>
        <div className={styles.imageContainer}>
        <Image src="/contact.png" alt="contact us image" fill className={styles.Img}/>
    </div>
    <div className={styles.formContainer}>
        <form action="" className={styles.form}>
            <input type="text" placeholder='Name and Surname' />
            <input type="text" placeholder='Email Address' />
            <input type="text" placeholder='Phone Number (optional)' />
            <textarea name="" id="" cols="30" rows="10" placeholder='Messege'></textarea>
            <button className={styles.button}>Send</button>
        </form>
    </div>
    
  </div> 
    )
}

export default ContactPage
