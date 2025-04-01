import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function NEFPageSpeed() {
  return <PageContent title="NEF Page Speed" urls={getUrls("nef1")} />;
}
