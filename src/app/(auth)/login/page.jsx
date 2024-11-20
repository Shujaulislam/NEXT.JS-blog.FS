import { handleGithublogin, login } from "@/library/actions";

const LoginPage = async () => {

    return (
        <div>
        <form action={handleGithublogin}>
        <button>login with GitHub</button>
        </form>
        <form action={login}>
        <input type="text" name = "username" placeholder='Username' />
        <input type="password" name = "password" placeholder='Password' />
        <button>login with Credentials</button>
        </form>
        </div>
    )
}

export default LoginPage
