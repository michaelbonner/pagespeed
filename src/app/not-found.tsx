import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
        404
      </p>
      <h1>Page not found</h1>
      <div className="max-w-2xl">
        <p>
          We couldn&apos;t find that page. The site may not be tracked yet, or
          the link may be out of date.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 not-prose mt-8 mb-12">
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
