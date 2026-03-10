import Link from "next/link";

export const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg">
      <div className="text-gray-600">
        <div className="prose-sm">
          ©2023-{new Date().getFullYear()}{" "}
          <Link
            className="underline underline-offset-4"
            href="https://bootpackdigital.com"
          >
            Bootpack Digital
          </Link>
          . All rights reserved.
        </div>
      </div>
    </div>
  );
};
