"use client";

import { DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/user-context";


const dmSans = DM_Sans({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className} suppressHydrationWarning={true}>
        <SessionProvider>
          <UserProvider >
            <ThemeProvider attribute="class" disableTransitionOnChange>
              {children}
              <Toaster />
              <ThemeSwitcher />
            </ThemeProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
