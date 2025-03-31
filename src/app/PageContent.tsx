import PageSpeed from "./pagespeed";

export const PageContent = ({
  title,
  urls,
}: {
  title: string;
  urls: string[];
}) => {
  return (
    <div>
      <h1 className="mt-4 text-2xl lg:text-5xl">{title}</h1>
      <div className="grid gap-16 py-8 mt-4">
        {urls.map((url) => {
          return <PageSpeed key={url} url={url} />;
        })}
      </div>
    </div>
  );
};
