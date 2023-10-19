import Link from "next/link";
import PageSpeed from "../pagespeed";

const urls = [
  "https://www.hanksgaragevenue.com/",
  "https://www.hanksgaragevenue.com/tour",
  "https://www.hanksgaragevenue.com/garage-specs",
  "https://www.hanksgaragevenue.com/events",
  "https://www.hanksgaragevenue.com/contact",
];

export default function Home() {
  return (
    <div className="py-12">
      <h1 className="text-2xl lg:text-5xl mt-4">
        Hanks Garage Venue Test Results
      </h1>
      <div className="grid gap-16 mt-4 py-8">
        {urls.map((url) => {
          return <PageSpeed key={url} url={url} />;
        })}
      </div>
      <div className="py-4 bg-gray-100 px-8 mt-8 rounded-lg text-gray-600">
        Made by{" "}
        <Link
          className="underline underline-offset-4"
          href="https://bootpackdigital.com"
        >
          Bootpack Digital
        </Link>
      </div>
    </div>
  );
}
