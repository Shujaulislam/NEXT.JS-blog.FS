import ForgotRequestForm from "@/components/auth/ForgotRequestForm";
import ForgotResetForm from "@/components/auth/ForgotResetForm";

export default function ForgotPage({ searchParams }) {
  const token = searchParams?.token;
  return (
    <div className="mx-auto max-w-screen-sm px-4 py-16">
      {token ? (
        <ForgotResetForm token={token} />
      ) : (
        <ForgotRequestForm />
      )}
    </div>
  );
}
