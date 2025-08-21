"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { requestPasswordReset } from "@/library/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ForgotRequestForm({ className }) {
  const [state, setState] = useState({ error: null, success: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Handle form submission
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setState({ error: null, success: null });
    
    startTransition(async () => {
      try {
        const result = await requestPasswordReset(null, formData);
        setState(result);
      } catch {
        setState({ error: "An unexpected error occurred. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  // If already authenticated, redirect
  if (status === "loading") {
    return (
      <div className={cn("shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black", className)}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (session?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className={cn("shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black", className)}>
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Forgot your password?</h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Enter your email and we&apos;ll generate a reset link.
      </p>

      <form className="my-8" action={handleSubmit}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="you@example.com" type="email" required />
        </LabelInputContainer>

        {state?.error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </div>
        )}
        {state?.success && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
            {state.success}
            {state.token && (
              <div className="mt-2 text-xs opacity-80">Dev link: /forgot-password?token={state.token}</div>
            )}
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Sending reset link...
            </span>
          ) : (
            <>
              Send reset link →
              <BottomGradient />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);



