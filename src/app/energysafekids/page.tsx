import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function EnergySafeKidsPageSpeed() {
  return (
    <PageContent
      title="Energy Safe Kids Page Speed"
      urls={getUrls("energySafeKids")}
    />
  );
}
