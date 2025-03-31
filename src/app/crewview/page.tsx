import { PageContent } from "../components/PageContent";

const baseUrl = "https://www.crewview.com";
const paths = [
  "/",
  "/solutions",
  "/solutions/team-and-time-management",
  "/solutions/project-and-task-management",
  "/solutions/equipment-management",
  "/solutions/web-and-mobile-app",
  "/pricing",
  "/blog",
  "/blog/breaking-down-silos-how-centralized-construction-management-technology-reduces-costs-and-boosts",
  "/blog/the-profitable-path-to-success-how-equipment-maintenance-boosts-construction-company-profits",
  "/contact",
  "/privacy-policy",
];
const urls = paths.map((path) => `${baseUrl}${path}`);

export default function CrewViewPageSpeed() {
  return <PageContent title="CrewView Page Speed" urls={urls} />;
}
