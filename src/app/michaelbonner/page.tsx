import { PageContent } from "../components/PageContent";
import { getUrls } from "../data/sites";

export default function MichaelBonnerPageSpeed() {
  return (
    <PageContent
      title="Michael Bonner Personal Site Page Speed"
      urls={getUrls("michaelbonner")}
    />
  );
}
