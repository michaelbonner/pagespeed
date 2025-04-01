import { PageContent } from "../components/PageContent";

const baseUrl = "https://nef1.org";
const paths = [
  "/",
  "/programs/",
  "/think-energy/",
  "/energy-safe-kids/",
  "/rev/",
  "/teacher-support/",
  "/about-nef/",
  "/board-of-directors/",
  "/careers/",
  "/meet-the-team/",
  "/teacher-support/",
  "/store/",
  "/survey/",
  "/communications/",
  "/annual-reports/",
  "/contact/",
];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function NEFPageSpeed() {
  return <PageContent title="NEF Page Speed" urls={urls} />;
}
