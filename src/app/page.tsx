import { db } from "@/db";
import { pagesTable } from "@/db/schema";
import { gte } from "drizzle-orm";
import Link from "next/link";
import { CategoryScore } from "./components/CategoryScore";
import { sites, getUrls } from "./data/sites";

export const dynamic = "force-dynamic";

export default async function Home() {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const recentRuns = await db
    .select()
    .from(pagesTable)
    .where(gte(pagesTable.createdAt, fiveDaysAgo));

  const siteAverages = Object.entries(sites).map(([slug, site]) => {
    const siteUrls = getUrls(slug as keyof typeof sites);
    const runsForSite = recentRuns.filter((run) => siteUrls.includes(run.url));

    if (runsForSite.length === 0) {
      return {
        slug,
        title: site.title,
        hasData: false as const,
      };
    }

    const avg = (field: 'performanceScore' | 'accessibilityScore' | 'bestPracticesScore' | 'seoScore') => {
      const sum = runsForSite.reduce((acc, run) => acc + Number(run[field]), 0);
      return Math.round((sum / runsForSite.length) * 100);
    };

    return {
      slug,
      title: site.title,
      hasData: true as const,
      performance: avg("performanceScore"),
      accessibility: avg("accessibilityScore"),
      bestPractices: avg("bestPracticesScore"),
      seo: avg("seoScore"),
      runsCount: runsForSite.length,
    };
  });

  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg p-4">
      <h1>Bootpack PageSpeed Testing</h1>
      <div className="max-w-2xl mb-8">
        <p>
          This is a tool to test the PageSpeed of a website. It uses the
          PageSpeed API to get the results and display them in a readable
          format. You can also see a graph of the performance history of the
          site.
        </p>
        <p>Pick a site to test from the list below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 not-prose">
        {siteAverages.map((siteAvg) => (
          <div key={siteAvg.slug} className="border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <Link href={`/${siteAvg.slug}`} className="text-lg font-bold hover:underline text-blue-600 truncate flex-1">
                {siteAvg.title}
              </Link>
              {siteAvg.hasData && (
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                  {siteAvg.runsCount} test{siteAvg.runsCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {siteAvg.hasData ? (
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 relative">
                    <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.performance} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">Perf</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 relative">
                    <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.accessibility} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">A11y</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 relative">
                    <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.bestPractices} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">Best</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 relative">
                    <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.seo} />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">SEO</div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center">
                <p className="text-sm text-gray-500 italic m-0">No data recorded in the last 5 days.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
