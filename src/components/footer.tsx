import Link from "next/link";

export const Footer = () => {
  return (
    <div className="py-4 bg-gray-100 px-8 mt-8 rounded-lg text-gray-600">
      Made by{" "}
      <Link
        className="underline underline-offset-4"
        href="https://bootpackdigital.com"
      >
        Bootpack Digital
      </Link>
    </div>
  );
};
