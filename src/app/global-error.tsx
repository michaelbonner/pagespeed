"use client";

import { useEffect } from "react";

// Rendered in place of the root layout, so globals.css, the Inter font, and
// Tailwind are unavailable. Keep all styling inline.
const colors = {
  text: "#111827",
  muted: "#4b5563",
  sky700: "#0369a1",
  sky50: "#f0f9ff",
  red700: "#b91c1c",
};

const pill = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.5rem 1rem",
  borderRadius: "9999px",
  fontWeight: 500,
  fontSize: "1rem",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
} as const;

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#ffffff",
          color: colors.text,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          lineHeight: 1.6,
        }}
      >
        <title>Something went wrong | Bootpack PageSpeed Testing</title>
        <main
          style={{ maxWidth: "42rem", padding: "4rem 1.5rem", margin: "0" }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: colors.red700,
            }}
          >
            Error
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.1,
              fontWeight: 800,
              margin: "0.5rem 0 1.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ fontSize: "1.125rem", margin: "0 0 1rem" }}>
            Bootpack PageSpeed Testing hit an unexpected error and couldn&apos;t
            load. This is usually temporary, so try again in a moment.
          </p>
          {digest && (
            <p style={{ fontSize: "0.875rem", color: colors.muted }}>
              Reference: <code>{digest}</code>
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "2rem",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{ ...pill, background: colors.sky700, color: "#ffffff" }}
            >
              Try again
            </button>
            {/* Plain <a> on purpose: a full page load re-runs the root layout. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                ...pill,
                background: colors.sky50,
                color: colors.sky700,
              }}
            >
              Back to all sites
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
