import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function DKOWPageSpeed() {
  return <PageContent title="DKOW Page Speed" urls={getUrls("dkow")} />;
}
