"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useT } from "@/lib/i18n-client";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar() {
  const t = useT();
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-wide text-amber"
        >
          <Image
            src="/logo.png"
            alt="The Cask"
            width={90}
            height={60}
            className="h-[40px] w-auto sm:h-[60px]"
          />
          {t('brand')}
        </Link>

        <nav className="flex items-center gap-3">
          <LocaleSwitcher />
          {loading ? null : user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" render={<Link href="/cabinet" />}>
                {t('nav.cabinet')}
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" render={<Link href="/search" />}>
                {t('nav.add_whisky')}
              </Button>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger className="relative h-8 w-8 rounded-full cursor-pointer">
                  <Avatar className="h-8 w-8 border border-amber/30">
                    <AvatarFallback className="bg-amber/10 text-amber text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.full_name ?? t('nav.user_fallback')}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className={pathname === '/cabinet' ? 'bg-accent text-accent-foreground' : ''} onClick={() => setDropdownOpen(false)}>
                    <Link href="/cabinet">{t('nav.cabinet')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={pathname === '/dashboard' ? 'bg-accent text-accent-foreground' : ''} onClick={() => setDropdownOpen(false)}>
                    <Link href="/dashboard">{t('nav.dashboard')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={pathname === '/guide' ? 'bg-accent text-accent-foreground' : ''} onClick={() => setDropdownOpen(false)}>
                    <Link href="/guide">{t('nav.guide')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={pathname === '/settings' ? 'bg-accent text-accent-foreground' : ''} onClick={() => setDropdownOpen(false)}>
                    <Link href="/settings">{t('nav.settings')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    signOut();
                    setDropdownOpen(false);
                  }}>
                    {t('auth.signout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" render={<Link href="/login" />}>
                {t('auth.signin')}
              </Button>
              <Button render={<Link href="/signup" />}>
                {t('auth.get_started')}
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
