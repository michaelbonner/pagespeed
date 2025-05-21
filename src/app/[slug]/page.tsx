import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { notFound } from "next/navigation";
import { PageContent } from "../components/PageContent";
import { getSiteData, sites } from "../data/sites";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const siteData = getSiteData(slug as keyof typeof sites);

  if (!siteData) {
    return notFound();
  }

  return {
    title: `${siteData.title} PageSpeed testing results`,
    description: `We keep track of the PageSpeed results for ${siteData.title} to help us improve the site.`,
  };
}

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
