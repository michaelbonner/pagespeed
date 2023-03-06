import "./globals.css";

export const metadata = {
  title: "PageSpeed Testing",
  description: "PageSpeed Testing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl px-10 mx-auto">{children}</div>
      </body>
    </html>
  );
}
