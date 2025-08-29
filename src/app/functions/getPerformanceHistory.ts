import { db } from "@/db";
import { pagesTable } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

export type PerformanceHistoryData = {
  mobile: Array<{
    id: number;
    performanceScore: number;
    accessibilityScore: number;
    bestPracticesScore: number;
    seoScore: number;
    createdAt: Date;
  }>;
  desktop: Array<{
    id: number;
    performanceScore: number;
    accessibilityScore: number;
    bestPracticesScore: number;
    seoScore: number;
    createdAt: Date;
  }>;
};

export async function getPerformanceHistory(
  url: string
): Promise<PerformanceHistoryData> {
  try {
    // Get last 50 mobile results
    const mobileResults = await db
      .select({
        id: pagesTable.id,
        performanceScore: pagesTable.performanceScore,
        accessibilityScore: pagesTable.accessibilityScore,
        bestPracticesScore: pagesTable.bestPracticesScore,
        seoScore: pagesTable.seoScore,
        createdAt: pagesTable.createdAt,
      })
      .from(pagesTable)
      .where(and(eq(pagesTable.url, url), eq(pagesTable.strategy, "mobile")))
      .orderBy(desc(pagesTable.createdAt))
      .limit(50);

    // Get last 50 desktop results
    const desktopResults = await db
      .select({
        id: pagesTable.id,
        performanceScore: pagesTable.performanceScore,
        accessibilityScore: pagesTable.accessibilityScore,
        bestPracticesScore: pagesTable.bestPracticesScore,
        seoScore: pagesTable.seoScore,
        createdAt: pagesTable.createdAt,
      })
      .from(pagesTable)
      .where(and(eq(pagesTable.url, url), eq(pagesTable.strategy, "desktop")))
      .orderBy(desc(pagesTable.createdAt))
      .limit(50);

    return {
      mobile: mobileResults.map((row) => ({
        ...row,
        performanceScore: +row.performanceScore,
        accessibilityScore: +row.accessibilityScore,
        bestPracticesScore: +row.bestPracticesScore,
        seoScore: +row.seoScore,
      })),
      desktop: desktopResults.map((row) => ({
        ...row,
        performanceScore: +row.performanceScore,
        accessibilityScore: +row.accessibilityScore,
        bestPracticesScore: +row.bestPracticesScore,
        seoScore: +row.seoScore,
      })),
    };
  } catch (error) {
    console.error("Error fetching performance history:", error);
    return {
      mobile: [],
      desktop: [],
    };
  }
}
