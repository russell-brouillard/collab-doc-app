// frontend/app/layout.tsx

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ClerkProvider } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { TwitterIcon } from "@/components/icons";
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
          <div className="relative flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <MyNavbar />

            {/* Main Content */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>

            {/* Footer */}
            <footer className="w-full flex items-center justify-center py-3">
              <a
                aria-label="Twitter"
                className="flex items-center"
                href={siteConfig.links.twitter}
                rel="noopener noreferrer"
                target="_blank"
              >
                <TwitterIcon className="text-default-500 w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
