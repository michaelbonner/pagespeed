import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteCard } from "../../components/SiteCard";
import { dashboards, type DashboardSlug } from "../../data/dashboards";
import { getSiteAverages } from "../../functions/getSiteAverages";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dashboard = dashboards[slug as DashboardSlug];

  if (!dashboard) {
    return notFound();
  }

  return {
    title: `${dashboard.title} dashboard`,
    description: `PageSpeed results for sites in the ${dashboard.title} dashboard.`,
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dashboard = dashboards[slug as DashboardSlug];

  if (!dashboard) {
    return notFound();
  }

  const siteAverages = (await getSiteAverages([...dashboard.siteSlugs])).sort(
    (a, b) => a.title.localeCompare(b.title),
  );

  return (
    <div className="max-w-screen-2xl mx-auto prose prose-lg p-4">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline mb-4 mt-8"
      >
        &larr; Back to Home
      </Link>
      <h1>{dashboard.title} dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 not-prose">
        {siteAverages.map((siteAvg) => (
          <SiteCard key={siteAvg.slug} siteAvg={siteAvg} />
        ))}
      </div>
    </div>
  );
}
