import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

const urls = [
  "https://www.hanksgaragevenue.com/",
  "https://www.hanksgaragevenue.com/tour",
  "https://www.hanksgaragevenue.com/garage-specs",
  "https://www.hanksgaragevenue.com/events",
  "https://www.hanksgaragevenue.com/contact",
];

export default function HanksGarageVenuePageSpeed() {
  return (
    <div className="py-12">
      <h1 className="mt-4 text-2xl lg:text-5xl">
        Hanks Garage Venue Test Results
      </h1>
      <div className="grid gap-16 py-8 mt-4">
        {urls.map((url) => {
          return (
            <Suspense
              key={url}
              fallback={
                <div>
                  <h2 className="text-lg font-bold lg:text-2xl text-sky-600">
                    <Link
                      className="underline break-all underline-offset-8"
                      target="_blank"
                      href={url}
                    >
                      {url}
                    </Link>
                  </h2>
                  <div className="py-8">Loading...</div>
                </div>
              }
            >
              <PageSpeed url={url} />
            </Suspense>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
