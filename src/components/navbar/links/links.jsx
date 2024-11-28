"use client";

// import Link from "next/link";
import styles from "./links.module.css"
import NavLink from "./navLinks/navlinks";
import { useState } from "react";
import Image from "next/image";
import { handleGithublogout } from "@/library/actions";

const links = [
    {   title: "Homepage",
        path: "/",
    },
    {   title: "About",
        path: "/about",
    },
    {   title: "Contact",
        path: "/contact",
    },
    {   title: "Blog",
        path: "/blog",
    },

    ];



const Links = ({session}) => {

    const [open,setOpen] = useState(false)

    //TEMPORARAY
    // const session = true
    // const isAdmin = true

    return (
        <div className={styles.container}>
        
        <div className={styles.links}>
        {links.map((link=>
        (<NavLink item={link} key={link.title}></NavLink>)))}
        {session?.user ? (
            <>
            {
                session.user?.isAdmin && (
                    <NavLink item={{title: "Admin", path: "/admin"}}/>
                )
            }
             <form action={handleGithublogout}>
              <button className={styles.logout}>Logout</button>
             </form>
            </>
            
        ) : (
            <NavLink item={{title: "login", path: "/login"}}/>
        )}
        </div>
        
        <Image className={styles.menuButton} src="/menu.png" alt="menu button" width={30} height={30} onClick={() => setOpen((prev) => !prev)}/>
        {
            open && <div className={styles.mobileLinks}>
            {links.map((link) => (
                <NavLink item={link} key={link.title}/>
            ))}
            </div>
        }
        </div>
    )
}

export default Links