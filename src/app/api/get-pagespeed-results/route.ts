import { getPageSpeedData } from "@/functions/getPagespeedData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const strategy = searchParams.get("strategy") as "mobile" | "desktop";
  const url = searchParams.get("url") as string;

  try {
    const results = await getPageSpeedData(url, strategy);

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
