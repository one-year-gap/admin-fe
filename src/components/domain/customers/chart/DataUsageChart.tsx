// import React from "react";

// import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";

// export function DataUsageChart({
//   keyword,
//   filters,
// }: {
//   keyword: string;
//   filters: CustomerFilters;
// }) {
//   return <div>DataUsageChart</div>;
// }

"use client";

import React from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CustomerAnalytics } from "@/mocks/customerAnalytics.mock";

export function DataUsageChart({ analytics }: { analytics: CustomerAnalytics }) {
  const series = React.useMemo(
    () => analytics.dataUsageTimeseries.series,
    [analytics.dataUsageTimeseries.series],
  );

  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">데이터 사용량</h3>
        <p className="text-sm text-neutral-500">
          최근 {series.length}일 · 단위 {analytics.dataUsageTimeseries.unit}
        </p>
      </div>

      <div className="h-70">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              tickFormatter={(v) => String(v).slice(5)}
              tickMargin={8}
            />
            <YAxis tickMargin={8} width={64} tickFormatter={(v) => `${v}`} />
            <Tooltip
              formatter={(value: string | number | undefined, name?: string) => {
                const v = Number(value ?? 0);
                return [`${v.toLocaleString()} GB`, name ?? "사용량"];
              }}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="사용량"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              animationBegin={0}
              animationDuration={900}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
