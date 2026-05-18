import { db } from "@/db";
import { pagesTable } from "@/db/schema";
import { gte } from "drizzle-orm";
import { getUrls, sites } from "../data/sites";
import type { SiteAverage } from "../components/SiteCard";

export async function getSiteAverages(
  siteSlugs: (keyof typeof sites)[] = Object.keys(sites) as (keyof typeof sites)[],
): Promise<SiteAverage[]> {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const recentRuns = await db
    .select()
    .from(pagesTable)
    .where(gte(pagesTable.createdAt, fiveDaysAgo));

  return siteSlugs.map((slug) => {
    const site = sites[slug];
    const siteUrls = getUrls(slug);
    const runsForSite = recentRuns.filter((run) => siteUrls.includes(run.url));

    if (runsForSite.length === 0) {
      return {
        slug,
        title: site.title,
        hasData: false,
      };
    }

    const avg = (
      field:
        | "performanceScore"
        | "accessibilityScore"
        | "bestPracticesScore"
        | "seoScore",
    ) => {
      const sum = runsForSite.reduce(
        (acc, run) => acc + Number(run[field]),
        0,
      );
      return Math.round((sum / runsForSite.length) * 100);
    };

    return {
      slug,
      title: site.title,
      hasData: true,
      performance: avg("performanceScore"),
      accessibility: avg("accessibilityScore"),
      bestPractices: avg("bestPracticesScore"),
      seo: avg("seoScore"),
      runsCount: runsForSite.length,
    };
  });
}
