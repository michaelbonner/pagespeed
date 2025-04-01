import { PageContent } from "./components/PageContent";
import { getUrls } from "./data/sites";

export default function Home() {
  return (
    <PageContent
      title="Bootpack PageSpeed Test Results"
      urls={getUrls("bootpackdigital")}
    />
  );
}
