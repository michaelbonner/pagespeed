import "./globals.css";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "./components/Footer";
import Providers from "./components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bootpack PageSpeed Testing",
  description: "PageSpeed Testing for bootpackdigital.com",
  metadataBase: new URL("https://pagespeed.bootpack.dev/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <div className="py-4 lg:py-10">
          <QueryErrorResetBoundary>
            <Providers>
              <main className="px-4 lg:px-10 mx-auto">{children}</main>
            </Providers>
          </QueryErrorResetBoundary>

          <aside className="px-4 lg:px-10 mx-auto">
            <Footer />
          </aside>
        </div>
      </body>
    </html>
  );
}
