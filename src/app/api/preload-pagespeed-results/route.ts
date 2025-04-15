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

  // preload all the pages with a 500ms delay between each
  await Promise.all(
    pageUrlsWithStrategyToFetch.map((page, index) =>
      new Promise((resolve) => setTimeout(resolve, 500 * index)).then(() =>
        getPageSpeedData(page.url, page.strategy)
      )
    )
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

  return NextResponse.json({
    success: `Total pages preloaded: ${pageUrlsWithStrategyToFetch.length}`,
  });
};
