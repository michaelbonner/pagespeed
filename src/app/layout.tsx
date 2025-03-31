import "./globals.css";

import { Footer } from "@/components/footer";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Providers from "./Providers";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="py-4 lg:py-10">
        <QueryErrorResetBoundary>
          <Providers>
            <div className="px-4 lg:px-10 mx-auto max-w-7xl">{children}</div>
          </Providers>
        </QueryErrorResetBoundary>

        <Footer />
      </body>
    </html>
  );
}
