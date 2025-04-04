"use client";

import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import Link from "next/link";
import { IoAlertCircleOutline } from "react-icons/io5";

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
        <div className="flex lg:items-center gap-2">
          <div className="shrink-0 pt-0.5 lg:pt-0">
            <IoAlertCircleOutline className="size-5 text-yellow-700/50" />
          </div>
          <div>
            <p className="text-yellow-700">
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
    <div>
      <p className="text-sm text-gray-500">
        Last updated:{" "}
        {data?.updatedAt ? new Date(data?.updatedAt).toLocaleString() : "N/A"}
      </p>
      <div className="grid w-full flex-wrap grid-cols-2 gap-2 py-4 text-center sm:grid-cols-5 2xl:grid-cols-6 lg:inline-grid">
        <div className="flex flex-col gap-2 justify-center border rounded-2xl p-4 w-full">
          <CategoryScore
            pageSpeedLink={pageSpeedLink}
            score={performanceScore}
          />
          <div className="text-sm lg:text-base font-bold text-gray-700">
            Performance
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center border rounded-2xl p-4 w-full">
          <CategoryScore
            pageSpeedLink={pageSpeedLink}
            score={accessibilityScore}
          />
          <div className="text-sm lg:text-base font-bold text-gray-700">
            Accessibility
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center border rounded-2xl p-4 w-full">
          <CategoryScore
            pageSpeedLink={pageSpeedLink}
            score={bestPracticesScore}
          />
          <div className="text-sm lg:text-base font-bold text-gray-700">
            Best Practices
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center border rounded-2xl p-4 w-full">
          <CategoryScore pageSpeedLink={pageSpeedLink} score={seoScore} />
          <div className="text-sm lg:text-base font-bold text-gray-700">
            SEO
          </div>
        </div>
        {!!screenshot && (
          <div
            className={clsx(
              "w-full h-full col-span-2 overflow-y-auto rounded-lg border border-gray-200 overflow-hidden max-h-[300px] lg:max-h-[200px] lg:max-w-[300px]",
              "sm:col-span-1",
              "2xl:col-span-2 2xl:max-h-[300px]",
              strategy === "mobile"
                ? "aspect-5/8 max-w-[300px] 2xl:max-w-[300px] mx-auto"
                : "aspect-3/2 2xl:max-w-[500px]"
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
