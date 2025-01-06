import Link from "next/link";

export const Footer = () => {
  return (
    <div className="py-4 px-8 mt-8 text-gray-600 bg-gray-100 rounded-lg">
      ©2023-{new Date().getFullYear()}{" "}
      <Link
        className="underline underline-offset-4"
        href="https://bootpackdigital.com"
      >
        Bootpack Digital
      </Link>
      . All rights reserved.
    </div>
  );
};
