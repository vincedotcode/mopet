'use client';

import './globals.css';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/user-context";
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <UserProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
          <Analytics />
          <Toaster />
          <ThemeSwitcher />
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  );
}
