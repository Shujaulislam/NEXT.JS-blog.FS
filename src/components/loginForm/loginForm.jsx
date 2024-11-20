"use client"


import { useFormState } from "react-dom"
import styles from "./loginForm.module.css"
import { login } from "@/library/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";




const LoginForm = () => {

    const [state, formAction] = useFormState (login , undefined);
    const router = useRouter();

    // useEffect (() => {
    //     state?.success && router.push("/login"); 
    // }, [state?.success, router]);

    return (
        
        <form action={formAction} className={styles.form}>
            <input type="text" name = "username" placeholder='Name and Surname' />
            <input type="password" name = "password" placeholder='Password' />
            <button>Login</button>
            {state?.error}
            <Link href="/register">
            Don&apos;t have an account? <b>Register</b>
            </Link>
        </form>
        
    )
}

export default LoginForm