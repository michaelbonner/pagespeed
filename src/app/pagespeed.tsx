import Link from "next/link";
import { Suspense } from "react";

export default async function PageSpeed({ url }: { url: string }) {
  const pageSpeedLink = `https://pagespeed.web.dev/report?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="grid gap-4 relative">
      <div className="grid gap-4 lg:flex lg:flex-wrap lg:gap-16 items-end">
        <h2 className="font-bold text-lg lg:text-2xl text-sky-600">
          <Link
            className="break-all underline underline-offset-8"
            target="_blank"
            href={url}
          >
            {url}
          </Link>
        </h2>
        <div>
          <Link
            className="text-sky-600 underline underline-offset-4 flex items-center gap-2"
            href={pageSpeedLink}
            target="_blank"
          >
            <svg
              className="transition-transform group-hover:scale-110"
              style={{
                width: "20px",
                height: "20px",
              }}
              height="2500"
              width="2500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 520.331"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M0 106.667h512v320H0z" fill="#def"></path>
                <path
                  d="M512 106.667H0V42.56C0 19.055 19.137 0 42.772 0h426.456C492.85 0 512 19.032 512 42.56z"
                  fill="#bdf"
                ></path>
                <path
                  d="M128 74.667c-11.782 0-21.333-9.552-21.333-21.334S116.217 32 128 32s21.333 9.551 21.333 21.333c0 11.782-9.55 21.334-21.333 21.334zm-74.667 0C41.551 74.667 32 65.115 32 53.333S41.551 32 53.333 32c11.782 0 21.334 9.551 21.334 21.333 0 11.782-9.552 21.334-21.334 21.334z"
                  fill="#fff"
                ></path>
                <path
                  d="M85.333 426.667H0c0-65.516 24.994-131.033 74.98-181.02 99.975-99.974 262.065-99.974 362.04 0l-60.34 60.34C345.795 275.103 303.128 256 256 256c-94.257 0-170.667 76.41-170.667 170.667z"
                  fill="#06f"
                ></path>
                <path
                  d="M426.667 426.667H512c0-65.516-24.994-131.033-74.98-181.02l-60.34 60.34c30.884 30.885 49.987 73.551 49.987 120.68z"
                  fill="#c6f"
                ></path>
                <path
                  d="M195.66 487.006c-33.325-33.324-33.325-87.354 0-120.68 33.325-33.324 218.732-98.051 218.732-98.051s-64.727 185.407-98.052 218.731c-33.325 33.325-87.355 33.325-120.68 0z"
                  fill="#6cf"
                ></path>
                <path
                  d="M256 469.333c-23.564 0-42.667-19.102-42.667-42.666C213.333 403.103 232.436 384 256 384s42.667 19.103 42.667 42.667-19.103 42.666-42.667 42.666z"
                  fill="#06f"
                ></path>
              </g>
            </svg>{" "}
            Result Link
          </Link>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Mobile</h3>
      <PageSpeedResult
        pageSpeedLink={`${pageSpeedLink}&form_factor=mobile`}
        strategy="mobile"
        url={url}
      />
      <h3 className="text-lg font-semibold">Desktop</h3>
      <PageSpeedResult
        pageSpeedLink={`${pageSpeedLink}&form_factor=desktop`}
        strategy="desktop"
        url={url}
      />
    </div>
  );
}

async function getPageSpeedData(
  url: string,
  strategy: "mobile" | "desktop" = "mobile"
) {
  try {
    const urlObject = new URL(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    );
    urlObject.searchParams.append("url", url);
    urlObject.searchParams.append("key", process.env.GOOGLE_API_KEY || "");
    urlObject.searchParams.append("category", "performance");
    urlObject.searchParams.append("category", "accessibility");
    urlObject.searchParams.append("category", "best-practices");
    urlObject.searchParams.append("category", "seo");
    urlObject.searchParams.append("strategy", strategy);

    console.log("urlObject", urlObject.toString());

    const res = await fetch(urlObject.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("res", await res.json());
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

const PageSpeedResult = async ({
  pageSpeedLink,
  strategy,
  url,
}: {
  pageSpeedLink: string;
  strategy: "mobile" | "desktop";
  url: string;
}) => {
  const pageSpeedData = getPageSpeedData(url, strategy);
  const data = await pageSpeedData;

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
    <div>
      <Suspense
        fallback={
          <div className="bg-gray-50 border rounded-xl px-8 py-4 grid lg:inline-grid grid-cols-2 lg:grid-cols-4 gap-12 flex-wrap text-center animate-pulse">
            {["Performance", "Accessibility", "Best Practices", "SEO"].map(
              (category) => (
                <div className="grid gap-2" key={category}>
                  <div className="font-bold">{category}</div>
                  <a
                    className="flex justify-center items-center"
                    target="_blank"
                    href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(
                      url
                    )}open-source&amp;form_factor=desktop`}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white bg-gray-500"></div>
                  </a>
                </div>
              )
            )}
          </div>
        }
      >
        <div className="px-8 py-4 grid lg:inline-grid grid-cols-2 sm:grid-cols-4 gap-12 flex-wrap text-center">
          <div className="grid gap-2">
            <CategoryScore
              pageSpeedLink={pageSpeedLink}
              score={performanceScore}
            />
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
            <div className="text-sm font-bold text-gray-700">
              Best Practices
            </div>
          </div>
          <div className="grid gap-2">
            <CategoryScore pageSpeedLink={pageSpeedLink} score={seoScore} />
            <div className="text-sm font-bold text-gray-700">SEO</div>
          </div>
        </div>
      </Suspense>
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
    if (score === 100) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#16a34a",
      };
    } else if (score >= 90) {
      return {
        background: "#f0fdf4",
        color: "#166534",
        ring: "#4ade80",
      };
    } else if (score >= 80) {
      return {
        background: "#fefce8",
        color: "#854d0e",
        ring: "#eab308",
      };
    } else {
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
          className="relative w-[80px] h-[80px] rounded-full"
          style={{
            backgroundColor: background,
            color: color,
          }}
        >
          <div
            className="w-[80px] h-[80px] rounded-full transition-all"
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
            {score}
            <span className="text-[8px] pb-1">%</span>
          </div>
        </div>
      </Link>
    </>
  );
};
