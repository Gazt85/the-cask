import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n-server";

export default async function Home() {
  const t = await getT();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <span className="flex items-center gap-2 font-heading text-lg font-bold tracking-wide text-amber">
            <Image src="/logo.png" alt="The Cask" width={36} height={24} />
            {t('brand')}
          </span>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" render={<Link href="/login" />}>
              {t('auth.signin')}
            </Button>
            <Button render={<Link href="/signup" />}>
              {t('auth.get_started')}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center space-y-8 max-w-2xl">
          <Image
            src="/logo.png"
            alt="The Cask"
            width={240}
            height={160}
            className="mx-auto"
            priority
          />
          <p className="text-sm font-medium tracking-widest uppercase text-amber-dark">
            {t('brand.tagline')}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('landing.headline')}{" "}
            <span className="text-amber">{t('landing.headline.accent')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t('landing.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" render={<Link href="/signup" />}>
              {t('landing.cta')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/login" />}
            >
              {t('auth.signin')}
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          {t('brand.footer')}
        </div>
      </footer>
    </div>
  );
}
