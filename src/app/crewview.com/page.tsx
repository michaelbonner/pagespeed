import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

export const dynamic = "force-dynamic";

const baseUrl = "https://www.crewview.com";

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

export default function CrewViewPageSpeed() {
  return (
    <div className="py-12">
      <h1 className="mt-4 text-2xl lg:text-5xl">CrewView Page Speed</h1>
      <div className="grid gap-16 py-8 mt-4">
        {urls.map((url) => {
          const fullUrl = `${baseUrl}${url}`;
          return (
            <Suspense
              key={url}
              fallback={
                <div>
                  <h2 className="text-lg font-bold lg:text-2xl text-sky-600">
                    <Link
                      className="underline break-all underline-offset-8"
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
