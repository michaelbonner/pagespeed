import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function CrewViewPageSpeed() {
  return <PageContent title="CrewView Page Speed" urls={getUrls("crewview")} />;
}
