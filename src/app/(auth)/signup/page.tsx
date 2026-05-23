import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign Up — The Cask",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm mode="signup" />
    </div>
  );
}
