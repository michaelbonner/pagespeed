import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

const allowedDomains = ["bootpackdigital.com", "michaelbonner.dev"];

export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const strategy = searchParams.get("strategy") as "mobile" | "desktop";
  const url = searchParams.get("url") as string;

  const domain = new URL(url).hostname;

  if (!allowedDomains.includes(domain)) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  try {
    const cachedResults = unstable_cache(
      async (url: string, strategy: "mobile" | "desktop") =>
        getPageSpeedData(url, strategy),
      ["pagespeed-results", url, strategy],
      {
        revalidate: TWO_HOURS_IN_SECONDS,
        tags: ["pagespeed-results"],
      }
    );

    return NextResponse.json(await cachedResults(url, strategy));
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

async function getPageSpeedData(
  url: string,
  strategy: "mobile" | "desktop" = "mobile"
) {
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

  const res = await fetch(urlObject.toString(), {
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });

  if (!res.ok) {
    console.error("res data", await res.text());
    throw new Error("Failed to fetch data");
  }

  const returnData = await res.json();

  return {
    lighthouseResult: {
      categories: {
        performance: {
          score:
            returnData?.lighthouseResult?.categories?.performance?.score ?? 0,
        },
        accessibility: {
          score:
            returnData?.lighthouseResult?.categories?.accessibility?.score ?? 0,
        },
        "best-practices": {
          score:
            returnData?.lighthouseResult?.categories?.["best-practices"]
              ?.score ?? 0,
        },
        seo: {
          score: returnData?.lighthouseResult?.categories?.seo?.score ?? 0,
        },
      },
      fullPageScreenshot: {
        screenshot:
          returnData?.lighthouseResult?.fullPageScreenshot?.screenshot,
      },
    },
  };
}
