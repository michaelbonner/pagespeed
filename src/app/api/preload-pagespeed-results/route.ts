import { sites } from "@/app/data/sites";
import { getPageSpeedData } from "@/app/functions/getPagespeedData";
import { db } from "@/db";
import { pagesTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

type PageUrlAndStrategy = {
  url: string;
  strategy: "mobile" | "desktop";
};

export const GET = async () => {
  const allDbEntriesWithinTheLastTwelveHours = await db
    .select({
      url: pagesTable.url,
      strategy: pagesTable.strategy,
    })
    .from(pagesTable)
    .where(sql`"createdAt" > NOW() - INTERVAL '12 hours'`);

  // load all urls from the data file
  const allSitePages = Object.values(sites).flatMap((site) =>
    site.paths.map((path) => `${site.baseUrl}${path}`)
  );

  // get all the pages that need to be preloaded
  const pagesStrategyToFetch = allSitePages.reduce((acc, page) => {
    const strategies = ["mobile", "desktop"] as const;

    for (const strategy of strategies) {
      const key = `${strategy}-${page}`;

      if (
        !acc[key] &&
        !allDbEntriesWithinTheLastTwelveHours.some(
          (entry) => entry.url === page && entry.strategy === strategy
        )
      ) {
        acc[key] = {
          url: page,
          strategy,
        };
      }
    }

    return acc;
  }, {} as Record<string, PageUrlAndStrategy>);

  const pageUrlsWithStrategyToFetch = Object.values(pagesStrategyToFetch).slice(
    0,
    20
  );

  if (pageUrlsWithStrategyToFetch.length === 0) {
    return NextResponse.json(
      {
        success: "No pages to preload",
      },
      {
        headers: {
          code: "304",
        },
      }
    );
  }

  // preload all the pages with a 500ms delay between each
  //
  // allSettled, not all: PageSpeed Insights fails on individual pages that
  // Lighthouse cannot get through ("Lighthouse returned error: Something went
  // wrong"), and getPageSpeedData throws on any non-OK response. Under
  // Promise.all one such page rejected the whole batch, so the route 500'd and
  // the cron went red even though the other 19 pages were fine. Worse, a page
  // that throws never gets a row written, so it stayed in the candidate set and
  // poisoned every subsequent run.
  const results = await Promise.allSettled(
    pageUrlsWithStrategyToFetch.map((page, index) =>
      new Promise((resolve) => setTimeout(resolve, 500 * index)).then(() =>
        getPageSpeedData(page.url, page.strategy)
      )
    )
  );

  const failures = results.flatMap((result, index) =>
    result.status === "rejected"
      ? [{ page: pageUrlsWithStrategyToFetch[index], reason: result.reason }]
      : []
  );

  for (const { page, reason } of failures) {
    console.error(
      `preload failed: ${page.strategy} ${page.url}`,
      reason instanceof Error ? reason.message : reason
    );
  }

  const preloaded = results.length - failures.length;

  // Every single page failing is not a flaky page, it is something systemic —
  // an expired API key, no network, a dead database. Report that as an error so
  // the schedule goes red; a handful of flaky pages should not.
  if (preloaded === 0) {
    return NextResponse.json(
      {
        error: `All ${results.length} pages failed to preload`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: `Total pages preloaded: ${preloaded}`,
    ...(failures.length > 0 && { failed: failures.length }),
  });
};
