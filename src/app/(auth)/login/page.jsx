import LoginForm from "@/components/auth/LoginForm";
import ErrorBoundary from "@/components/auth/ErrorBoundary";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-screen-sm px-4 py-16 sm:py-24 lg:py-32">
      <ErrorBoundary>
        <LoginForm />
      </ErrorBoundary>
    </main>
  )
}