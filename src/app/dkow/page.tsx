import { PageContent } from "../components/PageContent";

const baseUrl = "https://www.dkow.com/";
const paths = [
  "/",
  "/practice-areas/",
  "/practice-areas/medical-malpractice/",
  "/practice-areas/motor-vehicle-accidents/",
  "attorneys/",
  "attorneys/michael-a-worel/",
  "attorneys/david-r-olsen/",
  "our-results/",
  "news-publications/",
  "dkow-files-lawsuit-for-the-wrongful-death-of-julia-reagan/",
  "contact/",
];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function DKOWPageSpeed() {
  return <PageContent title="DKOW Page Speed" urls={urls} />;
}
