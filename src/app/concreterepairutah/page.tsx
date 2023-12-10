import { Footer } from "@/components/footer";
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

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-2xl lg:text-5xl mt-4">
        Concrete Repair Utah Page Speed
      </h1>
      <div className="grid gap-16 mt-4 py-8">
        {urls.map((url) => {
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
