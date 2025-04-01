import { notFound } from "next/navigation";
import { PageContent } from "./components/PageContent";
import { getSiteData } from "./data/sites";

export default function Home() {
  const siteData = getSiteData("bootpackdigital");

  if (!siteData) {
    return notFound();
  }

  const { urls, title } = siteData;

  return <PageContent title={title} urls={urls} />;
}
