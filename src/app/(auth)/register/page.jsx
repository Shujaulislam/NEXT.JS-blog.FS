import { register } from "@/library/actions"
import styles from "./register.module.css"

const RegisterPage = () => {
    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
        <form action={register} className={styles.form}>
            <input type="text" name = "username" placeholder='Name and Surname' />
            <input type="email" name = "email" placeholder='Email Address' />
            <input type="password" name = "password" placeholder='Password' />
            <input type="password" name = "confirmPassword" placeholder='Confirm Password' />
            <button>Register</button>
        </form>
        </div>
        </div>
    )
}

export default RegisterPage
