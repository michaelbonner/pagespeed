import Link from "next/link";
import { CategoryScore } from "./CategoryScore";

export type SiteAverage =
  | {
      slug: string;
      title: string;
      hasData: false;
    }
  | {
      slug: string;
      title: string;
      hasData: true;
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
      runsCount: number;
    };

export function SiteCard({ siteAvg }: { siteAvg: SiteAverage }) {
  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <Link
          href={`/${siteAvg.slug}`}
          className="text-lg font-bold hover:underline text-sky-600 truncate flex-1"
        >
          {siteAvg.title}
        </Link>
        {siteAvg.hasData && (
          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
            {siteAvg.runsCount} test{siteAvg.runsCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {siteAvg.hasData ? (
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="size-full p-2 relative">
              <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.performance} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">
              Perf
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="size-full p-2 relative">
              <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.accessibility} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">
              A11y
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="size-full p-2 relative">
              <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.bestPractices} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">
              Best
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="size-full p-2 relative">
              <CategoryScore pageSpeedLink={`/${siteAvg.slug}`} score={siteAvg.seo} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">
              SEO
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <p className="text-sm text-gray-500 italic m-0">
            No data recorded in the last 5 days.
          </p>
        </div>
      )}
    </div>
  );
}
