import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function AcceleratedEquityPlansPageSpeed() {
  return (
    <PageContent
      title="Accelerated Equity Plans Page Speed"
      urls={getUrls("acceleratedep")}
    />
  );
}
