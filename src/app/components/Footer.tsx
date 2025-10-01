import Link from "next/link";
import { sites } from "../data/sites";

export const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg">
      <div className="text-gray-600">
        <div>
          <h2>Sites</h2>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.entries(sites).map(([key, site]) => (
              <Link
                key={key}
                className="underline underline-offset-4 text-blue-500"
                href={`/${key}`}
              >
                {site.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="prose-sm mt-6">
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
