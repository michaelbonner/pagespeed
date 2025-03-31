import { Footer } from "@/components/footer";
import PageSpeed from "./pagespeed";

export const dynamic = "force-dynamic";

const urls = [
  "https://bootpackdigital.com/",
  "https://bootpackdigital.com/about",
  "https://bootpackdigital.com/contact",
  "https://bootpackdigital.com/open-source",
  "https://bootpackdigital.com/policies",
  "https://bootpackdigital.com/work",
];

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="mt-4 text-2xl lg:text-5xl">
        Bootpack PageSpeed Test Results
      </h1>
      <div className="grid gap-16 py-8 mt-4">
        {urls.map((url) => {
          return <PageSpeed key={url} url={url} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
