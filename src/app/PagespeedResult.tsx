import { getPageSpeedData } from "@/functions/getPagespeedData";
import Link from "next/link";

export const PageSpeedResult = async ({
  pageSpeedLink,
  strategy,
  url,
}: {
  pageSpeedLink: string;
  strategy: "mobile" | "desktop";
  url: string;
}) => {
  const data = await getPageSpeedData(url, strategy);

  const categories = data?.lighthouseResult?.categories || {
    performance: { score: 0 },
    accessibility: { score: 0 },
    "best-practices": { score: 0 },
    seo: { score: 0 },
  };

  const {
    performance,
    accessibility,
    "best-practices": bestPractices,
    seo,
  } = categories;

  const performanceScore = performance.score * 100;
  const accessibilityScore = accessibility.score * 100;
  const bestPracticesScore = bestPractices.score * 100;
  const seoScore = seo.score * 100;

  return (
    <div className="grid flex-wrap grid-cols-2 gap-12 py-4 px-8 text-center sm:grid-cols-4 lg:inline-grid">
      <div className="grid gap-2">
        <CategoryScore pageSpeedLink={pageSpeedLink} score={performanceScore} />
        <div className="text-sm font-bold text-gray-700">Performance</div>
      </div>
      <div className="grid gap-2">
        <CategoryScore
          pageSpeedLink={pageSpeedLink}
          score={accessibilityScore}
        />
        <div className="text-sm font-bold text-gray-700">Accessibility</div>
      </div>
      <div className="grid gap-2">
        <CategoryScore
          pageSpeedLink={pageSpeedLink}
          score={bestPracticesScore}
        />
        <div className="text-sm font-bold text-gray-700">Best Practices</div>
      </div>
      <div className="grid gap-2">
        <CategoryScore pageSpeedLink={pageSpeedLink} score={seoScore} />
        <div className="text-sm font-bold text-gray-700">SEO</div>
      </div>
    </div>
  );
};

const CategoryScore = ({
  pageSpeedLink,
  score,
}: {
  pageSpeedLink: string;
  score: number;
}) => {
  const getColors = (score: number) => {
    if (score === 0) {
      return {
        background: "#fef2f2",
        color: "#991b1b",
        ring: "#ef4444",
      };
    }
    if (score === 100) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#16a34a",
      };
    }
    if (score >= 90) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#4ade80",
      };
    }
    if (score >= 50) {
      return {
        background: "#fefce8",
        color: "#854d0e",
        ring: "#eab308",
      };
    }
    {
      return {
        background: "#fef2f2",
        color: "#991b1b",
        ring: "#ef4444",
      };
    }
  };

  const { background, color, ring } = getColors(score);

  return (
    <>
      <Link
        className="flex justify-center items-center"
        href={pageSpeedLink}
        target="_blank"
      >
        <div
          className="relative rounded-full w-[80px] h-[80px]"
          style={{
            backgroundColor: background,
            color: color,
          }}
        >
          <div
            className="rounded-full transition-all w-[80px] h-[80px]"
            style={{
              background: `conic-gradient(${ring} ${Math.floor(
                360 * (score / 100)
              )}deg, transparent 0deg)`,
            }}
          />
          <div
            className={`absolute inset-[5px] w-[70px] h-[70px] bg-white rounded-full flex items-center justify-center font-bold pl-1`}
            style={{
              backgroundColor: background,
            }}
          >
            {Math.round(score) || "N/A"}
            {score > 0 && <span className="pb-1 text-[8px]">%</span>}
          </div>
        </div>
      </Link>
    </>
  );
};
