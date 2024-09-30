'use client';

import './globals.css';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/user-context";

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
          <Toaster />
          <ThemeSwitcher />
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  );
}
