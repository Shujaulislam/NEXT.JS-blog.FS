import Link from "next/link"
import Links from "./links/links"
import styles from "./navbar.module.css"
import { auth } from "@/library/auth";

const Navbar = async () => {
    
    const session = await auth();

    console.log(session);

    return (
        <>
        <div className={styles.container}>
        <Link href="/" className={styles.logo}>Logo</Link>
        <Links session = {session}/>
        </div>
        </>
    )
}

export default Navbar