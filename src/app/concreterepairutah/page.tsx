import Link from "next/link";
import { Suspense } from "react";
import PageSpeed from "../pagespeed";

const urls = [
  "https://www.concreterepairutah.com/",
  "https://www.concreterepairutah.com/concrete-sealing/",
  "https://www.concreterepairutah.com/contact-the-concrete-repair-specialists/",
  "https://www.concreterepairutah.com/crack-repair/",
  "https://www.concreterepairutah.com/foundation-plaster/",
  "https://www.concreterepairutah.com/photos-of-concrete-repairs/porch/",
  "https://www.concreterepairutah.com/photos-of-concrete-repairs/stairs/",
  "https://www.concreterepairutah.com/reviews/",
];

export default function ConcreteRepairUtahPageSpeed() {
  return (
    <div>
      <h1 className="mt-4 text-2xl lg:text-5xl">
        Concrete Repair Utah Page Speed
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
    </div>
  );
}
