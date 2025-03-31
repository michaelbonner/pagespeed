"use server";

export async function getPageSpeedData(
  url: string,
  strategy: "mobile" | "desktop" = "mobile"
) {
  const urlObject = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  urlObject.searchParams.append("url", url);
  urlObject.searchParams.append("key", process.env.GOOGLE_API_KEY || "");
  urlObject.searchParams.append("category", "performance");
  urlObject.searchParams.append("category", "accessibility");
  urlObject.searchParams.append("category", "best-practices");
  urlObject.searchParams.append("category", "seo");
  urlObject.searchParams.append("strategy", strategy);

  const res = await fetch(urlObject.toString(), {
    headers: {
      "Content-Type": "application/json",
      cache: "force-cache",
    },
  });

  if (!res.ok) {
    console.error("res data", await res.text());
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
