"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type ChartData = {
  createdAt: Date;
  score: number;
};

export function PerformanceHistoryChart({
  data,
  label,
  index,
}: {
  data: ChartData[];
  label: string;
  index: number;
}) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No history data available
      </div>
    );
  }

  const average = (
    data.reduce((prev, row) => prev + row.score, 0) / data.length
  ).toFixed(1);

  const colors = [
    "oklch(0.6 0.118 184.704)",
    "oklch(0.398 0.07 227.392)",
    "oklch(0.828 0.189 84.429)",
    "oklch(0.646 0.222 41.116)",
  ];

  return (
    <div>
      <h3 className="my-4">
        {label} (Average {average})
      </h3>
      <ChartContainer
        config={{
          score: {
            label,
          },
        }}
        className="h-[160px] w-full"
      >
        <AreaChart
          accessibilityLayer
          data={data.toReversed()}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="createdAt"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <YAxis
            tickLine={true}
            axisLine={false}
            tickMargin={8}
            domain={[0, 100]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="score"
            type="natural"
            fill={colors.at(index) ?? colors[0]}
            fillOpacity={0.4}
            stroke={colors.at(index) ?? colors[0]}
            name={label}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
