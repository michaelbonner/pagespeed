import { clsx } from "clsx";

const CATEGORY_LABELS = [
  "Performance",
  "Accessibility",
  "Best Practices",
  "SEO",
];

export const PageSpeedSkeleton = ({
  strategy,
}: {
  strategy: "mobile" | "desktop";
}) => {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={`Loading ${strategy} PageSpeed results`}
    >
      <p className="sr-only">Loading {strategy} results…</p>
      <div className="grid w-full flex-wrap grid-cols-2 gap-2 py-4 text-center sm:grid-cols-5 2xl:grid-cols-6 lg:inline-grid">
        {CATEGORY_LABELS.map((label) => (
          <div
            key={label}
            className="flex flex-col gap-2 justify-center items-center border rounded-2xl p-4 w-full"
          >
            <div className="w-25 h-25 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
        {/* Results can include a full-page screenshot rendered in this exact
         * grid slot (see PagespeedResult.tsx) — up to 300px tall, its own row
         * below sm, the fifth column at sm, and two columns again at 2xl.
         * Placeholder the same cell so the grid doesn't jump when loading
         * completes and the screenshot replaces it. */}
        <div
          className={clsx(
            "w-full h-full col-span-2 rounded-lg border border-gray-200 animate-pulse bg-gray-200/60",
            "sm:col-span-1",
            "2xl:col-span-2",
            strategy === "mobile"
              ? "aspect-5/8 max-w-[300px] 2xl:max-w-[300px] mx-auto"
              : "aspect-3/2 2xl:max-w-[500px]",
          )}
        />
      </div>
      <div className="grid gap-2 py-2">
        <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-64 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};
