import LoginForm from "@/components/loginForm/loginForm";
import { handleGithublogin } from "@/library/actions";
import styles from "./login.module.css"

const LoginPage = () => {

    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
        <form action={handleGithublogin}>
        <button className={styles.github}>Login with GitHub</button>
        </form>
        <LoginForm />
        </div>
        </div>
    )
}

export default LoginPage
