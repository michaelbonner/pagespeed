"use client";

import dynamic from "next/dynamic";

export const PerformanceHistoryChart = dynamic(
  () =>
    import("./PerformanceHistoryChart").then(
      (mod) => mod.PerformanceHistoryChart,
    ),
  { ssr: false },
);
