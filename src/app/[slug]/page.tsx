import { PageContent } from "../components/PageContent";
import { getSiteData, sites } from "../data/sites";
import { notFound } from "next/navigation";

export default async function PageSpeed({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const siteData = getSiteData(slug as keyof typeof sites);

  if (!siteData) {
    return notFound();
  }

  const { urls, title } = siteData;

  return <PageContent title={title} urls={urls} />;
}
