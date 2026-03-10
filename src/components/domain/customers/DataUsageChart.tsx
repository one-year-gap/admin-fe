"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "2026-02-10", value: 820 },
  { date: "2026-02-11", value: 790 },
  { date: "2026-02-12", value: 910 },
  { date: "2026-02-13", value: 880 },
  { date: "2026-02-14", value: 940 },
  { date: "2026-02-15", value: 860 },
  { date: "2026-02-16", value: 990 },
  { date: "2026-02-17", value: 930 },
  { date: "2026-02-18", value: 1010 },
  { date: "2026-02-19", value: 970 },
  { date: "2026-02-20", value: 1040 },
  { date: "2026-02-21", value: 980 },
  { date: "2026-02-22", value: 1100 },
  { date: "2026-02-23", value: 1060 },
];

export function DataUsageChart() {
  return (
    <div className="bg-neutral-0 rounded-xl border border-neutral-300 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">데이터 사용량</h3>
        <p className="text-sm text-neutral-500">최근 14일 · 단위 GB</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(v) => String(v).slice(5)} />
            <YAxis domain={[0, "dataMax + 10"]} />
            <Tooltip
              formatter={(value: string | number | undefined, name?: string) => [
                `${Number(value ?? 0).toLocaleString()} GB`,
                name ?? "사용량",
              ]}
              labelFormatter={(label) => `날짜: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="사용량"
              stroke="var(--color-primary-500)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
