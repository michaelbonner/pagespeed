import { PageContent } from "../components/PageContent";

const baseUrl = "https://www.acceleratedep.com";
const paths = ["/", "/services", "/about", "/careers", "/contact"];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function AcceleratedEPPageSpeed() {
  return <PageContent title="AcceleratedEP Page Speed" urls={urls} />;
}
