import Link from "next/link";
import { SiteCard } from "./components/SiteCard";
import { dashboards } from "./data/dashboards";
import { getSiteAverages } from "./functions/getSiteAverages";

export const dynamic = "force-dynamic";

export default async function Home() {
  const siteAverages = await getSiteAverages();

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

      <h2>Dashboards</h2>
      <div className="flex flex-wrap gap-3 not-prose mb-12">
        {Object.entries(dashboards).map(([slug, dashboard]) => (
          <Link
            key={slug}
            href={`/dashboards/${slug}`}
            className="inline-flex items-center px-4 py-2 rounded-full bg-sky-50 text-sky-700 font-medium hover:bg-sky-100 hover:underline"
          >
            {dashboard.title}
          </Link>
        ))}
      </div>

      <h2>All sites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 not-prose">
        {siteAverages.map((siteAvg) => (
          <SiteCard key={siteAvg.slug} siteAvg={siteAvg} />
        ))}
      </div>
    </div>
  );
}
