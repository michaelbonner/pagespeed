"use client";

import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Link from "next/link";

const getPageSpeedData = async (
  url: string,
  strategy: "mobile" | "desktop"
) => {
  const res = await fetch(
    `/api/get-pagespeed-results?url=${url}&strategy=${strategy}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const PageSpeedResult = ({
  pageSpeedLink,
  strategy,
  url,
}: {
  pageSpeedLink: string;
  strategy: "mobile" | "desktop";
  url: string;
}) => {
  const { data, status } = useQuery({
    queryKey: ["pageSpeedData", url, strategy],
    queryFn: () => getPageSpeedData(url, strategy),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (status === "pending") {
    return (
      <p className="text-sm text-gray-500 py-4 animate-pulse">
        Loading results...
      </p>
    );
  }

  if (status === "error") {
    return (
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="size-5 text-yellow-400"
              aria-hidden="true"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              There was an error loading this data via the api.{" "}
              <a
                className="font-medium text-yellow-700 underline hover:text-yellow-600"
                href={pageSpeedLink}
                rel="noreferrer"
                target="_blank"
              >
                Use this link to view it on pagespeed.web.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

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
  const screenshot = data?.lighthouseResult?.fullPageScreenshot?.screenshot;

  return (
    <div className="grid flex-wrap grid-cols-2 gap-12 py-4 px-8 text-center sm:grid-cols-5 2xl:grid-cols-6 lg:inline-grid">
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
      {!!screenshot && (
        <div
          className={clsx(
            "w-full col-span-2 overflow-y-auto rounded-lg border border-gray-200",
            "sm:col-span-1",
            "2xl:col-span-2 2xl:-translate-y-3",
            strategy === "mobile" ? "aspect-2/3" : "aspect-3/2"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Page Speed Screenshot"
            className="w-full object-fill"
            height={screenshot.height}
            src={screenshot.data}
            width={screenshot.width}
          />
        </div>
      )}
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
