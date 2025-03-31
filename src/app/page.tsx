import { PageContent } from "./components/PageContent";

const baseUrl = "https://bootpackdigital.com";
const paths = ["/", "/about", "/contact", "/open-source", "/policies", "/work"];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function Home() {
  return <PageContent title="Bootpack PageSpeed Test Results" urls={urls} />;
}
