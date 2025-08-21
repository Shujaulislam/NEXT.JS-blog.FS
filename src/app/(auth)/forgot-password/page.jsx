import ForgotRequestForm from "@/components/auth/ForgotRequestForm";
import ForgotResetForm from "@/components/auth/ForgotResetForm";
import ErrorBoundary from "@/components/auth/ErrorBoundary";

export default function ForgotPage({ searchParams }) {
  const token = searchParams?.token;
  return (
    <div className="mx-auto max-w-screen-sm px-4 py-16">
      <ErrorBoundary>
        {token ? (
          <ForgotResetForm token={token} />
        ) : (
          <ForgotRequestForm />
        )}
      </ErrorBoundary>
    </div>
  );
}
