import { PageContent } from "../PageContent";

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
    <PageContent title="Michael Bonner Personal Site Page Speed" urls={urls} />
  );
}
