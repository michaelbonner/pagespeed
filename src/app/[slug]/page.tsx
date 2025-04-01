import { PageContent } from "../components/PageContent";
import { getSiteData, sites } from "../data/sites";
import { notFound } from "next/navigation";

export default function PageSpeed({ params }: { params: { slug: string } }) {
  const siteData = getSiteData(params.slug as keyof typeof sites);

  if (!siteData) {
    return notFound();
  }

  const { urls, title } = siteData;

  return <PageContent title={title} urls={urls} />;
}
