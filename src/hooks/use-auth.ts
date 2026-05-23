"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthService } from "@/services";
import type { User } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = useMemo(() => getAuthService(), []);

  useEffect(() => {
    auth.getSession().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  }, [auth]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await auth.signIn(email, password);
      if (result.data) {
        setUser(result.data);
        router.push("/dashboard");
      }
      return result;
    },
    [auth, router]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      const result = await auth.signUp(email, password);
      return result;
    },
    [auth]
  );

  const signOut = useCallback(async () => {
    await auth.signOut();
    setUser(null);
    router.push("/");
  }, [auth, router]);

  return { user, loading, signIn, signUp, signOut };
}
