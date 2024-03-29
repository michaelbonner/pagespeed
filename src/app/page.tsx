import { Footer } from "@/components/footer";
import PageSpeed from "./pagespeed";

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
      <h1 className="text-2xl lg:text-5xl mt-4">
        Bootpack PageSpeed Test Results
      </h1>
      <div className="grid gap-16 mt-4 py-8">
        {urls.map((url) => {
          return <PageSpeed key={url} url={url} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
