import { AuthForm } from "@/components/auth/auth-form";

export const metadata = {
  title: "Sign In — The Cask",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthForm mode="login" />
    </div>
  );
}
