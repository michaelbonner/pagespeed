import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

const baseUrl =
  "https://crewview-public-website-git-feature-j-2aa1e0-blackthornsoftware.vercel.app";

const urls = [
  "/",
  "/solutions",
  "/solutions/team-and-time-management",
  "/solutions/project-and-task-management",
  "/solutions/equipment-management",
  "/solutions/web-and-mobile-app",
  "/pricing",
  "/blog",
  "/blog/the-profitable-path-to-success-how-equipment-maintenance-boosts-construction-company-profits",
  "/contact",
  "/get-started",
];

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-2xl lg:text-5xl mt-4">CrewView PR Page Speed</h1>
      <div className="grid gap-16 mt-4 py-8">
        {urls.map((url) => {
          const fullUrl = `${baseUrl}${url}`;
          return (
            <Suspense
              key={url}
              fallback={
                <div>
                  <h2 className="font-bold text-lg lg:text-2xl text-sky-600">
                    <Link
                      className="break-all underline underline-offset-8"
                      target="_blank"
                      href={fullUrl}
                    >
                      {fullUrl}
                    </Link>
                  </h2>
                  <div className="py-8">Loading...</div>
                </div>
              }
            >
              <PageSpeed url={fullUrl} />
            </Suspense>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
