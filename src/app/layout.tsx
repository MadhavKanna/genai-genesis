import type React from "react";
import "@/src/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { SiteLanguageProvider } from "@/src/components/site-language-provider";
import { AuthProvider } from "@/src/components/auth-provider";

// Load the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Symedon - Connecting Patients with Global Medical Expertise",
  description:
    "A platform connecting patients with medical professionals worldwide for health guidance.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <SiteLanguageProvider>{children}</SiteLanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
