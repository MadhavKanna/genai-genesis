import type { Metadata } from "next";
import "@/src/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import { SiteLanguageProvider } from "@/src/components/site-language-provider";
import { AuthProvider } from "@/src/components/auth-provider";
import { CaseProvider } from "@/src/contexts/CaseContext";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import { LanguageSelector } from "@/src/components/LanguageSelector";

// Load the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GenAI Genesis",
  description: "Your AI-powered medical assistant",
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
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <SiteLanguageProvider>
              <LanguageProvider>
                <div className="relative min-h-screen flex flex-col">
                  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center justify-between">
                      <div className="flex items-center">
                        <a
                          className="mr-6 flex items-center space-x-2"
                          href="/"
                        >
                          <span className="font-bold">GenAI Genesis</span>
                        </a>
                      </div>
                      <div className="flex items-center space-x-4">
                        <LanguageSelector />
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 container py-6">
                    <CaseProvider>{children}</CaseProvider>
                  </main>
                </div>
              </LanguageProvider>
            </SiteLanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
