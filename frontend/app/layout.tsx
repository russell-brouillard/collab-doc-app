// frontend/app/layout.tsx

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

import MyNavbar from "@/components/myNavbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {/* Navigation Bar */}
          <MyNavbar />

          {/* Main Content */}
          <main className="container mx-auto w-full max-w-screen-xl pt-16 px-8 flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full px-8 py-6 flex items-center justify-center"></footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
