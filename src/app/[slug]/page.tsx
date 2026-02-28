import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { notFound } from "next/navigation";
import { PageContent } from "../components/PageContent";
import { getSiteData, sites } from "../data/sites";
import Link from "next/link";

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

  return (
    <>
      <Link href="/" className="inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800 hover:underline mb-4 mt-8">
        &larr; Back to Home
      </Link>
      <PageContent title={title} urls={urls} />
    </>
  );
}
