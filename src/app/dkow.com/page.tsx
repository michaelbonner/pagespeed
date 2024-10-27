import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

const baseUrl = "https://www.dkow.com";

const urls = [
  "/",
  "/attorneys/",
  "/attorneys/colin-king/",
  "/attorneys/walter-m-mason/",
  "/contact/",
  "/news-publications/",
  "/our-results/",
  "/practice-areas/",
  "/practice-areas/aviation-disasters/",
  "/practice-areas/catastrophic-injury-attorney/",
  "/practice-areas/wrongful-death/",
  "/privacy-policy/",
];

export default function DKOWViewPageSpeed() {
  return (
    <div className="py-12">
      <h1 className="text-2xl lg:text-5xl mt-4">DKOW Page Speed</h1>
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
