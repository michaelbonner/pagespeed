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
    const body = await res.text();
    console.error("res data", body);

    // Surface PageSpeed's own reason (e.g. "Lighthouse returned error:
    // FAILED_DOCUMENT_REQUEST ...") so the caller's log line says why it failed
    // instead of just that it failed.
    let message = "Failed to fetch data";
    try {
      message = JSON.parse(body)?.error?.message ?? message;
    } catch {
      // not JSON; keep the generic message
    }
    throw new Error(message);
  }

  const returnData = await res.json();

  // A fetched result is only preloaded after it is stored. Let write failures
  // reach the caller so the preload job does not log them as successes.
  await db
    .insert(pagesTable)
    .values({
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
    })
    .onConflictDoNothing();

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
