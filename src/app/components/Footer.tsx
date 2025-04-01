import Link from "next/link";
import { sites } from "../data/sites";

export const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10">
      <div className="grid gap-4 py-4 px-8 mt-8 text-gray-600 bg-gray-100 rounded-lg">
        <div>
          <h3 className="text-lg font-bold">Sites</h3>
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
        <div>
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
