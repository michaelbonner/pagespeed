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

const urls = paths.map((path) => `${baseUrl}${path}`);

export default function MichaelBonnerPageSpeed() {
  return (
    <div>
      <h1 className="mt-4 text-2xl lg:text-5xl">
        Michael Bonner Personal Site Page Speed
      </h1>
      <div className="grid gap-16 py-8 mt-4">
        {urls.map((url) => {
          return <PageSpeed key={url} url={url} />;
        })}
      </div>
    </div>
  );
}
