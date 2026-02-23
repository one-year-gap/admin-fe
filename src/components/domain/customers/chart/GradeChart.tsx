// import React from "react";

// import type { CustomerFilters } from "@/components/domain/customers/filter/FilterBar";

// export function GradeChart({ keyword, filters }: { keyword: string; filters: CustomerFilters }) {
//   return <div>GradeChart</div>;
// }

"use client";

import React from "react";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { CustomerAnalytics } from "@/mocks/customerAnalytics.mock";

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export function GradeChart({
  analytics,
  isFiltered,
}: {
  analytics: CustomerAnalytics;
  isFiltered: boolean;
}) {
  const data = React.useMemo(() => analytics.gradeDistribution, [analytics.gradeDistribution]);
  const total = React.useMemo(() => data.reduce((acc, cur) => acc + cur.value, 0), [data]);

  const COLORS = ["var(--color-chart-3)", "var(--color-chart-1)", "var(--color-chart-2)"];

  return (
    <div className="bg-neutral-0 h-full rounded-xl border border-neutral-300 p-6">
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-medium text-neutral-900">등급별 고객 분포도</h3>
        <p className="text-md text-neutral-500">
          {isFiltered ? "필터링된 고객 기준" : "전체 고객 기준"}
        </p>
      </div>

      <div className="flex items-center justify-evenly gap-12">
        <div className="relative aspect-square w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value: string | number | undefined, name?: string) => {
                  const v = Number(value ?? 0);
                  return [`${v.toLocaleString()}명`, name ?? ""];
                }}
              />
              <Pie
                key={total}
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                stroke="none"
                isAnimationActive
                animationBegin={0}
                animationDuration={900}
                animationEasing="ease-out">
                {data.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-neutral-500">Total</span>
            <span className="text-2xl font-bold text-neutral-900">{formatCompact(total)}</span>
          </div>
        </div>

        <div className="space-y-6">
          {data.map((item, idx) => {
            const percent = total === 0 ? 0 : Math.round((item.value / total) * 100);
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-md font-medium text-neutral-900">{item.label}</span>
                <span>-</span>
                <span className="text-md font-semibold text-neutral-900">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
