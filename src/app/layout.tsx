import "./globals.css";

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
      <body>
        <div className="max-w-7xl px-10 mx-auto">{children}</div>
      </body>
    </html>
  );
}
