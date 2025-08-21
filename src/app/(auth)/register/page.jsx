import RegisterForm from "@/components/auth/RegisterForm";
import ErrorBoundary from "@/components/auth/ErrorBoundary";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-screen-sm px-4 py-16 sm:py-24 lg:py-32">
      <ErrorBoundary>
        <RegisterForm />
      </ErrorBoundary>
    </main>
  )
}