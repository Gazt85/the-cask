import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getServerLocale, getT } from "@/lib/i18n-server";
import { LocaleProvider } from "@/lib/i18n-client";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t('brand'),
    description: t('meta.description'),
    icons: {
      icon: '/logo.png?v=1',
      shortcut: '/logo.png?v=1',
      apple: '/logo.png?v=1',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      style={
        {
          "--font-sans": "var(--font-inter)",
          "--font-heading": "var(--font-playfair)",
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale}>
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
