import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const key = searchParams.get("key") as string;

  if (!key) {
    return NextResponse.json(
      {
        error: "Key is required",
      },
      { status: 400 }
    );
  }

  revalidateTag(key);

  return NextResponse.json({
    success: true,
  });
};
