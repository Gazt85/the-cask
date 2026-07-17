"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useT } from "@/lib/i18n-client";

interface AuthFormProps {
  mode: "login" | "signup";
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M12 10.2v3.96h5.52c-.24 1.44-1.68 4.2-5.52 4.2-3.32 0-6.04-2.76-6.04-6.16S8.68 6.04 12 6.04c1.88 0 3.16.8 3.88 1.48l2.64-2.56C16.84 3.4 14.64 2.4 12 2.4 6.76 2.4 2.52 6.64 2.52 11.88s4.24 9.48 9.48 9.48c5.48 0 9.12-3.84 9.12-9.24 0-.64-.08-1.12-.16-1.6H12z"
      />
      <path
        fill="#4285F4"
        d="M21.12 12.12c0-.64-.08-1.12-.16-1.6H12v3.04h5.16c-.24.84-.96 2.16-2.76 3.04l2.68 2.08c1.6-1.48 2.52-3.64 2.52-6.56z"
      />
      <path
        fill="#FBBC05"
        d="M5.96 14.04l-.68.52-2.4 1.88C4.4 19.04 7.96 21.36 12 21.36c2.64 0 4.84-.88 6.48-2.36l-2.68-2.08c-.72.52-1.72.88-3.8.88-2.92 0-5.4-1.92-6.04-4.6z"
      />
      <path
        fill="#34A853"
        d="M2.88 8.04C2.32 9.16 2 10.48 2 11.88s.32 2.72.88 3.84l3.08-2.4c-.16-.48-.28-1-.28-1.44s.12-.96.28-1.44L2.88 8.04z"
      />
    </svg>
  );
}

export function AuthForm({ mode }: AuthFormProps) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const isLogin = mode === "login";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "auth") {
      toast.error(t('auth.oauth_error'));
      // Clean the URL so the toast doesn't fire again on remount.
      params.delete("error");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (qs ? `?${qs}` : "")
      );
    }
  }, [t]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    if (result.error) {
      toast.error(result.error.message);
    } else if (!isLogin) {
      toast.success(t('auth.check_email'));
    }

    setLoading(false);
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    const result = await signInWithGoogle();
    if (result.error) {
      toast.error(result.error.message);
      setGoogleLoading(false);
    }
    // On success the browser is redirected to Google, so we leave loading=true.
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="font-heading text-2xl font-bold">
          {isLogin ? t('auth.welcome_back') : t('auth.create_account')}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? t('auth.signin_description')
            : t('auth.signup_description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
        >
          <GoogleIcon className="h-4 w-4" />
          {googleLoading
            ? t('auth.loading')
            : t('auth.continue_with_google')}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.or_continue_with')}
            </span>
          </div>
        </div>
      </CardContent>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t('auth.password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword
                    ? t('auth.hide_password')
                    : t('auth.show_password')
                }
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-8 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-r-lg"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading || googleLoading}
          >
            {loading
              ? t('auth.loading')
              : isLogin
                ? t('auth.signin')
                : t('auth.signup')}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {isLogin ? (
              <>
                {t('auth.no_account')}{" "}
                <Link href="/signup" className="text-primary underline">
                  {t('auth.signup')}
                </Link>
              </>
            ) : (
              <>
                {t('auth.have_account')}{" "}
                <Link href="/login" className="text-primary underline">
                  {t('auth.signin')}
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
