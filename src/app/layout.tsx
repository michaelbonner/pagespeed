import "./globals.css";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { Footer } from "./components/Footer";
import Providers from "./components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Bootpack PageSpeed Testing",
  description: "PageSpeed Testing for bootpackdigital.com",
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
      <body className="py-4 lg:py-10">
        <QueryErrorResetBoundary>
          <Providers>
            <div className="px-4 lg:px-10 mx-auto max-w-[100rem]">
              {children}
            </div>
          </Providers>
        </QueryErrorResetBoundary>

        <Footer />
      </body>
    </html>
  );
}
