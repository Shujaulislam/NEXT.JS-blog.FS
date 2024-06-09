"use client";
import Link from "next/link";
import styles from "./links.module.css"
import NavLink from "./navLinks/navlinks";
import { useState } from "react";

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



const Links = () => {

    const [open,setOpen] = useState(false)

    //TEMPORARAY
    const session = true
    const isAdmin = false

    return (
        <div className={styles.container}>
        
        <div className={styles.links}>
        {links.map((link=>
        (<NavLink item={link} key={link.title}></NavLink>)))}
        {session ? (
            <>
            {
                isAdmin && (
                    <NavLink item={{title: "Admin", path: "/admin"}}/>
                )
            }
            <button className={styles.logout}>Logout</button>
            </>
            
        ) : (
            <NavLink item={{title: "login", path: "/login"}}/>
        )}
        </div>
        <button onClick={() => setOpen((prev) => !prev)}>Menu</button>
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