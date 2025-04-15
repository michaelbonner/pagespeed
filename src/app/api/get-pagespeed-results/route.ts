import { sites } from "@/app/data/sites";
import { getPageSpeedData } from "@/app/functions/getPagespeedData";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const TWO_HOURS_IN_SECONDS = 2 * 60 * 60;

const allowedHostnames = Object.values(sites).map(
  (site) => new URL(site.baseUrl)?.hostname
);

export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const strategy = searchParams.get("strategy") as "mobile" | "desktop";
  const url = searchParams.get("url") as string;

  const domain = new URL(url).hostname;

  if (!allowedHostnames.includes(domain)) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  try {
    const cachedResults = unstable_cache(
      async (url: string, strategy: "mobile" | "desktop") =>
        getPageSpeedData(url, strategy),
      ["pagespeed-results", url, strategy],
      {
        revalidate: TWO_HOURS_IN_SECONDS,
        tags: ["pagespeed-results"],
      }
    );

    return NextResponse.json(await cachedResults(url, strategy));
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
