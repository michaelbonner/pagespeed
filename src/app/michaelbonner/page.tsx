import { Footer } from "@/components/footer";
import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

const baseUrl = "https://michaelbonner.dev";

const paths = [
  "/",
  "/blog",
  "/blog/github-repositories-viewer-app",
  "/blog/git-branch-name-raycast-extension",
  "/blog/i-made-an-extension",
  "/blog/getting-started-as-a-web-developer-in-2022",
  "/blog/set-up-some-aliases",
  "/uses",
  "/ellie",
];

export default function AcceleratedEquityPlansPageSpeed() {
  return (
    <div className="py-12">
      <h1 className="text-2xl lg:text-5xl mt-4">
        Michael Bonner Personal Site Page Speed
      </h1>
      <div className="grid gap-16 mt-4 py-8">
        {paths.map((path) => {
          const url = `${baseUrl}${path}`;
          return (
            <Suspense
              key={url}
              fallback={
                <div>
                  <h2 className="font-bold text-lg lg:text-2xl text-sky-600">
                    <Link
                      className="break-all underline underline-offset-8"
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
