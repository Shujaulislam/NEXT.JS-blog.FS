"use client"


import { useFormState } from "react-dom"
import styles from "./loginForm.module.css"
import { login } from "@/library/actions";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react"; // to use when using router
import Link from "next/link";



const LoginForm = () => {

    const [state, formAction] = useFormState (login , undefined);
    // const router = useRouter();

    // useEffect (() => {
    //     state?.success && router.push("/login"); 
    // }, [state?.success, router]);

    return (
        
        <form action={formAction} className={styles.form}>
            <input type="text" name = "username" placeholder='Name and Surname' required />
            <input type="password" name = "password" placeholder='Password' required />
            <button>Login</button>
            {state?.error && (
                <div className={styles.error}>
                    {state.error}
                </div>
            )}
            <Link href="/register">
            Don&apos;t have an account? <b>Register</b>
            </Link>
        </form>
        
    )
}

export default LoginForm