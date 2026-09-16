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
      </div>
      <div className="grid gap-2 py-2">
        <div className="h-4 w-48 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-64 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};
