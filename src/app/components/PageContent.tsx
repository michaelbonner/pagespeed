import PageSpeed from "./PageSpeed";
import { getPerformanceHistory } from "@/app/functions/getPerformanceHistory";

export const PageContent = async ({
  title,
  urls,
}: {
  title: string;
  urls: string[];
}) => {
  // Fetch performance history for all URLs
  const performanceHistoryPromises = urls.map((url) =>
    getPerformanceHistory(url)
  );
  const performanceHistories = await Promise.all(performanceHistoryPromises);

  return (
    <div>
      <h1 className="mt-4 lg:text-4xl font-medium leading-loose text-[clamp(14px,6vw,48px)]">
        PageSpeed results for{" "}
        <code className="p-3 rounded-md bg-gray-100">{title}</code>
      </h1>
      <div className="grid gap-16 py-8 mt-4 divide-y divide-gray-300">
        {urls.map((url, index) => {
          return (
            <PageSpeed
              key={url}
              url={url}
              performanceHistory={performanceHistories[index]}
            />
          );
        })}
      </div>
    </div>
  );
};
