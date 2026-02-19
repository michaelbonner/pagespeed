import { PerformanceHistoryData } from "@/app/functions/getPerformanceHistory";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Suspense } from "react";
import {
  IoDesktopOutline,
  IoPhonePortraitOutline,
  IoPodiumOutline,
} from "react-icons/io5";
import { PageSpeedResult } from "./PagespeedResult";

import { PerformanceHistoryChart } from "./PerformanceHistoryChartLazy";

type PerformanceScoreKey =
  | "performanceScore"
  | "accessibilityScore"
  | "bestPracticesScore"
  | "seoScore";

export default function PageSpeed({
  url,
  performanceHistory,
}: {
  url: string;
  performanceHistory: PerformanceHistoryData;
}) {
  const pageSpeedLink = `https://pagespeed.web.dev/report?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="grid relative gap-4 pb-12">
      <PagespeedRowHeader
        url={url}
        pageSpeedLink={pageSpeedLink}
        performanceHistory={performanceHistory}
      />
      <h3 className="text-lg font-semibold flex items-center gap-1">
        <IoPhonePortraitOutline className="size-4" />

        <span>Mobile</span>
      </h3>
      <Suspense fallback={<div>Loading mobile results...</div>}>
        <PageSpeedResult
          pageSpeedLink={`${pageSpeedLink}&form_factor=mobile`}
          strategy="mobile"
          url={url}
        />
      </Suspense>
      <h3 className="text-lg font-semibold flex items-center gap-1">
        <IoDesktopOutline className="size-4" />

        <span>Desktop</span>
      </h3>
      <Suspense fallback={<div>Loading desktop results...</div>}>
        <PageSpeedResult
          pageSpeedLink={`${pageSpeedLink}&form_factor=desktop`}
          strategy="desktop"
          url={url}
        />
      </Suspense>
    </div>
  );
}

const PagespeedRowHeader = ({
  url,
  pageSpeedLink,
  performanceHistory,
}: {
  url: string;
  pageSpeedLink: string;
  performanceHistory: PerformanceHistoryData;
}) => {
  return (
    <div className="grid gap-4 items-end lg:flex lg:flex-wrap lg:justify-between">
      <div className="flex justify-start gap-4 items-end lg:gap-16">
        <h2 className="text-lg font-bold lg:text-2xl text-sky-600">
          <Link
            className="underline break-all underline-offset-8"
            target="_blank"
            href={url}
          >
            {url}
          </Link>
        </h2>
        <div>
          <Link
            className="flex gap-2 items-center underline text-sky-600 underline-offset-4"
            href={pageSpeedLink}
            target="_blank"
          >
            <svg
              className="transition-transform group-hover:scale-110"
              style={{
                width: "20px",
                height: "20px",
              }}
              height="2500"
              width="2500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 520.331"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M0 106.667h512v320H0z" fill="#def"></path>
                <path
                  d="M512 106.667H0V42.56C0 19.055 19.137 0 42.772 0h426.456C492.85 0 512 19.032 512 42.56z"
                  fill="#bdf"
                ></path>
                <path
                  d="M128 74.667c-11.782 0-21.333-9.552-21.333-21.334S116.217 32 128 32s21.333 9.551 21.333 21.333c0 11.782-9.55 21.334-21.333 21.334zm-74.667 0C41.551 74.667 32 65.115 32 53.333S41.551 32 53.333 32c11.782 0 21.334 9.551 21.334 21.333 0 11.782-9.552 21.334-21.334 21.334z"
                  fill="#fff"
                ></path>
                <path
                  d="M85.333 426.667H0c0-65.516 24.994-131.033 74.98-181.02 99.975-99.974 262.065-99.974 362.04 0l-60.34 60.34C345.795 275.103 303.128 256 256 256c-94.257 0-170.667 76.41-170.667 170.667z"
                  fill="#06f"
                ></path>
                <path
                  d="M426.667 426.667H512c0-65.516-24.994-131.033-74.98-181.02l-60.34 60.34c30.884 30.885 49.987 73.551 49.987 120.68z"
                  fill="#c6f"
                ></path>
                <path
                  d="M195.66 487.006c-33.325-33.324-33.325-87.354 0-120.68 33.325-33.324 218.732-98.051 218.732-98.051s-64.727 185.407-98.052 218.731c-33.325 33.325-87.355 33.325-120.68 0z"
                  fill="#6cf"
                ></path>
                <path
                  d="M256 469.333c-23.564 0-42.667-19.102-42.667-42.666C213.333 403.103 232.436 384 256 384s42.667 19.103 42.667 42.667-19.103 42.666-42.667 42.666z"
                  fill="#06f"
                ></path>
              </g>
            </svg>{" "}
            Result Link
          </Link>
        </div>
      </div>
      <div>
        <Sheet>
          <SheetTrigger
            render={
              <Button>
                <IoPodiumOutline />
                <span>History</span>
              </Button>
            }
          />
          <SheetContent className="w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw]">
            <SheetHeader>
              <SheetTitle>PageSpeed History</SheetTitle>
              <SheetDescription>{url}</SheetDescription>
              <ScrollArea className="h-[calc(100vh-6rem)] w-full rounded-md border p-4 mt-2">
                <div className="py-4">
                  <div className="flex gap-2 flex-wrap items-center">
                    <h2 className="font-bold text-xl flex gap-2 items-baseline">
                      <IoPhonePortraitOutline className="size-4" />
                      Mobile
                    </h2>
                    <p className="font-light text-sm text-muted-foreground flex items-center gap-2 leading-none">
                      Showing last {performanceHistory["mobile"].length} results
                    </p>
                  </div>
                  <div className="lg:grid lg:grid-cols-2">
                    {[
                      {
                        label: "Performance",
                        key: "performanceScore" as PerformanceScoreKey,
                      },
                      {
                        label: "Accessibility",
                        key: "accessibilityScore" as PerformanceScoreKey,
                      },
                      {
                        label: "Best Practices",
                        key: "bestPracticesScore" as PerformanceScoreKey,
                      },
                      { label: "SEO", key: "seoScore" as PerformanceScoreKey },
                    ].map((type, index) => {
                      return (
                        <PerformanceHistoryChart
                          data={performanceHistory["mobile"].map((row) => ({
                            score: row[type.key] * 100,
                            createdAt: row.createdAt,
                          }))}
                          key={type.label}
                          label={type.label}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="pt-8 pb-4 mt-4 border-t">
                  <div className="flex gap-2 flex-wrap items-center">
                    <h2 className="font-bold text-xl flex gap-2 items-baseline">
                      <IoDesktopOutline className="size-4" />
                      Desktop
                    </h2>
                    <p className="font-light text-sm text-muted-foreground flex items-center gap-2 leading-none">
                      Showing last {performanceHistory["desktop"].length}{" "}
                      results
                    </p>
                  </div>
                  <div className="lg:grid lg:grid-cols-2">
                    {[
                      {
                        label: "Performance",
                        key: "performanceScore" as PerformanceScoreKey,
                      },
                      {
                        label: "Accessibility",
                        key: "accessibilityScore" as PerformanceScoreKey,
                      },
                      {
                        label: "Best Practices",
                        key: "bestPracticesScore" as PerformanceScoreKey,
                      },
                      { label: "SEO", key: "seoScore" as PerformanceScoreKey },
                    ].map((type, index) => {
                      return (
                        <PerformanceHistoryChart
                          data={performanceHistory["desktop"].map((row) => ({
                            score: row[type.key] * 100,
                            createdAt: row.createdAt,
                          }))}
                          key={type.label}
                          label={type.label}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </ScrollArea>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
