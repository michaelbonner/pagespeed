import { db } from "@/db";
import { pagesTable } from "@/db/schema";

export async function getPageSpeedData(
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

  try {
    // store in the db
    await db.insert(pagesTable).values({
      url,
      strategy,
      performanceScore:
        returnData?.lighthouseResult?.categories?.performance?.score ?? 0,
      accessibilityScore:
        returnData?.lighthouseResult?.categories?.accessibility?.score ?? 0,
      bestPracticesScore:
        returnData?.lighthouseResult?.categories?.["best-practices"]?.score ??
        0,
      seoScore: returnData?.lighthouseResult?.categories?.seo?.score ?? 0,
    });
  } catch (error) {
    console.error(error);
  }

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
    updatedAt: new Date().toISOString(),
  };
}
