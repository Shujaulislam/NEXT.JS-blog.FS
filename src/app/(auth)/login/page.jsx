import { handleGithublogin } from "@/library/actions";

const LoginPage = async () => {

    return (
        <div>
        <form action={handleGithublogin}>
        <button>login with GitHub</button>
        </form>
        </div>
    )
}

export default LoginPage
