"use client"

import { useFormState } from "react-dom"
import styles from "./registerForm.module.css"
import { register } from "@/library/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";




const RegisterForm = () => {

    const [state, formAction] = useFormState (register , undefined);
    const router = useRouter();

    useEffect (() => {
        state?.success && router.push("/login"); 
    }, [state?.success, router]);

    return (
        
        <form action={formAction} className={styles.form}>
            <input type="text" name = "username" placeholder='Name and Surname' />
            <input type="email" name = "email" placeholder='Email Address' />
            <input type="password" name = "password" placeholder='Password' />
            <input type="password" name = "confirmPassword" placeholder='Confirm Password' />
            <button>Register</button>
            {state?.error}
            <Link href="/login">
            Already have an account? <b>Login</b>
            </Link>
        </form>
        
    )
}

export default RegisterForm