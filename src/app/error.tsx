"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest =
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string"
      ? error.digest
      : undefined;

  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Error
      </p>
      <h1>Something went wrong</h1>
      <div className="max-w-2xl">
        <p>
          We couldn&apos;t load these PageSpeed results. This is usually
          temporary, so try again in a moment.
        </p>
        {digest && (
          <p className="text-sm text-gray-600">
            Reference: <code>{digest}</code>
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-3 not-prose mt-8 mb-12">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex items-center px-4 py-2 rounded-full bg-sky-700 text-white font-medium hover:bg-sky-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-full bg-sky-50 text-sky-700 font-medium hover:bg-sky-100 hover:underline"
        >
          Back to all sites
        </Link>
      </div>
    </div>
  );
}
