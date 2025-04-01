import { PageContent } from "../components/PageContent";

const baseUrl = "https://energysafekids.vercel.app";
const paths = ["/", "/student-resources", "/teacher-resources", "/about"];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function EnergySafeKidsPageSpeed() {
  return <PageContent title="Energy Safe Kids Page Speed" urls={urls} />;
}
